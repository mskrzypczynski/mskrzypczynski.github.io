'use strict';

/* The bundle viewer: the real panel, running in an ordinary page.
 *
 * Chrome gives a DevTools panel a `chrome` object; a web page has none. This
 * module installs a small stand-in before the panel boots: an empty "inspected
 * page" (one hidden frame with no OmniScript in it), no network feed, and
 * in-memory extension storage. With nothing live to read, the panel starts
 * empty, and a debug bundle opened through the panel's own Open bundle
 * path (src/ui/session-mode.js) fills every tab, read-only.
 *
 * Everything stays in the browser: no upload, no network request of its own,
 * and nothing is stored once the page is closed. */

/* global window, document, DataTransfer, Event, setTimeout */

const config = window.__VIEWER_CONFIG || {};

/* ------------------------------------------------------- chrome stand-in */

function installChromeStand() {
  const stored = {};
  let frame = null;

  /* The page the panel inspects: a hidden frame, so the panel's own page-side
   * functions run against a real document. It holds no OmniScript. */
  function pageFrame() {
    if (frame) return frame;
    frame = document.createElement('iframe');
    frame.setAttribute('aria-hidden', 'true');
    frame.tabIndex = -1;
    frame.style.cssText = 'position:absolute;width:0;height:0;border:0;visibility:hidden';
    document.documentElement.appendChild(frame);
    return frame;
  }

  function evaluate(expression, second, third) {
    const callback = typeof second === 'function' ? second : third;
    let result;
    let exception;
    try {
      result = pageFrame().contentWindow.eval(expression);
      /* The real bridge hands back JSON-like data, not live objects. */
      result = result === undefined ? undefined : JSON.parse(JSON.stringify(result));
    } catch (error) {
      exception = { isException: true, value: String(error) };
    }
    if (callback) setTimeout(() => callback(result, exception), 0);
  }

  const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  const themeName = () => (dark && dark.matches ? 'dark' : 'default');

  window.chrome = window.chrome || {};
  window.chrome.runtime = { getManifest: () => ({ version: config.version || '' }) };
  window.chrome.devtools = {
    panels: {
      get themeName() { return themeName(); },
      setThemeChangeHandler(handler) {
        if (dark && dark.addEventListener) dark.addEventListener('change', () => handler(themeName()));
      }
    },
    network: {
      onRequestFinished: { addListener() {} },
      onNavigated: { addListener() {} }
    },
    inspectedWindow: {
      tabId: 1,
      reload() {},
      getResources: (callback) => setTimeout(() => callback([]), 0),
      eval: evaluate
    }
  };

  /* Remember my settings and the tour work for as long as the page is open. */
  window.chrome.storage = {
    local: {
      get: async (key) => {
        const keys = typeof key === 'string' ? [key] : Array.isArray(key) ? key : Object.keys(stored);
        return Object.fromEntries(keys.filter((name) => name in stored).map((name) => [name, stored[name]]));
      },
      set: async (values) => { Object.assign(stored, JSON.parse(JSON.stringify(values))); },
      remove: async (key) => { [].concat(key).forEach((name) => { delete stored[name]; }); }
    }
  };
}

/* ---------------------------------------------------------------- the bar */

function mountBar(openBundle) {
  const bar = document.getElementById('viewer-bar');
  const button = document.getElementById('viewer-open');
  const store = document.getElementById('viewer-store');
  if (config.storeUrl && store) store.href = config.storeUrl;
  if (button) button.addEventListener('click', () => openBundle.click());

  /* A file dropped anywhere on the page counts: the bar says "here" but
   * missing it by a few pixels should not lose the file. */
  let depth = 0;
  const hasFile = (event) => event.dataTransfer && Array.from(event.dataTransfer.types || []).includes('Files');
  window.addEventListener('dragenter', (event) => {
    if (!hasFile(event)) return;
    depth += 1;
    document.body.classList.add('is-dropping');
  });
  window.addEventListener('dragleave', (event) => {
    if (!hasFile(event)) return;
    depth = Math.max(0, depth - 1);
    if (!depth) document.body.classList.remove('is-dropping');
  });
  window.addEventListener('dragover', (event) => { if (hasFile(event)) event.preventDefault(); });
  window.addEventListener('drop', (event) => {
    if (!hasFile(event)) return;
    event.preventDefault();
    depth = 0;
    document.body.classList.remove('is-dropping');
    const file = event.dataTransfer.files[0];
    if (file) openBundle.load(file);
  });
  if (bar) bar.hidden = false;
}

/* The panel's own Open bundle control: its hidden file input does the reading,
 * parsing, size check and error toast. A dropped file is handed to that same
 * input, so both ways in end up in one place. */
async function bundleControl() {
  const { bundleOpenControl } = await import('./src/ui/session-mode.js');
  const [button, input] = bundleOpenControl();
  document.body.appendChild(input);
  return {
    click: () => button.click(),
    load(file) {
      const transfer = new DataTransfer();
      transfer.items.add(file);
      input.files = transfer.files;
      input.dispatchEvent(new Event('change'));
    }
  };
}

/* ------------------------------------------------------------------ start */

installChromeStand();
await import('./src/ui/app.js');
mountBar(await bundleControl());
window.__viewerReady = true;
