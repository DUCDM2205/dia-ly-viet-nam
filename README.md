# Địa lý Việt Nam

Website học địa lý Việt Nam dạng tĩnh, không cần API key, cơ sở dữ liệu hay bước cài đặt. Có 12 bài học, hồ sơ 34 tỉnh/thành và ôn tập 10 câu mỗi lượt từ ngân hàng 20 câu. Mỗi hồ sơ có diện tích, địa hình, khí hậu, công nghiệp, nông nghiệp, đặc sản, điểm đến và vấn đề môi trường.

## Chạy bằng Visual Studio Code

1. Giải nén và mở thư mục `dia-ly-viet-nam` trong VS Code.
2. Mở Terminal và chạy:

   ```bash
   python -m http.server 8000
   ```

   Trên Windows, nếu lệnh `python` không có, thử `py -m http.server 8000`.
3. Mở <http://localhost:8000> trên trình duyệt.

Có thể dùng extension Live Server và chọn **Open with Live Server** tại `index.html`. Không nên mở trực tiếp `index.html` bằng giao thức `file://` vì trình duyệt có thể chặn JavaScript module.

## Cấu trúc

- `index.html`: các màn hình và cấu trúc nội dung.
- `styles.css`: giao diện responsive.
- `data.js`: tỉnh/thành, bài học, câu hỏi. Có thể sửa nội dung tại đây.
- `province-details.js`: 34 hồ sơ và liên kết nguồn diện tích cho từng địa phương.
- `app.js`: tìm kiếm, lọc, hộp thông tin, điểm học, trò chơi.
- `assets/`: ba ảnh minh họa Bắc, Trung, Nam. Đây là hình tạo bằng AI theo mô tả cảnh quan, **không phải ảnh chụp địa điểm hoặc tỉnh cụ thể**.

Tiến độ đánh dấu bài đã học được lưu bằng `localStorage` trong trình duyệt hiện tại. Không có tài khoản hoặc đồng bộ nhiều thiết bị. Font Google có thể không tải khi ngoại tuyến; giao diện tự chuyển sang font có sẵn. Phần còn lại hoạt động ngoại tuyến sau khi tải source.

## Nguồn dữ liệu

- [Thông tin 34 đơn vị hành chính cấp tỉnh và sắp xếp năm 2025 — Cổng thông tin Chính phủ](https://xaydungchinhsach.chinhphu.vn/chi-tiet-34-don-vi-hanh-chinh-cap-tinh-tu-12-6-2025-119250612141845533.htm).
- [Nghị quyết 202/2025/QH15 — tra cứu từ trang Chính phủ](https://xaydungchinhsach.chinhphu.vn/chi-tiet-34-don-vi-hanh-chinh-cap-tinh-tu-12-6-2025-119250612141845533.htm).
- [Quảng Ninh trở thành thành phố từ 01/9/2026](https://quangninh.gov.vn/Trang/ChiTietTinTuc.aspx?nid=168690); [Đồng Nai trở thành thành phố từ 30/4/2026](https://xaydungchinhsach.chinhphu.vn/ngay-24-4-quoc-hoi-tien-hanh-quyet-nghi-thanh-lap-thanh-pho-dong-nai-sua-doi-4-luat-thue-119260423203548273.htm); [Nghị quyết thành lập thành phố Bắc Ninh](https://www.ttdn.vn/tu-lieu-van-kien/chu-tich-quoc-hoi-tran-thanh-man-ky-chung-thuc-9-nghi-quyet-cua-quoc-hoi-khoa-xvi-118551).

Mốc danh sách cấp tỉnh: 12/6/2025; chính quyền địa phương mới hoạt động từ 1/7/2025. Đến 09/2026 có 34 đơn vị: 25 tỉnh, 9 thành phố trực thuộc trung ương. Số diện tích của các đơn vị hợp nhất lấy từ Nghị quyết 202/2025/QH15, của các địa phương khác lấy từ nguồn liên kết trong từng hồ sơ. Số liệu có thể được chỉnh lý sau đo đạc, nên mỗi hồ sơ hiển thị nguồn. Các nhãn miền Bắc / Trung / Nam chỉ để điều hướng học tập, không thể hiện phân vùng thống kê chính thức. Nội dung kinh tế, đặc sản, điểm đến là các ví dụ tiêu biểu chứ không phải danh mục đầy đủ hay số liệu sản lượng. Có thể bổ sung chi tiết từng tỉnh trong `province-details.js`.

Ba ảnh trong `assets/` được tạo cho dự án bằng công cụ ImageGen với mô tả lần lượt: ruộng bậc thang miền núi phía Bắc lúc sáng sớm; núi và bờ biển miền Trung lúc bình minh; sông và vườn cây đồng bằng sông Cửu Long. Chúng được ghi rõ là ảnh minh họa trên giao diện.
