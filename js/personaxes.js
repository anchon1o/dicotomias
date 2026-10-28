/* Dicotomías · debuxo dos personaxes en vectorial */
/* ===== debuxo base ===== */
const INK="#1b1730",R0=26,G=166,POS=[128,192,62,258];
const TEAM={a:"#ff4f5e",b:"#3d7bff"};
const FONT='"Bowlby One", Impact, sans-serif';
function el(g,cx,cy,rx,ry,rot=0){g.moveTo(cx+rx*Math.cos(rot),cy+rx*Math.sin(rot));g.ellipse(cx,cy,rx,ry,rot,0,Math.PI*2);}
function rr(g,x,y,w,h,r){g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath();}
const hash=n=>{const s=Math.sin(n*127.1+311.7)*43758.5453;return s-Math.floor(s);};
const pick=a=>a[Math.floor(Math.random()*a.length)];
function star(g,x,y,r,col){g.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?r*.45:r;const px=x+Math.cos(a)*q,py=y+Math.sin(a)*q;i?g.lineTo(px,py):g.moveTo(px,py);}g.closePath();g.fillStyle=col;g.fill();g.strokeStyle=INK;g.lineWidth=1.3;g.lineJoin="round";g.stroke();}
function burst(g,rx,ry,col){g.beginPath();const n=14;for(let i=0;i<n*2;i++){const a=i/(n*2)*Math.PI*2,k=i%2?.7:1;const px=Math.cos(a)*rx*k,py=Math.sin(a)*ry*k;i?g.lineTo(px,py):g.moveTo(px,py);}g.closePath();g.fillStyle=col;g.fill();g.strokeStyle=INK;g.lineWidth=2.5;g.lineJoin="round";g.stroke();}
function fit(g,t,max){if(g.measureText(t).width<=max)return t;while(t.length>1&&g.measureText(t+"…").width>max)t=t.slice(0,-1);return t+"…";}

/* ===== obxectos ===== */
const OBJ={
 onion:{eyes:[[-9,-1],[9,-1]],kind:"cartoon",es:6.5,mouth:[0,12,9],top:-32,
  sil(g){const R=R0;g.moveTo(0,-R*1.12);g.bezierCurveTo(R*.35,-R*.8,R*1.05,-R*.55,R,R*.1);g.bezierCurveTo(R*.95,R*.75,R*.45,R*.98,0,R*.98);g.bezierCurveTo(-R*.45,R*.98,-R*.95,R*.75,-R,R*.1);g.bezierCurveTo(-R*1.05,-R*.55,-R*.35,-R*.8,0,-R*1.12);g.closePath();},
  detail(g){const R=R0;
   g.beginPath();this.sil(g);g.fillStyle="#e9a64c";g.fill();
   g.save();g.beginPath();this.sil(g);g.clip();
   g.beginPath();el(g,-9,-6,9,17,-.25);g.fillStyle="#f6c779";g.fill();
   g.strokeStyle="#b8722c";g.lineWidth=1.6;g.lineCap="round";
   for(const k of[-.8,-.42,.42,.8]){g.beginPath();g.moveTo(0,-R*1.08);g.quadraticCurveTo(R*k*1.25,-R*.1,R*k*.55,R*.98);g.stroke();}
   g.restore();
   g.strokeStyle="#5f8f34";g.lineWidth=3.2;g.lineCap="round";g.beginPath();g.moveTo(0,-R*1.08);g.quadraticCurveTo(5,-R*1.32,-1,-R*1.55);g.stroke();
   g.strokeStyle="#cdb47e";g.lineWidth=1.6;g.beginPath();for(const x of[-4,0,4]){g.moveTo(x*.6,R*.96);g.lineTo(x,R*1.12);}g.stroke();}},
 potato:{eyes:[[-9,-4],[9,-4]],kind:"cartoon",es:6.5,mouth:[0,9,9],top:-26,
  sil(g){const R=R0;for(let i=0;i<=48;i++){const a=i/48*Math.PI*2,r=R*(1+.07*Math.sin(3*a+1)+.05*Math.cos(5*a));const x=Math.cos(a)*r*1.12,y=Math.sin(a)*r*.92;i?g.lineTo(x,y):g.moveTo(x,y);}g.closePath();},
  detail(g){g.beginPath();this.sil(g);g.fillStyle="#c8955a";g.fill();
   g.save();g.beginPath();this.sil(g);g.clip();
   g.beginPath();el(g,8,17,24,9);g.fillStyle="#ad7c46";g.fill();
   g.beginPath();el(g,-7,-10,15,8,-.2);g.fillStyle="#dcb07a";g.fill();g.restore();
   g.fillStyle="#87592d";for(const[x,y]of[[-18,7],[15,-13],[20,7],[-4,17],[-20,-9]]){g.beginPath();el(g,x,y,2.4,1.6,.4);g.fill();}}},
 dog:{eyes:[[-10,-6],[10,-6]],kind:"dot",es:6,mouth:[0,15,8],top:-28,
  sil(g){const R=R0;el(g,0,0,R,R*.95);el(g,-R*.88,-R*.05,8.5,17,.38);el(g,R*.88,-R*.05,8.5,17,-.38);},
  detail(g){const R=R0;
   g.beginPath();el(g,-R*.88,-R*.05,8.5,17,.38);el(g,R*.88,-R*.05,8.5,17,-.38);g.fillStyle="#7a4a2a";g.fill();
   g.beginPath();el(g,0,0,R,R*.95);g.fillStyle="#dca46a";g.fill();
   g.beginPath();el(g,10,-9,8.5,7.5);g.fillStyle="#b9814a";g.fill();
   g.beginPath();el(g,0,9,14,10.5);g.fillStyle="#f6e6cc";g.fill();
   g.beginPath();el(g,0,3.5,6,4.5);g.fillStyle="#2a1a12";g.fill();
   g.beginPath();el(g,-1.8,2.3,1.8,1.1);g.fillStyle="#fff";g.fill();}},
 cat:{eyes:[[-10,-3],[10,-3]],kind:"cat",es:6.5,mouth:[0,12,7],top:-34,
  sil(g){const R=R0;el(g,0,0,R*1.04,R*.9);g.moveTo(-R*.9,-R*.3);g.lineTo(-R*.62,-R*1.2);g.lineTo(-R*.12,-R*.78);g.closePath();g.moveTo(R*.9,-R*.3);g.lineTo(R*.62,-R*1.2);g.lineTo(R*.12,-R*.78);g.closePath();},
  detail(g){const R=R0;
   g.beginPath();this.sil(g);g.fillStyle="#f0a04b";g.fill();
   g.fillStyle="#ff9fb3";g.beginPath();g.moveTo(-R*.78,-R*.42);g.lineTo(-R*.62,-R*1.0);g.lineTo(-R*.3,-R*.72);g.closePath();g.moveTo(R*.78,-R*.42);g.lineTo(R*.62,-R*1.0);g.lineTo(R*.3,-R*.72);g.closePath();g.fill();
   g.strokeStyle="#c46f22";g.lineWidth=2.4;g.lineCap="round";g.beginPath();for(const x of[-6,0,6]){g.moveTo(x,-R*.82);g.lineTo(x*.8,-R*.55);}g.stroke();
   g.beginPath();el(g,0,9,12,7.5);g.fillStyle="#ffe2c0";g.fill();
   g.beginPath();g.moveTo(-3,4);g.lineTo(3,4);g.lineTo(0,7.5);g.closePath();g.fillStyle="#ff7f9a";g.fill();
   g.strokeStyle=INK;g.lineWidth=1;g.beginPath();for(const s of[-1,1]){g.moveTo(s*9,8);g.lineTo(s*27,4);g.moveTo(s*9,10.5);g.lineTo(s*27,11);}g.stroke();}},
 ball:{eyes:[[-9,-2],[9,-2]],kind:"cartoon",es:6.5,mouth:[0,11,9],top:-28,
  sil(g){el(g,0,0,R0,R0);},
  detail(g){const R=R0;
   g.save();g.beginPath();el(g,0,0,R,R);g.clip();
   g.fillStyle="#fff";g.fillRect(-R,-R,2*R,2*R);
   const lens=(c0,c1,col)=>{g.beginPath();g.moveTo(0,-R);g.quadraticCurveTo(c0,0,0,R);g.quadraticCurveTo(c1,0,0,-R);g.fillStyle=col;g.fill();};
   lens(-R*2.4,-R*.8,"#ff4f5e");lens(-R*.28,R*.28,"#3d7bff");lens(R*.8,R*2.4,"#ffcf33");
   g.beginPath();el(g,0,-R*.98,5,3);g.fillStyle="#fff";g.fill();
   g.beginPath();el(g,-11,-13,9,5,-.6);g.fillStyle="rgba(255,255,255,.55)";g.fill();
   g.beginPath();el(g,6,14,24,10);g.fillStyle="rgba(27,23,48,.12)";g.fill();
   g.restore();}},
 mount:{eyes:[[-8,4],[8,4]],kind:"cartoon",es:6,mouth:[0,15,8],top:-34,
  sil(g){const R=R0;g.moveTo(-R*1.15,R*.95);g.quadraticCurveTo(-R*.6,-R*.2,-R*.12,-R*1.15);g.quadraticCurveTo(0,-R*1.3,R*.12,-R*1.15);g.quadraticCurveTo(R*.6,-R*.2,R*1.15,R*.95);g.quadraticCurveTo(0,R*1.05,-R*1.15,R*.95);g.closePath();},
  detail(g){const R=R0;
   g.save();g.beginPath();this.sil(g);g.clip();
   g.fillStyle="#8394bd";g.fillRect(-R*1.3,-R*1.4,R*2.6,R*2.6);
   g.beginPath();g.moveTo(R*.05,-R*1.3);g.lineTo(R*1.3,R*1.1);g.lineTo(R*.2,R*1.1);g.closePath();g.fillStyle="#6c7ba6";g.fill();
   g.beginPath();g.moveTo(-R*.5,-R*.4);g.lineTo(-R*.28,-R*.24);g.lineTo(-R*.08,-R*.46);g.lineTo(R*.14,-R*.26);g.lineTo(R*.48,-R*.42);g.lineTo(0,-R*1.4);g.closePath();g.fillStyle="#fff";g.fill();
   g.fillStyle="#5fae5a";g.beginPath();g.moveTo(-R*1.3,R*.55);g.quadraticCurveTo(-R*.4,R*.38,0,R*.6);g.quadraticCurveTo(R*.5,R*.4,R*1.3,R*.58);g.lineTo(R*1.3,R*1.2);g.lineTo(-R*1.3,R*1.2);g.closePath();g.fill();
   g.restore();}},
 mosq:{eyes:[[-8,-7],[8,-7]],kind:"bug",es:7,mouth:[0,4,6],top:-30,
  sil(g){const R=R0;el(g,-R*.82,-R*.25,9,17,-.7);el(g,R*.82,-R*.25,9,17,.7);el(g,0,-4,R*.62,R*.56);el(g,0,R*.58,R*.32,R*.48);},
  detail(g){const R=R0;
   g.beginPath();el(g,-R*.82,-R*.25,9,17,-.7);el(g,R*.82,-R*.25,9,17,.7);g.fillStyle="#d7ecff";g.fill();
   g.strokeStyle="#9cb8d8";g.lineWidth=1;g.beginPath();g.moveTo(-R*.5,-R*.1);g.lineTo(-R*1.1,-R*.6);g.moveTo(R*.5,-R*.1);g.lineTo(R*1.1,-R*.6);g.stroke();
   g.beginPath();el(g,0,R*.58,R*.32,R*.48);g.fillStyle="#8a7560";g.fill();
   g.strokeStyle="#5e4c3c";g.lineWidth=2;g.beginPath();for(const y of[.45,.62,.79]){g.moveTo(-R*.28,R*y);g.lineTo(R*.28,R*y);}g.stroke();
   g.beginPath();el(g,0,-4,R*.62,R*.56);g.fillStyle="#a8927a";g.fill();
   g.strokeStyle=INK;g.lineWidth=1.6;g.lineCap="round";g.beginPath();g.moveTo(-5,-R*.62);g.quadraticCurveTo(-10,-R*.95,-15,-R*1.05);g.moveTo(5,-R*.62);g.quadraticCurveTo(10,-R*.95,15,-R*1.05);g.stroke();
   g.strokeStyle="#3a2e24";g.lineWidth=2;g.beginPath();g.moveTo(0,7);g.lineTo(0,24);g.stroke();}},
 fly:{eyes:[[-10,-6],[10,-6]],kind:"bug",es:9,mouth:[0,12,6],top:-30,
  sil(g){const R=R0;el(g,-R*.72,-R*.62,9,16,-1.0);el(g,R*.72,-R*.62,9,16,1.0);el(g,0,0,R*.86,R*.8);},
  detail(g){const R=R0;
   g.beginPath();el(g,-R*.72,-R*.62,9,16,-1.0);el(g,R*.72,-R*.62,9,16,1.0);g.fillStyle="#e3f0ff";g.fill();
   g.strokeStyle="#a9bfd9";g.lineWidth=1;g.beginPath();g.moveTo(-R*.4,-R*.4);g.lineTo(-R*1.05,-R*.85);g.moveTo(R*.4,-R*.4);g.lineTo(R*1.05,-R*.85);g.stroke();
   g.beginPath();el(g,0,0,R*.86,R*.8);g.fillStyle="#34453a";g.fill();
   g.save();g.beginPath();el(g,0,0,R*.86,R*.8);g.clip();
   g.beginPath();el(g,-8,8,12,8,-.4);g.fillStyle="#4f7a55";g.fill();
   g.beginPath();el(g,6,-14,10,5,.3);g.fillStyle="#6c9c6a";g.fill();g.restore();}},
 brick:{eyes:[[-10,-2],[10,-2]],kind:"cartoon",es:6.5,mouth:[0,12,9],top:-30,
  sil(g){const R=R0;rr(g,-R*1.08,-R*.68,R*2.16,R*1.6,5);rr(g,-R*.78,-R*1.05,R*.6,R*.5,4);rr(g,R*.18,-R*1.05,R*.6,R*.5,4);},
  detail(g){const R=R0;
   g.beginPath();this.sil(g);g.fillStyle="#e8333f";g.fill();
   g.save();g.beginPath();rr(g,-R*1.08,-R*.68,R*2.16,R*1.6,5);g.clip();
   g.fillStyle="#ff5a63";g.fillRect(-R*1.1,-R*.7,R*2.2,R*.28);
   g.fillStyle="#b9202b";g.fillRect(-R*1.1,R*.66,R*2.2,R*.3);g.restore();
   for(const x of[-R*.48,R*.48]){g.beginPath();el(g,x-3,-R*.86,4,2.4);g.fillStyle="#ff8a90";g.fill();}}},
 foot:{eyes:[[-8,0],[8,0]],kind:"cartoon",es:6,mouth:[0,13,8],top:-34,
  sil(g){const R=R0;el(g,0,R*.18,R*.74,R*.92);el(g,-R*.42,-R*.78,7.5,8.5);el(g,-R*.06,-R*.96,6,6.5);el(g,R*.26,-R*.92,5.3,5.8);el(g,R*.5,-R*.76,4.8,5.2);el(g,R*.68,-R*.54,4.2,4.6);},
  detail(g){const R=R0;
   g.beginPath();this.sil(g);g.fillStyle="#f2c2a0";g.fill();
   g.beginPath();el(g,R*.68,-R*.54,4.2,4.6);g.fillStyle="#ff8a8a";g.fill();
   g.fillStyle="#fde6da";for(const[x,y,r]of[[-R*.42,-R*.86,3.6],[-R*.06,-R*1.02,2.8],[R*.26,-R*.98,2.4],[R*.5,-R*.82,2.1],[R*.68,-R*.6,1.8]]){g.beginPath();el(g,x,y,r,r*.8);g.fill();}
   g.beginPath();el(g,-R*.35,R*.45,7,13,.2);g.fillStyle="rgba(200,130,100,.25)";g.fill();}}
};

