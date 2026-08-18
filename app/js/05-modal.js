// ==========================================================================
// MÓDULO JS 05: SISTEMA DE MODALES INTERACTIVOS Y FICHAS TÉCNICAS
// Explicación: Gestiona la apertura y cierre de modales para detalles
// de capacidad, paquetes comerciales, modelo financiero, ficha científica por árbol,
// cotizador B2B personalizado y vista previa del certificado oficial Ley 2173.
// ==========================================================================

function openModal() {
  const m = document.getElementById('modalOv');
  if (m) m.classList.add('show');
}
function closeModal() {
  const m = document.getElementById('modalOv');
  if (m) m.classList.remove('show');
}

function showStatModal(type) {
  const b = document.getElementById('mBodyContent');
  if (!b) return;

  if (type === 1) {
    b.innerHTML =
      '<div style="margin-top:10px"><span class="badge"><span class="dot"></span>Capacidad de Siembra &amp; Área de Vida</span></div>' +
      '<div class="m-title" style="margin-top:12px">Capacidad Técnica: 96.000 Individuos (60 Ha)</div>' +
      '<div class="m-sci">Santuario de Frailejones · Marulanda, Caldas (2.820 msnm)</div>' +
      '<div class="m-note" style="margin-top:16px;background:rgba(16,185,129,.06);border-color:rgba(52,211,153,.3);color:#d1fae5">' +
      '<b>Explicación del Indicador:</b><br>' +
      'El proyecto abarca <b>60 Hectáreas productivas</b> declaradas oficialmente como Área de Vida para el cumplimiento corporativo de la <b>Ley 2173 de 2021</b>. Con una densidad agronómica de 1.600 árboles por hectárea, la finca tiene capacidad para albergar <b>96.000 frailejones (<i>Espeletia</i>)</b> y especies nativas de páramo divididas en 3 Fases operativas.' +
      '</div>' +
      '<div class="m-sec"><div class="m-sec-t">Desglose de Áreas &amp; Capacidad</div>' +
      '<div class="m-grid">' +
      '<div class="m-cell"><div class="k">Área Finca Total</div><div class="v">130 <span class="u">Ha</span></div></div>' +
      '<div class="m-cell"><div class="k">Área Ley 2173</div><div class="v">60 <span class="u">Ha</span></div></div>' +
      '<div class="m-cell"><div class="k">Densidad Siembras</div><div class="v">1.600 <span class="u">árb/Ha</span></div></div>' +
      '<div class="m-cell"><div class="k">Capacidad Árboles</div><div class="v">96.000 <span class="u">ind</span></div></div>' +
      '<div class="m-cell"><div class="k">Altitud Páramo</div><div class="v">2.820 <span class="u">msnm</span></div></div>' +
      '<div class="m-cell"><div class="k">Supervivencia Est.</div><div class="v">&gt; 92<span class="u">%</span></div></div>' +
      '</div></div>';
  } else if (type === 2) {
    b.innerHTML =
      '<div style="margin-top:10px"><span class="badge"><span class="dot"></span>Precios por Árbol &amp; Tarifas Corporativas</span></div>' +
      '<div class="m-title" style="margin-top:12px">Paquetes Empresariales ($150k / $270k COP)</div>' +
      '<div class="m-sci">Cumplimiento Integral de la Ley 2173 de 2021 &amp; Res. 1491/2025</div>' +
      '<div class="m-note" style="margin-top:16px;background:rgba(59,130,246,.06);border-color:rgba(96,165,250,.3);color:#e0f2fe">' +
      '<b>Explicación de las Tarifas:</b><br>' +
      '<b>🌱 Paquete Básico ($150.000 COP / árbol):</b> Cubre la obligación ambiental legal. Incluye plántula ICA certificada, siembra profesional en Marulanda, 2 años de mantenimiento/reposición, georreferenciación GPS y registro en la plataforma del MADS.<br><br>' +
      '<b>⭐ Paquete Premium ($270.000 COP / árbol):</b> Solución RSE de alto nivel. Añade <b>Código QR personalizado por empleado</b>, <b>App móvil de seguimiento digital</b>, certificado de estimación de captura CO₂ a 40 años, kit físico enmarcado y jornada presencial en finca.' +
      '</div>';
  } else if (type === 3) {
    b.innerHTML =
      '<div style="margin-top:10px"><span class="badge"><span class="dot"></span>Retorno Inversionista &amp; Modelo Financiero</span></div>' +
      '<div class="m-title" style="margin-top:12px">Escenario B: TIR 35% · Payback 2.5 Años</div>' +
      '<div class="m-sci">Financiación Mixta: Capital Propio ($600M) + Finagro ($400M) + iNNpulsa ($80M)</div>' +
      '<div class="m-note" style="margin-top:16px;background:rgba(251,191,36,.06);border-color:rgba(251,191,36,.3);color:#fef3c7">' +
      '<b>Explicación del Modelo Financiero:</b><br>' +
      'Proyección económica basada en la venta de cuotas ambientales a medianas y grandes empresas de Colombia obligadas por la Ley 2173. Genera un flujo de caja operativo con <b>TIR del 35%</b>, recuperación de capital en <b>2.5 años</b> y un múltiplo sobre la inversión <b>MOIC de 4.8x</b>.' +
      '</div>' +
      '<div class="m-sec"><div class="m-sec-t">Métricas Clave de Inversión</div>' +
      '<div class="m-grid">' +
      '<div class="m-cell"><div class="k">Capital Propio</div><div class="v">$600M</div></div>' +
      '<div class="m-cell"><div class="k">Crédito Finagro</div><div class="v">$400M</div></div>' +
      '<div class="m-cell"><div class="k">iNNpulsa CoFin</div><div class="v">$80M</div></div>' +
      '<div class="m-cell"><div class="k">TIR Retorno</div><div class="v">35%</div></div>' +
      '<div class="m-cell"><div class="k">Periodo Payback</div><div class="v">2.5 Años</div></div>' +
      '<div class="m-cell"><div class="k">Múltiplo MOIC</div><div class="v">4.8x</div></div>' +
      '</div></div>';
  }
  openModal();
}

