'use strict';

/* The Structure tab and Settings: which switches and which property name this
 * tab owns, how they are read from Settings when the tab opens and when
 * "Restore default settings" puts them back, and the setters that keep the
 * controls and the state telling the same story. The tab does the redrawing. */

import { Targets } from '../targets.js';
import { Advanced } from '../advanced.js';
import { Settings, DEFAULTS } from '../settings.js';
import { releaseAutoFolds } from '../../core/structure/auto-collapse.js';
import { viewToOpen } from '../../core/shared/remembered-views.js';

const byId = (id) => document.getElementById(id);

/* state: the tab's state. deps: render(), renderList(), followStep(opts),
 * updateFollowPaused() and autoCollapseNow(), all the tab's own. */
export function createStructureSettings({ state, render, renderList, followStep, updateFollowPaused, autoCollapseNow }) {
  function setFollow(on) {
    state.follow = on;
    byId('struct-follow').checked = on;
    if (on) followStep({ force: true });
    updateFollowPaused();
  }

  function setAutoCollapse(on) {
    state.autoCollapse = on;
    byId('struct-autocollapse').checked = on;
    /* Off: open what it folded, so no step stays folded with nothing to open it. */
    if (!on) releaseAutoFolds(state);
    state.autoFolded = new Set();
    state.handFolded = new Set();
    if (on) autoCollapseNow();
    renderList();
  }

  function setHover(on) {
    state.hover = on;
    byId('struct-hover').checked = on;
  }

  function setVisibleOnly(on) {
    state.visibleOnly = on;
    byId('struct-visible-only').checked = on;
    render();
    byId('struct-list').scrollTop = 0; // another set of rows: start at the top
  }

  /* The three switches under Advanced are only in force while it is on. They
   * follow it in memory: what Settings holds (and "Remember my settings"
   * keeps) is not touched either way, since turning Advanced off is not a
   * change of the setting, and the user's choices come back with Advanced. */
  function followAdvanced(on) {
    const follow = (name, id, current, set) => {
      const next = on && Settings.get(name) === true;
      byId(id).checked = next; // the control tells the truth even when the state already agrees
      if (current !== next) set(next);
    };
    follow('structAutoCollapse', 'struct-autocollapse', state.autoCollapse, setAutoCollapse);
    follow('structHover', 'struct-hover', state.hover, setHover);
    follow('structVisibleOnly', 'struct-visible-only', state.visibleOnly, setVisibleOnly);
  }

  /* A new definition property: the old selection no longer means anything. */
  function commitDefProp(value) {
    state.defProp = value;
    state.selectedKey = null;
    state.deselected = false; // Follow current step picks again from the new definition
    Targets.setProps(null, state.defProp);
  }

  /* The views last chosen (Current value view, the tab picked by hand, Show
   * internal), kept by Remember my settings: read at mount and put back by
   * Restore default settings. They have no control of their own here; the
   * detail pane draws them, so a change that comes while it shows is redrawn. */
  function syncViews(want, initial) {
    let changed = false;
    const adopt = (name, key, next) => {
      if (!want(name) || state[key] === next) return;
      state[key] = next;
      changed = true;
    };
    adopt('structValueView', 'valueView', viewToOpen('structValueView', Settings.get('structValueView'), DEFAULTS.structValueView));
    adopt('structDetailTab', 'pickedTab', viewToOpen('structDetailTab', Settings.get('structDetailTab'), '') || null);
    adopt('structShowInternal', 'showInternal', Settings.get('structShowInternal') === true);
    if (changed && !initial) render();
  }

  /* Puts this tab's settings into the controls and the state together: once at
   * mount (initial) and again for "Restore default settings", where Settings
   * holds the defaults. The advanced options only count while Advanced is on.
   * Filters, the selection and the live data are left alone. scope names one
   * setting, or is undefined for all. */
  function sync(scope, { initial = false } = {}) {
    const want = (name) => Settings.inScope(scope, name);
    const adv = Advanced.on();

    /* The control is always set; the setter (with its redraw) only on a change. */
    const toggle = (name, id, current, next, set) => {
      if (!want(name)) return;
      byId(id).checked = next;
      if (current !== next) set(next);
    };
    toggle('structFollow', 'struct-follow', state.follow, Settings.get('structFollow'), setFollow);
    toggle('structAutoCollapse', 'struct-autocollapse', state.autoCollapse,
      adv && Settings.get('structAutoCollapse'), setAutoCollapse);
    toggle('structHover', 'struct-hover', state.hover, adv && Settings.get('structHover'), setHover);
    toggle('structVisibleOnly', 'struct-visible-only', state.visibleOnly,
      adv && Settings.get('structVisibleOnly'), setVisibleOnly);

    syncViews(want, initial);

    if (!want('defProp')) return;
    const prop = Settings.get('defProp').trim() || DEFAULTS.defProp;
    if (initial) {
      /* Before the first scan: adopt the name without rescanning. */
      state.defProp = prop;
      Targets.initProps(null, prop);
    } else if (prop !== state.defProp) {
      commitDefProp(prop);
    }
  }

  /* At mount: the saved settings go into the controls and the state. */
  function init() {
    sync(undefined, { initial: true });
  }

  /* Tells Settings what this tab holds, and how to put it back. */
  function install() {
    Settings.provide(() => ({
      structFollow: state.follow, structAutoCollapse: state.autoCollapse, structHover: state.hover,
      structVisibleOnly: state.visibleOnly, defProp: state.defProp,
      // The views Settings holds (clicked by hand), not the ones a jump is showing.
      structValueView: viewToOpen('structValueView', Settings.get('structValueView'), DEFAULTS.structValueView),
      structDetailTab: viewToOpen('structDetailTab', Settings.get('structDetailTab'), ''),
      structShowInternal: Settings.get('structShowInternal') === true
    }));
    Settings.onReset((scope) => sync(scope));
  }

  return { setFollow, setAutoCollapse, setHover, setVisibleOnly, followAdvanced, commitDefProp, init, install };
}
