// ==========================================================================
// MÓDULO JS 07: GALERÍA DE BIODIVERSIDAD, CIFRAS ANIMADAS, FAQ & INTERACCIÓN
// Explicación: Renderiza la rejilla de biodiversidad con fotos reales,
// dispara contadores animados al hacer scroll, activa acordeón FAQ y navegación suave.
// ==========================================================================

// --- Galería de Biodiversidad ---
const BIO = [
  { name: 'Frailejón de Páramo', sci: 'Espeletia grandiflora', desc: 'Especie sombrilla clave del ecosistema. Pubescencia foliar para interceptación de niebla a 2.820 msnm.', st: 'Vulnerable', cls: 'vu', tag: 'em', img: 'fotos/frailejon-grandiflora-natural.png', id: 'ESP-G-4092', dap: '12.5 cm', alt: '2.8 m' },
  { name: 'Frailejón Plateado', sci: 'Espeletia pycnophylla', desc: 'Captación de humedad andina y almacenamiento de agua orgánica en suelos Andisoles.', st: 'Vulnerable', cls: 'vu', tag: 'em', img: 'fotos/frailejon-pycnophylla-natural.png', id: 'ESP-P-1104', dap: '9.2 cm', alt: '1.9 m' },
  { name: 'Palma de Cera de Páramo', sci: 'Ceroxylon meyenianum', desc: 'Árbol nacional de alta montaña para estructura de dosel superior en el Santuario.', st: 'En Peligro', cls: 'en', tag: 'bl', img: 'fotos/palma-cera-natural.png', id: 'CER-M-0101', dap: '23.3 cm', alt: '28.5 m' },
  { name: 'Pino Colombiano', sci: 'Retrophyllum rospigliosii', desc: 'Conífera nativa de gran porte protegida para enriquecimiento y regulación de cuencas.', st: 'En Peligro', cls: 'en', tag: 'bl', img: 'fotos/pino-colombiano-natural.png', id: 'RET-R-8821', dap: '21.0 cm', alt: '18.2 m' },
  { name: 'Encenillo de Montaña', sci: 'Weinmannia tomentosa', desc: 'Protección de nacimientos de agua y recarga de acuíferos en la cuenca del río Guarinó.', st: 'Preocupación Menor', cls: 'lc', tag: 'em', img: 'fotos/encenillo-montana-natural.png', id: 'WEI-T-5012', dap: '16.4 cm', alt: '12.0 m' },
  { name: 'Siete Cueros de Páramo', sci: 'Tibouchina lepidota', desc: 'Floración púrpura para polinización activa y cobertura biológica de suelos frágiles.', st: 'Preocupación Menor', cls: 'lc', tag: 'bl', img: 'fotos/siete-cueros-natural.png', id: 'TIB-L-3341', dap: '8.5 cm', alt: '4.5 m' }
];

const bioGrid = document.getElementById('bioGrid');
if (bioGrid) {
  bioGrid.innerHTML = BIO.map(b =>
    '<div class="bio" style="padding:0; overflow:hidden; border-radius:18px; background:linear-gradient(165deg, var(--card2), var(--card)); border:1px solid var(--line); transition:all 0.3s ease" data-tilt>' +
    '<div style="height:190px; overflow:hidden; position:relative">' +
    '<img src="' + b.img + '" alt="' + b.name + '" style="width:100%; height:100%; object-fit:cover; transition:transform 0.7s ease" class="bio-img-zoom">' +
    '<div style="position:absolute; top:12px; right:12px; background:rgba(6,10,21,0.85); backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,0.15); border-radius:6px; padding:3px 8px; font-family:var(--mono); font-size:10px; color:var(--em)">ID: ' + b.id + '</div>' +
    '<div style="position:absolute; bottom:10px; left:12px"><span class="chip ' + b.tag + '">' + (b.tag === 'em' ? 'Especie Sombrilla Páramo' : 'Nativa Alta Montaña') + '</span></div>' +
    '</div>' +
    '<div style="padding:20px">' +
    '<h4 style="font-size:19px; font-weight:800; color:#fff">' + b.name + '</h4>' +
    '<div class="sci" style="font-size:12.5px; color:var(--mut); font-style:italic; margin-top:2px">' + b.sci + '</div>' +
    '<p style="font-size:13px; color:#cbd5e1; line-height:1.55; margin-top:10px; min-height:42px">' + b.desc + '</p>' +
    '<div style="margin-top:14px; padding-top:10px; border-top:1px solid var(--line); display:flex; justify-content:space-between; align-items:center; font-family:var(--mono); font-size:11px; color:var(--mut2)">' +
    '<span>DAP: <b style="color:#fff">' + b.dap + '</b></span>' +
    '<span>Alt: <b style="color:#fff">' + b.alt + '</b></span>' +
    '<span>Estado: <span class="st ' + b.cls + '">' + b.st + '</span></span>' +
    '</div>' +
    '</div>' +
    '</div>').join('');
}

// --- Cifras Animadas (Intersection Observer) ---
const CIFRAS_DATA = [{ target: 60, suffix: ' Ha' }, { target: 66000 }, { target: 2820 }, { target: 3 }, { target: 35, suffix: '%' }, { target: 65 }];
let cifrasAnimated = false;

const cifraObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !cifrasAnimated) {
    cifrasAnimated = true;
    document.querySelectorAll('.cifra-num').forEach((el, i) => {
      const d = CIFRAS_DATA[i]; if (!d) return;
      const duration = 2000, start = performance.now();
      (function tick(now) {
        const p = Math.min((now - start) / duration, 1), e = 1 - Math.pow(1 - p, 3), v = d.target * e;
        const fmt = Math.round(v).toLocaleString('es-CO');
        el.textContent = (d.prefix || '') + fmt + (d.suffix || '');
        if (p < 1) requestAnimationFrame(tick);
      })(performance.now());
    });
  }
}, { threshold: 0.3 });

const cifrasSec = document.getElementById('cifras');
if (cifrasSec) cifraObserver.observe(cifrasSec);

// --- FAQ Toggle ---
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement, wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// --- Navegación de Viñetas Izquierda ---
const sideNavItems = document.querySelectorAll('.side-nav-item');
const sectionsToTrack = Array.from(sideNavItems).map(item => document.querySelector(item.getAttribute('href'))).filter(Boolean);

window.addEventListener('scroll', () => {
  let current = '';
  const scrollPos = window.scrollY + window.innerHeight / 3;
  sectionsToTrack.forEach(sec => {
    if (scrollPos >= sec.offsetTop) { current = '#' + sec.getAttribute('id'); }
  });
  sideNavItems.forEach(item => {
    item.classList.toggle('active', item.getAttribute('href') === current);
  });
}, { passive: true });

// --- GSAP & Smooth Scroll & Tilt ---
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('#scroll-progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2
      }
    });
  }

  if (typeof VanillaTilt !== 'undefined' && window.innerWidth > 768) {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
      max: 6,
      speed: 400,
      glare: true,
      'max-glare': 0.15
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerOffset = 100;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          if (history.pushState) {
            history.pushState(null, null, targetId);
          }
        }
      }
    });
  });
});
