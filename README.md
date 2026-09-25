# Địa lý Việt Nam

Website học địa lý Việt Nam với 34 tỉnh/thành hiện nay và danh sách 63 địa phương ngay trước sắp xếp 2025, 12 bài học, câu hỏi ôn tập và tra cứu thời tiết. Hồ sơ hiện nay có diện tích, quy mô dân số có nguồn, mùa mưa tham khảo, tiếp giáp tiêu biểu, hành chính, giao thông, giáo dục, văn hóa, kinh tế, đặc sản và điểm đến. Phần học và tra cứu địa lý dùng được khi không có API key; thời tiết cần OpenWeatherMap API key và Internet.

## Chạy bằng Visual Studio Code

1. Giải nén và mở thư mục `dia-ly-viet-nam` trong VS Code.
2. Mở Terminal và chạy:

   ```bash
   python -m http.server 8000
   ```

   Trên Windows, nếu lệnh `python` không có, thử `py -m http.server 8000`.
3. Mở <http://localhost:8000> trên trình duyệt.

Có thể dùng extension Live Server và chọn **Open with Live Server** tại `index.html`. Không nên mở trực tiếp `index.html` bằng giao thức `file://` vì trình duyệt có thể chặn JavaScript module.

## Bật thời tiết bằng API key của bạn

**Cách 1 — chạy trong VS Code, giữ key ngoài source (khuyên dùng):**

Mở terminal trong thư mục `dia-ly-viet-nam`, chạy:

```powershell
# Windows PowerShell; thay YOUR_KEY bằng API key của bạn
$env:OPENWEATHER_API_KEY="YOUR_KEY"
python server.py
```

Mở <http://127.0.0.1:8000/>. Trên macOS/Linux: `OPENWEATHER_API_KEY="YOUR_KEY" python3 server.py`. Server chỉ nghe trên máy của bạn (`127.0.0.1`). Khởi động lại khi đổi key. **Không dán key vào GitHub, file `.js`, README hoặc ảnh chụp màn hình.**

**Cách 2 — trên GitHub Pages hoặc Live Server:** vào mục **Thời tiết**, tự nhập key trong trình duyệt. Key chỉ giữ trong tab hiện tại (`sessionStorage`), trang tĩnh sẽ gọi trực tiếp OpenWeatherMap. Người khác mở website phải dùng key riêng. Muốn tất cả khách truy cập dùng key của bạn mà không nhìn thấy key, cần triển khai máy chủ API riêng trên một dịch vụ hỗ trợ Python và cấu hình tên miền API; GitHub Pages không chạy `server.py`.

Ứng dụng dùng Geocoding API, Current Weather API và dự báo 5 ngày theo bước 3 giờ của OpenWeatherMap. Nhập tên địa danh rồi chọn kết quả ở Việt Nam; địa danh cấp xã/phường chỉ có kết quả nếu OpenWeatherMap có trong dữ liệu geocoding. Có thể nhập vĩ độ/kinh độ hoặc dùng vị trí hiện tại để lấy điểm chính xác. Từ hồ sơ tỉnh, bấm **Xem chi tiết thời tiết** để mở mục thời tiết với điểm đại diện đã điền sẵn. Thời tiết này chỉ tại **một vị trí đại diện**, không đại diện đồng đều cho toàn tỉnh.

## Cấu trúc

- `index.html`: các màn hình và cấu trúc nội dung.
- `styles.css`: giao diện responsive.
- `data.js`: tỉnh/thành, bài học, câu hỏi. Có thể sửa nội dung tại đây.
- `province-details.js`: 34 hồ sơ và liên kết nguồn diện tích cho từng địa phương.
- `province-extended.js`: dân số theo nghị quyết, tổng đơn vị cấp xã, khí hậu mùa mưa và các mô tả giao thông, văn hóa, tiếp giáp.
- `app.js`: tìm kiếm, lọc, hộp thông tin, điểm học, trò chơi.
- `weather.js`: giao diện tìm địa danh, thời tiết hiện tại và dự báo; không có API key cứng.
- `server.py`: máy chủ chạy trên máy của bạn để giữ key ngoài mã JavaScript.
- `assets/`: ba ảnh minh họa Bắc, Trung, Nam. Đây là hình tạo bằng AI theo mô tả cảnh quan, **không phải ảnh chụp địa điểm hoặc tỉnh cụ thể**.

Tiến độ đánh dấu bài đã học được lưu bằng `localStorage` trong trình duyệt hiện tại. Không có tài khoản hoặc đồng bộ nhiều thiết bị. Font Google có thể không tải khi ngoại tuyến; giao diện tự chuyển sang font có sẵn. Phần còn lại hoạt động ngoại tuyến sau khi tải source.

