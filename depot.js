/* The Utah Depot: draws the map page (kids.html) and each story page (depot-story.html?stop=N) from depot.json */
(async function(){
const $=id=>document.getElementById(id);
const mk=(t,a={},kids=[])=>{const n=document.createElement(t);for(const k in a){if(k==="text")n.textContent=a[k];else if(a[k]!=null)n.setAttribute(k,a[k])}[].concat(kids).forEach(c=>c&&n.append(typeof c==="string"?document.createTextNode(c):c));return n};
const NS="http://www.w3.org/2000/svg",sv=(t,a={})=>{const n=document.createElementNS(NS,t);for(const k in a)n.setAttribute(k,a[k]);return n};
const count=p=>{try{if(window.goatcounter&&goatcounter.count)goatcounter.count({path:p,title:"Utah Depot",event:true})}catch(e){}};
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const nice=d=>{const p=String(d||"").split("-");return p.length===3?new Date(+p[0],+p[1]-1,+p[2]).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}).replace(/^(\w{3}) /,"$1. ").replace("May. ","May "):""};
let D;try{D=window.DEPOT_DATA||await (await fetch("depot.json",{cache:"no-cache"})).json()}catch(e){const m=$("d-main");if(m)m.prepend(mk("p",{class:"d-note",text:"The train is running late. Please check back soon."}));return}
const stops=D.stops||[],here=stops[stops.length-1],opts=(D.vote&&D.vote.options)||[];
const page=document.body.dataset.depot;

/* ================= CONDUCTOR'S TICKET BOOK =================
   Punches are saved only in this browser. No names, emails or accounts. */
const TBK="utah-depot-ticket-v1";
const TB=(()=>{let d;try{d=JSON.parse(localStorage.getItem(TBK)||"{}")}catch(e){d={}}d.p=d.p||{};return d})();
const tbSave=()=>{try{localStorage.setItem(TBK,JSON.stringify(TB))}catch(e){}};
const punches=()=>Object.values(TB.p).reduce((a,b)=>a+b,0);
const LEVELS=[{n:5,name:"Junior Conductor",gift:"A Junior Conductor certificate to print"},{n:15,name:"Engineer",gift:"A bonus coloring page and a secret caboose fact"},{n:30,name:"Chief Engineer",gift:"Pick the color of your train on the map"},{n:50,name:"Master Conductor",gift:"A Master Conductor certificate and a spot in the monthly prize drawing"}];
const levelOf=n=>LEVELS.filter(l=>n>=l.n).pop();
document.documentElement.style.setProperty("--eng",TB.color||"#E6C26B");
let toastEl;function toast(t){if(!toastEl){toastEl=mk("div",{class:"d-toast",role:"status","aria-live":"polite"});document.body.append(toastEl)}toastEl.textContent=t;toastEl.classList.add("on");clearTimeout(toastEl._t);toastEl._t=setTimeout(()=>toastEl.classList.remove("on"),2600)}
function earn(key,pts,why){if(TB.p[key])return;const before=punches();TB.p[key]=pts;tbSave();const after=punches();
  const up=LEVELS.find(l=>before<l.n&&after>=l.n);
  toast(up?"🎉 You're a "+up.name+"! "+up.gift+" unlocked.":"+"+pts+" punch"+(pts>1?"es":"")+"! "+why);count("depot punch: "+key.split(":")[0]);drawTB()}
