'use strict';

/* The tours: a four-step panel tour the first time the panel opens, and a short
 * tour (at most three steps) the first time each tab is opened, each step a
 * small card next to the control it describes. Pure: the steps, which control
 * a step points at, how Next and Back move, and whether a tour is due. The
 * card itself is src/ui/tour.js. */

/* The stored flags, one yes-or-no per tour: written once that tour was
 * finished or skipped. They are kept even without Remember my settings, like
 * the tab order. */
export const TOUR_KEYS = Object.freeze({
  panel: 'tourSeen',
  data: 'tourSeenData',
  structure: 'tourSeenStructure',
  actions: 'tourSeenActions'
});
export const TOUR_KEY = TOUR_KEYS.panel;
export const ALL_TOUR_KEYS = Object.freeze(Object.values(TOUR_KEYS));

/* A tab's tour is kept short: three steps at most, one sentence each of fewer
 * than this many characters. */
export const MAX_TAB_STEPS = 3;
export const MAX_STEP_TEXT = 90;

/* anchor: a CSS selector for the control, or 'filter' for the current tab's
 * filter box (see filterAnchor). all: the selector names several controls and
 * the step rings each of them, the card standing under the box that holds them
 * all (the three tabs, not the strip that runs the width of the panel).
 * align: 'end' puts the card at the right edge of the control instead of its
 * left, for a control that is wide and whose own parts the card is about. */
export const TOUR_STEPS = Object.freeze([
  Object.freeze({ id: 'picker', title: 'OmniScript', anchor: '#target', text: 'Pick the OmniScript on the page; Rescan if it is not listed.' }),
  Object.freeze({ id: 'tabs', title: 'Tabs', anchor: '[role="tab"]', all: true, text: 'Data shows what the script holds, Structure how it is built, Calls what it calls.' }),
  Object.freeze({ id: 'filter', title: 'Filter', anchor: 'filter', text: 'Type to narrow; the ? lists prefixes.' }),
  Object.freeze({ id: 'help', title: 'Help and settings', anchor: '#settings', text: 'The ? opens help. The gear opens settings and the debug bundle.' })
]);

/* The tour is due only while the flag is absent: nothing stored, or a stored
 * "not yet". Anything else means it was seen. */
export function tourToShow(stored) {
  return stored === undefined || stored === null || stored === false;
}

/* Where Next, Back and Skip go from step `index`: the new index, or null when
 * the tour is over (Next on the last step, Skip, anything else). Back stops
 * at the first step. */
export function nextStep(index, move, count = TOUR_STEPS.length) {
  const at = Number.isInteger(index) && index >= 0 && index < count ? index : 0;
  if (move === 'next') return at + 1 < count ? at + 1 : null;
  if (move === 'back') return Math.max(0, at - 1);
  return null;
}

/* What a screen reader hears for the tip, e.g. "2 of 4". */
export function stepCount(index, count = TOUR_STEPS.length) {
  return `${index + 1} of ${count}`;
}

const FILTER_BOX = Object.freeze({ data: '#filter', structure: '#struct-filter', actions: '#log-filter' });

/* The selector a step points at; the filter step points at whichever tab is
 * showing. */
export function anchorOf(step, tab) {
  if (step.anchor !== 'filter') return step.anchor;
  return FILTER_BOX[tab] || FILTER_BOX.data;
}

/* The left edge of the card: its anchor's left, or, for align 'end', so that
 * the card ends at the anchor's right edge; never off the left of the panel. */
export function cardLeft(step, box, cardWidth, margin = 8) {
  const left = step && step.align === 'end' ? box.right - cardWidth : box.left;
  return Math.max(margin, left);
}

/* The smallest box that holds all of `boxes` ({ left, right, top, bottom }), or
 * null for none: where the card stands for a step that rings several controls. */
export function unionBox(boxes) {
  const list = (Array.isArray(boxes) ? boxes : []).filter(Boolean);
  if (!list.length) return null;
  return {
    left: Math.min(...list.map((box) => box.left)),
    right: Math.max(...list.map((box) => box.right)),
    top: Math.min(...list.map((box) => box.top)),
    bottom: Math.max(...list.map((box) => box.bottom))
  };
}

/* The steps of a tab's tour, from the TOUR export of that tab's help module:
 * [{ anchor, title, text }]. Entries that are not a selector with a title and a
 * text are dropped, and no more than MAX_TAB_STEPS are kept. */
export function tabTourSteps(steps) {
  const list = Array.isArray(steps) ? steps : [];
  const text = (value) => typeof value === 'string' && value.trim() !== '';
  return list
    .filter((step) => step && text(step.anchor) && text(step.title) && text(step.text))
    .slice(0, MAX_TAB_STEPS)
    .map((step) => Object.freeze({ id: step.title, anchor: step.anchor, title: step.title, text: step.text }));
}

/* Is the tour of `tab` due now? Only when that tab has a tour whose flag says
 * it was not seen, and nothing else is going on: no tour is open, no dialog is
 * open, and no tour has been shown yet in this session (the panel tour counts),
 * so a new person sees one small card each time DevTools opens, not several
 * in a row. flags: { key: stored value } as read from storage. */
export function tabTourDue({ tab, flags, tourOpen, dialogOpen, shownThisSession }) {
  const key = TOUR_KEYS[tab];
  if (!key || tab === 'panel') return false;
  if (tourOpen || dialogOpen || shownThisSession) return false;
  return tourToShow(flags && flags[key]);
}

/* What "Don't show tours" writes: every flag at once. */
export function dismissAllFlags() {
  return Object.fromEntries(ALL_TOUR_KEYS.map((key) => [key, true]));
}
