// Địa giới cấp tỉnh: Nghị quyết 202/2025/QH15; loại hình cập nhật đến 09/2026.
// Vùng Bắc / Trung / Nam ở đây chỉ dùng để điều hướng nội dung học tập.
export const provinces = [
  ['Hà Nội','Bắc','Thành phố','Thủ đô, trung tâm chính trị, đồng bằng sông Hồng',''],
  ['Cao Bằng','Bắc','Tỉnh','Thác Bản Giốc, địa hình núi đá vôi',''],
  ['Tuyên Quang','Bắc','Tỉnh','Cao nguyên đá Đồng Văn, sông Lô','Hà Giang'],
  ['Điện Biên','Bắc','Tỉnh','Lòng chảo Điện Biên, địa hình Tây Bắc',''],
  ['Lai Châu','Bắc','Tỉnh','Núi cao Tây Bắc, dãy Hoàng Liên Sơn',''],
  ['Sơn La','Bắc','Tỉnh','Cao nguyên Mộc Châu, hồ thủy điện Sơn La',''],
  ['Lào Cai','Bắc','Tỉnh','Sa Pa, đỉnh Fansipan','Yên Bái'],
  ['Thái Nguyên','Bắc','Tỉnh','Vùng chè và trung du Bắc Bộ','Bắc Kạn'],
  ['Lạng Sơn','Bắc','Tỉnh','Cửa khẩu Hữu Nghị, miền núi Đông Bắc',''],
  ['Quảng Ninh','Bắc','Thành phố','Vịnh Hạ Long, biển đảo Đông Bắc',''],
  ['Bắc Ninh','Bắc','Thành phố','Không gian văn hóa Kinh Bắc','Bắc Giang'],
  ['Phú Thọ','Bắc','Tỉnh','Đất Tổ, vùng chuyển tiếp trung du và miền núi','Vĩnh Phúc, Hòa Bình'],
  ['Hải Phòng','Bắc','Thành phố','Thành phố cảng, Cát Bà','Hải Dương'],
  ['Hưng Yên','Bắc','Tỉnh','Đồng bằng sông Hồng, vùng đất Phố Hiến','Thái Bình'],
  ['Ninh Bình','Bắc','Tỉnh','Quần thể danh thắng Tràng An','Hà Nam, Nam Định'],
  ['Thanh Hóa','Trung','Tỉnh','Chuyển tiếp giữa Bắc Bộ và Bắc Trung Bộ',''],
  ['Nghệ An','Trung','Tỉnh','Sông Lam, miền Tây Nghệ An',''],
  ['Hà Tĩnh','Trung','Tỉnh','Dãy Trường Sơn, bờ biển Bắc Trung Bộ',''],
  ['Quảng Trị','Trung','Tỉnh','Phong Nha – Kẻ Bàng, dải ven biển miền Trung','Quảng Bình'],
  ['Huế','Trung','Thành phố','Sông Hương, đầm phá Tam Giang',''],
  ['Đà Nẵng','Trung','Thành phố','Đô thị biển và không gian Quảng Nam','Quảng Nam'],
  ['Quảng Ngãi','Trung','Tỉnh','Đảo Lý Sơn và vùng cao nguyên phía tây','Kon Tum'],
  ['Gia Lai','Trung','Tỉnh','Không gian cao nguyên và duyên hải','Bình Định'],
  ['Khánh Hòa','Trung','Tỉnh','Vịnh Nha Trang, vùng ven biển Nam Trung Bộ','Ninh Thuận'],
  ['Đắk Lắk','Trung','Tỉnh','Cao nguyên cà phê và duyên hải Phú Yên','Phú Yên'],
  ['Lâm Đồng','Trung','Tỉnh','Đà Lạt, cao nguyên và ven biển','Đắk Nông, Bình Thuận'],
  ['Đồng Nai','Nam','Thành phố','Sông Đồng Nai, vùng công nghiệp Đông Nam Bộ','Bình Phước'],
  ['Hồ Chí Minh','Nam','Thành phố','Đô thị lớn, kết nối vùng Đông Nam Bộ','Bình Dương, Bà Rịa – Vũng Tàu'],
  ['Tây Ninh','Nam','Tỉnh','Núi Bà Đen và cửa ngõ phía tây','Long An'],
  ['Đồng Tháp','Nam','Tỉnh','Đồng bằng sông Cửu Long, vùng Đồng Tháp Mười','Tiền Giang'],
  ['Vĩnh Long','Nam','Tỉnh','Sông Tiền – sông Hậu, vườn cây ăn trái','Bến Tre, Trà Vinh'],
  ['An Giang','Nam','Tỉnh','Núi Thất Sơn, đảo Phú Quốc','Kiên Giang'],
  ['Cần Thơ','Nam','Thành phố','Đô thị trung tâm đồng bằng sông Cửu Long','Sóc Trăng, Hậu Giang'],
  ['Cà Mau','Nam','Tỉnh','Đất Mũi, hệ sinh thái rừng ngập mặn','Bạc Liêu']
].map(([name,region,type,feature,merged]) => ({name,region,type,feature,merged}));