const today=new Date().toISOString().slice(0,10);
function drawTB(){const box=$("d-tb");if(!box)return;const n=punches(),lv=levelOf(n),next=LEVELS.find(l=>n<l.n);
  const holes=mk("div",{class:"d-holes","aria-hidden":"true"});const goal=next?next.n:50;for(let i=0;i<goal;i++)holes.append(mk("span",{class:i<n?"on":""}));
  const parts=[mk("div",{class:"d-tb-top"},[mk("div",{},[mk("p",{class:"d-eye",text:"Your Conductor's Ticket Book"}),mk("h3",{text:lv?lv.name:"New rider"})]),mk("div",{class:"d-tb-count"},[mk("b",{text:String(n)}),mk("small",{text:"punches"})])]),holes,
    mk("p",{class:"d-note",text:next?(next.n-n)+" more to become a "+next.name+": "+next.gift+".":"You've unlocked everything. Keep riding for the prize drawing!"})];
  const ul=mk("ul",{class:"d-rewards"});
  LEVELS.forEach(l=>{const open=n>=l.n,li=mk("li",{class:open?"open":""},[mk("span",{class:"lock",text:open?"★":"🔒"}),mk("span",{},[mk("b",{text:l.n+" punches · "+l.name}),mk("span",{text:l.gift})])]);
    if(open){const act=mk("div",{class:"d-reward-act"});
      if(l.n===5||l.n===50)act.append(mk("button",{type:"button",class:"d-btn small",text:"Print my certificate"},[]));
      if(l.n===15&&D.ticketBook){const tbx=D.ticketBook;if(tbx.bonusColoring)act.append(mk("a",{class:"d-btn small",href:"color.html?img="+encodeURIComponent(tbx.bonusColoring.file)+"&t="+encodeURIComponent(tbx.bonusColoring.title),text:"Bonus coloring page"}));
        if(tbx.secretFact){const f=mk("p",{class:"d-secret",hidden:""},[tbx.secretFact+" ",tbx.secretSource?mk("a",{href:tbx.secretSource,target:"_blank",rel:"noopener",text:"(source)"}):null]);const b=mk("button",{type:"button",class:"d-btn small",text:"Open the secret caboose"});b.onclick=()=>{f.hidden=!f.hidden};act.append(b,f)}}
      if(l.n===30){const row=mk("div",{class:"d-colors"});[["Gold","#E6C26B"],["Silver","#D9E2EC"],["Emerald","#5FD39A"],["Sky","#6FB8FF"],["Fire","#FF7A59"],["Lilac","#C7A6FF"]].forEach(([nm,c])=>{const b=mk("button",{type:"button",class:"d-swatch","aria-label":nm+" train","aria-pressed":String((TB.color||"#E6C26B")===c),style:"background:"+c});b.onclick=()=>{TB.color=c;tbSave();document.documentElement.style.setProperty("--eng",c);drawTB();toast("Your train is "+nm.toLowerCase()+" now!")};row.append(b)});act.append(row)}
      if(l.n===50&&D.prizeForm)act.append(mk("a",{class:"d-btn small solid",href:D.prizeForm,target:"_blank",rel:"noopener",text:"Grown-ups: enter the prize drawing"}));
      if(l.n===50&&!D.prizeForm)act.append(mk("p",{class:"d-note",text:"The monthly prize drawing opens soon."}));
      act.querySelectorAll("button.d-btn").forEach(b=>{if(b.textContent==="Print my certificate")b.onclick=()=>printCert(l.n===50?"Master Conductor":"Junior Conductor")});
      li.append(act)}
    ul.append(li)});
  if(n>=5){const inp=mk("input",{id:"d-cert-name",type:"text",maxlength:"30",autocomplete:"off",placeholder:"First name for your certificate",value:TB.nm||""});inp.oninput=()=>{TB.nm=inp.value.slice(0,30);tbSave()};
    parts.push(mk("label",{class:"d-namefield",for:"d-cert-name"},[mk("span",{text:"Your first name for the certificate (it stays on this device)"}),inp]))}
  parts.push(ul);
  parts.push(mk("p",{class:"d-note",text:"How to earn punches: read a story (1), get all of Fact or Fiction right (2), color or print the coloring page (1), do the word search (1), vote (1), visit a Learn More site (1), and hop on an activity car each day (1). Punches are saved only on this device."}));
  box.replaceChildren(...parts)}
function printCert(title){let c=$("d-cert");if(!c){c=mk("div",{id:"d-cert"});document.body.append(c)}
  const nameBox=$("d-cert-name");const nm=(nameBox&&nameBox.value||"").trim().slice(0,30);
  c.replaceChildren(mk("div",{class:"d-cert-in"},[mk("p",{class:"t1",text:"The Utah Depot"}),mk("p",{class:"t2",text:"This certifies that"}),mk("p",{class:"t3",text:nm||"________________________"}),mk("p",{class:"t2",text:"is an official"}),mk("p",{class:"t4",text:title}),mk("p",{class:"t2",text:"with "+punches()+" punches on the Conductor's Ticket Book"}),mk("p",{class:"t5",text:new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})+" · ogdenvalleyevent.com"})]));
  document.body.classList.add("printcert");window.print();setTimeout(()=>document.body.classList.remove("printcert"),600);count("depot certificate: "+title)}