function showTreeModal(treeId) {
  const t = TREES.find(x => x.id === treeId);
  if (!t) return;
  const b = document.getElementById('mBodyContent');
  if (!b) return;

  b.innerHTML =
    '<div style="margin-top:10px"><span class="badge"><span class="dot"></span>Ficha Técnica Científica Oficial</span></div>' +
    '<div class="m-title" style="margin-top:10px">' + t.id + ' · ' + t.sp + '</div>' +
    '<div class="m-sci">' + t.sci + ' — Ecosistema de Páramo (2.820 msnm)</div>' +
    '<div class="pp-badges" style="margin-top:10px;display:flex;gap:8px">' +
    '<span class="pp-badge" style="color:' + UICN_COL[t.uicn] + ';border:1px solid ' + UICN_COL[t.uicn] + '66;background:' + UICN_COL[t.uicn] + '14;padding:4px 10px;border-radius:6px;font-size:11px;font-family:var(--mono)">UICN ' + t.uicn + '</span>' +
    '<span class="pp-badge" style="color:#34d399;border:1px solid #34d39966;background:#10b98114;padding:4px 10px;border-radius:6px;font-size:11px;font-family:var(--mono)">MARULANDA, CALDAS</span>' +
    '</div>' +

    '<div class="m-sec"><div class="m-sec-t">Mediciones Dasométricas de Campo</div>' +
    '<div class="m-grid">' +
    '<div class="m-cell"><div class="k">Fase / Lote</div><div class="v">Fase ' + t.lote + '</div></div>' +
    '<div class="m-cell"><div class="k">Diámetro DAP</div><div class="v">' + t.dap + ' <span class="u">cm</span></div></div>' +
    '<div class="m-cell"><div class="k">Altura Total</div><div class="v">' + t.alt + ' <span class="u">m</span></div></div>' +
    '<div class="m-cell"><div class="k">Estado Fito.</div><div class="v" style="color:#34d399">' + t.fito + '</div></div>' +
    '<div class="m-cell"><div class="k">Coordenada N</div><div class="v" style="font-size:12px">' + t.lat.toFixed(4) + '° N</div></div>' +
    '<div class="m-cell"><div class="k">Coordenada W</div><div class="v" style="font-size:12px">' + t.lng.toFixed(4) + '° W</div></div>' +
    '</div></div>' +

    '<div class="m-sec"><div class="m-sec-t">Servicios Ecosistémicos &amp; Monitoreo Certificado</div>' +
    '<div style="display:flex;flex-direction:column;gap:10px;margin-top:10px">' +

    '<div class="pillar-card">' +
    '<div class="pillar-head"><span class="pillar-tag">🌱 MÓDULO 1: CARBONO ORGÁNICO</span></div>' +
    '<div class="pillar-val">' + t.co2_40 + ' <span>t CO₂eq / árbol a 40 años (462 t CO₂eq/Ha)</span></div>' +
    '<div class="pillar-desc">Captura acumulada en biomasa foliar/tallo y fijación duradera en suelos Andisoles/Histosoles de alta montaña debido a la baja tasa de respiración microbiana en clima frío.</div>' +
    '<div class="pillar-src"><b>[Fuente Metodológica]</b> IPCC 2019 Refinement Tier 2 · Norma Técnica Colombiana NTC 6260 (MADS)</div>' +
    '</div>' +

    '<div class="pillar-card">' +
    '<div class="pillar-head"><span class="pillar-tag bl">💧 MÓDULO 2: REGULACIÓN HÍDRICA</span></div>' +
    '<div class="pillar-val">1.450 <span>m³ de agua regulada / Ha / año</span></div>' +
    '<div class="pillar-desc">Interceptación foliar de precipitación horizontal (neblina andina) por la pubescencia de <i>Espeletia</i>, incrementando un 30% la recarga del acuífero y alimentando caudales base en la cuenca del río Guarinó.</div>' +
    '<div class="pillar-src"><b class="bl">[Fuente Científica]</b> IDEAM · Estudio Nacional del Agua &amp; Instituto de Investigación Alexander von Humboldt</div>' +
    '</div>' +

    '<div class="pillar-card">' +
    '<div class="pillar-head"><span class="pillar-tag am">☀️ MÓDULO 3: TRAZABILIDAD SOLAR IoT</span></div>' +
    '<div class="pillar-val">Telemetría GPS <span>100% Autónoma Solar</span></div>' +
    '<div class="pillar-desc">Nodo de monitoreo digital alimentado por micro-paneles solares fotovoltaicos para transmisión de datos de humedad, temperatura y validación corporativa de la Ley 2173.</div>' +
    '<div class="pillar-src"><b class="am">[Normativa Oficial]</b> Resolución 1491 de 2025 del Ministerio de Ambiente (MADS)</div>' +
    '</div>' +

    '</div></div>';
  openModal();
}

