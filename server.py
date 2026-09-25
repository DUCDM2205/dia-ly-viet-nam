"""Static site + local OpenWeatherMap API proxy (standard library only).

Windows PowerShell:
    $env:OPENWEATHER_API_KEY="YOUR_KEY"
    python server.py
macOS/Linux:
    OPENWEATHER_API_KEY="YOUR_KEY" python3 server.py
"""
from __future__ import annotations

import json
import os
import time
import urllib.error
import urllib.parse
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
API_KEY = os.environ.get("OPENWEATHER_API_KEY", "").strip()
PATHS = {
    "geocode": "https://api.openweathermap.org/geo/1.0/direct",
    "current": "https://api.openweathermap.org/data/2.5/weather",
    "forecast": "https://api.openweathermap.org/data/2.5/forecast",
}
CACHE: dict[str, tuple[float, int, bytes]] = {}


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_json(self, status: int, body: object) -> None:
        payload = json.dumps(body, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "no-store")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def do_GET(self) -> None:
        url = urllib.parse.urlsplit(self.path)
        if url.path == "/api/health":
            self.send_json(200, {"weather": True, "configured": bool(API_KEY)})
            return
        if not url.path.startswith("/api/"):
            super().do_GET()
            return
        kind = url.path.split("/")[-1]
        if kind not in PATHS:
            self.send_json(404, {"message": "Không có đường dẫn API này."})
            return
        if not API_KEY:
            self.send_json(503, {"message": "Hãy đặt biến môi trường OPENWEATHER_API_KEY rồi chạy lại server.py."})
            return

        values = urllib.parse.parse_qs(url.query, keep_blank_values=False)
        try:
            if kind == "geocode":
                q = values.get("q", [""])[0].strip()
                if not 2 <= len(q) <= 120:
                    raise ValueError("Tên vị trí phải dài từ 2 đến 120 ký tự.")
                params = {"q": q, "limit": "5"}
            else:
                lat = float(values.get("lat", [""])[0])
                lon = float(values.get("lon", [""])[0])
                if not (-90 <= lat <= 90 and -180 <= lon <= 180):
                    raise ValueError("Tọa độ không hợp lệ.")
                params = {"lat": str(lat), "lon": str(lon), "units": "metric", "lang": "vi"}
        except (ValueError, IndexError) as exc:
            self.send_json(400, {"message": str(exc) or "Thiếu vị trí hoặc tọa độ."})
            return
        params["appid"] = API_KEY
        upstream = PATHS[kind] + "?" + urllib.parse.urlencode(params)
        # Cache brief snapshots; keep a simple personal-use rate footprint.
        cached = CACHE.get(upstream)
        if cached and cached[0] > time.time():
            self.send_json(cached[1], json.loads(cached[2]))
            return
        try:
            request = urllib.request.Request(upstream, headers={"User-Agent": "DiaLyVietNam/1.1"})
            with urllib.request.urlopen(request, timeout=12) as response:
                code = response.status
                body = response.read(180_000)
            result = json.loads(body)
            if len(CACHE) > 300:
                CACHE.clear()
            CACHE[upstream] = (time.time() + (600 if kind == "geocode" else 300), code, body)
            self.send_json(code, result)
        except urllib.error.HTTPError as exc:
            try:
                message = json.loads(exc.read(4000)).get("message", "Lỗi dịch vụ thời tiết.")
            except (ValueError, AttributeError):
                message = "Lỗi dịch vụ thời tiết."
            self.send_json(exc.code, {"message": message})
        except (urllib.error.URLError, TimeoutError, ValueError):
            self.send_json(502, {"message": "Chưa kết nối được OpenWeatherMap. Thử lại sau."})


if __name__ == "__main__":
    host = "127.0.0.1"
    port = int(os.environ.get("DIALY_PORT", "8000"))
    print(f"Mở http://{host}:{port}/ | Key: {'đã cấu hình' if API_KEY else 'chưa cấu hình'}")
    ThreadingHTTPServer((host, port), Handler).serve_forever()
