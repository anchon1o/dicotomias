/* Dicotomías · interface, calendario, galería e arranque */
/* ===== interface ===== */
const $=id=>document.getElementById(id);
const fmt=(n,dec)=>n.toLocaleString(LOCALE[st.lang],dec?{minimumFractionDigits:1,maximumFractionDigits:1}:undefined);
function dayLabel(d){
  if(d.ago===0)return T("today");if(d.ago===1)return T("yesterday");
  const dt=new Date();dt.setDate(dt.getDate()-d.ago);
  try{return dt.toLocaleDateString(LOCALE[st.lang],{weekday:"long",day:"numeric",month:"long"});}catch(e){return dt.toDateString();}
}
const pickHTML=(d,s,act)=>`<button class="pick ${s}" data-act="${act}" data-s="${s}">${d.type==="worse"&&act==="vote"?`<span class="tw">👎 ${T("worseTag")}</span>`:""}<img src="${iconURL(d[s])}" alt=""><span>${X(d)[s]}</span></button>`;
function liveCount(d){if(ONLINE)return LIVE;const s=series(d,nowBuckets());return sum(s.vA)+sum(s.vB);}
function countdown(){const n=new Date(),m=new Date(n);m.setHours(24,0,0,0);let s=Math.max(0,Math.floor((m-n)/1000));const h=Math.floor(s/3600);s%=3600;const mi=Math.floor(s/60);s%=60;return[h,mi,s].map(v=>String(v).padStart(2,"0")).join(":");}
function chartSVG(d){
  const{vA,vB}=series(d,null);let cA=0,cB=0;const pts=[[0,50]];
  for(let i=0;i<12;i++){cA+=vA[i];cB+=vB[i];pts.push([(i+1)/12*300,100-cA/Math.max(1,cA+cB)*100]);}
  pts[0][1]=pts[1][1];
  const line=pts.map(p=>p.map(v=>v.toFixed(1)).join(",")).join(" ");
  const lab=["00:00","12:00","24:00"].map((t,i)=>`<text x="${[4,150,296][i]}" y="96" font-size="9" font-family="Rubik,sans-serif" font-weight="600" fill="#1b1730" text-anchor="${["start","middle","end"][i]}">${t}</text>`).join("");
  return`<svg class="chart" viewBox="0 0 300 100" preserveAspectRatio="none" role="img" aria-label="${T("dayChart")}"><rect width="300" height="100" fill="${TEAM.b}"/><polygon points="0,100 ${line} 300,100" fill="${TEAM.a}"/><line x1="0" y1="50" x2="300" y2="50" stroke="#fff" stroke-width="1.5" stroke-dasharray="5 4"/><polyline points="${line}" fill="none" stroke="#1b1730" stroke-width="2.5" stroke-linejoin="round"/>${lab.replace(/#1b1730/g,"#fff")}</svg>`;
}
function renderHead(){
  const d=D[cur];
  document.documentElement.lang=st.lang;
  $("flagbtn").innerHTML=FLAGS[st.lang];
  $("flagmenu").innerHTML=LANGS.filter(l=>l!==st.lang).map(l=>`<button class="flagopt" data-l="${l}" aria-label="${l}">${FLAGS[l]}</button>`).join("");
  $("pts").textContent="★ "+points();$("pts").title=T("pts");
  $("archBtn").setAttribute("aria-label",T("archive"));
  $("kind").textContent=d.type==="worse"?"👎 "+T("worse"):T("prefer");
  document.body.classList.toggle("worse",d.type==="worse");
  $("kind").className="kind"+(d.type==="worse"?" worse":"");
  $("date").textContent=dayLabel(d);
  $("topic").textContent=X(d).t;
}
function renderPanel(){
  const d=D[cur],v=st.votes[d.id],p=$("panel");
  if(stage==="vote")p.innerHTML=`<p class="ask">${T(d.type==="worse"?"askVoteW":"askVote")}</p><div class="pair">${pickHTML(d,"a","vote")}${pickHTML(d,"b","vote")}</div>`;
  else if(stage==="predict")p.innerHTML=`<p class="ask">${T(d.type==="worse"?"askPredictW":"askPredict")}</p><p class="hint">${T("hintPredict")}</p><div class="pair">${pickHTML(d,"a","predict")}${pickHTML(d,"b","predict")}</div>`;
  else if(stage==="wait")p.innerHTML=`<p class="ask">${T("waitTitle")}</p><div class="tags"><span class="tag ${v.v}">${T("yourVote")}: ${X(d)[v.v]}</span><span class="tag ${v.p}">${T("bet")}: ${X(d)[v.p]}</span></div><p class="count" id="liveN">${T("already").replace("{n}",fmt(liveCount(d)))}</p><p class="cd">${T("revealIn")} <b id="cd">${countdown()}</b></p>${ONLINE?"":`<button class="btn ghost" data-act="simulate">${T("simulate")}</button>`}`;
  else if(stage==="fight")p.innerHTML=`<p class="fighting">${T("fighting")}</p><button class="btn ghost" data-act="skip">${T("skip")}</button>`;
  else{
    const[a,b]=totals(d),tot=a+b,pa=Math.round(a/tot*1000)/10,pb=Math.round((100-pa)*10)/10,w=winnerOf(d);
    let mine=`<p class="mine">${T("noPart")}</p>`;
    if(v){const ok=v.p===w;mine=`<p class="mine">${T("yourVote")}: <b>${X(d)[v.v]}</b><br>${T("bet")}: <b>${X(d)[v.p]}</b> · <span class="${ok?"ok":"bad"}">${ok?T("right"):T("wrong")}</span></p>`;}
    p.innerHTML=`<p class="winner">${w?`${d.type==="worse"?T("worstIs"):T("wins")}: ${X(d)[w]}`:T("tie")}</p>
      <div class="vbar"><div class="va" style="width:${pa}%">${pa>=14?fmt(pa,1)+" %":""}</div><div class="vb" style="width:${pb}%">${pb>=14?fmt(pb,1)+" %":""}</div></div>
      <div class="legend"><span>${X(d).a}: ${fmt(a)} ${T("votes")}</span><span>${X(d).b}: ${fmt(b)} ${T("votes")}</span></div>
      <p class="chartT">${T("dayChart")}</p>${chartSVG(d)}${mine}
      <button class="btn" data-act="replay">${T("replay")}</button>`;
  }
}
function renderAll(){renderHead();renderPanel();}
function runFight(){
  const d=D[cur];resetFighters(d);stage="fight";renderAll();
  startFight(d,()=>{stage="result";renderAll();});
}
function openDay(i){
  cur=i;pending=null;resetFighters(D[i]);
  const d=D[i];
  if(isClosed(d))runFight();
  else{stage=st.votes[d.id]?"wait":"vote";renderAll();}
}
$("panel").addEventListener("click",e=>{
  const b=e.target.closest("[data-act]");if(!b)return;const act=b.dataset.act,d=D[cur];
  if(act==="vote"){pending=b.dataset.s;stage="predict";renderPanel();}
  else if(act==="predict"){
    const vote={v:pending,p:b.dataset.s,h:new Date().getHours()};
    if(ONLINE){
      p0Disable(true);
      sb.rpc("dil_votar",{p_dilema:d.id,p_device:DEV,p_lado:vote.v,p_aposta:vote.p}).then(r=>{
        if(r.error){alert(T("err"));p0Disable(false);return;}
        if(r.data&&r.data.total!=null)LIVE=r.data.total;
        st.votes[d.id]=vote;save();stage="wait";renderAll();
      },()=>{alert(T("err"));p0Disable(false);});
    }else{st.votes[d.id]=vote;save();stage="wait";renderAll();}
  }
  else if(act==="simulate"){st.closed[d.id]=true;save();runFight();}
  else if(act==="skip"){speed=5;}
  else if(act==="replay")runFight();
});
function renderArchive(){
  $("archT").textContent=T("archive");$("sheetClose").textContent=T("close");
  $("proto").textContent=ONLINE?T("protoOn"):T("proto");$("reset").textContent=T("reset");$("galBtn").textContent=GAL[st.lang];
  /* calendario mensual con miniaturas dos dous loitadores; o perdedor sae apagado */
  const ymd=dt=>dt.getFullYear()+"-"+dt.getMonth()+"-"+dt.getDate();
  const byDay={};D.forEach((d,i)=>{const dt=new Date();dt.setDate(dt.getDate()-d.ago);byDay[ymd(dt)]=i;});
  if(!calM){const c0=new Date();c0.setDate(c0.getDate()-D[cur].ago);calM=new Date(c0.getFullYear(),c0.getMonth(),1);}
  const y=calM.getFullYear(),m=calM.getMonth(),first=new Date(y,m,1),lead=(first.getDay()+6)%7,days=new Date(y,m+1,0).getDate(),today=new Date(),loc=LOCALE[st.lang];
  let mName;try{mName=first.toLocaleDateString(loc,{month:"long",year:"numeric"});}catch(e){mName=(m+1)+"/"+y;}
  let wd="";for(let k=0;k<7;k++){let n;try{n=new Date(2024,0,1+k).toLocaleDateString(loc,{weekday:"narrow"});}catch(e){n="LMXJVSD"[k];}wd+=`<span class="wd">${n}</span>`;}
  let cells="";for(let k=0;k<lead;k++)cells+="<span></span>";
  for(let dd=1;dd<=days;dd++){
    const i=byDay[ymd(new Date(y,m,dd))],isT=y===today.getFullYear()&&m===today.getMonth()&&dd===today.getDate();
    if(i==null){cells+=`<span class="cd-day empty${isT?" today":""}"><span class="num">${dd}</span></span>`;continue;}
    const d=D[i],w=isClosed(d)?winnerOf(d):null,v=st.votes[d.id];
    const im=s=>`<img class="${w&&w!==s?"l":""}" src="${iconURL(d[s])}" alt="">`;
    cells+=`<button class="cd-day${i===cur?" on":""}${isT?" today":""}${d.type==="worse"?" w":""}" data-i="${i}" aria-label="${dayLabel(d)}: ${X(d).t}"><span class="num">${dd}${v?" ✓":""}</span><span class="th">${im("a")}${im("b")}</span></button>`;
  }
  $("archList").innerHTML=`<div class="cal-h"><button class="btn ghost" data-nav="-1" aria-label="‹">‹</button><strong>${mName}</strong><button class="btn ghost" data-nav="1" aria-label="›">›</button></div><div class="cal">${wd}${cells}</div><p class="cal-leg"><span class="sw"></span>${T("worse")}</p>`;
}
let calM=null;
$("archBtn").onclick=()=>{calM=null;renderArchive();$("sheet").hidden=false;};
$("sheetClose").onclick=()=>{$("sheet").hidden=true;};
$("sheet").addEventListener("click",e=>{if(e.target.id==="sheet")$("sheet").hidden=true;});
$("archList").addEventListener("click",e=>{const nv=e.target.closest("[data-nav]");if(nv){calM=new Date(calM.getFullYear(),calM.getMonth()+(+nv.dataset.nav),1);renderArchive();return;}const b=e.target.closest(".cd-day[data-i]");if(!b)return;$("sheet").hidden=true;openDay(+b.dataset.i);});
$("reset").onclick=()=>{st.votes={};st.closed={};save();$("sheet").hidden=true;openDay(D.findIndex(d=>d.ago===0));};
$("flagbtn").onclick=e=>{e.stopPropagation();const m=$("flagmenu");m.hidden=!m.hidden;$("flagbtn").setAttribute("aria-expanded",String(!m.hidden));};
$("flagmenu").addEventListener("click",e=>{const b=e.target.closest(".flagopt");if(!b)return;st.lang=b.dataset.l;save();$("flagmenu").hidden=true;renderAll();if(!$("sheet").hidden)renderArchive();});
document.addEventListener("click",e=>{if(!e.target.closest(".lang"))$("flagmenu").hidden=true;});
setInterval(()=>{if(stage==="wait"){const cd=$("cd");if(cd)cd.textContent=countdown();const ln=$("liveN");if(ln)ln.textContent=T("already").replace("{n}",fmt(liveCount(D[cur])));}},1000);

