/* Dicotomías · estado do xogador, votos e resultados */
/* ===== estado ===== */
const KEY="dicotomias-v1";
let st={lang:"gl",votes:{},closed:{}};
try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&typeof s==="object")st=Object.assign(st,s);}catch(e){}
if(!LANGS.includes(st.lang))st.lang="gl";
st.votes=st.votes||{};st.closed=st.closed||{};
function save(){try{localStorage.setItem(KEY,JSON.stringify(st));}catch(e){}}
const T=k=>I18N[st.lang][k],X=d=>d.txt[st.lang],other=s=>s==="a"?"b":"a";
const sum=a=>a.reduce((x,y)=>x+y,0);
const isClosed=d=>d.ago>0||(!ONLINE&&!!st.closed[d.id]);
const nowBuckets=()=>{const n=new Date();return(n.getHours()+n.getMinutes()/60)/2;};
function series(d,upto){
  if(SV[d.id])return{vA:SV[d.id].a.slice(),vB:SV[d.id].b.slice()};
  const sv=sum(VOL),vA=[],vB=[];
  for(let i=0;i<12;i++){
    const f=upto==null?1:Math.max(0,Math.min(1,upto-i));
    const v=Math.round(d.total*VOL[i]/sv*f),a=Math.round(v*d.shares[i]);
    vA.push(a);vB.push(v-a);
  }
  const u=st.votes[d.id];
  if(u){const bi=Math.min(11,Math.floor(u.h/2));if(upto==null||bi<upto)(u.v==="a"?vA:vB)[bi]++;}
  return{vA,vB};
}
function totals(d){const s=series(d,null);return[sum(s.vA),sum(s.vB)];}
function winnerOf(d){const[a,b]=totals(d);return a===b?null:(a>b?"a":"b");}
function points(){return D.reduce((n,d)=>{const v=st.votes[d.id];return n+(v&&isClosed(d)&&v.p===winnerOf(d)?1:0);},0);}
let cur=D.findIndex(d=>d.ago===0),stage="vote",pending=null;

