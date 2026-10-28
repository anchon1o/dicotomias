/* Dicotomías · motor da loita, escena e render */
/* ===== motor da loita: segue a evolución dos votos ao longo do día ===== */
let F={},fight=null,pops=[],parts=[],clock=0,hitStop=0,cam=0,speed=1,last=performance.now();
const WORDS=["PAF!","ZAS!","POW!","PUM!","CROC!","PLOF!"];
function mkF(side,obj){const x=side==="a"?POS[2]:POS[3];return{side,obj,d:side==="a"?1:-1,x,tx:x,hp:100,dhp:100,pose:"idle",shake:0,flash:0,sq:0,koT:0,marks:[],jump:0,crown:false,hidden:false};}
function resetFighters(d){F={a:mkF("a",d.a),b:mkF("b",d.b)};fight=null;pops=[];parts=[];hitStop=0;cam=0;speed=1;}
function buildFight(d){
  const{vA,vB}=series(d,null),tA=sum(vA),tB=sum(vB),tie=tA===tB,win=tie?null:(tA>tB?"a":"b");
  const totW=tie?tA:(win==="a"?tA:tB),fac={a:1,b:1};if(!tie)fac[other(win)]=.88;
  const actions=[];let acc={a:0,b:0},cA=0,cB=0;
  for(let i=0;i<12;i++){
    acc.a+=100*vA[i]/totW*fac.a;acc.b+=100*vB[i]/totW*fac.b;cA+=vA[i];cB+=vB[i];
    if(acc.a+acc.b<5&&i<11)continue;
    const share=cA/Math.max(1,cA+cB),big=acc.a>=acc.b?"a":"b",small=other(big);
    if(acc[small]>.6*acc[big]&&acc[big]>6)actions.push({type:"cloud",t:i,share,dmg:{a:acc.a,b:acc.b}});
    else{if(acc[small]>.4)actions.push({type:"hit",who:small,dmg:acc[small],t:i,share});actions.push({type:"hit",who:big,dmg:acc[big],t:i,share});}
    acc={a:0,b:0};
  }
  const la=actions[actions.length-1];
  if(!tie&&!(la.type==="hit"&&la.who===win))actions.push({type:"hit",who:win,dmg:0,t:11,share:cA/Math.max(1,cA+cB)});
  return{actions,win,tie};
}
function startFight(d,onEnd){
  const b=buildFight(d);
  fight={...b,i:-1,phase:"intro",t:0,onEnd,impacted:false,cloudPop:0,called:false,hour:null,share:null};
  F.a.tx=POS[0];F.b.tx=POS[1];
  pops.push({txt:T("fight"),x:160,y:82,age:0,big:true,c:"#ffd23f",life:1.3,rot:-.05});
}
function nextAction(){
  fight.i++;fight.t=0;fight.impacted=false;fight.cloudPop=0;
  if(fight.i>=fight.actions.length){finish();return;}
  const a=fight.actions[fight.i];fight.phase=a.type;fight.hour=(a.t+1)*2;fight.share=a.share;
  if(a.type==="cloud")F.a.hidden=F.b.hidden=true;
}
function addMark(f){
  let k=pick(["tirita","morado","grieta","tirita","chichon"]);
  if(k==="chichon"&&f.marks.some(m=>m.k==="chichon"))k="tirita";
  f.marks.push({k,u:Math.random()*2-1,v:Math.random(),r:(Math.random()-.5)*1.2});
}
function hitFx(x,y,str){
  pops.push({txt:pick(WORDS),x,y,age:0,c:pick(["#fff","#ffd23f","#ff9a3c"]),life:.75,rot:(Math.random()-.5)*.4,size:12+10*str});
  for(let i=0;i<6+Math.round(10*str);i++)parts.push({x,y,vx:(Math.random()-.5)*(140+200*str),vy:-Math.random()*(100+120*str)-30,age:0,r:1.5+Math.random()*2,c:pick(["#fff","#ffd23f","#ff7a59"])});
}
function impact(dmg,Tg,inCloud){
  const str=Math.min(1,dmg/18);
  Tg.hp=Math.max(0,Tg.hp-dmg);
  if(!inCloud){Tg.pose="hurt";Tg.shake=2+3*str;Tg.flash=.1;Tg.sq=.6+.4*str;Tg.x-=Tg.d*(5+12*str);hitStop=.04+.09*str;cam=2+6*str;hitFx(Tg.x+Tg.d*22,G-52,str);}
  if(dmg>1&&Math.random()<.3+.5*str&&Tg.marks.length<5)addMark(Tg);
}
function hitStep(){
  const a=fight.actions[fight.i],A=F[a.who],Tg=F[other(a.who)],t=fight.t,base={a:POS[0],b:POS[1]};
  if(t<.16){A.tx=base[A.side]-A.d*4;A.pose="wind";}
  else if(t<.42){A.tx=base[A.side]+A.d*8;A.pose="punch";}
  else{A.tx=base[A.side];A.pose="idle";}
  if(!fight.impacted&&t>=.24){fight.impacted=true;impact(a.dmg,Tg,false);}
  if(t>.62&&Tg.pose==="hurt"){Tg.pose="idle";Tg.tx=base[Tg.side];}
  if(t>=.8)nextAction();
}
function cloudStep(dt){
  const a=fight.actions[fight.i],t=fight.t;
  F.a.tx=150;F.b.tx=170;
  fight.cloudPop+=dt;
  if(fight.cloudPop>.2){fight.cloudPop=0;pops.push({txt:pick(WORDS),x:160+(Math.random()-.5)*110,y:G-50+(Math.random()-.5)*56,age:0,c:pick(["#fff","#ffd23f","#ff9a3c"]),life:.6,rot:(Math.random()-.5)*.5,size:13});cam=2;}
  if(!fight.impacted&&t>=.8){fight.impacted=true;impact(a.dmg.a,F.b,true);impact(a.dmg.b,F.a,true);cam=4;}
  if(t>=1.7){
    F.a.hidden=F.b.hidden=false;F.a.x=POS[0]-10;F.b.x=POS[1]+10;F.a.tx=POS[0];F.b.tx=POS[1];
    for(const f of[F.a,F.b]){f.pose="hurt";f.flash=.1;f.shake=3;f.sq=1;}
    nextAction();
  }
}
function finish(){
  fight.phase="end";fight.t=0;fight.hour=24;
  if(fight.tie){for(const f of[F.a,F.b]){f.hp=0;f.pose="ko";}}
  else{const w=F[fight.win],l=F[other(fight.win)];l.hp=0;l.pose="ko";w.pose="win";w.crown=true;w.tx=POS[w.side==="a"?0:1];l.tx=POS[l.side==="a"?0:1]-l.d*6;}
  pops.push({txt:"K.O.!",x:160,y:80,age:0,big:true,c:"#ff3b4e",life:1.1,rot:-.08});
  hitStop=.12;cam=7;speed=1;
  for(let i=0;i<26;i++)parts.push({x:160,y:90,vx:(Math.random()-.5)*320,vy:-Math.random()*200,age:0,r:2+Math.random()*2.5,c:pick(["#ffd23f","#ff4f5e","#fff","#3d7bff"])});
}
function update(dt){
  dt*=speed;
  let sdt=dt;if(hitStop>0){hitStop-=dt;sdt=dt*.06;}
  clock+=sdt;cam=Math.max(0,cam-dt*28);
  for(const f of[F.a,F.b]){
    f.x+=(f.tx-f.x)*Math.min(1,sdt*9);
    f.dhp+=(f.hp-f.dhp)*Math.min(1,dt*5);
    f.shake=Math.max(0,f.shake-sdt*12);f.flash=Math.max(0,f.flash-sdt);f.sq=Math.max(0,f.sq-sdt*4);
    if(f.pose==="ko")f.koT=Math.min(1,f.koT+sdt*4);
    f.jump=f.pose==="win"?-Math.abs(Math.sin(clock*7))*10:f.jump*.8;
  }
  pops.forEach(p=>p.age+=sdt);pops=pops.filter(p=>p.age<p.life);
  parts.forEach(p=>{p.x+=p.vx*sdt;p.y+=p.vy*sdt;p.vy+=380*sdt;p.age+=sdt;});parts=parts.filter(p=>p.age<.9);
  if(!fight)return;
  fight.t+=sdt;
  if(fight.phase==="intro"){if(fight.t>1.3)nextAction();}
  else if(fight.phase==="hit")hitStep();
  else if(fight.phase==="cloud")cloudStep(sdt);
  else if(fight.phase==="end"&&!fight.called&&fight.t>1.6){fight.called=true;fight.onEnd&&fight.onEnd();}
}

