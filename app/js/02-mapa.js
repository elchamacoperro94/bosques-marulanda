// ==========================================================================
// MÓDULO JS 02: MAPA OPERATIVO LEAFLET, POLÍGONOS & GEOLOCALIZACIÓN
// Explicación: Inicializa el mapa base (Esri World Imagery + OSM), renderiza
// los polígonos de las 3 Fases, el perímetro catastral de la Finca y el espejo de agua.
// ==========================================================================

const esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles © Esri — Maxar',
  maxZoom: 19
});
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19
});

const map = L.map('map', {
  layers: [esri],
  zoomControl: true,
  scrollWheelZoom: true
});
map.zoomControl.setPosition('topleft');

const cluster = L.markerClusterGroup({
  chunkedLoading: true,
  disableClusteringAtZoom: 17,
  maxClusterRadius: 46
});
map.addLayer(cluster);

const lotLayers = {};
const FASE_COLS = { 1: '#34d399', 2: '#3b82f6', 3: '#fbbf24' };

LOTES.forEach(lt => {
  const col = FASE_COLS[lt.n];
  const pg = L.polygon(lt.poly, {
    color: col,
    weight: 2.5,
    opacity: 0.9,
    fillColor: col,
    fillOpacity: 0.12
  }).addTo(map);
  pg.bindTooltip('Fase ' + lt.n, { permanent: true, direction: 'center', className: 'lot-label', interactive: false });
  lotLayers[lt.n] = pg;
});

