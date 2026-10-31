'use strict';

/* "Remember my settings": which of the panel's settings are written to
 * extension storage, and what is accepted back from it. Only the switches,
 * views and property names that Settings holds (including the views last
 * chosen, remembered-views.js); never data, watch pins,
 * filters, captured calls or history, and not Mask values or Allow test calls
 * (they start off every time, on purpose). The tab order has its own stored entry,
 * and so has Mask values at start (below), which is kept whether or not this is on.
 *
 * Pure: the caller hands in the values and the defaults. */

import { DESIGNER_MODES } from './designer-link.js';
import { PROFILE_NAMES, profileOf } from './profiles.js';
import { REFRESH_RATES } from './refresh-rate.js';
import { VIEW_CHOICES } from './remembered-views.js';
import { TEXT_SIZES } from './text-size.js';
import { TIME_FORMATS } from './time-format.js';

export const REMEMBER_KEY = 'settings';

/* Other stored entries that exist only while remembering is on (each written
 * by its own tab, keyed by script): all of them go when the switch goes off.
 * A tab that adds one lists it here, so the switch stays the one place that
 * decides what is kept. */
export const REMEMBERED_EXTRA_KEYS = ['pins'];

/* Settings that are never written to storage even when remembering is on.
 * Allow test calls and its acknowledgement are among them: a setting that lets
 * the panel send into an org must be a fresh choice at every DevTools start,
 * not one carried from yesterday's sandbox into today's production. */
const NOT_REMEMBERED = ['tabOrder', 'maskAtStart', 'mask', 'dataLive', 'allowTestCalls', 'testCallsAck'];

/* Mask values at start is a flag of its own, stored like the tab order and the tour
 * flags, with Remember my settings on or off: a safety choice that is kept only
 * under another opt-in would silently do nothing in the default configuration.
 * Ticked, the flag is written; unticked (or restored to its default) the entry
 * is deleted, so nothing is stored for the default. */
export const maskAtStartToStore = (value) => (value === true ? true : null);
export const maskAtStartToRestore = (stored) => stored === true;

/* The values a setting with a fixed set of choices may have: a stored value
 * outside its list (an old version's, or one edited by hand) is dropped, so
 * the default stays in force rather than a view that does not exist. */
export const REMEMBER_ALLOWED = Object.freeze({
  ...VIEW_CHOICES,
  refreshRate: REFRESH_RATES,
  timeFormat: TIME_FORMATS,
  textSize: TEXT_SIZES,
  profile: PROFILE_NAMES,
  designerMode: DESIGNER_MODES
});

const known = (defaults, name) => Object.prototype.hasOwnProperty.call(defaults, name) && !NOT_REMEMBERED.includes(name);

/* Only names in `defaults`, each with a value of the default's type, and,
 * for a name in `allowed` (a map from name to its list of choices), one of
 * those choices, so a stored object from another version (or edited by hand)
 * cannot inject anything else. A new object; the input is not changed. */
export function pickRemembered(values, defaults, allowed = {}) {
  const picked = {};
  if (!values || typeof values !== 'object') return picked;
  Object.keys(values).forEach((name) => {
    if (!known(defaults, name)) return;
    const value = values[name];
    if (value === undefined || value === null) return;
    if (typeof value !== typeof defaults[name]) return;
    if (typeof value === 'number' && !Number.isFinite(value)) return;
    if (Array.isArray(allowed[name]) && !allowed[name].includes(value)) return;
    picked[name] = value;
  });
  return picked;
}

/* What to write for the settings in force: nothing (null) unless the switch
 * is on, which is itself part of what is remembered. */
export function rememberedToWrite(values, defaults, allowed = {}) {
  if (!values || values.rememberSettings !== true) return null;
  return pickRemembered(values, defaults, allowed);
}

/* Settings that were renamed or turned round between versions, read once from
 * what an earlier version stored: "Preserve on reload" (logPreserve, on by
 * default) became "Clear on reload" (clearOnReload, off by default), so an
 * old false is a new true; "OmniStudio only" (logOnlyOmni, on by default)
 * became "All Apex calls" (logShowAll, off by default), so an old false is a new
 * true. An old key is dropped, and never overrides a value already stored
 * under the new name. A new object; the input is not changed, and a value of
 * another type is dropped without effect. */
const TURNED_ROUND = Object.freeze([
  { old: 'logPreserve', now: 'clearOnReload' },
  { old: 'logOnlyOmni', now: 'logShowAll' }
]);

export function migrateSettings(stored) {
  if (!needsMigration(stored)) return stored;
  const next = { ...stored };
  TURNED_ROUND.forEach(({ old, now }) => {
    if (!(old in next)) return;
    if (typeof next[old] === 'boolean' && typeof next[now] !== 'boolean') next[now] = !next[old];
    delete next[old];
  });
  if (lacksExpertRate(next)) next.refreshRate = 'fast';
  return next;
}

/* Expert began to set the refresh rate (fast). An object stored before that has
 * no refreshRate, which would read as Normal and turn a remembered Expert into
 * Custom: when it says Expert was in force and everything else in it is Expert's,
 * the rate it would have set is put in. Any other object without one keeps the
 * default (Normal). The stored profile follows the settings, so an Expert whose
 * rate was reset afterwards is stored as Custom and is left alone. */
function lacksExpertRate(stored) {
  return stored.profile === 'expert' && !('refreshRate' in stored)
    && profileOf({ ...stored, refreshRate: 'fast' }) === 'expert';
}

/* Whether the stored object holds a setting under a name migrateSettings drops,
 * or lacks the refresh rate of the Expert profile, so the caller can write it
 * back migrated. */
export function needsMigration(stored) {
  return !!stored && typeof stored === 'object' && !Array.isArray(stored)
    && (TURNED_ROUND.some(({ old }) => old in stored) || lacksExpertRate(stored));
}

/* What to put back at boot. Remembered values only count when the stored
 * object says the switch was on. */
export function rememberedToRestore(stored, defaults, allowed = {}) {
  const picked = pickRemembered(migrateSettings(stored), defaults, allowed);
  return picked.rememberSettings === true ? picked : {};
}