/* ===== escena, nube, textos, marcador ===== */
let bolt=0,boltX=0;
const PAL=()=>D[cur].type==="worse"?{bg:"#4a3592",ray:"#3e2c80",dot:"rgba(15,8,35,.35)",st:"#1f1838",st2:"#2f2550",w:1}:{bg:"#ffd447",ray:"#ffc42e",dot:"rgba(230,130,25,.33)",st:"#5b3fa8",st2:"#7457c4",w:0};
function bgScreen(g,cw,ch,s,ox,oy){
  const P=PAL();
  g.fillStyle=P.bg;g.fillRect(0,0,cw,ch);
  const cx=cw/2,cy=oy+115*s,L=Math.hypot(cw,ch)*1.2;
  g.save();g.translate(cx,cy);g.rotate(clock*.12);g.fillStyle=P.ray;
  for(let i=0;i<20;i+=2){const a0=i/20*Math.PI*2,a1=(i+1)/20*Math.PI*2;g.beginPath();g.moveTo(0,0);g.lineTo(Math.cos(a0)*L,Math.sin(a0)*L);g.lineTo(Math.cos(a1)*L,Math.sin(a1)*L);g.fill();}
  g.restore();
  const y0=oy+126*s,sp=7*s;g.fillStyle=P.dot;g.beginPath();
  for(let y=y0,row=0;y<ch;y+=sp,row++)for(let x=(row%2)*sp/2;x<cw;x+=sp){const r=(y-y0)/Math.max(1,ch-y0)*2.8*s;if(r>.3*s)el(g,x,y,r,r);}
  g.fill();
  if(P.w){
    if(bolt<=0&&Math.random()<.004){bolt=.22;boltX=cw*(.15+Math.random()*.7);}
    if(bolt>0){bolt-=1/60;g.fillStyle=`rgba(255,255,255,${Math.min(.3,bolt*1.4)})`;g.fillRect(0,0,cw,ch);
      g.strokeStyle="#ffe86a";g.lineWidth=4*s;g.lineJoin="round";g.lineCap="round";g.beginPath();let x=boltX,y=0;g.moveTo(x,y);for(let i=0;i<6;i++){x+=(i%2?1:-1)*12*s;y+=22*s;g.lineTo(x,y);}g.stroke();}
  }
}
function drawCloud(g){
  const t=fight.t,cx=160,cy=G-46,k=Math.floor(t*7),dl=D[cur];
  if(k%3!==1){const key=k%2?dl.a:dl.b;g.save();g.translate(cx+(k%2?-44:44),cy-30+(k%4)*2);g.rotate((k%2?-1:1)*.3);g.scale(.8,.8);drawBody(g,OBJ[key],"hurt",k%2?1:-1,false,null,0);g.restore();}
  for(let j=0;j<4;j++){
    const a=hash(k*13+j)*Math.PI*2,x1=cx+Math.cos(a)*22,y1=cy+Math.sin(a)*13,x2=cx+Math.cos(a)*58,y2=cy+Math.sin(a)*35;
    hose(g,x1,y1,x2,y2,0);
    if(j===3){g.beginPath();el(g,x2,y2,9,5.5);g.fillStyle=TEAM[k%2?"a":"b"];g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();}
    else glove(g,x2,y2,true);
  }
  const bl=[];
  for(let i=0;i<11;i++){const a=i/11*Math.PI*2+t*1.3,r=20+6*Math.sin(t*9+i);bl.push([cx+Math.cos(a)*r*1.5,cy+Math.sin(a)*r*.75,16+4*Math.sin(t*13+i*1.7)]);}
  bl.push([cx,cy,28]);
  g.beginPath();bl.forEach(b=>el(g,b[0],b[1],b[2],b[2]));g.strokeStyle=INK;g.lineWidth=6;g.lineJoin="round";g.stroke();g.fillStyle="#eadfc6";g.fill();
  g.beginPath();bl.forEach(b=>el(g,b[0]-2,b[1]-3,b[2]-4,b[2]-4));g.fillStyle="#fffaf0";g.fill();
  for(let j=0;j<3;j++){const a=t*5+j*2.1;star(g,cx+Math.cos(a)*34,cy+Math.sin(a)*13,5,"#ffd23f");}
}
function drawPop(g,p){
  const a=p.age/p.life,sc=p.age<.1?.5+p.age/.1*.7:1.2-Math.min(.2,(p.age-.1)*.6);
  g.save();g.globalAlpha=a>.75?Math.max(0,(1-a)/.25):1;
  g.translate(p.x,p.y-(p.big?0:p.age*18));g.rotate(p.rot||0);g.scale(sc,sc);
  const fs=p.big?30:(p.size||13);g.font=fs+"px "+FONT;g.textAlign="center";g.textBaseline="middle";g.lineJoin="round";
  if(!p.big){const w=g.measureText(p.txt).width;burst(g,w*.62+8,(w*.62+8)*.62,"#fff7c2");}
  g.lineWidth=p.big?7:4;g.strokeStyle=INK;g.strokeText(p.txt,0,0);g.fillStyle=p.c;g.fillText(p.txt,0,0);
  g.restore();
}
function hud(g){
  const d=D[cur],n=[X(d).a,X(d).b];
  g.textBaseline="middle";g.lineJoin="round";
  for(const[s,x,fr]of[["a",10,F.a.dhp/100],["b",190,F.b.dhp/100]]){
    g.beginPath();rr(g,x,10,120,14,7);g.fillStyle="#fff";g.fill();
    g.save();g.clip();const w=120*fr;g.fillStyle=TEAM[s];g.fillRect(s==="a"?x:x+120-w,10,w,14);g.fillStyle="rgba(255,255,255,.35)";g.fillRect(x,10,120,4);g.restore();
    g.beginPath();rr(g,x,10,120,14,7);g.strokeStyle=INK;g.lineWidth=3;g.stroke();
  }
  const wN=D[cur].type==="worse";g.font="11px "+FONT;g.lineWidth=3;g.strokeStyle=INK;g.fillStyle=wN?"#fff":INK;
  const nA=fit(g,n[0],125),nB=fit(g,n[1],125);g.textAlign="left";if(wN)g.strokeText(nA,12,35);g.fillText(nA,12,35);g.textAlign="right";if(wN)g.strokeText(nB,308,35);g.fillText(nB,308,35);
  g.beginPath();el(g,160,17,16,16);g.fillStyle=INK;g.fill();g.font="12px "+FONT;g.textAlign="center";g.fillStyle="#fff";g.fillText("VS",160,18);
  if(fight&&fight.hour!=null){
    const hh=String(fight.hour%24===0&&fight.hour?24:fight.hour).padStart(2,"0")+":00";
    g.beginPath();rr(g,136,38,48,16,8);g.fillStyle="#fff";g.fill();g.strokeStyle=INK;g.lineWidth=2.5;g.stroke();
    g.font="10px "+FONT;g.fillStyle=INK;g.fillText(hh,160,46.5);
    if(fight.share!=null){const pa=Math.round(fight.share*100);g.font="9px "+FONT;g.fillStyle=TEAM.a;g.textAlign="right";g.fillText(pa+"%",131,47);g.fillStyle=TEAM.b;g.textAlign="left";g.fillText((100-pa)+"%",189,47);}
  }
}
function banner(g){
  if(!fight||fight.phase!=="end"||fight.t<1)return;
  const a=Math.min(1,(fight.t-1)/.25),d=D[cur],w=fight.win;
  const txt=fight.tie?T("tie"):(d.type==="worse"?T("worstIs"):T("wins"))+": "+X(d)[w].toUpperCase();
  const col=fight.tie?"#8e5bd6":TEAM[w];
  g.save();g.globalAlpha=a;g.translate(160,78);g.scale(.8+.2*a,.8+.2*a);g.rotate(-.04);
  let fs=16;g.font=fs+"px "+FONT;while(g.measureText(txt).width>262&&fs>8){fs--;g.font=fs+"px "+FONT;}
  const tw=g.measureText(txt).width;g.textAlign="center";g.textBaseline="middle";g.lineJoin="round";
  g.beginPath();g.moveTo(-tw/2-22,-15);g.lineTo(tw/2+22,-15);g.lineTo(tw/2+12,0);g.lineTo(tw/2+22,15);g.lineTo(-tw/2-22,15);g.lineTo(-tw/2-12,0);g.closePath();
  g.fillStyle=col;g.fill();g.strokeStyle=INK;g.lineWidth=3;g.stroke();
  g.lineWidth=4;g.strokeText(txt,0,1);g.fillStyle="#fff";g.fillText(txt,0,1);
  g.restore();
}

