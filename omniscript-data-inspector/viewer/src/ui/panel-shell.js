'use strict';

/* Panel shell: the tab strip, the help and settings dialogs, and telling every tab module
 * when it is shown, hidden, or the whole panel goes on/off screen. Each tab's
 * own data, rendering and polling lives in its own module — this file only
 * coordinates which one is currently on screen.
 *
 * Deliberately not a tab of its own: the help overlay is documentation, not a
 * view of the OmniScript, and it covers only what cannot be worked out by
 * clicking. */

import { DataTab } from './data-tab.js';
import { Structure } from './structure-tab.js';
import { RemoteActions } from './actions-tab.js';
import { TabOrder } from './tab-order.js';
import { Targets } from './targets.js';
import { Nav } from './nav.js';
import { mountLiveStatus } from './live-status.js';
import { filterSections, queryWords, sectionsTitled, helpMenuLabel } from '../core/shared/help-filter.js';
import { orderEntriesByControls } from '../core/shared/help-order.js';
import { openContextMenu } from './context-menu.js';
import { foldHelp } from '../core/shared/help-text.js';
import { START } from './help/start.js';
import { SHORTCUTS } from './help/shortcuts.js';
import { DATA_HELP } from './help/data.js';
import { STRUCTURE_HELP } from './help/structure.js';
import { ACTIONS_HELP } from './help/actions.js';
import { COMMON_HELP } from './help/common.js';
import { extensionVersion } from './version.js';
import { mountSettingsOverlay } from './settings-panel.js';
import { createOverlay } from './overlay.js';
import { restartTour } from './tour.js';
import { openCompareJson } from './compare-json.js';
import { isCompareJsonKey } from '../core/shared/shell-keys.js';

/* The status bar's menu and the foot of the help both offer these, each label
 * saying the currency first: Ko-fi in EUR by card, buycoffee.to in PLN by card
 * or BLIK. Each opens in a new tab only
 * when picked; the panel passes nothing to either. */
const SUPPORT_LINKS = [
  { label: 'Ko-fi (EUR, card)', url: 'https://ko-fi.com/mskrz' },
  { label: 'buycoffee.to (PLN, card, BLIK)', url: 'https://buycoffee.to/mskrz' }
];

/* The help text lives in help/*.js; this file keeps the overlay itself. */
const HELP = { data: DATA_HELP, structure: STRUCTURE_HELP, actions: ACTIONS_HELP, common: COMMON_HELP };

/* helpEntry: the title of the one entry the help is narrowed to (opened from a
 * control), or null. */
const shellState = { tab: 'data', helpQuery: '', helpEntry: null, keysOpen: false };
const el = {};

function shortcutTable(rows) {
  const table = document.createElement('table');
  table.className = 'keys';
  rows.forEach(([keys, text]) => {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.scope = 'row';
    keys.forEach((key, at) => {
      if (at) th.appendChild(document.createTextNode(' '));
      const kbd = document.createElement('kbd');
      kbd.textContent = key;
      th.appendChild(kbd);
    });
    const td = document.createElement('td');
    td.textContent = text;
    tr.append(th, td);
    table.appendChild(tr);
  });
  const note = document.createElement('caption');
  note.textContent = 'Single keys; ignored while typing in a field.';
  note.style.captionSide = 'bottom';
  note.style.textAlign = 'left';
  table.appendChild(note);
  return table;
}

/* One entry's text. A long one shows its first sentence and a "more" toggle
 * (the rest is in the page, so the page's find and the help filter both reach
 * it); while the help is being filtered the whole text is shown, since the
 * words that matched may be in the folded part. */
function describe(dd, text, filtering) {
  if (text.includes('\n')) { describeLines(dd, text); return; }
  const { head, rest } = filtering ? { head: text, rest: '' } : foldHelp(text);
  if (!rest) { dd.textContent = text; return; }

  const first = document.createElement('span');
  first.textContent = head;
  const more = document.createElement('span');
  more.className = 'help-rest';
  more.textContent = ` ${rest}`;
  more.hidden = true;
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'help-more';
  toggle.textContent = 'more';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.addEventListener('click', () => {
    const open = more.hidden;
    more.hidden = !open;
    toggle.textContent = open ? 'less' : 'more';
    toggle.setAttribute('aria-expanded', String(open));
  });
  dd.append(first, more, ' ', toggle);
}

