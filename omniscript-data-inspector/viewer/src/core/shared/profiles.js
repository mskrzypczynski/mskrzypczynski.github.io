'use strict';

/* Profiles: three named bundles of settings that are chosen in one click from
 * the settings dialog, and "Custom" for when the settings no longer
 * match any of them. Pure: the UI hands in the values of the settings and
 * applies what comes back, so what a profile is, and which one a set of values
 * amounts to, is tested without a DOM.
 *
 * A profile only names the settings it sets. A setting it leaves out (Expert
 * does not set Text size) is left as it is when the profile is chosen, and is
 * not compared when the profile is looked for. Simple differs from Standard in
 * what is always in force (seconds and minutes for durations), not in options
 * that act only under Advanced, or the switch would read Custom the moment
 * Advanced is turned on. */

import { REFRESH_LABELS } from './refresh-rate.js';

/* What a profile may set, in the order the settings dialog lists them. */
export const PROFILE_KEYS = Object.freeze([
  'advanced', 'dataChanges', 'refreshRate', 'structFollow', 'structAutoCollapse', 'structVisibleOnly',
  'logErrorsOnly', 'logSlowMs', 'timeFormat', 'textSize'
]);

/* Standard is the defaults of these settings (settings.js DEFAULTS). */
const STANDARD = Object.freeze({
  advanced: false,
  dataChanges: false,
  refreshRate: 'normal',
  structFollow: true,
  structAutoCollapse: false,
  structVisibleOnly: false,
  logErrorsOnly: false,
  logSlowMs: 0,
  timeFormat: 'ms',
  textSize: 'M'
});

export const PROFILES = Object.freeze({
  simple: Object.freeze({
    advanced: false,
    dataChanges: false,
    refreshRate: 'normal',
    structFollow: true,
    logErrorsOnly: false,
    timeFormat: 'human',
    textSize: 'M'
  }),
  standard: STANDARD,
  expert: Object.freeze({
    advanced: true,
    dataChanges: true,
    refreshRate: 'fast',
    structFollow: true,
    structAutoCollapse: false,
    structVisibleOnly: false,
    logErrorsOnly: false,
    logSlowMs: 500,
    timeFormat: 'ms'
  })
});

/* The choices as the switch shows them; custom is only ever a result. */
export const PROFILE_NAMES = Object.freeze(['simple', 'standard', 'expert', 'custom']);

export const PROFILE_LABELS = Object.freeze({ simple: 'Simple', standard: 'Standard', expert: 'Expert', custom: 'Custom' });

/* Options that only act while Advanced is on: the controls are hidden
 * without it, and turning Advanced off puts them back. */
export const ADVANCED_ONLY = Object.freeze(['structAutoCollapse', 'structVisibleOnly', 'logErrorsOnly', 'logSlowMs']);

const LABELS = Object.freeze({
  advanced: 'Advanced',
  dataChanges: 'Track changes',
  refreshRate: 'Refresh rate',
  structFollow: 'Follow current step',
  structAutoCollapse: 'Collapse done steps',
  structVisibleOnly: 'Visible only',
  logErrorsOnly: 'Failed only',
  logSlowMs: 'Slow call threshold',
  timeFormat: 'Time format',
  textSize: 'Text size'
});

/* The settings to put in force for a profile: a new object, or {} for custom
 * and for a name that is not one. */
export function applyProfile(name) {
  const profile = Object.prototype.hasOwnProperty.call(PROFILES, name) ? PROFILES[name] : null;
  return profile ? { ...profile } : {};
}

/* Advanced is how much of the panel is shown, not a setting of what it does:
 * it is put in force by a profile but left out when the profile is looked for,
 * so Restore default settings, which keeps it, still reads Standard. */
const NOT_COMPARED = Object.freeze(['advanced']);

/* Which profile the values amount to: the first whose every setting equals
 * the value (a value that is missing counts as the default), else 'custom'. */
export function profileOf(values) {
  const have = values && typeof values === 'object' ? values : {};
  const matches = (profile) => Object.keys(profile)
    .filter((key) => !NOT_COMPARED.includes(key))
    .every((key) => (key in have && have[key] !== undefined ? have[key] : STANDARD[key]) === profile[key]);
  const found = Object.keys(PROFILES).find((name) => matches(PROFILES[name]));
  return found || 'custom';
}

function formatValue(key, value) {
  if (typeof value === 'boolean') return value ? 'on' : 'off';
  if (key === 'refreshRate') return REFRESH_LABELS[value].toLowerCase();
  if (key === 'timeFormat') return value === 'human' ? 'seconds and minutes' : 'ms';
  if (key === 'logSlowMs') return value > 0 ? String(value) : 'off';
  return String(value);
}

/* What a profile sets, as short phrases in the dialog's order: "Advanced off",
 * "Slow call threshold 500". Empty for custom. */
export function describeProfile(name) {
  const profile = applyProfile(name);
  return PROFILE_KEYS.filter((key) => key in profile).map((key) => `${LABELS[key]} ${formatValue(key, profile[key])}`);
}
