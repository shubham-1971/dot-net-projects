/**
 * events-carousel.js
 * Auto-sliding single-event window carousel
 */

(function () {
  const AUTOPLAY_MS = 4000; // time per slide in ms

  const track      = document.getElementById('ecTrack');
  const dotsRow    = document.getElementById('ecDots');
  const prevBtn    = document.getElementById('ecPrev');
  const nextBtn    = document.getElementById('ecNext');
  const progressBar = document.getElementById('ecProgressBar');
  const currentLabel = document.getElementById('ecCurrent');

  const slides = Array.from(track.querySelectorAll('.ec-slide'));
  const total  = slides.length;
  let idx      = 0;
  let timer    = null;
  let progTimer = null;

  /* ── DOTS ── */
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'ec-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i, true));
    dotsRow.appendChild(dot);
  });

  function getDots() {
    return dotsRow.querySelectorAll('.ec-dot');
  }

  /* ── NAVIGATE ── */
  function goTo(n, resetTimer) {
        idx = ((n % total) + total) % total;
        track.style.transform = `translateX(-${idx * 100}%)`;
        getDots().forEach((d, i) => d.classList.toggle('active', i === idx));
        currentLabel.textContent = idx + 1;
        if (resetTimer) {
            clearInterval(timer);
            startAutoplay();
        }
    }

  /* ── PROGRESS BAR ── */
  function restartProgress() {
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';

    // Force reflow so transition resets
    void progressBar.offsetWidth;

    progressBar.style.transition = `width ${AUTOPLAY_MS}ms linear`;
    progressBar.style.width = '100%';
  }

  /* ── AUTOPLAY ── */
  function startAutoplay() {
    restartProgress();
    timer = setInterval(() => goTo(idx + 1, false), AUTOPLAY_MS);
  }

  function startAutoplay() {
  clearInterval(timer);
  restartProgress();
  timer = setInterval(() => goTo(idx + 1, true), AUTOPLAY_MS);
}

  /* ── ARROW BUTTONS ── */
  prevBtn.addEventListener('click', () => goTo(idx - 1, true));
  nextBtn.addEventListener('click', () => goTo(idx + 1, true));

  /* ── PAUSE ON HOVER ── */
  const win = document.getElementById('ecWindow');
  win.addEventListener('mouseenter', () => {
    stopAutoplay();
  });
  win.addEventListener('mouseleave', () => {
    startAutoplay();
  });

  /* ── TOUCH SWIPE ── */
  let touchStartX = 0;
  win.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    stopAutoplay();
  }, { passive: true });
  win.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? idx + 1 : idx - 1, true);
    else startAutoplay();
  }, { passive: true });

  /* ── KEYBOARD ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(idx - 1, true);
    if (e.key === 'ArrowRight') goTo(idx + 1, true);
  });

  /* ── INIT ── */
  goTo(0, false);
  startAutoplay();
})();