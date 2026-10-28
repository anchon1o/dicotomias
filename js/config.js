/* Dicotomías · configuración e conexión con Supabase (proxecto xogos, prefixo dil_) */
/* ===== modo en liña (Supabase «xogos», prefixo dil_). Se non conecta (p. ex. dentro de Claude) queda en modo demo ===== */
const SB_URL="https://pmvbllviitutbnoqpnrs.supabase.co",SB_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtdmJsbHZpaXR1dGJub3FwbnJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4MTE3NTAsImV4cCI6MjEwNTM4Nzc1MH0.5WMnLv9oY3PXXLjCrxukt6qu2xkNwOvrkbcxYqUrdgo";
let ONLINE=false,sb=null,LIVE=0;const SV={};
const DEV=(()=>{const mk=()=>(crypto.randomUUID?crypto.randomUUID():"10000000-1000-4000-8000-100000000000".replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16)));try{let k=localStorage.getItem("dil-device");if(!k){k=mk();localStorage.setItem("dil-device",k);}return k;}catch(e){return mk();}})();