window.showQuoteModal = function(tipo) {
  const b = document.getElementById('mBodyContent');
  if (!b) return;
  b.innerHTML =
    '<div style="margin-top:10px"><span class="badge"><span class="dot"></span>Cotización Personalizada Ley 2173</span></div>' +
    '<div class="m-title" style="margin-top:12px">Solicitud de Propuesta Comercial · Paquete ' + tipo + '</div>' +
    '<div class="m-sci">Santuario de Frailejones · Marulanda, Caldas (2.820 msnm)</div>' +
    '<div style="margin-top:16px;background:rgba(6,10,21,0.6);border:1px solid var(--line2);border-radius:14px;padding:18px">' +
    '<div style="margin-bottom:12px"><label style="font-family:var(--mono);font-size:11px;color:var(--em);display:block;margin-bottom:4px">RAZÓN SOCIAL DE TU EMPRESA</label><input type="text" id="qEmpName" placeholder="Ej: Grupo Bancolombia SAS" style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--line2);background:rgba(15,23,42,0.8);color:#fff;font-family:var(--font-main)"></div>' +
    '<div style="margin-bottom:12px"><label style="font-family:var(--mono);font-size:11px;color:var(--em);display:block;margin-bottom:4px">NÚMERO DE EMPLEADOS</label><input type="number" id="qEmpQty" value="200" style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--line2);background:rgba(15,23,42,0.8);color:#fff;font-family:var(--mono);font-weight:700"></div>' +
    '<div style="padding:12px;background:rgba(16,185,129,0.08);border:1px solid rgba(52,211,153,0.25);border-radius:10px;font-size:12.5px;color:#d1fae5">' +
    '<b>Árboles a sembrar:</b> <span id="qArbolesTxt">400 frailejones</span><br>' +
    '<b>Valor estimado:</b> <span id="qValorTxt">' + (tipo === 'Básico' ? '$60.000.000 COP' : '$108.000.000 COP') + '</span>' +
    '</div>' +
    '<button onclick="alert(\'📲 Solicitud registrada exitosamente. Un gestor comercial te enviará la propuesta detallada en PDF.\');closeModal()" class="btn btn-em" style="margin-top:16px;width:100%;justify-content:center">📲 Confirmar &amp; Solicitar Propuesta Comercial PDF</button>' +
    '</div>';
  openModal();
};