/* ===== tanda 1: novos personaxes ===== */
const C=(g,col)=>{g.fillStyle=col;g.fill();};
function calyx(g){for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?5:14;const x=Math.cos(a)*q*1.3,y=-19+Math.sin(a)*q*.55;i?g.lineTo(x,y):g.moveTo(x,y);}g.closePath();}
function pillow(col,dark,dir){return{eyes:[[-9,-5],[9,-5]],kind:"cartoon",es:6,mouth:[0,6,8],top:-24,
 sil(g){g.moveTo(-28,-16);g.quadraticCurveTo(0,-25,28,-16);g.quadraticCurveTo(24,0,28,16);g.quadraticCurveTo(0,25,-28,16);g.quadraticCurveTo(-24,0,-28,-16);g.closePath();},
 detail(g){g.beginPath();this.sil(g);C(g,col);
  g.save();g.beginPath();this.sil(g);g.clip();g.fillStyle=dark;for(let x=-30;x<34;x+=10){g.beginPath();el(g,x,-17,1.8,1.8);el(g,x+5,19,1.8,1.8);g.fill();}g.restore();
  g.strokeStyle=dark;g.lineWidth=1.4;g.setLineDash([3,3]);g.beginPath();g.moveTo(-22,-13);g.quadraticCurveTo(0,-20,22,-13);g.stroke();g.setLineDash([]);
  g.save();g.translate(dir*16,12);g.scale(-dir,1);g.beginPath();g.moveTo(-8,0);g.lineTo(-1,-6);g.lineTo(-1,-2.5);g.lineTo(7,-2.5);g.lineTo(7,2.5);g.lineTo(-1,2.5);g.lineTo(-1,6);g.closePath();C(g,"#fff");g.strokeStyle=INK;g.lineWidth=1.5;g.stroke();g.restore();}};}