**Lưu ý mốc dữ liệu:** 63 đơn vị là danh sách trước sắp xếp cấp tỉnh vào tháng 6/2025; hồ sơ khi bấm vào địa phương cũ luôn dùng diện tích, kinh tế và địa giới của tỉnh/thành *hiện nay*. Từ 01/7/2025 chính quyền địa phương vận hành theo hai cấp; quận/huyện/thành phố thuộc tỉnh không còn là đơn vị hành chính hiện hành (hiển thị 0). Tổng xã/phường/đặc khu của 34 tỉnh dùng bảng Cục Thống kê cột 2026 PX. Quy mô dân số của 23 đơn vị sắp xếp được trích Nghị quyết 202/2025/QH15; 11 đơn vị không sắp xếp hiển thị **dân số trung bình năm 2024, đơn vị nghìn người**, lấy từ Niên giám thống kê. Hai nhóm **khác mốc và khác cách đo**, không nên so sánh trực tiếp. Dữ liệu giáo dục, giao thông, văn hóa và tiếp giáp là ví dụ tiêu biểu, không phải danh mục toàn diện. Mùa mưa là **khoảng tháng khí hậu tham khảo**, có thể khác theo năm và theo tiểu vùng; không suy ra từ dự báo OpenWeatherMap.

## Nguồn dữ liệu

- [Thông tin 34 đơn vị hành chính cấp tỉnh và sắp xếp năm 2025 — Cổng thông tin Chính phủ](https://xaydungchinhsach.chinhphu.vn/chi-tiet-34-don-vi-hanh-chinh-cap-tinh-tu-12-6-2025-119250612141845533.htm).
- [Nghị quyết 202/2025/QH15 — tra cứu từ trang Chính phủ](https://xaydungchinhsach.chinhphu.vn/chi-tiet-34-don-vi-hanh-chinh-cap-tinh-tu-12-6-2025-119250612141845533.htm).
- [Bảng tổng hợp số lượng đơn vị hành chính — Cục Thống kê](https://danhmuchanhchinh.nso.gov.vn/Tinh_tk_new.aspx).
- [Niên giám thống kê tóm tắt 2024 — Cục Thống kê](https://www.nso.gov.vn/wp-content/uploads/2026/01/Nien-giam-tom-tat-2024.pdf).
- [Bản tin khí hậu — Trung tâm Dự báo KTTV quốc gia](https://nchmf.gov.vn/).
- [Tài liệu Geocoding API](https://openweathermap.org/api/geocoding-api), [Current Weather](https://openweathermap.org/api/current) và [5 day / 3 hour Forecast](https://openweathermap.org/api/forecast5) của OpenWeatherMap.
- [Quảng Ninh trở thành thành phố từ 01/9/2026](https://quangninh.gov.vn/Trang/ChiTietTinTuc.aspx?nid=168690); [Đồng Nai trở thành thành phố từ 30/4/2026](https://xaydungchinhsach.chinhphu.vn/ngay-24-4-quoc-hoi-tien-hanh-quyet-nghi-thanh-lap-thanh-pho-dong-nai-sua-doi-4-luat-thue-119260423203548273.htm); [Nghị quyết thành lập thành phố Bắc Ninh](https://www.ttdn.vn/tu-lieu-van-kien/chu-tich-quoc-hoi-tran-thanh-man-ky-chung-thuc-9-nghi-quyet-cua-quoc-hoi-khoa-xvi-118551).

Mốc danh sách cấp tỉnh: 12/6/2025; chính quyền địa phương mới hoạt động từ 1/7/2025. Đến 09/2026 có 34 đơn vị: 25 tỉnh, 9 thành phố trực thuộc trung ương. Số diện tích của các đơn vị hợp nhất lấy từ Nghị quyết 202/2025/QH15, của các địa phương khác lấy từ nguồn liên kết trong từng hồ sơ. Số liệu có thể được chỉnh lý sau đo đạc, nên mỗi hồ sơ hiển thị nguồn. Các nhãn miền Bắc / Trung / Nam chỉ để điều hướng học tập, không thể hiện phân vùng thống kê chính thức. Nội dung kinh tế, đặc sản, điểm đến là các ví dụ tiêu biểu chứ không phải danh mục đầy đủ hay số liệu sản lượng. Có thể bổ sung chi tiết từng tỉnh trong `province-details.js`.

Ba ảnh trong `assets/` được tạo cho dự án bằng công cụ ImageGen với mô tả lần lượt: ruộng bậc thang miền núi phía Bắc lúc sáng sớm; núi và bờ biển miền Trung lúc bình minh; sông và vườn cây đồng bằng sông Cửu Long. Chúng được ghi rõ là ảnh minh họa trên giao diện.
