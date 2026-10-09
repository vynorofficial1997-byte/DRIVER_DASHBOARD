
(function(){
 const app=document.getElementById('notifApp'),tabs=app.querySelectorAll('.ntab'),
  q=document.getElementById('nq'),empty=document.getElementById('nempty'),panel=document.getElementById('npanel');
 const items=()=>panel.querySelectorAll('.item');
 let filter='all';
 function apply(){const term=q.value.trim().toLowerCase();let shown=0;
  items().forEach(el=>{const okTab=filter==='all'||(filter==='unread'&&el.dataset.unread==='1')||(filter==='important'&&el.dataset.important==='1');
   const okText=!term||el.textContent.toLowerCase().includes(term);el.style.display=okTab&&okText?'':'none';if(okTab&&okText)shown++});
  empty.style.display=shown?'none':'block'}
 tabs.forEach(t=>t.addEventListener('click',()=>{tabs.forEach(x=>x.classList.remove('active'));t.classList.add('active');filter=t.dataset.filter;apply()}));
 q.addEventListener('input',apply);
 app.querySelectorAll('.pagination a').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));
 document.getElementById('nBack').addEventListener('click',()=>{location.hash=(window.__lastHash||'#dashboard')});
 /* more-options menu on each notification */
 panel.addEventListener('click',e=>{
  const k=e.target.closest('.kebab');if(!k)return;e.stopPropagation();
  const item=k.closest('.item'),m=document.getElementById('menu'),unread=item.dataset.unread==='1';
  m.innerHTML=(unread?'<button data-a="read">Mark as read</button>':'<button data-a="unread">Mark as unread</button>')+'<button data-a="del" class="del">Delete notification</button>';
  const r=k.getBoundingClientRect();
  m.style.left=Math.max(8,r.left+scrollX-150)+'px';m.style.top=r.bottom+scrollY+6+'px';m.style.display='block';
  m.onclick=ev=>{const a=ev.target.dataset.a;if(!a)return;
   if(a==='read')item.dataset.unread='0';
   if(a==='unread')item.dataset.unread='1';
   if(a==='del')item.remove();
   m.style.display='none';apply()};
 });
})();



let D=[
 {n:'Saravanan',id:'REN2589',p:'+91 8946284610',a:'Requested',s:'Active',e:'ABCjoe@gmail.com',j:'12 Mar 2024',r:29,g:'Male',ad:'No:76,gandhi road,villivakkam,chennai-63'},
 {n:'Ajay',id:'AXR567',p:'+91 1234567890',a:'Arrived',s:'Inactive',e:'ajay@gmail.com',j:'05 Jan 2024',r:41,g:'Male',ad:'No:12,anna nagar,chennai-40'},
 {n:'Tharun',id:'DFG4298',p:'+91 0987654321',a:'Arrived',s:'Active',e:'tharun@gmail.com',j:'20 Feb 2024',r:18,g:'Male',ad:'No:8,t nagar,chennai-17'},
 {n:'Dinesh',id:'SAT8901',p:'+91 9876543210',a:'Completed',s:'Active',e:'dinesh@gmail.com',j:'02 Apr 2024',r:56,g:'Male',ad:'No:33,adyar,chennai-20'}];
const RMAP={REN2589:5,AXR567:4.2,DFG4298:3.6,SAT8901:4.8,DSC7534:4.5,VEK5590:3.2};
const rate=id=>RMAP[id]!=null?RMAP[id]:(RMAP[id]=+(3.3+[...id].reduce((a,c)=>a+c.charCodeAt(0),0)%17/10).toFixed(1));
const STAR='<svg width="18" height="18" viewBox="0 0 24 24" fill="#f5b301" stroke="#f5b301" stroke-width="1.5" stroke-linejoin="round"><path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.5 5.7 21l1.5-7L2 9.3l7-.8z"/></svg>';
const rateCell=id=>`<div class="rt">${STAR}<span>${rate(id).toFixed(1)}</span></div>`;
const rateOk=(v,id)=>{const r=rate(id);return v.startsWith('All')||(v.startsWith('5')?r>=5:v.startsWith('4')?r>=4:r>=3)};
const $=i=>document.getElementById(i),tb=$('tb'),menu=$('menu'),modal=$('modal');
const U='<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8b0000" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3.5" fill="#8b0000"/><path d="M5.5 19c1.5-3 4-4 6.5-4s5 1 6.5 4" fill="#8b0000"/></svg>';
const V='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="M17 17l5 5"/><circle cx="11" cy="11" r="2.5" fill="#111"/><path d="M6.5 11c1.2-2.2 3-3 4.5-3s3.3.8 4.5 3"/></svg>';
const AC={Requested:'b',Arrived:'o',Completed:'dg'},SC={Active:'g',Inactive:'r'};
function render(){
  const q=$('q').value.trim().toLowerCase(),f=$('st').value;
  const rows=D.filter(d=>(!q||Object.values(d).join(' ').toLowerCase().includes(q))&&(f==='All Status'||d.s===f)&&rateOk($('rt').value,d.id));
  tb.innerHTML=rows.map(d=>`<tr data-i="${D.indexOf(d)}"><td><div class="d">${U}${d.n}</div></td><td>${d.id}</td><td>${d.p}</td><td>${rateCell(d.id)}</td><td class="${AC[d.a]}">${d.a}</td><td class="${SC[d.s]}">${d.s}</td><td><div class="act"><span class="v">${V}</span><button class="dots" aria-label="More"><i></i><i></i><i></i></button></div></td></tr>`).join('');
  $('empty').style.display=rows.length?'none':'block';
}
function view(d){
  $('dName').textContent=d.n;$('dId').textContent=d.id;$('dEmail').textContent=d.e;$('dPhone').textContent=d.p;
  $('dStatus').textContent=d.s;$('dStatus').className=SC[d.s]||'';
  $('dJoin').textContent=d.j;$('dRides').textContent=d.r;$('dGender').textContent=d.g;$('dAddr').textContent=d.ad;
  modal.classList.add('on');
}
tb.onclick=e=>{
  const tr=e.target.closest('tr');if(!tr)return;const d=D[tr.dataset.i];
  if(e.target.closest('.v'))view(d);
  const b=e.target.closest('.dots');
  if(b){e.stopPropagation();
    menu.innerHTML=`<button data-a="edit">Edit name</button><button data-a="t">${d.s==='Active'?'Deactivate':'Activate'}</button><button data-a="x" class="del">Delete driver</button>`;
    const r=b.getBoundingClientRect();menu.style.left=Math.max(8,r.left+scrollX-150)+'px';menu.style.top=r.bottom+scrollY+6+'px';menu.style.display='block';
    menu.onclick=ev=>{const a=ev.target.dataset.a;if(!a)return;
      if(a==='edit'){const n=prompt('Driver name',d.n);if(n)d.n=n}
      if(a==='t')d.s=d.s==='Active'?'Inactive':'Active';
      if(a==='x'&&confirm('Delete this driver?'))D=D.filter(x=>x!==d);
      menu.style.display='none';render()};
  }
};
document.addEventListener('click',()=>menu.style.display='none');
$('dClose').onclick=()=>modal.classList.remove('on');
modal.onclick=e=>{if(e.target===modal)modal.classList.remove('on')};
document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('on')});
document.querySelectorAll('.doc a').forEach(a=>a.onclick=()=>alert(a.dataset.doc+' preview'));
document.querySelectorAll('.pager span').forEach(x=>x.onclick=()=>{document.querySelectorAll('.pager span').forEach(y=>y.style.fontWeight='');x.style.fontWeight='700'});
$('q').oninput=render;$('st').onchange=render;$('rt').onchange=render;render();
/* ===== multi-page add-on ===== */
const CH='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9l7 7 7-7"/></svg>';
const SE='<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round"><circle cx="10" cy="10" r="7"/><path d="M15.5 15.5L22 22"/></svg>';
const DOTS='<button class="dots" aria-label="More"><i></i><i></i><i></i></button>';
const ACT='<div class="act"><span class="v">'+V+'</span>'+DOTS+'</div>';
const inr=n=>'₹ '+n.toLocaleString('en-IN');
const sl=(c,o)=>`<div class="sel"><select class="${c}">${o.map(x=>`<option>${x}</option>`).join('')}</select>${CH}</div>`;
const hd=(t,c)=>`<h1>${t}</h1>`+(c&&!/&gt;/.test(c)?`<div class="crumb">${c}</div>`:'');
const fb=(s)=>`<div class="bar"><div class="f-s">${SE}<input class="sq" placeholder="Search by name,email or phon..." autocomplete="off"></div>${s}</div>`;
const PAGER=document.querySelector('#p-drivers .pager').outerHTML;
const mainEl=document.querySelector('main.main');