/* lado da cama: cama vista desde arriba coa cabeceira ABAIXO, coma se estiveses deitado mirando cara aos pés: esquerda = esquerda */
function bedSide(dir,col){return{eyes:[[-8,-6],[8,-6]],kind:"cartoon",es:5.5,mouth:[0,4,8],top:-32,
 sil(g){rr(g,-24,-30,48,56,6);rr(g,-28,22,56,10,4);},
 detail(g){g.beginPath();rr(g,-24,-30,48,56,6);C(g,"#b07444");
  g.beginPath();rr(g,-21,-27,42,50,4);C(g,"#f4f1ea");
  g.save();g.beginPath();rr(g,-21,-27,42,38,4);g.clip();
  g.fillStyle="#e3e5ec";g.fillRect(dir<0?0:-22,-28,22,40);
  g.fillStyle=col;g.fillRect(dir<0?-22:0,-28,22,40);
  g.beginPath();el(g,dir*10,-6,7,15);C(g,"rgba(0,0,0,.09)");g.restore();
  g.strokeStyle=INK;g.lineWidth=1.3;g.beginPath();g.moveTo(-21,11);g.lineTo(21,11);g.moveTo(0,-27);g.lineTo(0,11);g.stroke();
  for(const s of[-1,1]){g.beginPath();rr(g,s<0?-19:2,13,17,8,4);C(g,s===dir?"#ffffff":"#eef0f4");g.strokeStyle="#c9ccd6";g.lineWidth=1;g.stroke();}
  g.beginPath();el(g,dir*10.5,16,5,4.5);C(g,"#f2c2a0");g.beginPath();el(g,dir*10.5,13.5,5,2.6);C(g,"#6b3e22");
  g.beginPath();rr(g,-28,22,56,10,4);C(g,"#8a5a33");
  g.save();g.translate(dir*11,-21);g.scale(-dir,1);g.beginPath();g.moveTo(-8,0);g.lineTo(-1,-6);g.lineTo(-1,-2.5);g.lineTo(7,-2.5);g.lineTo(7,2.5);g.lineTo(-1,2.5);g.lineTo(-1,6);g.closePath();C(g,"#fff");g.strokeStyle=INK;g.lineWidth=1.5;g.stroke();g.restore();}};}
function toilet(cold){const tint=cold?"#e3f3ff":"#fff0e8",rim=cold?"#7fc8f5":"#ff8a5c";return{eyes:[[-7,-21],[7,-21]],kind:"cartoon",es:5,mouth:[0,6,8],top:-32,
 sil(g){rr(g,-18,-31,36,21,5);g.moveTo(-25,-9);g.lineTo(25,-9);g.quadraticCurveTo(23,14,8,18);g.lineTo(9,27);g.lineTo(-9,27);g.lineTo(-8,18);g.quadraticCurveTo(-23,14,-25,-9);g.closePath();},
 detail(g){g.beginPath();this.sil(g);C(g,tint);
  g.beginPath();rr(g,-18,-31,36,21,5);C(g,"#ffffff");g.strokeStyle="#cfd5de";g.lineWidth=1.2;g.stroke();
  g.beginPath();el(g,10,-27,3,1.6);C(g,"#c4cad4");
  g.beginPath();rr(g,-26,-12,52,6,3);C(g,rim);g.strokeStyle=INK;g.lineWidth=1.5;g.stroke();
  if(cold){g.fillStyle="#fff";for(const[x,h]of[[-18,8],[-9,5],[2,9],[13,6]]){g.beginPath();g.moveTo(x-2.5,-6);g.lineTo(x+2.5,-6);g.lineTo(x,-6+h);g.closePath();g.fill();g.strokeStyle="#7fc8f5";g.lineWidth=1;g.stroke();}
   for(const[x,y]of[[-15,10],[14,8],[0,16]]){g.beginPath();el(g,x,y,1.5,1.5);C(g,"#9fd6f7");}}
  else{g.strokeStyle="#ff8a5c";g.lineWidth=1.8;g.lineCap="round";for(const x of[-12,0,12]){g.beginPath();g.moveTo(x,-36);g.quadraticCurveTo(x+4,-40,x,-44);g.quadraticCurveTo(x-4,-48,x,-52);g.stroke();}
   g.beginPath();el(g,-14,6,4,2.5);el(g,14,6,4,2.5);C(g,"rgba(255,120,100,.4)");}}};}
function clock2(late){const col=late?"#ff6a5a":"#5cc488";return{eyes:[[-7,-7],[7,-7]],kind:"cartoon",es:5,mouth:[0,14,6],top:-30,
 sil(g){el(g,0,2,24,24);el(g,-16,-20,8,7,-.5);el(g,16,-20,8,7,.5);g.moveTo(-16,24);g.lineTo(-20,30);g.lineTo(-12,30);g.closePath();g.moveTo(16,24);g.lineTo(20,30);g.lineTo(12,30);g.closePath();},
 detail(g){g.beginPath();el(g,-16,-20,8,7,-.5);el(g,16,-20,8,7,.5);C(g,"#c9cbd6");
  g.beginPath();g.moveTo(-16,24);g.lineTo(-20,30);g.lineTo(-12,30);g.closePath();g.moveTo(16,24);g.lineTo(20,30);g.lineTo(12,30);g.closePath();C(g,"#8a8fa3");
  g.beginPath();el(g,0,2,24,24);C(g,col);
  g.beginPath();el(g,0,2,18,18);C(g,"#fff");
  g.strokeStyle=INK;g.lineWidth=1.2;g.beginPath();for(let i=0;i<12;i++){const a=i/12*Math.PI*2;g.moveTo(Math.cos(a)*15,2+Math.sin(a)*15);g.lineTo(Math.cos(a)*17,2+Math.sin(a)*17);}g.stroke();
  const hand=(ang,len,w)=>{g.lineWidth=w;g.lineCap="round";g.beginPath();g.moveTo(0,6);g.lineTo(Math.sin(ang)*len,6-Math.cos(ang)*len);g.stroke();};
  g.strokeStyle=late?"#c8323f":"#1f8a4c";
  if(late){hand(Math.PI*2*20/60,9,1.8);hand(Math.PI*2*(9+20/60)/12,6,2.4);}else{hand(Math.PI*2*55/60,9,1.8);hand(Math.PI*2*(8+55/60)/12,6,2.4);}
  g.beginPath();el(g,0,6,1.8,1.8);C(g,INK);
  if(late){g.beginPath();g.moveTo(22,-10);g.quadraticCurveTo(27,-2,22,1);g.quadraticCurveTo(17,-2,22,-10);C(g,"#7fd0ff");}}};}
function ear(m,ring){return{eyes:[[-6,-8],[6,-8]],kind:"cartoon",es:5,mouth:[m*2,11,6],top:-28,
 sil(g){el(g,0,0,18,27);},
 detail(g){g.beginPath();el(g,0,0,18,27);C(g,"#f2c2a0");
  g.strokeStyle="#d9987a";g.lineWidth=4;g.lineCap="round";g.beginPath();g.moveTo(-m*4,-21);g.quadraticCurveTo(m*15,-21,m*13,0);g.quadraticCurveTo(m*11,14,m*3,17);g.stroke();
  g.beginPath();el(g,-m*8,4,3.5,4.5);C(g,"#c7836a");
  g.beginPath();el(g,0,20,9,6);C(g,"#f5ccad");
  if(ring){g.strokeStyle="#f2b632";g.lineWidth=2.4;g.beginPath();g.arc(0,30,4,0,Math.PI*2);g.stroke();}}};}
function shower(night){const col=night?"#3b4a8c":"#ffb84a";return{eyes:[[-8,-11],[8,-11]],kind:"cartoon",es:5.5,mouth:[0,-1,7],top:-36,
 sil(g){rr(g,-4,-36,8,12,3);g.moveTo(-25,3);g.quadraticCurveTo(-23,-26,0,-26);g.quadraticCurveTo(23,-26,25,3);g.closePath();for(const[x,y]of[[-14,14],[0,18],[14,14],[-7,26],[7,26]])el(g,x,y,3,4.2);},
 detail(g){g.beginPath();rr(g,-4,-36,8,12,3);C(g,"#c9cbd6");
  g.beginPath();g.moveTo(-25,3);g.quadraticCurveTo(-23,-26,0,-26);g.quadraticCurveTo(23,-26,25,3);g.closePath();C(g,col);
  g.beginPath();rr(g,-25,0,50,6,3);C(g,"#d9dce6");g.fillStyle="#8a90a3";for(let x=-20;x<=20;x+=5){g.beginPath();el(g,x,3,1,1);g.fill();}
  g.beginPath();for(const[x,y]of[[-14,14],[0,18],[14,14],[-7,26],[7,26]])el(g,x,y,3,4.2);C(g,"#7fd0ff");
  if(night){star(g,-13,-20,2.6,"#ffe37a");star(g,13,-20,2.2,"#ffe37a");g.beginPath();el(g,0,-20,4,4);C(g,"#ffe37a");g.beginPath();el(g,2,-21.5,3.4,3.4);C(g,col);}
  else{g.beginPath();el(g,0,-20,3.6,3.6);C(g,"#fff1a0");g.strokeStyle="#fff1a0";g.lineWidth=1.4;g.lineCap="round";g.beginPath();for(let i=0;i<8;i++){const a=i/8*Math.PI*2;g.moveTo(Math.cos(a)*5.2,-20+Math.sin(a)*5.2);g.lineTo(Math.cos(a)*7,-20+Math.sin(a)*7);}g.stroke();}}};}
