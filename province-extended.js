// Dân số dưới đây là "quy mô dân số" ghi trong Nghị quyết 202/2025/QH15,
// KHÔNG phải ước tính dân số hiện tại. 11 địa phương không sắp xếp không có
// số liệu trong nghị quyết; giao diện nói rõ khi chưa có số cùng phương pháp.
export const population2025 = {
  'Tuyên Quang':'1.865.270','Lào Cai':'1.778.785','Thái Nguyên':'1.799.489',
  'Phú Thọ':'4.022.638','Bắc Ninh':'3.619.433','Hưng Yên':'3.567.943',
  'Hải Phòng':'4.664.124','Ninh Bình':'4.412.264','Quảng Trị':'1.870.845',
  'Đà Nẵng':'3.065.628','Quảng Ngãi':'2.161.755','Gia Lai':'3.583.693',
  'Khánh Hòa':'2.243.554','Lâm Đồng':'3.872.999','Đắk Lắk':'3.346.853',
  'Hồ Chí Minh':'14.002.598','Đồng Nai':'4.491.408','Tây Ninh':'3.254.170',
  'Cần Thơ':'4.199.824','Vĩnh Long':'4.257.581','Đồng Tháp':'4.370.046',
  'Cà Mau':'2.606.672','An Giang':'4.952.238'
};

// 11 địa phương không nhập tỉnh: dân số trung bình năm 2024 (nghìn người)
// từ Niên giám thống kê 2024, bảng 19/21, Cục Thống kê.
// Hiển thị riêng năm vì không cùng chỉ tiêu/mốc với quy mô dân số NQ 2025.
export const population2024 = {
  'Hà Nội':'8.717,6','Cao Bằng':'558,5','Điện Biên':'656,7',
  'Lai Châu':'495,5','Sơn La':'1.330,6','Lạng Sơn':'814,0',
  'Quảng Ninh':'1.396,5','Thanh Hóa':'3.764,2','Nghệ An':'3.472,3',
  'Hà Tĩnh':'1.329,8','Huế':'1.178,6'
};

// Tổng xã + phường + đặc khu theo bảng thống kê Cục Thống kê (cột 2026 PX).
export const communeCounts2026 = {
  'Hà Nội':126,'Cao Bằng':56,'Tuyên Quang':124,'Điện Biên':45,'Lai Châu':38,
  'Sơn La':75,'Lào Cai':99,'Thái Nguyên':92,'Lạng Sơn':65,'Quảng Ninh':54,
  'Bắc Ninh':99,'Phú Thọ':148,'Hải Phòng':114,'Hưng Yên':104,'Ninh Bình':129,
  'Thanh Hóa':166,'Nghệ An':130,'Hà Tĩnh':69,'Quảng Trị':78,'Huế':40,
  'Đà Nẵng':94,'Quảng Ngãi':96,'Gia Lai':135,'Khánh Hòa':65,'Đắk Lắk':102,
  'Lâm Đồng':124,'Đồng Nai':95,'Hồ Chí Minh':168,'Tây Ninh':96,
  'Đồng Tháp':102,'Vĩnh Long':124,'An Giang':102,'Cần Thơ':103,'Cà Mau':64
};