/* An entry with several facts is written one per line: the first line is the
 * lead, each later one a bullet ("- " is dropped). Short lines are easier to
 * scan than one paragraph, and they are never folded. */
function describeLines(dd, text) {
  const [lead, ...items] = text.split('\n').map((line) => line.trim()).filter(Boolean);
  dd.appendChild(document.createTextNode(lead));
  const list = document.createElement('ul');
  list.className = 'help-list';
  items.forEach((line) => {
    const li = document.createElement('li');
    li.textContent = line.replace(/^-\s+/, '');
    list.appendChild(li);
  });
  dd.appendChild(list);
}

/* The Keys section when the help is not being filtered: a heading that is a
 * button, with the table behind it. Closed at first; open or closed stays as
 * it was left while the panel is open. */
function foldedKeys(section) {
  const wrap = document.createElement('div');
  wrap.className = 'help-keys';
  const heading = document.createElement('h3');
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'help-keys-toggle';
  toggle.id = 'help-keys-toggle';
  toggle.textContent = section[0];
  toggle.title = 'Show or hide the keyboard shortcuts';
  toggle.setAttribute('aria-controls', 'help-keys-body');
  heading.appendChild(toggle);
  const body = document.createElement('div');
  body.id = 'help-keys-body';
  section[1].forEach(([, rows]) => body.appendChild(shortcutTable(rows)));
  const paint = () => {
    toggle.setAttribute('aria-expanded', String(shellState.keysOpen));
    body.hidden = !shellState.keysOpen;
  };
  toggle.addEventListener('click', () => { shellState.keysOpen = !shellState.keysOpen; paint(); });
  paint();
  wrap.append(heading, body);
  return wrap;
}

function startHere(tab) {
  const items = START[tab];
  if (!items) return null;
  const box = document.createElement('div');
  box.className = 'help-start';
  const heading = document.createElement('h3');
  heading.textContent = 'Start here';
  const list = document.createElement('ol');
  items.forEach((text) => {
    const li = document.createElement('li');
    li.textContent = text;
    list.appendChild(li);
  });
  const tour = document.createElement('button');
  tour.type = 'button';
  tour.className = 'help-more help-tour';
  tour.id = 'help-tour';
  tour.textContent = 'Show the tour again';
  tour.title = 'Close the help and show the tours again: it forgets which were seen and starts with the picker, the tabs, the filter box and the settings gear';
  tour.addEventListener('click', () => { toggleHelp(false); restartTour(); });
  box.append(heading, list, tour);
  return box;
}

/* Where to look for a control's entry: this tab's sections, the shared ones,
 * then the other tabs' (a control such as Definition property is on the scope
 * bar whichever tab is open). */
function entryGroups(content) {
  const others = Object.keys(HELP).filter((key) => key !== 'common' && HELP[key] !== content).map((key) => HELP[key].sections);
  return [content.sections, [HELP.common]].concat(others);
}

/* The controls of the open tab as they stand on screen: the top bar, then the
 * tab's own view. An Advanced one sits under .adv or in the top bar's second row. */
function controlsOnScreen(tab) {
  const scope = document.querySelector('.scope');
  const view = document.getElementById(`view-${tab}`);
  const nodes = [...(scope ? scope.querySelectorAll('[data-help]') : []), ...(view ? view.querySelectorAll('[data-help]') : [])];
  // A button inside a notice (Change data property) is passing help, not a control of the tab.
  return nodes.filter((node) => !node.closest('.notice'))
    .map((node) => ({ help: node.getAttribute('data-help'), advanced: !!node.closest('.adv') }));
}