Object.assign(OBJ,{
 mug:{eyes:[[-9,-3],[5,-3]],kind:"cartoon",es:5.5,mouth:[-2,9,8],top:-34,
  sil(g){rr(g,-22,-22,36,46,9);g.moveTo(14,-12);g.bezierCurveTo(32,-14,32,16,14,14);g.lineTo(14,7);g.bezierCurveTo(24,8,24,-6,14,-5);g.closePath();},
  detail(g){g.beginPath();this.sil(g);C(g,"#f4efe6");
   g.beginPath();g.rect(-22,6,36,7);C(g,"#e2463c");
   g.beginPath();el(g,-4,-19,15,3.5);C(g,"#6b3e22");
   g.strokeStyle="rgba(255,255,255,.95)";g.lineWidth=2;g.lineCap="round";for(const x of[-11,-3,5]){g.beginPath();g.moveTo(x,-27);g.quadraticCurveTo(x+4,-31,x,-35);g.quadraticCurveTo(x-4,-39,x,-43);g.stroke();}}},
 teapot:{eyes:[[-8,1],[8,1]],kind:"cartoon",es:5.5,mouth:[0,12,8],top:-30,
  sil(g){el(g,0,5,23,19);el(g,0,-14,11,5);el(g,0,-21,4,4);g.moveTo(17,2);g.lineTo(34,-14);g.lineTo(37,-10);g.lineTo(21,13);g.closePath();g.moveTo(-20,-6);g.bezierCurveTo(-36,-8,-36,18,-20,16);g.lineTo(-20,10);g.bezierCurveTo(-29,10,-29,-1,-20,0);g.closePath();},
  detail(g){g.beginPath();this.sil(g);C(g,"#4fae7a");
   g.beginPath();el(g,0,-14,11,5);C(g,"#3d8f63");g.beginPath();el(g,0,-21,4,4);C(g,"#ffcf33");
   g.beginPath();rr(g,-23,10,46,5,2);C(g,"#e9f7ef");
   g.beginPath();el(g,-11,-3,4.5,8,.5);C(g,"rgba(255,255,255,.35)");}},
 sun:{eyes:[[-8,-3],[8,-3]],kind:"cartoon",es:6,mouth:[0,9,9],top:-32,
  sil(g){el(g,0,0,21,21);for(let i=0;i<12;i++){const a=i/12*Math.PI*2,b=.16;g.moveTo(Math.cos(a-b)*19,Math.sin(a-b)*19);g.lineTo(Math.cos(a)*31,Math.sin(a)*31);g.lineTo(Math.cos(a+b)*19,Math.sin(a+b)*19);g.closePath();}},
  detail(g){g.beginPath();this.sil(g);C(g,"#ff9f1c");g.beginPath();el(g,0,0,21,21);C(g,"#ffd84a");
   g.beginPath();el(g,-13,6,4,2.5);el(g,13,6,4,2.5);C(g,"rgba(255,120,80,.45)");}},
 moon:{eyes:[[-8,0],[8,0]],kind:"cartoon",es:6,mouth:[0,11,8],top:-42,
  sil(g){el(g,0,2,24,24);g.moveTo(-20,-12);g.quadraticCurveTo(0,-30,18,-16);g.lineTo(30,-38);g.closePath();el(g,31,-40,5,5);},
  detail(g){g.beginPath();el(g,0,2,24,24);C(g,"#e3e9f6");
   g.fillStyle="#c6d0e6";for(const[x,y,r]of[[-12,14,4],[13,12,3],[4,19,2.5],[-16,0,2.5],[16,-2,2]]){g.beginPath();el(g,x,y,r,r);g.fill();}
   g.beginPath();g.moveTo(-20,-12);g.quadraticCurveTo(0,-30,18,-16);g.lineTo(30,-38);g.closePath();C(g,"#3d4fb0");
   g.beginPath();g.moveTo(-21,-11);g.quadraticCurveTo(0,-26,19,-15);g.lineTo(18,-11);g.quadraticCurveTo(0,-21,-20,-7);g.closePath();C(g,"#fff");
   g.beginPath();el(g,31,-40,5,5);C(g,"#fff");}},
 pillowL:bedSide(-1,"#ffd45c"),
 pillowR:bedSide(1,"#8fd6c9"),
 window:{eyes:[[-7,-4],[7,-4]],kind:"cartoon",es:5.5,mouth:[0,9,7],top:-30,
  sil(g){rr(g,-23,-29,46,58,21);},
  detail(g){g.beginPath();rr(g,-23,-29,46,58,21);C(g,"#e9edf3");
   g.save();g.beginPath();rr(g,-15,-21,30,42,14);g.clip();g.fillStyle="#8fd3ff";g.fillRect(-16,-22,32,44);
   g.beginPath();el(g,-4,14,9,4);el(g,5,12,7,4);el(g,-11,13,5,3);C(g,"#fff");
   g.fillStyle="#c9ced8";g.fillRect(-16,-22,32,9);g.fillStyle="#b3b9c6";g.fillRect(-16,-14,32,2);g.restore();
   g.beginPath();rr(g,-15,-21,30,42,14);g.strokeStyle="#b9c0cc";g.lineWidth=2;g.stroke();
   g.beginPath();el(g,-10,4,2.5,7,.3);C(g,"rgba(255,255,255,.45)");}},
 seat:{eyes:[[-8,-12],[8,-12]],kind:"cartoon",es:6,mouth:[0,0,8],top:-38,
  sil(g){rr(g,-20,-30,40,46,10);rr(g,-15,-37,30,13,5);rr(g,-25,10,50,14,6);},
  detail(g){g.beginPath();rr(g,-20,-30,40,46,10);C(g,"#5b6fb8");
   g.strokeStyle="#4a5c9e";g.lineWidth=1.5;g.beginPath();g.moveTo(-14,-20);g.lineTo(-14,10);g.moveTo(14,-20);g.lineTo(14,10);g.stroke();
   g.beginPath();rr(g,-15,-37,30,13,5);C(g,"#f1f1f1");
   g.beginPath();rr(g,-25,10,50,14,6);C(g,"#46579a");
   g.beginPath();rr(g,-6,14,12,5,2);C(g,"#cfd6ea");}},
 toiletC:toilet(true),
 toiletW:toilet(false),
 lettuce:{eyes:[[-9,-3],[9,-3]],kind:"cartoon",es:6.5,mouth:[0,10,9],top:-28,
  sil(g){for(let i=0;i<=60;i++){const a=i/60*Math.PI*2,r=R0*(1+.07*Math.sin(a*11));const x=Math.cos(a)*r*1.05,y=Math.sin(a)*r*.95;i?g.lineTo(x,y):g.moveTo(x,y);}g.closePath();},
  detail(g){g.beginPath();this.sil(g);C(g,"#6db83f");
   g.beginPath();for(let i=0;i<=60;i++){const a=i/60*Math.PI*2,r=19*(1+.08*Math.sin(a*9+1));const x=Math.cos(a)*r,y=Math.sin(a)*r*.9-2;i?g.lineTo(x,y):g.moveTo(x,y);}g.closePath();C(g,"#9bd65e");
   g.strokeStyle="#5aa034";g.lineWidth=1.4;g.lineCap="round";g.beginPath();for(const a of[-2.4,-1.6,-.8,0,.8,1.6,2.4,3.14]){g.moveTo(Math.cos(a)*13,Math.sin(a)*12);g.lineTo(Math.cos(a)*24,Math.sin(a)*22);}g.stroke();
   g.beginPath();el(g,0,0,10,9);C(g,"#c4ec86");}},
 tomato:{eyes:[[-9,1],[9,1]],kind:"cartoon",es:6.5,mouth:[0,13,9],top:-30,
  sil(g){el(g,0,3,R0*1.04,R0*.88);calyx(g);},
  detail(g){g.beginPath();el(g,0,3,R0*1.04,R0*.88);C(g,"#e8433a");
   g.save();g.beginPath();el(g,0,3,R0*1.04,R0*.88);g.clip();g.beginPath();el(g,8,22,26,10);C(g,"#c9322c");g.restore();
   g.beginPath();el(g,-13,-7,6,3.5,-.5);C(g,"rgba(255,255,255,.55)");
   g.beginPath();calyx(g);C(g,"#3f9a3a");
   g.strokeStyle="#2f7a2c";g.lineWidth=3;g.lineCap="round";g.beginPath();g.moveTo(0,-20);g.lineTo(2,-28);g.stroke();}},
 clockE:clock2(false),
 clockL:clock2(true),
 earL:ear(-1,true),
 earR:ear(1,false),
 ice:{eyes:[[-8,0],[8,0]],kind:"cartoon",es:6,mouth:[0,11,8],top:-26,
  sil(g){rr(g,-24,-24,48,48,10);},
  detail(g){g.beginPath();rr(g,-24,-24,48,48,10);C(g,"#a9ddff");
   g.beginPath();g.moveTo(-20,-20);g.lineTo(20,-20);g.lineTo(14,-13);g.lineTo(-14,-13);g.closePath();C(g,"#d6f0ff");
   g.beginPath();g.moveTo(20,-20);g.lineTo(20,20);g.lineTo(14,14);g.lineTo(14,-13);g.closePath();C(g,"#8ccdf5");
   g.strokeStyle="rgba(255,255,255,.85)";g.lineWidth=2.5;g.lineCap="round";g.beginPath();g.moveTo(-17,-6);g.lineTo(-17,8);g.moveTo(-12,-8);g.lineTo(-12,-4);g.stroke();}},
 flame:{eyes:[[-8,4],[8,4]],kind:"cartoon",es:6,mouth:[0,15,8],top:-36,
  sil(g){g.moveTo(2,-36);g.bezierCurveTo(16,-20,27,-6,23,12);g.bezierCurveTo(20,24,9,28,0,28);g.bezierCurveTo(-9,28,-21,24,-23,12);g.bezierCurveTo(-26,-2,-14,-10,-9,-24);g.bezierCurveTo(-4,-14,4,-18,2,-36);g.closePath();},
  detail(g){g.beginPath();this.sil(g);C(g,"#ff6a2a");
   g.beginPath();g.moveTo(1,-20);g.bezierCurveTo(12,-8,18,2,15,14);g.bezierCurveTo(12,23,6,25,0,25);g.bezierCurveTo(-6,25,-13,22,-15,13);g.bezierCurveTo(-17,3,-8,-4,-5,-12);g.bezierCurveTo(-2,-6,3,-10,1,-20);g.closePath();C(g,"#ffb12e");
   g.beginPath();el(g,0,16,9,8);C(g,"#fff0a0");}},
 cone:{eyes:[[-8,-13],[8,-13]],kind:"cartoon",es:5.5,mouth:[0,-4,7],top:-30,
  sil(g){el(g,0,-10,22,18);g.moveTo(-17,-1);g.lineTo(17,-1);g.lineTo(0,31);g.closePath();},
  detail(g){g.beginPath();g.moveTo(-17,-1);g.lineTo(17,-1);g.lineTo(0,31);g.closePath();C(g,"#e2a65a");
   g.save();g.clip();g.strokeStyle="#b97d3a";g.lineWidth=1.4;g.beginPath();for(let k=-30;k<40;k+=7){g.moveTo(k,-2);g.lineTo(k-20,32);g.moveTo(k-20,-2);g.lineTo(k,32);}g.stroke();g.restore();
   g.beginPath();el(g,0,-10,22,18);C(g,"#ff9fb8");
   g.beginPath();g.moveTo(-21,-5);g.quadraticCurveTo(-16,6,-12,-1);g.quadraticCurveTo(-8,10,-3,0);g.quadraticCurveTo(3,8,8,0);g.quadraticCurveTo(13,9,17,-1);g.quadraticCurveTo(20,2,21,-5);g.closePath();C(g,"#ff9fb8");
   g.beginPath();el(g,-9,-20,6,3,-.4);C(g,"rgba(255,255,255,.5)");
   g.beginPath();el(g,6,-28,4,4);C(g,"#d6243b");g.strokeStyle="#5f8f34";g.lineWidth=1.5;g.beginPath();g.moveTo(6,-31);g.quadraticCurveTo(8,-36,12,-37);g.stroke();}},
 tub:{eyes:[[-8,9],[8,9]],kind:"cartoon",es:5.5,mouth:[0,19,7],top:-24,
  sil(g){el(g,0,-6,20,14);g.moveTo(-23,-1);g.lineTo(23,-1);g.lineTo(17,27);g.lineTo(-17,27);g.closePath();rr(g,6,-28,6,20,3);},
  detail(g){g.beginPath();rr(g,6,-28,6,20,3);C(g,"#ff7fb0");
   g.beginPath();el(g,0,-6,20,14);C(g,"#8a5a3a");g.beginPath();el(g,-7,-11,6,3,-.3);C(g,"rgba(255,255,255,.35)");
   g.beginPath();g.moveTo(-23,-1);g.lineTo(23,-1);g.lineTo(17,27);g.lineTo(-17,27);g.closePath();C(g,"#fff");
   g.save();g.clip();g.fillStyle="#bcd8ff";for(let x=-24;x<26;x+=10){g.beginPath();g.moveTo(x,-1);g.lineTo(x+5,-1);g.lineTo(x+3,28);g.lineTo(x-2,28);g.closePath();g.fill();}g.restore();
   g.beginPath();rr(g,-24,-3,48,5,2);C(g,"#e9eef7");}},
 donut:{eyes:[[-9,-11],[9,-11]],kind:"cartoon",es:5.5,mouth:[0,12,8],top:-26,
  sil(g){el(g,0,0,R0,R0*.9);},
  detail(g){g.beginPath();el(g,0,0,R0,R0*.9);C(g,"#e3a35a");
   g.beginPath();for(let i=0;i<=40;i++){const a=i/40*Math.PI*2,r=20+1.8*Math.sin(a*8);const x=Math.cos(a)*r,y=Math.sin(a)*r*.86-1;i?g.lineTo(x,y):g.moveTo(x,y);}g.closePath();C(g,"#ff8fb8");
   const sp=["#fff","#3d7bff","#ffcf33","#5cc488"];[[-15,2,.4],[14,-2,-.6],[-3,-19,1],[16,9,.2],[-17,-8,-1],[6,17,.8],[-10,15,-.3],[18,-12,1.2]].forEach(([x,y,r],i)=>{g.save();g.translate(x,y);g.rotate(r);g.fillStyle=sp[i%4];g.fillRect(-2.5,-1,5,2);g.restore();});
   g.beginPath();el(g,0,0,6,5);C(g,"#b07438");g.strokeStyle=INK;g.lineWidth=1.2;g.stroke();}},
 toast:{eyes:[[-8,-6],[8,-6]],kind:"cartoon",es:5.5,mouth:[0,8,8],top:-34,
  sil(g){g.moveTo(-22,26);g.lineTo(-22,-10);g.quadraticCurveTo(-31,-30,-11,-29);g.quadraticCurveTo(0,-37,11,-29);g.quadraticCurveTo(31,-30,22,-10);g.lineTo(22,26);g.closePath();},
  detail(g){g.beginPath();this.sil(g);C(g,"#b8742f");
   g.save();g.scale(.84,.86);g.translate(0,1);g.beginPath();this.sil(g);C(g,"#f2c27a");g.restore();
   g.beginPath();g.moveTo(-14,-14);g.quadraticCurveTo(-6,-22,6,-18);g.quadraticCurveTo(17,-15,15,-2);g.quadraticCurveTo(18,12,8,16);g.quadraticCurveTo(-4,22,-12,14);g.quadraticCurveTo(-19,4,-14,-14);g.closePath();C(g,"rgba(226,83,62,.85)");
   g.strokeStyle="rgba(245,215,110,.95)";g.lineWidth=2;g.lineCap="round";g.beginPath();g.moveTo(-10,19);g.quadraticCurveTo(0,10,13,-12);g.stroke();
   g.fillStyle="#fff";for(const[x,y]of[[-6,-13],[10,4],[-12,6],[4,16],[12,-15]])g.fillRect(x,y,1.6,1.6);}},
 showerD:shower(false),
 showerN:shower(true)
});

