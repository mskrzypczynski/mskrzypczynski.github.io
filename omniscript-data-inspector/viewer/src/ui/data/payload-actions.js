'use strict';

/* Buttons that take the payload out of the panel: copy, save, and exposing
 * the host element as $omni in the page console. Masking is applied by
 * payloadText, so everything that leaves honours the switch. */

import { payloadText } from '../../core/shared/mask.js';
import { Mask } from '../mask-setting.js';
import { Targets } from '../targets.js';
import { copyWithButton } from '../clipboard.js';
import { downloadText, flashText } from '../util.js';

function currentText(state) {
  return payloadText(state, Mask.on());
}

export function copyPayload(state, button) {
  const text = currentText(state);
  if (text === null) { flashText(button, 'Not valid JSON'); return; }
  copyWithButton(text, button);
}

export function downloadPayload(state, button) {
  const text = currentText(state);
  if (text === null) { flashText(button, 'Not valid JSON'); return; }
  if (!text) return;
  downloadText(`omniscript-${new Date().toISOString().replace(/[:.]/g, '-')}.json`, text);
}

export function revealElement(button) {
  const host = Targets.selected();
  if (!host || host.session) return; // a loaded file has no element on the page
  const expression = '(function(i){ try { window.$omni = window.__omniHosts[i];' +
    ' if (typeof inspect === "function") inspect(window.$omni); return true; }' +
    ' catch(e){ return String(e); } })(' + JSON.stringify(host.local) + ')';
  Targets.evalOn(host.frame, expression, () => flashText(button, 'Exposed as $omni'));
}