function renderHelp() {
  const content = HELP[shellState.tab] || HELP.data;
  const controls = controlsOnScreen(shellState.tab);
  const ordered = content.sections.map(([heading, entries]) => [heading, orderEntriesByControls(entries, controls)]);
  el.helpBody.textContent = '';

  const heading = document.createElement('h2');
  heading.textContent = content.title;
  el.helpBody.appendChild(heading);

  const lede = document.createElement('div');
  lede.className = 'lede';
  lede.textContent = content.lede;
  el.helpBody.appendChild(lede);

  const filtering = queryWords(shellState.helpQuery).length > 0 || !!shellState.helpEntry;
  if (!filtering) {
    const start = startHere(shellState.tab);
    if (start) el.helpBody.appendChild(start);
  }

  /* Start here is first; the keys follow, folded until asked for. */
  const keys = ['Keys', [['Keyboard', SHORTCUTS]]];
  const shown = shellState.helpEntry
    ? sectionsTitled(shellState.helpEntry, entryGroups(content))
    : filterSections(shellState.helpQuery, [keys].concat(ordered, [HELP.common]));

  shown.forEach((section) => {
    if (section === keys && !filtering) { el.helpBody.appendChild(foldedKeys(section)); return; }
    const title = document.createElement('h3');
    title.textContent = section[0];
    el.helpBody.appendChild(title);

    const dl = document.createElement('dl');
    section[1].forEach(([term, description]) => {
      if (Array.isArray(description)) {
        /* A table of keys is not a term and its text. */
        el.helpBody.appendChild(shortcutTable(description));
        return;
      }
      const dt = document.createElement('dt');
      dt.textContent = term;
      dl.appendChild(dt);
      const dd = document.createElement('dd');
      describe(dd, description, filtering);
      dl.appendChild(dd);
    });
    if (dl.childElementCount) el.helpBody.appendChild(dl);
  });

  /* The footer only belongs to the unfiltered help. */
  if (filtering) {
    if (!shown.length) {
      const none = document.createElement('p');
      none.className = 'help-empty';
      none.setAttribute('role', 'status');
      none.textContent = 'No help matches';
      el.helpBody.appendChild(none);
    }
    return;
  }

  const foot = document.createElement('div');
  foot.className = 'help-foot';

  const note = document.createElement('span');
  note.textContent = 'Unofficial tool · not affiliated with Salesforce';
  foot.appendChild(note);

  const coffee = document.createElement('span');
  coffee.className = 'help-coffee';
  coffee.append('Buy me a coffee ☕ ');
  SUPPORT_LINKS.forEach((support, index) => {
    if (index) coffee.append(' · ');
    const link = document.createElement('a');
    link.href = support.url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = support.label;
    coffee.appendChild(link);
  });
  foot.appendChild(coffee);

  el.helpBody.appendChild(foot);
}

function setHelpQuery(text) {
  shellState.helpQuery = text;
  shellState.helpEntry = null;
  el.helpSearch.value = text;
}

function toggleHelp(show, options) {
  el.help.toggle(show, options);
}

/* The settings dialog and the help are never both open: the comma and ? keys
 * swap one for the other, without the focus passing through the control that
 * opened the first. */
function toggleSettings(show) {
  if (show !== false && el.help.isOpen()) toggleHelp(false, { restoreFocus: false });
  el.settings.toggle(show);
}

/* Compare JSON opens in place of the help or the settings, like the Settings
 * button of its own does, from the button at the end of the tab strip and from
 * Ctrl/Cmd+Shift+L. */
function openCompare() {
  if (el.help.isOpen()) toggleHelp(false, { restoreFocus: false });
  if (el.settings.isOpen()) el.settings.close({ restoreFocus: false });
  openCompareJson();
}

/* Opens the help narrowed to the entry titled `title`; the filter box shows
 * the title, and typing or clearing it brings the rest back. */
function openHelpFor(title) {
  if (el.settings.isOpen()) el.settings.close({ restoreFocus: false });
  toggleHelp(true);
  shellState.helpEntry = title;
  el.helpSearch.value = title;
  renderHelp();
  el.helpBody.scrollTop = 0;
}

/* The control a help request is about: the nearest element that names its
 * entry with data-help. */
