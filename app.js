import {provinces,lessons,questions} from './data.js';
import {provinceDetails} from './province-details.js';

const $=selector=>document.querySelector(selector);
const safe=text=>String(text).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const normalize=text=>String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase();
const regionPhoto=region=>`assets/mien-${({Bắc:'bac',Trung:'trung',Nam:'nam'})[region]}.png`;
const completed=new Set(JSON.parse(localStorage.getItem('dia-ly-completed')||'[]'));
let lessonFilter='Tất cả',provinceFilter='Tất cả',round=[],questionIndex=0,score=0,chosen=null;

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
  document.querySelectorAll('[data-region]').forEach(button=>{const active=button.dataset.region===provinceFilter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active))});
  const term=normalize($('#province-search').value.trim());
  const items=provinces.filter(x=>{const d=provinceDetails[x.name];return (provinceFilter==='Tất cả'||x.region===provinceFilter)&&normalize(`${x.name} ${x.merged} ${x.feature} ${d.specialties} ${d.places} ${d.agriculture} ${d.industry}`).includes(term)});
  $('#province-count').textContent=`${items.length} / 34 địa phương`;
  $('#province-grid').innerHTML=items.length?items.map(p=>`<button class="province-card" type="button" data-province="${safe(p.name)}"><div class="province-cover"><img src="${regionPhoto(p.region)}" alt="" loading="lazy"><span>Ảnh minh họa miền ${safe(p.region)}</span></div><div class="province-card-content"><div class="province-top"><span class="region-pill">Miền ${safe(p.region)}</span><span class="province-number">${String(provinces.indexOf(p)+1).padStart(2,'0')} / 34</span></div><h3>${p.type==='Thành phố'?'TP. ':''}${safe(p.name)}</h3><p>${safe(p.feature)}</p><span class="province-type">${safe(provinceDetails[p.name].area)} km² · ${safe(p.type)} →</span></div></button>`).join(''):'<p class="empty">Không tìm thấy địa phương. Hãy thử tên hiện hành, đặc sản, danh thắng hoặc tên trước sắp xếp.</p>';
  $('#province-grid').querySelectorAll('[data-province]').forEach(button=>button.addEventListener('click',()=>openProvince(button.dataset.province)));
}
$('#province-search').addEventListener('input',renderProvinces);
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
function openProvince(name){
  const p=provinces.find(x=>x.name===name);if(!p)return;const d=provinceDetails[name];
  const fact=(title,body)=>`<div class="fact-block"><h3>${safe(title)}</h3><p>${safe(body)}</p></div>`;
  $('#dialog-body').innerHTML=`<div class="dialog-inner province-detail"><span class="kicker">MIỀN ${safe(p.region.toUpperCase())} · ${safe(p.type.toUpperCase())}</span><h2>${p.type==='Thành phố'?'TP. ':''}${safe(p.name)}</h2><p class="dialog-lead">${safe(p.feature)}.</p><figure class="detail-image"><img src="${regionPhoto(p.region)}" alt="Minh họa cảnh quan miền ${safe(p.region)}" loading="lazy"><figcaption>Ảnh minh họa cảnh quan miền ${safe(p.region)}, không phải ảnh chụp tại ${safe(p.name)}.</figcaption></figure><div class="detail-stats"><div><small>DIỆN TÍCH TỰ NHIÊN</small><strong>${safe(d.area)} <span>km²</span></strong></div><div><small>LOẠI HÌNH</small><strong>${safe(p.type)}</strong></div></div><div class="detail-facts">${fact('Địa hình',d.landscape)}${fact('Khí hậu',d.climate)}${fact('Công nghiệp & dịch vụ',d.industry)}${fact('Nông nghiệp & thủy sản',d.agriculture)}${fact('Đặc sản tiêu biểu',d.specialties)}${fact('Điểm đến & di sản',d.places)}${fact('Môi trường cần quan tâm',d.environment)}</div><div class="remember"><strong>Sắp xếp hành chính</strong><br>${p.merged?`Địa bàn ${safe(p.merged)} trước sắp xếp nay thuộc ${safe(p.type.toLowerCase())} ${safe(p.name)}.`:`Không sắp xếp cấp tỉnh năm 2025.${['Quảng Ninh'].includes(p.name)?' Thành phố trực thuộc trung ương từ 01/9/2026.':''}`}${['Bắc Ninh','Đồng Nai'].includes(p.name)?' Được chuyển thành thành phố trực thuộc trung ương trong năm 2026.':''}</div><div class="detail-sources"><a href="${safe(d.areaSource)}" target="_blank" rel="noopener noreferrer">Nguồn diện tích ↗</a><a href="https://xaydungchinhsach.chinhphu.vn/chi-tiet-34-don-vi-hanh-chinh-cap-tinh-tu-12-6-2025-119250612141845533.htm" target="_blank" rel="noopener noreferrer">Nguồn sắp xếp 2025 ↗</a></div><p class="detail-disclaimer">Các ngành, đặc sản và điểm đến chỉ là ví dụ nhập môn trong địa giới hiện hành, không phải danh mục đầy đủ hay số liệu sản lượng.</p></div>`;dialog.showModal();
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
renderLessons();renderProvinces();startQuiz();navigate();