/* ===== tanda 2: comida e casa ===== */
function chocBar(dark){const ch=dark?"#5a3320":"#f3e6c8",li=dark?"#7a4a2e":"#fff8e6",sh=dark?"#3e2214":"#d9c49c",lab=dark?"#c8323f":"#3d7bff";return{eyes:[[-8,-13],[8,-13]],kind:"cartoon",es:5.5,mouth:[0,-3,7],top:-30,
 sil(g){rr(g,-20,-28,40,56,5);},
 detail(g){g.beginPath();rr(g,-20,-28,40,56,5);C(g,ch);
  for(let r=0;r<3;r++)for(let c=0;c<2;c++){g.beginPath();rr(g,-17+c*17,-25+r*10,15,8.5,2);C(g,li);g.beginPath();rr(g,-17+c*17,-19+r*10,15,2.5,1);C(g,sh);}
  g.beginPath();rr(g,-21,6,42,23,4);C(g,lab);
  g.beginPath();g.moveTo(-21,6);for(let i=0;i<=14;i++)g.lineTo(-21+i*3,i%2?3:7);g.lineTo(21,9);g.lineTo(-21,9);g.closePath();C(g,"#d9dde6");
  g.strokeStyle="rgba(255,255,255,.7)";g.lineWidth=2;g.lineCap="round";g.beginPath();g.moveTo(-14,16);g.lineTo(14,16);g.moveTo(-10,21);g.lineTo(10,21);g.stroke();}};}