function helpTitleOf(node) {
  const control = node && node.closest ? node.closest('[data-help]') : null;
  return control ? control.getAttribute('data-help') : null;
}

/* Right-click on a toolbar or top-bar control: a one-item menu. Fields you
 * type in keep the browser's own menu (paste, copy). */
function mountControlHelp() {
  document.addEventListener('contextmenu', (ev) => {
    if (ev.defaultPrevented || el.help.isOpen() || el.settings.isOpen()) return;
    const title = helpTitleOf(ev.target);
    if (!title || typingTarget(ev.target)) return;
    ev.preventDefault();
    openContextMenu(ev, [{ label: helpMenuLabel(title), action: () => openHelpFor(title) }]);
  });
}

const TABS = ['data', 'structure', 'actions']; // every tab, whatever order they are shown in

function showTab(name) {
  TABS.forEach((key) => {
    const on = key === name;
    el.tabs[key].button.classList.toggle('is-on', on);
    el.tabs[key].button.setAttribute('aria-selected', String(on));
    el.tabs[key].button.tabIndex = on ? 0 : -1;
    el.tabs[key].view.hidden = !on;
  });

  shellState.tab = name;
  if (el.help.isOpen()) renderHelp();

  if (name !== 'structure') Structure.hide();
  if (name !== 'actions') RemoteActions.hide();

  if (name === 'data') {
    DataTab.show();
  } else {
    DataTab.hide();
    if (name === 'structure') Structure.show();
    else RemoteActions.show();
  }
}

function mountHelp() {
  el.helpOverlay = document.getElementById('help-overlay');
  el.helpBody = document.getElementById('help-body');
  el.helpButton = document.getElementById('help');
  el.helpCard = el.helpOverlay.querySelector('.help-card');
  el.helpSearch = document.getElementById('help-search');

  el.helpSearch.addEventListener('input', () => {
    shellState.helpQuery = el.helpSearch.value;
    shellState.helpEntry = null;
    renderHelp();
  });

  /* The filter box stays at the top while the body scrolls under it; it gets
   * a shadow once there is something scrolled behind it. */
  el.helpCard.addEventListener('scroll', () => {
    el.helpCard.classList.toggle('is-scrolled', el.helpCard.scrollTop > 0);
  });

  el.help = createOverlay({
    overlay: el.helpOverlay,
    card: el.helpCard,
    button: el.helpButton,
    closeButton: document.getElementById('help-close'),
    onOpen: (wasOpen) => {
      if (!wasOpen) setHelpQuery('');
      renderHelp();
    },
    initialFocus: () => el.helpSearch
  });
  el.settings = mountSettingsOverlay();
}

/* Only fields you type into count: a focused checkbox or button (what is left
 * after clicking one) must not turn the shortcuts off. */
const TEXT_INPUTS = /^(text|search|number|email|url|password|tel|)$/;

