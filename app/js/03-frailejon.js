// ==========================================================================
// MÓDULO JS 03: CICLO DE VIDA DIDÁCTICO DEL FRAILEJÓN (SLIDER 300 AÑOS)
// Explicación: Controla la representación botánica de Espeletia grandiflora
// a lo largo de 3 siglos: crecimiento del tallo de necromasa, roseta foliar,
// gotas de condensación, flujo de acuíferos subterráneos y cota de altura.
// ==========================================================================

const rngFrailejonAge = document.getElementById('rngFrailejonAge');

function updateFrailejonGrowthVisual(age) {
  const altCm = 15 + (age - 1) * 2.6;
  const agua  = Math.round(180 + age * 12.5);
  const co2   = (0.01 + age * 0.0085).toFixed(2);
  const flor  = age >= 15 ? 'Floración Activa (Alta Montaña)' : 'En Desarrollo';

  const el = id => document.getElementById(id);
  if (el('txtAgeYear'))   el('txtAgeYear').textContent  = 'Año ' + age;
  if (el('valFrailAlt'))  el('valFrailAlt').textContent = altCm >= 100 ? (altCm / 100).toFixed(2) + ' m' : Math.round(altCm) + ' cm';
  if (el('valFrailAgua')) el('valFrailAgua').textContent= agua.toLocaleString('es-CO') + ' L/año';
  if (el('valFrailCo2'))  el('valFrailCo2').textContent = co2 + ' t CO₂';
  if (el('valFrailFlor')) el('valFrailFlor').textContent= flor;

  let title = 'Año 1 · Germinación en Vivero';
  let desc  = 'Roseta juvenil de 15 cm. Las tricotomas afelpadas interceptan microgotas de neblina y las filtran hacia el suelo Andisol.';
  if (age > 5 && age <= 40) {
    title = 'Año ' + age + ' · Frailejón Juvenil de Páramo';
    desc  = 'Crecimiento de 1.5 cm/año. La falda de hojas secas (necromasa) aísla el tallo del frío extremo y canaliza el agua hacia las raíces.';
  } else if (age > 40 && age <= 150) {
    title = 'Año ' + age + ' · Roseta Adulta Madura';
    desc  = 'Alta interceptación de neblina (~' + agua.toLocaleString('es-CO') + ' L/año). El agua filtrada recarga los mantos acuíferos del río Guarinó.';
  } else if (age > 150) {
    title = 'Año ' + age + ' · Guardián Tricentenario (' + (altCm / 100).toFixed(1) + ' m)';
    desc  = 'Ejemplar tricentenario ancestral. Capta miles de litros de neblina al año e inmoviliza carbono durable en suelos Histosoles.';
  }
  if (el('frailStageTitle')) el('frailStageTitle').textContent = title;
  if (el('frailStageDesc'))  el('frailStageDesc').textContent  = desc;

  // Tallo / Necromasa SVG
  const stemH = Math.max(6,  Math.min(130, ((altCm - 15) / 780) * 130));
  const stemW = Math.max(16, Math.min(30,  16 + (age / 300) * 14));

  const stemRect = el('frailStemRect');
  if (stemRect) {
    stemRect.setAttribute('x', -(stemW / 2));
    stemRect.setAttribute('y', -stemH);
    stemRect.setAttribute('width',  stemW);
    stemRect.setAttribute('height', stemH);
  }

  const stemLayers = el('frailStemLayers');
  if (stemLayers) {
    let html = '';
    const n = Math.floor(stemH / 5.5);
    for (let i = 0; i < n; i++) {
      const y = -(i * 5.5 + 3);
      const w = stemW + (i % 2 === 0 ? 4 : 2);
      html += `<path d="M ${-w / 2} ${y} Q 0 ${y + 3.5} ${w / 2} ${y}" stroke="#543924" stroke-width="2.2" fill="none" opacity="0.85"/>`;
    }
    stemLayers.innerHTML = html;
  }

  // Roseta foliar SVG
  const crownY     = -stemH;
  const crownScale = 0.5 + Math.min(1.0, age / 120) * 0.7;
  const crownGroup = el('frailCrownGroup');
  if (crownGroup) {
    crownGroup.setAttribute('transform', `translate(0, ${crownY}) scale(${crownScale})`);
  }

  // Gotas de condensación
  const condense = el('condenseGroup');
  if (condense) {
    const drops = condense.querySelectorAll('circle');
    const speedFactor = Math.max(0.5, 2.4 - (age / 300) * 1.8);
    drops.forEach((d, i) => {
      d.style.animationDuration = (speedFactor + i * 0.3) + 's';
    });
  }

  // Hilos acuíferos
  const aquifer = el('aquiferGroup');
  if (aquifer) {
    const lines = aquifer.querySelectorAll('line');
    const aqSpeed = Math.max(0.6, 1.6 - (age / 300) * 1.0);
    lines.forEach((ln, i) => {
      ln.style.animationDuration = (aqSpeed + i * 0.15) + 's';
    });
  }

  // Cota de altura dinámica
  const heightLine    = el('frailHeightLineReal');
  const heightBadge   = el('frailHeightBadgeReal');
  const heightBadgeTxt= el('frailHeightBadgeTxtReal');

  if (heightLine) {
    const altPx = Math.max(20, Math.min(165, 20 + (age / 300) * 145));
    heightLine.setAttribute('y1', '0');
    heightLine.setAttribute('y2', -altPx);
    if (heightBadge && heightBadgeTxt) {
      heightBadge.setAttribute('transform', `translate(0, ${-altPx})`);
      heightBadgeTxt.textContent = altCm >= 100 ? (altCm / 100).toFixed(2) + ' m' : Math.round(altCm) + ' cm';
    }
  }
}

if (rngFrailejonAge) {
  rngFrailejonAge.addEventListener('input', () => {
    const age = parseInt(rngFrailejonAge.value) || 1;
    updateFrailejonGrowthVisual(age);
  });
  updateFrailejonGrowthVisual(parseInt(rngFrailejonAge.value) || 1);
}
