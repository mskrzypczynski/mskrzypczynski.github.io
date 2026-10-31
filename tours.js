'use strict';

/* Screenshot tours: one screenshot at a time with its caption, chosen by the
 * tabs under it, the arrow buttons, the arrow keys or a swipe. Nothing moves
 * on its own. Without this script every screenshot after the first stays
 * hidden by the stylesheet, and the first one still reads on its own. */

function setupTour(tour) {
  const tabs = [...tour.querySelectorAll('[role="tab"]')];
  const slides = [...tour.querySelectorAll('.tour-slide')];
  if (tabs.length < 2 || tabs.length !== slides.length) return;
  let current = 0;

  function show(index, focus = false) {
    current = (index + tabs.length) % tabs.length;
    tabs.forEach((tab, i) => {
      const on = i === current;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      slides[i].hidden = !on;
    });
    if (focus) tabs[current].focus();
  }

  tabs.forEach((tab, i) => tab.addEventListener('click', () => show(i)));

  /* Arrow keys move along the tabs, Home and End jump to the ends (the WAI-ARIA tabs pattern). */
  tour.querySelector('[role="tablist"]').addEventListener('keydown', (event) => {
    const moves = { ArrowRight: current + 1, ArrowLeft: current - 1, Home: 0, End: tabs.length - 1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    show(moves[event.key], true);
  });

  tour.querySelectorAll('[data-step]').forEach((button) => {
    button.addEventListener('click', () => show(current + Number(button.dataset.step)));
  });

  /* A sideways swipe on the screenshot turns the page; a mostly vertical one
   * is left to scrolling. */
  const stage = tour.querySelector('.tour-stage');
  let start = null;
  stage.addEventListener('pointerdown', (event) => { start = { x: event.clientX, y: event.clientY }; });
  stage.addEventListener('pointerup', (event) => {
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    start = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1));
  });

  tour.classList.add('ready');
  show(0);
}

document.querySelectorAll('[data-tour]').forEach(setupTour);