/* charts */
function line(p,lab,max,step,id,lb,yt){const W=520,H=240,L=yt?56:38,B=26,T=14,R=12,x=i=>L+i*(W-L-R)/(p.length-1),y=v=>T+(1-v/max)*(H-T-B);let g='';
 for(let v=0;v<=max;v+=step)g+=`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="#eee"/><text x="${L-6}" y="${y(v)+3}" font-size="9" text-anchor="end" fill="#777">${v}</text>`;
 let d=`M${x(0)},${y(p[0])}`;for(let i=1;i<p.length;i++){const c=(x(i-1)+x(i))/2;d+=`C${c},${y(p[i-1])} ${c},${y(p[i])} ${x(i)},${y(p[i])}`}
 return `<svg viewBox="0 0 ${W} ${H}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e03a3a" stop-opacity=".55"/><stop offset="1" stop-color="#fde0e0" stop-opacity=".1"/></linearGradient></defs>${g}<path d="${d}L${x(p.length-1)},${y(0)}L${x(0)},${y(0)}Z" fill="url(#${id})"/><path d="${d}" fill="none" stroke="#c0001a" stroke-width="1.6"/>${p.map((v,i)=>`<circle cx="${x(i)}" cy="${y(v)}" r="2.6" fill="#fff" stroke="#c0001a"/>${lb?`<text x="${x(i)}" y="${y(v)-7}" font-size="8" text-anchor="middle" fill="#c0001a">${v}</text>`:''}`).join('')}${lab.map((t,i)=>t?`<text x="${x(i)}" y="${H-8}" font-size="9" text-anchor="middle" fill="#777">${t}</text>`:'').join('')}${yt?`<text transform="translate(11 ${(H-B+T)/2}) rotate(-90)" font-size="9" font-weight="600" text-anchor="middle" fill="#c0001a">${yt}</text>`:''}</svg>`}
let BC=0;
function bars(v,lab,max,step,k,yt,xt){const gid="bg"+(++BC);const W=520,H=xt?268:240,L=yt?58:40,B=xt?48:26,T=14,R=10,w=(W-L-R)/v.length,y=t=>T+(1-t/max)*(H-T-B);let g='';
 for(let t=0;t<=max;t+=step)g+=`<line x1="${L}" x2="${W-R}" y1="${y(t)}" y2="${y(t)}" stroke="#eee"/><text x="${L-6}" y="${y(t)+3}" font-size="9" text-anchor="end" fill="#777">${k===0?t:t/1000+'K'}</text>`;
 return `<svg viewBox="0 0 ${W} ${H}"><defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c0001a"/><stop offset="1" stop-color="#f58a8a"/></linearGradient></defs>${g}${v.map((n,i)=>`<rect x="${L+i*w+w*.2}" y="${y(n)}" width="${w*.6}" height="${y(0)-y(n)}" rx="2" fill="url(#${gid})"/><text x="${L+i*w+w/2}" y="${y(n)-4}" font-size="7.5" text-anchor="middle" fill="#c0001a">${n.toLocaleString()}</text><text x="${L+i*w+w/2}" y="${xt?H-28:H-8}" font-size="9" text-anchor="middle" fill="#777">${lab[i]}</text>`).join('')}${yt?`<text transform="translate(11 ${(H-B+T)/2}) rotate(-90)" font-size="9" font-weight="600" text-anchor="middle" fill="#c0001a">${yt}</text>`:''}${xt?`<text x="${(L+W-R)/2}" y="${H-6}" font-size="9" font-weight="600" text-anchor="middle" fill="#c0001a">${xt}</text>`:''}</svg>`}
const ic=(d,w=22,sw=1.8)=>`<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="#c0001a" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const IP={trend:'<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',clip:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM9 12h6M9 16h4"/>',
 users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-4 3-6 7-6s7 2 7 6M17 5a3 3 0 010 6M19 14c2 1 3 3 3 6"/>',cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
 up:'<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',bars:'<path d="M5 21V12M12 21V5M19 21v-6"/>',pie:'<path d="M12 3a9 9 0 109 9h-9z"/><path d="M15 3.5A9 9 0 0120.5 9H15z"/>',
 amb:'<path d="M2 17V8h11v9M13 11h4l4 3.5V17"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/><path d="M7.5 10.2v3.6M5.7 12h3.6"/>',
 bike:'<circle cx="5.5" cy="16.5" r="3.2"/><circle cx="18.5" cy="16.5" r="3.2"/><path d="M5.5 16.5l4-7.5h5l4 7.5M9.5 9H7M14.5 9l1-3h2.5"/>',
 baby:'<circle cx="12" cy="12" r="9"/><circle cx="9" cy="11" r=".8" fill="#c0001a"/><circle cx="15" cy="11" r=".8" fill="#c0001a"/><path d="M9 15c1.5 1.5 4.5 1.5 6 0"/>',chev:'<path d="M6 9l6 6 6-6"/>'};
const IC={};for(const k in IP)IC[k]=ic(IP[k]);
const icw=d=>ic(d,20,2).replace(/#c0001a/g,'#fff');
function donut(v,col,icons){const C=2*Math.PI*60;let o=0,t='';const sg=v.map((n,i)=>{const l=C*n/100,m=(o+l/2)/C*2*Math.PI-Math.PI/2,x=80+60*Math.cos(m),y=80+60*Math.sin(m);
 t+=`<g transform="translate(${x-7} ${y-17}) scale(.58)">${icons[i].replace(/#c0001a/g,'#fff').replace(/<svg[^>]*>/,'<g fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">').replace('</svg>','</g>')}</g><text x="${x}" y="${y+9}" font-size="9.5" font-weight="700" text-anchor="middle" fill="#fff">${n}%</text>`;
 const r=`<circle cx="80" cy="80" r="60" fill="none" stroke="${col[i]}" stroke-width="38" stroke-dasharray="${l} ${C-l}" stroke-dashoffset="${-o}"/>`;o+=l;return r}).join('');
 return `<svg viewBox="0 0 160 160" style="max-width:270px;margin:auto"><g transform="rotate(-90 80 80)">${sg}</g>${t}<circle cx="80" cy="80" r="38" fill="#fff"/><text x="80" y="76" font-size="8.5" text-anchor="middle" fill="#555">Total Requests</text><text x="80" y="92" font-size="14" font-weight="700" text-anchor="middle" fill="#c0001a">2,548</text></svg>`}
