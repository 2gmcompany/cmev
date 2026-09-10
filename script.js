const nav = document.querySelector('.nav');
const menuBtn = document.getElementById('menuBtn');
const progress = document.getElementById('scrollProgress');

menuBtn?.addEventListener('click', () => nav.classList.toggle('open'));

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${Math.min(100, (window.scrollY / max) * 100)}%`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('[data-count]').forEach(el => {
  const target = Number(el.dataset.count);
  let started = false;
  const countObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting || started) return;
    started = true;
    let n = 0;
    const tick = () => {
      n += Math.max(1, Math.ceil(target / 20));
      el.textContent = Math.min(n, target);
      if (n < target) requestAnimationFrame(tick);
    };
    tick();
    countObserver.disconnect();
  }, {threshold:.7});
  countObserver.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});

document.getElementById('year').textContent = new Date().getFullYear();
