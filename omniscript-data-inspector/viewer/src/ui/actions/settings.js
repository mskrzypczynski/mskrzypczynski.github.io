'use strict';

/* Calls and Settings: which switches and filters this tab owns, how
 * they are read from Settings when the tab opens and when "Restore default
 * settings" puts them back, and how the controls mirror the state.
 *
 * The toolbar keeps one filter control, Failed only (under Advanced). The rest
 * are settings of the Settings dialog (All Apex calls, Clear on reload, Time
 * format, the slow-call threshold); the slow filter itself is slow: in the
 * filter box. */

import { Advanced } from '../advanced.js';
import { Settings } from '../settings.js';
import { timeFormatOf } from '../../core/shared/time-format.js';
import { viewToOpen } from '../../core/shared/remembered-views.js';

/* state: the tab's state. el: the elements it looked up. redraw(): the tab's
 * redraw. */
export function createActionsSettings({ state, el, redraw }) {
  /* The Failed only box mirrors the state, written from it so every path that
   * changes the state (settings, reset, Advanced off) leaves the control
   * telling the same story. */
  function syncFilterControls() {
    el.errorsOnly.checked = state.errorsOnly;
    if (el.showAll) el.showAll.checked = state.showAll;
  }

  const threshold = () => Math.max(0, Number(Settings.get('logSlowMs')) || 0);

  /* Current settings go into the state. Failed only lives under Advanced, so it
   * comes back only with it. The rest is in force whatever Advanced says: it is
   * how times read, which calls are listed and when the list starts over, not
   * a control that hides itself. */
  function restore() {
    state.clearOnReload = Settings.get('clearOnReload');
    state.showAll = Settings.get('logShowAll');
    state.errorsOnly = Advanced.on() && Settings.get('logErrorsOnly');
    state.slowMs = threshold();
    state.timeFormat = timeFormatOf(Settings.get('timeFormat'));
    adoptDetailTab();
    syncFilterControls();
  }

  /* The detail tab last picked by hand (Input, Output or Options), kept by
   * Remember my settings: none picked is the default, where a failed call
   * opens on its Output. */
  function adoptDetailTab() {
    const tab = viewToOpen('logDetailTab', Settings.get('logDetailTab'), '');
    if (tab === (state.detailTabPicked ? state.detailTab : '')) return;
    state.detailTabPicked = tab !== '';
    state.detailTab = tab || 'input';
  }

  /* "Restore default settings" (and a profile, and a change in the Settings
   * dialog): the switches of this tab back to what Settings says. Captured
   * calls, the selection and the filter text are left alone. scope names one
   * setting, or is undefined for all of them. */
  function apply(scope) {
    const want = (name) => Settings.inScope(scope, name);
    if (want('clearOnReload')) state.clearOnReload = Settings.get('clearOnReload');
    if (want('logShowAll')) state.showAll = Settings.get('logShowAll');
    if (want('logErrorsOnly')) state.errorsOnly = Advanced.on() && Settings.get('logErrorsOnly');
    if (want('logSlowMs')) state.slowMs = threshold();
    if (want('timeFormat')) state.timeFormat = timeFormatOf(Settings.get('timeFormat'));
    if (want('logDetailTab')) adoptDetailTab();
    syncFilterControls();
    redraw();
  }

  /* Failed only is hidden when Advanced is off, so it does not stay in force;
   * it comes back, as the user left it, with Advanced. What Settings holds (and
   * "Remember my settings" keeps) is not touched either way: turning Advanced
   * off is not a change of the setting. Returns whether the filters in force
   * changed. */
  function followAdvanced(on) {
    const errorsOnly = on && Settings.get('logErrorsOnly') === true;
    const changed = errorsOnly !== state.errorsOnly;
    state.errorsOnly = errorsOnly;
    syncFilterControls();
    return changed;
  }

  /* Tells Settings what this tab holds, and how to put it back. */
  function install() {
    Settings.provide(() => ({
      clearOnReload: state.clearOnReload, logShowAll: state.showAll,
      logErrorsOnly: state.errorsOnly, logSlowMs: state.slowMs, timeFormat: state.timeFormat,
      allowTestCalls: Settings.get('allowTestCalls') === true,
      // The tab picked by hand, not the one shown: a call without it shows Input, and the pick stays.
      logDetailTab: viewToOpen('logDetailTab', Settings.get('logDetailTab'), '')
    }));
    Settings.onReset(apply);
    /* A tab picked in the pane is written by the pane's own button handler (detail-pane.js). */
  }

  return { syncFilterControls, restore, install, followAdvanced };
}