const chip=(l,v,p,s,icon,sq)=>`<div class="chip"><span class="ci${sq?' sq':''}">${icw(IP[icon||'trend'])}</span><div><small>${l}</small><b>${v}</b></div><div class="cp">↑ ${p}<small>${s}</small></div></div>`;
const FT='<div class="ft">'+[["Today's Bookings",'52','cal'],['This Week','312','up'],['This Month','1,248','bars'],['Average / Day','40.3','pie']].map(a=>`<div><span class="fti">${ic(IP[a[2]],18)}</span><span class="ftt">${a[0]}<b>${a[1]}</b></span></div>`).join('')+'</div>';
const cc=(t,s,svg,p='This Month',pre='',post='',o={})=>`<div class="cc"><div class="ch"><div class="ct">${o.ic?`<span class="hi${o.sq?' sq':''}">${o.sq?icw(IP[o.ic]):ic(IP[o.ic],24)}</span>`:''}<div><h5>${t}</h5>${s?`<small>${s}</small>`:''}</div></div><span class="pl">${o.cal?ic(IP.cal,14,2):''}${p}${ic(IP.chev,12,2.4)}</span></div>${o.lg?`<div class="crow">${pre}<span class="lg"><i class="${o.sq?'lgs':'lgl'}"></i>${o.lg}</span></div>`:pre}${svg}${post}</div>`;
const AMBS=[['Ambulance (ALS)',40,'#b30012','amb'],['Ambulance (BLS)',30,'#e03a3a','amb'],['Bike Ambulance',20,'#f07878','bike'],['Neonatal Ambulance',10,'#f9b3b3','baby']];
const AMB=()=>cc('Ambulance Type Distribution','Requests by different types of ambulances',`<div class="amb">${donut(AMBS.map(a=>a[1]),AMBS.map(a=>a[2]),AMBS.map(a=>IC[a[3]]))}<div class="al">${AMBS.map(a=>`<div class="ar"><i class="dot" style="background:${a[2]}"></i><span class="ai">${IC[a[3]]}</span><div class="an"><span>${a[0]}</span><b>${a[1]}%</b><span class="bar2"><i style="width:${a[1]*1.7}%"></i></span></div></div>`).join('')}</div></div>`,'This Month','',`<div class="foot2"><span class="fi">${IC.bars}</span><div><small>Total Requests</small><b>2,548</b></div><span class="fsep"></span><span class="fup">${IC.up}<div><b>+18.6%</b><small>vs last month</small></div></span></div>`,{});
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const USERS=[5240,5860,6420,7150,7980,8760,9540,10230,10960,11750,12250,12856];

