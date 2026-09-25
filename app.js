import {provinces,historicProvinces,lessons,questions} from './data.js';
import {provinceDetails} from './province-details.js';
import {extraDetails,population2025,population2024,communeCounts2026,rainySeason} from './province-extended.js';
import {initWeather,weatherSummary,openWeatherForProvince} from './weather.js';

const $=selector=>document.querySelector(selector);
const safe=text=>String(text).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const normalize=text=>String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase();
const regionPhoto=region=>`assets/mien-${({Bắc:'bac',Trung:'trung',Nam:'nam'})[region]}.png`;
const completed=new Set(JSON.parse(localStorage.getItem('dia-ly-completed')||'[]'));
let lessonFilter='Tất cả',provinceFilter='Tất cả',provinceEra='current',round=[],questionIndex=0,score=0,chosen=null;

function navigate(){
  const id=location.hash.slice(1)||'tong-quan';
  const target=document.getElementById(id)?id:'tong-quan';
  document.querySelectorAll('.view').forEach(view=>view.classList.toggle('active',view.id===target));
  document.querySelectorAll('.nav-link').forEach(link=>{const active=link.dataset.nav===target;link.classList.toggle('active',active);active?link.setAttribute('aria-current','page'):link.removeAttribute('aria-current')});
  $('.sidebar').classList.remove('open');$('#menu-btn').setAttribute('aria-expanded','false');window.scrollTo({top:0,behavior:'instant'});
}
window.addEventListener('hashchange',navigate);
$('#menu-btn').addEventListener('click',()=>{const open=$('.sidebar').classList.toggle('open');$('#menu-btn').setAttribute('aria-expanded',String(open))});
document.addEventListener('keydown',event=>{if(event.key==='/'&&document.activeElement.tagName!=='INPUT'&&!$('#detail-dialog').open){event.preventDefault();location.hash='tinh-thanh';setTimeout(()=>$('#province-search').focus(),40)}});

