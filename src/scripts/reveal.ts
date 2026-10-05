function init() {
  const els = document.querySelectorAll<HTMLElement>('.reveal:not(.is-in), .develop:not(.is-in)');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
}

document.addEventListener('astro:page-load', init);
