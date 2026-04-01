/* ============================================================
   AutoPro Detail — main.js
   Premium Araç Bakım Merkezi
   Tüm JavaScript kodları bu dosyada bulunmaktadır.
   ============================================================ */


// cursor
const c=document.getElementById('cur'),cr=document.getElementById('curR');
document.addEventListener('mousemove',e=>{c.style.left=e.clientX+'px';c.style.top=e.clientY+'px';cr.style.left=e.clientX+'px';cr.style.top=e.clientY+'px'});
// nav
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('s',scrollY>55));
// reveal
const obs=new IntersectionObserver(es=>{es.forEach((e,i)=>{if(e.isIntersecting)setTimeout(()=>e.target.classList.add('v'),i*75)})},{threshold:.07});
document.querySelectorAll('.rev').forEach(el=>obs.observe(el));
// year
const yr=document.getElementById('yr');
for(let y=new Date().getFullYear();y>=1990;y--){const o=document.createElement('option');o.value=y;o.textContent=y;yr.appendChild(o)}
// service toggles
function tgS(el){el.classList.toggle('sel')}
// wa toggle
function tgW(){document.getElementById('wt').classList.toggle('on')}
// file upload
function hUp(e){const p=document.getElementById('pvs');Array.from(e.target.files).forEach(f=>{const r=new FileReader();r.onload=ev=>{const i=document.createElement('img');i.src=ev.target.result;i.className='pv';p.appendChild(i)};r.readAsDataURL(f)})}
// form
function fsub(e){e.preventDefault();const ok=document.getElementById('fok');ok.style.display='block';e.target.reset();document.getElementById('pvs').innerHTML='';document.querySelectorAll('.sch').forEach(el=>el.classList.remove('sel'));loadModels('');setTimeout(()=>ok.style.display='none',6000)}

// ── BRAND / MODEL DATA ──────────────────────────────────────────────────────
const carData = {
  "BMW": ["1 Serisi","2 Serisi","3 Serisi","4 Serisi","5 Serisi","6 Serisi","7 Serisi","8 Serisi","X1","X2","X3","X4","X5","X6","X7","iX","iX3","i3","i4","i5","i7","M2","M3","M4","M5","M8","X5 M","X6 M","Z4","Diğer"],
  "Mercedes-Benz": ["A Serisi","B Serisi","C Serisi","CLA","CLS","E Serisi","EQA","EQB","EQC","EQE","EQS","G Serisi","GLA","GLB","GLC","GLE","GLS","S Serisi","SL","AMG GT","Citan","Sprinter","Vito","Diğer"],
  "Audi": ["A1","A2","A3","A4","A5","A6","A7","A8","Q2","Q3","Q4 e-tron","Q5","Q6","Q7","Q8","e-tron","e-tron GT","RS3","RS4","RS5","RS6","RS7","R8","S3","S4","S5","S6","S7","S8","TT","Diğer"],
  "Volkswagen": ["Arteon","Golf","Golf GTE","Golf GTI","Golf R","ID.3","ID.4","ID.5","ID.7","Jetta","Passat","Polo","Scirocco","Sharan","T-Cross","T-Roc","Taigo","Tiguan","Touareg","Touran","Up!","Diğer"],
  "Toyota": ["86","Aygo","C-HR","Camry","Corolla","Corolla Cross","GR Supra","GR Yaris","GR86","Hilux","Land Cruiser","Land Cruiser Prado","Proace","RAV4","Rush","Sequoia","Sienna","Tundra","Venza","Yaris","Yaris Cross","Diğer"],
  "Ford": ["Bronco","EcoSport","Edge","Escape","Expedition","Explorer","F-150","Fiesta","Focus","Fusion","Galaxy","Ka","Kuga","Mondeo","Mustang","Mustang Mach-E","Puma","Ranger","S-Max","Transit","Transit Custom","Diğer"],
  "Renault": ["Arkana","Austral","Captur","Clio","Espace","Express","Fluence","Grand Scénic","Kadjar","Kangoo","Koleos","Laguna","Master","Megane","Mégane E-Tech","Sandero","Scenic","Symbol","Talisman","Trafic","Twingo","Zoe","Diğer"],
  "Hyundai": ["Bayon","Elantra","i10","i20","i30","i40","IONIQ","IONIQ 5","IONIQ 6","Kona","Kona Electric","Santa Cruz","Santa Fe","Sonata","Staria","Tucson","Venue","Veloster","Diğer"],
  "Kia": ["Carnival","Ceed","EV6","EV9","K5","Niro","Niro EV","Optima","Picanto","ProCeed","Rio","Seltos","Sorento","Soul","Sportage","Stinger","Stonic","Telluride","XCeed","Diğer"],
  "Volvo": ["C40 Recharge","EX30","EX40","EX90","S40","S60","S90","V40","V60","V90","XC40","XC60","XC90","Diğer"],
  "Porsche": ["718 Boxster","718 Cayman","911","Cayenne","Macan","Panamera","Taycan","Diğer"],
  "Land Rover": ["Defender","Discovery","Discovery Sport","Freelander","Range Rover","Range Rover Evoque","Range Rover Sport","Range Rover Velar","Diğer"],
  "Fiat": ["124 Spider","500","500C","500L","500X","Bravo","Doblo","Egea","Egea Cross","Egea SW","Freemont","Grande Punto","Linea","Panda","Punto","Tipo","Diğer"],
  "Peugeot": ["108","2008","208","3008","301","308","408","5008","508","e-208","e-2008","e-308","Partner","Rifter","Traveller","Diğer"],
  "Honda": ["Accord","Civic","CR-V","e","e:Ny1","HR-V","Jazz","NSX","Diğer"],
  "Nissan": ["370Z","Ariya","GT-R","Juke","Leaf","Micra","Navara","Note","Pathfinder","Patrol","Pulsar","Qashqai","Townstar","X-Trail","Diğer"],
  "Mazda": ["CX-3","CX-30","CX-5","CX-60","CX-90","Mazda2","Mazda3","Mazda6","MX-30","MX-5","Diğer"],
  "Subaru": ["Ascent","BRZ","Crosstek","Forester","Impreza","Legacy","Outback","Solterra","WRX","XV","Diğer"],
  "Skoda": ["Citigo","Enyaq","Fabia","Karoq","Kodiaq","Octavia","Rapid","Scala","Superb","Diğer"],
  "SEAT": ["Arona","Ateca","Ibiza","Leon","Mii","Tarraco","Diğer"],
  "Cupra": ["Ateca","Born","Formentor","Leon","Terramar","Diğer"],
  "Jeep": ["Cherokee","Commander","Compass","Gladiator","Grand Cherokee","Renegade","Wrangler","Diğer"],
  "Mitsubishi": ["ASX","Eclipse Cross","L200","Outlander","Outlander PHEV","Space Star","Diğer"],
  "Suzuki": ["Baleno","Grand Vitara","Ignis","Jimny","S-Cross","Swift","Vitara","Diğer"],
  "Opel": ["Adam","Agila","Ampera","Antara","Astra","Cascada","Combo","Corsa","Crossland","Frontera","Grandland","Insignia","Meriva","Mokka","Omega","Vectra","Zafira","Diğer"],
  "Alfa Romeo": ["147","156","159","Brera","Giulia","Giulietta","GTV","MiTo","Spider","Stelvio","Tonale","Diğer"],
  "Tesla": ["Cybertruck","Model 3","Model S","Model X","Model Y","Roadster","Diğer"],
  "Citroen": ["Berlingo","C1","C2","C3","C3 Aircross","C4","C4 Picasso","C4 X","C5 Aircross","C5 X","ë-C3","Jumpy","Spacetourer","Diğer"],
  "Dacia": ["Dokker","Duster","Jogger","Logan","Lodgy","Sandero","Spring","Diğer"],
  "Diğer": ["Diğer Model"]
};

