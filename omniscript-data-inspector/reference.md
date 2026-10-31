# OmniScript Data Inspector: reference

Every entry of the panel's help (the ? button), by tab. Version 2.0.0. Generated from the panel's own help; the web version at https://mskrzypczynski.github.io/omniscript-data-inspector/reference.html can be searched.

<a id="data"></a>

## Data

The JSON the selected OmniScript is holding right now, re-read on a timer.

<a id="data-start"></a>

### Start here

1. Pick your OmniScript in the top bar (press Rescan if the list is empty). Its data appears as a tree.
2. Use the page: changed values flash amber, and Auto-refresh keeps the tree live.
3. Type in the filter to narrow the tree. A path such as Step:Rows\|2:Field or key=value works too.
4. Hover a row for its buttons (copy, show in Structure), or right-click it.

<a id="data-amber-highlight"></a>

### Amber highlight

**A value that changed since the previous read flashes amber for a few seconds.**

Watch the tree while you use the page: a value that changed since the previous read flashes amber. A collapsed branch that holds a change is marked with a dot, so you know where to open.

The flash lasts a few seconds.

<a id="data-jumping-to-a-row"></a>

### Jumping to a row

**Jumps scroll a row into view, open what hides it and flash it amber.**

Show in Data from Structure takes you to a row in the tree. It scrolls into view, opening what hides it, and flashes amber for under two seconds. While it flashes, c copies it.

Nothing stays outlined or selected afterwards, so the row then looks like any other. c copies the row only while no other row is focused or under the pointer; once the flash is over, c asks you to point at a row. Hover or Tab to a row to carry on from there.

<a id="data-inspect-element"></a>

### Inspect element

**Select the OmniScript's element in the Elements panel and keep it as $omni.**

Shown in the top bar's second row, with Show the Frame row ticked in Settings. After you press it, use $omni in the Console to poke at the element.

<a id="data-refresh"></a>

### Refresh

**Re-read the data of the selected script now.**

The blue main button while Auto-refresh is off. With Auto-refresh on, the tab updates itself and Refresh is a plain button. Rescan in the top bar is different: it looks for scripts and frames again.

It reads the data property of the selected script in full.

<a id="data-auto-refresh"></a>

### Auto-refresh

**Keep the data live: re-read it about once a second.**

Untick it for manual mode: the data is read only when you press Refresh or change the property or script, never by a rescan or by switching tabs. The status bar then says Manual mode. While text is selected in the tree, updates wait so you can copy it.

The rate is Refresh rate in Settings; it slows to every few seconds while nothing changes, and touching the panel brings the fast rate back. Polling stops while the panel is off screen. Updates also wait while the pointer is on a copy button, until you release the selection.

<a id="data-left-the-page"></a>

### Left the page

**The last data read stays on screen, marked stale, when the script goes away.**

If the OmniScript disappears, for example because the page navigated, the last data read stays on screen, marked as stale. Pick another OmniScript, or wait for a new one to appear, to carry on.

<a id="data-data-property"></a>

### Data property

**Read the data from a property other than jsonDataStr.**

In Settings (the gear), under Data, in Reading another page; it starts fresh every DevTools session. Click the field to list what the selected element exposes, type to filter ("jsd" finds jsonDataStr), then arrows and Enter to pick. A change is applied and the page is scanned again at once. When no OmniScript is found, see No OmniScript found.

Any property name works, and a name that is not listed can still be typed. The list shows each value's type. The setting applies to the Data tab and to the scan that lists the OmniScripts in the top bar; the Structure tab's Current values still read jsonDataStr, so a script that keeps its data elsewhere shows nothing there. While it is not jsonDataStr, the Settings gear shows a count and Settings that differ lists it.

<a id="data-buttons-on-a-row"></a>

### Buttons on a row

**Hover a row for icon buttons that copy its value, branch or merge field.**

Hover a row, or move to it with the keyboard, for small icon buttons after its value. The overlapping sheets copy the value as JSON, or the whole branch; % copies a %merge% field. A plus or minus box opens or closes a whole branch. An arrow button on a record Id opens that record in a new tab.

The Form's rows have the same buttons, except the plus or minus box. They never make a row taller, and a row you only clicked does not keep them. From the keyboard, Tab from a focused row goes to its first button and Tab again to the next; Shift+Tab comes back. Only the focused row's buttons are in the Tab order. The icon turns into a check mark for a moment once copied. The % button gives a path such as %Step:Rows\|2:Code% (the same as Copy as %merge% field in the row menu); it is a path, so Mask values leaves it as it is. The plus or minus box is the same as Alt+click on the row, and it holds while a filter is on. Dragging to select several rows still copies them as clean indented text. A value is taken for a Salesforce record Id when it is 15 or 18 letters and digits with a digit among the first nine, not only digits; an 18-character Id must also end with its checksum, so a word such as a name is not taken for one. The record button opens the page's own address plus the Id; the panel sends nothing, your browser opens it. The Id stays plain text, so selecting and copying it works as before. The button is not shown when the page's address cannot be read.

<a id="data-show-in-structure-button"></a>

### Show in Structure button

**Select the element that owns this key in the Structure tab.**

Hover a row for the Structure icon, the tab's own. It switches to the Structure tab and selects the element that owns the key, or the nearest parent element. Structure's Show in Data does the reverse.

<a id="data-mask-values"></a>

### Mask values

**Replace strings and numbers with placeholders in everything that leaves the panel.**

While it is on (the switch in the top bar), Export (Copy JSON and Save file), the per-row copy button, copied selections, Structure's value copy and the Calls export replace strings and numbers with \<string\> and \<number\>. Keys, structure, empty strings, booleans and null stay. Off each time the panel opens, unless Mask values at start is ticked in Settings.

On screen the tree and the Raw view still show the data itself. Selections copied from the tree and the Raw view are masked the same way. The switch itself is not stored.

<a id="data-views"></a>

### Views

**Pick how the data is drawn: Tree, Form or Raw.**

The view switch is first on the toolbar and stays put. Tree is the collapsible tree. Form lists each key as a labelled row. Raw is the page's own text.

The view names keep their words at every panel width. The choice of Tree, Form or Raw is kept by Remember my settings (on by default). Expand all and Collapse all stay in place in every view and are greyed out where there is nothing to open.

<a id="data-tree-view"></a>

### Tree view

**Show the data as a collapsible tree, with line numbers that match Raw.**

The view the tab opens in. Every key shows its type, and the twisty opens a branch. Click a row to select it, and hover it for its buttons.

<a id="data-expand-all-collapse-all"></a>

### Expand all / Collapse all

**Open every branch of the Tree or Form, or close them to the top level.**

They stay in the same place in every view. In Raw there is nothing to open, so they are greyed out. While a filter is active, Expand all opens every match and Collapse all closes every branch but the top one.

In a big tree Expand all opens the first branches and says how many (see Big data). When they are greyed out, their tooltip says to switch to the Tree or the Form.

<a id="data-form-view"></a>

### Form view

**Show the data as the page's form: a label and a value for each key.**

Each key is a row with its label and value. An object or a list shows "3 items": click it, or press Enter or → on the row, to open it in place; ← closes it. The filter box works as in the Tree. Right-click a row for the Tree row's menu.

Form lists the data the way the page's form is laid out, with the rows the Structure tab's Current value Form has. A row's label is the label of the element that owns the key, with the element's name dimmed after it. A key with no element of its own (or a script whose definition has not been read) is its own label. A value is plain monospace text. Rows are the Tree's branches, so what is open in the Tree is open in the Form, and Expand all and Collapse all work on both. The filter box narrows the rows by label, key or value as it narrows the Tree, with the way down to each match and everything under a key or label that matched; an OmniScript path or key=value selects the rows the Tree would. Right-click a row, or press the menu key (or Shift+F10) on it, for the Tree row's menu: Show in Structure, copy the value, the path or the merge field, filter, open record. A row has the Tree's buttons after its value, on hover and for the keyboard (see Buttons on a row): copy as JSON, copy as a %merge% field, Show in Structure and, on a record Id, open the record. Mask values applies as in the Tree, also to a selection dragged across rows. Like the Tree, the Form pins the open groups the first visible row sits inside at the top while you scroll (see Sticky path). Tab goes to the rows (one at a time is in the tab order); the up and down arrows, Home and End move between them, and c copies the focused row's value. Export (Copy JSON, Save file…) copies or saves the data, not the view. A very long list is drawn up to 400 rows, and a line below the last one says how many are left; filter, or use the Tree or Raw, to reach them.

<a id="data-filter"></a>

### Filter

**Narrow the tree by text, a path such as Step:Rows\|2:Field or key=value.** (/)

Type text to narrow the tree; each match is shown with the rows above it. A path such as Step:Rows\|2:Field and key=value such as Name=Ada work too. In Raw view it is a text search.

The number after \| counts from 1; without it a list is searched in every row. key=value matches at any depth, on the whole value, ignoring case; a path can be the key, and key= alone lists every place the key appears. If a path or key=value finds nothing it is searched as plain text instead.

<a id="data-toolbar-icons"></a>

### Toolbar icons

**In a narrow panel the buttons show only their icons.**

Every toolbar button has an icon. When the panel is too narrow for the labels, only the icons are shown, except Refresh and Recording / Paused; hover an icon for what it does. In a narrow panel (DevTools docked to the side) the top bar buttons are icon-only too.

<a id="data-right-click"></a>

### Right-click

**Open a row's menu: copy, filter, open record and more.**