// Mỗi dòng: tên | khu vực tiếp giáp tiêu biểu | hạ tầng | giáo dục | văn hóa.
// Tiếp giáp là ví dụ học tập, KHÔNG phải danh sách đủ mọi đoạn ranh giới.
const rows=`Hà Nội|Phú Thọ, Thái Nguyên, Bắc Ninh, Hưng Yên, Ninh Bình|Sân bay Nội Bài, đường sắt và mạng cao tốc hướng tâm|Đại học Quốc gia Hà Nội, nhiều trường đại học và viện nghiên cứu|Di sản Thăng Long, hội Gióng, làng nghề truyền thống
Cao Bằng|Trung Quốc, Lạng Sơn, Thái Nguyên, Tuyên Quang|Quốc lộ 3, quốc lộ 4A và các cửa khẩu biên giới|Trường học vùng cao và đào tạo nghề gắn với nông lâm nghiệp|Văn hóa Tày, Nùng; lễ hội Lồng Tồng
Tuyên Quang|Trung Quốc, Lào Cai, Cao Bằng, Thái Nguyên, Phú Thọ|Quốc lộ 2, trục kết nối cao nguyên đá và vùng sông Lô|Đại học Tân Trào, giáo dục vùng cao|Không gian văn hóa các dân tộc vùng núi; di tích Tân Trào
Điện Biên|Lào, Trung Quốc, Lai Châu, Sơn La|Sân bay Điện Biên, quốc lộ 6 và trục kết nối cửa khẩu|Trường học vùng biên và đào tạo nghề du lịch, nông nghiệp|Di tích Chiến thắng Điện Biên Phủ; văn hóa Thái, Mông
Lai Châu|Trung Quốc, Lào Cai, Điện Biên, Sơn La|Quốc lộ 4D, trục Tây Bắc và các tuyến đèo núi|Giáo dục vùng cao, đào tạo nghề nông lâm|Văn hóa Thái, Mông, Dao và chợ phiên vùng cao
Sơn La|Lào, Lai Châu, Điện Biên, Phú Thọ, Tuyên Quang, Thanh Hóa|Quốc lộ 6, đường kết nối cao nguyên Mộc Châu|Đại học Tây Bắc, đào tạo ngành nông nghiệp|Văn hóa Thái; lễ hội Hết Chá ở Mộc Châu
Lào Cai|Trung Quốc, Lai Châu, Tuyên Quang, Phú Thọ, Sơn La|Cao tốc Nội Bài–Lào Cai, đường sắt và cửa khẩu|Các cơ sở đào tạo nghề du lịch và giáo dục vùng cao|Văn hóa chợ phiên vùng cao; ruộng bậc thang Mù Cang Chải
Thái Nguyên|Cao Bằng, Lạng Sơn, Bắc Ninh, Phú Thọ, Tuyên Quang|Cao tốc Hà Nội–Thái Nguyên, quốc lộ 3|Đại học Thái Nguyên là trung tâm đào tạo vùng|Văn hóa trà Tân Cương; truyền thống vùng Việt Bắc
Lạng Sơn|Trung Quốc, Cao Bằng, Thái Nguyên, Bắc Ninh, Quảng Ninh|Cửa khẩu Hữu Nghị, tuyến đường sắt liên vận và quốc lộ 1|Cơ sở đào tạo nghề thương mại, logistics cửa khẩu|Lễ hội Kỳ Cùng – Tả Phủ; văn hóa Tày, Nùng
Quảng Ninh|Trung Quốc, Hải Phòng, Bắc Ninh, Lạng Sơn, Biển Đông|Cảng Cái Lân, sân bay Vân Đồn, cao tốc ven biển|Đại học Hạ Long, đào tạo du lịch và kinh tế biển|Yên Tử, lễ hội Bạch Đằng, văn hóa vùng mỏ
Bắc Ninh|Hà Nội, Thái Nguyên, Lạng Sơn, Quảng Ninh, Hải Phòng, Hưng Yên|Cao tốc Hà Nội–Bắc Giang, các tuyến nối vùng công nghiệp|Đại học Kinh Bắc và các cơ sở đào tạo kỹ thuật|Dân ca quan họ, tranh Đông Hồ, chùa Vĩnh Nghiêm
Phú Thọ|Lào Cai, Tuyên Quang, Thái Nguyên, Hà Nội, Ninh Bình, Sơn La|Cao tốc Nội Bài–Lào Cai, trục quốc lộ 2 và 6|Đại học Hùng Vương, đào tạo vùng trung du|Tín ngưỡng thờ cúng Hùng Vương, không gian văn hóa Mường
Hải Phòng|Quảng Ninh, Bắc Ninh, Hưng Yên, Biển Đông|Cảng Lạch Huyện, sân bay Cát Bi, cao tốc Hà Nội–Hải Phòng|Đại học Hàng hải Việt Nam, Đại học Hải Phòng|Lễ hội chọi trâu Đồ Sơn, di sản Côn Sơn – Kiếp Bạc
Hưng Yên|Hà Nội, Bắc Ninh, Hải Phòng, Ninh Bình, Biển Đông|Cao tốc Hà Nội–Hải Phòng, tuyến đường ven biển phía đông|Đại học Sư phạm Kỹ thuật Hưng Yên, đào tạo nghề|Phố Hiến, chèo và lễ hội vùng đồng bằng
Ninh Bình|Hà Nội, Phú Thọ, Hưng Yên, Thanh Hóa, Biển Đông|Đường sắt Bắc–Nam, cao tốc Bắc–Nam, quốc lộ 1|Đại học Hoa Lư, cơ sở đào tạo du lịch và y dược|Tràng An, hát chèo, di sản cố đô Hoa Lư
Thanh Hóa|Sơn La, Phú Thọ, Ninh Bình, Nghệ An, Lào, Biển Đông|Cảng Nghi Sơn, sân bay Thọ Xuân, cao tốc Bắc–Nam|Đại học Hồng Đức, cơ sở đào tạo nghề công nghiệp|Thành Nhà Hồ; lễ hội Lam Kinh
Nghệ An|Thanh Hóa, Hà Tĩnh, Lào, Biển Đông|Sân bay Vinh, cảng Cửa Lò, cao tốc Bắc–Nam|Đại học Vinh, nhiều cơ sở đào tạo miền Trung|Dân ca ví giặm, quê hương Kim Liên
Hà Tĩnh|Nghệ An, Quảng Trị, Lào, Biển Đông|Cảng Vũng Áng, quốc lộ 1, cao tốc Bắc–Nam|Đại học Hà Tĩnh, đào tạo công nghiệp và dịch vụ|Ca trù Cổ Đạm, dân ca ví giặm
Quảng Trị|Hà Tĩnh, Huế, Lào, Biển Đông|Quốc lộ 1, cao tốc Bắc–Nam, hành lang Đông–Tây|Đại học Quảng Bình, các cơ sở đào tạo nghề|Di tích Thành Cổ Quảng Trị, văn hóa vùng hang động Phong Nha
Huế|Quảng Trị, Đà Nẵng, Lào, Biển Đông|Sân bay Phú Bài, cảng Chân Mây, đường sắt Bắc–Nam|Đại học Huế với nhiều trường thành viên|Quần thể di tích cố đô, nhã nhạc cung đình, Phật giáo
Đà Nẵng|Huế, Quảng Ngãi, Lào, Biển Đông|Sân bay Đà Nẵng, cảng Tiên Sa, đường sắt và cao tốc|Đại học Đà Nẵng, Đại học Duy Tân|Phố cổ Hội An, thánh địa Mỹ Sơn, lễ hội Cầu Ngư
Quảng Ngãi|Đà Nẵng, Gia Lai, Lào, Biển Đông|Cảng Dung Quất, quốc lộ 1, đường nối Tây Nguyên|Đại học Phạm Văn Đồng, đào tạo nghề công nghiệp|Di sản văn hóa Sa Huỳnh, văn hóa đảo Lý Sơn
Gia Lai|Quảng Ngãi, Đắk Lắk, Campuchia, Biển Đông|Sân bay Pleiku và Phù Cát, cảng Quy Nhơn|Đại học Quy Nhơn, các cơ sở đào tạo nông nghiệp và du lịch|Không gian cồng chiêng Tây Nguyên; võ cổ truyền Bình Định
Khánh Hòa|Đắk Lắk, Lâm Đồng, Biển Đông|Sân bay Cam Ranh, cảng biển, đường sắt Bắc–Nam|Đại học Nha Trang, đào tạo thủy sản và du lịch|Tháp Bà Ponagar, văn hóa Chăm vùng Ninh Thuận
Đắk Lắk|Gia Lai, Lâm Đồng, Campuchia, Biển Đông|Sân bay Buôn Ma Thuột, sân bay Tuy Hòa, quốc lộ 14|Đại học Tây Nguyên, đào tạo nông lâm và y khoa|Cồng chiêng Tây Nguyên; lễ hội cà phê; di sản ven biển Phú Yên
Lâm Đồng|Đắk Lắk, Khánh Hòa, Đồng Nai, Hồ Chí Minh, Campuchia, Biển Đông|Sân bay Liên Khương, đường nối cao nguyên với duyên hải|Đại học Đà Lạt, đào tạo nông nghiệp công nghệ cao|Văn hóa Tây Nguyên, di sản Đà Lạt, lễ hội ven biển Bình Thuận
Đồng Nai|Hồ Chí Minh, Lâm Đồng, Tây Ninh, Campuchia|Sân bay Long Thành, cao tốc TP.HCM–Long Thành–Dầu Giây|Đại học Đồng Nai, các trường nghề công nghiệp|Văn hóa Đồng Nai, cộng đồng S'tiêng tại Bình Phước cũ
Hồ Chí Minh|Đồng Nai, Tây Ninh, Lâm Đồng, Biển Đông|Sân bay Tân Sơn Nhất, cảng Cái Mép–Thị Vải, metro|Đại học Quốc gia TP.HCM và nhiều đại học, viện nghiên cứu|Sự giao thoa văn hóa đô thị, lễ hội Nghinh Ông, di tích Côn Đảo
Tây Ninh|Campuchia, Hồ Chí Minh, Đồng Nai, Đồng Tháp|Cửa khẩu Mộc Bài, Xa Mát, các tuyến nối TP.HCM|Đại học Tây Ninh, cơ sở đào tạo nghề nông nghiệp|Tòa Thánh Cao Đài, lễ hội núi Bà Đen
Đồng Tháp|Tây Ninh, Vĩnh Long, An Giang, Cần Thơ, Campuchia, Biển Đông|Cầu Cao Lãnh, cầu Mỹ Thuận và các trục sông Tiền|Đại học Đồng Tháp, đào tạo nông nghiệp và sư phạm|Văn hóa sen, làng hoa Sa Đéc, lễ hội Gò Tháp
Vĩnh Long|Đồng Tháp, Cần Thơ, Biển Đông|Cầu Mỹ Thuận, cầu Cổ Chiên, đường thủy sông Tiền–Hậu|Đại học Cửu Long, Trường Đại học Trà Vinh|Văn hóa miệt vườn, lễ hội Nghinh Ông ven biển, di sản Khmer
An Giang|Campuchia, Đồng Tháp, Cần Thơ, Cà Mau, Vịnh Thái Lan|Cảng Rạch Giá, sân bay Phú Quốc, tuyến đường thủy|Đại học An Giang, cơ sở đào tạo du lịch và thủy sản|Lễ hội Vía Bà Chúa Xứ núi Sam, văn hóa Khmer và Chăm
Cần Thơ|An Giang, Vĩnh Long, Đồng Tháp, Cà Mau, Biển Đông|Sân bay Cần Thơ, cảng sông Hậu, cầu Cần Thơ|Đại học Cần Thơ, trung tâm đào tạo đồng bằng|Chợ nổi Cái Răng, văn hóa Khmer Sóc Trăng
Cà Mau|An Giang, Cần Thơ, Biển Đông, Vịnh Thái Lan|Sân bay Cà Mau, cảng Năm Căn, đường thủy ven biển|Đại học Bạc Liêu, trường nghề thủy sản|Đờn ca tài tử Nam Bộ, văn hóa Khmer, lễ hội Nghinh Ông`;

