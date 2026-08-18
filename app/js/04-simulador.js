// ==========================================================================
// MÓDULO JS 04: CALCULADORA B2B LEY 2173 & GRÁFICA EN VIVO CHART.JS
// Explicación: Calcula la obligación corporativa (2 árboles / empleado / año),
// la inversión comercial ($150k/$270k), el beneficio tributario E.T. Art. 257-2
// y actualiza en tiempo real el gráfico de impacto de carbono y agua a 300 años.
// ==========================================================================

let calcChartInstance = null;
const empInput = document.getElementById('empCount');
const empRange = document.getElementById('empRange');

function initCalcChart() {
  const canvas = document.getElementById('calcChartCanvas');
  if (!canvas || typeof Chart === 'undefined') return;

  const ctx = canvas.getContext('2d');
  calcChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['1 Año', '20 Años', '50 Años', '150 Años', '300 Años'],
      datasets: [
        {
          label: 'Carbono Acumulado (t CO₂eq)',
          data: [13, 84, 168, 650, 1260],
          borderColor: '#34d399',
          backgroundColor: 'rgba(52, 211, 153, 0.15)',
          fill: true,
          tension: 0.38,
          borderWidth: 2.5
        },
        {
          label: 'Agua Regulada (m³ / año)',
          data: [58, 319, 580, 1550, 2494],
          borderColor: '#60a5fa',
          backgroundColor: 'rgba(96, 165, 250, 0.08)',
          fill: true,
          tension: 0.38,
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' } }
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', font: { family: 'Space Grotesk' } } },
        y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', font: { family: 'Space Grotesk' } } }
      }
    }
  });
}

function updateCalc() {
  if (!empInput) return;
  const emp = Math.max(1, parseInt(empInput.value) || 0);
  if (empRange && empRange.value != emp) empRange.value = Math.min(2500, emp);

  const arboles = emp * 2;
  const basico = arboles * 150000;
  const premium = arboles * 270000;
  const co2_40yr = Math.round(arboles * 0.42);
  const co2_300yr = Math.round(arboles * 3.15);
  const agua_yr = Math.round((arboles / 1100) * 1450);
  const agua_300yr = Math.round(agua_yr * 4.3);
  const taxBenefit = Math.round(basico * 0.25);

  const totalCap = 66000;
  const assignedBase = 18420;
  const newTotalAssigned = assignedBase + arboles;
  const avail = Math.max(0, totalCap - newTotalAssigned);
  const capPct = ((newTotalAssigned / totalCap) * 100).toFixed(1);
  const shareOfAvail = ((arboles / (totalCap - assignedBase)) * 100).toFixed(2);

  if (document.getElementById('resArboles')) document.getElementById('resArboles').textContent = arboles.toLocaleString('es-CO');
  if (document.getElementById('resAgua'))    document.getElementById('resAgua').textContent = agua_yr.toLocaleString('es-CO') + ' m³';
  if (document.getElementById('resBasico'))  document.getElementById('resBasico').textContent = '$' + basico.toLocaleString('es-CO');
  if (document.getElementById('resPremium')) document.getElementById('resPremium').textContent = '$' + premium.toLocaleString('es-CO');
  if (document.getElementById('resTax'))     document.getElementById('resTax').textContent = '$' + taxBenefit.toLocaleString('es-CO') + ' COP';
  if (document.getElementById('resQr'))      document.getElementById('resQr').textContent = emp.toLocaleString('es-CO') + ' Códigos QR Personalizados';

  if (document.getElementById('resCapPct'))    document.getElementById('resCapPct').textContent = avail.toLocaleString('es-CO') + ' Árboles Disponibles (' + (100 - capPct).toFixed(1) + '% libre)';
  if (document.getElementById('resQuoteShare'))document.getElementById('resQuoteShare').textContent = shareOfAvail + '%';
  
  const capBarFill = document.getElementById('capBarFill');
  if (capBarFill) capBarFill.style.width = Math.min(100, capPct) + '%';

  if (calcChartInstance) {
    calcChartInstance.data.datasets[0].data = [
      Math.round(co2_40yr * 0.08),
      Math.round(co2_40yr * 0.5),
      co2_40yr,
      Math.round(co2_300yr * 0.52),
      co2_300yr
    ];
    calcChartInstance.data.datasets[1].data = [
      Math.round(agua_yr * 0.1),
      Math.round(agua_yr * 0.55),
      agua_yr,
      Math.round(agua_300yr * 0.62),
      agua_300yr
    ];
    calcChartInstance.update();
  }
}

if (empInput) {
  empInput.addEventListener('input', updateCalc);
}
if (empRange) {
  empRange.addEventListener('input', () => {
    empInput.value = empRange.value;
    updateCalc();
  });
}

setTimeout(() => {
  initCalcChart();
  updateCalc();
}, 250);
