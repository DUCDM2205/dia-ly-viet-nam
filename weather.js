// OpenWeatherMap 2.5 Current + 5 day / 3 hour + Geocoding.
// GitHub Pages cannot hide an owner API key: public visitors supply their own
// key for their current tab, or connect a separately hosted backend.
const el=id=>document.getElementById(id);
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const origin=new URL('.',import.meta.url);
const usesLocalProxy=location.hostname==='localhost'||location.hostname==='127.0.0.1';
let proxy=false,proxyConfigured=false,selected=null,results=[],loading=false;
const representative={
  'Gia Lai':'Quy Nhơn','Lâm Đồng':'Đà Lạt','Đắk Lắk':'Buôn Ma Thuột',
  'Quảng Ngãi':'Quảng Ngãi','Tuyên Quang':'Tuyên Quang',
  'Phú Thọ':'Việt Trì','Ninh Bình':'Hoa Lư','An Giang':'Rạch Giá',
  'Đồng Nai':'Biên Hòa','Tây Ninh':'Tây Ninh','Cà Mau':'Cà Mau',
  'Đồng Tháp':'Mỹ Tho','Vĩnh Long':'Vĩnh Long','Khánh Hòa':'Nha Trang',
  'Quảng Trị':'Đông Hà','Hưng Yên':'Hưng Yên','Bắc Ninh':'Bắc Ninh',
  'Thái Nguyên':'Thái Nguyên','Lào Cai':'Lào Cai','Đà Nẵng':'Đà Nẵng',
  'Hải Phòng':'Hải Phòng','Hồ Chí Minh':'Ho Chi Minh City',
  'Cần Thơ':'Cần Thơ','Huế':'Huế'
};

export function weatherRepresentative(province){return representative[province]||province}