/* build pages */
const stat=(t,n,g,ic)=>`<div class="stat"><div class="t">${t}${ic}</div><b>${n}</b><div class="up">▲ ${g} <i>from last months</i></div></div>`;
const I1='<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#9b3434" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-4 3-6 7-6s7 2 7 6M17 5a3 3 0 010 6M19 14c2 1 3 3 3 6"/></svg>';
const I0='<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#9b3434" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17V9l2-5h12l2 5v8M4 12h16"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/></svg>';
const I2='<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#9b3434" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 12l4-4M7 16c1.5 1.5 8.500 1.500 10 0"/></svg>';
const ORD=[['sam jorden','Completed','g',3000],['abc','Incomplete','r',4500],['joe','Processing','ye',5000],['joe','Completed','g',2500]];
mainEl.insertAdjacentHTML('afterbegin',
`<section class="pg" id="p-dashboard">${hd('Dashboard','Welcome to Ausway admin panel')}
<div class="cards">${stat('Total Bookings','1,986','+15.6%',I0)}${stat('Total Users','1,693','+9.3%',I1)}${stat('Active Drivers','169','+5.9%',I2)}</div>
<div class="charts">${cc('Number of Bookings','Overview of bookings over time',line([180,220,320,410,520,430,520],['01 May','05 May','10 May','15 May','20 May','25 May','31 May'],600,100,'l1',1,'Bookings'),'This Month',chip('Total Bookings','1,248','18.6%','vs Apr 2024','clip'),FT,{ic:'trend',cal:1,lg:'Bookings'})}${cc('Total Number of Users','Month wise user registration overview',bars(USERS,MON,16000,2000,1,'Number of Users','Month'),'This Year',chip('Total Users','12,856','24.6%','vs Last Year','users',1),'',{ic:'users',sq:1,cal:1,lg:'Total Users'})}</div>
<div class="panel orders"><h2>Recent Orders</h2><table><thead><tr><th>Customer</th><th>Status</th><th>Amount</th><th></th></tr></thead><tbody>${ORD.map(o=>`<tr><td>${o[0]}</td><td><span class="${o[1]==='Completed'?'g':o[1]==='Incomplete'?'r':'ye'}">${o[1]}</span></td><td><div class="amt"><span class="rs">₹</span><span>${o[3].toLocaleString('en-IN')}</span></div></td><td class="go"><a href="#trips" aria-label="Go to Trips">&gt;</a></td></tr>`).join('')}</tbody></table></div></section>
<section class="pg" id="p-trips">${hd('Trips Management','<a href="#dashboard" style="color:inherit;text-decoration:none">Dashboard</a> &gt; <b>Trips</b>')}${fb(sl('sr',['All Ratings','5 Stars','4+ Stars','3+ Stars'])+sl('ss',['All Status','Requested','Assigned','Arrived','Enroute','Reached','Completed']))}
<div class="tbox"><table><colgroup><col style="width:21.4%"><col style="width:17.5%"><col style="width:20%"><col style="width:11.1%"><col style="width:20%"><col style="width:10%"></colgroup><thead><tr><th>Driver</th><th>Trip ID</th><th>Contact</th><th>Ratings</th><th style="text-align:center">Status</th><th class="c-ar">Actions</th></tr></thead><tbody></tbody></table><div class="empty">No trips found</div></div>${PAGER}</section>
<section class="pg" id="p-requests">${hd('Requests','Dashboard &gt; Trips &gt; Drivers &gt; <b>Requests</b>')}${fb(sl('ss',['All Status','Completed','Cancelled','Inprogress'])+`<div class="sel cal" style="width:90px"><svg class="cl" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9b3434" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg><select class="sd"><option>All Dates</option><option>2024</option><option>2025</option></select>${CH.replace('<svg','<svg class="cv"')}</div>`)}
<div class="tbox"><table><colgroup><col style="width:17.2%"><col style="width:16.4%"><col style="width:19.8%"><col style="width:9.9%"><col style="width:16.5%"><col style="width:10.2%"><col style="width:10%"></colgroup><thead><tr><th>Request ID</th><th class="c-ar">Customer Details</th><th>Service Type</th><th>Status</th><th>Date &amp; Time</th><th>Amount</th><th class="c-ar">Actions</th></tr></thead><tbody></tbody></table><div class="empty">No requests found</div></div></section>
<section class="pg" id="p-reports"><div class="ttl"><div>${hd('Reports','Dashboard &gt; Trips &gt; Drivers &gt; Requests &gt; <b>Reports</b>')}</div><div class="dpill" style="position:relative;border-radius:999px;padding:10px 20px 10px 18px;gap:12px;font-size:22px;white-space:nowrap;cursor:pointer"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9b3434" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg><span id="rdtxt">1 May 2024-30 May 2024</span>${CH}<select class="rdsel" aria-label="Report date range" style="position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:pointer;font-size:16px"><option>1 May 2024-30 May 2024</option><option>1 Apr 2024-30 Apr 2024</option><option>1 Jan 2024-31 Dec 2024</option><option>1 Jan 2025-31 Dec 2025</option></select></div></div>
<div class="rate"><div style="font-size:17px;color:var(--red)">Average Ratings</div><div class="rr"><span><span id="rv">4.4</span>/5</span> <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#9b3434" stroke-width="1.6" stroke-linejoin="round"><path d="M12 2l3 6.500 7 .8-5.200 4.800 1.500 7L12 17.500 5.700 21l1.500-7L2 9.300l7-.8z"/></svg></div><div style="color:#1a8a00;font-size:17px">▲ <span id="rpc">+5.9%</span> <span style="color:#333">till April 2024</span></div></div>
<div class="tabs"><button class="on">Overview</button><button>Requests</button><button>Drivers</button><button class="ex" id="exp">⬇ Export Report</button></div>
<div class="rp on" id="rp-ov"><div class="charts">${cc('Requests Overview','',line([170,150,210,280,240,230,350,430,400,365,430,370,365,260,360,390,440,480],['01 May','','','06 May','','','11 May','','','16 May','','','21 May','','','26 May','','31 May'],600,100,'l2'),'This Month',chip('Total Requests','2,548','18.6%','vs Apr 2024','trend'),'',{lg:'Total Requests'})}
${AMB()}</div>
<div class="panel rep"><h2>Top Performing Services</h2><table><thead><tr><th>Service</th><th>Total Orders</th><th>Compeleted</th><th>Cancelled</th></tr></thead><tbody id="svc"></tbody></table></div></div><div class="rp" id="rp-rq"></div><div class="rp" id="rp-dr"></div></section>`);
const SV=[['Ambulance(ALS)',577,497,80],['Ambulance(BLS)',658,603,55],['Bike Ambulance',219,193,26],['Neonatal Ambulance',189,171,18]];
$('svc').innerHTML=SV.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('');
$('exp').onclick=()=>{const c='Service,Total Orders,Completed,Cancelled\n'+SV.map(r=>r.join(',')).join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([c],{type:'text/csv'}));a.download='ausway-report.csv';a.click()};
const DRV=[21,28,35,41,38,46,64],D7=['01 May','06 May','11 May','16 May','21 May','26 May','31 May'];
const LOC=[['Anna Nagar',577,'22.6%'],['T Nagar',510,'20.0%'],['Adyar',458,'18.0%'],['Velachery',410,'16.1%'],['Others',593,'23.3%']];
const tblP=(t,h,rows)=>`<div class="panel"><h2>${t}</h2><table><thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const DREP=[['Saravanan','14 Mar 2024',89,'94%','Active','Good'],['Harish','26 Jul 2024',65,'89%','Active','Good'],['Karthi','07 Feb 2025',21,'93%','Inactive','Good'],['Rahul','19 Sep 2025',18,'74%','Inactive','Review']];
const drvRep=`<div class="panel rep dr"><h2>Driver Reports</h2><table><thead><tr><th>Driver</th><th>Join date</th><th>Trips</th><th>Acceptance rate</th><th>Status</th><th>Performance</th></tr></thead><tbody>${DREP.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td class="${r[4]==='Active'?'g':'cn'}">${r[4]}</td><td class="${r[5]==='Good'?'g':'cn'}">${r[5]}</td></tr>`).join('')}</tbody></table></div>`;
$('rp-dr').innerHTML=`<div style="max-width:560px;margin:24px auto 0">${cc('Drivers Overview','Drivers onboarded over time',bars(DRV,D7,80,20,0),'This Month',chip('Total Drivers','348','12.4%','vs Apr 2024'))}</div>${drvRep}`;
$('rp-rq').innerHTML=`<div class="charts">${cc('Requests Overview','',line([170,150,210,280,240,230,350,430,400,365,430,370,365,260,360,390,440,480],['01 May','','','06 May','','','11 May','','','16 May','','','21 May','','','26 May','','31 May'],600,100,'l3'),'This Month',chip('Total Requests','2,548','18.6%','vs Apr 2024','trend'),'',{lg:'Total Requests'})}</div>${tblP('Requests By Location',['Location','Requests','Percentage'],LOC)}`;
const RT={Overview:['4.4','+5.9%','rp-ov'],Requests:['4.4','+5.9%','rp-rq'],Drivers:['4.1','+4.3%','rp-dr']};
document.querySelector('.rdsel').onchange=e=>{$('rdtxt').textContent=e.target.value};
document.querySelectorAll('.tabs button:not(.ex)').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tabs button:not(.ex)').forEach(x=>x.classList.remove('on'));b.classList.add('on');const t=RT[b.textContent.trim()];$('rv').textContent=t[0];$('rpc').textContent=t[1];document.querySelectorAll('.rp').forEach(x=>x.classList.toggle('on',x.id===t[2]))});

/* generic table + modal */
function showMenu(b,items){menu.innerHTML=items.map((x,i)=>`<button data-i="${i}" class="${x[2]||''}">${x[0]}</button>`).join('');const r=b.getBoundingClientRect();menu.style.left=Math.max(8,r.left+scrollX-150)+'px';menu.style.top=r.bottom+scrollY+6+'px';menu.style.display='block';menu.onclick=e=>{const i=e.target.dataset.i;if(i==null)return;menu.style.display='none';items[i][1]()}}
document.body.insertAdjacentHTML('beforeend',`<div class="dm" id="gm"><div class="dc"><div class="dp"><div class="dh"><h3 id="gt"></h3>${$('dClose').outerHTML.replace('id="dClose"','id="gx"')}</div><div class="gr" id="gb"></div><div id="gd"></div></div></div></div>`);
const gm=$('gm'),DOCS=document.querySelector('#modal .docs').outerHTML;
function gmodal(t,f,docs){$('gt').textContent=t;$('gb').innerHTML=f.map(x=>x[0][0]==='#'?`<h5${x[1]?` data-go="${x[1]}" title="Go to ${x[1]}" role="link" tabindex="0"`:''}>${x[0].slice(1)}</h5>`:`<div class="${x[3]?'w':''}"><small>${x[0]}:</small><em class="${x[2]||''}">${x[1]||'&nbsp;'}</em></div>`).join('');$('gd').innerHTML=docs?DOCS:'';gm.classList.add('on')}
$('gx').onclick=()=>gm.classList.remove('on');gm.onclick=e=>{if(e.target===gm)gm.classList.remove('on');const h=e.target.closest('h5[data-go]');if(h){gm.classList.remove('on');location.hash=h.dataset.go}const a=e.target.closest('.doc a');if(a)alert(a.dataset.doc+' preview')};
document.addEventListener('keydown',e=>{if(e.key==='Escape')gm.classList.remove('on')});
document.addEventListener('click',e=>{const s=e.target.closest('.pager span');if(s){s.parentNode.querySelectorAll('span').forEach(y=>y.style.fontWeight='');s.style.fontWeight='700'}});
function mk(pg,get,row,onAct){const root=$(pg),tb=root.querySelector('tbody'),q=root.querySelector('.sq'),s=root.querySelector('.ss'),d=root.querySelector('.sd'),rr=root.querySelector('.sr');
 const draw=()=>{const data=get(),t=q.value.trim().toLowerCase(),rs=data.filter(x=>(!t||JSON.stringify(x).toLowerCase().includes(t))&&(s.value.startsWith('All')||x.s===s.value)&&(!d||d.value.startsWith('All')||x.d.includes(d.value))&&(!rr||rateOk(rr.value,x.id)));
  tb.innerHTML=rs.map(x=>row(x,data.indexOf(x))).join('');root.querySelector('.empty').style.display=rs.length?'none':'block'};
 [q,s,d,rr].forEach(e=>e&&(e.oninput=draw));
 tb.onclick=e=>{const tr=e.target.closest('tr');if(!tr)return;const i=+tr.dataset.i;if(e.target.closest('.v'))onAct(i,'view');const b=e.target.closest('.dots');if(b){e.stopPropagation();onAct(i,'menu',b)}};
 draw();return draw}
/* trips */
const TC={Requested:'b',Assigned:'pu',Arrived:'o',Enroute:'ye',Reached:'g',Completed:'dg'};
let TR=[['Saravanan','REN2589','+91 8967420461','Requested',2699],['Ajay','AXR567','+91 7451984028','Assigned',3999],['Tharun','DFG4298','+91 8156034132','Arrived',7499],['Dinesh','SAT8901','+91 9073711460','Enroute',5199],['Arun','DSC7534','+91 9073711460','Reached',2999],['Dhanush','VEK5590','+91 9073711460','Completed',4599]].map(a=>({n:a[0],id:a[1],p:a[2],s:a[3],a:a[4],e:a[0].toLowerCase()+'@gmail.com'}));
const TRL={REN2589:['No:76,gandhi road,villivakkam,chennai-63','Apollo Hospital,Faren road,villivakkam,chennai-63'],AXR567:['No:21,anna nagar,chennai-40','MIOT Hospital,Manapakkam,chennai-89'],DFG4298:['No:5,t nagar,chennai-17','Vijaya Hospital,Vadapalani,chennai-26'],SAT8901:['No:8,adyar,chennai-20','Fortis Hospital,Adyar,chennai-20'],DSC7534:['No:14,velachery,chennai-42','Global Hospital,Perumbakkam,chennai-100'],VEK5590:['No:9,porur,chennai-116','Sri Ramachandra Hospital,Porur,chennai-116']};
const dT=mk('p-trips',()=>TR,(x,i)=>`<tr data-i="${i}" style="--h:${[68,69,72,78,69,69][i]||69}px"><td><div class="d">${U}${x.n}</div></td><td>${x.id}</td><td>${x.p}</td><td>${rateCell(x.id)}</td><td class="${TC[x.s]}" style="text-align:center;font-size:16px">${x.s}</td><td>${ACT}</td></tr>`,(i,k,b)=>{const x=TR[i],v=()=>gmodal('Trip Details',[['Driver Name',x.n],['Driver ID',x.id],['Email ID',x.e],['Phone',x.p],['Status',x.s,TC[x.s]],['Trip ID',x.id],['#QUERIES','requests'],['Amount','₹'+x.a.toLocaleString('en-IN')],['Pickup',(TRL[x.id]||['-','-'])[0],'',1],['Drop',(TRL[x.id]||['-','-'])[1],'',1]],1);
 if(k==='view')v();else showMenu(b,[
  ['Add trip',()=>{const n=(prompt('Driver name')||'').trim();if(!n)return;const id=(prompt('Trip ID','TRP'+Math.floor(1000+Math.random()*9000))||'').trim();if(!id)return;const p=(prompt('Phone','+91 ')||'').trim();if(!p)return;const a=parseInt(prompt('Amount (₹)','0'),10)||0;TR.push({n,id,p,s:'Requested',a,e:n.toLowerCase().replace(/\s+/g,'')+'@gmail.com'});dT()}],
  ['Delete trip',()=>{if(confirm('Delete trip '+x.id+' ('+x.n+')?')){TR.splice(i,1);dT()}},'del'],
  ['More',()=>{location.hash='trip/'+i}]
 ])});
/* requests */
const RC={Completed:'g',Cancelled:'cn',Inprogress:'ye'};
let RQ=[['PED-1234-567','Jeo','+91 1234567890','Ambulance(ALS)','Completed','12 Mar 2024','10:27 AM',2699,'Joe','FEG-1234','ABCjoe@gmail.com',6,'No:76,gandhi road,villivakkam,chennai-63','Apollo Hospital,Faren road,villivakkam,chennai-63','The driver asked extra amount to pay than the amount shown in the app'],
['FUS-5234-8923','Rohit','+91 8794351260','Ambulance(ALS)','Cancelled','23 Jul 2024','03:48 PM',3999,'Rohit','RHT-5234','rohit@gmail.com',3,'No:21,anna nagar,chennai-40','MIOT Hospital,Manapakkam,chennai-89','Booking was cancelled by the driver'],
['XEV-7780-3554','Sharma','+91 9826753725','Ambulance(BLS)','Inprogress','18 Feb 2025','07:13 AM',7499,'Sharma','SHM-7780','sharma@gmail.com',9,'No:5,t nagar,chennai-17','Vijaya Hospital,Vadapalani,chennai-26',''],
['MHJ-0099-1566','Gugan','+91 9826753725','Bike Ambulance','Completed','27 Jun 2025','12:43 PM',5199,'Gugan','GGN-0099','gugan@gmail.com',2,'No:8,adyar,chennai-20','Fortis Hospital,Adyar,chennai-20','']].map(a=>({id:a[0],n:a[1],p:a[2],sv:a[3],s:a[4],d:a[5]+' '+a[6],a:a[7],u:a.slice(8)}));
const dR=mk('p-requests',()=>RQ,(x,i)=>{const[dt,...tm]=[x.d.slice(0,11),x.d.slice(12)];return `<tr data-i="${i}" style="--h:${[68,69,72,72][i]||69}px"><td>${x.id}</td><td class="ct">${x.n}<small>${x.p}</small></td><td>${x.sv}</td><td class="${RC[x.s]}" style="font-size:16px">${x.s}</td><td class="ct" style="text-align:left">${dt}<small>${tm}</small></td><td style="font-size:18px">${inr(x.a)}</td><td><div class="act">${DOTS}</div></td></tr>`},(i,k,b)=>{const x=RQ[i],u=x.u,v=()=>gmodal('User Details',[['User Name',u[0]],['User ID',u[1]],['Email ID',u[2]],['Phone',x.p],['Status',x.s,RC[x.s]],['Join Date',x.d.slice(0,11)],['Total Bookings',u[3]],['Request ID',x.id],['Pickup',u[4],'',1],['Drop',u[5],'',1],['Complaint',u[6],'',1],['Description','','',1]]);
 v()});

/* ===== driver actions page ===== */
const TRIPS=[['TRP-1001','No:76,gandhi road,villivakkam','Apollo Hospital,Faren road','Ambulance(ALS)',2699,'12 Mar 2024','10:27 AM'],['TRP-1002','No:21,anna nagar','MIOT Hospital,Manapakkam','Ambulance(BLS)',3999,'23 Jul 2024','03:48 PM'],['TRP-1003','No:5,t nagar','Vijaya Hospital,Vadapalani','Bike Ambulance',1499,'18 Feb 2025','07:13 AM'],['TRP-1004','No:8,adyar','Fortis Hospital,Adyar','Ambulance(ALS)',5199,'27 Jun 2025','12:43 PM']];
let CUR=0;
mainEl.insertAdjacentHTML('beforeend',`<section class="pg" id="p-driver"><h1 id="dh1"></h1>
<div class="bar" style="margin-top:28px;padding:15px 20px"><div class="f-s" style="max-width:none;flex:1 1 400px">${SE}<input class="sq" placeholder="Search by Location,Amount or phon..." autocomplete="off"></div>${document.querySelector('#p-requests .cal').outerHTML}</div>
<div class="tbox" style="margin-top:34px"><table style="table-layout:fixed"><colgroup><col style="width:12%"><col style="width:24%"><col style="width:24%"><col style="width:15%"><col style="width:10%"><col style="width:15%"></colgroup><thead><tr><th style="padding-left:16px">Trip ID</th><th>Pick Up</th><th>Drop</th><th>Service Type</th><th>Amount</th><th>Date &amp; Time</th></tr></thead><tbody></tbody></table><div class="empty">No trips found</div></div>
<div class="bt-w"><button class="bt" id="deact"></button></div></section>`);
const dp=$('p-driver'),dq=dp.querySelector('.sq'),dd=dp.querySelector('.sd');
function drawTrips(){const t=dq.value.trim().toLowerCase(),rs=TRIPS.filter(x=>(!t||x.join(' ').toLowerCase().includes(t))&&(dd.value.startsWith('All')||x[5].includes(dd.value)));
 dp.querySelector('tbody').innerHTML=rs.map(x=>`<tr style="--h:72px"><td style="padding-left:16px">${x[0]}</td><td>${x[1]}</td><td>${x[2]}</td><td>${x[3]}</td><td>${inr(x[4])}</td><td>${x[5]}<small style="display:block;color:#888">${x[6]}</small></td></tr>`).join('');
 dp.querySelector('.empty').style.display=rs.length?'none':'block'}
dq.oninput=drawTrips;dd.onchange=drawTrips;
function showDriver(i){CUR=i;$('dh1').textContent=D[i].n;$('deact').textContent=D[i].s==='Active'?'Deactivate Driver':'Activate Driver';dq.value='';drawTrips()}
$('deact').onclick=()=>{const d=D[CUR],a=d.s==='Active';if(confirm((a?'Deactivate ':'Activate ')+d.n+'?')){d.s=a?'Inactive':'Active';render();showDriver(CUR)}};
$('tb').parentNode.addEventListener('click',e=>{const b=e.target.closest('.dots');if(!b)return;e.stopPropagation();const i=+b.closest('tr').dataset.i,d=D[i];
 showMenu(b,[
  ['Add driver',()=>{const n=(prompt('Driver name')||'').trim();if(!n)return;const id=(prompt('Driver ID','DRV'+Math.floor(1000+Math.random()*9000))||'').trim();if(!id)return;const p=(prompt('Phone','+91 ')||'').trim();if(!p)return;D.push({n,id,p,a:'Requested',s:'Active',e:n.toLowerCase().replace(/\s+/g,'')+'@gmail.com',j:new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}),r:0,g:'Male',ad:'-'});render()}],
  ['Delete driver',()=>{if(confirm('Delete driver '+d.n+' ('+d.id+')?')){D=D.filter(x=>x!==d);render()}},'del'],
  ['More',()=>{location.hash='driver/'+i}]
 ])},true);

/* ===== trip actions page ===== */
const TT=[['REN2589','abc colony 6th main road, virugabakkam,Chennai-89','Apollo Hospital,nehru road, vadapalani,Chennai-91','Ambulance(ALS)',2699,'12 Mar 2024','10:27 AM'],['AXR567','Apollo Hospital,nehru road, vadapalani,Chennai-91','abc colony 6th main road, virugabakkam,Chennai-89','Ambulance(BLS)',3499,'23 Jul 2024','03:48 PM'],['DFG4298','no:77,8th street,gandhi road, T.Nagar,Chennai-65','kauvery Hospital,kalidas road, T.Nagar,Chennai-65','Bike Ambulance',4999,'18 Feb 2025','07:13 AM'],['SAT8901','no:4,9th street,satya road, Annanagar,Chennai-35','kauvery Hospital,jai road, AnnaNagar,Chennai-35','Neonatal Ambulance',5499,'27 Jun 2025','12:43 AM']];
let CT=0;
mainEl.insertAdjacentHTML('beforeend',`<section class="pg" id="p-trip"><h1 id="th1"></h1>
<div class="bar" style="margin-top:28px;padding:15px 20px"><div class="f-s" style="max-width:none;flex:1 1 400px">${SE}<input class="sq" placeholder="Search by Location,Amount or phon..." autocomplete="off"></div>${document.querySelector('#p-requests .cal').outerHTML}</div>
<div class="tbox" style="margin-top:34px"><table class="tt" style="table-layout:fixed"><colgroup><col style="width:8%"><col style="width:11%"><col style="width:22%"><col style="width:22%"><col style="width:15%"><col style="width:10%"><col style="width:12%"></colgroup><thead><tr><th style="padding-left:6px">S.No</th><th>Trip ID</th><th>Pick Up</th><th>Drop</th><th>Service Type</th><th>Amount</th><th>Date &amp; Time</th></tr></thead><tbody></tbody></table><div class="empty">No trips found</div></div>
<div class="bt-w"><button class="bt" id="tdeact">Deactivate user</button></div></section>`);
const tp=$('p-trip'),tq=tp.querySelector('.sq'),td=tp.querySelector('.sd');
function drawTT(){const t=tq.value.trim().toLowerCase(),rs=TT.filter(x=>(!t||x.join(' ').toLowerCase().includes(t))&&(td.value.startsWith('All')||x[5].includes(td.value)));
 tp.querySelector('tbody').innerHTML=rs.map((x,i)=>`<tr style="--h:72px"><td style="padding-left:14px">${i+1}.</td><td>${x[0]}</td><td class="mid">${x[1]}</td><td class="mid">${x[2]}</td><td class="mid">${x[3]}</td><td style="font-size:18px">${inr(x[4])}</td><td>${x[5]}<small style="display:block;color:#888">${x[6]}</small></td></tr>`).join('');
 tp.querySelector('.empty').style.display=rs.length?'none':'block'}
tq.oninput=drawTT;td.onchange=drawTT;
function showTrip(i){CT=i;$('th1').textContent=TR[i].n;tq.value='';drawTT();const d=D.find(x=>x.n===TR[i].n);$('tdeact').textContent=d&&d.s==='Inactive'?'Activate user':'Deactivate user'}
$('tdeact').onclick=()=>{const d=D.find(x=>x.n===TR[CT].n);if(!d){alert('No driver account found for '+TR[CT].n);return}const a=d.s==='Active';if(confirm((a?'Deactivate ':'Activate ')+d.n+'?')){d.s=a?'Inactive':'Active';render();showTrip(CT)}};


const svgUser='<svg width="110" height="110" viewBox="0 0 24 24" fill="none" stroke="#7a0000" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3.5"/><path d="M5.5 19c1.5-3 4-4 6.5-4s5 1 6.5 4"/></svg>';
document.body.insertAdjacentHTML('beforeend',`<div id="pfBack"></div><div id="pfDrawer" role="dialog" aria-label="Edit profile"><button type="button" class="x" id="pfX" aria-label="Close">&times;</button><h2>EDIT PROFILE</h2><div class="av"><svg viewBox="0 0 24 24" fill="none" stroke="#8b0000" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3.5"/><path d="M5.5 19c1.5-3 4-4 6.5-4s5 1 6.5 4"/></svg><a id="pfPhoto">Change Profile Photo</a></div><form id="pfForm"><div class="card"><label>Full Name</label><input id="pfName" value="GUGAN"><label>User ID</label><input id="pfId" value="FEG-1234"><label>Email Address</label><input id="pfMail" type="email" value="gugan123@gmail.com"><label>Phone Number</label><input id="pfPh" value="123456789"><label>Date Of Birth</label><input id="pfDob" placeholder="DD/MM/YYYY"><label>Gender</label><select id="pfG"><option value="">Select Gender</option><option>Male</option><option>Female</option><option>Other</option></select></div><button type="submit" class="sv">Save Changes</button></form></div>`);
$('pfPhoto').onclick=()=>alert('Choose a new profile photo');
/* ---- profile: live preview, save + persist ---- */
const PF_IDS=['pfName','pfId','pfMail','pfPh','pfDob','pfG'];
let PF={};PF_IDS.forEach(i=>PF[i]=$(i).value);
let PF_SAVED=false;try{const j=JSON.parse(localStorage.getItem('ausway-profile')||'null');if(j){Object.assign(PF,j);PF_SAVED=true}}catch(_){}
const pfShowName=n=>{n=(n||'').trim()||'Full Name';document.querySelectorAll('.pill>span,#notifApp .user-pill .name').forEach(e=>e.textContent=n)};
const pfFill=()=>PF_IDS.forEach(i=>$(i).value=PF[i]||'');
pfFill();if(PF_SAVED)pfShowName(PF.pfName);
$('pfName').addEventListener('input',e=>pfShowName(e.target.value));
$('pfForm').onsubmit=e=>{e.preventDefault();
 if(!$('pfName').value.trim()){$('pfName').focus();return}
 PF_IDS.forEach(i=>PF[i]=$(i).value.trim());PF_SAVED=true;
 try{localStorage.setItem('ausway-profile',JSON.stringify(PF))}catch(_){}
 pfShowName(PF.pfName);pfOpen(false);if(typeof toast==='function')toast('Profile saved')};