function egg(lace){return{eyes:[[-2,-4],[8,-4]],kind:"cartoon",es:4.2,mouth:[3,4,6],top:-22,
 sil(g){for(let i=0;i<=60;i++){const a=i/60*Math.PI*2,r=R0*(1+.1*Math.sin(5*a+1)+.05*Math.sin(9*a));const x=Math.cos(a)*r*1.12,y=Math.sin(a)*r*.82;i?g.lineTo(x,y):g.moveTo(x,y);}g.closePath();},
 detail(g){g.beginPath();this.sil(g);C(g,lace?"#c27d34":"#ffffff");
  if(lace){g.save();g.scale(.84,.82);g.beginPath();this.sil(g);C(g,"#fffdf6");g.restore();
   g.fillStyle="#a8652a";for(let i=0;i<14;i++){const a=i/14*Math.PI*2;g.beginPath();el(g,Math.cos(a)*26,Math.sin(a)*19,1.6,1.2);g.fill();}}
  else{g.beginPath();el(g,-6,10,16,5);C(g,"#eef0f4");}
  g.beginPath();el(g,3,-1,12.5,11.5);C(g,"#ffb51e");g.strokeStyle="#e8950c";g.lineWidth=1.2;g.stroke();
  g.beginPath();el(g,-2,-8,4,2.5,-.4);C(g,"rgba(255,255,255,.7)");}};}
function bottle(fizz){const lab=fizz?"#2fb3a0":"#3d7bff";return{eyes:[[-6,-6],[6,-6]],kind:"cartoon",es:4.6,mouth:[0,21,6],top:-36,
 sil(g){rr(g,-14,-14,28,42,8);rr(g,-7,-26,14,14,3);rr(g,-8,-34,16,8,2);},
 detail(g){g.beginPath();rr(g,-14,-14,28,42,8);rr(g,-7,-26,14,14,3);C(g,"#d6f1ff");
  g.beginPath();rr(g,-8,-34,16,8,2);C(g,lab);
  g.beginPath();g.rect(-14,4,28,12);C(g,lab);
  g.strokeStyle="rgba(255,255,255,.85)";g.lineWidth=1.6;g.beginPath();g.moveTo(-10,10);g.quadraticCurveTo(-5,6,0,10);g.quadraticCurveTo(5,14,10,10);g.stroke();
  g.beginPath();el(g,-9,-4,2,7);C(g,"rgba(255,255,255,.7)");
  if(fizz){g.lineWidth=1.2;g.strokeStyle="#fff";for(const[x,y,r]of[[7,-18,2],[-2,-20,1.5],[4,-12,1.8],[8,22,2],[-6,24,1.5],[-8,-12,1.2]]){g.beginPath();el(g,x,y,r,r);g.stroke();}
   g.strokeStyle=INK;g.lineWidth=1;for(const[x,y,r]of[[4,-39,2],[-4,-43,1.6],[2,-48,1.2]]){g.beginPath();el(g,x,y,r,r);g.stroke();}}}};}
function popcorn(sweet){const stp=sweet?"#ff8fb8":"#ff4f5e",pc=sweet?"#eaa340":"#fff6dc",pd=sweet?"#c97f22":"#e2d2ad";const P=[[-14,-10,8],[-4,-17,9],[8,-15,9],[16,-8,7],[0,-8,10],[-9,-22,5],[13,-23,5]];return{eyes:[[-6,6],[6,6]],kind:"cartoon",es:4.8,mouth:[0,17,6],top:-30,
 sil(g){g.moveTo(-18,-6);g.lineTo(18,-6);g.lineTo(13,28);g.lineTo(-13,28);g.closePath();for(const[x,y,r]of P)el(g,x,y,r,r);},
 detail(g){for(const[x,y,r]of P){g.beginPath();el(g,x,y,r,r);C(g,pc);g.strokeStyle=pd;g.lineWidth=1.2;g.stroke();}
  g.beginPath();g.moveTo(-18,-6);g.lineTo(18,-6);g.lineTo(13,28);g.lineTo(-13,28);g.closePath();C(g,"#fff");
  g.save();g.clip();g.fillStyle=stp;for(let x=-20;x<22;x+=10){g.beginPath();g.moveTo(x,-7);g.lineTo(x+5,-7);g.lineTo(x+4,29);g.lineTo(x-1,29);g.closePath();g.fill();}g.restore();
  g.beginPath();rr(g,-19,-8,38,5,2);C(g,"#f1f1f1");g.strokeStyle=INK;g.lineWidth=1.2;g.stroke();
  if(!sweet){g.fillStyle="#9aa3b5";for(const[x,y]of[[-10,-14],[4,-20],[12,-12],[-2,-11],[-14,-7],[8,-17]])g.fillRect(x,y,1.4,1.4);}
  else{g.fillStyle="rgba(255,255,255,.55)";for(const[x,y,r]of P){g.beginPath();el(g,x-r*.3,y-r*.35,r*.3,r*.2);g.fill();}}}};}
function juice(pulp){return{eyes:[[-6,0],[6,0]],kind:"cartoon",es:4.8,mouth:[0,12,6],top:-36,
 sil(g){g.moveTo(-17,-24);g.lineTo(17,-24);g.lineTo(13,28);g.lineTo(-13,28);g.closePath();el(g,17,-24,9,9);},
 detail(g){g.beginPath();g.moveTo(-17,-24);g.lineTo(17,-24);g.lineTo(13,28);g.lineTo(-13,28);g.closePath();C(g,"#eaf6ff");
  g.save();g.clip();g.fillStyle="#ffa21f";g.fillRect(-20,-15,40,45);
  if(pulp){g.fillStyle="#ffd27a";for(let i=0;i<22;i++){g.beginPath();el(g,-14+hash(i*4.3)*28,-12+hash(i*9.1)*38,1.7,1,hash(i)*3);g.fill();}}
  else{g.beginPath();el(g,-9,4,2.5,14);C(g,"rgba(255,255,255,.35)");}
  g.restore();
  g.strokeStyle="#ff4f5e";g.lineWidth=3;g.lineCap="round";g.beginPath();g.moveTo(-5,-38);g.lineTo(-2,8);g.stroke();
  g.beginPath();el(g,17,-24,9,9);C(g,"#ff9f1c");g.beginPath();el(g,17,-24,7,7);C(g,"#ffd27a");
  g.strokeStyle="#ff9f1c";g.lineWidth=1;g.beginPath();for(let i=0;i<6;i++){const a=i/6*Math.PI*2;g.moveTo(17,-24);g.lineTo(17+Math.cos(a)*7,-24+Math.sin(a)*7);}g.stroke();}};}
function roll(over){return{eyes:[[-7,-9],[7,-9]],kind:"cartoon",es:5,mouth:[0,5,7],top:-28,
 sil(g){el(g,0,-4,22,22);rr(g,-34,-28,6,34,2);},
 detail(g){g.beginPath();rr(g,-34,-28,6,34,2);C(g,"#c9cbd6");g.beginPath();rr(g,-30,-7,30,5,2);C(g,"#a9adbd");
  const strip=p=>{g.lineCap="round";g.lineJoin="round";g.strokeStyle=INK;g.lineWidth=8;g.beginPath();p();g.stroke();g.strokeStyle="#fff";g.lineWidth=5;g.beginPath();p();g.stroke();};
  if(!over)strip(()=>{g.arc(0,-4,22,Math.PI*.5,Math.PI,false);g.lineTo(-22,32);});
  g.beginPath();el(g,0,-4,22,22);C(g,"#ffffff");g.strokeStyle="#dfe2ea";g.lineWidth=1.2;for(const r of[17,12]){g.beginPath();el(g,0,-4,r,r);g.stroke();}
  if(over)strip(()=>{g.arc(0,-4,22,-Math.PI*.5,0,false);g.lineTo(22,32);});}};}
function blind(up){return{eyes:[[-7,-2],[7,-2]],kind:"cartoon",es:5,mouth:[0,9,7],top:-36,
 sil(g){rr(g,-23,-28,46,56,4);rr(g,-26,-34,52,8,3);},
 detail(g){g.beginPath();rr(g,-23,-28,46,56,4);C(g,"#f4f4f7");
  g.save();g.beginPath();rr(g,-18,-23,36,46,2);g.clip();
  g.fillStyle="#8fd3ff";g.fillRect(-19,-24,38,48);g.beginPath();el(g,10,-12,5,5);C(g,"#ffd84a");g.beginPath();el(g,-8,15,8,3.5);el(g,0,14,6,3);C(g,"#fff");
  const h=up?6:47;g.fillStyle="#d8c7a0";g.fillRect(-19,-24,38,h);g.strokeStyle="#b9a57a";g.lineWidth=1;g.beginPath();for(let y=-20;y<-24+h;y+=4){g.moveTo(-19,y);g.lineTo(19,y);}g.stroke();
  if(!up){g.fillStyle="rgba(255,240,200,.85)";for(let y=-21;y<22;y+=4)for(let x=-14;x<16;x+=7)g.fillRect(x,y,1.2,1);}
  g.restore();
  g.beginPath();rr(g,-26,-34,52,8,3);C(g,"#e3e5ec");
  g.strokeStyle="#8a90a3";g.lineWidth=1.5;g.beginPath();g.moveTo(21,-26);g.lineTo(21,up?-4:18);g.stroke();}};}