// Límite Perimetral Catastral Finca (130 Ha)
const FINCA_BOUNDARY = [[5.110559, -75.340709], [5.110509, -75.340959], [5.110521, -75.341217], [5.110599, -75.341363], [5.110684, -75.341602], [5.110667, -75.341708], [5.11054, -75.341971], [5.110413, -75.342237], [5.110323, -75.342453], [5.110282, -75.342684], [5.110361, -75.342901], [5.110543, -75.343155], [5.110741, -75.343441], [5.110925, -75.343634], [5.11113, -75.343797], [5.111157, -75.344043], [5.111193, -75.344309], [5.111272, -75.344511], [5.111195, -75.344617], [5.111095, -75.344809], [5.110924, -75.34489], [5.110298, -75.344911], [5.109553, -75.344915], [5.109339, -75.34491], [5.109073, -75.344892], [5.108753, -75.344956], [5.108408, -75.345036], [5.108065, -75.344908], [5.107786, -75.345022], [5.107482, -75.345016], [5.107208, -75.345138], [5.106927, -75.345289], [5.10659, -75.34549], [5.106573, -75.345658], [5.10655, -75.345814], [5.106365, -75.345953], [5.106261, -75.346161], [5.106008, -75.346324], [5.105714, -75.346487], [5.105678, -75.346662], [5.105683, -75.346819], [5.105736, -75.347037], [5.105872, -75.347151], [5.106072, -75.347404], [5.106052, -75.347559], [5.105953, -75.347653], [5.105884, -75.3478], [5.105889, -75.347923], [5.105787, -75.348], [5.105626, -75.348152], [5.105636, -75.348309], [5.105696, -75.348439], [5.105704, -75.348629], [5.105442, -75.34876], [5.105285, -75.348938], [5.105155, -75.349033], [5.104932, -75.349261], [5.104779, -75.349495], [5.104508, -75.34933], [5.103978, -75.348729], [5.103759, -75.348513], [5.103375, -75.348273], [5.103136, -75.348139], [5.102799, -75.347862], [5.102658, -75.347678], [5.102492, -75.347569], [5.102066, -75.347585], [5.101072, -75.347508], [5.100984, -75.347564], [5.099398, -75.348613], [5.099243, -75.348765], [5.099132, -75.349009], [5.098838, -75.349053], [5.09845, -75.349031], [5.098207, -75.349094], [5.097979, -75.349243], [5.097805, -75.349523], [5.097615, -75.349523], [5.097357, -75.349577], [5.09722, -75.349495], [5.096958, -75.349373], [5.096864, -75.349138], [5.09656, -75.349051], [5.09633, -75.348814], [5.096153, -75.348685], [5.096024, -75.348432], [5.095831, -75.348274], [5.095611, -75.348211], [5.095428, -75.348015], [5.095177, -75.347759], [5.094751, -75.347305], [5.094477, -75.347215], [5.094313, -75.347068], [5.094455, -75.346848], [5.094469, -75.346684], [5.094377, -75.346585], [5.094263, -75.346437], [5.093909, -75.346295], [5.093652, -75.346159], [5.093553, -75.345844], [5.093345, -75.345511], [5.093002, -75.345198], [5.093398, -75.344981], [5.093701, -75.344473], [5.09392, -75.344057], [5.094046, -75.343712], [5.094396, -75.34359], [5.094349, -75.343371], [5.094819, -75.343134], [5.09511, -75.34325], [5.095316, -75.343108], [5.096069, -75.343015], [5.096802, -75.343118], [5.097129, -75.342751], [5.097467, -75.342528], [5.097654, -75.342633], [5.097729, -75.342528], [5.097951, -75.342484], [5.098179, -75.342552], [5.099008, -75.34209], [5.099867, -75.341738], [5.100521, -75.341553], [5.101044, -75.341518], [5.101288, -75.341539], [5.101419, -75.341257], [5.101532, -75.341282], [5.102666, -75.341688], [5.103551, -75.341571], [5.104246, -75.341305], [5.105772, -75.340705], [5.106574, -75.340416], [5.106965, -75.338614], [5.107163, -75.338441], [5.107362, -75.338312], [5.10796, -75.338336], [5.108913, -75.33777], [5.109045, -75.338016], [5.109124, -75.338321], [5.109269, -75.338371], [5.109486, -75.338317], [5.109695, -75.338416], [5.109917, -75.338514], [5.110036, -75.338582], [5.110172, -75.33874], [5.110232, -75.338916], [5.110357, -75.339029], [5.110564, -75.339076], [5.110734, -75.33921], [5.110874, -75.339347], [5.110968, -75.339622], [5.110904, -75.339985], [5.11084, -75.340206], [5.110681, -75.340378], [5.110559, -75.340709]];
const WATER_BOUNDARY = [[5.104687, -75.346831], [5.105082, -75.346836], [5.105408, -75.346752], [5.105681, -75.346653], [5.105711, -75.346905], [5.105853, -75.347117], [5.105973, -75.347238], [5.106039, -75.347331], [5.106061, -75.347419], [5.106038, -75.347559], [5.105965, -75.347638], [5.105909, -75.347754], [5.105886, -75.347855], [5.105837, -75.34793], [5.105713, -75.348046], [5.105653, -75.348194], [5.105651, -75.348354], [5.105689, -75.348415], [5.105363, -75.348381], [5.105097, -75.347573], [5.10493, -75.34722], [5.104687, -75.346831]];

const fincaPoly = L.polygon(FINCA_BOUNDARY, {
  color: '#38bdf8',
  dashArray: '6, 6',
  weight: 2.5,
  opacity: 0.85,
  fillColor: '#38bdf8',
  fillOpacity: 0.05
}).addTo(map);
fincaPoly.bindTooltip('Finca Bosques Marulanda (130 Ha) · Reg. Catastral #05C374BB854123F6A8A4', { permanent: true, direction: 'top', className: 'lot-label' });

const waterPoly = L.polygon(WATER_BOUNDARY, {
  color: '#06b6d4',
  weight: 2,
  opacity: 0.9,
  fillColor: '#06b6d4',
  fillOpacity: 0.25
}).addTo(map);
waterPoly.bindTooltip('💧 Nacimiento / Espejo de Agua Finca (Zona de Protección)', { permanent: false, direction: 'center', className: 'lot-label' });