/* ===== render adaptado ao tamaño da pantalla ===== */
const cv=document.getElementById("cv"),c=cv.getContext("2d"),arena=document.getElementById("arena");
function resize(){const r=arena.getBoundingClientRect(),dpr=Math.min(2,window.devicePixelRatio||1);cv.width=Math.max(1,Math.round(r.width*dpr));cv.height=Math.max(1,Math.round(r.height*dpr));}
new ResizeObserver(resize).observe(arena);
function frame(now){
  const dt=Math.min(.05,(now-last)/1000);last=now;
  update(dt);
  /* marcador sempre arriba; a escena escala para encher o espazo que queda e céntrase nel */
  const cw=cv.width,ch=cv.height,hs=Math.min(cw/320,ch/260),hudH=58*hs;
  const s=Math.min(cw/300,(ch-hudH)/158),ox=(cw-320*s)/2,oy=hudH+(ch-hudH-158*s)/2-42*s;
  c.setTransform(1,0,0,1,0,0);bgScreen(c,cw,ch,s,ox,oy);
  const jx=(Math.random()-.5)*cam*s,jy=(Math.random()-.5)*cam*s;
  c.setTransform(s,0,0,s,ox+jx,oy+jy);
  const P2=PAL();c.beginPath();el(c,160,G+6,150,18);c.fillStyle=P2.st;c.fill();c.strokeStyle=INK;c.lineWidth=3;c.stroke();
  c.beginPath();el(c,160,G+3,136,12);c.fillStyle=P2.st2;c.fill();
  for(const f of[F.a,F.b])if(!f.hidden){c.beginPath();el(c,f.x-(f.koT>.5?f.d*30*f.koT:0),G+2,26+f.koT*20,5);c.fillStyle="rgba(27,23,48,.3)";c.fill();}
  const order=[F.a,F.b].sort((p,q)=>(q.pose==="ko")-(p.pose==="ko"));
  for(const f of order)if(!f.hidden)drawToon(c,f);
  if(fight&&fight.phase==="cloud")drawCloud(c);
  for(const p of parts){c.beginPath();el(c,p.x,p.y,p.r,p.r);c.fillStyle=p.c;c.fill();}
  c.setTransform(s,0,0,s,ox,oy);
  for(const p of pops)drawPop(c,p);
  banner(c);
  c.setTransform(hs,0,0,hs,(cw-320*hs)/2,0);
  hud(c);
  requestAnimationFrame(frame);
}
const ICONS={};
function iconURL(key){
  if(ICONS[key])return ICONS[key];
  const cc=document.createElement("canvas");cc.width=cc.height=152;const g=cc.getContext("2d");
  g.translate(76,82);g.scale(1.9,1.9);drawBody(g,OBJ[key],"normal",0,false,null,0);
  return ICONS[key]=cc.toDataURL();
}