Object.assign(OBJ,{
 chocD:chocBar(true),
 chocW:chocBar(false),
 crust:{eyes:[[-9,-1],[9,-1]],kind:"cartoon",es:6,mouth:[0,10,8],top:-24,
  sil(g){el(g,0,2,28,21);},
  detail(g){g.beginPath();el(g,0,2,28,21);C(g,"#b5682e");
   g.save();g.beginPath();el(g,0,2,28,21);g.clip();g.beginPath();el(g,-6,-6,22,12,-.2);C(g,"#cf803e");g.beginPath();el(g,6,19,26,9);C(g,"#94531f");g.restore();
   g.strokeStyle="#ecbf7a";g.lineWidth=3;g.lineCap="round";g.beginPath();for(const x of[-16,-2,12]){g.moveTo(x-4,-17);g.quadraticCurveTo(x+2,-16,x+6,-11);}g.stroke();
   g.fillStyle="rgba(255,255,255,.75)";for(const[x,y]of[[-19,5],[17,-6],[21,8],[-6,17],[4,-15]]){g.beginPath();el(g,x,y,1.3,1.3);g.fill();}}},
 crumb:{eyes:[[-9,-3],[9,-3]],kind:"cartoon",es:6,mouth:[0,9,8],top:-28,
  sil(g){for(let i=0;i<=56;i++){const a=i/56*Math.PI*2,r=R0*(.95+.08*Math.sin(a*7+.5));const x=Math.cos(a)*r*1.05,y=Math.sin(a)*r*.92;i?g.lineTo(x,y):g.moveTo(x,y);}g.closePath();},
  detail(g){g.beginPath();this.sil(g);C(g,"#fbf1dc");
   g.fillStyle="#ead7ae";for(const[x,y,rx,ry]of[[-15,10,3,2],[14,12,2.5,2],[-4,18,2,1.5],[18,-4,2,2.5],[-19,-6,2,1.5],[4,-16,3,1.8],[-8,-17,1.8,1.4],[10,20,1.6,1.2]]){g.beginPath();el(g,x,y,rx,ry);g.fill();}
   g.beginPath();el(g,-10,-13,8,4,-.3);C(g,"rgba(255,255,255,.75)");}},
 eggLace:egg(true),
 eggPlain:egg(false),
 milk:{eyes:[[-7,-3],[7,-3]],kind:"cartoon",es:5,mouth:[0,6,7],top:-35,
  sil(g){rr(g,-17,-14,34,42,3);g.moveTo(-17,-14);g.lineTo(-12,-28);g.lineTo(12,-28);g.lineTo(17,-14);g.closePath();rr(g,-12,-33,24,6,1);},
  detail(g){g.beginPath();rr(g,-17,-14,34,42,3);C(g,"#f7f8fb");
   g.beginPath();g.moveTo(-17,-14);g.lineTo(-12,-28);g.lineTo(12,-28);g.lineTo(17,-14);g.closePath();C(g,"#e3e8f0");
   g.beginPath();rr(g,-12,-33,24,6,1);C(g,"#d2d8e3");
   g.beginPath();g.rect(-17,12,34,12);C(g,"#3d7bff");
   g.beginPath();g.moveTo(0,13);g.quadraticCurveTo(5,19,0,22);g.quadraticCurveTo(-5,19,0,13);C(g,"#fff");
   g.strokeStyle="#c9d0dc";g.lineWidth=1;g.beginPath();g.moveTo(0,-28);g.lineTo(0,-14);g.stroke();}},
 cereal:{eyes:[[-8,-15],[8,-15]],kind:"cartoon",es:5,mouth:[0,-6,7],top:-32,
  sil(g){rr(g,-19,-30,38,58,3);},
  detail(g){g.beginPath();rr(g,-19,-30,38,58,3);C(g,"#ff8a2a");
   g.beginPath();rr(g,-19,-30,38,9,3);C(g,"#ffcf33");
   g.beginPath();g.moveTo(-14,8);g.lineTo(14,8);g.quadraticCurveTo(13,22,0,23);g.quadraticCurveTo(-13,22,-14,8);g.closePath();C(g,"#fff");g.strokeStyle=INK;g.lineWidth=1.3;g.stroke();
   const cc=["#ff4f5e","#ffcf33","#5cc488","#3d7bff","#c76df0"];[[-9,6],[-3,4],[3,6],[9,5],[-6,1],[1,0],[7,1],[0,7]].forEach(([x,y],i)=>{g.beginPath();el(g,x,y,3,2.4);g.strokeStyle=cc[i%5];g.lineWidth=2;g.stroke();});}},
 waterFizz:bottle(true),
 waterFlat:bottle(false),
 wmelon:{eyes:[[-8,-6],[8,-6]],kind:"cartoon",es:5.5,mouth:[0,4,8],top:-17,
  sil(g){g.moveTo(-28,-14);g.lineTo(28,-14);g.arc(0,-14,28,0,Math.PI);g.closePath();},
  detail(g){g.beginPath();this.sil(g);C(g,"#3f9a3a");
   g.beginPath();g.moveTo(-25,-14);g.lineTo(25,-14);g.arc(0,-14,25,0,Math.PI);g.closePath();C(g,"#e6f5d0");
   g.beginPath();g.moveTo(-22,-14);g.lineTo(22,-14);g.arc(0,-14,22,0,Math.PI);g.closePath();C(g,"#ff4f5e");
   g.fillStyle=INK;for(const[x,y]of[[-14,-1],[12,0],[-4,7],[6,9],[-17,-9],[17,-8]]){g.beginPath();el(g,x,y,1.4,2.2,.2);g.fill();}}},
 melon:{eyes:[[-9,0],[9,0]],kind:"cartoon",es:6,mouth:[0,10,8],top:-24,
  sil(g){el(g,0,2,28,21);rr(g,24,-4,7,4,1.5);},
  detail(g){g.beginPath();el(g,0,2,28,21);C(g,"#8fbf4a");
   g.save();g.beginPath();el(g,0,2,28,21);g.clip();
   g.fillStyle="#5f8f34";for(let i=0;i<22;i++){const x=-26+hash(i*3.1)*52,y=-18+hash(i*7.7)*40;g.beginPath();el(g,x,y,2+hash(i)*2.5,1.4+hash(i*2)*1.6,hash(i*5)*3);g.fill();}
   g.beginPath();el(g,-8,-9,14,6,-.3);C(g,"rgba(255,255,255,.2)");g.restore();
   g.beginPath();rr(g,24,-4,7,4,1.5);C(g,"#7a5a2a");}},
 popSweet:popcorn(true),
 popSalt:popcorn(false),
 juicePulp:juice(true),
 juiceClear:juice(false),
 rollOver:roll(true),
 rollUnder:roll(false),
 blindUp:blind(true),
 blindDown:blind(false),
 sock:{eyes:[[-8,-14],[2,-14]],kind:"cartoon",es:4.8,mouth:[-3,-4,6],top:-32,
  sil(g){g.moveTo(-14,-30);g.lineTo(8,-30);g.lineTo(8,4);g.lineTo(18,8);g.quadraticCurveTo(30,12,27,22);g.quadraticCurveTo(23,30,8,28);g.lineTo(-4,26);g.quadraticCurveTo(-14,24,-14,12);g.closePath();},
  detail(g){g.beginPath();this.sil(g);C(g,"#ffffff");
   g.save();g.beginPath();this.sil(g);g.clip();
   g.fillStyle="#3d7bff";for(const y of[-20,-8,4,16])g.fillRect(-16,y,50,4);
   g.fillStyle="#ff4f5e";for(const y of[-14,-2,10,22])g.fillRect(-16,y,50,2);
   g.beginPath();el(g,-10,24,8,7);C(g,"#ffcf33");g.beginPath();el(g,26,18,7,8);C(g,"#ffcf33");
   g.fillStyle="#ffcf33";g.fillRect(-16,-31,26,6);g.restore();}}
});