async function detectProxy(){
  if(!usesLocalProxy)return false;
  try{const response=await fetch(new URL('api/health',origin),{signal:AbortSignal.timeout(1300)});const body=await response.json();proxyConfigured=Boolean(body.configured);return response.ok&&body.weather===true}catch{return false}
}
function key(){return el('weather-key').value.trim()||sessionStorage.getItem('openweather-key')||''}
function endpoint(kind,params){
  if(proxy)return new URL(`api/${kind}?${params}`,origin);
  const apiKey=key();if(!apiKey)throw Error('Hãy nhập API key OpenWeatherMap để xem thời tiết. Key chỉ được giữ trong tab hiện tại.');
  const paths={geocode:'geo/1.0/direct',current:'data/2.5/weather',forecast:'data/2.5/forecast'};
  return new URL(`https://api.openweathermap.org/${paths[kind]}?${params}&appid=${encodeURIComponent(apiKey)}`);
}
async function query(kind,params){
  const response=await fetch(endpoint(kind,params));
  let body;try{body=await response.json()}catch{throw Error('Không đọc được dữ liệu thời tiết. Kiểm tra kết nối mạng và thử lại.')}
  if(!response.ok){
    const detail=response.status===401?'API key chưa đúng hoặc chưa được kích hoạt.':response.status===429?'Đã vượt giới hạn số lần gọi API.':body.message||'Không thể kết nối dịch vụ thời tiết.';
    throw Error(detail);
  }
  return body;
}
function status(message,error=false){el('weather-status').textContent=message;el('weather-status').classList.toggle('error',error)}
function formatTime(value,offset=25200){return new Date((value+offset)*1000).toLocaleString('vi-VN',{timeZone:'UTC',hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit'})}
function icon(code){return /^[a-z0-9]{3}$/i.test(code||'')?`https://openweathermap.org/img/wn/${code}@2x.png`:''}
function showLocations(){
  const box=el('weather-choices');
  box.innerHTML=results.length?results.map((x,i)=>`<button type="button" data-weather-place="${i}"><strong>${esc(x.local_names?.vi||x.name)}</strong><span>${esc(x.state||'')} · Việt Nam · ${Number(x.lat).toFixed(3)}, ${Number(x.lon).toFixed(3)}</span></button>`).join(''):'<p>Không tìm thấy vị trí. Hãy thử tên khác, tên tỉnh cũ hoặc nhập tọa độ.</p>';
  box.querySelectorAll('[data-weather-place]').forEach(button=>button.addEventListener('click',()=>choose(results[Number(button.dataset.weatherPlace)])));
}
function showWeather(current,forecast,place){
  const data=el('weather-result');const offset=current.timezone??25200;
  const weather=current.weather?.[0]||{};
  const img=icon(weather.icon);
  const list=(forecast.list||[]).filter(x=>Number.isFinite(x.dt)).slice(0,12);
  data.innerHTML=`<div class="weather-current"><div><span class="kicker">THỜI TIẾT HIỆN TẠI · ${esc(formatTime(current.dt,offset))}</span><h2>${esc(place.name)}${place.state?`, ${esc(place.state)}`:''}</h2><p>${esc(weather.description||'Chưa có mô tả')} · Điểm đo gần tọa độ đã chọn</p></div><div class="weather-temp">${img?`<img src="${img}" alt="">`:''}<strong>${Math.round(current.main?.temp??0)}°C</strong></div></div><div class="weather-metrics"><div>🌡️ Cảm giác như <b>${Math.round(current.main?.feels_like??0)}°C</b></div><div>💧 Độ ẩm <b>${esc(current.main?.humidity??'—')}%</b></div><div>🌬️ Gió <b>${esc(current.wind?.speed??'—')} m/s</b></div><div>☁️ Mây <b>${esc(current.clouds?.all??'—')}%</b></div></div><h3>Dự báo theo mốc 3 giờ · tối đa 5 ngày</h3><div class="forecast-scroller">${list.map(item=>`<div class="forecast-item"><strong>${esc(formatTime(item.dt,offset))}</strong><span>${esc(item.weather?.[0]?.description||'')}</span><b>${Math.round(item.main?.temp??0)}°C</b><small>Khả năng mưa: ${Math.round((item.pop||0)*100)}%</small></div>`).join('')}</div><p class="weather-footnote">Nguồn: OpenWeatherMap. Mốc dự báo tùy dữ liệu API trả về; chỉ số “khả năng mưa” là xác suất dự báo tại từng mốc, không phải mùa mưa.</p>`;
  data.hidden=false;
}
async function choose(place){
  if(loading)return;loading=true;selected=place;
  el('weather-choices').innerHTML='';el('weather-result').hidden=true;
  status(`Đang lấy thời tiết tại ${place.name}…`);
  try{
    const params=new URLSearchParams({lat:String(place.lat),lon:String(place.lon),units:'metric',lang:'vi'});
    const [current,forecast]=await Promise.all([query('current',params),query('forecast',params)]);
    showWeather(current,forecast,place);status('Đã cập nhật dữ liệu thời tiết.');
  }catch(error){status(error.message,true)}finally{loading=false}
}
export async function lookupWeather(queryText,autoSelect=false){
  const q=queryText.trim();if(q.length<2){status('Nhập ít nhất 2 ký tự để tìm vị trí.',true);return}
  if(loading)return;loading=true;status(`Đang tìm “${q}”…`);el('weather-choices').innerHTML='';el('weather-result').hidden=true;
  try{
    const data=await query('geocode',new URLSearchParams({q:`${q},VN`,limit:'5'}));
    results=Array.isArray(data)?data.filter(x=>x.country==='VN'&&Number.isFinite(x.lat)&&Number.isFinite(x.lon)):[];
    status(results.length?`${results.length} kết quả. Chọn đúng địa điểm trước khi xem thời tiết.`:'Không có kết quả phù hợp. Thử tên xã/phường kèm tỉnh hoặc tọa độ.',!results.length);
    if(autoSelect&&results.length===1){loading=false;await choose(results[0])}else showLocations();
  }catch(error){status(error.message,true)}finally{loading=false}
}
export function openWeatherForProvince(name){
  location.hash='thoi-tiet';
  el('weather-search').value=weatherRepresentative(name);
  el('weather-context').textContent=`Đang chọn điểm đại diện cho ${name}. Tỉnh có nhiều vùng khí hậu: nhập quận/huyện cũ hoặc xã/phường để xem điểm cụ thể.`;
  if(proxy||key())lookupWeather(weatherRepresentative(name));else status('Nhập API key để tra thời tiết. Tỉnh được đại diện bằng một điểm, không phải thời tiết của toàn địa bàn.');
}
export async function weatherSummary(name,container){
  if(!proxy&&!key()){container.textContent='Nhập API key ở trang Thời tiết để xem thông tin trực tiếp.';return}
  container.textContent='Đang tải thời tiết điểm đại diện…';
  try{
    const geo=await query('geocode',new URLSearchParams({q:`${weatherRepresentative(name)},VN`,limit:'5'}));
    const place=geo.find(x=>x.country==='VN');if(!place)throw Error('Không tìm thấy điểm đại diện.');
    const weather=await query('current',new URLSearchParams({lat:String(place.lat),lon:String(place.lon),units:'metric',lang:'vi'}));
    if(!container.isConnected)return;
    container.textContent=`${place.name}: ${Math.round(weather.main.temp)}°C · ${weather.weather?.[0]?.description||'xem chi tiết'}. Điểm đo đại diện, cập nhật ${formatTime(weather.dt,weather.timezone)}.`;
  }catch(error){if(container.isConnected)container.textContent=error.message}
}
export async function initWeather(){
  proxy=await detectProxy();
  el('weather-key-wrap').hidden=proxy;
  el('weather-mode').textContent=proxy?(proxyConfigured?'Đang dùng máy chủ trên máy của bạn; API key được giữ ở biến môi trường.':'Máy chủ đã chạy nhưng chưa có OPENWEATHER_API_KEY. Đặt biến môi trường rồi khởi động lại server.py.'):'Trang tĩnh: nhập API key cá nhân trong tab này. Không chia sẻ key hoặc ghi key vào source GitHub.';
  el('weather-key').value=sessionStorage.getItem('openweather-key')||'';
  el('weather-save-key').addEventListener('click',()=>{
    const value=el('weather-key').value.trim();
    if(!value){sessionStorage.removeItem('openweather-key');status('Đã xóa key trong tab này.');return}
    sessionStorage.setItem('openweather-key',value);status('Đã giữ key trong tab hiện tại. Giờ hãy tìm địa điểm.');
  });
  el('weather-form').addEventListener('submit',event=>{event.preventDefault();lookupWeather(el('weather-search').value)});
  el('weather-coordinate').addEventListener('submit',event=>{
    event.preventDefault();const lat=Number(el('weather-lat').value),lon=Number(el('weather-lon').value);
    if(!Number.isFinite(lat)||!Number.isFinite(lon)||lat<8||lat>24||lon<102||lon>110){status('Hãy nhập tọa độ nằm trong khu vực Việt Nam.',true);return}
    choose({name:'Tọa độ đã chọn',lat,lon});
  });
  el('weather-geolocate').addEventListener('click',()=>{
    if(!navigator.geolocation){status('Trình duyệt không hỗ trợ định vị.',true);return}
    status('Đang xin quyền truy cập vị trí…');
    navigator.geolocation.getCurrentPosition(({coords})=>choose({name:'Vị trí của bạn',lat:coords.latitude,lon:coords.longitude}),()=>status('Không lấy được vị trí. Bạn có thể nhập địa danh hoặc tọa độ.',true),{timeout:10000});
  });
}