// Danh sách 63 đơn vị cấp tỉnh ngay trước đợt sắp xếp 2025.
// Thành phố Huế đã thay Thừa Thiên Huế từ 01/01/2025.
const formerCities=new Set(['Hà Nội','Hải Phòng','Huế','Đà Nẵng','Hồ Chí Minh','Cần Thơ']);
export const historicProvinces=provinces.flatMap(current=>
  [current.name,...(current.merged?current.merged.split(',').map(x=>x.trim()):[])]
    .map(name=>({name,current:current.name,region:current.region,type:formerCities.has(name)?'Thành phố':'Tỉnh'}))
);

export const lessons = [
  {id:'vi-tri',icon:'◎',category:'Nền tảng',title:'Vị trí & lãnh thổ',time:6,summary:'Việt Nam ở đâu trên bản đồ thế giới và vì sao vị trí đó quan trọng?',points:[['Vị trí','Việt Nam nằm ở rìa phía đông bán đảo Đông Dương, thuộc khu vực Đông Nam Á. Phần đất liền có hình dạng kéo dài theo trục bắc – nam.'],['Tiếp giáp','Trên đất liền, Việt Nam tiếp giáp Trung Quốc, Lào và Campuchia; phía đông và nam hướng ra Biển Đông.'],['Ý nghĩa','Vị trí nối giữa lục địa và biển tạo điều kiện giao lưu kinh tế, văn hóa, đồng thời làm thiên nhiên phân hóa đa dạng.']],remember:'Nhớ 3 nước láng giềng trên đất liền: Trung Quốc – Lào – Campuchia.'},
  {id:'dia-hinh',icon:'△',category:'Tự nhiên',title:'Địa hình Việt Nam',time:7,summary:'Từ núi cao Tây Bắc đến đồng bằng và dải ven biển.',points:[['Đặc điểm chung','Địa hình đồi núi chiếm phần lớn diện tích đất liền, chủ yếu là đồi núi thấp. Địa hình thấp dần từ tây bắc xuống đông nam.'],['Các khu vực','Miền núi gồm Đông Bắc, Tây Bắc, Trường Sơn Bắc và Trường Sơn Nam. Hai đồng bằng lớn là đồng bằng sông Hồng và đồng bằng sông Cửu Long.'],['Tác động','Địa hình ảnh hưởng đến khí hậu, sông ngòi, giao thông, phân bố dân cư và sản xuất.']],remember:'Đồi núi là phần lớn diện tích; đồng bằng tập trung dân cư và nhiều hoạt động nông nghiệp.'},
  {id:'khi-hau',icon:'☀',category:'Tự nhiên',title:'Khí hậu & gió mùa',time:7,summary:'Hiểu mưa, nhiệt độ và sự khác biệt giữa các miền.',points:[['Tính chất','Khí hậu mang tính nhiệt đới ẩm gió mùa, với nhiệt độ và độ ẩm nhìn chung cao.'],['Phân hóa','Miền Bắc có mùa đông chịu tác động rõ của gió mùa Đông Bắc; miền Nam có sự phân biệt rõ hơn giữa mùa mưa và mùa khô.'],['Theo độ cao','Vùng núi cao mát hơn vùng thấp. Dãy núi và hướng gió có thể tạo khác biệt lượng mưa giữa hai sườn núi.']],remember:'Đừng dùng một kiểu thời tiết để mô tả tất cả 34 tỉnh, thành.'},
  {id:'song-ngoi',icon:'≈',category:'Tự nhiên',title:'Sông ngòi & hồ',time:6,summary:'Hai hệ thống sông lớn và vai trò của nước.',points:[['Đặc điểm','Mạng lưới sông ngòi khá dày; lượng nước và phù sa thay đổi theo mùa mưa – mùa khô.'],['Hệ thống tiêu biểu','Sông Hồng và hệ thống sông Mê Công là hai hệ thống đặc biệt quan trọng đối với các đồng bằng lớn.'],['Vai trò','Sông cung cấp nước, phù sa, giao thông và thủy điện; đồng thời có thể gây lũ hoặc thiếu nước theo mùa.']],remember:'Sông Hồng gắn với đồng bằng Bắc Bộ; Mê Công gắn với đồng bằng Nam Bộ.'},
  {id:'bien-dao',icon:'◈',category:'Tự nhiên',title:'Biển & hải đảo',time:6,summary:'Vùng ven biển, các đảo và sinh kế gắn với biển.',points:[['Không gian','Biển Đông có vai trò lớn đối với khí hậu và hoạt động kinh tế của Việt Nam. Bờ biển kéo dài qua nhiều miền tự nhiên.'],['Đảo và quần đảo','Một số đảo, nhóm đảo thường gặp trong bài học địa lý gồm Cát Bà, Lý Sơn, Phú Quốc, Hoàng Sa và Trường Sa.'],['Kinh tế và môi trường','Du lịch biển, thủy sản, vận tải biển gắn với nhu cầu bảo vệ hệ sinh thái ven bờ và thích ứng thiên tai.']],remember:'Học vị trí đảo theo vùng trước, sau đó mới học đặc điểm từng đảo.'},
  {id:'dat-rung',icon:'✳',category:'Tự nhiên',title:'Đất, rừng & sinh vật',time:6,summary:'Vì sao thiên nhiên Việt Nam đa dạng?',points:[['Đất','Đất feralit phổ biến ở miền đồi núi; đất phù sa tập trung ở đồng bằng và thung lũng sông.'],['Rừng','Rừng nhiệt đới có nhiều kiểu hệ sinh thái; rừng ngập mặn nổi bật ở một số vùng ven biển và cửa sông.'],['Bảo tồn','Suy giảm sinh cảnh, cháy rừng và ô nhiễm làm gia tăng áp lực lên đa dạng sinh học.']],remember:'Liên hệ địa hình – khí hậu – đất – sinh vật khi giải thích một cảnh quan.'},
  {id:'mien-bac',icon:'↗',category:'Các miền',title:'Miền Bắc',time:7,summary:'Núi cao, trung du, đồng bằng và bờ biển Đông Bắc.',points:[['Tây Bắc','Nổi bật với núi cao, thung lũng và địa hình chia cắt; có Fansipan thuộc dãy Hoàng Liên Sơn.'],['Đông Bắc','Phổ biến địa hình núi và cao nguyên đá vôi; ven biển có các vịnh và đảo.'],['Đồng bằng sông Hồng','Mật độ dân cư và mạng lưới đô thị cao; Hà Nội và Hải Phòng là các đô thị lớn.']],remember:'Miền Bắc không chỉ có núi: hãy nhớ cả đồng bằng và biển đảo.'},
  {id:'mien-trung',icon:'↗',category:'Các miền',title:'Miền Trung & Tây Nguyên',time:8,summary:'Dải đất hẹp, hệ núi Trường Sơn và các cao nguyên.',points:[['Duyên hải','Nhiều nơi đồng bằng ven biển nhỏ, hẹp; núi nằm gần biển.'],['Tây Nguyên','Các cao nguyên có vai trò lớn đối với nông nghiệp cây công nghiệp, đặc biệt là cà phê.'],['Thiên tai','Bão, mưa lớn và lũ tác động mạnh đến nhiều địa phương ven biển; Tây Nguyên thường có mùa mưa và mùa khô rõ.']],remember:'Từ tây sang đông có thể chuyển nhanh từ cao nguyên hoặc núi xuống đồng bằng ven biển.'},
  {id:'mien-nam',icon:'↗',category:'Các miền',title:'Miền Nam',time:7,summary:'Đông Nam Bộ và đồng bằng sông Cửu Long.',points:[['Đông Nam Bộ','Khu vực có hoạt động công nghiệp, dịch vụ và đô thị phát triển; sông Đồng Nai là một trục tự nhiên quan trọng.'],['Đồng bằng sông Cửu Long','Hệ thống sông, kênh rạch dày; gắn với nông nghiệp, thủy sản và sinh kế sông nước.'],['Thách thức','Xâm nhập mặn, sụt lún và biến đổi dòng chảy là những vấn đề cần tìm hiểu khi nghiên cứu vùng đồng bằng.']],remember:'Phân biệt Đông Nam Bộ với đồng bằng sông Cửu Long bằng địa hình và sinh kế.'},
  {id:'dan-cu',icon:'♙',category:'Con người',title:'Dân cư & đô thị',time:6,summary:'Vì sao dân cư phân bố không đều?',points:[['Phân bố','Dân cư tập trung đông hơn ở đồng bằng, vùng ven biển và các đô thị lớn so với nhiều vùng núi.'],['Đô thị hóa','Đô thị tạo cơ hội việc làm và dịch vụ, đồng thời đặt ra yêu cầu về giao thông, nhà ở và môi trường.'],['Văn hóa','Sự đa dạng các cộng đồng dân tộc góp phần tạo nên nhiều hình thức sinh hoạt, kiến trúc và văn hóa địa phương.']],remember:'Khi nhìn mật độ dân cư, hãy hỏi cả điều kiện tự nhiên lẫn cơ hội việc làm.'},
  {id:'kinh-te',icon:'▥',category:'Con người',title:'Kinh tế theo vùng',time:7,summary:'Tìm hiểu mối liên hệ giữa tự nhiên và sản xuất.',points:[['Nông nghiệp','Đồng bằng thuận lợi trồng lúa; vùng cao nguyên thích hợp với một số cây công nghiệp tùy điều kiện đất và khí hậu.'],['Công nghiệp – dịch vụ','Các đô thị và hành lang giao thông lớn thu hút doanh nghiệp, thương mại và dịch vụ.'],['Liên kết vùng','Một tỉnh có thể đồng thời có núi, biển và đồng bằng; sau sắp xếp năm 2025, cần tránh gán một đặc điểm duy nhất cho toàn tỉnh.']],remember:'Giải thích hoạt động kinh tế qua tài nguyên, lao động, hạ tầng và thị trường.'},
  {id:'hanh-chinh',icon:'▦',category:'Hành chính',title:'34 tỉnh, thành phố',time:5,summary:'Tìm hiểu sắp xếp năm 2025 và việc thành lập thêm thành phố năm 2026.',points:[['Mốc 2025','Từ ngày 12/6/2025, cả nước có 34 đơn vị hành chính cấp tỉnh: 28 tỉnh và 6 thành phố trực thuộc trung ương.'],['Cập nhật 2026','Đồng Nai, Quảng Ninh và Bắc Ninh đã trở thành thành phố trực thuộc trung ương. Tính đến tháng 9/2026, 34 đơn vị gồm 25 tỉnh và 9 thành phố.'],['Lưu ý','Vùng Bắc, Trung, Nam trong ứng dụng là cách nhóm bài học để dễ tìm kiếm, không thay cho phân vùng thống kê chính thức.']],remember:'34 = 25 tỉnh + 9 thành phố (09/2026).'}
];

