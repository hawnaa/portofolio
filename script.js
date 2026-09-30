const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const navbar = document.querySelector('.navbar');
const toTop = document.getElementById('toTop');
const sections = document.querySelectorAll('main section[id]');
const links = navLinks.querySelectorAll('a');

/* ---------- Menu mobile ---------- */
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
links.forEach(link =>
  link.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* ---------- Scroll: navbar, tombol ke atas, menu aktif ---------- */
function onScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  toTop.classList.toggle('show', window.scrollY > 400);

  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) current = section.id;
  });
  links.forEach(a =>
    a.classList.toggle('active', a.getAttribute('href') === '#' + current)
  );
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toTop.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

/* ---------- Animasi muncul saat scroll ---------- */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js');

  const targets = document.querySelectorAll(
    '.section-title, main section .lead, .sub-title, .skill-list li, .philosophy li, .card, .social-card'
  );

  // jeda bertahap untuk elemen yang bersaudara (maks 5 langkah)
  const groups = new Map();
  targets.forEach(el => {
    el.classList.add('reveal');
    const parent = el.parentElement;
    const n = groups.get(parent) || 0;
    el.style.setProperty('--delay', `${Math.min(n, 5) * 0.1}s`);
    groups.set(parent, n + 1);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('visible');
      observer.unobserve(el);
      // setelah animasi selesai, lepas kelasnya supaya efek hover kartu normal lagi
      setTimeout(() => el.classList.remove('reveal', 'visible'), 1400);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}