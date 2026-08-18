// ==========================================================================
// MODULO 01: CONFIGURACION GLOBAL — Datos del Proyecto Bosques Marulanda
// Generador pseudo-aleatorio con semilla fija (Mulberry32) para reproducibilidad
// de coordenadas y atributos dasometricos entre recargas de pagina.
// ==========================================================================

// Generador deterministico — NO cambiar la semilla (20260411 = fecha del proyecto)
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const rnd=mulberry32(20260411);
const rrange=(a,b)=>a+rnd()*(b-a);

// ==========================================================================
// Diccionario UICN — Colores y nombres oficiales de categorias de amenaza
// ==========================================================================
const UICN_COL={CR:'#ef4444',EN:'#f97316',VU:'#eab308',NT:'#a3e635',LC:'#34d399',NE:'#94a3b8',DD:'#64748b'};
const UICN_NOM={CR:'Peligro Critico',EN:'En Peligro',VU:'Vulnerable',NT:'Casi Amenazada',LC:'Preocupacion Menor',NE:'No Evaluada',DD:'Datos Insuficientes'};

// ==========================================================================
// Catalogo de especies botanicas — Rangos DAP y Altura de campo (msnm 2.820)
// Pesos (w) controlan frecuencia de aparicion en la simulacion del inventario.
// ==========================================================================
const ESPECIES=[
 {c:'Fraijejon de Paramo',s:'Espeletia grandiflora',tipo:'frailejon',uicn:'VU',w:160,dap:[5,15],alt:[1.5,4],hue:55},
 {c:'Fraijejon Plateado',s:'Espeletia pycnophylla',tipo:'frailejon',uicn:'VU',w:120,dap:[4,12],alt:[1,3.5],hue:60},
 {c:'Encenillo de Montana',s:'Weinmannia tomentosa',tipo:'noble',uicn:'LC',w:70,dap:[15,40],alt:[8,16],hue:90},
 {c:'Pino Colombiano',s:'Retrophyllum rospigliosii',tipo:'noble',uicn:'EN',w:60,dap:[18,45],alt:[10,18],hue:160},
 {c:'Siete Cueros de Paramo',s:'Tibouchina lepidota',tipo:'arbusto',uicn:'LC',w:50,dap:[5,14],alt:[3,6],hue:290},
 {c:'Aliso de Monte',s:'Alnus acuminata',tipo:'noble',uicn:'LC',w:40,dap:[15,35],alt:[8,15],hue:120},
 {c:'Palma de Cera',s:'Ceroxylon meyenianum',tipo:'noble',uicn:'EN',w:30,dap:[20,40],alt:[15,30],hue:140}
];
const W_TOT=ESPECIES.reduce((a,e)=>a+e.w,0);
function pickSpecies(){let r=rnd()*W_TOT;for(const e of ESPECIES){if((r-=e.w)<=0)return e}return ESPECIES[0]}

// ==========================================================================
// Delimitacion de las 3 Fases operativas (60 Ha) en Marulanda (2.820 msnm)
// Coordenadas Oficiales IGAC: 5 05 49.9 N, 75 20 40.0 W
// ==========================================================================
const LOTES=[
 {n:1,area:13.6,ind:21760,poly:[[5.106244,-75.344537],[5.106036,-75.344383],[5.105904,-75.344159],[5.1063,-75.34287],[5.106667,-75.341254],[5.106863,-75.34105],[5.106566,-75.340439],[5.106982,-75.338628],[5.107327,-75.338279],[5.107953,-75.338287],[5.108905,-75.33777],[5.10906,-75.337986],[5.109156,-75.338416],[5.10933,-75.338314],[5.109545,-75.338346],[5.109869,-75.338451],[5.110098,-75.338574],[5.110166,-75.338837],[5.110342,-75.339036],[5.110557,-75.339068],[5.110864,-75.339336],[5.110974,-75.33963],[5.110859,-75.34018],[5.110662,-75.340385],[5.110464,-75.340849],[5.110692,-75.341606],[5.110664,-75.341724],[5.110274,-75.342672],[5.110324,-75.342886],[5.111139,-75.343792],[5.111284,-75.344508],[5.111114,-75.344796],[5.110936,-75.344895],[5.108458,-75.34505],[5.108061,-75.344904],[5.107767,-75.34501],[5.107463,-75.344992],[5.106587,-75.345529],[5.106244,-75.344537]]},
 {n:2,area:22.7,ind:36320,poly:[[5.106106,-75.343301],[5.106086,-75.343655],[5.105965,-75.34407],[5.105797,-75.344068],[5.105147,-75.344132],[5.104671,-75.344461],[5.103842,-75.34466],[5.102864,-75.344465],[5.101759,-75.344588],[5.100965,-75.344746],[5.10024,-75.344811],[5.099531,-75.344716],[5.09939,-75.344367],[5.099617,-75.344279],[5.100023,-75.344045],[5.100719,-75.343742],[5.101524,-75.343118],[5.101937,-75.342874],[5.10255,-75.342568],[5.103351,-75.342814],[5.103628,-75.342778],[5.103761,-75.342748],[5.104229,-75.342844],[5.104655,-75.342773],[5.105062,-75.342681],[5.105589,-75.342795],[5.106252,-75.342911],[5.106106,-75.343301]]},
 {n:3,area:23.7,ind:37920,poly:[[5.099778,-75.344949],[5.098735,-75.345393],[5.09789,-75.345938],[5.097634,-75.346588],[5.097067,-75.347094],[5.096632,-75.347522],[5.095661,-75.347817],[5.09478,-75.347438],[5.094418,-75.346535],[5.094039,-75.345964],[5.095168,-75.345637],[5.095799,-75.346007],[5.096695,-75.346103],[5.097187,-75.34601],[5.097611,-75.345191],[5.097976,-75.344482],[5.098437,-75.344429],[5.099778,-75.344949]]}
];