// Populate brand select
const brandSel=document.getElementById('brandSel');
Object.keys(carData).sort().forEach(brand=>{
  const o=document.createElement('option');o.value=brand;o.textContent=brand;brandSel.appendChild(o);
});

function loadModels(brand){
  const ms=document.getElementById('modelSel');
  ms.innerHTML='';
  if(!brand||!carData[brand]){
    const o=document.createElement('option');o.value='';o.disabled=true;o.selected=true;o.textContent='Önce marka seçin';ms.appendChild(o);
    return;
  }
  const ph=document.createElement('option');ph.value='';ph.disabled=true;ph.selected=true;ph.textContent='Model seçin';ms.appendChild(ph);
  carData[brand].forEach(m=>{const o=document.createElement('option');o.value=m;o.textContent=m;ms.appendChild(o)});
}

// tabs
function sw(i,btn){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('a'));
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('a'));
  btn.classList.add('a');
  document.getElementById('p'+i).classList.add('a');
}
// sliders
function initSl(cId,aId,dId){
  const c=document.getElementById(cId),a=document.getElementById(aId),d=document.getElementById(dId);
  if(!c)return;
  let drag=false;
  function upd(x){const r=c.getBoundingClientRect();let p=Math.max(0,Math.min(1,(x-r.left)/r.width));a.style.clipPath=`inset(0 ${(1-p)*100}% 0 0)`;d.style.left=`${p*100}%`}
  c.addEventListener('mousedown',e=>{drag=true;upd(e.clientX)});
  c.addEventListener('touchstart',e=>{drag=true;upd(e.touches[0].clientX)},{passive:true});
  window.addEventListener('mousemove',e=>{if(drag)upd(e.clientX)});
  window.addEventListener('touchmove',e=>{if(drag)upd(e.touches[0].clientX)},{passive:true});
  window.addEventListener('mouseup',()=>drag=false);
  window.addEventListener('touchend',()=>drag=false);
}
initSl('sm0','sa0','sd0');
initSl('sm0b','sa0b','sd0b');
initSl('sm1','sa1','sd1');
initSl('sm1b','sa1b','sd1b');
initSl('sm2','sa2','sd2');
initSl('sm3','sa3','sd3');