/* galería de personaxes: cada un coas súas catro caras */
const GAL={gl:"Galería de personaxes",es:"Galería de personajes",ca:"Galeria de personatges",eu:"Pertsonaien galeria",en:"Character gallery"};
const GURL={};
function galURL(key,expr){const k=key+"|"+expr;if(GURL[k])return GURL[k];const cc=document.createElement("canvas");cc.width=cc.height=120;const g=cc.getContext("2d");g.translate(60,66);g.scale(1.45,1.45);drawBody(g,OBJ[key],expr,0,false,null,0);return GURL[k]=cc.toDataURL();}
function renderGallery(){
  $("galT").textContent=GAL[st.lang];$("galClose").textContent=T("close");
  const ex=["normal","hurt","ko","win"];
  $("galList").innerHTML=D.slice().sort((x,y)=>y.ago-x.ago).map(d=>`<h3>${X(d).t}</h3>`+["a","b"].map(s=>`<p class="galname">${X(d)[s]}</p><div class="galrow">${ex.map(e=>`<img src="${galURL(d[s],e)}" alt="">`).join("")}</div>`).join("")).join("");
}
$("galBtn").onclick=()=>{$("sheet").hidden=true;renderGallery();$("gal").hidden=false;};
$("galClose").onclick=()=>{$("gal").hidden=true;};
$("gal").addEventListener("click",e=>{if(e.target.id==="gal")$("gal").hidden=true;});

