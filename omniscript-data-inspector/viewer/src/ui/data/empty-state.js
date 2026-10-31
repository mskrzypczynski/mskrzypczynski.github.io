'use strict';

/* What the Data tab shows while no OmniScript is selected: one line that says
 * so, a Rescan button and a link to the help (which opens on the No OmniScript found
 * entry, where the things to try are written down), with the toolbar controls
 * that need data switched off, so nothing on screen suggests there is
 * something to work with. Same shape as the Structure tab's. */

/* The controls that act on a payload. Refresh stays on (it looks again), and so
 * do Auto-refresh, Track changes and the view switch, which are settings, not
 * actions: the view picked now is the one the first payload is drawn in. */
const NEEDS_DATA = ['filter', 'expand', 'collapse', 'copy', 'download'];

/* The one-line card. `prop` is only named in the tooltip. */
export function emptyCard(prop) {
  const box = document.createElement('div');
  box.className = 'notice is-one-line data-empty';
  box.setAttribute('role', 'status');
  box.title = `Nothing on this page exposes ${prop} yet. Open a page that is running an OmniScript and let it finish loading.`;

  const text = document.createElement('span');
  text.textContent = 'No OmniScript found on this page. Open a page that runs one and let it load, then Rescan.';
  box.appendChild(text);

  const rescan = document.createElement('button');
  rescan.type = 'button';
  rescan.id = 'data-empty-rescan';
  rescan.className = 'icon-btn tiny';
  rescan.textContent = 'Rescan';
  rescan.title = 'Look for scripts and frames again (the same as Rescan at the top)';
  rescan.setAttribute('data-help', 'Rescan');
  rescan.addEventListener('click', () => document.getElementById('rescan').click());
  box.appendChild(rescan);

  /* The shell opens the help on the entry a focused control names when ? is
   * pressed on it; this link sends that key, so the entry is found the same way. */
  const more = document.createElement('button');
  more.type = 'button';
  more.id = 'data-empty-help';
  more.className = 'help-more';
  more.textContent = 'More help';
  more.title = 'Open the help on what to try when nothing is found: three steps, then another property or a frame';
  more.setAttribute('data-help', 'No OmniScript found');
  more.addEventListener('click', () => {
    more.dispatchEvent(new KeyboardEvent('keydown', { key: '?', bubbles: true, cancelable: true }));
  });
  box.appendChild(more);
  return box;
}

/* Switches the toolbar between "nothing to work with" and normal. */
export function setEmptyState(empty) {
  NEEDS_DATA.forEach((id) => {
    const control = document.getElementById(id);
    if (control && control.disabled !== empty) control.disabled = empty;
  });
}