window.showCertPreviewModal = function() {
  const b = document.getElementById('mBodyContent');
  if (!b) return;
  const empVal = parseInt(document.getElementById('empCount')?.value || '200');
  const arbVal = empVal * 2;
  b.innerHTML =
    '<div style="margin-top:10px"><span class="badge"><span class="dot"></span>Vista Previa del Certificado Oficial</span></div>' +
    '<div class="m-title" style="margin-top:12px">Certificado Siembra Vida Empresarial</div>' +
    '<div class="m-sci">República de Colombia · Alcaldía de Marulanda &amp; Corpocaldas · Ley 2173 de 2021</div>' +
    '<div style="margin-top:16px;background:#fff;color:#0f172a;border-radius:16px;padding:24px;box-shadow:0 12px 40px rgba(0,0,0,0.5);font-family:serif">' +
    '<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #059669;padding-bottom:12px">' +
    '<img src="logos/masprogreso.jpg" style="height:45px">' +
    '<div style="text-align:right;font-family:sans-serif;font-size:10px;color:#475569"><b>REGISTRO CATASTRAL:</b> 05C374BB854123F6A8A4<br><b>FOLIO MADS:</b> #2026-CAL-2173</div>' +
    '</div>' +
    '<div style="text-align:center;margin:20px 0">' +
    '<h3 style="font-size:22px;color:#065f46;font-family:sans-serif;font-weight:800;letter-spacing:1px">CERTIFICADO DE CUMPLIMIENTO AMBIENTAL</h3>' +
    '<p style="font-size:13px;color:#64748b;margin-top:4px">Otorgado de conformidad con la Ley 2173 de 2021 y la Resolución 1491 de 2025 del MADS</p>' +
    '</div>' +
    '<div style="font-size:14px;line-height:1.7;color:#334155;margin:16px 0;text-align:justify">' +
    'Hacemos constar que la empresa <b>[TU EMPRESA COMERCIAL SAS]</b> ha cumplido con éxito la siembra certificada de <b>' + arbVal.toLocaleString('es-CO') + ' frailejones y especies nativas</b> en el Área de Vida declarada Santuario Bosques Marulanda (2.820 msnm), destinada al beneficio de sus ' + empVal + ' empleados.' +
    '</div>' +
    '<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:24px;padding-top:16px;border-top:1px dashed #cbd5e1">' +
    '<div style="font-size:11px;color:#475569;font-family:sans-serif"><b>Firmado digitalmente:</b><br>Alcaldía Municipal de Marulanda<br>Corpocaldas · Nit: 890.801.234-1</div>' +
    '<div style="width:70px;height:70px;background:#0f172a;color:#fff;display:grid;place-items:center;font-size:9px;font-family:monospace;border-radius:8px;text-align:center">QR VERIFICADO</div>' +
    '</div>' +
    '</div>' +
    '<button onclick="window.print()" class="btn btn-em" style="margin-top:16px;width:100%;justify-content:center">🖨️ Imprimir / Guardar Certificado en PDF</button>';
  openModal();
};