function typingTarget(target) {
  if (!target || !target.tagName) return false;
  if (target.tagName === 'INPUT') return TEXT_INPUTS.test(target.type || '');
  return /^(TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable;
}

/* Single-key shortcuts, ignored while typing and with any modifier held so
 * they never fight DevTools' own. */
function mountShortcuts() {
  const tabModule = () => ({ data: DataTab, structure: Structure, actions: RemoteActions }[shellState.tab]);

  /* A chord, so it works while typing too. */
  const compareButton = document.getElementById('compare-json');
  document.addEventListener('keydown', (ev) => {
    if (!isCompareJsonKey(ev) || (compareButton && !compareButton.isConnected)) return;
    ev.preventDefault();
    openCompare();
  });
  if (compareButton) compareButton.addEventListener('click', openCompare);

  document.addEventListener('keydown', (ev) => {
    if (ev.ctrlKey || ev.metaKey || ev.altKey || typingTarget(ev.target)) return;
    // Behind an open dialog only ? and , (which swap or close it) are live.
    if ((el.help.isOpen() || el.settings.isOpen()) && ev.key !== '?' && ev.key !== ',') return;

    switch (ev.key) {
      case '/': ev.preventDefault(); tabModule().focusFilter(); break;
      case '?': {
        ev.preventDefault();
        const title = el.help.isOpen() ? null : helpTitleOf(ev.target);
        if (title) openHelpFor(title);
        else {
          if (el.settings.isOpen()) el.settings.close({ restoreFocus: false });
          toggleHelp();
        }
        break;
      }
      case ',': ev.preventDefault(); toggleSettings(); break;
      case '1': case '2': case '3': showTab(TabOrder.order()[Number(ev.key) - 1]); break;
      case 'c': tabModule().copySelected(); break;
      case 'd': if (shellState.tab === 'actions') RemoteActions.compareWithPrevious(); break;
      case 'n': if (shellState.tab === 'data') DataTab.step(1); break;
      case 'p': if (shellState.tab === 'data') DataTab.step(-1); break;
      default: break;
    }
  });
}

function mountTabs() {
  el.tabs = {
    data: { button: document.getElementById('tab-data'), view: document.getElementById('view-data') },
    structure: { button: document.getElementById('tab-structure'), view: document.getElementById('view-structure') },
    actions: { button: document.getElementById('tab-actions'), view: document.getElementById('view-actions') }
  };

  TABS.forEach((name) => el.tabs[name].button.addEventListener('click', () => showTab(name)));

  /* WAI-ARIA tabs: arrows / Home / End move between tabs (activating as they
   * go) and only the active tab is in the Tab order. */
  document.querySelector('[role="tablist"]').addEventListener('keydown', (ev) => {
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    const shown = TabOrder.order();
    const at = shown.indexOf(shown.find((name) => el.tabs[name].button === document.activeElement));
    if (at < 0) return;
    const next = {
      ArrowRight: (at + 1) % shown.length,
      ArrowLeft: (at + shown.length - 1) % shown.length,
      Home: 0,
      End: shown.length - 1
    }[ev.key];
    if (next === undefined) return;
    ev.preventDefault();
    showTab(shown[next]);
    el.tabs[shown[next]].button.focus();
  });
  Nav.setTabSwitcher(showTab);
  TabOrder.mount(document.querySelector('[role="tablist"]'));
}

/* Told by devtools.js when the panel is on screen (see devtools.js and
 * CONTRIBUTING.md's injected-function note — this one crosses a page boundary
 * too, though as a plain global rather than a stringified function, since
 * devtools.js calls it directly on the panel window it already holds). */
function mountVisibilityBridge() {
  let panelVisible = true;

  window.OmniPanel = {
    setVisible(visible) {
      if (panelVisible === visible) return;
      panelVisible = visible;
      Targets.setVisible(visible);
      DataTab.setVisible(visible);
      Structure.setVisible(visible);
    }
  };
}

/* The right of the status bar: the extension's version and the coffee
 * button, whose menu offers the same addresses as the foot of the help. The
 * version is left out where the manifest cannot be read. */
/* The coffee menu, placed at the pointer or, from the keyboard, over the
 * button; a pick opens that address in a new tab. */
function openSupportMenu(ev, button) {
  const rect = button.getBoundingClientRect();
  const at = ev.detail ? ev : { clientX: rect.left, clientY: rect.top, type: 'keydown', detail: 0 };
  openContextMenu(at, SUPPORT_LINKS.map((support) => ({
    label: support.label,
    title: `Open ${support.url} in a new tab`,
    action: () => window.open(support.url, '_blank', 'noopener')
  })));
}

function mountStatusMeta() {
  const version = document.getElementById('status-version');
  const coffee = document.getElementById('status-coffee');
  if (coffee) coffee.addEventListener('click', (ev) => openSupportMenu(ev, coffee));
  const number = extensionVersion();
  if (version && number) {
    version.textContent = `v${number}`;
    version.hidden = false;
  }
}

export function mountPanelShell() {
  mountStatusMeta();
  mountHelp();
  mountTabs();
  mountShortcuts();
  mountControlHelp();
  mountVisibilityBridge();
  mountLiveStatus(document.getElementById('status-live'),
    [document.getElementById('status-left'), document.getElementById('status-right')]);
}