export const questions = [
  ['Việt Nam thuộc khu vực nào?',['Đông Nam Á','Nam Á','Đông Á','Tây Á'],0,'Việt Nam nằm ở Đông Nam Á.'],
  ['Quốc gia nào KHÔNG tiếp giáp Việt Nam trên đất liền?',['Thái Lan','Lào','Campuchia','Trung Quốc'],0,'Ba nước tiếp giáp trên đất liền là Trung Quốc, Lào và Campuchia.'],
  ['Địa hình nào chiếm phần lớn diện tích đất liền?',['Đồi núi','Đồng bằng','Đầm phá','Sa mạc'],0,'Đồi núi chiếm phần lớn, chủ yếu là đồi núi thấp.'],
  ['Đồng bằng nào gắn với hệ thống sông Mê Công?',['Đồng bằng sông Cửu Long','Đồng bằng sông Hồng','Đồng bằng Thanh Hóa','Đồng bằng ven biển Bắc Bộ'],0,'Sông Mê Công gắn với đồng bằng sông Cửu Long.'],
  ['Fansipan thuộc khu vực địa hình nào?',['Tây Bắc','Đông Nam Bộ','Đồng bằng sông Hồng','Đồng bằng sông Cửu Long'],0,'Fansipan nằm trong dãy Hoàng Liên Sơn ở vùng Tây Bắc.'],
  ['Biểu hiện nổi bật của khí hậu miền Bắc là gì?',['Có mùa đông chịu tác động của gió mùa Đông Bắc','Khô hạn quanh năm','Không có mùa mưa','Tuyết phủ quanh năm'],0,'Gió mùa Đông Bắc ảnh hưởng rõ tới mùa đông ở miền Bắc.'],
  ['Loại đất nào phổ biến ở các đồng bằng sông?',['Đất phù sa','Đất feralit','Đất băng giá','Đất hoang mạc'],0,'Đất phù sa tập trung ở đồng bằng và thung lũng sông.'],
  ['Đảo Lý Sơn thuộc tỉnh hiện hành nào?',['Quảng Ngãi','Quảng Ninh','An Giang','Cà Mau'],0,'Lý Sơn thuộc tỉnh Quảng Ngãi.'],
  ['Tính từ ngày 12/6/2025, Việt Nam có bao nhiêu đơn vị hành chính cấp tỉnh?',['34','63','28','36'],0,'Có 34 đơn vị hành chính cấp tỉnh.'],
  ['Tính đến tháng 9/2026, trong 34 đơn vị hành chính cấp tỉnh có bao nhiêu thành phố trực thuộc trung ương?',['9','6','8','12'],0,'Gồm 9 thành phố và 25 tỉnh, sau khi Đồng Nai, Quảng Ninh, Bắc Ninh trở thành thành phố.'],
  ['Tỉnh nào gồm cả địa bàn Quảng Bình trước sắp xếp?',['Quảng Trị','Quảng Ngãi','Hà Tĩnh','Huế'],0,'Quảng Bình và Quảng Trị được sắp xếp thành tỉnh Quảng Trị.'],
  ['Tỉnh nào gồm địa bàn Kiên Giang trước sắp xếp?',['An Giang','Cà Mau','Cần Thơ','Đồng Tháp'],0,'Kiên Giang và An Giang được sắp xếp thành tỉnh An Giang.'],
  ['Địa phương nào KHÔNG là thành phố trực thuộc trung ương tính đến tháng 9/2026?',['Ninh Bình','Huế','Quảng Ninh','Đồng Nai'],0,'Ninh Bình là tỉnh; ba địa phương còn lại là thành phố trực thuộc trung ương.'],
  ['Thành phố Hải Phòng hiện hành bao gồm địa bàn tỉnh nào trước sắp xếp?',['Hải Dương','Hưng Yên','Bắc Ninh','Quảng Ninh'],0,'Hải Phòng và Hải Dương được sắp xếp thành thành phố Hải Phòng.'],
  ['Vùng nào nổi bật với hệ thống kênh rạch và sinh kế sông nước?',['Đồng bằng sông Cửu Long','Tây Bắc','Đông Bắc','Tây Nguyên'],0,'Đồng bằng sông Cửu Long có mạng lưới sông và kênh rạch dày.'],
  ['Thành phố Hồ Chí Minh hiện hành bao gồm địa bàn nào trước sắp xếp?',['Bình Dương và Bà Rịa – Vũng Tàu','Đồng Nai và Tây Ninh','Long An và Tiền Giang','Bình Phước và Đồng Nai'],0,'TP.HCM, Bình Dương và Bà Rịa – Vũng Tàu được sắp xếp thành TP.HCM.'],
  ['Tỉnh nào hiện bao gồm địa bàn Bình Thuận trước sắp xếp?',['Lâm Đồng','Khánh Hòa','Đắk Lắk','Gia Lai'],0,'Bình Thuận, Đắk Nông và Lâm Đồng được sắp xếp thành tỉnh Lâm Đồng.'],
  ['Cao nguyên Mộc Châu gắn với tỉnh nào?',['Sơn La','Cao Bằng','Lạng Sơn','Quảng Ninh'],0,'Mộc Châu thuộc Sơn La.'],
  ['Tỉnh nào hiện bao gồm địa bàn tỉnh Bình Định trước sắp xếp?',['Gia Lai','Quảng Ngãi','Đắk Lắk','Khánh Hòa'],0,'Bình Định và Gia Lai được sắp xếp thành tỉnh Gia Lai.'],
  ['Quần thể danh thắng Tràng An thuộc tỉnh hiện hành nào?',['Ninh Bình','Hưng Yên','Thanh Hóa','Phú Thọ'],0,'Tràng An thuộc tỉnh Ninh Bình.']
].map(([prompt,options,answer,explain])=>({prompt,options,answer,explain}));