const pill=document.querySelector('.pill');pill.style.cursor='pointer';const pfD=$('pfDrawer'),pfB=$('pfBack'),pfOpen=o=>{if(!o){pfFill();if(PF_SAVED)pfShowName(PF.pfName);else pfShowName('')}pfD.classList.toggle('on',o);pfB.classList.toggle('on',o)};
pill.onclick=()=>pfOpen(true);pfB.onclick=$('pfX').onclick=()=>pfOpen(false);addEventListener('keydown',e=>{if(e.key==='Escape')pfOpen(false)});
const bell=document.querySelector('.ic>svg');bell.onclick=()=>{location.hash='notifications'};
/* profile pill on the notifications page now opens the same editable profile drawer */
const nPill=document.querySelector('#notifApp .user-pill');nPill.onclick=e=>{e.stopPropagation();pfOpen(true)};
/* settings icon (main header + notifications header) -> settings page */
const gear=document.querySelector('.ic>svg:nth-child(2)');gear.onclick=()=>{location.hash='settings'};
document.querySelector('#notifApp .settings').onclick=()=>{location.hash='settings'};

/* ===== settings page ===== */
const THEMES=[['Maroon','#9b3434'],['Crimson','#c0001a'],['Navy','#1f4e8c'],['Teal','#0f766e'],['Purple','#6b3fa0'],['Charcoal','#444b57']];
const SD={theme:'#9b3434',compact:false,sound:true,email:true,reqAlerts:true,drvAlerts:true,lang:'English',rows:'10'};
let SS=Object.assign({},SD);try{SS=Object.assign(SS,JSON.parse(localStorage.getItem('ausway-settings')||'{}'))}catch(_){}
function shade(h,a){const n=parseInt(h.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const f=c=>Math.max(0,Math.min(255,Math.round(a>0?c+(255-c)*a:c*(1+a))));return '#'+[f(r),f(g),f(b)].map(c=>c.toString(16).padStart(2,'0')).join('')}
function applySettings(st){const r=document.documentElement.style;if(st.theme==='#9b3434'){['--red','--pink'].forEach(k=>r.removeProperty(k));const n=document.getElementById('notifApp').style;['--red-dark','--red-light','--pink','--icon'].forEach(k=>n.removeProperty(k));document.body.style.background='';document.body.classList.toggle('compact',!!st.compact);return}r.setProperty('--red',st.theme);r.setProperty('--pink',shade(st.theme,.88));
 const na=document.getElementById('notifApp');na.style.setProperty('--red-dark',st.theme);na.style.setProperty('--red-light',shade(st.theme,.3));na.style.setProperty('--pink',shade(st.theme,.88));na.style.setProperty('--icon',st.theme);
 document.body.style.background='linear-gradient(180deg,'+st.theme+' 0%,'+st.theme+' 62%,'+shade(st.theme,.3)+' 100%) fixed';
 document.body.classList.toggle('compact',!!st.compact)}
const tg=(id,l,v)=>`<div class="srow"><span>${l}</span><label class="tg"><input type="checkbox" id="${id}"${v?' checked':''}><span></span></label></div>`;
mainEl.insertAdjacentHTML('beforeend',`<section class="pg" id="p-settings"><h1>Settings</h1>
<div class="sgrid">
<div class="scard"><h2>Appearance</h2><p>Choose the colour theme of the admin panel.</p><div class="swatches" id="swatches">${THEMES.map(t=>`<div class="sw" data-c="${t[1]}" title="${t[0]}" style="background:${t[1]}"></div>`).join('')}</div><div style="height:16px"></div>${tg('sCompact','Compact table rows',SS.compact)}</div>
<div class="scard"><h2>Notifications</h2><p>Decide which alerts you want to receive.</p>${tg('sReq','New ambulance request alerts',SS.reqAlerts)}${tg('sDrv','Driver verification alerts',SS.drvAlerts)}${tg('sEmail','Email notifications',SS.email)}${tg('sSound','Notification sound',SS.sound)}</div>
<div class="scard"><h2>General</h2><p>Language and list preferences.</p><div class="srow"><span>Language</span><div class="sel"><select id="sLang"><option>English</option><option>தமிழ்</option><option>हिन्दी</option></select>${CH}</div></div><div class="srow"><span>Rows per page</span><div class="sel"><select id="sRows"><option>10</option><option>25</option><option>50</option></select>${CH}</div></div></div>
<div class="scard"><h2>Account</h2><p>Manage your profile and session.</p><div class="srow"><span>Edit profile details</span><button class="sbtn" id="sProf" style="padding:8px 20px;font-size:16px;border-radius:12px">Edit</button></div><div class="srow"><span>Reset all settings</span><button class="sbtn alt" id="sReset" style="padding:8px 20px;font-size:16px;border-radius:12px">Reset</button></div></div>
</div>
<div class="sbtn-w"><button class="sbtn alt" id="sCancel">Cancel</button><button class="sbtn" id="sSave">Save Settings</button></div></section><div class="stoast" id="sToast"></div>`);
let draft;
function paintSettings(){draft=Object.assign({},SS);
 document.querySelectorAll('#swatches .sw').forEach(x=>x.classList.toggle('on',x.dataset.c===draft.theme));
 $('sCompact').checked=draft.compact;$('sReq').checked=draft.reqAlerts;$('sDrv').checked=draft.drvAlerts;$('sEmail').checked=draft.email;$('sSound').checked=draft.sound;$('sLang').value=draft.lang;$('sRows').value=draft.rows}
const toast=t=>{const e=$('sToast');e.textContent=t;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),2000)};
$('swatches').onclick=e=>{const c=e.target.closest('.sw');if(!c)return;draft.theme=c.dataset.c;applySettings(draft);document.querySelectorAll('#swatches .sw').forEach(x=>x.classList.toggle('on',x===c))};
$('sCompact').onchange=e=>{draft.compact=e.target.checked;applySettings(draft)};
$('sReq').onchange=e=>draft.reqAlerts=e.target.checked;$('sDrv').onchange=e=>draft.drvAlerts=e.target.checked;
$('sEmail').onchange=e=>draft.email=e.target.checked;$('sSound').onchange=e=>draft.sound=e.target.checked;
$('sLang').onchange=e=>draft.lang=e.target.value;$('sRows').onchange=e=>draft.rows=e.target.value;
$('sSave').onclick=()=>{SS=Object.assign({},draft);try{localStorage.setItem('ausway-settings',JSON.stringify(SS))}catch(_){}applySettings(SS);toast('Settings saved')};
$('sCancel').onclick=()=>{applySettings(SS);location.hash=(window.__lastHash||'#dashboard')};
$('sReset').onclick=()=>{if(!confirm('Reset all settings to default?'))return;SS=Object.assign({},SD);try{localStorage.removeItem('ausway-settings')}catch(_){}applySettings(SS);paintSettings();toast('Settings reset')};
$('sProf').onclick=()=>pfOpen(true);
applySettings(SS);paintSettings();