// Funcion auxiliar: detectar si un punto GPS esta dentro de un poligono (ray-casting)
function inPoly(pt,poly){let x=pt[1],y=pt[0],ins=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const xi=poly[i][1],yi=poly[i][0],xj=poly[j][1],yj=poly[j][0];if(((yi>y)!=(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi))ins=!ins;}return ins;}

// ==========================================================================
// Generacion del inventario simulado de individuos georeferenciados
// Cada individuo tiene: ID unico, fase, coordenadas GPS, especie y atributos.
// ==========================================================================
const TREES=[];
let globalCount=0;
LOTES.forEach((lt)=>{
 const poly=lt.poly;
 const lats=poly.map(p=>p[0]),lngs=poly.map(p=>p[1]);
 const bb={la0:Math.min(...lats),la1:Math.max(...lats),ln0:Math.min(...lngs),ln1:Math.max(...lngs)};
 for(let k=0;k<Math.min(lt.ind,450);k++){
  globalCount++;
  let pt,tries=0;
  do{pt=[rrange(bb.la0,bb.la1),rrange(bb.ln0,bb.ln1)];tries++}while(!inPoly(pt,poly)&&tries<60);
  const sp=pickSpecies();
  const dap=+rrange(sp.dap[0],sp.dap[1]).toFixed(1);
  const alt=+rrange(sp.alt[0],sp.alt[1]).toFixed(1);
  const isReserved=(globalCount<=100);
  TREES.push({
   id:'BM-F'+lt.n+'-'+String(k+1).padStart(5,'0'),
   lote:lt.n,lat:pt[0],lng:pt[1],sp:sp.c,sci:sp.s,tipo:sp.tipo,uicn:sp.uicn,hue:sp.hue,
   dap:dap,alt:alt,fito:rnd()<0.88?'Bueno':'Regular',
   disponible:!isReserved,
   co2_40:+(0.42*rrange(0.9,1.15)).toFixed(2),
   agua_reg:Math.round(1450*(lt.area/lt.ind)),
   pch_kw:+(1.8*(lt.area/20)).toFixed(2)
  });
 }
});

// Generador de imagen SVG de fondo para los popups del mapa
function fotoSVG(t,big){
 const w=big?620:280,h=big?190:104;
 const sky='hsl('+t.hue+',45%,14%)',sky2='hsl('+(t.hue+30)+',55%,26%)';
 const fol='hsl('+t.hue+',65%,35%)';
 let trees='';
 for(let i=0;i<5;i++){
  const x=30+i*(w-60)/4+((i*37)%23)-10,y=h*0.55+((i*53)%17),s=(0.75+((i*29)%40)/100);
  trees+='<g transform="translate('+x+','+y+') scale('+s+')" ><rect x="-2" y="0" width="4" height="'+(h*0.3)+'" rx="2" fill="#241a10"/><circle cx="0" cy="-6" r="14" fill="'+fol+'"/><path d="M-8 4 L0 -12 L8 4 Z" fill="'+fol+'" opacity=".9"/></g>';
 }
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+sky2+'"/><stop offset="1" stop-color="'+sky+'"/></linearGradient></defs><rect width="'+w+'" height="'+h+'" fill="url(#g)"/><circle cx="'+(w*0.8)+'" cy="'+(h*0.24)+'" r="'+(h*0.11)+'" fill="#fde68a" opacity=".85"/><path d="M0 '+(h*0.62)+' Q '+(w*0.3)+' '+(h*0.5)+' '+(w*0.55)+' '+(h*0.6)+' T '+w+' '+(h*0.56)+' V '+h+' H 0 Z" fill="hsl('+t.hue+',40%,10%)"/>'+trees+'<rect y="'+(h*0.86)+'" width="'+w+'" height="'+(h*0.14)+'" fill="hsl('+t.hue+',45%,8%)"/></svg>';
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
function fotoArbol(t,big){return fotoSVG(t,big);}
