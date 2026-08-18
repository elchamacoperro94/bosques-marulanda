// ==========================================================================
// MÓDULO JS 06: MOTOR DE ZOOM SATELITAL HD (5 PASOS SCROLL PLANETA)
// Explicación: Controla la cámara Leaflet en el contenedor sticky del globo satelital.
// Transiciona suavemente la latitud, longitud y nivel de zoom desde el Planeta Tierra
// (Global) hasta Colombia, Eje Cafetero, Caldas y el lote en Marulanda a 2.820 msnm.
// ==========================================================================

(function initSatZoom() {
  const mapEl = document.getElementById('satZoomMap');
  if (!mapEl || typeof L === 'undefined') return;

  const satMap = L.map('satZoomMap', {
    zoomControl: false, attributionControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false, touchZoom: false, boxZoom: false, keyboard: false
  });

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19 }).addTo(satMap);

  const STAGES = [
    { lat: 15.0, lng: -60.0, zoom: 3.2, title: '1. Perspectiva Satelital Global', sub: 'Fotografía satelital en alta definición desde el espacio exterior.', badge: 'Planeta Tierra · Cobertura Global' },
    { lat: 4.5709, lng: -74.2973, zoom: 6.5, title: '2. Aproximación Satelital: Colombia', sub: 'Encuadre del territorio nacional de la República de Colombia en América del Sur.', badge: 'República de Colombia · Lat: 4.571° N, Lng: -74.297° W' },
    { lat: 4.8138, lng: -75.6961, zoom: 8.8, title: '3. Aproximación Satelital: Eje Cafetero', sub: 'Descendiendo sobre la región del Eje Cafetero (Caldas, Risaralda, Quindío) en los Andes.', badge: 'Región Eje Cafetero · Cordillera Central' },
    { lat: 5.0689, lng: -75.5174, zoom: 11.2, title: '4. Aproximación Satelital: Caldas', sub: 'Foco geográfico en el Departamento de Caldas y zona centro-oriente.', badge: 'Departamento de Caldas · Zona Centro-Oriente' },
    { lat: 5.0972, lng: -75.3444, zoom: 14.8, title: '5. Aproximación Satelital: Marulanda', sub: 'Llegada al Santuario de Frailejones: Páramo de Marulanda · 2.820 msnm · 60 Ha · 96.000 árboles (Reg: 05C374BB854123F6A8A4).', badge: 'Municipio de Marulanda · 5°05\'49.9"N, 75°20\'40.0"W' }
  ];

  satMap.setView([STAGES[0].lat, STAGES[0].lng], STAGES[0].zoom);

  const highlightStyle = { color: '#34d399', weight: 2.5, fillColor: '#10b981', fillOpacity: 0.15, dashArray: '6, 6' };
  const colHighlight = L.circle([4.5709, -74.2973], { ...highlightStyle, radius: 280000 }).addTo(satMap);
  const ejeHighlight = L.circle([4.8138, -75.6961], { ...highlightStyle, radius: 55000 }).addTo(satMap);
  const caldasHighlight = L.circle([5.0689, -75.5174], { ...highlightStyle, radius: 24000 }).addTo(satMap);
  const marulandaHighlight = L.circle([5.0972, -75.3444], { ...highlightStyle, radius: 3800 }).addTo(satMap);

  const globeSec = document.getElementById('globo');
  const globeSticky = document.querySelector('.globe-sticky');
  const titleEl = document.getElementById('globeTitle');
  const subEl = document.getElementById('globeSub');
  const pinTxtEl = document.getElementById('globePinTxt');

  function interpolate(a, b, t) { return a + (b - a) * t; }

  function onScrollSat() {
    if (!globeSec || !globeSticky) return;
    const rect = globeSec.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    if (total <= 0) return;
    const progress = Math.max(0, Math.min(1, -rect.top / total));

    let curLat, curLng, curZoom, curStage, stageIdx = 0;

    if (progress <= 0.2) {
      const t = progress / 0.2;
      curLat = interpolate(STAGES[0].lat, STAGES[1].lat, t);
      curLng = interpolate(STAGES[0].lng, STAGES[1].lng, t);
      curZoom = interpolate(STAGES[0].zoom, STAGES[1].zoom, t);
      curStage = t > 0.4 ? STAGES[1] : STAGES[0];
      stageIdx = t > 0.4 ? 1 : 0;
    } else if (progress <= 0.4) {
      const t = (progress - 0.2) / 0.2;
      curLat = interpolate(STAGES[1].lat, STAGES[2].lat, t);
      curLng = interpolate(STAGES[1].lng, STAGES[2].lng, t);
      curZoom = interpolate(STAGES[1].zoom, STAGES[2].zoom, t);
      curStage = STAGES[2];
      stageIdx = 2;
    } else if (progress <= 0.6) {
      const t = (progress - 0.4) / 0.2;
      curLat = interpolate(STAGES[2].lat, STAGES[3].lat, t);
      curLng = interpolate(STAGES[2].lng, STAGES[3].lng, t);
      curZoom = interpolate(STAGES[2].zoom, STAGES[3].zoom, t);
      curStage = STAGES[3];
      stageIdx = 3;
    } else if (progress <= 0.82) {
      const t = (progress - 0.6) / 0.22;
      curLat = interpolate(STAGES[3].lat, STAGES[4].lat, t);
      curLng = interpolate(STAGES[3].lng, STAGES[4].lng, t);
      curZoom = interpolate(STAGES[3].zoom, STAGES[4].zoom, t);
      curStage = STAGES[4];
      stageIdx = 4;
    } else {
      curLat = STAGES[4].lat; curLng = STAGES[4].lng; curZoom = STAGES[4].zoom; curStage = STAGES[4]; stageIdx = 4;
    }

    satMap.setView([curLat, curLng], curZoom, { animate: false });

    colHighlight.setStyle({ opacity: stageIdx === 1 ? 0.9 : 0.1, fillOpacity: stageIdx === 1 ? 0.2 : 0.02 });
    ejeHighlight.setStyle({ opacity: stageIdx === 2 ? 0.95 : 0.1, fillOpacity: stageIdx === 2 ? 0.22 : 0.02 });
    caldasHighlight.setStyle({ opacity: stageIdx === 3 ? 0.95 : 0.1, fillOpacity: stageIdx === 3 ? 0.25 : 0.02 });
    marulandaHighlight.setStyle({ opacity: stageIdx >= 4 ? 1.0 : 0.1, fillOpacity: stageIdx >= 4 ? 0.3 : 0.02 });

    if (titleEl && curStage) {
      titleEl.textContent = curStage.title;
      subEl.textContent = curStage.sub;
      pinTxtEl.textContent = curStage.badge;
    }

    if (progress > 0.82) {
      globeSticky.style.opacity = Math.max(0, (1 - progress) / 0.18);
    } else {
      globeSticky.style.opacity = 1;
    }
  }

  window.addEventListener('scroll', onScrollSat, { passive: true });
})();