function eye(g,x,y,s,expr,look,kind,side,blink){
  g.lineCap="round";g.lineJoin="round";g.strokeStyle=INK;
  if(kind==="bug"){g.lineWidth=1.6;g.beginPath();el(g,x,y,s*.8,blink||expr!=="normal"?s*.55:s*.95);g.fillStyle="#d6453d";g.fill();g.stroke();}
  g.lineWidth=Math.max(1.4,s*.3);
  if(expr==="ko"){const k=s*.5;g.beginPath();g.moveTo(x-k,y-k);g.lineTo(x+k,y+k);g.moveTo(x+k,y-k);g.lineTo(x-k,y+k);g.stroke();return;}
  if(expr==="hurt"){g.beginPath();g.moveTo(x+side*s*.55,y-s*.5);g.lineTo(x-side*s*.4,y);g.lineTo(x+side*s*.55,y+s*.5);g.stroke();return;}
  if(expr==="win"){g.beginPath();g.arc(x,y+s*.35,s*.55,Math.PI*1.15,Math.PI*1.85);g.stroke();return;}
  if(blink){g.beginPath();g.moveTo(x-s*.55,y);g.lineTo(x+s*.55,y);g.stroke();return;}
  g.lineWidth=1.6;
  if(kind==="cartoon"){g.beginPath();el(g,x,y,s*.72,s);g.fillStyle="#fff";g.fill();g.stroke();
    g.beginPath();el(g,x+look*s*.28,y+s*.15,s*.36,s*.46);g.fillStyle=INK;g.fill();
    g.beginPath();el(g,x+look*s*.28-s*.12,y-s*.05,s*.12,s*.12);g.fillStyle="#fff";g.fill();}
  else if(kind==="dot"){g.beginPath();el(g,x,y,s*.5,s*.62);g.fillStyle=INK;g.fill();
    g.beginPath();el(g,x-s*.15+look*s*.08,y-s*.22,s*.17,s*.17);g.fillStyle="#fff";g.fill();}
  else if(kind==="cat"){g.beginPath();el(g,x,y,s*.78,s*.62);g.fillStyle="#a6e36a";g.fill();g.stroke();
    g.beginPath();el(g,x+look*s*.18,y,s*.15,s*.55);g.fillStyle=INK;g.fill();}
  else{g.beginPath();el(g,x-s*.25+look*s*.1,y-s*.4,s*.22,s*.18);g.fillStyle="rgba(255,255,255,.85)";g.fill();}
}
function mouth(g,x,y,w,expr){
  g.strokeStyle=INK;g.lineCap="round";g.lineWidth=Math.max(1.4,w*.22);g.beginPath();
  if(expr==="hurt"){el(g,x,y+1,w*.32,w*.42);g.fillStyle=INK;g.fill();return;}
  if(expr==="ko"){g.moveTo(x-w*.5,y);g.quadraticCurveTo(x-w*.25,y-w*.3,x,y);g.quadraticCurveTo(x+w*.25,y+w*.3,x+w*.5,y);g.stroke();return;}
  if(expr==="win"){g.moveTo(x-w*.6,y-w*.15);g.quadraticCurveTo(x,y+w*1.1,x+w*.6,y-w*.15);g.closePath();g.fillStyle=INK;g.fill();g.beginPath();el(g,x,y+w*.45,w*.25,w*.15);g.fillStyle="#ff6b7d";g.fill();return;}
  g.arc(x,y-w*.35,w*.5,Math.PI*.2,Math.PI*.8);g.stroke();
}
function mark(g,m,x,y){
  g.save();g.translate(x,y);g.rotate(m.r);
  if(m.k==="tirita"){g.beginPath();rr(g,-8,-3.2,16,6.4,3);g.fillStyle="#f2c48d";g.fill();g.strokeStyle=INK;g.lineWidth=1.4;g.stroke();g.beginPath();rr(g,-3,-3.2,6,6.4,1);g.fillStyle="#e1a564";g.fill();}
  else if(m.k==="morado"){g.beginPath();el(g,0,0,5.5,4.5);g.fillStyle="rgba(110,60,170,.55)";g.fill();}
  else if(m.k==="grieta"){g.beginPath();g.moveTo(-4,-4);g.lineTo(-1,-1);g.lineTo(-3,1);g.lineTo(1,4);g.strokeStyle=INK;g.lineWidth=1.5;g.lineCap="round";g.stroke();}
  else{g.beginPath();el(g,0,0,6.5,5);g.fillStyle="#ff8fae";g.fill();g.strokeStyle=INK;g.lineWidth=1.6;g.stroke();g.beginPath();el(g,-2,-1.5,1.6,1.1);g.fillStyle="#fff";g.fill();}
  g.restore();
}
function drawBody(g,O,expr,look,blink,marks,flash){
  g.lineJoin="round";
  g.beginPath();O.sil(g);g.strokeStyle=INK;g.lineWidth=11;g.stroke();g.strokeStyle="#fff";g.lineWidth=7;g.stroke();
  O.detail(g);
  if(marks)for(const m of marks)if(m.k!=="chichon")mark(g,m,m.u*14,3+m.v*13);
  if(expr){O.eyes.forEach(([x,y],i)=>eye(g,x,y,O.es,expr,look,O.kind,i?1:-1,blink));mouth(g,O.mouth[0],O.mouth[1],O.mouth[2],expr);}
  if(marks)for(const m of marks)if(m.k==="chichon")mark(g,m,m.u*8,O.top+3);
  if(flash>0){g.beginPath();O.sil(g);g.fillStyle=`rgba(255,255,255,${Math.min(1,flash*8)*.85})`;g.fill();}
}
function hose(g,x0,y0,x1,y1,sag){g.strokeStyle=INK;g.lineWidth=5;g.lineCap="round";g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo((x0+x1)/2,(y0+y1)/2+sag,x1,y1);g.stroke();}
function glove(g,x,y,big){const r=big?8.5:7;g.beginPath();el(g,x,y,r,r*.92);g.fillStyle="#fff";g.fill();g.strokeStyle=INK;g.lineWidth=2.2;g.stroke();g.beginPath();g.arc(x,y,r*.55,Math.PI*1.1,Math.PI*1.6);g.lineWidth=1.4;g.stroke();}
function crown(g,x,y,worse){
  g.save();if(worse){g.translate(x,y);g.rotate(.18);g.translate(-x,-y);}
  g.beginPath();g.moveTo(x-12,y+6);g.lineTo(x-13,y-6);g.lineTo(x-6,y);g.lineTo(x,y-9);g.lineTo(x+6,y);g.lineTo(x+13,y-6);g.lineTo(x+12,y+6);g.closePath();
  g.fillStyle=worse?"#b3ab9c":"#ffc531";g.fill();g.strokeStyle=INK;g.lineWidth=2.2;g.lineJoin="round";g.stroke();
  if(worse){g.strokeStyle="#7d7466";g.lineWidth=1.2;g.beginPath();g.moveTo(x-4,y-2);g.lineTo(x-2,y+3);g.moveTo(x+7,y-1);g.lineTo(x+5,y+4);g.stroke();}
  else for(const[cx,c]of[[-6,"#ff4f5e"],[0,"#3d7bff"],[6,"#3fbf7f"]]){g.beginPath();el(g,x+cx,y+2.5,1.8,1.8);g.fillStyle=c;g.fill();}
  g.restore();
}
function koStars(g,x,y){for(let k=0;k<3;k++){const a=clock*4+k*2.09;star(g,x+Math.cos(a)*13,y+Math.sin(a)*4,4.5,"#ffd23f");}}
function hand(f,front){
  const d=f.d,w=Math.sin(clock*6)*2;
  switch(f.pose){
    case"wind":return front?[-d*4,-2,6]:[-d*8,6,6];
    case"punch":return front?[d*40,-4,0]:[-d*8,8,6];
    case"hurt":return front?[d*2,-24,-4]:[-d*10,-20,-4];
    case"win":return front?[d*4,-30+w,-6]:[-d*4,-30-w,-6];
    case"ko":return front?[d*8,18,4]:[-d*8,18,4];
    default:return front?[d*16,-8+w,8]:[d*4,-4-w,8];
  }
}
const exprOf=f=>f.pose==="ko"?"ko":f.pose==="hurt"?"hurt":f.pose==="win"?"win":"normal";
const blinkOf=f=>((clock+(f.d>0?0:1.7))%3.6)<.12;

function drawToon(g,f){
  const O=OBJ[f.obj],d=f.d,tc=TEAM[f.side];
  const legLen=20,bcy=-(legLen+R0*.92);
  const moving=Math.abs(f.tx-f.x)>1&&f.pose!=="ko";
  const step=moving?Math.sin(clock*16)*5:0;
  const bob=(f.pose==="idle"&&!moving)?Math.sin(clock*5+(d>0?0:1.4))*1.5:0;
  g.save();g.translate(f.x+(Math.random()-.5)*f.shake*2,G+f.jump);
  if(f.koT>0){g.translate(0,-R0);g.rotate(-d*Math.PI/2*f.koT);g.translate(0,R0);}
  const hipY=bcy+R0*.72+bob;
  for(const s of[-1,1]){
    const hx=s*9,fx=s*12+(s<0?-step:step),fy=-5;
    g.strokeStyle=INK;g.lineWidth=5;g.lineCap="round";g.beginPath();g.moveTo(hx,hipY);g.quadraticCurveTo(hx+s*7,(hipY+fy)/2,fx,fy);g.stroke();
    g.beginPath();el(g,fx+d*4,fy+1,9,5.5);g.fillStyle=tc;g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();
    g.beginPath();el(g,fx+d*7,fy-.5,2.5,1.5);g.fillStyle="rgba(255,255,255,.7)";g.fill();
  }
  const shY=bcy+4+bob,S1=[d*R0*.82,shY],S2=[-d*R0*.82,shY],hb=hand(f,false),hf=hand(f,true);
  hose(g,S2[0],S2[1],S2[0]+hb[0],S2[1]+hb[1],hb[2]);glove(g,S2[0]+hb[0],S2[1]+hb[1],false);
  g.save();g.translate(0,bcy+bob);
  g.scale(1+.2*f.sq+(f.pose==="punch"?.06:0),1-.16*f.sq);
  drawBody(g,O,exprOf(f),d,blinkOf(f),f.marks,f.flash);
  if(f.crown)crown(g,0,O.top-6,D[cur].type==="worse");
  g.restore();
  hose(g,S1[0],S1[1],S1[0]+hf[0],S1[1]+hf[1],hf[2]);glove(g,S1[0]+hf[0],S1[1]+hf[1],f.pose==="punch");
  g.restore();
  if(f.koT>.5)koStars(g,f.x-d*44,G-40);
}