map.fitBounds(L.featureGroup([...Object.values(lotLayers), fincaPoly]).getBounds());

function popupHTML(t) {
  const isFree = t.disponible !== false;
  const statusChip = isFree 
    ? '<span style="display:inline-block;padding:3px 8px;border-radius:6px;font-family:var(--mono);font-size:9.5px;font-weight:700;color:var(--em);background:rgba(16,185,129,0.12);border:1px solid rgba(52,211,153,0.35)">🟢 DISPONIBLE</span>'
    : '<span style="display:inline-block;padding:3px 8px;border-radius:6px;font-family:var(--mono);font-size:9.5px;font-weight:700;color:#f87171;background:rgba(248,113,113,0.12);border:1px solid rgba(248,113,113,0.35)">🔴 RESERVADO</span>';

  return '<div class="pp-photo" style="background-image:url(\'' + fotoArbol(t) + '\')"></div>' +
    '<div class="pp-body" style="padding:12px 14px">' +
    '<div style="display:flex;justify-content:space-between;align-items:center">' +
    '<div class="pp-id" style="font-family:var(--mono);font-size:10px;color:var(--em)">' + t.id + ' · FASE ' + t.lote + '</div>' +
    statusChip +
    '</div>' +
    '<div class="pp-name" style="font-size:15px;font-weight:800;margin-top:4px">' + t.sp + '</div>' +
    '<div class="pp-sci" style="font-size:11.5px;color:var(--mut);font-style:italic">' + t.sci + '</div>' +
    '<div style="margin-top:8px;padding:6px 9px;background:rgba(6,10,21,0.6);border:1px solid var(--line2);border-radius:6px;font-family:var(--mono);font-size:10.5px;color:#cbd5e1">' +
    '<b>Coordenadas GPS:</b><br>' +
    '<span style="color:' + (isFree ? 'var(--em)' : '#f87171') + '">' + t.lat.toFixed(6) + '° N, ' + t.lng.toFixed(6) + '° W</span>' +
    '</div>' +
    '<div style="margin-top:8px;font-size:11px;color:#c8d5ea;line-height:1.4">' +
    '🌱 <b>CO₂ a 40 años:</b> ' + t.co2_40 + ' t CO₂eq<br>' +
    '💧 <b>Agua regulada:</b> 1.450 m³/Ha/año<br>' +
    '☀️ <b>Trazabilidad Solar:</b> Sensor IoT Activo' +
    '</div>' +
    '<button onclick="showTreeModal(\'' + t.id + '\')" style="margin-top:10px;width:100%;padding:7px;border-radius:8px;border:1px solid ' + (isFree ? 'rgba(52,211,153,.4)' : 'rgba(248,113,113,.4)') + ';background:' + (isFree ? 'rgba(16,185,129,.12)' : 'rgba(248,113,113,.12)') + ';color:' + (isFree ? 'var(--em)' : '#f87171') + ';font-family:var(--mono);font-size:10.5px;font-weight:700;cursor:pointer">🔬 Ver Ficha Técnica Completa ↗</button>' +
    '</div>';
}

TREES.forEach(t => {
  const col = t.disponible !== false ? '#34d399' : '#f87171';
  const m = L.circleMarker([t.lat, t.lng], {
    radius: t.disponible !== false ? 5 : 6,
    fillColor: col,
    color: col,
    weight: t.disponible !== false ? 1 : 2,
    fillOpacity: .95
  });
  m.bindPopup(popupHTML(t));
  cluster.addLayer(m);
});

// Panel de control de Lotes / Fases
const lotGrid = document.getElementById('lotGrid');
const lotDetail = document.getElementById('lotDetail');
if (lotGrid) {
  LOTES.forEach(L => {
    const b = document.createElement('button');
    b.className = 'lot-btn';
    b.textContent = 'Fase ' + L.n;
    b.onclick = () => selectLote(L.n, true);
    lotGrid.appendChild(b);
    L.btn = b;
  });
}

