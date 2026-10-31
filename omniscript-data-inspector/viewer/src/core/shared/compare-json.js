'use strict';

/* Compare JSON (Settings, Tools): the words around two texts the user pastes.
 * Parsing is the test call form's (parseJsonText); what is said about the
 * result is decided here.
 *
 * Pure: no DOM, no chrome.*. */

/* What a box holds, for the line it folds to once compared: "12 keys",
 * "3 items", "a text", "a number", "true". */
export function pastedSummary(value) {
  if (Array.isArray(value)) return `${value.length} ${value.length === 1 ? 'item' : 'items'}`;
  if (value !== null && typeof value === 'object') {
    const count = Object.keys(value).length;
    return `${count} ${count === 1 ? 'key' : 'keys'}`;
  }
  if (typeof value === 'string') return 'a text';
  if (typeof value === 'number') return 'a number';
  return String(value);
}

/* The line under a box: '' when it parses, the place and the reason when it
 * does not ("Line 3, column 7: Unexpected \",\""), and a nudge when it is
 * empty and a comparison was asked for. `parsed` is parseJsonText's answer;
 * with the `text` it was read from, the line also says what is wrong. */
export function pastedProblem(parsed, asked = false, text = null) {
  if (parsed.ok && parsed.empty) return asked ? 'Empty: paste or type JSON first.' : '';
  if (parsed.ok) return '';
  const place = `Line ${parsed.line}, column ${parsed.column}: ${parsed.error}`;
  if (text === null) return place;
  const hint = jsonErrorHint(text, indexOfPlace(text, parsed.line, parsed.column));
  return hint ? `${place}. ${hint}` : place;
}

/* Whether both boxes can be compared. */
export function canCompare(before, after) {
  return before.ok && !before.empty && after.ok && !after.empty;
}

/* ------------------------------------------------------ what is wrong */

const SPACE = /\s/;
const WORD = /^[A-Za-z_$][\w$-]*/;

/* Where a line and column (as parseJsonText counts them) is in the text. */
export function indexOfPlace(text, line, column) {
  const lines = String(text).split('\n');
  let index = 0;
  for (let at = 0; at < Math.min(line - 1, lines.length); at++) index += lines[at].length + 1;
  return Math.min(index + column - 1, String(text).length);
}

/* The text up to `index`, which is valid JSON so far (the index is where it
 * stops being): the containers that are open, whether a key is waiting for its
 * colon, what the last token was, and whether the index is inside a string. */
function readUpTo(text, index) {
  const stack = [];
  let last = null; // 'key' | 'value' | 'open' | 'close' | 'colon' | 'comma'
  let inString = false;
  let at = 0;
  while (at < index) {
    const ch = text[at];
    const top = stack[stack.length - 1];
    if (SPACE.test(ch)) { at += 1; continue; }
    if (ch === '"') {
      let end = at + 1;
      while (end < text.length && text[end] !== '"') end += text[end] === '\\' ? 2 : 1;
      if (end >= index) { inString = true; break; }
      const isKey = !!top && top.type === '{' && top.expectKey;
      if (isKey) { top.sawKey = true; top.key = text.slice(at + 1, end); }
      last = isKey ? 'key' : 'value';
      at = end + 1;
    } else if (ch === '{' || ch === '[') {
      stack.push({ type: ch, expectKey: ch === '{', sawKey: false, key: '' });
      last = 'open';
      at += 1;
    } else if (ch === '}' || ch === ']') {
      stack.pop();
      last = 'close';
      at += 1;
    } else if (ch === ':') {
      if (top) { top.expectKey = false; top.sawKey = false; }
      last = 'colon';
      at += 1;
    } else if (ch === ',') {
      if (top && top.type === '{') { top.expectKey = true; top.sawKey = false; }
      last = 'comma';
      at += 1;
    } else {
      while (at < index && !SPACE.test(text[at]) && !',:{}[]"'.includes(text[at])) at += 1;
      last = 'value';
    }
  }
  return { stack, last, inString };
}

const APEX = 'This looks like an Apex map; JSON writes "Name": "Ada", with a colon and double quotes.';

/* One short sentence on what is wrong at `index`, the first character that
 * makes `text` not JSON, for the common ways text is nearly JSON; '' when
 * nothing useful can be said. */
