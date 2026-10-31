/* A classic script, so it runs even where the panel's modules cannot: browsers
 * refuse to load ES modules from file://, and an old browser may refuse them
 * for other reasons. It only says so; the panel starts without it. */

/* global window, document, location, setTimeout */
(function () {
  var hint = document.getElementById('viewer-hint');
  if (!hint) return;

  function show(text) {
    hint.textContent = text;
    hint.hidden = false;
  }

  if (location.protocol === 'file:') {
    show('Opened from a file: browsers block ES modules there. Serve this folder instead, for example "npx http-server ." or "python3 -m http.server", and open http://localhost:8080/viewer/ (or :8000).');
    return;
  }

  setTimeout(function () {
    if (!window.__viewerReady) show('The panel did not start. This page needs a current browser (Chrome, Edge or Firefox) with JavaScript on; the console says what failed.');
  }, 8000);
})();