function selectLote(n, fly) {
  LOTES.forEach(L => { if (L.btn) L.btn.classList.toggle('on', L.n === n); });
  const L = LOTES[n - 1];
  const co2_40yr = Math.round(L.ind * 0.42);
  const agua_40yr = Math.round(L.area * 1450);
  const co2_300yr = Math.round(co2_40yr * 7.5);
  const agua_300yr = Math.round(agua_40yr * 4.3);
  const autos_300yr = Math.round(co2_300yr * 0.22);
  const colFase = FASE_COLS[L.n];

  if (lotDetail) {
    lotDetail.innerHTML =
      '<div class="lot-card">' +
      '<div class="lot-head">' +
      '<div style="display:flex;justify-content:space-between;align-items:center"><span class="chip" style="background:' + colFase + '22;color:' + colFase + ';border:1px solid ' + colFase + '55">FASE OPERATIVA 0' + n + '</span><span style="font-family:var(--mono);font-size:10px;color:' + colFase + '">2.820 MSNM</span></div>' +
      '<div style="margin-top:18px; background:linear-gradient(165deg, rgba(6,10,21,0.9), rgba(13,21,42,0.95)); border:1px solid rgba(96,165,250,0.35); border-radius:18px; padding:18px 20px">' +
      '<div style="display:flex; justify-content:space-between; align-items:flex-start">' +
      '<div>' +
      '<div style="font-family:var(--mono); font-size:10.5px; font-weight:700; color:var(--bl2); letter-spacing:.08em; text-transform:uppercase">💧 REGULACIÓN HÍDRICA &amp; CARBONO TRICENTENARIO</div>' +
      '<div id="valFaseAgua" style="font-size:13.5px; color:var(--bl2); font-weight:700; margin-top:6px">💧 ' + agua_300yr.toLocaleString('es-CO') + ' m³/año regulados</div>' +
      '<div id="valFaseCo2" style="font-size:13.5px; color:var(--em); font-weight:700; margin-top:4px">🌱 ≈ ' + co2_300yr.toLocaleString('es-CO') + ' tCO₂eq capturadas</div>' +
      '</div>' +
      '<span id="tagFaseYear" style="font-family:var(--mono); font-size:10px; color:var(--bl2); background:rgba(59,130,246,0.12); border:1px solid rgba(96,165,250,0.3); padding:4px 8px; border-radius:6px">Fase ' + n + ' · 300 Años</span>' +
      '</div>' +

      '<div style="margin-top:14px; background:rgba(6,10,21,0.65); border:1px solid var(--line2); border-radius:12px; padding:10px 12px">' +
      '<div style="display:flex; justify-content:space-between; align-items:center">' +
      '<span style="font-family:var(--mono); font-size:10px; font-weight:700; color:var(--bl2)">🎚️ SIMULADOR TEMPORAL (1 A 300 AÑOS)</span>' +
      '<b id="lblFaseYear" style="font-size:13px; color:#fff; font-family:var(--mono)">Año 300</b>' +
      '</div>' +
      '<input type="range" id="rngFaseYear" min="1" max="300" value="300" step="1" oninput="updateFaseYearMetrics(' + n + ', this.value)" style="width:100%; accent-color:var(--bl2); cursor:pointer; margin-top:6px; height:6px">' +
      '<div style="display:flex; justify-content:space-between; font-family:var(--mono); font-size:9px; color:var(--mut2); margin-top:4px">' +
      '<span>Año 1</span><span>Año 40</span><span>Año 150</span><span>Año 220</span><span>Año 300</span>' +
      '</div>' +
      '</div>' +

      '<div style="margin-top:16px; position:relative; height:110px; width:100%">' +
      '<svg width="100%" height="100%" viewBox="0 0 320 100" preserveAspectRatio="none" style="overflow:visible">' +
      '<defs>' +
      '<linearGradient id="gradAgua" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#60a5fa" stop-opacity="0.35"/><stop offset="100%" stop-color="#60a5fa" stop-opacity="0"/></linearGradient>' +
      '<linearGradient id="gradCarbon" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#34d399" stop-opacity="0.25"/><stop offset="100%" stop-color="#34d399" stop-opacity="0"/></linearGradient>' +
      '</defs>' +
      '<line x1="0" y1="80" x2="320" y2="80" stroke="rgba(255,255,255,0.08)" stroke-dasharray="4"/>' +
      '<line x1="0" y1="45" x2="320" y2="45" stroke="rgba(255,255,255,0.08)" stroke-dasharray="4"/>' +
      '<path d="M0 80 Q80 50 160 28 T320 8 L320 85 L0 85 Z" fill="url(#gradCarbon)"/>' +
      '<path d="M0 80 Q80 50 160 28 T320 8" fill="none" stroke="#34d399" stroke-width="2"/>' +
      '<path d="M0 80 Q80 60 160 38 T320 18 L320 85 L0 85 Z" fill="url(#gradAgua)"/>' +
      '<path d="M0 80 Q80 60 160 38 T320 18" fill="none" stroke="#60a5fa" stroke-width="3"/>' +
      '<circle cx="80" cy="60" r="4" fill="#60a5fa"/><circle cx="160" cy="38" r="4" fill="#60a5fa"/><circle cx="320" cy="18" r="4" fill="#60a5fa"/>' +
      '<circle cx="80" cy="50" r="3.5" fill="#34d399"/><circle cx="160" cy="28" r="3.5" fill="#34d399"/><circle cx="320" cy="8" r="3.5" fill="#34d399"/>' +
      '</svg>' +
      '<div style="display:flex; justify-content:space-between; font-family:var(--mono); font-size:10px; color:var(--mut2); margin-top:6px">' +
      '<span>0</span><span>40 años</span><span>150 años</span><span>300 años</span>' +
      '</div>' +
      '</div>' +

      '<div style="margin-top:14px; background:rgba(6,10,21,0.5); border:1px solid var(--line2); border-radius:12px; padding:10px 14px">' +
      '<div style="display:flex; justify-content:space-between; font-size:12px; border-bottom:1px solid var(--line); padding-bottom:6px">' +
      '<span>Año 40</span><b style="color:var(--bl2)">' + agua_40yr.toLocaleString('es-CO') + ' m³ agua</b><b style="color:var(--em)">' + co2_40yr.toLocaleString('es-CO') + ' t CO₂</b>' +
      '</div>' +
      '<div style="display:flex; justify-content:space-between; font-size:12px; border-bottom:1px solid var(--line); padding:6px 0">' +
      '<span>Año 150</span><b style="color:var(--bl2)">' + Math.round(agua_300yr * 0.62).toLocaleString('es-CO') + ' m³ agua</b><b style="color:var(--em)">' + Math.round(co2_300yr * 0.52).toLocaleString('es-CO') + ' t CO₂</b>' +
      '</div>' +
      '<div style="display:flex; justify-content:space-between; font-size:12px; padding-top:6px">' +
      '<span>Año 300</span><b style="color:var(--bl2)">' + agua_300yr.toLocaleString('es-CO') + ' m³ agua</b><b style="color:var(--em)">' + co2_300yr.toLocaleString('es-CO') + ' t CO₂</b>' +
      '</div>' +
      '</div>' +

      '<div id="badgeFaseAutos" style="margin-top:12px; padding:10px 14px; background:rgba(16,185,129,0.08); border:1px solid rgba(52,211,153,0.25); border-radius:10px; font-size:12px; color:#d1fae5; text-align:center">' +
      '🚗 <b>Equivale a neutralizar las emisiones de ~' + autos_300yr.toLocaleString('es-CO') + ' automóviles/año</b>' +
      '</div>' +

      '<div style="margin-top:10px; font-size:10.5px; color:var(--mut2); line-height:1.45">' +
      'Metodología IPCC Tier 1-2 &amp; Estudio Nacional del Agua IDEAM. Estimación de potencial ecológico a 300 años.' +
      '</div>' +
      '</div>' +
      '</div>';
  }
  if (fly) map.flyToBounds(lotLayers[n].getBounds().pad(0.35), { duration: 1 });
}

