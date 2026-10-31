'use strict';

/* [keys, what it does]. Rendered as a table of <kbd> keys in the help overlay;
 * keep in step with the keydown handler in mountShortcuts (panel-shell.js). */
export const SHORTCUTS = [
  [['/'], 'Focus the filter'],
  [['1', '2', '3'], 'Switch to the first, second or third tab, in the order shown'],
  [['Alt', 'Shift', '←', '→'], 'On a tab: move it one place left or right (or drag it); the order is kept'],
  [['n', 'p'], 'Next / previous marked change (Data, with Track changes on)'],
  [['d'], 'Compare the selected call with the previous one to the same place (Calls)'],
  [['Shift', 'D'], 'Compare the selected call with the last successful one to the same place (Calls)'],
  [['b'], 'Make the focused call the baseline for Compare; move to another call to compare with it, press b again to clear (Calls)'],
  [['x'], 'Mark or unmark the focused call (Calls) to add up its time; Shift-click a call\'s box for a range'],
  [['c'], 'Copy the value of the focused row, else the one under the pointer (Data), the selected element\'s value (Structure) or the selected call (Calls)'],
  [['Ctrl', 'C'], 'In a tree or Raw: copy exactly what is highlighted, or, with nothing highlighted, the whole value the caret is in (Cmd+C on a Mac)'],
  [['↑', '↓', 'j', 'k'], 'Move to the previous / next call (Calls) or element (Structure)'],
  [['Home', 'End', 'PageUp', 'PageDown'], 'Jump to the first / last call or element, or ten at a time'],
  [['←', '→'], 'Structure: → opens a section or moves to its first child, ← folds it or moves to its parent'],
  [['←', '→'], 'On the tab strip: previous / next tab (Home and End for the first and last)'],
  [['↑', '↓', '←', '→', 'Enter'], 'In the Data tree (Tab into it): ↑ ↓ move between rows, Home and End go to the first and last, → opens a branch or moves to its first child, ← folds it or moves to its parent, Enter or Space opens and closes it'],
  [['↑', '↓', 'Enter', 't'], 'In the Changes view: ↑ ↓ move between changes, Enter opens or closes one to show its values, t finds it in the tree'],
  [['Alt', 'click'], 'In a tree: open or close a branch and everything inside it (Option-click on a Mac); a plain click changes one level'],
  [['Ctrl', '\\'], 'Focus mode (Structure and Calls): hide the list so the detail takes the full width, or show it again (Cmd+\\ on a Mac). Esc in the detail also brings the list back'],
  [['Ctrl', '=', '-', '0'], 'Text size: larger, smaller, back to Medium (Cmd on a Mac); works wherever the focus is in the panel'],
  [[','], 'Open or close the settings (the gear in the top bar)'],
  [['Ctrl', 'Shift', 'L'], 'Open Compare JSON, from anywhere in the panel (Cmd+Shift+L on a Mac)'],
  [['?'], 'Show or hide this help; with a toolbar or top-bar button or switch focused, open the help at its entry'],
];