function filters(container,labels,selected,onSelect){
  container.innerHTML=labels.map(label=>`<button type="button" class="filter ${label===selected?'active':''}" data-filter="${safe(label)}" aria-pressed="${label===selected}">${safe(label)}</button>`).join('');
  container.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>onSelect(button.dataset.filter)));
}
function renderLessons(){
  const labels=['Tất cả','Nền tảng','Tự nhiên','Các miền','Con người','Hành chính'];
  filters($('#lesson-filters'),labels,lessonFilter,value=>{lessonFilter=value;renderLessons()});
  const items=lessons.filter(x=>lessonFilter==='Tất cả'||x.category===lessonFilter);
  $('#lesson-count').textContent=`${items.length} bài học`;
  $('#lesson-grid').innerHTML=items.map(lesson=>`<button class="lesson-card" type="button" data-lesson="${lesson.id}"><div class="lesson-card-top"><span class="lesson-icon">${lesson.icon}</span><span>${safe(lesson.category.toUpperCase())} · ${lesson.time} PHÚT</span></div><h3>${safe(lesson.title)}</h3><p>${safe(lesson.summary)}</p><div class="lesson-footer"><span class="${completed.has(lesson.id)?'done':''}">${completed.has(lesson.id)?'✓ Đã học':'Đọc bài học'}</span><span class="arrow">↗</span></div></button>`).join('');
  $('#lesson-grid').querySelectorAll('[data-lesson]').forEach(button=>button.addEventListener('click',()=>openLesson(button.dataset.lesson)));
}
function renderProvinces(){
  filters($('#province-filters'),['Tất cả','Bắc','Trung','Nam'],provinceFilter,value=>{provinceFilter=value;renderProvinces()});
  document.querySelectorAll('[data-era]').forEach(button=>{const active=button.dataset.era===provinceEra;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});
  document.querySelectorAll('[data-region]').forEach(button=>{const active=button.dataset.region===provinceFilter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});
  const term=normalize($('#province-search').value.trim());
  const old=provinceEra==='historic', source=old?historicProvinces:provinces;
  const items=source.filter(x=>{const current=old?provinces.find(p=>p.name===x.current):x,d=provinceDetails[current.name];return (provinceFilter==='Tất cả'||x.region===provinceFilter)&&normalize(old?x.name:`${x.name} ${current.merged} ${current.feature} ${d.specialties} ${d.places} ${d.agriculture} ${d.industry}`).includes(term)});
  $('#province-count').textContent=`${items.length} / ${source.length} địa phương`;
  $('#province-grid').innerHTML=items.length?items.map((x,index)=>{const p=old?provinces.find(item=>item.name===x.current):x;return `<button class="province-card" type="button" data-province="${safe(p.name)}" ${old?`data-former="${safe(x.name)}"`:''}><div class="province-cover"><img src="${regionPhoto(p.region)}" alt="" loading="lazy"><span>Ảnh minh họa miền ${safe(p.region)}</span></div><div class="province-card-content"><div class="province-top"><span class="region-pill">Miền ${safe(p.region)}</span><span class="province-number">${String(index+1).padStart(2,'0')} / ${source.length}</span></div><h3>${x.type==='Thành phố'?'TP. ':''}${safe(x.name)}</h3><p>${old?`Trước sắp xếp 2025 · nay thuộc ${safe(p.type.toLowerCase())} ${safe(p.name)}`:safe(p.feature)}</p><span class="province-type">${old?'Xem địa bàn và thông tin hiện nay →':`${safe(provinceDetails[p.name].area)} km² · ${safe(p.type)} →`}</span></div></button>`}).join(''):'<p class="empty">Không tìm thấy địa phương. Hãy thử tên hiện hành, đặc sản, danh thắng hoặc tên trước sắp xếp.</p>';
  $('#province-grid').querySelectorAll('[data-province]').forEach(button=>button.addEventListener('click',()=>openProvince(button.dataset.province,button.dataset.former)));
}
$('#province-search').addEventListener('input',renderProvinces);
document.querySelectorAll('[data-era]').forEach(button=>button.addEventListener('click',()=>{provinceEra=button.dataset.era;$('#province-search').value='';renderProvinces()}));
document.querySelectorAll('[data-region]').forEach(button=>button.addEventListener('click',()=>{provinceFilter=button.dataset.region;renderProvinces();$('#province-search').scrollIntoView({behavior:'smooth',block:'start'})}));
document.querySelectorAll('[data-gallery-region]').forEach(link=>link.addEventListener('click',()=>{provinceFilter=link.dataset.galleryRegion;$('#province-search').value='';renderProvinces()}));
const dialog=$('#detail-dialog');
$('#dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
function openLesson(id){
  const x=lessons.find(lesson=>lesson.id===id);if(!x)return;
  $('#dialog-body').innerHTML=`<div class="dialog-inner"><span class="kicker">${safe(x.category.toUpperCase())} · ${x.time} PHÚT ĐỌC</span><h2>${safe(x.title)}</h2><p class="dialog-lead">${safe(x.summary)}</p>${x.points.map(([title,body])=>`<div class="fact-block"><h3>${safe(title)}</h3><p>${safe(body)}</p></div>`).join('')}<div class="remember"><strong>Ghi nhớ</strong><br>${safe(x.remember)}</div><button id="mark-done" type="button" class="dialog-action">${completed.has(x.id)?'✓ Đã đánh dấu':'Đánh dấu đã học'}</button></div>`;
  $('#mark-done').addEventListener('click',()=>{completed.add(x.id);localStorage.setItem('dia-ly-completed',JSON.stringify([...completed]));$('#mark-done').textContent='✓ Đã đánh dấu';renderLessons()});dialog.showModal();
}
function openProvince(name,former=''){
  const p=provinces.find(x=>x.name===name);if(!p)return;const d=provinceDetails[name],x=extraDetails[name];
  const fact=(title,body)=>`<div class="fact-block"><h3>${safe(title)}</h3><p>${safe(body)}</p></div>`;
  const population=population2025[name]||population2024[name],is2025=Boolean(population2025[name]),com=communeCounts2026[name];
  $('#dialog-body').innerHTML=`<div class="dialog-inner province-detail"><span class="kicker">MIỀN ${safe(p.region.toUpperCase())} · ${safe(p.type.toUpperCase())}</span><h2>${p.type==='Thành phố'?'TP. ':''}${safe(p.name)}</h2>${former?`<p class="former-note">${safe(former)} trước sắp xếp năm 2025 nay thuộc ${safe(p.type.toLowerCase())} ${safe(name)}. Thông tin bên dưới áp dụng cho địa giới hiện nay.</p>`:''}<p class="dialog-lead">${safe(p.feature)}.</p><figure class="detail-image"><img src="${regionPhoto(p.region)}" alt="Minh họa cảnh quan miền ${safe(p.region)}" loading="lazy"><figcaption>Ảnh minh họa cảnh quan miền ${safe(p.region)}, không phải ảnh chụp tại ${safe(p.name)}.</figcaption></figure><div class="detail-stats"><div><small>DIỆN TÍCH TỰ NHIÊN</small><strong>${safe(d.area)} <span>km²</span></strong></div><div><small>${is2025?'QUY MÔ DÂN SỐ 2025':'DÂN SỐ TB 2024 · NGHÌN NGƯỜI'}</small><strong>${is2025?safe(population):`≈ ${safe(population)} <span>nghìn</span>`}</strong></div></div><p class="population-note">${is2025?'Quy mô dân số ghi trong Nghị quyết 202/2025/QH15 khi sắp xếp, không phải dân số thời gian thực.':'Dân số trung bình năm 2024 từ Niên giám thống kê; làm tròn đến 0,1 nghìn người. Không so sánh trực tiếp với quy mô dân số trong Nghị quyết 2025.'}</p><div class="detail-facts">${fact('Địa hình',d.landscape)}${fact('Khí hậu',d.climate)}${fact('Mùa mưa thường niên (ước tính)',rainySeason(p))}${fact('Vị trí tiếp giáp tiêu biểu',x.borders)}${fact('Đơn vị hành chính hiện nay',`0 quận/huyện/thành phố thuộc tỉnh (không còn cấp huyện từ 01/7/2025). ${com} đơn vị cấp xã gồm xã, phường và có thể có đặc khu, theo bảng Cục Thống kê 2026.`)}${fact('Hạ tầng giao thông',x.transport)}${fact('Giáo dục & đào tạo',x.education)}${fact('Văn hóa & tín ngưỡng',x.culture)}${fact('Công nghiệp & dịch vụ',d.industry)}${fact('Nông nghiệp & thủy sản',d.agriculture)}${fact('Đặc sản tiêu biểu',d.specialties)}${fact('Điểm đến & di sản',d.places)}${fact('Môi trường cần quan tâm',d.environment)}</div><div class="weather-preview"><h3>Thời tiết điểm đại diện · ${safe(name)}</h3><p id="province-weather-summary">Đang chuẩn bị kết nối…</p><button type="button" class="dialog-action" id="province-weather-link">Xem chi tiết thời tiết →</button></div><div class="remember"><strong>Sắp xếp hành chính</strong><br>${p.merged?`Địa bàn ${safe(p.merged)} trước sắp xếp nay thuộc ${safe(p.type.toLowerCase())} ${safe(p.name)}.`:`Không sắp xếp cấp tỉnh năm 2025.${['Quảng Ninh'].includes(p.name)?' Thành phố trực thuộc trung ương từ 01/9/2026.':''}`}${['Bắc Ninh','Đồng Nai'].includes(p.name)?' Được chuyển thành thành phố trực thuộc trung ương trong năm 2026.':''}</div><div class="detail-sources"><a href="${safe(d.areaSource)}" target="_blank" rel="noopener noreferrer">Nguồn diện tích ↗</a><a href="https://xaydungchinhsach.chinhphu.vn/chi-tiet-34-don-vi-hanh-chinh-cap-tinh-tu-12-6-2025-119250612141845533.htm" target="_blank" rel="noopener noreferrer">Nguồn dân số & sắp xếp ↗</a><a href="https://www.nso.gov.vn/wp-content/uploads/2026/01/Nien-giam-tom-tat-2024.pdf" target="_blank" rel="noopener noreferrer">Nguồn dân số 2024 ↗</a><a href="https://danhmuchanhchinh.nso.gov.vn/Tinh_tk_new.aspx" target="_blank" rel="noopener noreferrer">Nguồn đơn vị cấp xã ↗</a><a href="https://nchmf.gov.vn/" target="_blank" rel="noopener noreferrer">Nguồn tham khảo khí hậu ↗</a></div><p class="detail-disclaimer">Mùa mưa thay đổi theo năm và tiểu vùng; các hoạt động và điểm đến là ví dụ nhập môn. Danh sách tiếp giáp là ví dụ tiêu biểu, xem bản đồ chính thức để biết đầy đủ.</p></div>`;dialog.showModal();
  $('#province-weather-link').addEventListener('click',()=>{dialog.close();openWeatherForProvince(name)});
  weatherSummary(name,$('#province-weather-summary'));
}

function shuffled(items){const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]]}return copy}
function startQuiz(){round=shuffled(questions).slice(0,10).map(q=>{const options=shuffled(q.options.map((text,index)=>({text,correct:index===q.answer})));return {...q,options}});questionIndex=0;score=0;chosen=null;renderQuiz()}
function renderQuiz(){
  const panel=$('#quiz-panel');
  if(questionIndex>=round.length){panel.innerHTML=`<div class="quiz-result"><span class="kicker">HOÀN THÀNH</span><div class="score">${score}/10</div><h2>${score>=8?'Rất tốt!':score>=5?'Bạn đang tiến bộ!':'Cùng ôn lại nhé!'}</h2><p>${score>=8?'Bạn đã nắm khá chắc các kiến thức cơ bản.': 'Mỗi lần ôn tập là một lần hiểu Việt Nam rõ hơn.'}</p><button class="quiz-next" type="button" id="restart-quiz">Làm lượt mới ↗</button></div>`;$('#restart-quiz').addEventListener('click',startQuiz);return}
  const q=round[questionIndex];
  panel.innerHTML=`<div class="quiz-top"><span>CÂU ${questionIndex+1} / 10</span><span>${score} câu đúng</span></div><div class="quiz-progress"><span style="width:${(questionIndex/10)*100}%"></span></div><h2>${safe(q.prompt)}</h2><div class="quiz-options">${q.options.map((item,index)=>`<button class="quiz-option" type="button" data-option="${index}"><span>${'ABCD'[index]}</span>${safe(item.text)}</button>`).join('')}</div><div id="quiz-feedback" aria-live="polite"></div>`;
  panel.querySelectorAll('[data-option]').forEach(button=>button.addEventListener('click',()=>answerQuiz(Number(button.dataset.option))));
}
function answerQuiz(index){if(chosen!==null)return;chosen=index;const q=round[questionIndex],correct=q.options[index].correct;if(correct)score++;
  $('#quiz-panel').querySelectorAll('[data-option]').forEach(button=>{const i=Number(button.dataset.option);button.disabled=true;if(q.options[i].correct)button.classList.add('correct');else if(i===index)button.classList.add('wrong')});
  $('#quiz-feedback').innerHTML=`<div class="quiz-explain"><strong>${correct?'Chính xác!':'Chưa đúng, thử ghi nhớ nhé.'}</strong>${safe(q.explain)}</div><button class="quiz-next" type="button" id="next-question">${questionIndex===9?'Xem kết quả':'Câu tiếp theo'} →</button>`;
  $('#next-question').addEventListener('click',()=>{questionIndex++;chosen=null;renderQuiz()});
}
renderLessons();renderProvinces();startQuiz();navigate();initWeather();
