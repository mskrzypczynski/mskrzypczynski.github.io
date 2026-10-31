'use strict';

/* The Export button of the Structure toolbar: a small menu of files built from
 * the loaded definition (core/structure/structure-export.js). The files hold the script's
 * structure and labels only, never a value from the live data (the answers a
 * loaded definition carries are masked while Mask values is on). */

import { openContextMenu } from '../context-menu.js';
import { downloadText } from '../util.js';
import { toast } from '../toast.js';
import { parseObj, maskDefinitionValues } from '../../core/shared/structure-model.js';
import { Mask } from '../mask-setting.js';
import { anchorRect } from '../toolbar-overflow.js';
import {
  structureMarkdown, structureCsv, customLabelsCsv, hasCustomLabels, exportFileName, exportTitle
} from '../../core/structure/structure-export.js';

/* The definition as it was read. With Mask values on, the answers a loaded
 * script keeps in `response` and `defaultValue` are replaced (keys stay), which
 * means writing it out again instead of passing the page's text through. null
 * when masking is on and the text does not parse: there is no structure to
 * keep, and passing it through would leak the answers in it. */
function definitionText(raw, parsed) {
  if (!Mask.on()) return raw;
  if (!parsed) return null;
  return JSON.stringify(maskDefinitionValues(parsed), null, 2);
}

/* state: the tab's state (elements, header, defRaw). */
export function openExportMenu(button, state) {
  if (!state.elements.length) { toast('Nothing to export: no definition is loaded'); return; }

  const definition = parseObj(state.defRaw);
  const save = (what, extension, text, type) => {
    downloadText(exportFileName(definition, what, extension, new Date()), text, type);
  };

  /* Under the button, whether it was clicked or pressed with the keyboard; in a
   * narrow panel the button is in the "…" menu, so under that. */
  const rect = anchorRect(button);
  openContextMenu({ clientX: rect.left, clientY: rect.bottom }, [
    { label: 'Structure as Markdown', action: () => save('structure', 'md',
      structureMarkdown(state.elements, { title: exportTitle(definition) }), 'text/markdown') },
    { label: 'Structure as CSV', action: () => save('structure', 'csv', structureCsv(state.elements), 'text/csv') },
    { label: 'Custom labels as CSV', disabled: !hasCustomLabels(state.elements, state.header),
      action: () => save('labels', 'csv', customLabelsCsv(state.elements, state.header), 'text/csv') },
    '-',
    { label: 'Definition JSON', disabled: !state.defRaw,
      action: () => {
        const text = definitionText(state.defRaw, definition);
        if (text === null) { toast('Not saved: Mask values is on and the definition is not valid JSON, so its answers cannot be hidden'); return; }
        save('definition', 'json', text, 'application/json');
      } }
  ]);
}