/* ================= MAP PAGE ================= */
if(page==="map"){
  const X=lon=>(lon+114.05)*100,Y=lat=>(42-lat)*100,map=$("d-svg");
  const pts=stops.map(s=>[X(s.lon),Y(s.lat)]).concat(opts.map(o=>[X(o.lon),Y(o.lat)]));
  const x0=Math.min(...pts.map(p=>p[0])),x1=Math.max(...pts.map(p=>p[0])),y0=Math.min(...pts.map(p=>p[1])),y1=Math.max(...pts.map(p=>p[1]));
  const vw=Math.max(x1-x0+250,330),vh=Math.max(y1-y0+150,vw*.72),vx=(x0+x1)/2-vw/2,vy=(y0+y1)/2-vh/2+8,k=vw/560;
  map.setAttribute("viewBox",[vx,vy,vw,vh].map(n=>n.toFixed(1)).join(" "));
  const F="Source Sans 3, Segoe UI, sans-serif";
  const txt=(x,y,s,o={})=>{const t=sv("text",Object.assign({x,y,"font-family":F,"font-weight":800,"font-size":(o.size||24)*k,fill:"var(--d-ink)",stroke:"#0E1A3D","stroke-width":6*k,"paint-order":"stroke","stroke-linejoin":"round","text-anchor":o.anchor||"start"},o.attrs||{}));t.textContent=s;map.append(t);return t};
  /* a few stars in the night sky */
  for(let i=0;i<40;i++){const sx=vx+((i*97)%101)/101*vw,sy=vy+((i*53)%89)/89*vh;map.append(sv("circle",{cx:sx,cy:sy,r:(i%3+1)*k*.8,fill:i%4?"#FFFFFF":"#FFE9A8",opacity:.2+(i%5)*.1}))}
  map.append(sv("path",{d:"M0 0 H294.5 V100 H500 V500 H0 Z",fill:"var(--d-land)",stroke:"var(--d-land-edge)","stroke-width":3*k,"stroke-linejoin":"round"}));
  txt(Math.min(Math.max(vx+vw*.32,40),260),vy+vh-22*k,"UTAH",{size:46,anchor:"middle",attrs:{fill:"var(--d-land-edge)",stroke:"none","font-family":"Cinzel, Georgia, serif","font-weight":900,"letter-spacing":10*k,opacity:.45}});
  txt(Math.max(vx+14*k,8),-12*k,"IDAHO",{size:16,attrs:{fill:"var(--d-muted)",stroke:"none","letter-spacing":5*k}});
  /* track already traveled: glowing gold line */
  if(stops.length>1){const p=stops.map(s=>X(s.lon)+","+Y(s.lat)).join(" ");
    map.append(sv("polyline",{points:p,fill:"none",stroke:"#E6C26B","stroke-width":12*k,opacity:.18}));
    map.append(sv("polyline",{points:p,fill:"none",stroke:"#E6C26B","stroke-width":9*k,"stroke-dasharray":(2*k)+" "+(7*k)}));
    map.append(sv("polyline",{points:p,fill:"none",stroke:"#FFF3C4","stroke-width":3*k}))}
  const hx=X(here.lon),hy=Y(here.lat);
  /* trips on the ballot: dashed line, a mile badge halfway, the name on the far side of the dot */
  const later=[];
  opts.forEach(o=>{const x=X(o.lon),y=Y(o.lat),dx=x-hx,dy=y-hy,len=Math.hypot(dx,dy)||1,ux=dx/len,uy=dy/len;
    map.append(sv("line",{x1:hx,y1:hy,x2:x,y2:y,stroke:"var(--d-green)","stroke-width":3*k,"stroke-dasharray":(8*k)+" "+(7*k)}));
    map.append(sv("circle",{cx:x,cy:y,r:9*k,fill:"#0E1A3D",stroke:"var(--d-green)","stroke-width":4*k}));
    const lx=x+ux*20*k,ly=y+uy*20*k+(uy>.35?18*k:uy<-.35?-4*k:7*k);
    const an=Math.abs(ux)<.35?"middle":(ux<0?"end":"start"),up=uy<-.35;
    later.push(()=>{txt(lx,up?ly-20*k:ly,o.name,{size:23,anchor:an});txt(lx,(up?ly-20*k:ly)+22*k,o.miles+" miles",{size:18,anchor:an,attrs:{fill:"var(--d-green)"}})})});
  stops.forEach(s=>{const x=X(s.lon),y=Y(s.lat),now=s===here;
    map.append(sv("circle",{cx:x,cy:y,r:(now?12:8)*k,fill:"var(--d-brass)",stroke:"#FFF3C4","stroke-width":3*k}));
    if(now)map.append(sv("circle",{cx:x,cy:y,r:20*k,fill:"none",stroke:"#E6C26B","stroke-width":2*k,opacity:.5}))});
  later.forEach(f=>f());
  stops.forEach(s=>{const now=s===here;txt(X(s.lon)+20*k,Y(s.lat)+8*k,s.place,{size:now?26:20,attrs:{fill:now?"#FFE9A8":"var(--d-ink)"}})});
  const eng=sv("g",{id:"engine"});
  eng.innerHTML=('<g transform="scale('+k+') translate(18,16) scale(.5)"><rect x="18" y="40" width="70" height="30" rx="10" fill="#1B2A5C" stroke="var(--eng)" stroke-width="3"/><rect x="30" y="16" width="14" height="28" fill="#1B2A5C" stroke="#E6C26B" stroke-width="3"/><rect x="26" y="12" width="22" height="7" rx="2" fill="#E6C26B"/><rect x="84" y="22" width="44" height="48" rx="4" fill="#1B2A5C" stroke="#E6C26B" stroke-width="3"/><rect x="80" y="16" width="52" height="9" rx="3" fill="#E6C26B"/><rect x="94" y="32" width="14" height="14" rx="2" fill="#FFE9A8"/><polygon points="2,80 18,58 18,80" fill="#E6C26B"/><g fill="#1B2A5C" stroke="#E6C26B" stroke-width="4"><circle cx="36" cy="80" r="11"/><circle cx="64" cy="80" r="11"/><circle cx="106" cy="78" r="14"/></g></g>').replace(/#E6C26B/g,'var(--eng)');
  eng.style.transform="translate("+hx+"px,"+hy+"px)";map.append(eng);
  map.setAttribute("aria-label","Map of northern Utah. The train is at "+here.place+". Trips to vote on: "+opts.map(o=>o.name+", "+o.miles+" miles").join("; ")+".");

  /* activity cars: every kids activity on the site rides along */
  const CARS=[["coloring.html","Coloring Car","Print a coloring page"],["color.html","Paint Car","Color online with 48 colors"],["puzzles.html","Puzzle Car","Word searches, crosswords and jigsaws"],["i-spy.html","I Spy Car","Find the hidden things"],["scavenger-hunt.html","Scavenger Car","Check off this month's hunt"],["guess-the-spot.html","Lookout Car","Guess where the photo was taken"],["wildlife.html#checklist","Wildlife Car","Spot Valley animals"],["night-sky.html","Stargazer Car","What's in tonight's sky"]];
  const carBox=$("d-cars");if(carBox)carBox.replaceChildren(...CARS.map(([h,t,l])=>{const a=mk("a",{class:"d-car",href:h},[mk("b",{text:t}),mk("span",{text:l}),mk("i",{"aria-hidden":"true"})]);a.addEventListener("click",()=>earn("car:"+h+":"+today,1,"All aboard the "+t+"."));return a}));
  /* numbers */
  $("d-now").textContent=here.place;$("d-total").textContent=stops.reduce((a,s)=>a+(+s.milesThisTrip||0),0).toLocaleString();$("d-count").textContent=stops.length;
  /* the stories, newest first */
  $("d-stops").replaceChildren(...stops.slice().reverse().map(s=>mk("li",{},[mk("a",{class:"d-stop",href:"depot-story.html?stop="+s.n},[
    mk("span",{class:"num"},[mk("small",{text:"STOP"}),String(s.n)]),
    mk("span",{},[mk("h3",{text:s.title}),mk("span",{class:"where",text:s.place+(s.posted?" · "+nice(s.posted):"")})]),
    mk("span",{class:"go",text:"Read the story →"})])])));
  /* vote */
  const vote=$("d-vote");
  if(!opts.length){vote.hidden=true}else{
    $("d-closes").textContent=D.voteCloses||"Sunday night";
    const key="utah-depot-vote-"+D.vote.id,mine=store.get(key),msg=$("d-voted");
    const say=(t,on)=>{msg.textContent=t;msg.className="d-voted"+(on?" on":"")};
    if(mine){const o=opts.find(x=>x.id===mine);if(o)say("Your family's ticket is punched for "+o.name+". Check back next week to see where the train goes.",true)}
    $("d-tix").replaceChildren(...opts.map(o=>{const b=mk("button",{type:"button",class:"d-ticket",id:"vote-"+o.id,"aria-pressed":String(mine===o.id)},[
      mk("span",{class:"main"},[mk("b",{text:o.name}),mk("span",{text:o.line})]),
      mk("span",{class:"side"},[mk("b",{text:String(o.miles)}),mk("small",{text:"miles"})])]);
      b.onclick=()=>{const prev=store.get(key);if(prev===o.id)return;if(!prev){count("depot vote "+D.vote.id+": "+o.id);earn("vote:"+D.vote.id,1,"Thanks for voting.")}store.set(key,o.id);
        document.querySelectorAll(".d-ticket").forEach(t=>t.setAttribute("aria-pressed",String(t===b)));
        say(prev?"Your first vote is the one we count. Thanks for riding along!":"Ticket punched! Your vote for "+o.name+" is in. Check back next week to see where the train goes.",true);
        eng.style.transform="translate("+X(o.lon)+"px,"+Y(o.lat)+"px)"};return b}));
  }
}

/* ================= BOTH PAGES: story-idea box ================= */
document.querySelectorAll("[data-suggest]").forEach(a=>{if(D.suggestForm){a.href=D.suggestForm;a.target="_blank";a.rel="noopener";a.hidden=false;a.setAttribute("data-track","depot story idea")}});
if(D.suggestForm)document.querySelectorAll("[data-suggest-hide]").forEach(e=>e.hidden=true);

/* ================= STORY PAGE ================= */
if(page==="story"){
  const n=+(new URLSearchParams(location.search).get("stop")||(location.hash.match(/\d+/)||[])[0]||here.n);
  const s=stops.find(x=>x.n===n)||here;
  document.title="Stop "+s.n+": "+s.title+" · The Utah Depot";
  $("d-stopline").textContent="The Utah Depot · Stop "+s.n;$("d-platform").textContent="Platform 1869 · "+s.place;
  $("d-title").textContent=s.title;
  $("d-meta").textContent=(s.posted?"Posted "+nice(s.posted)+" · ":"")+"About a 4-minute read-aloud";
  $("d-story").replaceChildren(...(s.story||[]).map(p=>mk("p",{text:p})));
  /* a business or group can sponsor a stop: "sponsor":{"name":"","url":"","line":""} */
  if(s.sponsor&&s.sponsor.name)$("d-story").append(mk("p",{class:"d-sponsor"},["This stop is brought to you by ",s.sponsor.url?mk("a",{href:s.sponsor.url,target:"_blank",rel:"noopener",text:s.sponsor.name}):mk("b",{text:s.sponsor.name}),s.sponsor.line?". "+s.sponsor.line:"."]));

  /* coloring pages: one for littles, one for bigger kids. Color online, or print just the picture */
  const cols=[].concat(s.coloring||[]).filter(c=>c&&c.file);
  if(cols.length){$("d-color-list").replaceChildren(...cols.map(col=>{
    const pr=mk("button",{type:"button",class:"d-btn small",text:"Print it"});
    pr.onclick=()=>{earn("color:"+s.n,1,"Have fun coloring.");const im=document.querySelector("#d-printpic img");document.body.classList.add("printpic");const go=()=>{window.print();setTimeout(()=>document.body.classList.remove("printpic"),500)};im.onload=go;im.src=col.file;if(im.complete&&im.naturalWidth)go();count("depot coloring printed "+col.file)};
    const on=mk("a",{class:"d-btn small solid",href:"color.html?img="+encodeURIComponent(col.file)+"&t="+encodeURIComponent(col.title),text:"Color online"});on.addEventListener("click",()=>earn("color:"+s.n,1,"Have fun coloring."));
    return mk("div",{class:"d-color-card"},[mk("p",{class:"d-eye",text:col.level||"Coloring page"}),mk("img",{src:col.file,alt:"Coloring page: "+col.title,loading:"lazy"}),mk("b",{text:col.title}),mk("div",{class:"d-color-btns"},[on,pr])])}))}
  else $("d-color").hidden=true;
  $("d-print").onclick=()=>{document.querySelectorAll("details.d-src").forEach(d=>d.open=true);window.print();count("depot story printed stop-"+s.n)};
  const acts=$("d-acts");
  const quiz=mk("div",{class:"d-act"},[mk("h3",{text:"Fact or Fiction?"})]);const right=new Set();
  (s.quiz||[]).forEach((q,i)=>{const ans=mk("p",{class:"ans","aria-live":"polite"});
    const b=(lab,val)=>{const x=mk("button",{type:"button",text:lab});x.onclick=()=>{if(val===q.a){right.add(i);if(right.size===(s.quiz||[]).length)earn("quiz:"+s.n,2,"Fact or Fiction champ!")}ans.textContent=(val===q.a?"You got it! ":"Not quite. ")+(q.a?"Fact. ":"Fiction. ")+q.why;ans.style.color=val===q.a?"var(--d-green)":"var(--d-ink)";count("depot quiz stop-"+s.n)};return x};
    quiz.append(mk("div",{class:"d-q"},[mk("p",{text:(i+1)+". "+q.q}),mk("div",{class:"row"},[b("Fact",true),b("Fiction",false)]),ans]))});
  acts.append(quiz);
  if(s.draw)acts.append(mk("div",{class:"d-act"},[mk("h3",{text:"Draw it"}),mk("p",{text:s.draw})]));
  if(s.find)acts.append(mk("div",{class:"d-act"},[mk("h3",{text:"Go find it"}),mk("p",{text:s.find})]));
  if(s.word)acts.append(mk("div",{class:"d-act"},[mk("h3",{text:"Word of the week"}),mk("p",{class:"d-word",text:s.word.w}),mk("p",{text:s.word.def})]));
  if(s.wordSearch&&s.wordSearch.length){const a=mk("a",{class:"d-btn solid",href:"puzzles.html?wst="+encodeURIComponent("Stop "+s.n+": "+s.title)+"&words="+encodeURIComponent(s.wordSearch.join(","))+"#ws",text:"Play the word search"});a.addEventListener("click",()=>earn("ws:"+s.n,1,"Happy hunting."));
    acts.append(mk("div",{class:"d-act"},[mk("h3",{text:"Word search"}),mk("p",{text:"Find "+s.wordSearch.length+" words from this stop. Play on screen or print it."}),a]))}
  if(s.math)acts.append(mk("div",{class:"d-act"},[mk("h3",{text:"Train math"}),mk("p",{text:s.math})]));
  if(s.learn&&s.learn.length)acts.append(mk("div",{class:"d-act"},[mk("h3",{text:"Learn more"}),mk("p",{class:"d-note",text:"Safe, official sites we checked. They open in a new tab."}),
    mk("ul",{class:"d-learn"},s.learn.map(l=>mk("li",{},[(()=>{const a=mk("a",{href:l.url,target:"_blank",rel:"noopener","data-track":"depot learn: "+l.title,text:l.title});a.addEventListener("click",()=>earn("learn:"+s.n+":"+l.url,1,"Great explorer!"));return a})(),mk("span",{text:l.by})])))]));
  /* reading the story to the end earns a punch */
  const div=document.querySelector(".d-divider");if(div&&"IntersectionObserver" in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){earn("read:"+s.n,1,"You read Stop "+s.n+".");io.disconnect()}});io.observe(div)}
  $("d-sources").replaceChildren(...(s.sources||[]).map(x=>mk("li",{},[mk("a",{href:x.url,target:"_blank",rel:"noopener",text:x.title}),": "+x.used])));
  /* next step */
  const latest=s===here&&opts.length;
  $("d-next").replaceChildren(latest?mk("a",{class:"d-btn solid",href:"kids.html#d-vote",text:"Vote on where the train goes next →"}):mk("a",{class:"d-btn solid",href:"kids.html",text:"Back to the map →"}));
  const i=stops.indexOf(s),prev=stops[i-1],nxt=stops[i+1];
  const pn=$("d-prevnext");pn.replaceChildren();
  if(prev)pn.append(mk("a",{class:"d-btn",href:"depot-story.html?stop="+prev.n,text:"← Stop "+prev.n+": "+prev.place}));
  if(nxt)pn.append(mk("a",{class:"d-btn",href:"depot-story.html?stop="+nxt.n,text:"Stop "+nxt.n+": "+nxt.place+" →"}));
}
drawTB();
})();