/* router */
const PGS=['dashboard','trips','drivers','requests','reports'],navs=[...document.querySelectorAll('.nav')];
function go(){const[h,a]=location.hash.slice(1).split('/');const nv=h==='notifications';document.body.classList.toggle('nview',nv);if(nv){scrollTo(0,0);return}if(h!=='settings')window.__lastHash=location.hash||'#dashboard';let p=h==='driver'||h==='trip'||h==='settings'?h:PGS.includes(h)?h:'dashboard';if(h==='settings')paintSettings();if(p==='driver'){if(!D[+a]){location.hash='drivers';return}showDriver(+a)}if(p==='trip'){if(!TR[+a]){location.hash='trips';return}showTrip(+a)}const np=p==='driver'?'drivers':p==='trip'?'trips':p==='settings'?'':p;document.querySelectorAll('.pg').forEach(x=>x.classList.toggle('on',x.id==='p-'+p));navs.forEach((n,i)=>n.classList.toggle('on',PGS[i]===np));scrollTo(0,0)}
navs.forEach((n,i)=>n.onclick=()=>{location.hash=PGS[i]});document.querySelector('.logo').onclick=()=>{location.hash='dashboard'};document.querySelector('.logo').style.cursor='pointer';
addEventListener('hashchange',go);go();
