/* Dicotomías · dilemas: textos nas cinco linguas e personaxes de cada bando */
/* ===== dilemas: un só id e un só reconto, textos en todas as linguas =====
   ago: días atrás (0 = hoxe). shares: % para A en cada tramo de 2 horas. */
const VOL=[2,1,1,3,6,8,9,10,11,12,10,7];
const D=[
 {id:"tortilla",ago:4,type:"prefer",a:"onion",b:"potato",total:10065,shares:[.6,.58,.62,.64,.63,.61,.62,.63,.62,.61,.63,.62],txt:{
   gl:{t:"Tortilla de patacas",a:"Con cebola",b:"Sen cebola"},es:{t:"Tortilla de patatas",a:"Con cebolla",b:"Sin cebolla"},
   ca:{t:"Truita de patates",a:"Amb ceba",b:"Sense ceba"},eu:{t:"Patata-tortilla",a:"Tipularekin",b:"Tipularik gabe"},en:{t:"Spanish omelette",a:"With onion",b:"Without onion"}}},
 {id:"mascota",ago:3,type:"prefer",a:"dog",b:"cat",total:10089,shares:[.42,.44,.45,.46,.47,.49,.5,.53,.54,.56,.55,.56],txt:{
   gl:{t:"Mascota",a:"Can",b:"Gato"},es:{t:"Mascota",a:"Perro",b:"Gato"},ca:{t:"Mascota",a:"Gos",b:"Gat"},eu:{t:"Maskota",a:"Txakurra",b:"Katua"},en:{t:"Pet",a:"Dog",b:"Cat"}}},
 {id:"vacacions",ago:2,type:"prefer",a:"ball",b:"mount",total:10210,shares:[.72,.7,.68,.64,.56,.5,.42,.38,.36,.35,.34,.36],txt:{
   gl:{t:"Vacacións",a:"Praia",b:"Montaña"},es:{t:"Vacaciones",a:"Playa",b:"Montaña"},ca:{t:"Vacances",a:"Platja",b:"Muntanya"},eu:{t:"Oporrak",a:"Hondartza",b:"Mendia"},en:{t:"Holidays",a:"Beach",b:"Mountains"}}},
 {id:"bichos",ago:1,type:"worse",a:"mosq",b:"fly",total:9077,shares:[.86,.84,.85,.83,.86,.85,.84,.86,.85,.84,.85,.86],txt:{
   gl:{t:"Bichos molestos",a:"Mosquito de noite",b:"Mosca de día"},es:{t:"Bichos molestos",a:"Mosquito de noche",b:"Mosca de día"},
   ca:{t:"Bestioles molestes",a:"Mosquit de nit",b:"Mosca de dia"},eu:{t:"Intsektu gogaikarriak",a:"Gaueko eltxoa",b:"Eguneko eulia"},en:{t:"Annoying bugs",a:"Mosquito at night",b:"Fly by day"}}},
 {id:"dor",ago:0,type:"worse",a:"brick",b:"foot",total:9882,shares:[.55,.52,.48,.5,.47,.46,.49,.53,.51,.48,.5,.47],txt:{
   gl:{t:"Dor doméstica",a:"Pisar un Lego",b:"Golpe no dedo pequeno do pé"},es:{t:"Dolor doméstico",a:"Pisar un Lego",b:"Golpe en el meñique del pie"},
   ca:{t:"Dolor domèstic",a:"Trepitjar un Lego",b:"Cop al dit petit del peu"},eu:{t:"Etxeko mina",a:"Lego bat zapaltzea",b:"Oineko behatz txikian kolpea"},en:{t:"Household pain",a:"Stepping on a Lego",b:"Stubbing your little toe"}}}
];
/* tanda 1: dilemas novos (días anteriores no arquivo) */
const mkShares=(base,trend,seed)=>Array.from({length:12},(_,i)=>Math.min(.95,Math.max(.05,base+trend*(i-5.5)/5.5+Math.sin(seed*91.7+i*12.3)*.025)));
const TX={
 cafe:{gl:["Para espertar","Café","Té"],es:["Para despertar","Café","Té"],ca:["Per despertar-se","Cafè","Te"],eu:["Esnatzeko","Kafea","Tea"],en:["To wake up","Coffee","Tea"]},
 madrugar:{gl:["O teu horario","Madrugar","Trasnoitar"],es:["Tu horario","Madrugar","Trasnochar"],ca:["El teu horari","Matinar","Vetllar"],eu:["Zure ordutegia","Goiz jaiki","Berandu oheratu"],en:["Your body clock","Early bird","Night owl"]},
 temperatura:{gl:["Temperatura","Frío","Calor"],es:["Temperatura","Frío","Calor"],ca:["Temperatura","Fred","Calor"],eu:["Tenperatura","Hotza","Beroa"],en:["Weather","Cold","Heat"]},
 cama:{gl:["Lado da cama (deitado nela)","Esquerdo","Dereito"],es:["Lado de la cama (tumbado en ella)","Izquierdo","Derecho"],ca:["Costat del llit (estirat a dins)","Esquerre","Dret"],eu:["Ohearen aldea (etzanda)","Ezkerra","Eskuina"],en:["Side of the bed (lying in it)","Left","Right"]},
 aviao:{gl:["No avión","Xanela","Corredor"],es:["En el avión","Ventanilla","Pasillo"],ca:["A l’avió","Finestreta","Passadís"],eu:["Hegazkinean","Leihoa","Korridorea"],en:["On the plane","Window","Aisle"]},
 vater:{gl:["O asento do váter","Frío","Quente"],es:["El asiento del váter","Frío","Caliente"],ca:["El seient del vàter","Fred","Calent"],eu:["Komuneko eserlekua","Hotza","Epela"],en:["Toilet seat","Cold","Warm"]},
 ensalada:{gl:["Ensalada","Leituga","Tomate"],es:["Ensalada","Lechuga","Tomate"],ca:["Amanida","Enciam","Tomàquet"],eu:["Entsalada","Letxuga","Tomatea"],en:["Salad","Lettuce","Tomato"]},
 puntual:{gl:["Puntualidade","Chegar cedo","Chegar tarde"],es:["Puntualidad","Llegar pronto","Llegar tarde"],ca:["Puntualitat","Arribar d’hora","Arribar tard"],eu:["Puntualtasuna","Goiz iritsi","Berandu iritsi"],en:["Punctuality","Arrive early","Arrive late"]},
 oido:{gl:["Co teléfono","Oído esquerdo","Oído dereito"],es:["Al teléfono","Oído izquierdo","Oído derecho"],ca:["Al telèfon","Orella esquerra","Orella dreta"],eu:["Telefonoz","Ezkerreko belarria","Eskuineko belarria"],en:["On the phone","Left ear","Right ear"]},
 xeado:{gl:["Xeado","Cucurucho","Tarrina"],es:["Helado","Cucurucho","Tarrina"],ca:["Gelat","Cucurutxo","Tarrina"],eu:["Izozkia","Kukurutxoa","Ontzia"],en:["Ice cream","Cone","Tub"]},
 almorzo:{gl:["Almorzo","Doce","Salgado"],es:["Desayuno","Dulce","Salado"],ca:["Esmorzar","Dolç","Salat"],eu:["Gosaria","Gozoa","Gazia"],en:["Breakfast","Sweet","Savoury"]},
 ducha:{gl:["Ducha","Pola mañá","Pola noite"],es:["Ducha","Por la mañana","Por la noche"],ca:["Dutxa","Al matí","A la nit"],eu:["Dutxa","Goizean","Gauean"],en:["Shower","Morning","Night"]}
};
[["cafe","mug","teapot",.58,.04],["madrugar","sun","moon",.44,-.06],["temperatura","ice","flame",.47,.1],["cama","pillowL","pillowR",.49,.02],["aviao","window","seat",.67,-.03],["vater","toiletC","toiletW",.45,.1],["ensalada","lettuce","tomato",.41,0],["puntual","clockE","clockL",.71,-.02],["oido","earL","earR",.36,.03],["xeado","cone","tub",.64,0],["almorzo","donut","toast",.39,-.05],["ducha","showerD","showerN",.56,-.16]].forEach(([id,a,b,base,tr],k)=>{
  const t={};for(const l in TX[id]){const[x,y,z]=TX[id][l];t[l]={t:x,a:y,b:z};}
  D.push({id,ago:5+k,type:"prefer",a,b,total:8000+((k*1373)%3200),shares:mkShares(base,tr,k+1),txt:t});
});
/* tanda 2: comida e casa */
const TX2={
 chocolate:{gl:["Chocolate","Negro","Branco"],es:["Chocolate","Negro","Blanco"],ca:["Xocolata","Negra","Blanca"],eu:["Txokolatea","Beltza","Zuria"],en:["Chocolate","Dark","White"]},
 pan:{gl:["Pan","Codia","Miolo"],es:["Pan","Corteza","Miga"],ca:["Pa","Crosta","Molla"],eu:["Ogia","Azala","Mamia"],en:["Bread","Crust","Soft middle"]},
 ovo:{gl:["Ovo frito","Con puntilla","Sen puntilla"],es:["Huevo frito","Con puntilla","Sin puntilla"],ca:["Ou ferrat","Amb vora cruixent","Sense vora cruixent"],eu:["Arrautza frijitua","Ertz kurruskaria","Ertz leuna"],en:["Fried egg","Crispy edges","Soft edges"]},
 cereais:{gl:["No bol","Primeiro o leite","Primeiro os cereais"],es:["En el bol","Primero la leche","Primero los cereales"],ca:["Al bol","Primer la llet","Primer els cereals"],eu:["Ontzian","Lehenik esnea","Lehenik zerealak"],en:["In the bowl","Milk first","Cereal first"]},
 auga:{gl:["Auga","Con gas","Sen gas"],es:["Agua","Con gas","Sin gas"],ca:["Aigua","Amb gas","Sense gas"],eu:["Ura","Gasduna","Gasik gabea"],en:["Water","Sparkling","Still"]},
 froita:{gl:["Froita de verán","Sandía","Melón"],es:["Fruta de verano","Sandía","Melón"],ca:["Fruita d’estiu","Síndria","Meló"],eu:["Udako fruta","Angurria","Meloia"],en:["Summer fruit","Watermelon","Melon"]},
 palomitas:{gl:["Flocos de millo","Doces","Salgados"],es:["Palomitas","Dulces","Saladas"],ca:["Crispetes","Dolces","Salades"],eu:["Krispetak","Gozoak","Gaziak"],en:["Popcorn","Sweet","Salty"]},
 zume:{gl:["Zume de laranxa","Con polpa","Sen polpa"],es:["Zumo de naranja","Con pulpa","Sin pulpa"],ca:["Suc de taronja","Amb polpa","Sense polpa"],eu:["Laranja-zukua","Mamiarekin","Mamirik gabe"],en:["Orange juice","With bits","Smooth"]},
 papel:{gl:["Papel hixiénico","Por diante","Por detrás"],es:["Papel higiénico","Por delante","Por detrás"],ca:["Paper de vàter","Per davant","Per darrere"],eu:["Komuneko papera","Aurretik","Atzetik"],en:["Toilet roll","Over","Under"]},
 persiana:{gl:["Para durmir, a persiana…","Subida","Baixada"],es:["Para dormir, la persiana…","Subida","Bajada"],ca:["Per dormir, la persiana…","Pujada","Abaixada"],eu:["Lo egiteko, pertsiana…","Igota","Jaitsita"],en:["To sleep, the blinds…","Up","Down"]},
 calcetins:{gl:["Para durmir","Con calcetíns","Sen calcetíns"],es:["Para dormir","Con calcetines","Sin calcetines"],ca:["Per dormir","Amb mitjons","Sense mitjons"],eu:["Lo egiteko","Galtzerdiekin","Galtzerdirik gabe"],en:["To sleep","With socks","Without socks"]}
};
[["chocolate","chocD","chocW",.66,-.02],["pan","crust","crumb",.52,-.07],["ovo","eggLace","eggPlain",.61,.02],["cereais","milk","cereal",.27,0],["auga","waterFizz","waterFlat",.38,.03],["froita","wmelon","melon",.57,-.05],["palomitas","popSweet","popSalt",.31,.02],["zume","juicePulp","juiceClear",.44,.09],["papel","rollOver","rollUnder",.74,-.01],["persiana","blindUp","blindDown",.29,-.03],["calcetins","sock","foot",.42,.05]].forEach(([id,a,b,base,tr],k)=>{
  const t={};for(const l in TX2[id]){const[x,y,z]=TX2[id][l];t[l]={t:x,a:y,b:z};}
  D.push({id,ago:17+k,type:"prefer",a,b,total:7600+((k*977)%3400),shares:mkShares(base,tr,k+20),txt:t});
});