try{document.fonts.load('16px "Bowlby One"');}catch(e){}
resize();boot();
function p0Disable(on){document.querySelectorAll("#panel .pick").forEach(x=>x.disabled=on);}
async function boot(){
  try{
    if(!window.supabase)throw"sen libraria";
    sb=window.supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:false}});
    const r=await Promise.race([sb.rpc("dil_cargar"),new Promise((_,j)=>setTimeout(()=>j("tempo"),6000))]);
    if(r.error||!r.data)throw r.error||"sen datos";
    const data=r.data,hoxe=new Date(data.hoxe+"T12:00:00"),byId=Object.fromEntries(D.map(d=>[d.id,d])),list=[];
    for(const row of data.dias){const d=byId[row.dilema];if(!d)continue;d.ago=Math.round((hoxe-new Date(row.dia+"T12:00:00"))/864e5);if(row.a)SV[d.id]={a:row.a,b:row.b};list.push(d);}
    if(!list.length)throw"calendario baleiro";
    D.length=0;D.push(...list);LIVE=data.total||0;ONLINE=true;
  }catch(e){console.info("Modo demo:",e);}
  cur=D.findIndex(d=>d.ago===0);if(cur<0)cur=D.reduce((bi,d,i)=>d.ago<D[bi].ago?i:bi,0);
  openDay(cur);requestAnimationFrame(frame);
  const bootDay=new Date().getDate();
  if(ONLINE)setInterval(()=>{
    if(new Date().getDate()!==bootDay){location.reload();return;}
    if(stage==="wait")sb.rpc("dil_total").then(r=>{if(!r.error&&r.data!=null){LIVE=r.data;const ln=$("liveN");if(ln)ln.textContent=T("already").replace("{n}",fmt(LIVE));}});
  },30000);
}