function updateFaseYearMetrics(n, year) {
  const L = LOTES[n - 1];
  const co2_40yr = Math.round(L.ind * 0.42);
  const agua_40yr = Math.round(L.area * 1450);
  const yr = parseInt(year, 10);

  let ratioAgua = 1.0;
  let ratioCo2 = 1.0;
  if (yr <= 40) {
    ratioAgua = 0.20 + 0.80 * (yr / 40);
    ratioCo2 = Math.pow(yr / 40, 1.15);
  } else {
    const extraT = (yr - 40) / 260;
    ratioAgua = 1.0 + 3.3 * Math.pow(extraT, 0.85);
    ratioCo2 = 1.0 + 6.5 * Math.pow(extraT, 0.95);
  }

  const aguaCurr = Math.round(agua_40yr * ratioAgua);
  const co2Curr = Math.round(co2_40yr * ratioCo2);
  const autosCurr = Math.round(co2Curr * 0.22);

  const lblYear = document.getElementById('lblFaseYear');
  const tagYear = document.getElementById('tagFaseYear');
  const valAgua = document.getElementById('valFaseAgua');
  const valCo2 = document.getElementById('valFaseCo2');
  const badgeAutos = document.getElementById('badgeFaseAutos');

  if (lblYear) lblYear.textContent = 'Año ' + yr;
  if (tagYear) tagYear.textContent = 'Fase ' + n + ' · ' + yr + ' Año' + (yr > 1 ? 's' : '');
  if (valAgua) valAgua.innerHTML = '💧 ' + aguaCurr.toLocaleString('es-CO') + ' m³/año regulados';
  if (valCo2) valCo2.innerHTML = '🌱 ≈ ' + co2Curr.toLocaleString('es-CO') + ' tCO₂eq capturadas';
  if (badgeAutos) badgeAutos.innerHTML = '🚗 <b>Equivale a neutralizar las emisiones de ~' + autosCurr.toLocaleString('es-CO') + ' automóviles/año</b>';
}

