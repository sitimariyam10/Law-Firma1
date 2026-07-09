// ===========================================================
// SCROLL PROGRESS RULE
// ===========================================================
const scrollFill = document.getElementById('scrollFill');
function updateScrollProgress(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollFill.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// ===========================================================
// MOBILE NAV TOGGLE
// ===========================================================
const navToggle = document.getElementById('navToggle');
const topNav = document.getElementById('topNav');
navToggle.addEventListener('click', () => {
  topNav.classList.toggle('is-open');
});
topNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => topNav.classList.remove('is-open'));
});

// ===========================================================
// TERMINAL TYPING EFFECT
// ===========================================================
const typedOut = document.getElementById('typedOut');
const cursor = document.getElementById('cursor');
const linesToType = [
  'rangga_wibowo — software developer',
  '5 tahun membangun produk web dari nol.'
];

function typeLines(lines, el, done){
  let lineIndex = 0;
  let charIndex = 0;

  function typeChar(){
    if (lineIndex >= lines.length){
      if (done) done();
      return;
    }
    const currentLine = lines[lineIndex];
    if (charIndex <= currentLine.length){
      const typedSoFar = lines.slice(0, lineIndex)
        .map(l => l + '\n').join('') + currentLine.slice(0, charIndex);
      el.textContent = typedSoFar;
      charIndex++;
      setTimeout(typeChar, 28 + Math.random() * 30);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeChar, 350);
    }
  }
  typeChar();
}

// Start typing once, respecting reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion){
  typedOut.textContent = linesToType.join('\n');
} else {
  typeLines(linesToType, typedOut);
}

// ===========================================================
// SCROLL REVEAL
// ===========================================================
const revealTargets = document.querySelectorAll(
  '.project, .gitlog__entry, .diffline, .about__grid, .contact__inner, .section__head'
);
revealTargets.forEach(el => el.setAttribute('data-reveal', ''));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => revealObserver.observe(el));

// ===========================================================
// CONTACT FORM (front-end only — no backend wired up)
// ===========================================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message){
    formStatus.textContent = 'Mohon lengkapi semua kolom.';
    formStatus.style.color = 'var(--del)';
    return;
  }

  // Placeholder success state — connect this to a real backend
  // (e.g. Formspree, a serverless function, or your own API) to
  // actually send the message.
  formStatus.textContent = `Terima kasih, ${name}. Pesan Anda tersimpan secara lokal (demo) — sambungkan formulir ini ke backend untuk pengiriman sungguhan.`;
  formStatus.style.color = 'var(--add)';
  contactForm.reset();
});