Right-click a row (the Form's rows too), or press the menu key or Shift+F10 on it, for: copy value, key, path or merge field, filter to this key, show in Structure, open record, expand or collapse the branch. The arrow keys move between items, and Esc closes the menu.

The path is written as in the OmniScript (StepA:Rows\|2:Code, repeat positions from 1), and the merge field is the same path as %StepA:Rows\|2:Code%. Open record works on a record Id: it opens the record in a new tab, and is greyed out as Open record (no page) when there is no page to take the address from. Expand or collapse works on the branch, or on everything inside it. In any menu the up and down arrows wrap, Home and End go to the first and last item, and Esc closes it with the focus back on the row it was opened from.

<a id="data-raw-search"></a>

### Raw search

**In Raw view the filter box searches the text and marks every match.**

Every match is marked. Enter and Shift+Enter walk the matches, and the status bar counts lines and matches. Long lines wrap. Ctrl/Cmd+C copies exactly the highlighted text; with only a click inside a value, it copies that value.

<a id="data-copying"></a>

### Copying

**Copy exactly the text you highlight, or the value you clicked in.** (Ctrl/Cmd+C)

Select a few characters of a value and only those are copied. A selection across several rows is copied as clean indented text. With nothing highlighted, click inside a value (tree or Raw) and copy: you get the whole value, a string without its quotes when the caret is between them. Mask values applies to all of it.

<a id="data-export-data"></a>

### Export data

**Copy the data as JSON or save it to a file. Honours Mask values.**

The Export button, at the end of the toolbar, opens a menu: Copy JSON and Save file…, which writes omniscript-\<time\>.json. Both write the page's own text, whatever the view, and replace strings and numbers when Mask values is on. The file may contain org data, so handle it accordingly. In a narrow panel Export is in the … menu.

Both write the page's text in its own key order. A property that is not valid JSON cannot be copied or saved while Mask values is on.

<a id="data-big-data"></a>

### Big data

**A tree of many rows is drawn a window at a time as you scroll.**

A tree of more than 1500 rows is drawn a window at a time as you scroll, so nothing is cut off. Dragging a selection across rows, or Ctrl/Cmd+A, copies only the rows drawn, and a toast says so (Copied 112 of 41,000 rows). Use the copy button on the branch, or Export, for everything.

Expand all opens branches, not values, and says how many it opened if there are more than 20,000.

<a id="data-tree-form-raw"></a>

### Tree / Form / Raw

**Show the page's own text, one entry per line, with the Tree's line numbers.**

Raw lists the keys in the Tree's order (JavaScript puts keys like 10 and 2 first) and keeps every digit as the page wrote it. Export's Copy JSON and Save file… write the page's text in the page's own key order. If the property is not valid JSON, the raw value is shown with the parse error.

The Tree itself shows the parsed value, which also rounds integers above 2^53; when the data holds such integers the status bar says so. If a key is repeated in the data JSON, the parsed value is shown instead.

<a id="data-sticky-path"></a>

### Sticky path

**The open branches above the first visible row stay pinned at the top.**

While you scroll a long tree or the Form, the open branches the first visible row sits inside stay pinned at the top, outermost first, at most three lines: Step, Block, Items. Click one to scroll to that row.

It works for big data drawn a window at a time too. The lines are for the mouse; from the keyboard, ← on a row goes to its parent.

<a id="data-keyboard-in-the-tree"></a>

### Keyboard in the tree

**Move through the rows with the arrow keys, open with Enter, copy with c.**

Tab moves into the rows. Then the arrow keys move between rows, Home and End go to the first and last, → opens a branch or moves into it, ← folds it or moves to the parent, Enter or Space opens and closes it, c copies the row's value, and the context-menu key opens its menu.

Only one row at a time is in the Tab order. With no row focused, c copies the row under the pointer, or the row you have just jumped to for as long as it flashes. A row changed since the marks were cleared announces its previous value (Was: …) to screen readers. Mouse use is unchanged.

<a id="structure"></a>

## Structure

Every element the OmniScript is built from, read from its definition and joined to the live data.

<a id="structure-start"></a>

### Start here

1. Pick your OmniScript in the top bar. The list shows every element of its definition.
2. Click an element to see its value, properties, rules and calls on the right.
3. Follow current step keeps the script's current step selected; Current step jumps back to it.
4. Type in the filter to find an element by name, type or label.

<a id="structure-definition-property"></a>

### Definition property

**Choose which element property holds the OmniScript definition.**

Set it in Settings (the gear), under Data, in Reading another page, next to Data property. It starts fresh every DevTools session. The default is jsonDef. Click the field to pick from the properties the script exposes. A change applies at once and the page is scanned again.

The field is not in the Structure toolbar. It offers the same fuzzy list of properties as the Data tab. The Settings gear in the top bar counts it while it is not jsonDef. When no script is found, the list says so in one line with a Rescan button and a More help link, the toolbar controls are greyed out and the detail pane is folded away until a script turns up.

<a id="structure-refresh"></a>

### Refresh

**Read the definition and custom labels again; your selection and folds stay.**

Use it after you edit the script in the Designer, when you do not want to wait for the automatic read. It does not read the data JSON; the Data tab's Refresh does that. Rescan at the top looks for scripts and frames instead.

It keeps its text when the toolbar is narrow, and is the one toolbar button that works while no script is found. The definition is also read again about every six seconds while this tab is open (see Editing in Designer).

<a id="structure-view"></a>

### View

**Switches that narrow the list or change how it behaves.**

Switches: Highlight on hover and Visible only. A tick marks one that is on; all start off. The button shows how many are on, so a shortened list is never a surprise. Arrow keys move, Enter or Space toggles, Esc closes the menu.

Highlight on hover is kept by Remember my settings and put back by Restore default settings; Visible only starts fresh every session, and Restore default settings turns Visible only off.

<a id="structure-row-menu"></a>

### Row menu

**Right-click a row for actions on that element.**

Right-click a row, or press the menu key on it: Copy name, Copy OmniScript path, Show in Data, Highlight on page, Expand this branch or Collapse this branch (step or block) and Select this row. Right-clicking alone does not select.

The row is outlined while the menu is open. Copy OmniScript path reads the element's JSONPath property, or the names from its step down. Highlight on page works for a step, field or block; an action or validation is not drawn on the page. Expand this branch and Collapse this branch open or fold the step or block and every section inside it.

<a id="structure-filter"></a>

### Filter

**Find elements by name, type, label or label text.** (/)

Type part of a name, type or label. A word from the screen also finds an element whose label is only a custom-label key. The steps and blocks above a match stay in the list, dimmed. To list only the elements a custom Lightning web component overrides, type override:, or override:name for one component.

It matches every custom-label key an element uses together with the text it resolves to. If the element you selected is filtered out, the detail pane says so. For override:name, the c-my-input tag and the myInput name both match.

<a id="structure-highlight-on-page"></a>

### Highlight on page

**Outline the element's component on the inspected page for a moment.**

Use the detail pane's button, or turn on Highlight on hover in the View menu. The outline lasts a couple of seconds. It is best effort and says so when it cannot find the component.

The component is found through the lwcId in the definition. It needs an open shadow root and an element that carries that id.

<a id="structure-calls-tab"></a>

### Calls tab

**Show what an element sends, where the answer lands and its matching captured calls.**

For an element that calls a Data Mapper, Integration Procedure or class, the tab starts with Sends and Response node, read from its settings, then On failure when set, and the name of what it calls. Below are the matching calls captured in Calls; click one to open it there. The tab is there before any call was captured.

Sends is sendJSONPath, with sendJSONNode and the extra payload; the whole data when no path is set; only the extra payload when sendOnlyExtraPayload is on. Response node is responseJSONNode, with responseJSONPath; when none is set it says none set and that the answer lands in the data root, the top level of the data. The place in the data is a button that opens it in the Data tab when the data holds it now. When the action sets extra input, an Additional input card follows (and a Remote options card for its remote options): each Name, the Value as written and the Computed value, what it comes to with the %merge% fields filled in from the data (tagged estimated ≈ for a formula, can't tell with the reason in the tooltip). Copy in the card's header puts the table on the clipboard; Mask values replaces what the data holds. The matching calls show time, result and duration. Best effort: a property a build names differently simply shows less.

<a id="structure-name"></a>

### Name

**Rows read as API name first, then the label in parentheses.**

In a multi-language script, labels and Text Block text are custom-label keys, resolved through the script's custom labels. A single-language script stores the text on the element. The detail pane shows the underlying label or text key.

Custom labels are resolved through scriptHeaderDef.allCustomLabels. Text Blocks show their text (textKey or text). The status bar shows the script language.

<a id="structure-element-icons"></a>

### Element icons

**Each row starts with an icon for the kind of element.**

A window is a step, brackets round a line a block, a text box an input, a ticked box a choice, lines of text a display element, a bolt an action, a circled ! a validation, Set Errors or Messaging element, \<\> a custom component and a dot anything else. Hover an icon or the row for the exact type.

A display element is a Text Block, an image or a link. The icons are drawn the same size as the other marks. The list has no Type column: hover the icon or the row, or read the type in the detail head. Click the Marks header for a legend of all the marks (see Marks column).

<a id="structure-marks-column"></a>

### Marks column

**Small marks at the right of each row; click the header for a legend.**

Hover a mark for its reason.

- \* required
- closed eye: hidden
- diamond: has a show rule, shown now
- two arrows: makes a call
- cube: overridden by a custom component
- triangle: custom label missing
- unequal sign: value does not fit the type

The column sits at the right edge of the list, just before the Valid column and apart from it by a hairline, so every row shows its name on the left and all its marks at the same place on the right, whatever the depth. A row with none leaves the cell empty. Required is a neutral \* because red is kept for things that fail. The tooltip of the closed eye says which rule fails and what the field holds, then Shown when: and the rule; a hidden row carries the closed eye alone. The diamond, as a flowchart draws a condition, means a show rule that is shown now; its tooltip reads Shown when: and the rule on one line, then what it comes to now. The cube's tooltip names the custom component. The triangle means a custom-label key the element uses (label, Text Block text, help text or a manually-entered choice option) is missing from allCustomLabels, which breaks a multi-language OmniScript; hover for which. The list has no Value column: the Current value tab, and its Form view for a step, show every value. The header is a button: Enter or Space open the legend too, and Escape closes it.

<a id="structure-sections"></a>

### Sections

**Expand all and Collapse all open or fold every section of the list.**

Click a section's chevron to fold it; a folded section shows how many elements it holds, such as (3). Expand all and Collapse all, the icon buttons after the View menu, do every section. Folding also works while a filter is on. A long step keeps its row pinned under the column header as you scroll.

Steps and blocks that contain other elements are set in a heavier type, with a hairline above them. Everything starts expanded. The two buttons do not touch the detail pane, whose JSON trees have their own pair when they are on show. A folded section hides its matches too, and they come back when you unfold it. A faint guide runs down each level of indent. Selecting a step or block tints everything inside it, at any depth, in one shade, and draws a strong bracket along its own guide for the full height of what it holds; hovering a section header lights a lighter bracket for its subtree on top of that, so you can see where a block inside the selected step begins and ends. The pinned row is the step you are in; the next step's row takes its place when it arrives.

<a id="structure-valid-column"></a>

### Valid column

**One glyph per row: passes its rules, would stop Next, or can't tell.**

✓ passes its rules now (on a step only), ✕ would stop Next now, – the panel cannot tell, blank when there is nothing to judge. Hover a glyph for the reason. A step shows the sum of its elements. A step still ahead, and everything in it, is blank because its data does not exist yet.

The last column of the list, at the right edge after the Marks column and a hairline. The glyphs are the same ones as the Result of the Calls list. The header is the word Valid, with a tooltip that explains the column; a screen reader reads the same sentence as the hover. On an element of the step the script is on, or of a step already passed: a required input is ✕ Required and empty, or blank when filled (one the show rules hide is blank too, since hidden fields do not stop Next); a Messaging or Validation element is ✕ while it shows a Requirement or Error message, – when the panel cannot tell, blank when it passes or only fires a warning; a Set Errors element is ✕ while it fires, blank when it does not; a custom component is –, since its own controls cannot be read from the definition. Anything else (display text, a block, an action, an input that is not required) is blank: there is nothing to judge, and blank is not –, which means the panel tried and could not tell. A step shows ✕ with the count of what would stop Next, ✓ when nothing stops Next on it, – when only a formula's estimate is in doubt, and – Passed without running for a step whose show rule was false. A passed step is judged against the data right now, like the current one, so a ✕ there means its data has gone bad since. With no data read the whole column is blank. Judged against the data right now; best effort. The step the script is on is told by its row and the elements inside it: they share a faint tint of the accent, as an editor marks its current line, and the step's own row alone has a 4 px bar in the accent on its left edge, a bold name, and "The step the OmniScript is on now" in the tooltip of its name (the indent guides are plain grey, so the bar is the only blue stripe). Steps ahead are dimmed, and a step passed without running is dimmed and in italics, with "Passed without running: its show rule was false" in the tooltip of its name. This is read from the definition (asIndex against each element's indexInParent) for top-level steps and actions. A Set Values, between steps or inside one, counts as run once the script has reached its step and its show rule is true (judged against the live data, or the definition's bShow when the rule cannot be judged).

<a id="structure-follow-current-step"></a>

### Follow current step

**Keep the step the script is on selected as it moves on.**

On by default. Picking an element by hand pauses following: a small dot appears after the label and the tooltip says it is paused. Press Current step, or tick the box again, to resume. Filters are left alone.

The label itself never changes, so the toolbar does not move. Pressing Esc in the list pauses it too (see Summary).

<a id="structure-hidden-elements"></a>

### Hidden elements

**A dimmed row in italics with a closed eye is not shown right now.**

The closed eye carries the show rule in its tooltip, Shown when:. The detail pane says in one sentence which rule fails and what the field holds. Children of a hidden element are hidden too. The status bar counts them ("2 hidden"). Visible only, in the View menu, leaves them out of the list.

A diamond mark means the element has a show rule and is shown. The status bar count leaves out any hidden element that rests on a guess: a rule the panel cannot tell about, a formula's estimate, or a parent that is hidden for one of those reasons (these show the diamond instead of the closed eye, and Visible only still drops them). Show rules are evaluated against the live data, not the definition's bShow, which is only a snapshot from when the definition was read. The sentence reads like Hidden: Step:Type is "y", not "x". Rules the panel cannot tell about (unusual operators, a formula it cannot evaluate) fall back to bShow.

<a id="structure-show-in-data"></a>

### Show in Data

**Open the Data tab at the selected element's value.**

Press Show in Data in the detail pane, or choose it in the row menu. The panel finds the value through the element's OmniScript path. Data's Structure row button does the reverse.

It is left out for an element that has no place in the data.

<a id="structure-current-step"></a>

### Current step

**Select and scroll to the step the OmniScript is on now.**

The status bar names the step, for example "Plan Selection (step 4 of 5)"; hover it for where that was read from. If it names no step, the definition did not say which one the script is on.

It also resumes Follow current step when that was paused.

<a id="structure-value"></a>

### Value

**The Current value tab shows an element's live data; the list has no Value column.**

Open the Current value tab (see Current value views). For a radio or select with manual options, the stored value is joined with its option label, such as US (United States). For an element inside a Repeat Block or Edit Block, the detail head steps through the rows (see Repeat rows).

<a id="structure-detail-tabs"></a>

### Detail tabs

**Tabs of the detail pane: Current value, Options, Properties, Visibility, Validation, Calls and JSON.**

A tab that does not apply is left out, never greyed. A pick opens on its default tab: Current value when the element has a value, Validation for a step that may stop Next, Visibility for an element with a show rule, otherwise Properties. JSON opens only when you pick it.

A tab you pick stays for the elements that have it. Order, each with an icon: Current value (Set Values for a Set Values element), Options (for a choice element that lists its options), Properties, Visibility, Validation, Calls, JSON. Left out when it does not apply: Current value while the data holds nothing for the element (a Formula element keeps it, for its Formula card), Options for an element that lists none, Properties for an element with none, Visibility for an element with no rule that nothing else uses, Validation for an element that has none (a step gets one while something may stop Next on it), Calls for an action whose settings say nothing and that no captured call matches. A tab comes back when its data does. A Set Errors or Messaging element also opens on Validation. With Remember my settings, the tab you picked is kept for the next time DevTools opens (not JSON; Show internal on the Properties tab is kept as well). JSON is last and is not a default: it is the element as JSON, as the Designer's Edit Properties as JSON shows it, for when the readable tabs are not enough, and the next element does not follow you there, unless it is the only tab the element has. What a tab says is drawn as cards, one frame for every fact: a bordered box whose header line holds the card's name in small capitals, the verdict as a tag when there is one (Fails, Passes, Hidden, Shown, Can't tell; hover it for the whole sentence), other tags (estimated ≈) and Copy at the right; hover the header for what the card is. Inside are labelled rows (the label in small capitals, the value beside it, or above it in a pane narrower than 480 px, with a divider between rows) or a table whose cells stack under their column's name in a narrow pane. Names and values are in a monospace font, words in the panel's own; an element's name is a link that selects it; what the panel cannot know is dimmed and in italics (can't tell, not in data); a state is a tag after its value: differs (amber) when a computed value and the current value are not the same, estimated ≈ (outlined) for what a formula the panel evaluates itself comes to, read from the data (grey) for a value the panel took from the data because it cannot work it out. A card's Copy copies it as text, with Mask values applied. Expand all and Collapse all appear only on a tab that draws a JSON tree (Current value in its Tree view, and JSON), the filter box on a tree, on the Form and on Properties, and the toolbar's Copy on JSON. In a pane narrower than 600 px the tabs show a short name beside the icon (Value, Opts., Props, Visib., Valid., Calls, JSON); the full name is the tab's tooltip and stays for screen readers. Right-click a line in any tree of the pane for the same menu as in Data: copy the value, the key, the OmniScript path or the %merge% field, and open or close a branch (Mask values applies to what is copied).

<a id="structure-json-tab"></a>

### JSON tab

**The selected element exactly as the definition holds it, as a tree.**

Open it from the tab strip, or from the Show JSON link under the Visibility and Validation cards. It is the place to look for what the readable tabs leave out. Expand all, Collapse all, Copy and the filter box work as on any tree.

It is the same as the Designer's Edit Properties as JSON. It is never the tab a pick opens on, unless it is the only one the element has. Mask values masks the answers the element holds (its response and defaultValue entries) in the tree and in what is copied.

<a id="structure-current-value-views"></a>

### Current value views

**Show the value as a Form, a Tree or Raw JSON text.**

A step or block opens on Form: each key is a row with its label and a plain value; groups open in place. Tree is the JSON tree. Raw is the JSON text with the tree's line numbers. The filter box narrows Form and Tree. Copy in the card header copies the value as JSON.

Current value opens on a Current value card on every element type, before any other card. A simple value (text, a number, true or false, an empty value) is shown in a monospace font with a quiet type hint after it (text, number, true/false, empty); while the data holds nothing for the element the card says not in data, dimmed (a Formula element keeps the tab for its Formula card). An object or a list is a tree inside the card. The switch Form \| Tree \| Raw sits in the card's header beside Copy, on a step or a block. In Form, each key's row shows the label of the element that owns the key with the element's name dimmed after it, else the key alone (hover for the key and the element's type), and true and false written as words, with the type hint after a number, a true/false or an empty value. An object or a list shows as "n items" with a chevron that opens it in place, one level at a time; the rows of a repeat or edit block read Row 1, Row 2 and carry the labels of the block's own elements. A very long list is cut after 400 rows, which the Tree and Raw views show in full. The choice is kept while the panel is open, and across sessions with Remember my settings. The groups you opened on a step are kept while it stays selected and forgotten when you pick another; a row of a repeat block that carries an Id is remembered by it, so removing a row does not open another. Copy works from all three views and for a simple value (masked with Mask values on); the toolbar has no Copy of its own on this tab. The filter box narrows the Form to the rows whose label or key contains the text, among the groups that are open, and the status bar says how many rows of how many are shown. Expand all and Collapse all belong to the Tree.

<a id="structure-properties-tab"></a>

### Properties tab

**The element's settings as a table, with the panel's own labels.**

Known settings come first under plain names; hover one for its key and meaning. A small i after a setting opens a short explanation under the row. Values that hold others are drawn as tables, not JSON. Keys the runtime uses for itself sit behind Show internal. The filter box narrows rows by name or value.

The table shows the element's propSetMap: a readable name on the left, the value on the right. Known settings have plain names, such as Required, Data Mapper bundle or Remote method; the rest keep their own name. A yes/no is ✓ or –, and a long text is cut with more / less. A list of options becomes label → value rows, Conditional View becomes a rule table (● true now, ○ false now or ? can't tell, then Field, Must be and Is now), Set Values reads target ← expression, and any other object nests as a table of its own, up to three levels. A level deeper than that, or with more than 30 keys, shows its size with show JSON / hide JSON to open it as a tree. Internal keys start with \_, lwc, pubsub or ssm and are folded behind Show internal (n). The i covers the settings the panel knows (width, repeat, show, mask, the call settings and so on); where the panel is not sure of the meaning, the text says "as far as the panel knows". When no name or value matches, the filter also reads the explanations, so "columns" finds Width. A Text Block, Headline or Messaging element has a Merge fields card above the table (see Merge fields card).

<a id="structure-summary"></a>

### Summary

**An overview of the script, shown while no element is selected.**

It lists the script's Type/SubType/Language, element counts by kind, what it calls, the elements custom components override and its custom labels. It also shows the step the script is on. Press Esc in the list to come back to it.

A row appears only while it has something to say. Also its version and whether it is active and reusable (when the definition carries them). The element count is the figure the status bar gives, split into steps and each kind, such as 22: 4 steps · 14 fields · 2 actions. What it calls (Data Mappers, Integration Procedures and Remote Actions) is one button per name that selects the first element that calls it, with ×n when several do. Overridden: N lists the elements a custom Lightning web component overrides, each name selecting its element. Custom labels show keys, languages and how many are missing. The furthest step the script has been on is listed too, only when that is a different one. After Esc, Follow current step does not select anything again until you pick an element, press Current step or tick Follow current step, and shows its pause dot meanwhile. Best effort: a field the definition does not carry is left out.

<a id="structure-visibility-tab"></a>

### Visibility tab

**Why an element is shown or hidden: its show rule judged against the data.**

The Visibility card judges the element's show rule (Conditional View in the Designer) against the data. The tag in its header says Hidden, Shown or Can't tell; hover it for the sentence. The table lists each condition: a mark for whether it is met now, the Field, what it Must be and what it Is now.

The tag is Hidden (grey: a hidden element is normal), Shown (green) or Can't tell, with estimated ≈ when it rests on a formula's estimate. Its tooltip reads: Always shown; Shown: its condition is true; Hidden: Step:Plan is "Standard", not "Premium" for a single rule; Hidden: 2 of 3 conditions fail (1 of 3 conditions fails) when every one is needed; Hidden: no condition is true (0 of 3) when one is enough; or that the panel cannot tell if the rule is true here and what the script treats it as, which a Verdict row then says too. An element a parent hides has a Hidden by row with the parent, a link, and why. The marks are neutral (● met, ○ not met, ? can't tell), because a met condition is good on a show rule and the reason a Set Errors fails, so the colour is on the card's verdict. Field is the element's name, a link that selects it, with the field as written in the tooltip; Must be reads = "Premium", ≠ "", ≥ 18; Is now is never blank: empty, not in data, or can't tell for a formula or an unusual operator, dimmed. Under each condition the same is said in plain words, such as FO\_Age is 30, which is 18 or more, or FO\_HasCard is null, which counts as not true. A group says what it needs and how it stands, All of these must be true; 1 of 2 is not, or One of these must be true; none is; a nested group is indented and has its own mark. In a pane narrower than 480 px each condition starts with its mark and its plain words, then Field, Must be and Is now, each label above its value. The As written row ends the card: the rule exactly as the Designer defines it, on one line. Copy copies the card as text, each condition with its plain words; with Mask values on, what the data holds is replaced and the plain words are left out. The JSON tab holds the element as JSON. Best effort: a rule whose value is a formula (it starts with =) is evaluated here, marked ≈ on its mark and estimated ≈ in the header; see Formulas. Unusual operators and formulas that cannot be evaluated are can't tell and never guessed.

<a id="structure-set-values"></a>

### Set Values

**Show each assignment of a Set Values element and what it computes now.**

The Set Values tab has one row per assignment: the Target element, the Expression as written, the Computed value it gives now and the Current value the target holds. An amber differs tag marks a mismatch. A formula is evaluated best effort and tagged estimated ≈; one it cannot evaluate says can't tell. Copy copies the table.

A Current value card comes first only while the data holds something under the element's name. Target is the element by its name, a link that selects it (the path as written is in the tooltip and in a copy). Computed value is the value the target gets when the element runs, with the %merge% fields filled in from the live data. Current value is the dimmed not in data while the target holds nothing. For a formula's estimate, the tooltip of differs says it differs from the estimate. A formula that cannot be evaluated, or that reads a field with no value yet, says can't tell, the tooltip says why, and it is never tagged differs. In a pane narrower than 480 px each assignment stacks. Copy is tab separated; with Mask values on, what the data holds is replaced and text written in the definition, such as a fixed value, is kept. The element's JSON is behind its JSON tab, as for every element.

<a id="structure-options-tab"></a>

### Options tab

**List a choice element's options and tick the one the data holds.**

For a Select, Radio, Multi-select, Lookup or Type Ahead element that lists its options, the Options card shows each option's Label and Value and ticks Selected on the one the data holds. A value that matches no option gets an amber No match tag, and a chip in the detail head opens this tab. Copy copies the table.

A Multi-select ticks every option it holds. When the data holds a value that is none of the options, nothing is ticked, the card's header carries the amber No match tag (hover it for the value), and the amber chip in the detail head says No option matches it. An option list that comes from a Data Mapper, an object or custom code has no options of its own and gets no tab. With Mask values on, Selected reads (masked) on every row of a copy, so which option is selected is not copied.

<a id="structure-formula-card"></a>

### Formula card

**Show how a Formula element's expression computes now and which elements it reads.**

On a Formula element's Current value tab. Expression is as written; Computed value is what it comes to now, tagged estimated ≈. If the panel cannot evaluate it but the data holds the value, that value shows, tagged read from the data; otherwise it says can't tell. Elements it reads lists what the formula reads.

The card follows the Current value card, which stays even when the Formula card repeats its value. Hover the tags for why. In Elements it reads, each element is shown with what it holds now; its name is a link that selects the element (the field as written is in the tooltip; a field that is no element opens its place in Data while the data holds it). The card stays while the data holds no value for the formula. Copy copies the card as text; with Mask values on, what the data holds is replaced.

<a id="structure-merge-fields-card"></a>

### Merge fields card

**List the %merge% fields a text reads and what the data holds for each.**

A Text Block, Headline or Messaging element holds no value of its own, so its Properties tab starts with this card: each field the text reads, once, in reading order, with what the data holds now. A field that names an element links to it; any other field opens its place in Data.

The card is left out for a text that reads no field. A linked element shows its label with its name after it. A value is tagged estimated ≈ for a Formula element's estimate, and the dimmed not in data shows for a field the data does not have. Copy copies the table as text; with Mask values on, what the data holds is replaced.

<a id="structure-validation-tab"></a>

### Validation tab

**Show whether a Set Errors or Messaging element fails now, and why.**

The Validation card judges the element against the data now, best effort. Its header tag says Fails, Passes or Can't tell. Rows show the message and its kind, or the errors it sets, then the condition as a table like the Visibility card's. A Requirement or Error message, or a firing Set Errors, blocks Next.

It is shown for Set Errors and Messaging / Validation elements. Fails is red when its Requirement or Error message shows, or its error is set, which blocks Next; amber when that rests on an estimate. Passes is green. Estimated ≈ is used as on the Visibility card. Hover the tag for the sentence, such as Expression is false · shown: Requirement “Check the card” or Condition is true now: the error is set and blocks Next. For Messaging / Validation, the rows are Shows, the message the result selects now (no message when it selects none), and Kind, its type and whether it blocks Next, then the message for the other outcome, dimmed, as If it passes or If it fails (or When and its condition). For Set Errors they are Errors it sets (each element the error lands on, a link, with its message), Message, and Checked, when the user moves between steps or the event it runs on (the error clears once the condition is no longer true). The condition marks are neutral (a Set Errors fires when its condition is met, a Messaging / Validation fails when its expression is not). Copy copies the card as text. Messages written as formulas (text starting with =, such as =IF(%LanguageCode%=='fi',...)) are evaluated as estimates: the text it comes to, tagged estimated ≈ (hover for the formula and where a language came from), with a Message formula fold under it that holds the formula as written. In a table cell of the Properties tab the same reads ≈ “text”, with a formula fold. When a merge field has no value it says can't tell: no value for %Field%. %LanguageCode% falls back to the script's own language when the data has none, and the tooltip says so. A code with a region (en\_US) is tried as written and as the bare language (en), whichever the formula compares with; when it compares with both, or the script names its language in words (English), it says can't tell instead of guessing. The same applies to message and label texts in the Properties tab and in a step's Validation tab. Best effort: only a rule group can be judged; a formula expression is reported as such.

<a id="structure-set-errors-toast"></a>

### Set Errors toast

**A toast says when Set Errors start firing on the current step.**

It appears when you are on another tab and the number of Set Errors or validations firing on the step the script is on goes from none to some, for example "Set Errors fire on Intro: 2". It never shows while this tab is open, and at most once every 30 seconds.

It is not raised for errors that rest only on a formula estimate. Arriving on a step where errors already fire only sets the starting point. It reads the data JSON the panel already polls about every two seconds, and needs the definition to have been loaded once.

<a id="structure-value-type-hints"></a>

### Value type hints

**An amber ≠ mark: the value does not have the shape its element type promises.**

Hover the mark, or the amber line in the detail head, for the sentence. It is a hint, not a problem: nothing counts it. It is judged only when the data holds a value, and never for an estimate, a type the panel does not know, or options that come from a Data Mapper or other source.

The cases are a Number or Currency that holds text (a comma or space inside a number, as in 12,5, is a locale format and not a number), a Date, Date/Time or Time that is not ISO and does not fit the element's dateFormat or timeFormat, a Checkbox or Toggle that holds the text true or false instead of a boolean, a Select or Radio that holds something outside its static options, and a Multi-select that holds text instead of a list. Nothing counts it, not even the status bar. Best effort.

<a id="structure-resizing"></a>

### Resizing

**Drag the divider between the element list and the detail pane.**

Drag the divider to rebalance the list and the detail pane; it works side by side or stacked. Double-click it to reset.

<a id="structure-step-validation"></a>

### Step validation

**A step's Validation tab lists what may stop Next: empty required fields and failing rules.**

The tab appears while something may stop Next on the step or it holds a custom component. Required and empty lists visible required elements with no value. Under Validation rules, each Messaging / Validation and Set Errors element shows Fails, Passes, Hidden or Can't tell; a failing one is open. Under Custom components, each shows Shown or Hidden.

The number after the step's name is how many things may stop Next. It is judged against the data right now, best effort (each card's header says so in its tooltip), and is a column of cards that follows the data as it changes. Required and empty lists the visible required elements of the step, at any depth, whose value is empty, one row each with the name as a link (a required checkbox or disclosure must be ticked; a Name or Geolocation with nothing in it is empty; required fields inside an Edit Block are left out, since they are checked when the row is saved). In a repeat block every row is judged on its own: a row without the field counts as empty ("row 2"), a block inside a block names the outer row and then the inner one ("row 2.1"), and a show rule inside the block is read with that row's own values; a finding inside a block that rests on a rule the panel cannot tell about is tagged estimated ≈ and not counted. Validation rules has one card per Messaging / Validation and Set Errors element of the step, and per Set Errors anywhere else that puts an error on an element of the step ((in Step) on its line): its kind and name, a link, in the header with its verdict. Hidden means it is hidden, so it holds nobody back. A failing rule is open, with what it shows and its kind (or the errors it sets) and its condition as the Visibility card's table; a passing one is closed to its header line, which gives the condition that decides it, such as FO\_Age is 30, which is 18 or more. Click a card's header to open or close it; it stays as you left it while the tab is open. A rule that fails only by a formula's estimate is amber, tagged estimated ≈, and not counted. Custom components has a card per Custom LWC of the step and per standard element a custom component overrides (overridden by and the component on its line): its verdict, Shown or Hidden, and the condition that decides it, opening to its show rule (a hidden one is open); and the note that a custom component may carry its own required controls or Next/Previous buttons, which cannot be read from the definition. Click a name to select that element. Server-side checks and rules the panel cannot evaluate are not covered.

<a id="structure-formulas"></a>

### Formulas

**The panel evaluates formulas itself and marks the outcome as an estimate (≈).**

When a show rule, Set Values or Formula element needs a formula's value, the panel works it out and marks it ≈ (estimated). If it cannot (unknown function, syntax error, field with no value, text where a number is needed), the rule stays unjudged (?). An estimate is never counted as a failure.

The mark is ≈ before a value or a rule's result, and (estimated) at the end of a sentence. It is used where a show rule compares with a formula (a value starting with =), a rule field names a Formula element the data holds nothing for yet, a Set Values assigns a formula, or a Formula element has no value. Supported, best effort: numbers, text, %Field% and %Step:Field% references, + - \* /, comparisons, \& to join text, parentheses, and IF, AND, OR, NOT, ISBLANK, ISNULL, CONCAT, LEN, UPPER, LOWER, TRIM, ABS, ROUND, FLOOR, CEILING, MAX, MIN, SUM, AVERAGE, NUMBER and TEXT. The tooltip says why a formula is not judged; nothing is guessed. Messages and texts written as formulas (Set Errors, Messaging, properties) are evaluated the same way and shown with ≈; the formula stays in a fold under them. The script itself decides what really happens, so such findings sit under Estimated, not counted in the step's Validation tab.

<a id="structure-repeat-rows"></a>

### Repeat rows

**Step through the rows of a Repeat Block or Edit Block.**

For an element inside a Repeat Block or Edit Block the detail head shows Row 1 of 3 with ‹ ›. The Current value tab, the step's Validation tab and Set Values follow the chosen row. Rows count from 1, as in OmniScript paths.

<a id="structure-detail-pane-head"></a>

### Detail pane head

**One line under the name: type, name and flags, with chips for what needs attention.**

For example Text · PromoCode · conditional. Only while they apply, it adds · overridden by c-my-input, a verdict chip (click it for the Visibility or Validation tab), and the row stepper. A figure that is zero is never shown.

For an element a custom component draws instead of the standard one, the head adds · overridden by c-my-input (read from lwcComponentOverride or lwcOverride): its own markup and validation run, which the definition cannot show. The verdict chip is red when an error blocks Next, grey when a rule hides the element (hidden is a fact and not an error), and amber when that rests on an estimate or the panel cannot tell if the rule is true; the tab it opens says it in full. A shown element has no chip; its sentence, such as Shown: its condition holds, opens its Visibility tab. A choice element whose value is none of its options also gets an amber chip, a button, No option matches it, which opens the Options tab (see Options tab); on the Options tab itself the head keeps a plain ≠ line with the same words.

<a id="structure-editing-in-designer"></a>

### Editing in Designer

**The definition is read again every few seconds, so Designer edits show up.**

While this tab is open the definition is read again about every six seconds. When elements were added, removed or renamed, or their settings changed, the list is redrawn and your selection and folds stay on the elements that remain. Refresh reloads it at once.

A redraw follows a change of label, required flag, show rule, remote call, validation, help text, options or Set Values. A running script rewrites some definition fields itself (the active step, which elements are shown); those alone never redraw anything.

<a id="actions"></a>

## Calls

Apex calls the page makes while you work, decoded. Capture runs whenever the panel is open, whichever tab you are on.

<a id="actions-start"></a>

### Start here

1. Use the page as you normally do: its Apex calls appear here as they are made, decoded.
2. Click a call to see its input, options and output on the right.
3. A call that failed opens on its output, where the reason is.
4. Type in the filter to find a call by class or method. in: searches inputs and outputs.

<a id="actions-time-format"></a>

### Time format

**Choose whether call times are written in milliseconds or seconds.**

In Settings (the gear), under Calls, the Time format switch picks ms (the default, "1,240 ms") or s ("1.2 s", "1m 12s"; under a second stays in ms). Reset next to it puts it back to ms.

It applies to the Took column and its tooltip and the line under a call's name. Restore default settings also puts it back to ms.

<a id="actions-failed-only"></a>

### Failed only

**Show only the calls the row marks as failed.**

Tick it, next to the filter box, to list only failed calls. The tab badge turns red as soon as any call failed, whatever this says.

<a id="actions-filter-box"></a>

### Filter box

**Narrow the calls by name, or with a prefix such as in: or url:.** (/)

Plain words match the call's name (class, method, bundle or key). Prefixes combine with words and with each other:

- in:text searches input, options and output.
- url:text matches the request URL.
- step:text matches the script's step (step:"Order Review" for spaces).
- repeat: keeps repeated calls.

in:text finds calls whose input, options or output hold the text, as a key or a value, and shows the hit under the name. step:text keeps the calls made while the script was on a step whose name or key holds the text. repeat: (or repeats) keeps only the calls that repeat an earlier one and the calls they repeat, and takes no text. With Mask values on, in: matches keys only. The tooltip of the box lists every prefix.

<a id="actions-tab-badge"></a>

### Tab badge

**Counts the calls in view; turns red with a cross when any call failed.**

The number on the Calls tab is grey and counts the calls in view. It turns red and reads "✕ 2" as soon as any call failed, so a failure shows from the other tabs. Hover it for the counts.

The cross and the number mean it does not rest on the colour. The tooltip says which it is ("2 failed calls of 12 captured", "12 calls in view"). A filter in the filter box or Failed only does not hide a failure from the badge or turn it off: it counts every call the list may show, which is OmniStudio's calls, and shows 0 in grey while a filter hides all of them. It is absent only while nothing is captured.

<a id="actions-copy-input"></a>

### Copy input

**Copy the call's input as JSON.**

The \{ \} button in a call's detail pane copies the bare input as JSON, ready to paste into a test or another tool. Honours Mask values.

<a id="actions-raw-view"></a>

### Raw view

**Show the request and the answer exactly as they went over the wire.**

Right-click a call and choose Show raw. The detail pane shows the request as the page sent it and the answer as it came back, each with its own Copy. Fields that look like credentials show as \<hidden\>. Back, or Esc, returns to the call.

The request is the Aura action, or the LWR, REST or Visualforce body. Each side is numbered, wrapped text; JSON is laid out for reading. The answer is kept only up to 20 KB, and when it was longer the view says "Cut at 20 KB". Fields that look like a credential (a token, csrf value, authorization, session, cookie or API key, in the request and in the answer) are shown as \<hidden\> and counted in a note, with Mask values on or off; Mask values replaces every other value in what is shown and copied. Text that is not JSON cannot be masked, so it is not shown while Mask values is on (an Aura error answer is laid out like any JSON; an answer cut at 20 KB cannot be masked). Choosing another call also returns to the detail. A chain's row has no row menu and no request of its own: open one of its calls, then right-click it.

<a id="actions-trees-in-the-call-detail"></a>

### Trees in the call detail

**Copy a value, key, path or merge field from a call's tree.**

Right-click a row of the Input, Options or Output tree to copy its value, key, OmniScript path or %merge% field, or to open or close the branch. Copied values honour Mask values.

A section the page sent as JSON inside a string is decoded, and one that is plain text says so instead of showing a tree. Expand all and Collapse all appear only where there is a tree, and Copy only where there is something to copy.

<a id="actions-show-in-structure"></a>

### Show in Structure

**Select the element that made this call in the Structure tab.**

When an element of the script makes this call, the detail pane offers this button. It selects the element in the Structure tab. Structure's Calls tab lists the calls for the element it shows.

<a id="actions-naming"></a>

### Naming

**How calls to Data Mappers and Integration Procedures are named.**

Data Mappers and Integration Procedures are named by their bundle or key, not by the integration class they share.

<a id="actions-batched-calls"></a>

### Batched calls

**One HTTP request can carry several actions; each is listed as its own row.**

Each action gets its own row, with its own input and output. The actions share the request's time, so each row carries a small ×3 tag and the Took cell holds only the time.

The ×3 tag's tooltip says "One request shared by 3 actions: the time is the whole request's". A list under 760 px shows up to three short tags (about 20 characters in all), then a +N whose tooltip names the rest; when it is too narrow for the tags (under 560 px) the ×3 follows the time instead.

<a id="actions-repeated-calls"></a>

### Repeated calls

**Tags a call that repeats an earlier call's input within 5 seconds.**

A call to the same procedure or method with the same input and options as an earlier call, started within 5 s of it, carries an amber "repeat ×2" tag. A double-fired action or a re-render loop in a script usually causes this. repeat: in the filter box keeps only repeated calls and the ones they repeat.

The tag counts up (×3 for the third, and so on) and its tooltip names the time of the first call. The tab badge's tooltip adds "· 3 repeated". The calls of one chained procedure are never repeats of each other. When a repeat sent byte-identical input (same keys in the same order) and the call just before it succeeded, the first lines of its detail pane add a muted "Same input as the call at 10:42:03 (Succeeded)"; click it to select that call. After a failure no such line shows, because sending the same input again is then a retry.

<a id="actions-chained-procedures"></a>

### Chained procedures

**Lists the calls of one chainable Integration Procedure as a single row.**

A chainable Integration Procedure runs as several calls. They show as one row, "⛓ Name", with a "chain · 3 calls" tag, the time of all of them and the result of the last. The chevron (or the Right and Left arrow keys) opens its calls. Select the row to see the first call's Input and the last call's Output.

The first call carries the chainable (or queueableChainable) option, its answer often says the chain goes on, and the page calls the same procedure again shortly after. The row's result is red when any call failed. Opened calls are named "call 1 of 3", "call 2 of 3" and so on, with their time where the Started column is gone, and without the chain tag. A call that only asks to be chainable (outside a chain, or one that could not be joined) carries the small tag chainable, or queueable chain for queueableChainable; "chain · 3 calls" is only for the group. The tag's tooltip says one chainable procedure ran as 3 calls and the time is the sum. Open one of its calls and the detail head says "call 2 of 3 in a chain", a link that selects the chain. The row's Calls tab says "This procedure ran as 3 calls in a chain", adds "the server answered 'continue' after each but the last" only when the answers did say so (a chain found by the chainable option and a shared input or token says that instead), and lists every call with its time, duration and result; a click opens that call. "stopped early" means the last answer said the chain goes on and nothing followed within 30 s. Filters apply to the calls, so a chain shows while any call matches. Export writes the calls with a chainId.

- Calls are joined when they go to the same procedure and the earlier answer says the chain goes on (the next call starts within 30 s), or the answer says nothing and the earlier call was chainable (the next call starts within 5 s). A call that started before the earlier one ended is never part of the chain, and calls to other places in between do not break a chain. Which answers say "goes on" is a best guess (vlcStatus such as InProgress or Queued, or a continuation id); an answer in another shape falls back to the option flag, so a real chain may show as separate rows.

<a id="actions-http-vs-result"></a>

### HTTP vs Result

**Result shows what the answer says; hover it for the HTTP status.**

Result, the last column, is what the answer says: ✓ green for succeeded, ✕ red for failed, – grey when nothing useful came back. Hover it for the word and the HTTP status, which is the transport. A 200 with Failed means Apex returned an error inside a successful response.

The glyph is a second cue besides the colour. Hover for which rule fired; the detail line then says "HTTP 200 · Failed", and Aura's own state word is in the Raw view. The words are Succeeded, Failed, No response and No body. A call counts as failed, too, when no response came back (No response, in grey: aborted or offline), when the response is not JSON or an Aura system error, or when the session expired (client out of sync). A 2xx with an empty body shows No body in grey and is not counted as failed: DevTools hands back an empty body when it no longer holds the content. The Output tab then shows the raw text that came back, unless Mask values is on.

<a id="actions-started-took"></a>

### Started / Took

**Started is when the request left; Took is its round trip.**

Started is the clock time the request left the browser. Took is the round trip, left blank when the browser could not measure it. Hover Took to see where the time went: the server's share and the time before the request was away.

Took is in milliseconds unless Time format says otherwise. Its tooltip gives the round trip, the server's share (waiting for the first byte plus download) and the time before the request was away (blocked, DNS, connect, send).

<a id="actions-step"></a>

### Step

**The OmniScript step the script was on when a call started.**

The step is in the call's tooltip and the first line of its detail pane. step:text in the filter box keeps the calls made on a matching step. It is known only while Structure has been following the script.

<a id="actions-recording-paused"></a>

### Recording / Paused

**Capture calls, or pause capturing; click to switch.**

The button reads Recording (red dot) while the panel captures calls, and Paused when it does not. Click it to switch. Calls made while paused are not captured, and an empty list says so. The status bar shows the same state.

Its tooltip says what a click does ("Capturing calls. Click to pause." or "Not capturing. Click to resume.").

<a id="actions-failed-calls"></a>

### Failed calls

**A failed call opens on its Output tab, where the reason is.**

A call the row marks as failed opens on its Output tab, and its failure banner shows up to three lines before Show more. A tab you chose yourself stays chosen as you move between calls.

<a id="actions-row-menu"></a>

### Row menu

**Right-click a call for its copy, compare, re-run and select actions.**

Right-click a call for Copy name, Copy input (honours Mask values) and Show raw (see Raw view).

The call the menu is open for is outlined while it is open.

<a id="actions-empty-list"></a>

### Empty list

**Why the list may be empty, and how to catch calls made while loading.**

Calls are captured only while DevTools is open. Use Reload page to capture from the start and catch what the page does while loading. While capture is paused the list says so.

<a id="actions-mask-values"></a>

### Mask values

**Replace strings and numbers with placeholders in what the Calls tab shows and exports.**

With the top bar's Mask values on, Export, Show raw, the failure text and the in: hit lines replace strings and numbers with placeholders, as the trees do. Mask values at start in Settings turns it on every time the panel opens.

The raw text of an undecodable response is hidden. A Data Mapper name that was read from the call's input (not from its options) counts as a value and is masked too, in Copy name, Copy report and Export.

<a id="actions-clear-list"></a>

### Clear list

**Remove every captured call from the list.**

Removes every captured call at once; new calls start a new list. Click it before you repeat a step, so only the new calls are listed. Settings are not touched. Clear on reload does the same on every page load.

<a id="actions-clear-on-reload"></a>

### Clear on reload

**Start a new list of calls on every page load.**

In Settings (the gear), under Calls. Off by default, so captured calls are kept across page loads. Tick it to start a new list on every reload; the status bar says "clears on reload" while it is on.

The list keeps the last 500 calls, and at most 200 of them that are not OmniStudio's, which go first, so a busy page cannot push the script's own calls out; when older OmniStudio calls are dropped the status bar says so.

<a id="actions-export-calls"></a>

### Export calls

**Write the visible calls to a JSON file.**

Export, in the toolbar, writes the visible calls, to a JSON file. It may contain org data, so handle it accordingly. Honours Mask values.

Each call is written with its URL, whether it failed and why, and the request it travelled in.

<a id="actions-rest-calls"></a>

### REST calls

**POST calls to an Integration Procedure's REST endpoint are listed as procedures.**

POST calls to an Integration Procedure's REST endpoint (/services/apexrest/…/integrationprocedure/Type\_SubType) are listed as Integration Procedures, named by the key in the URL.

<a id="actions-resizing"></a>

### Resizing

**Drag the divider between list and detail pane; double-click resets it.**

Drag the divider between the list and the detail pane to rebalance them, side by side or stacked. Double-click it to reset.

<a id="everywhere"></a>

## Everywhere

The top bar, the settings and the rest of the shell. It is the same on every tab.

<a id="everywhere-no-omniscript-found"></a>

### No OmniScript found

**What to try when the top bar lists no OmniScript.**

Nothing is listed in the top bar. Try these in order.

- Open a page that runs an OmniScript and let it finish loading.
- Press Rescan, or reload the page with DevTools open.
- Still nothing: see Show the Frame row and Data property in Settings, under Data, in Reading another page.

The script may sit inside an iframe, or keep its data on another property. The panel also looks again every few seconds. Every frame, document and open shadow root is searched; closed shadow roots cannot be read.

- If the script sits inside an iframe, tick Show the Frame row in Settings, under Data, in Reading another page, and check the Frame picker.
- If the script keeps its data on another property, change the Data property in Settings under Data, in Reading another page. Click the field to list what the script exposes.

<a id="everywhere-theme"></a>

### Theme

**The panel uses the DevTools theme, light or dark.**

Change the theme in DevTools. The panel follows at once, even while it is open.

<a id="everywhere-help-for-a-control"></a>

### Help for a control

**Open the help at the entry for one control** (?)

Right-click a button or switch and choose Help: \<name\>, or press ? while it has focus. The help shows only that control's entry, with its name in the filter box. Type in the box, or clear it, to see the rest.

Works on the buttons and switches of the top bar and of every tab's toolbar (Rescan, Mask values, Refresh, Auto-refresh, the views, Expand all, Follow current step, Recording and so on). Text fields keep the browser's own right-click menu.

<a id="everywhere-searching-this-help"></a>

### Searching this help

**Narrow the help to the entries that contain every word you type.**

Type in the box at the top of the help. Every section and the shortcut table narrow to the entries that contain all your words, in any order. The box has focus when the help opens. Clear it to see everything again.

Esc still closes the help while the box has focus. The search also reads the details that are kept on the website, so a word only they hold still finds its entry.

<a id="everywhere-links-to-the-website"></a>

### Links to the website

**More on the website and Full guide open the product website in a new tab.**

In Help, More on the website and Full guide open the product website in a new tab. The panel passes nothing to it beyond the address of the page, and sends nothing from your org.

They are plain links: nothing is read, stored or sent by the panel when you open one. The website holds the details of every entry and a guide for each question under What do you want to do?.

<a id="everywhere-tab-order"></a>

### Tab order

**Put the tabs in the order you prefer** (Alt+Shift+← / →)

Drag a tab to another place in the strip, or press Alt+Shift+← / → on a focused tab. The 1–3 keys follow the order shown. The order is kept in extension storage between DevTools sessions. Reset, next to Tab order in Settings, puts it back.

Restore default settings also puts the tabs back in their default order. Code never assumes where a tab is; only the order you see counts.

<a id="everywhere-focus-mode"></a>

### Focus mode

**Hide the list so the detail takes the full width** (Ctrl/Cmd+\\)

On Structure and Calls, press the shortcut or use the grip on the divider between the list and the detail. Press it again, double-click the divider, or press Esc in the detail to bring the list back at its old width. Nothing is stored.

The divider stays as a thin strip with the grip while the list is hidden. Each tab keeps its own state while the panel is open.

<a id="everywhere-tour"></a>

### Tour

**A short walk through the panel, shown the first time you open it.**

A card points at the OmniScript picker, the tab strip, the filter box and the Settings gear the first time the panel opens; each tab adds a short tour of its own. Next tip, Previous tip, Skip and Esc move or close it. Don't show tours stops them all. Only which tours were seen is stored.

The card shows the count (such as 2 of 4) and dots. Nothing is dimmed, and the panel stays usable meanwhile.

- Each tab's tour has three tips at most and shows the first time you open that tab. Each tip rings a real control and says what to do with it. A tab tour never starts while another tour or a dialog is open, and never in the same DevTools window as another tour, so the first one appears the next time DevTools opens, one tab each time.
- Every card has a Don't show tours link that stops all of them; Esc skips only the tour on screen.
- Take the tour, at the top of Start here in this help, closes the help and runs the tour of the tab on screen at once, without forgetting which tours were seen.
- Show the tour again, at the end of Start here, and Show tours again, in Settings under General, clear all of that and start the panel tour again.
- The only thing kept is which tours were seen: four yes-or-no flags (tourSeen, tourSeenData, tourSeenStructure and tourSeenActions) in this browser's extension storage, whether or not Remember my settings is on. Nothing is sent anywhere.

<a id="everywhere-text-size"></a>

### Text size

**Make the text and controls of every tab smaller or larger** (Ctrl/Cmd+= / - / 0)

In Settings, under General, pick S (90%), M (the default), L (112%) or XL (125%). Ctrl/Cmd+= makes the text larger, Ctrl/Cmd+- smaller and Ctrl/Cmd+0 puts it back to M, wherever the focus is in the panel. The size is kept by Remember my settings (on by default).

It scales the text and controls of every tab at once. Ctrl++ also makes it larger. DevTools keeps its own shortcuts outside the panel. A size other than M is listed under Settings that differ, and Restore default settings puts it back.

<a id="everywhere-settings"></a>

### Settings

**Change how the panel reads and shows things** (,)

The top bar gear, or the , key. A count on it shows how many settings differ.

- General: Text size, Mask values at start, Remember my settings.
- Data: Refresh rate; Reading another page (property names, Frame row).
- Calls: Time format, Clear on reload.
- Tools: Copy report.

Settings last until DevTools is closed, and the settings are kept in this browser's extension storage, on this computer, because Remember my settings is on by default; untick it and they are deleted. The tab order, the flags that the tours were seen and the Mask values at start flag are kept either way.

- General: Text size (see its entry), Mask values at start (kept in this browser even with Remember my settings off; turning it off deletes it), Remember my settings (see their entries) and Show tours again (see Tour). Remember my settings, on by default, keeps the settings and the views you last chose, and puts them back the next time DevTools opens. Filters that hide rows (Failed only, Visible only, Actions only) and the property names start fresh every time. Unticking it deletes what was kept.
- Data: Refresh rate sets how often the Data tab reads (see its entry). Under it, the fold Reading another page holds Data property and Definition property, the element properties the Data and Structure tabs read (jsonDataStr and jsonDef by default; see their entries), and Show the Frame row, the top bar's second row (Frame, Embedded scripts, Inspect element), off by default. The fold opens by itself while any of them differs from its default.
- Calls: Time format and Clear on reload.
- Open in Designer: Auto, Builder (core) or Designer (managed) with a namespace; see the Open in Designer entry.
- Settings that differ lists every setting that differs from its default, with its current and default value; Reset puts one back, live. When none differs it says everything is at its default.
- Restore default settings (it asks to confirm) puts all of them back without reloading DevTools: Tree view, the views you last chose, jsonDataStr and jsonDef, Follow current step on, Highlight on hover and Visible only off, Embedded scripts off, Clear on reload off, Failed only off, Time format ms, Open in Designer Auto, Text size M, Auto-refresh on, Refresh rate Normal, Mask values at start off and Mask values off.
- It also puts the tabs back in their default order, and keeps Remember my settings (on by default), captured calls and filter text.
- Tools: Copy report (see its entry).

<a id="everywhere-mask-values"></a>

### Mask values

**Replace strings and numbers with placeholders in everything that leaves the panel.**

Tick Mask values in the top bar (Mask, in a narrow panel). While it is on, strings and numbers are replaced with placeholders in everything that leaves the panel: copies, saved files, exports and Copy report. Structure and keys are kept. It is off when DevTools opens unless Mask values at start is ticked.

Covered: Copy JSON, Save file, the per-row copy buttons, the Structure value copy, the Calls export and Copy report. The status bar says "Masking copies and exports" while it is on. The switch itself is never remembered.

<a id="everywhere-mask-values-at-start"></a>

### Mask values at start

**Turn Mask values on every time DevTools opens.**

In Settings, under General; off by default. Ticked, Mask values is on each time DevTools opens, so nothing leaves the panel unmasked until you turn it off. This one setting is kept in this browser even with Remember my settings off; unticking it deletes it.

The switch can still be turned off while DevTools is open. The kept thing is a yes-or-no flag, like the tour flags; the switch itself is never stored. While it is on, Settings that differ lists it, and Restore default settings turns it off.

<a id="everywhere-refresh-rate"></a>

### Refresh rate

**Choose how often the Data tab re-reads the script.**

In Settings, under Data. Fast, Normal (the default) or Gentle sets how often the Data tab re-reads the script while Auto-refresh is on. Gentle suits a busy page. Structure and Calls are not affected.

Fast: about twice a second, easing to every 2 seconds while nothing changes. Normal: about once a second, easing to every 4 seconds. Gentle: about every 3 seconds, easing to every 8 seconds. Touching the panel or a change in the data brings the quick pace back.

<a id="everywhere-remember-my-settings"></a>

### Remember my settings

**Keep your settings and chosen views between DevTools sessions.**

In Settings, under General; on by default. Your settings and the views you last chose are kept in this browser's extension storage, on this computer, and put back when DevTools opens. Unticking deletes them. Filters that hide rows and the property names start fresh. Nothing from the data is kept.

Kept: the settings listed in the dialog, the views you last chose (Data: Tree, Form or Raw; Structure: the Current value view, the detail tab you picked by hand and Show internal; Calls: the Input, Output or Options tab you picked by hand). Never kept: data, filter text, captured calls, Mask values and Auto-refresh. Failed only, Visible only, Data property and Definition property start fresh every time; they still count under Settings that differ while changed. Mask values at start is kept on its own, with Remember my settings on or off (see its entry).

<a id="everywhere-top-bar"></a>

### Top bar

**Choose which OmniScript, and which frame, every tab reads.**

The OmniScript picker lists the scripts on the page; the choice applies to every tab. Rescan looks again. Mask values applies to everything that leaves the panel. The Frame picker, Embedded scripts and Inspect element are in a second row, shown with Show the Frame row in Settings.

Scripts are listed by Type/SubType/Language when their definition says (hover for the element), otherwise by element. Frame filters the list to one document; All frames searches everything.

<a id="everywhere-show-the-frame-row"></a>

### Show the Frame row

**Show the top bar's second row: Frame, Embedded scripts, Inspect element.**

In Settings, under Data, in Reading another page; off by default. Ticked, the top bar keeps its second row: Frame, Embedded scripts and Inspect element. Unticked, the row is hidden and Embedded scripts and Frame go back to off and All frames.

Use it when you work across frames or embedded scripts. A filter you cannot see should not stay in force, which is why hiding the row resets them. It is one of the settings the count on the gear shows when it is on; Remember my settings keeps it, and Restore default settings puts it back.

<a id="everywhere-embedded-scripts"></a>

### Embedded scripts

**Also list OmniScripts placed inside another one, and script components.**

Tick it in the top bar's second row, shown with Show the Frame row in Settings. Unticked, each script is listed once and embedded ones are left out; ticked, every one is listed. It is in force only while that row shows.

An OmniScript placed inside another one, and the components inside a script that carry its data, read the same properties as the script around them, so a 40-element script has 40 of them, and several of them can carry the whole definition. Unticked, each script is listed once (by the element holding the most data). Ticked, every one is listed, with its element name when several share a Type/SubType/Language. A row reads "embedded" for an OmniScript inside another one and "component" for a component of a script. The Data status line says "N embedded scripts hidden" only for real embedded OmniScripts; the other components that are left out are counted in its tooltip ("N other components of a listed script hidden"). Hiding the row puts it back to off.

<a id="everywhere-copy-report"></a>

### Copy report

**Copy a few lines of Markdown about the script, for a ticket or a chat.**

Copy report, in the Tools row of Settings, puts a few lines of Markdown on the clipboard: the script, the extension version, the step, the size of the data and the last 5 failed calls. Mask values applies to values quoted in a failure reason. Nothing is sent anywhere.

The script is written as Type/SubType/Language. What may stop Next is the step's Validation list, best effort. The failed calls come with their reasons and times. A line whose fact is not known is left out. Names and counts are kept when masking.

<a id="everywhere-more"></a>

### More

**Reach the toolbar controls that do not fit in a narrow panel.**

In a panel narrower than 600 px each toolbar moves some controls into the … button at its end. Its menu lists them, a switch showing on or off, and choosing one does what the control does. Widen the panel to bring them back.

<a id="everywhere-rescan"></a>

### Rescan

**Look for OmniScripts and frames on the page again.**

Press it after opening a new OmniScript or changing the page. To re-read the script you already have, use Refresh on its tab.

The panel also looks again by itself every few seconds while it is visible, so Rescan is only needed when you do not want to wait.

<a id="everywhere-open-in-designer"></a>

### Open in Designer

**Open this OmniScript in its designer, in a new tab.**

The icon after the OmniScript picker. It opens the script in the OmniStudio Builder (core) or the OmniScript Designer (managed package), in a new tab; its tooltip says which and why. It shows only when the script's record Id is known. Open in Designer in Settings overrides the guess. The panel only builds the address; nothing is sent.

It is there only when the record Id is known (from the definition or header, or an attribute of the element) and the page is an org's own (Lightning, My Domain or a Visualforce page of it, not an Experience site). The tooltip reads, for example, "managed package vlocity\_cmt, from the calls", or "set in Settings".

- Auto (the default) is a best guess. It takes the script as managed when the element's name or class starts with vlocity\_cmt, vlocity\_ins, vlocity\_ps or vlocity\_hins, or the definition's field names or the captured calls to this org name one of them. The omnistudio namespace counts as the managed OmniStudio package only when the calls or the definition use it and the element's name starts with omnistudio- or the page's Lightning app address contains omnistudio\_\_ (core OmniStudio shows up as c- or runtime\_omnistudio-).
- In Settings, Open in Designer chooses Auto, Builder (core) or Designer (managed). For managed, a namespace field offers the ones this script shows first, then vlocity\_cmt, vlocity\_ins, vlocity\_ps and omnistudio, and takes one you type; empty uses the one seen, and omnistudio when none was seen. It is kept with Remember my settings.

<a id="everywhere-limits"></a>

### Limits

**What the panel cannot read, whatever the settings.**

Closed shadow roots and cross-origin frames cannot be read. That is a browser restriction, not a setting.

If a script is not listed, see No OmniScript found.

<a id="everywhere-status-bar"></a>

### Status bar

**See which script is selected and what each tab is doing.**

At the foot: the selected script's name and each tab's status on the left, what is being read on the right.

- Data shows the type, size and last change; Calls shows the number of calls, how many failed, and Recording or Paused.
- At the far right: the extension version, a Buy me a coffee button (optional; opens Ko-fi or buycoffee.to in a new tab, and the panel passes nothing to either) and the unofficial note.

Data: "Type/SubType/Language · 7.2 KB" on the left (the element's tag name stands in for a script without one), then "Live · changed 10:43:31 AM" on the right, with "N matches" while a filter in the Raw view is on and "N embedded scripts hidden" when OmniScripts nested in this one are left out. Hover it for the element, the property read, how many scripts are listed and how many other components of a listed script are hidden.

- Calls: "5 calls · 1 failed" (failed only when there is one) and "Recording" or "Paused". It names a choice only when it is not the default: "clears on reload", "failed only" and "text: …" for the filter box.
- Text that does not fit is cut with … and is in full in the tooltip. The Buy me a coffee button is optional and free of conditions: it opens a small menu with Ko-fi (EUR, by card) or buycoffee.to (PLN, by card or BLIK); the one you pick opens in a new tab. In a narrow panel the right side shrinks to the coffee icon and the version. The foot of this help links to the same page.

<a id="keys"></a>

## Keys

Single keys; ignored while typing in a field.

| Keys | What it does |
| --- | --- |
| <kbd>/</kbd> | Focus the filter |
| <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> | Go to the first, second or third tab, in the order shown |
| <kbd>Alt</kbd> <kbd>Shift</kbd> <kbd>←</kbd> <kbd>→</kbd> | On a tab: move it one place left or right (or drag it) |
| <kbd>c</kbd> | Copy the focused row (Data), the selected element (Structure) or the selected call (Calls) |
| <kbd>Ctrl</kbd> <kbd>C</kbd> | Tree or Raw: copy the highlighted text, else the whole value (Cmd+C on a Mac) |
| <kbd>↑</kbd> <kbd>↓</kbd> <kbd>j</kbd> <kbd>k</kbd> | Move to the previous / next call (Calls) or element (Structure) |
| <kbd>Home</kbd> <kbd>End</kbd> <kbd>PageUp</kbd> <kbd>PageDown</kbd> | Jump to the first / last call or element, or ten at a time |
| <kbd>←</kbd> <kbd>→</kbd> | Structure: → opens a section or enters it, ← folds it or leaves it |
| <kbd>←</kbd> <kbd>→</kbd> | On the tab strip: previous / next tab (Home and End for first and last) |
| <kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> <kbd>Enter</kbd> | Data tree: ↑ ↓ move, → opens or enters, ← folds, Enter or Space toggles |
| <kbd>Alt</kbd> <kbd>click</kbd> | Open or close a branch and everything inside it (Option-click on a Mac) |
| <kbd>Ctrl</kbd> <kbd>\</kbd> | Focus mode (Structure and Calls): hide or show the list (Cmd+\\ on a Mac) |
| <kbd>Ctrl</kbd> <kbd>=</kbd> <kbd>-</kbd> <kbd>0</kbd> | Text size: larger, smaller, back to Medium (Cmd on a Mac) |
| <kbd>,</kbd> | Open or close the settings |
| <kbd>?</kbd> | Show or hide this help; on a focused control, open its entry |