export function jsonErrorHint(text, index) {
  const source = String(text === undefined || text === null ? '' : text);
  if (!source.trim()) return '';
  const at = Math.max(0, Math.min(index, source.length));
  const ch = source[at];
  const { stack, last, inString } = readUpTo(source, at);
  const top = stack[stack.length - 1];
  const before = source[at - 1];

  if (ch === undefined) {
    if (inString) return 'A text is not closed: add the closing ".';
    if (last === 'colon') return 'A value is missing after the colon.';
    if (top) return `The ${top.type} is not closed: add a ${top.type === '{' ? '}' : ']'} at the end.`;
    return 'The text ends before the JSON is complete.';
  }
  if (inString) {
    if (ch < ' ') return 'A text cannot hold a line break; write \\n instead.';
    if (before === '\\') return 'This backslash escape is not valid in JSON; write \\\\ for a backslash.';
    return '';
  }
  if (ch === '/' && (source[at + 1] === '/' || source[at + 1] === '*')) return 'JSON has no comments; remove them.';
  if (ch === "'") return 'JSON uses double quotes, "like this", for texts and keys.';
  if (ch === '(') return 'Parentheses are not JSON; write a list as [ … ].';
  if (ch === '=') {
    return APEX;
  }
  if ((ch === '}' || ch === ']') && last === 'comma') return `Remove the comma before the ${ch}.`;
  if (top && top.type === '{' && top.sawKey && ch !== ':') {
    return `A key needs a colon and a value, like "${top.key}": 1.`;
  }
  if (last === 'colon' && (ch === '}' || ch === ']' || ch === ',')) return 'A value is missing after the colon.';

  const word = WORD.exec(source.slice(at));
  if (word) {
    const name = word[0];
    const after = source.slice(at + name.length).trimStart()[0];
    if (after === '=') return APEX;
    if (['true', 'false', 'null'].includes(name.toLowerCase())) return 'JSON writes true, false and null in lowercase.';
    if (['NaN', 'undefined', 'Infinity'].includes(name)) return 'JSON has no NaN, undefined or Infinity; use null.';
    if (top && top.type === '{' && top.expectKey) return `Keys need double quotes: write "${name}", not ${name}.`;
    if (!top && last === null) {
      const brace = source.slice(at).search(/[{[]/);
      if (brace >= 0) return `Only one JSON value is allowed; remove what comes before the ${source[at + brace]}.`;
    }
    if (!top && last !== null) return 'Only one JSON value is allowed; remove what follows it.';
    if (last === 'value' || last === 'close') return 'A comma is missing between these two.';
    return `A text needs double quotes: write "${name}".`;
  }
  if (!top && last !== null) return 'Only one JSON value is allowed; remove what follows it, or put the values in a list [ … ].';
  if (ch === '+') return 'A JSON number has no plus sign.';
  if (ch === '.') return 'A JSON number needs a digit before the point, as in 0.5.';
  if (/\d/.test(ch) && last === 'value' && before === '0') return 'A JSON number does not start with 0, except 0 itself and 0.5.';
  if (top && (last === 'value' || last === 'close') && (ch === '"' || ch === '{' || ch === '[' || /[\d-]/.test(ch))) {
    return 'A comma is missing between these two.';
  }
  return '';
}

/* ------------------------------------------------------ reading loosely */

/* "single quotes", "single quotes and unquoted keys", "a, b and c". */
function listWords(words) {
  if (words.length < 2) return words.join('');
  return `${words.slice(0, -1).join(', ')} and ${words[words.length - 1]}`;
}

/* The amber note under a box that was read loosely. */
export function looseNote(words) {
  return words.length ? `Read loosely: ${listWords(words)} were accepted` : 'Read loosely';
}

/* What a box means, from the strict reading (parseJsonText's answer), the loose
 * one (parseLoose's, or null when the strict reading worked) and whether the
 * user accepted the loose one for this text:
 *   kind  — 'empty' | 'json' | 'loose' (accepted) | 'offer' (could be read
 *           loosely, not accepted) | 'bad'
 *   ok / empty / value — what canCompare and the views read
 *   words — what the loose reading accepted */
export function sideReading(strict, loose, accepted) {
  if (strict.ok) return { kind: strict.empty ? 'empty' : 'json', ok: true, empty: strict.empty, value: strict.value, words: [] };
  if (loose && loose.ok) {
    if (accepted) return { kind: 'loose', ok: true, empty: false, value: loose.value, words: loose.loose };
    return { kind: 'offer', ok: false, empty: false, words: loose.loose };
  }
  return { kind: 'bad', ok: false, empty: false, words: [] };
}

/* ------------------------------------------------------ tools */

/* The value with every object's keys in order, at every depth; lists keep
 * their order. */
export function sortKeysDeep(value, depth = 0) {
  if (value === null || typeof value !== 'object' || depth > 200) return value;
  if (Array.isArray(value)) return value.map((item) => sortKeysDeep(item, depth + 1));
  const out = {};
  Object.keys(value).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)).forEach((key) => {
    Object.defineProperty(out, key, { value: sortKeysDeep(value[key], depth + 1), enumerable: true, writable: true, configurable: true });
  });
  return out;
}

/* A captured call's answer as the text of a box, or null when it has none.
 * An answer the panel holds as text is indented when it is JSON. */
export function callOutputText(entry) {
  const output = entry ? entry.output : undefined;
  if (output === undefined || output === null || output === '') return null;
  if (typeof output === 'string') {
    try { return JSON.stringify(JSON.parse(output), null, 2); } catch { return output; }
  }
  return JSON.stringify(output, null, 2);
}

/* The calls the From a call… menu offers: newest first, a chain's group left
 * out (its calls are listed on their own). */
export function recentCalls(entries, limit = 12) {
  return [...(entries || [])].reverse().filter((entry) => entry && !entry.chain).slice(0, limit);
}
