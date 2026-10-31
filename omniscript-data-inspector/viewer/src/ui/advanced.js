'use strict';

/* The "Advanced" toggle switch in the top bar. Controls that most sessions never
 * need carry the `adv` class and are hidden until it is on; turning it off
 * again tells each tab to put its advanced filters back to their defaults, so
 * nothing stays active out of sight. The property names (in Settings, under Reading) are configuration, not
 * filters: they are kept, and the Settings gear shows a count while one is not the
 * default. The switch itself is a setting (settings.js) and is kept by Restore
 * default settings. */

import { Settings } from './settings.js';

let enabled = false;
let change = () => {};
const listeners = [];

export const Advanced = {
  mount(button) {
    const paint = () => {
      button.classList.toggle('is-on', enabled);
      button.setAttribute('aria-checked', String(enabled));
      document.body.classList.toggle('is-advanced', enabled);
    };
    enabled = Settings.get('advanced');
    paint();
    change = (on) => {
      enabled = on;
      paint();
      Settings.set('advanced', enabled);
      listeners.forEach((fn) => fn(enabled));
    };
    button.addEventListener('click', () => change(!enabled));
    Settings.provide(() => ({ advanced: enabled }));
    /* Registered first, so on a full reset the tabs' "Advanced went off"
     * resets run before they re-read their own settings. */
    Settings.onReset((scope) => {
      if (Settings.inScope(scope, 'advanced') && enabled !== Settings.get('advanced')) change(!enabled);
    });
  },
  /* Once every tab has subscribed: tell them about a restored "on", so e.g.
   * change tracking starts. (Off needs no call: tabs only restore advanced
   * options when it is on.) */
  announce() {
    if (enabled) listeners.forEach((fn) => fn(true));
  },
  on: () => enabled,
  /* Switch it from code, e.g. so a field that lives under it can be shown. */
  set: (on) => { if (on !== enabled) change(on); },
  subscribe: (fn) => listeners.push(fn)
};