export const extraDetails=Object.fromEntries(rows.split('\n').map(line=>{
  const [name,borders,transport,education,culture]=line.split('|');
  return [name,{borders,transport,education,culture}];
}));

const coastCentral = new Set(['Quảng Trị','Huế','Đà Nẵng','Quảng Ngãi']);
const mixedHighland = new Set(['Gia Lai','Đắk Lắk','Lâm Đồng']);
export function rainySeason(province){
  const name=province.name;
  if(mixedHighland.has(name)) return 'Cao nguyên phía tây: thường khoảng tháng 5–10; vùng duyên hải phía đông: mưa tập trung hơn vào khoảng tháng 9–12. Khác biệt lớn theo địa hình.';
  if(name==='Khánh Hòa') return 'Ven biển Khánh Hòa cũ thường tập trung khoảng tháng 9–12; khu vực Ninh Thuận cũ khô hơn, mưa thường ít và thất thường.';
  if(coastCentral.has(name)) return 'Vùng duyên hải thường mưa tập trung khoảng tháng 9–12; vùng núi phía tây có thể bắt đầu sớm hơn.';
  if(['Thanh Hóa','Nghệ An','Hà Tĩnh'].includes(name)) return 'Thường khoảng tháng 5–10; mưa lớn do bão hoặc áp thấp có thể dồn vào cuối mùa.';
  if(province.region==='Bắc') return 'Thường khoảng tháng 5–10; mưa lớn tập trung mùa hạ, thay đổi theo vùng núi và đồng bằng.';
  return 'Thường khoảng tháng 5–11; mùa khô nhìn chung từ tháng 12 đến tháng 4 năm sau, có thể có mưa trái mùa.';
}