selectLote(1, false);

// Tabs y Buscador del Panel Geovisor
const tabL = document.getElementById('tabLotes'), tabA = document.getElementById('tabArboles');
const bodyL = document.getElementById('bodyLotes'), bodyA = document.getElementById('bodyArboles');
if (tabL && tabA) {
  tabL.onclick = () => { tabL.classList.add('on'); tabA.classList.remove('on'); bodyL.style.display = 'block'; bodyA.style.display = 'none'; };
  tabA.onclick = () => { tabA.classList.add('on'); tabL.classList.remove('on'); bodyA.style.display = 'block'; bodyL.style.display = 'none'; applyFilters(); };
}

const fLote = document.getElementById('fLote');
if (fLote) {
  LOTES.forEach(L => { const o = document.createElement('option'); o.value = L.n; o.textContent = 'Fase ' + L.n + ' (' + L.area + ' Ha)'; fLote.appendChild(o); });
}

const fUicn = document.getElementById('fUicn'), fTipo = document.getElementById('fTipo'), fFito = document.getElementById('fFito'), fDisp = document.getElementById('fDisp'), qSearch = document.getElementById('qSearch');
const resList = document.getElementById('resList'), resNum = document.getElementById('resNum');
let debounce;

function applyFilters() {
  if (!resList || !resNum) return;
  const q = qSearch ? qSearch.value.trim().toLowerCase() : '', lo = fLote ? fLote.value : '', ui = fUicn ? fUicn.value : '', ti = fTipo ? fTipo.value : '', fi = fFito ? fFito.value : '', di = fDisp ? fDisp.value : '';
  const out = TREES.filter(t =>
    (!lo || t.lote === +lo) && (!ui || t.uicn === ui) && (!ti || t.tipo === ti) && (!fi || t.fito === fi) &&
    (!di || (di === 'libre' ? t.disponible !== false : t.disponible === false)) &&
    (!q || t.id.toLowerCase().includes(q) || t.sp.toLowerCase().includes(q) || t.sci.toLowerCase().includes(q)));
  resNum.textContent = out.length.toLocaleString('es-CO');
  const show = out.slice(0, 60);
  resList.innerHTML = show.length ? show.map(t =>
    '<div class="res-item" onclick="goTree(\'' + t.id + '\')">' +
    '<span class="res-dot" style="background:' + (t.disponible !== false ? '#34d399' : '#f87171') + ';color:' + (t.disponible !== false ? '#34d399' : '#f87171') + '"></span>' +
    '<div><div class="res-id">' + t.id + ' <span style="font-size:9.5px;color:' + (t.disponible !== false ? 'var(--em)' : '#f87171') + '">(' + (t.disponible !== false ? 'Libre' : 'Reservado') + ')</span></div><div class="res-sp">' + t.sp + ' · <i>' + t.sci + '</i></div></div>' +
    '<div class="res-dap">Fase<b>' + t.lote + '</b></div></div>').join('')
    : '<div class="empty">Sin individuos que coincidan.</div>';
}

