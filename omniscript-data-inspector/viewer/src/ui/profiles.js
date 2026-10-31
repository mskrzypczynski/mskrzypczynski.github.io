'use strict';

/* Profiles (Simple / Standard / Expert / Custom): one click in the
 * settings dialog puts a documented bundle of settings in force; changing any
 * of those settings afterwards makes the switch read Custom. What a profile is
 * and which one the settings amount to is decided in core/shared/profiles.js.
 *
 * The profile is a setting too (`profile`), kept with Remember my settings
 * like the rest, but it is worked out from the others, never read back: at
 * boot the settings themselves are what is restored. */

import { PROFILE_KEYS, ADVANCED_ONLY, PROFILE_LABELS, applyProfile, profileOf } from '../core/shared/profiles.js';
import { Settings, DEFAULTS } from './settings.js';
import { Advanced } from './advanced.js';
import { toast } from './toast.js';

const values = () => Object.fromEntries(PROFILE_KEYS.map((key) => [key, Settings.get(key)]));

let choosing = false;

export const Profiles = {
  mount() {
    /* The stored `profile` follows the settings, so what is remembered says
     * what the switch shows. Not while a profile is being put in force: the
     * settings are half changed then. */
    Settings.onChange(() => {
      if (choosing) return;
      const now = profileOf(values());
      if (Settings.get('profile') !== now) Settings.set('profile', now);
    });

    /* Simple stores Collapse done steps and Visible only while Advanced is
     * off, where the controls are hidden and not in force. When Advanced goes
     * on, the tabs pick them up. */
    Advanced.subscribe((on) => {
      if (!on || choosing) return;
      Settings.resync(ADVANCED_ONLY.filter((key) => Settings.get(key) !== DEFAULTS[key]));
    });
  },

  current: () => profileOf(values()),

  /* Put a profile's settings in force. Advanced goes first, through the same
   * code path as the switch in the top bar: turning it off puts the options
   * under it back, and the rest of the bundle is applied on top. */
  choose(name) {
    const bundle = applyProfile(name);
    if (!Object.keys(bundle).length) return;
    const { advanced, ...rest } = bundle;
    choosing = true;
    try {
      if (advanced !== undefined) Advanced.set(advanced);
      Settings.apply(rest);
    } finally {
      choosing = false;
    }
    Settings.set('profile', profileOf(values()));
    toast(`Profile: ${PROFILE_LABELS[name]}`);
  }
};