window.goTree = function (id) {
  const t = TREES.find(x => x.id === id); if (!t) return;
  map.closePopup(); map.flyTo([t.lat, t.lng], 18, { duration: 1.1 });
  showTreeModal(id);
};

if (qSearch) [qSearch].forEach(el => el.addEventListener('input', () => { clearTimeout(debounce); debounce = setTimeout(applyFilters, 220); }));
if (fLote) [fLote, fUicn, fTipo, fFito, fDisp].forEach(el => { if (el) el.addEventListener('change', applyFilters); });

const btnClear = document.getElementById('btnClear');
if (btnClear) btnClear.onclick = () => { if (qSearch) qSearch.value = ''; if (fLote) fLote.value = ''; if (fUicn) fUicn.value = ''; if (fTipo) fTipo.value = ''; if (fFito) fFito.value = ''; if (fDisp) fDisp.value = ''; applyFilters(); };

applyFilters();

const btSat = document.getElementById('btSat'), btMap = document.getElementById('btMap');
if (btSat && btMap) {
  btSat.onclick = () => { map.removeLayer(osm); map.addLayer(esri); esri.bringToBack(); btSat.classList.add('on'); btMap.classList.remove('on'); };
  btMap.onclick = () => { map.removeLayer(esri); map.addLayer(osm); osm.bringToBack(); btMap.classList.add('on'); btSat.classList.remove('on'); };
}

const btnOverview = document.getElementById('btnOverview');
if (btnOverview) {
  btnOverview.onclick = () => {
    map.closePopup();
    const boundsGroup = [];
    if (typeof lotLayers !== 'undefined') {
      Object.values(lotLayers).forEach(lyr => { if (lyr) boundsGroup.push(lyr); });
    }
    if (typeof fincaPoly !== 'undefined' && fincaPoly) {
      boundsGroup.push(fincaPoly);
    }
    if (boundsGroup.length > 0) {
      const b = L.featureGroup(boundsGroup).getBounds();
      map.flyToBounds(b.pad(0.15), { duration: 1.25 });
    }
    LOTES.forEach(L => { if (L.btn) L.btn.classList.remove('on'); });
    selectLote(1, false);
  };
}
