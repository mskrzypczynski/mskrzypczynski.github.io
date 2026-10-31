# OmniScript Data Inspector: reference

Every entry of the panel's help (the ? button), by tab. Version 2.0.0. Generated from the panel's own help; the web version at https://mskrzypczynski.github.io/omniscript-data-inspector/reference.html can be searched.

<a id="data"></a>

## Data

The JSON the selected OmniScript is holding right now, re-read on a timer.

<a id="data-start"></a>

### Start here

1. Pick your OmniScript in the bar at the top (press Rescan if the list is empty). Its data appears as a tree.
2. Use the page: values that change flash amber, and Auto-refresh keeps the tree live.
3. Type in the filter to narrow the tree. A path such as Step:Rows\|2:Field or key=value works too.
4. Hover a row for its buttons (copy, watch, show in Structure), or right-click it for more.
5. Tick Track changes to keep marks and compare reads of the data JSON; Raw and Sizes show the same data as text and by size.

<a id="data-amber-highlight"></a>

### Amber highlight

A value that changed since the previous read flashes amber for a few seconds, whether or not Track changes is on. A collapsed branch containing a change is marked with a dot.

<a id="data-jumping-to-a-row"></a>

### Jumping to a row

Next and Previous change, a watched value, a Sizes row, Show in Data from Structure and a log line all take you to a row in the tree: it scrolls into view, opening what hides it, and flashes amber for under two seconds. Nothing stays outlined or selected afterwards, so the row then looks like any other. While it flashes, c copies it (with no other row focused or under the pointer); once the flash is over c asks you to point at a row. Hover or Tab to a row to carry on from there.

<a id="data-inspect-element"></a>

### Inspect element

In the top bar's second row, shown with Show the Frame row in Settings. Selects the OmniScript's element in the Elements panel and leaves it on $omni, so you can poke at it in the Console.

<a id="data-refresh"></a>

### Refresh

Reads the data property of the selected script in full, right now. It is the blue main button only while Auto-refresh is off; with Auto-refresh on the tab updates itself and Refresh is a plain button. Rescan (top bar) is different: it looks for scripts and frames again.

<a id="data-auto-refresh"></a>

### Auto-refresh

Re-reads about once a second (Refresh rate in Settings), slowing to every few seconds while nothing changes; touching the panel brings the fast rate back. Untick it for manual mode: the data is then read only when you press Refresh or change the property or script, never by a rescan or by switching tabs, and the status bar says Manual mode. Polling stops while the panel is off screen. While you have text selected in the tree or the pointer is on a copy button, updates wait until you release the selection so it can be copied.

<a id="data-left-the-page"></a>

### Left the page

If the OmniScript disappears (for example the page navigated), the last data read stays on screen, marked as stale, until you pick another OmniScript or a new one appears.

<a id="data-data-property"></a>

### Data property

In Settings (the gear), under Reading, next to Definition property. Any property name, not just jsonDataStr; a change is applied and the page is scanned again at once. It applies to the Data tab and to the scan that lists the OmniScripts in the top bar; the Structure tab's Current values still read jsonDataStr, so a script that keeps its data elsewhere shows nothing there. Click the field to list what the selected element exposes (with each value's type), type to fuzzy-filter ("jsd" finds jsonDataStr), arrows and Enter to pick. A name that is not listed can still be typed. While it is not jsonDataStr the Settings gear shows a count, and Settings that differ lists it. When no OmniScript is found, see No OmniScript found.

<a id="data-buttons-on-a-row"></a>

### Buttons on a row

Hover a row in any tree (the Form has the copy button only), or move to it with the keyboard, for small icon buttons, which sit right after its value; a row you only clicked does not keep them, and the buttons of a row the pointer has left are gone at once. They never make a row taller. From the keyboard, Tab from a focused row goes to its first button and Tab again to the next, and Shift+Tab comes back; only the focused row's buttons are in the Tab order, so a pointer user never tabs through hidden ones. The two overlapping sheets copy the value as JSON (strings keep their quotes), or the whole branch; the icon turns into a check mark for a moment once copied. The % button after it copies the place of the row as a %merge% field, such as %Step:Rows\|2:Code% (the same as Copy as %merge% field in the row menu; it is a path, so Mask values leaves it as it is). Branch rows also have a plus or minus in a box, which opens or closes everything inside that branch (the same as Alt+click on the row), and it holds while a filter is on. Dragging to select several rows still copies them as clean indented text. A value that is a Salesforce record Id (15 or 18 letters and digits with a digit among the first nine, not only digits; an 18-character Id must also end with its checksum, so a word such as a name is not taken for one) also gets an arrow-out-of-a-box button last: it opens that record in a new tab of the org the page belongs to (the page's own address plus the Id). The panel sends nothing; your browser opens the address. The Id stays plain text, so selecting and copying it works as before. The button is not shown when the page's address cannot be read or a loaded bundle is on screen.

<a id="data-changes"></a>

### Changes

Track changes (off by default, next to Auto-refresh) is the switch for all of it. Ticked, a Changes bar appears under the toolbar (Changed only, Previous change / Next change, Clear marks, Compare data), the view switch gets a Changes view, and changed values stay marked with a bar at the left edge once the amber has faded, until you press Clear marks. Unticked, the bar and the view are hidden and the marks and the log are dropped; values still flash amber. Changed only lists just the marked values. Previous change / Next change jump between them in tree order and open whatever hides them. Hover a marked row to see the value it had before its first change since the marks were cleared.

<a id="data-where-is-this-set"></a>

### Where is this set?

Right-click a row, Where is this set?: a small popover says what the panel knows about how that value got there. The last change it logged (the time, the step, was → now; only while Track changes is on), the call that was running, or had ended less than 5 seconds before, when that change was noticed, and the Set Values elements that write it. The call and each Set Values element are links to Calls and Structure; Esc or a click elsewhere closes it. A row that changed also says, in its tooltip, "Last changed 10:42:03 after Onboarding\_GetPlans". Nothing is shown for what is not known, and Mask values hides the values.

<a id="data-show-in-structure-button"></a>

### Show in Structure button

Hover a row for the Structure icon (the tab's own): switches to the Structure tab and selects the element that owns that key (or the nearest parent element). Structure's Show in Data does the reverse.

<a id="data-mask-values"></a>

### Mask values

The switch in the top bar. While it is on, Copy JSON, Save file, the per-row copy button, Structure's value copy and the Calls export replace strings and numbers with \<string\> and \<number\>. Keys, structure, empty strings, booleans and null are kept. Dragging to select text and copying it is masked the same way, in the tree and the Raw view. On screen it also hides the values in the watch list and in its change notices, in the Changes view and in the Where is this set? popover; the tree and the Raw view still show the data itself. Off every time the panel opens unless Mask values at start is ticked in Settings (see its entry); the switch itself is not stored.

<a id="data-watch-list"></a>

### Watch list

Hover a row and press the eye icon (or right-click, Add to watch list) to keep its value in a strip above the tree while you scroll or step through the script. Click a name to find it in the tree, × to remove. A long list scrolls inside the strip, which never takes more than about a third of the panel; the + stays in view. The bell on an item turns on a notice: when its value changes, a toast says what it was and what it is now and the item flashes. Where the rows of a list have a shared Id, Name or key, a watched value stays with its row when rows above it are removed or added; otherwise it stays at its position. If the watched row is gone the item says so. The + at the end of the strip (or right-click a row, Watch an expression…, which starts the box with that row's path) opens a box for an expression: a path such as Step:Rows\|2:Code (positions count from 1; a bare name is looked for at any depth), a $ query such as $.Rows\[\*\].Qty (several values are shown as 3 values: a, b, c), or a comparison such as Step:Total \> 100, Status = "Done" or Items.length \>= 3. Operators are = != \< \<= \> \>= and contains; the right side is a number, a quoted text, true, false or null; the left side is a path or $ query, optionally ending in .length (items of a list, characters of a text, keys of an object). A number and a numeric text compare as numbers ("5" \> 3 is true), other texts exactly, case included. A comparison shows true (green) or false (amber), a path that is not there says so. Enter adds it, Esc closes the box; an expression has the bell and × like a pinned row. The list is cleared when you pick another OmniScript, unless Remember my settings is ticked (Settings, below): then the watched paths, the expressions and which have the bell on are kept in this browser's extension storage for each script (by its Type/SubType/Language, the last 50 scripts, at most 50 paths and 20 expressions each) and come back when you pick that script again. What is kept is the names and positions in your script and the text of your expressions, never the values; unticking Remember my settings deletes them.

<a id="data-views"></a>

### Views

The view switch is the first thing on the toolbar and stays where it is: Tree, Form, Raw and Sizes are always there, and with Track changes on a Changes button is added at the end, so the others do not move when you tick it. Tree is the collapsible tree, Form (see Form view) lists each key as a labelled row, and Raw is the page's text. The choice of Tree, Form or Raw is kept when Remember my settings is ticked; Sizes and Changes are a look at the moment and are not, and unticking Track changes goes back to the Tree from Changes. Expand all and Collapse all open and close the branches of the Tree and the groups of the Form, and are greyed out in the other views.

<a id="data-form-view"></a>

### Form view

Form lists the data the way the page's form is laid out, with the rows the Structure tab's Current value Form has. Each key is a row: its label is the label of the element that owns the key, with the element's name dimmed after it, and its value is plain monospace text. A key with no element of its own (or a script whose definition has not been read) is its own label. An object or a list is a row that says "3 items"; click it, or press Enter or the right arrow on the row, to open it in place, indented, and the left arrow closes it. Rows are the Tree's branches, so what is open in the Tree is open in the Form, and Expand all and Collapse all work on both. The filter box narrows the rows by label, key or value as it narrows the Tree, with the way down to each match and everything under a key or label that matched; an OmniScript path, key=value or $ query selects the rows the Tree would. Track changes marks a changed row with the same flash and the bar at the left edge, Changed only keeps those rows, and Previous change / Next change move through them and open what hides them. Hover a marked row to see the value it had before. Right-click a row, or press the menu key (or Shift+F10) on it, for the Tree row's menu: Where is this set?, Show in Structure, copy the value, the path or the merge field, filter, watch, open record. The copy button after a row's value copies it as JSON, and Mask values applies as in the Tree, also to a selection dragged across rows. Tab goes to the rows (one at a time is in the tab order); the up and down arrows, Home and End move between them, c copies the focused row's value. Copy JSON and Save file copy the data, not the view. A very long list is drawn up to 400 rows, and a line below the last one says how many are left; filter, or use the Tree or Raw, to reach them.

<a id="data-sizes"></a>

### Sizes

Where the bytes are, measured in one pass as compact JSON and only again when the data changes. List (the default) is a table of the top-level keys, the biggest first, 20 at first, each with the size of everything under it: rank, path (written as in the OmniScript, Step:Rows\|3:Code, positions counting from 1; a long path wraps after a colon), a bar as long as its share of the largest, its size and its share of the whole data. The heading says how many are listed (Largest 20 of 143 keys · whole data 123.5 KB). The list is always one level, the same as a drill into Data: a deep value is never mixed in with the top-level keys, you find it by drilling down the biggest bar (the columns stay where they are when you drill). Show 20 more adds the next 20, Show all lists them all (up to 2000), Show fewer, beside them once more than 20 are listed, goes back to the first 20 (you stay where you drilled, and the first row gets the focus), and the number you chose is kept while the panel is open. A row with values under it has a chevron: click the row (or its chevron, or press Enter on it) to drill into that value, and the list becomes its children ranked by size (shares stay shares of the whole data), with a trail above (Data › PlanSelection › AddOns) and the heading naming the value and its size. Hover a row, or move to it with the keyboard, for Show in tree: a small button with the Tree's icon at the end of its path, which switches to the Tree and jumps to that value, so a row with values under it can be shown in the tree without drilling. From the keyboard the list is one stop in the Tab order, with that row's Show in tree button next in line: the arrow keys, Home and End move between its rows, Enter or the right arrow drills into a row that has values under it, and the left arrow or Esc goes up. Click a part of the trail, or press Esc, to go up one level; the treemap uses the same trail, so the list and the treemap are always at the same place. Treemap, the small switch at the top right of the view, draws the top-level keys as areas in proportion to their size, each with its largest children inside it (those of at least 2% of it; the rest is one dashed other block). The colours are one blue: each key a step lighter or darker than the one before, the blocks inside it a step darker than their key. A key past the eighth is grey, the keys past the 16 largest are one grey cell, and a key keeps its colour while sizes change. Hover a cell for its path, size and share. In the list, click a row that has nothing under it (or press Shift+Enter or Space on any row) to find it in the tree. In the treemap, click a top-level cell that has children to zoom into it: its children fill the whole area, each with its own largest children inside, and the trail above (Data › Plan) goes back: click a step, or press Esc to go up one level. You can keep zooming, one level at a time. Percentages stay shares of the whole data. Click a cell that has nothing inside, a child cell or the last part of the trail to find it in the tree; Shift+click does that for any cell. The chart you chose and the place you drilled or zoomed into are kept while the panel is open. Unused, the outlined chip before that switch (it shows a check mark while it is on; it is a filter, not a view; on the list), shows only the keys no element of the script reads, each with its size, and the heading says how many, how big and what share of the data that is: the dead weight, such as the fields a Data Mapper returns and nothing uses. A key counts as read when an element has its name (exactly, case matters) or a show rule, validation, Set Values target or source, %merge% field in a label or text, or formula runs through it; the keys the platform writes (timeStamp, userId, ContextId, error and the like) are never listed. Inside a step or block each key is judged, rows of a repeat block too; an element's own value (a lookup's object, an action's response) is not taken apart. It is a guide, not proof: something the panel cannot see, such as an action's extra payload or a custom component, may still read a key it lists. The data an action sends (sendJSONPath, sendJSONNode) or lands its response in (responseJSONNode, responseJSONPath) counts as read. The list shows the 50 largest. These are keys of the whole data, so turning Unused on leaves a drill (the trail goes) and turning it off again shows the whole data, not the place you were at. It needs the script's elements: until the Structure tab has loaded them the switch is dimmed, and pressing it fetches them.

<a id="data-changes-view"></a>

### Changes view

In the Changes view (Track changes on). It lists the last 200 values that changed while this tab was collecting (the same time Compare data keeps its history), oldest first, as time · path · was → now; hover a line for the step the script was on (the opened values and Copy log give it too). Paths are written as in the OmniScript, Step:Rows\|2:Field, with positions counting from 1 (\|3 is row 3 of the list; hover a path to be told). A row added or removed is one line. Click a line (or press Enter on it) to open it in place: the value before (red, −) and after (green, +) with the part that differs marked; an object or list is written over several lines and folded after 20, with a more button. An opened line stays open while new changes are added, and a second click closes it. The tree icon right after the path (or t) finds it in the tree. The values before and after sit in two columns that line up from one line to the next. Up and Down move between lines. Mask values hides the values on screen and in what is copied; Copy log copies one line per change. Clear marks empties the log. It starts empty each time you pick another OmniScript.

<a id="data-filter"></a>

### Filter

Besides text, the filter box takes an OmniScript path such as Step:Rows\|2:Field (the number after \| counts from 1; without it a list is searched in every row) and key=value such as Name=Ada (any depth, the whole value, ignoring case; a path can be the key; key= alone lists every place the key appears). If a path or key=value finds nothing it is searched as plain text instead. A filter that starts with $ is a $ query over the data: $.Step.Rows\[\*\].Code (every item of a list), $..Code (a key at any depth), $.Rows\[2\] (one item, counted from 0 as in JSON), $.Rows\[-1\] (the last), $.Rows\[1:3\] (items 1 and 2), $.\*.Name (every child), and $\["a.b"\] for a key with dots, spaces or colons in quotes. Matches are shown with the rows above them, like a text filter, and the status bar says how many there are ("3 matches for $…"; "5,000+" when it stopped at its limit). Filters and expressions such as $..\[?(@.Qty\>1)\] are not supported: a $ that does not parse (a lone $, $1,000) is searched as plain text, and one that parses but finds nothing says "Nothing matches $…". In Raw view the box is still a text search.

<a id="data-compare-data"></a>

### Compare data

The last 12 distinct reads of the data (fewer when they are large) are kept in memory whether or not Track changes is on, and discarded with the panel or when you pick another script or property, each labelled with the time, the step the script was on and how long ago it was read (12:01:03 · Step2 · 12 s ago, when the Structure tab knows the step). Compare data (in the Changes bar, so Track changes must be on) sets any two of them side by side: what was added, removed or changed between, say, before and after you pressed Next (see Side by side). Rows of a list are lined up first, by a shared Id, Name or key when every row has one, otherwise by content, so removing one row of three hundred shows one removed row and not a change in every row after it. The head of the comparison counts what changed, was added and was removed. Paths are written as in the OmniScript, Step:Rows\|2:Field, with positions counting from 1 (hover the heading). List shows each difference as a block instead: the path first, then for a changed value the value before (red, −) and after (green, +); a value longer than 160 characters is folded around the part that differs, and its more button opens it. Since this step began picks Before as the first read since the script entered the step it is on and After as the latest; it is greyed out, with the reason shown beside it, when the step is not known or fewer than two reads were made in it. Copy, in the head of the comparison, copies the differences as JSON and honours Mask values, which also applies to the values shown. Load file… adds a JSON file from your computer (for example data saved earlier with Save file) as a snapshot named file: its-name.json that you can pick as Before or After. It is read in the panel and kept in memory only, like the other snapshots; the last five are kept, and a file that is not valid JSON is refused.

<a id="data-toolbar-icons"></a>

### Toolbar icons

Every toolbar button has an icon before its label. When the panel is too narrow for the labels, only the icons are shown, except Refresh and Recording / Paused, which keep their text; hover an icon for what it does. In a narrow panel (DevTools docked to the side) the top bar buttons are icon-only too, with their names on hover.

<a id="data-right-click"></a>

### Right-click

A row's menu (the Form's rows have the same): copy value, key, the OmniScript path (StepA:Rows\|2:Code, repeat positions from 1) or the same as a merge field (%StepA:Rows\|2:Code%), filter to this key, watch, watch an expression…, show in Structure, Where is this set?, open record (on a record Id: opens it in a new tab, greyed out as Open record (no page) when there is no page to take the address from), expand or collapse the branch, or everything inside it. In any menu the up and down arrows move between its items (and wrap), Home and End go to the first and last, and Esc closes it with the focus back on the row it was opened from.

<a id="data-raw-search"></a>

### Raw search

In Raw view the filter box searches the text: every match is marked, Enter and Shift+Enter walk them, and the status bar counts lines and matches; long lines wrap. Ctrl/Cmd+C copies exactly the highlighted text; with only a click inside a value it copies that value.

<a id="data-copying"></a>

### Copying

Ctrl/Cmd+C copies exactly what you highlight: select a few characters of a value and only those are copied. A selection across several rows is copied as clean indented text. With nothing highlighted, a click inside a value (tree or Raw) is enough: Ctrl/Cmd+C then copies that whole value, a string as raw text without its quotes when the caret is between them. Mask values applies to all of it.

<a id="data-big-data"></a>

### Big data

A tree of more than 1500 rows is drawn a window at a time as you scroll, so nothing is cut off. Dragging a selection across rows, or Ctrl/Cmd+A, copies only the rows currently drawn, and a toast says so (Copied 112 of 41,000 rows); use the copy button on the branch, or Copy JSON, for everything. Expand all opens branches, not values, and says how many it opened if there are more than 20,000.

<a id="data-tree-form-raw"></a>

### Tree / Form / Raw

Raw shows the page's own text laid out one entry per line, with the same line numbers as the Tree, so it lists the keys in the Tree's order (JavaScript puts keys like 10 and 2 first) while every digit stays as the page wrote it. Copy JSON and Save file write the page's text in the page's own key order, so key order and every digit are kept; the Tree itself shows the parsed value (which also rounds integers above 2^53). When the data holds such integers the status bar says so. If a key is repeated in the data JSON the parsed value is shown instead. If the property is not valid JSON, the raw value is shown with the parse error.

<a id="data-sticky-path"></a>

### Sticky path

While you scroll a long tree, the open branches the first visible row sits inside stay pinned at the top, outermost first and at most three lines (the nearest ones): Step, Block, Items. Click one to scroll to that row. It works for big data drawn a window at a time too. The lines are for the mouse; from the keyboard, ← on a row goes to its parent.

<a id="data-keyboard-in-the-tree"></a>

### Keyboard in the tree

Tab moves into the rows (one at a time is in the tab order); then the arrow keys move between rows, Home and End go to the first and last, → opens a branch or moves into it, ← folds it or moves to the parent, Enter or Space opens and closes it, c copies the focused row's value (with no row focused, the row under the pointer, or the row you have just jumped to for as long as it flashes), and the context-menu key opens its menu. Mouse use is unchanged. A row changed since the marks were cleared announces its previous value (Was: …) to screen readers.

<a id="structure"></a>

## Structure

Every element the OmniScript is built from, read from its definition and joined to the live data.

<a id="structure-start"></a>

### Start here

1. Pick your OmniScript in the bar at the top. The list shows every element of its definition.
2. Click an element to see its value, properties, rules and calls on the right.
3. Follow current step keeps the step the script is on selected; Current step takes you back to it.
4. Type in the filter to find an element by name, type or label. Actions only lists what calls something.
5. Problems (N) appears only while the definition has something provably wrong.

<a id="structure-definition-property"></a>

### Definition property

Which property of the element holds the OmniScript definition: jsonDef by default. The field is in Settings (the gear), under Reading, next to Data property, not in the Structure toolbar. A change is applied and the page is scanned again at once. Click it for the same fuzzy list of properties as the Data tab. The Settings gear in the top bar counts it while it is not jsonDef. When no script is found, the list says so in one line with a Rescan button and a More help link, the toolbar controls are greyed out and the detail pane is folded away until a script turns up.

<a id="structure-refresh"></a>

### Refresh

Reloads the definition of the selected script now. It keeps its text when the toolbar is narrow, and is the one toolbar button that works while no script is found. Rescan at the top does something else: it looks for scripts and frames again. The definition is also read again about every six seconds while this tab is open (see Editing in Designer).

<a id="structure-row-menu"></a>

### Row menu

Right-click a row (or press the menu key on it) for a menu about that element, with the row outlined while it is open: Copy name, Copy OmniScript path (read from the element's JSONPath property, or the names from its step down), Show in Data, Highlight on page (under Advanced, for a step, field or block; an action or validation is not drawn on the page), Expand this branch or Collapse this branch (on a step or block: opens or folds it and every section inside it) and Select this row. Right-clicking does not select the row; Select this row does. On a step the menu may also offer Previous step or Go to this step (see Go to an earlier step).

<a id="structure-go-to-an-earlier-step"></a>

### Go to an earlier step

The row menu of a step the script has already passed offers Go to this step, and the step the script is on offers Previous step. The head of the selected step carries the same request as a small button with a left arrow, Go to this step on a passed step and Previous step on the current one, with the same tooltip. It asks the running script to show that step again, even when the script hides its Previous button (the designer hides it by setting the step's Previous Width to 0). The panel clicks the script's Previous button whether or not it can be seen and, when it finds none, sends the script the same event its own buttons use. It only goes backwards: a later step and the current step are not offered Go to this step, steps the script skipped are not counted, and a trip of more than 10 steps is not offered. It changes which step the page shows, never the data. A script may refuse: if the step has not changed a few seconds later, nothing happened and the status bar says so (Could not go back: the script has no Previous button and ignored the request). Otherwise the status bar says Asked the script to go back N steps, and Follow current step picks up the new step as usual. Check the result on the page.

<a id="structure-filter"></a>

### Filter

Matches the element name, type and label, and also every custom-label key the element uses together with the text it resolves to — so a word from the screen finds the element even when the label is only a key. The steps and blocks above a match stay in the list, dimmed, so the matches keep their place in the script; if the element you selected is filtered out, the detail pane says so. Type override: to list only the elements a custom Lightning web component overrides, or override:name for those of one component (the c-my-input tag and the myInput name both match).

<a id="structure-highlight-on-page"></a>

### Highlight on page

The detail pane's button (or the Highlight on hover switch) outlines the element's component on the inspected page for a couple of seconds, found through the lwcId in the definition. Best effort: it needs an open shadow root and an element that carries that id, and says so when it cannot find one.

<a id="structure-collapse-done-steps"></a>

### Collapse done steps

Folds each step once the script has passed it and opens it again if the script comes back. Anything you fold or unfold by hand is left as you set it. Turning it off opens the steps it folded.

<a id="structure-calls-tab"></a>

### Calls tab

For an element that calls a Data Mapper, Integration Procedure or class, it opens with two lines read from the element's settings: Sends (sendJSONPath, with sendJSONNode and the extra payload; the whole data when no path is set; only the extra payload when sendOnlyExtraPayload is on) and Response node (responseJSONNode, with responseJSONPath; when none is set it says 'none set' and that the answer lands in the data root, the top level of the data), plus On failure when the element sets a next step or a response, and the muted name of what it calls. The place in the data is a button that opens it in the Data tab when the data holds it now. When the action sets extra input, an Additional input card follows (and a Remote options card for its remote options): each Name, the Value as written and the Computed value column, what it comes to with the %merge% fields filled in from the data (tagged estimated ≈ for a formula, can't tell with the reason in the tooltip), with Copy in the card's header to put the table on the clipboard (Mask values replaces what the data holds). Below, the matching calls captured in Calls with time, result and duration; click one to open it there. The tab is available before any call was captured. Best effort: a property a build names differently simply shows less.

<a id="structure-name"></a>

### Name

Rows read name (label): API name first, then the label in parentheses. In a multi-language script labels and Text Block text are custom-label keys, resolved through scriptHeaderDef.allCustomLabels; a single-language script stores the text on the element. Text Blocks show their text (textKey or text). The detail pane shows the underlying label / text key, and the status bar shows the script language.

<a id="structure-element-icons"></a>

### Element icons

Each row starts with a small icon for the kind of element, drawn the same size as the other marks: a window is a step, brackets round a line a block, a text box an input, a ticked box a choice, lines of text a display element (a Text Block, an image, a link), a bolt an action, a circled ! a validation, Set Errors or Messaging element, \<\> a custom component and a dot anything else. The list has no Type column: hover the icon or the row for the exact type, or read it in the detail head. Click the Marks header at the right of the list (it is a button: Enter or Space open it too, Escape closes it) for a legend of all the marks, each drawn as in the list beside what it means; the header's tooltip holds the same in words (see Marks column). The small dot in the kinds is any other element.

<a id="structure-marks-column"></a>

### Marks column

The Marks column sits at the right edge of the list, just before the Valid column and apart from it by a hairline, so every row shows its name on the left and all its marks at the same place on the right, whatever the depth. One small mark each, in this order, with a tooltip: \* required (a neutral mark: red is kept for things that fail) · a closed eye hidden by its show rule (the tooltip says which rule fails and what the field holds, then Shown when: and the rule; a hidden row carries the closed eye alone) · a small diamond, as a flowchart draws a condition, has a show rule and is shown now (the tooltip reads Shown when: and the rule on one line, then what it comes to now) · two arrows calls a Data Mapper, Integration Procedure or class · a cube a custom component overrides the element (the tooltip names it) · a triangle a custom-label key the element uses (label, Text Block text, help text or a manually-entered choice option) is missing from allCustomLabels, which breaks a multi-language OmniScript; hover for which · an unequal sign the value does not fit the element type · on the step the script is on, the red May stop Next number (see May stop Next count). A row with none leaves the cell empty. The list has no Value column: the Current value tab, and its Form view for a step, show every value. Click the Marks header (it is a button: Enter or Space open it too, Escape closes it) for a legend of all the marks, drawn as in the list beside what they mean.

<a id="structure-sections"></a>

### Sections

Steps and blocks that contain other elements are set in a heavier type, with a hairline above them and a chevron at the start — click it to fold the section; a folded section shows how many elements it holds, e.g. (3). Everything starts expanded. Expand all and Collapse all, labelled buttons in the toolbar as in the Data tab (icons only when the panel is narrower than 900 px; hover for their names), open or fold every section of the list; they do not touch the detail pane, whose JSON trees have their own pair when they are on show. In a narrow panel they move into the ... menu at the end of the toolbar, with Timeline, Compare definition and Export. Folding also works while a filter or Actions only is on: a folded section hides its matches too, and they come back when you unfold it. A faint guide runs down each level of indent. Selecting a step or block tints everything inside it, at any depth, in one shade, and draws a strong bracket along its own guide for the full height of what it holds; hovering a section header lights a lighter bracket for its subtree on top of that, so you can see where a block inside the selected step begins and ends. While you scroll through a long step, its row stays pinned just under the column header, so you always see which step you are in; the next step's row takes its place when it arrives.

<a id="structure-valid-column"></a>

### Valid column

The last column of the Structure list, at the right edge after the Marks column and a hairline, has one glyph per row, the same ones as the Result of the Calls list: ✓ passes its rules now, ✕ would stop Next now, – the panel cannot tell. Hover a glyph for the reason in words; a screen reader reads the same sentence. The header is the word Valid, with a tooltip that explains the column. On an element of the step the script is on, or of a step already passed: a required input is ✓ Required and filled or ✕ Required and empty (one the show rules hide is blank, since hidden fields do not stop Next); a Messaging or Validation element is ✕ while it shows a Requirement or Error message, ✓ when it passes or only fires a warning, – when the panel cannot tell; a Set Errors element is ✕ while it fires, ✓ when it does not; a custom component is –, since its own controls cannot be read from the definition. Anything else (display text, a block, an action, an input that is not required) is blank: there is nothing to judge, and blank is not –, which means the panel tried and could not tell. A step shows the sum of its elements: ✕ with the same count as the red May stop Next number (which stays after the name of the step the script is on), ✓ when nothing stops Next on it, – when only a formula's estimate is in doubt, and – Passed without running for a step whose show rule was false. A passed step is judged against the data right now, like the current one, so a ✕ there means its data has gone bad since. A step still ahead and everything in it is blank: its data does not exist yet. With no data read the whole column is blank. Judged against the data right now; best effort. The step the script is on is told by its row and the elements inside it: they share a faint tint of the accent, as an editor marks its current line, and the step's own row alone has a 4 px bar in the accent on its left edge, a bold name, and "The step the OmniScript is on now" in the tooltip of its name (the indent guides are plain grey, so the bar is the only blue stripe); steps ahead are dimmed, and a step passed without running is dimmed and in italics, with "Passed without running: its show rule was false" in the tooltip of its name. Read from the definition (asIndex against each element's indexInParent) for top-level steps and actions. A Set Values, between steps or inside one, counts as run once the script has reached its step and its show rule is true (judged against the live data, or the definition's bShow when the rule cannot be judged).

<a id="structure-follow-current-step"></a>

### Follow current step

On by default. Keeps the current step selected as the script moves on, so the detail pane always shows where you are. Filters are left alone. When you pick an element by hand, following pauses and "· paused while you browse" appears after the label; it resumes when you press Current step or tick the box again.

<a id="structure-hidden-elements"></a>

### Hidden elements

A dimmed row with a closed eye is not shown right now (a diamond mark means the element has a show rule and is shown; the closed eye on a hidden row carries the rule in its tooltip, Shown when:); the status bar counts them ("2 hidden"), leaving out any that rests on a guess: a rule the panel cannot tell about, a formula's estimate, or a parent that is hidden for one of those reasons (these show the diamond instead of the closed eye, and Visible only still drops them). Its show rules are evaluated against the live data (not the definition's bShow, which is only a snapshot from when the definition was read), and the detail pane says in one sentence which rule fails and what the field holds, e.g. Hidden: Step:Type is "y", not "x". Children of a hidden element are hidden too. Visible only filters them out. Rules the panel cannot tell about (unusual operators, a formula it cannot evaluate) fall back to bShow.

<a id="structure-show-in-data"></a>

### Show in Data

Opens the Data tab at the selected element's value, found through its OmniScript path. Data's Structure row button does the reverse.

<a id="structure-current-step"></a>

### Current step

Selects and scrolls to the step the OmniScript is on now. The status bar names it, e.g. "Plan Selection (step 4 of 5)"; hover the status bar for where that was read from. No step in the status bar means the definition did not say which one the script is on.

<a id="structure-actions-only"></a>

### Actions only

Filters to elements that call something — the script's whole integration surface in one list.

<a id="structure-value"></a>

### Value

The Current value tab shows the live data, on its Current value card (see Current value views); the list has no Value column. For a radio or select with manual options the stored value is joined with its option label, e.g. US (United States). For an element inside a Repeat Block or Edit Block the detail head steps through the rows (see Repeat rows).

<a id="structure-detail-tabs"></a>

### Detail tabs

In this order, each with an icon: Current value (Set Values for a Set Values element), Options (for a choice element that lists its options), Properties, Visibility, Validation, Calls, JSON. A tab that does not apply is left out, never greyed: Current value while the data holds nothing for the element (a Formula element keeps it, for its Formula card), Options for an element that lists none, Properties for an element with none, Visibility for an element with no rule that nothing else uses (under Advanced, also when it depends on, is used by or is written by something), Validation for an element that has none (a step gets one while something may stop Next on it), Calls for an action whose settings say nothing and that no captured call matches. A tab comes back when its data does. A pick opens on its own default tab: Current value when the element has a value, Validation for the step the script is on while something may stop Next (and for a Set Errors or Messaging element), Visibility for an element with a show rule, otherwise Properties. A tab you pick stays for the elements that have it, and with Remember my settings it is kept for the next time DevTools opens too (not JSON; Show internal on the Properties tab is kept as well). JSON is last and is not a default: it is the element as JSON, as the Designer's Edit Properties as JSON shows it, for when the readable tabs are not enough, and opens only when you pick it (the next element does not follow you there), unless it is the only tab the element has. What a tab says is drawn as cards, one frame for every fact: a bordered box whose header line holds the card's name in small capitals, the verdict as a tag when there is one (Fails, Passes, Hidden, Shown, Can't tell; hover it for the whole sentence), other tags (estimated ≈, what if) and Copy at the right; hover the header for what the card is. Inside are labelled rows (the label in small capitals, the value beside it, or above it in a pane narrower than 480 px, with a divider between rows) or a table whose cells stack under their column's name in a narrow pane. Names and values are in a monospace font, words in the panel's own; an element's name is a link that selects it; what the panel cannot know is dimmed and in italics (can't tell, not in data); a state is a tag after its value: differs (amber) when a computed value and the current value are not the same, estimated ≈ (outlined) for what a formula the panel evaluates itself comes to, read from the data (grey) for a value the panel took from the data because it cannot work it out. A card's Copy copies it as text, with Mask values applied. Expand all and Collapse all appear only on a tab that draws a JSON tree (Current value in its Tree view, and JSON), the filter box on a tree, on the Form and on Properties, and the toolbar's Copy on JSON. Show in Data is left out for an element that has no place in the data. In a pane narrower than 600 px the tabs show a short name beside the icon (Value, Opts., Props, Visib., Valid., Calls, JSON); the full name is the tab's tooltip and stays for screen readers. Right-click a line in any tree of the pane for the same menu as in Data: copy the value, the key, the OmniScript path or the %merge% field, and open or close a branch (Mask values applies to what is copied).

<a id="structure-json-tab"></a>

### JSON tab

The selected element exactly as the definition holds it, as a tree, the same as the Designer's Edit Properties as JSON shows it: the place to look for what the readable tabs leave out. Open it from the tab strip or from the Show JSON link under the cards of the Visibility and Validation tabs. It is never the tab a pick opens on, unless it is the only one the element has. Expand all, Collapse all, Copy and the filter box work as on any tree, and Mask values masks the answers the element holds (its response and defaultValue entries) in the tree and in what is copied.

<a id="structure-current-value-views"></a>

### Current value views

Current value opens on a Current value card on every element type, before any other card. A simple value (text, a number, true or false, an empty value) is shown in a monospace font with a quiet type hint after it (text, number, true/false, empty); while the data holds nothing for the element the card says not in data, dimmed (a Formula element keeps the tab for its Formula card). An object or a list is a tree inside the card. A step or a block has a switch, Form \| Tree \| Raw, in the card's header beside Copy, and opens on Form. Form is the data laid out as the page's form: each key under the element is a row with its label (the label of the element that owns the key with the element's name dimmed after it, else the key alone; hover for the key and the element's type) and its value as plain text, true and false written as words, with the type hint after a number, a true/false or an empty value. An object or a list shows as "n items" with a chevron that opens it in place, one level at a time, and what is nested is indented; the rows of a repeat or edit block read Row 1, Row 2 and carry the labels of the block's own elements. A very long list is cut after 400 rows, which the Tree and Raw views show in full. Tree is the JSON tree. Raw is the value as JSON text with a numbered line each, the numbers the tree shows. The choice is kept while the panel is open, and across sessions with Remember my settings. The groups you opened on a step are kept while it stays selected and forgotten when you pick another; a row of a repeat block that carries an Id is remembered by it, so removing a row does not open another. The card's Copy copies the value as JSON, from all three views and for a simple value (with Mask values on, masked); the toolbar has no Copy of its own on this tab. The filter box narrows the Form to the rows whose label or key contains the text, among the groups that are open, and the status bar says how many rows of how many are shown; the same text filters the Tree. Expand all and Collapse all belong to the Tree.

<a id="structure-properties-tab"></a>

### Properties tab

The element's settings (its propSetMap) as a two-column table: a readable name on the left (hover for the key as it is in the definition and what the setting means), the value on the right. Known settings come first with plain names, such as Required, Data Mapper bundle or Remote method; the rest keep their own name. A yes/no is ✓ or –, and a long text is cut with more / less. A value that holds others is drawn as a form instead of JSON: a list of options becomes label → value rows, Conditional View becomes a rule table (✓ true now, ✗ false now or ? can't tell, then Field, Must be and Is now), Set Values reads target ← expression, and any other object nests as a table of its own, up to three levels. A level deeper than that, or with more than 30 keys, shows its size with show JSON / hide JSON to open it as a tree. Keys the runtime uses for itself (starting with \_, lwc, pubsub or ssm) are folded behind Show internal (n). A small i after the name of a setting the panel knows (width, repeat, show, mask, the call settings and so on) opens a one- or two-sentence explanation under the row, in plain words, and opens again to close; where the panel is not sure of the meaning, the text says "as far as the panel knows". The filter box above narrows the rows by name or value; when no name or value matches, it reads the explanations too, so "columns" finds Width. A Text Block, Headline or Messaging element has a Merge fields card above the table (see Merge fields card).

<a id="structure-summary"></a>

### Summary

While no element is selected the detail pane shows a summary of the script instead of an empty pane: its Type/SubType/Language, its version and whether it is active and reusable (when the definition carries them), how many elements it has in all (the figure the status bar gives) split into steps and each kind, such as 22: 4 steps · 14 fields · 2 actions, what it calls (Data Mappers, Integration Procedures and Remote Actions, each name a button that selects the first element that calls it, with ×n when several do), the elements a custom Lightning web component overrides (Overridden: N, each name selecting its element), its custom labels (keys, languages and how many are missing; click it for the Problems list), the step the script is on, the furthest step it has been on (only when that is a different one), Problems, and May stop Next for the current step (click it to open that step's Validation tab). A row appears only while it has something to say. Press Esc in the list to come back to it, also under Advanced; Follow current step then does not select anything again until you pick an element, press Current step or tick Follow current step, and says "paused while you browse" meanwhile. Under Advanced, once the script has been seen on a step, the Timeline takes the place of the summary until you pick something, and the Timeline button shows it again whenever you want it. Best effort: a field the definition does not carry is left out.

<a id="structure-visibility-tab"></a>

### Visibility tab

The element's show rule (its Conditional View in the Designer) judged against the data, as one Visibility card. Its header carries the verdict as a tag: Hidden (grey: a hidden element is normal), Shown (green) or Can't tell, with estimated ≈ when it rests on a formula's estimate and what if while a value you typed decides it. Hover the tag for the sentence: Always shown; Shown: its condition is true; Hidden: Step:Plan is "Standard", not "Premium" for a single rule; Hidden: 2 of 3 conditions fail (1 of 3 conditions fails) when every one is needed; Hidden: no condition is true (0 of 3) when one is enough; or that the panel cannot tell if the rule is true here and what the script treats it as, which a Verdict row then says too. An element a parent hides has a Hidden by row with the parent, a link, and why. Then the conditions as one table: a mark per condition that says whether it is met now (✓ met, ✗ not met, ? can't tell), the Field (the element's name, a link that selects it, with the field as written in the tooltip), what it Must be (= "Premium", ≠ "", ≥ 18) and what it Is now (never blank: empty, not in data, or can't tell for a formula or an unusual operator, dimmed), and under each condition the same in plain words, such as FO\_Age is 30, which is 18 or more, or FO\_HasCard is null, which counts as not true. A group says what it needs and how it stands, All of these must be true; 1 of 2 is not, or One of these must be true; none is; a nested group is indented and has its own mark. In a pane narrower than 480 px each condition starts with its mark and its plain words, then Field, Must be and Is now, each label above its value. The As written row ends the card: the rule exactly as the Designer defines it, on one line. Copy copies the card as text, each condition with its plain words; with Mask values on, what the data holds is replaced and the plain words are left out. The JSON tab holds the element as JSON. Under Advanced the card has a Depends on row (with (not an element) for a name the script has no element for), the tab lists in full which elements' rules use the element and which Set Values write it, and is there for an element that others depend on even when it has no rule of its own. Best effort: a rule whose value is a formula (it starts with =) is evaluated here, marked ≈ on its mark and estimated ≈ in the header; see Formulas. Unusual operators and formulas that cannot be evaluated are can't tell and never guessed.

<a id="structure-set-values"></a>

### Set Values

For a Set Values element the first tab, named Set Values, opens on the Set Values card (a Current value card comes first only while the data holds something under the element's name): one row per assignment, under Target, Expression, Computed value and Current value. Target is the element by its name, a link that selects it (the path as written is in the tooltip and in a copy); Expression is as written; Computed value is what the expression gives now, the value the target gets when the element runs, with the %merge% fields filled in from the live data; Current value is what the target holds, the dimmed not in data while it holds nothing. An amber differs tag follows the current value when the two are not the same (for a formula's estimate its tooltip says it differs from the estimate). A formula is evaluated best effort and tagged estimated ≈ (hover for how sure that is); one that cannot be evaluated, or that reads a field with no value yet, says can't tell and the tooltip says why, and is never tagged differs. In a pane narrower than 480 px each assignment stacks as Target, Expression, Computed value and Current value, each under its name. Copy at the right of the card's header copies the table as text, tab separated; with Mask values on, what the data holds is replaced and text written in the definition, such as a fixed value, is kept. The element's JSON is behind its JSON tab, as for every element. For other elements the Current value tab lists which Set Values write into it ("Written by").

<a id="structure-options-tab"></a>

### Options tab

For a Select, Radio, Multi-select, Lookup or Type Ahead element that lists its options in its definition, an Options tab follows Current value: an Options card with each option's Label (the text people read) and Value (what the data stores), and a tick in Selected on the option the data holds, its row tinted. A Multi-select ticks every option it holds. When the data holds a value that is none of the options, nothing is ticked, the card's header carries an amber No match tag (hover it for the value), and an amber chip in the detail head says No option matches it (click it to open the tab). An option list that comes from a Data Mapper, an object or custom code has no options of its own and gets no tab. In a debug bundle saved with Mask values on the answers are placeholders, so nothing is ticked, the card's header says masked and no chip is raised. Copy copies the table as text; with Mask values on, Selected reads (masked) on every row, so which option is selected is not copied.

<a id="structure-formula-card"></a>

### Formula card

A Formula element's Current value tab has a Formula card after the Current value card, which stays even when the Formula card repeats its value. Its rows: Expression, as written; Computed value, what it comes to now, tagged estimated ≈ (the panel evaluates the formula itself, best effort); when the panel cannot evaluate the formula but the data holds the element's value, that value, tagged read from the data (hover for why); else can't tell, with the reason in the tooltip. Under the sub-heading Elements it reads, one row per element the formula reads: its name, a link that selects it (the field as written is in the tooltip; a field that is no element opens its place in Data while the data holds it), and what it holds now. The card stays while the data holds no value for the formula. Copy copies the card as text; with Mask values on, what the data holds is replaced.

<a id="structure-merge-fields-card"></a>

### Merge fields card

A Text Block, Headline or Messaging element holds no value of its own, so it has no Current value tab; the Properties tab is where its text is, and a Merge fields card sits at the top of it: each %merge% field the text reads, once, in reading order, with what the data holds for it now (tagged estimated ≈ for a Formula element's estimate, the dimmed not in data for a field the data does not have). A field that names an element shows the element's label with its name after it, a link that selects it; any other field opens its place in Data. The card is left out for a text that reads no field. Copy copies the table as text; with Mask values on, what the data holds is replaced.

<a id="structure-validation-tab"></a>

### Validation tab

Shown for Set Errors and Messaging / Validation elements, as one Validation card, judged against the data right now, best effort (the header's tooltip says so). Its header carries the verdict as a tag: Fails (red: its Requirement or Error message shows, or its error is set, which blocks Next; amber when that rests on an estimate), Passes (green) or Can't tell, with estimated ≈ and what if as on the Visibility card. Hover the tag for the sentence, such as Expression is false · shown: Requirement “Check the card” or Condition is true now: the error is set and blocks Next. Then one labelled row per fact, with a divider between rows. For Messaging / Validation: Shows, the message the result selects now (no message when it selects none), and Kind, its type and whether it blocks Next (Requirement and Error do, Info, Warning and Comment do not), then the message for the other outcome, dimmed, as If it passes or If it fails (or When and its condition). For Set Errors: under Errors it sets, each element the error lands on, a link, with its message; Message; and Checked, when the user moves between steps or the event it runs on (the error clears once the condition is no longer true). Then the expression (or condition) as the Visibility card's table of conditions, with ✗ in red where a condition that is not met is why it fails, and the As written row, the rule as defined on one line. Copy copies the card as text. Messages written as formulas (text starting with =, such as =IF(%LanguageCode%=='fi',...)) are evaluated as estimates: the text it comes to, tagged estimated ≈ (hover for the formula and where a language came from), with a Message formula fold under it that holds the formula as written. In a table cell of the Properties tab the same reads ≈ “text”, with a formula fold. When a merge field has no value it says can't tell: no value for %Field%. %LanguageCode% falls back to the script's own language when the data has none, and the tooltip says so. A code with a region (en\_US) is tried as written and as the bare language (en), whichever the formula compares with; when it compares with both, or the script names its language in words (English), it says can't tell instead of guessing. The same applies to message and label texts in the Properties tab and in a step's Validation tab. Best effort: only a rule group can be judged; a formula expression is reported as such.

<a id="structure-export"></a>

### Export

The Export button, under Advanced at the end of the toolbar, opens a menu: Structure as Markdown (a heading per step and a table of its elements, indented by depth, with type, label, required, show rule, remote target and a validation summary), Structure as CSV (one row per element, with depth and parent), Custom labels as CSV (each key, the text it resolves to, which elements use it and whether it is missing from allCustomLabels; one text column per language when the script has several; greyed out when the script has no custom labels) and Definition JSON (the definition exactly as read, the baseline for Compare definition). The files hold the structure and labels only, never a value from the data, so Mask values has nothing to hide in them; the one exception is Definition JSON when a loaded script keeps answers inside its definition (a response or defaultValue), which Mask values then replaces with placeholders, keys kept. In the CSV files a cell that starts with = + - or @ gets a leading apostrophe so a spreadsheet does not run it.

<a id="structure-timeline"></a>

### Timeline

Under Advanced, the Timeline button (filled while it is on) or the detail pane when nothing has been picked yet (Esc shows the summary instead) lists every visit to a step, oldest first: the step, when it began (the clock time), how long the script stayed (in the Time format of Calls), a thin bar for that time with the longest visit at full width and a tick for every captured call that started during it (hover a tick for the call), and the size of the last data JSON read during the visit. The visit going on is marked (now) and grows in place. Click a step to select it; picking a row of the list also leaves the Timeline, and the button comes back to it. Measured only while the panel is open and on screen, like Step timing; the 40 newest visits are listed.

<a id="structure-set-errors-toast"></a>

### Set Errors toast

When Set Errors or validations start to fire on the step the script is on while another tab is showing, a toast says so, for example "Set Errors fire on Intro: 2". It appears when the number goes from none to some, never while this tab is open (the step's red number says it there), at most once every 30 seconds, and not for errors that rest only on a formula estimate. Arriving on a step where errors already fire only sets the starting point. It reads the data JSON the panel already polls about every two seconds; it needs the definition to have been loaded once.

<a id="structure-what-if"></a>

### What if

In the conditions of the Visibility card, and of a Set Errors or Messaging element's Validation card, the Is now cell of every condition can be edited: click it (or press Enter on it), type a value and press Enter or leave the box to keep it, Escape to drop it. The condition's mark and plain words, the group lines and the card's verdict recompute as if the field held that value, with "edited" on the row and a what if tag in the card's header (the verdict's tooltip ends with (what if)), so you can see which value would show an element or make an error fire. A plain number is a number, anything else is text. Nothing is written to the page and the data is not touched. Reset what-if, which appears while any value is typed, puts them all back. A typed value also goes when you select another element, or when the data for its field changes by itself. A step's Validation tab shows the same conditions, without editing.

<a id="structure-value-type-hints"></a>

### Value type hints

A small amber unequal sign on a row, and one amber line in the detail head, say that the value in the data does not have the shape the element type promises: a Number or Currency that holds text (a comma or space inside a number, as in 12,5, is a locale format and not a number), a Date, Date/Time or Time that is not ISO and does not fit the element's dateFormat or timeFormat, a Checkbox or Toggle that holds the text true or false instead of a boolean, a Select or Radio that holds something outside its static options, a Multi-select that holds text instead of a list. Hover the mark or the row for the sentence. It is a hint, not a problem: nothing counts it, not the Problems button, the red number or the status bar. It is judged only when the data holds a value, never for an estimate (≈), a type the panel does not know, or options that come from a Data Mapper or other source. Best effort.

<a id="structure-compare-definition"></a>

### Compare definition

Under Advanced, Compare definition… picks a file and lists what differs between it and the script now. The file may be the definition text itself (the jsonDef property) or a debug bundle that holds the definition; the file is Before and the script now is After. Added, Removed, Renamed (the same type in the same place under a new name) and Changed are listed, each with a short note of what changed: label, required, show rule, validation, remote target, options, Set Values and help text. Runtime values the script rewrites while it runs are ignored. Click a name to select it in the list; the comparison stays until you press Close, pick a row in the list, or turn Advanced off. Export has Definition JSON to keep a baseline. The file is read here and kept in memory only.

<a id="structure-resizing"></a>

### Resizing

Drag the divider between the element list and the detail pane to rebalance them; it works whether they sit side by side or stacked. Double-click to reset.

<a id="structure-step-validation"></a>

### Step validation

A step has a Validation tab while something may stop Next on it, or while it holds a custom component; the number after the name is how many things may stop Next. It is judged against the data right now, best effort (each card's header says so in its tooltip), and is a column of cards. A Required and empty card, while there are any: the visible required elements of the step, at any depth, whose value is empty, one row each with the name as a link (a required checkbox or disclosure must be ticked; a Name or Geolocation with nothing in it is empty; required fields inside an Edit Block are left out, since they are checked when the row is saved). In a repeat block every row is judged on its own: a row without the field counts as empty ("row 2"), a block inside a block names the outer row and then the inner one ("row 2.1"), and a show rule inside the block is read with that row's own values; a finding inside a block that rests on a rule the panel cannot tell about is tagged estimated ≈ and not counted. Then, under Validation rules, one card per Messaging / Validation and Set Errors element of the step, and per Set Errors anywhere else that puts an error on an element of the step ((in Step) on its line): its kind and name, a link, in the header with its verdict, Fails, Passes, Hidden (hidden, so it holds nobody back) or Can't tell. A failing rule is open, with what it shows and its kind (or the errors it sets) and its condition as the Visibility card's table; a passing one is closed to its header line, which gives the condition that decides it, such as FO\_Age is 30, which is 18 or more. Click a card's header to open or close it; it stays as you left it while the tab is open. A rule that fails only by a formula's estimate is amber, tagged estimated ≈, and not counted. Then, under Custom components, a card per Custom LWC of the step and per standard element a custom component overrides (overridden by and the component on its line): its verdict, Shown or Hidden, and the condition that decides it, opening to its show rule (a hidden one is open); and the note that a custom component may carry its own required controls or Next/Previous buttons, which cannot be read from the definition. Click a name to select that element. The tab follows the data as it changes. Server-side checks and rules the panel cannot evaluate are not covered.

<a id="structure-may-stop-next-count"></a>

### May stop Next count

The step the script is on carries a small red number in the list: how many things may stop Next on it (the required fields that are empty plus the Set Errors / validations firing now). The step's ✕ in the Next column says the same, and each field or element behind the count has its own ✕ (see Next column). Every step's head says the same in "May stop Next: N", only while it is above zero. It follows the data and the badge is absent at zero. Nothing that rests only on a formula's estimate is counted.

<a id="structure-formulas"></a>

### Formulas

Where a show rule compares with a formula (a value starting with =), a rule field names a Formula element the data holds nothing for yet, a Set Values assigns a formula, or a Formula element has no value, the panel evaluates it itself and marks the outcome as an estimate: ≈ before the value, ≈ before the result mark of a rule, and (estimated) at the end of the sentence. Supported, best effort: numbers, text, %Field% and %Step:Field% references, + - \* /, comparisons, \& to join text, parentheses, and IF, AND, OR, NOT, ISBLANK, ISNULL, CONCAT, LEN, UPPER, LOWER, TRIM, ABS, ROUND, FLOOR, CEILING, MAX, MIN, SUM, AVERAGE, NUMBER and TEXT. An unknown function, a syntax error, a field with no value or text where a number is needed is not guessed: the tooltip says why, and the rule stays unjudged (?). Messages and texts written as formulas (Set Errors, Messaging, properties) are evaluated the same way and shown with ≈; the formula stays in a fold under them. The script itself decides what really happens, so an estimate never turns the red count up on its own: such findings sit under Estimated, not counted in the step's Validation tab.

<a id="structure-problems"></a>

### Problems

When something in the definition is provably wrong, a Problems (N) button appears in the toolbar (nothing is shown at zero). Errors: names used twice, Set Errors aimed at a name that is not an element, custom labels missing from allCustomLabels. Warnings: an empty show rule. Only these count in the button. A bare name that a rule or a %merge% field uses and that is neither an element nor a key in the live data is judged against the data, which a Data Mapper, Integration Procedure or Set Values may fill later, so it is listed apart, under a folded group "Not in the data yet (N)" at the bottom of the list, and never counted. Formulas (=), $ references, Set Values targets and any qualified path (Step:Field, the response nodes of an action) are not judged at all, and nothing data-based is reported while no data could be read. Click a line to select the element, click the button again (or Close) to leave the list. It is checked again when the definition or the data changes: best effort.

<a id="structure-repeat-rows"></a>

### Repeat rows

For an element inside a Repeat Block or Edit Block the detail head shows Row 1 of 3 with ‹ › to step through the rows. The Current value tab, the step's Validation tab and Set Values follow the chosen row. Rows count from 1, as in OmniScript paths.

<a id="structure-depends-on-used-by-written-by"></a>

### Depends on / Used by / Written by

Under Advanced the Visibility tab lists, as buttons that select the element, Depends on (fields the rules read), Used by (elements whose rules read this one) and Written by (Set Values that write into it, with their step). The tab is offered for any element that has one of the three, even without a rule of its own. The Current value tab lists Written by too, without Advanced. The detail head does not carry them: it is one line, see Detail head.

<a id="structure-detail-pane-head"></a>

### Detail pane head

One compact line under the name: the type, the name and the flags that apply, e.g. Text · PromoCode · conditional. An element a custom component draws instead of the standard one adds · overridden by c-my-input (read from lwcComponentOverride or lwcOverride): its own markup and validation run, which the definition cannot show. Only while they apply, it adds a verdict chip (red when a rule hides the element or an error blocks Next, amber when that rests on an estimate or the panel cannot tell if the rule is true; click it for the Visibility or Validation tab, which says it in full), May stop Next: N on a step, the calls and time on a step, and the row stepper. A figure that is zero is never shown. A shown element has no chip; its sentence, such as Shown: its condition holds, opens its Visibility tab. A choice element whose value is none of its options also gets an amber chip, a button, No option matches it, which opens the Options tab (see Options tab); on the Options tab itself, where there is nothing left to open, the head keeps a plain ≠ line with the same words. The head of a step may end with a Previous step or Go to this step button (see Go to an earlier step).

<a id="structure-step-timing"></a>

### Step timing

The head of a step says how many captured calls started while the script was on it ("Calls during this step: 2"; click it to open the first one in Calls), once there is one. Under Advanced it also says how long the script spent on the step, once it has been there ("Time on this step: 72,000 ms (2 visits)"; a return to an earlier step is another visit; the Time format setting (Settings, Calls) decides whether it reads in milliseconds or as "1m 12s"). Measured while the DevTools panel is open and on screen, whichever tab you are on (it reads the step about every two seconds, sharing the Data tab's reads), and the step: filter of Calls uses the same visits. With the panel closed or another DevTools panel in front nothing is measured, and a move made then is dated from the next look. The figures start over when you pick another OmniScript, change the definition property or the page navigates.

<a id="structure-editing-in-designer"></a>

### Editing in Designer

The definition is read again about every six seconds while this tab is open. When elements were added, removed, renamed or had their label, required flag, show rule, remote call, validation, help text, options or Set Values changed, the tree is redrawn and your selection and folds stay on the elements that are still there. A running script rewrites some definition fields itself (the active step, which elements are shown); those alone never redraw anything. Refresh reloads it at once.

<a id="actions"></a>

## Calls

Apex calls the page makes while you work, decoded. Capture runs whenever the panel is open, whichever tab you are on.

<a id="actions-start"></a>

### Start here

1. Use the page as you normally do: its Apex calls appear here as they are made, decoded.
2. Click a call to see its input, options and output on the right.
3. A call that failed opens on its output, where the reason is.
4. Type in the filter to find a call by class or method. in: searches inputs and outputs.
5. Compare with previous (or press d) shows what changed between two calls to the same place.

<a id="actions-time-format"></a>

### Time format

In Settings (the gear), under Calls, the Time format switch chooses how call times are written: ms (the default) gives exact milliseconds, "1,240 ms"; s gives seconds and minutes, "1.2 s" and "1m 12s", and anything under a second stays in milliseconds ("640 ms"). It applies to the Took column and its tooltip, the line under a call's name, the comparison heading and the selection bar with its segments. It is in force whether or not Advanced is on. Reset next to Time format in Settings, or Restore default settings, puts it back to ms. The slow-call threshold is always in milliseconds.

<a id="actions-failed-only"></a>

### Failed only

Under Advanced. Failed only keeps the calls the row marks as failed. It is the one filter control the tab's toolbar keeps; the tab badge turns red as soon as any call failed, whatever this says.

<a id="actions-slow-calls"></a>

### Slow calls

slow:800 in the filter box keeps the calls whose round trip was at least 800 ms; slow: alone uses the Slow call threshold from Settings (the gear, under Calls), or 2000 ms when that is empty or 0. It combines with words and the other prefixes, and the status bar says "slow: 800 ms" while it is in the box. When a threshold is set in Settings, calls at least that slow also get their Took in amber, and a slow call's detail says where its time went (2 s when no threshold is set).

<a id="actions-filter-box"></a>

### Filter box

Plain words match the call's name (class, method, bundle or key). Prefixes narrow by something else, and combine with each other and with words: in:text finds calls whose input, options or output hold the text, as a key or a value, and shows the hit under the name; url:text matches the request URL; step:text keeps the calls made while the script was on a step whose name or key holds the text (step:"Order Review" for a name with spaces). slow:800 keeps the calls that took at least 800 ms (slow: alone uses the threshold from Settings; see Slow calls). repeat: (or repeats) keeps only the calls that repeat an earlier one and the calls they repeat, and takes no text. With Mask values on, in: matches keys only.

<a id="actions-compare"></a>

### Compare

Every call with an earlier call to the same place has a Compare with previous button (or press d): what changed in the input, options and output. Shift+D diffs against the last earlier call that did not fail, and a failed call gets a Compare with last success button when that is a different call. A call with two ways to compare (a re-run also has its original) shows them as one Compare ▾ menu. To pick any call as the baseline, Ctrl/Cmd-click it, press b on it, or right-click it and choose Set as baseline, then move to the call to compare. A Compare tab appears in the detail pane while a baseline is set, and its first line says how the baseline was chosen; Stop comparing under it clears the baseline (so do b or Clear baseline on the baseline call), and the call opens on its own tabs again. It sets the Input, the Options and the Output of the two calls Side by side (see Side by side), Before: the call at 10:42:03 against After: this call at 10:43:19; a part with no difference says Identical on one line and shows its panes only with Show unchanged. When both calls are debug runs of one kind it starts with their steps side by side (see Debug tab).

<a id="actions-select-calls"></a>

### Select calls

Tick the box at the start of a call (Shift-click for a range from the last one ticked, or press x on a focused call) and a bar above the list sums them up in one line: "3 calls · total 1,835 ms · span 36,240 ms · avg 612 ms · slowest Name 1,240 ms · 1 failed". "Total" is the time the calls added up to; "span" is the clock time from the first start to the last end (calls overlap). The slowest call's name is a button that selects it. Under the line a thin bar has one segment per ticked request, as wide as it took and coloured by kind (a key names the kinds when there are several); hover a segment for its name, time and share, click it to select the call, or tab to it. Failed requests have a red line under them. The boxes show when the pointer or focus is on a row, on ticked rows, and on every row once any is ticked; the box in the header ticks or clears every visible call, and Select for total time / Unselect in the row menu does the same for one. Ticks follow the call, not the row, so they survive new calls and filters; Clear list, a reload with Clear on reload on, and the 500-call cap drop them. Export writes the ticked calls, or the visible ones when none is ticked, with the URL, whether the call failed and why, and the request it travelled in. Copy summary copies the line as text. Calls that travelled in one request share its time, so the bar adds each request up once ("4 calls in 2 requests"). Times follow the Time format below.

<a id="actions-tab-badge"></a>

### Tab badge

The number on the Calls tab is grey and counts the calls in view while nothing failed. It turns red and counts the failed calls as soon as any failed, so a failure is visible from the other tabs, and its tooltip says which it is ("2 failed calls of 12 captured", "12 calls in view"). A filter in the filter box (slow: too) or Failed only does not hide a failure from the badge or turn it off: it counts every call the list may show, which is OmniStudio's calls unless All Apex calls is ticked, and shows 0 in grey while a filter hides all of them. It is absent only while nothing is captured.

<a id="actions-copy-as-apex"></a>

### Copy as Apex

On an Integration Procedure or Data Mapper call, the detail pane has a Copy as Apex button (the \</\> icon, last of the head buttons after Show in Structure and Copy input, because it is used the least; in a narrow pane, under 480 px, Copy input and it are one Copy ▾ menu in the same order, and Show in Structure keeps its words). It copies an anonymous Apex snippet for the Developer Console that runs the call again: the input (and, for a procedure, the options) as JSON strings, then IntegrationProcedureService.runIntegrationService(key, input, options), or for a Data Mapper DRGlobal.process(input, bundle), whose DRProcessResult is printed through result.toJson(). The namespace is taken from the call: omnistudio for the core package, vlocity\_cmt, vlocity\_ins or vlocity\_ps for the managed packages, defaulting to omnistudio; both methods exist in each. Method signatures differ between versions, so treat the snippet as a starting point. Mask values replaces strings and numbers in what is copied.

<a id="actions-test-calls"></a>

### Test calls

The Calls tab can send a call you compose, to the org of the page, as your user, through the page's own session: nothing else in the panel sends anything. It is off until you turn on Allow test calls under Sending in Settings (the first time, press I understand next to its notice), and it is off again at every DevTools start, even with Remember my settings on. With it off the only trace is a greyed row-menu item, "Re-run… (turn on Allow test calls in Settings)"; while a bundle is open the controls below are out of use ("Not available while a bundle is open"), and so are they while Recording is paused ("Recording is paused": the answer could not be listed).

- Re-run… (the button after Copy as Apex in a call's detail head, or in its row menu) opens the form with that call's input and options. Re-run as it was… (row menu) asks "Send Account\_Fetch again as it was?" in a toast with a Send button (it goes after 8 s); only that Send sends the call again, unchanged, and it is asked every time. New test call… (the … menu, or a toolbar button while Advanced is on) starts from the latest Integration Procedure or Data Mapper call and asks for a name. Put "isDebug": true in the Options box of an Integration Procedure re-run to get its debug run on a Debug tab without the designer (see Debug tab); the answer is bigger and slower, and the call still runs for real.
- An Integration Procedure or a Data Mapper Load can create or change records in your org. Nothing is sent until you press Send (Ctrl/Cmd+Enter) or the Send of the Re-run as it was… question; the panel never sends by itself, and a press sends one call, however often you press.
- What goes out is the last request of that kind the page made (its Aura, LWR or REST request; a re-run needs one of its own kind), with your edits to the input and options, one call in it, and a header that marks it as a test call. It goes to the origin of the selected script's own frame and nowhere else, through that page's session. The answer is listed at once as a row with a test tag, and, for a re-run, a re-run tag whose tooltip names the time of the original (click it to select that call); Took is the time the page measured for the request itself. Re-run as it was… selects the new row and says "Listed: HTTP 200, 640 ms"; when a filter keeps the row out of the list, the list says "The call you sent is listed but hidden by Failed only" with Show all, which clears every filter. An answer over 2 MB is listed with no body and the chip "answer cut at 2 MB" (the Network tab has all of it, and when the network stream hands the panel the whole answer it replaces that row). Compare with original, in the detail head, shows what changed. Nothing of the answer is written into the script's data or the page's elements: its text waits in one variable of the page until the panel has read it, at most a minute, and is deleted then (also when the panel gives up waiting).
- Mask values cannot apply to what you send (the form says so); copies and exports of the result stay masked.
- Needs a call to copy from: if no OmniStudio call was captured on this page yet, run a step of the script first.

<a id="actions-re-run"></a>

### Re-run

The Test call form (opened from Re-run… or New test call…) shows, from the top: the kind and name of the call and, for a re-run, "re-run of 10:42:03", with the reminder that it runs in your org as your user and can change records; the name (an Integration Procedure's Type\_SubType key, or a Data Mapper bundle) when it has one; Input, a JSON box with its parse error and position under it (Send waits until it is valid), with Format, From the data… and From a call… (takes the input of another captured call of the same kind, this one's own included). From the data… opens a picker under the bar: the nodes of the data JSON, Whole data JSON first, each with its OmniScript path and its size ("12 keys", "3 items" or a short look at the value; Mask values masks the previews), and a filter box that matches paths and values. Tick the nodes the call reads, and each shows an as field with the key it will have in the input: its own key, or for a re-run the input key that holds the same value ("sent as AccountDetails"); a dotted name such as Context.Account nests the node. Add to input (Ctrl/Cmd+Enter) merges the ticked nodes into the JSON in the box, Replace input makes the box hold them alone, and two nodes with one name wait until one is renamed. Esc or Close puts the picker away, and the names you gave a procedure come back ticked the next time you open the picker for it while DevTools is open; Options, folded, "Options (3 keys)", checked the same way (a REST call sends only the input, and the fold says "not sent"); Request, folded: the class, method, namespace and endpoint of the request, copied from a captured call, editable to correct a wrong guess. A REST call's endpoint follows the name until you edit the Endpoint field. For a New test call with no call of that kind captured yet the class and method are a guess from the package's namespace, and the fold says so and starts open. Send (Ctrl/Cmd+Enter) sends; Send and Close stay at the foot of the form. Close at the bottom, the ✕ in the form's corner, or Esc closes the form: it does not cancel a call already sent, which still lands in the list, and what you typed is kept for that call until DevTools closes, so Re-run… on it brings your edits back. After Send the form says "Sent · waiting for the answer…" and closes onto the row when the answer is listed. If there is none after 60 s it says "No answer after 60 s; the call may still be running on the server. The row will appear if it answers.", and Send stays out of use until you edit the call or close the form. Choosing another call in the list also closes the form. A designer preview (see Debug tab) is re-run the same way: the form is titled "Debug run of" and the name, has no Request fold and sends the designer's own remoting call with your input; the answer opens on its Debug tab.

<a id="actions-debug-tab"></a>

### Debug tab

The Integration Procedure and Data Mapper (DataRaptor) designers have a Preview that runs the procedure or the Data Mapper with debug information, over Visualforce remoting. With the designer open in the inspected tab and Recording on, a preview is listed as an IP or DR call (named after the Data Mapper; an Integration Procedure preview is named "IP preview · " and its record Id, because the request carries only the Id, so previews of different procedures can be told apart and found by Id) and counts as an OmniStudio call, so it shows without All Apex calls. An Integration Procedure that a page calls with isDebug: true in its options answers with the same run, and its call opens on the Debug tab too, named after the procedure as any other call (a REST call carries no options, so it cannot ask for one; see Test calls to ask for one yourself). A debug run opens on a Debug tab, first in the strip, whatever tab you picked on other calls: one line with the outcome (Succeeded or Failed, the same verdict as the call's Result; an answer with nothing of a debug run in it says "No debug information in the answer"), the total and CPU time and, for an Integration Procedure, the number of steps, for a Data Mapper the interface type and the response type; for an Integration Procedure a table of its steps in run order with the element, its type, status, time, CPU time and a bar for its share of the slowest step (click a step's number to open its input, options and output as trees in place, or its name to go to the element's own view; what you opened stays open; a status with "warning" in it is shown as a note, not a failure; an element that did not run, such as one behind a conditional block whose condition was false, reads Skipped in grey with no time and no bar and is never the slowest), then the Response (open) and the Original input (closed); for a Data Mapper its Output, and Errors and Created objects when there are any; and the debug log, one line each with its offset from the first line (hover for the full time), query lines in monospace with a Copy that copies the SOQL. A log of more than 30 lines starts folded, with its count. A View picker at the top chooses what the tab shows: the Overview (all of the above), the Full data JSON (the whole run as one tree, its root named after where the answer holds it, fullDataJson or IPResult, laid out as pretty-printed JSON with its own line numbers; the Raw view shows the answer as the page sent it, so its lines are not the same), the Response, the Original input, the Debug log, or one element of an Integration Procedure in run order. A Data Mapper has its Output, Errors and Created objects when there are any, the Debug log and the Full response. An option is offered only when the answer has that part (an empty Response or a null Original input has no option), and the choice is kept for each call; an element that left nothing says so. An element's view is one tree with four roots, input, options, output and debug (the rest of its block); click an element's name in the steps table to go there, or its number to open it in place. In the steps table a failed step is shaded and its status is said as failed to a screen reader, the slowest step has a slowest tag beside its time, and Copy as table copies the steps in view (number, element, type, status, elapsed, CPU) as a Markdown table that holds no value of the run: the filter box narrows its rows, and its toast says "N of M rows"; with Mask values on a type or status stays only when it is one of the usual words (Succeeded, Failed, Skipped, Set Values, HTTP Action and the like), anything else shows as a placeholder. The Debug log view shows every line at full height under one line of totals (lines, queries, the time in queries and the time in the server), with Queries, Timing and Info chips that show only those lines (press more than one to add them, press again to undo; a chip is there only while the log has such lines); query lines keep their Copy. The head line of an Integration Procedure also gives the number of queries and the time they took. The filter box narrows the view shown (the steps by name, type or status, the log by its text, a tree by its keys and values), Expand all and Collapse all act on the trees that are open, and Copy copies the view shown (on the Overview the run: steps, response and log as JSON; on the log the lines in view, one per line), masked while Mask values is on; a view with nothing to copy says so. Two debug runs of one kind compared in the Compare tab get their steps side by side above the rest: one row per element in the first run's order, with its status and time in each run, the difference (after minus before, tagged slower or faster from 20% and 10 ms), the CPU difference (hidden on a narrow pane) and a totals row, under a line saying which run is before (the baseline) and which is after, with their start times; a dash marks the side of an element that did not run in one of them, and an element skipped in one run and run in the other is tagged ran or skipped. The heading counts the steps that differ by their status or a tagged time, says when the order changed or only the total differs, and the table scrolls sideways as a region you can reach with the keyboard. Under it, two Integration Procedure runs compare their Original input and Response (from the runs, not the whole answers, whose logs differ in every time) and the Options, each Side by side (see Side by side); two Data Mapper runs compare their Input, Options and Output. With Mask values on, the log keeps only lines of a known kind (queries, counts and times), with the literals and Ids in a query hidden; any other line shows as its kind and a placeholder, and the copy and the export mask the values as the trees do; counts, times, names and statuses stay, and a saved debug bundle still loads into a Debug tab with the steps and times, the values shown as placeholders. A run with a failed step or a reported error is marked as failed in the list. Re-run… and Re-run as it was… of a designer preview need Allow test calls (see Test calls) and the designer's own page in the inspected tab, because the remoting context (csrf, vid and authorization) is issued to that page (when the designer is a frame, pick that frame in the top bar first: Show the Frame row): from a running OmniScript the panel cannot send a designer preview, and New test call… does not offer one. An Integration Procedure called with isDebug is re-run as any other call, with its options as you leave them, so the new answer is a debug run again.

<a id="actions-copy-input"></a>

### Copy input

Every call has a Copy input button (the \{ \} icon) in the detail pane: the bare input as JSON, ready to paste into a test or another tool. Mask values applies.

<a id="actions-raw-view"></a>

### Raw view

Right-click a call and choose Show raw (after Copy input) to see what went over the wire, in the detail pane: the request as the page sent it (the Aura action, or the LWR, REST or Visualforce body) and the answer as it came back, each as numbered, wrapped text with its own Copy button. JSON is laid out for reading; the answer is kept only up to 20 KB, and when it was longer the view says "Cut at 20 KB"; a call loaded from a debug bundle says "Not kept". Fields that look like a credential (a token, csrf value, authorization, session, cookie or API key, in the request and in the answer) are shown as \<hidden\> and counted in a note, with Mask values on or off, and Mask values replaces every other value in what is shown and copied; text that is not JSON cannot be masked, so it is not shown while Mask values is on (an Aura error answer is laid out like any JSON; an answer cut at 20 KB cannot be masked). Back, or Esc (also from the list), returns to the call's detail; choosing another call does too. A chain's row has no row menu and no request of its own: open one of its calls, then right-click it.

<a id="actions-trees-in-the-call-detail"></a>

### Trees in the call detail

Right-click a row of the Input, Options or Output tree to copy its value, key, OmniScript path or %merge% field, or to open or close the branch; copied values honour Mask values. A section the page sent as JSON inside a string is decoded, and one that is plain text says so instead of showing a tree. Expand all and Collapse all appear only where there is a tree, and Copy only where there is something to copy.

<a id="actions-changes"></a>

### Changes

The detail pane's Changes tab shows how the script's data JSON changed because of the call: the last data JSON read before the call ended, against the first one read within 5 s after it. It works from any tab, because the panel keeps the recent data JSON reads as long as DevTools shows it. If nothing was read in those 5 s, the tab says that, and says so plainly when the panel was not reading the data JSON at the time. When the read before the call is more than 30 s older than its end, the tab warns that part of the change may have happened earlier. The two reads are set Side by side (see Side by side), Before: read at 10:44:30, before this call ended against After: read at 10:44:32, 0.1 s after it, under the sentence that says when they were read. Copy copies the differences and honours Mask values.

<a id="actions-show-in-structure"></a>

### Show in Structure

When an element of the script makes this call, the detail pane offers a button that selects it in the Structure tab. Structure's Calls tab lists the calls for the element it shows.

<a id="actions-naming"></a>

### Naming

Data Mappers and Integration Procedures are named by their bundle or key rather than the integration class they share.

<a id="actions-batched-calls"></a>

### Batched calls

One HTTP request can carry several actions. Each gets its own row, with its own input and output. They share the request's time: each row carries a small ×3 tag (its tooltip says "One request shared by 3 actions: the time is the whole request's"), the Took cell holds only the time, and the selection bar counts it once. A list under 760 px shows up to three short tags (about 20 characters in all), then a +N whose tooltip names the rest; when it is too narrow for the tags (under 560 px) the ×3 follows the time instead.

<a id="actions-repeated-calls"></a>

### Repeated calls

A call to the same procedure or method with the same input and options as an earlier call, started within 5 s of it, carries an amber "repeat ×2" tag (×3 for the third, and so on). Its tooltip names the time of the first call. A double-fired action or a re-render loop in a script usually causes this. The tab badge's tooltip adds "· 3 repeated", and repeat: in the filter box keeps only the repeated calls and the ones they repeat. The calls of one chained procedure are never repeats of each other. When a repeat sent byte-identical input (same keys in the same order) and the call just before it succeeded, the first lines of its detail pane add a muted "Same input as the call at 10:42:03 (Succeeded)"; click it to select that call. After a failure no such line shows, because sending the same input again is then a retry.

<a id="actions-oversized-input"></a>

### Oversized input

A call whose input is 100 KB or more (compact JSON, the options not counted) carries an amber "Input 1.2 MB" tag in the detail pane's first lines; from 1 MB it turns red. Hover it: a Data Mapper or procedure usually needs only a few keys, and sendJSONPath / sendJSONNode on the action limit what is sent. The Input tab starts with "12 keys · 3.4 KB" and, for a large input, "Largest: Account 80%, Items 15%, …": the five top-level keys that hold most of it, each a link that opens that key in the tree. When ticked calls include large ones, the selection bar ends with "2 calls over 100 KB of input". The list rows carry no chip, to stay calm. The size is measured in the panel from what the page sent; nothing is read or sent elsewhere.

<a id="actions-chained-procedures"></a>

### Chained procedures

A chainable Integration Procedure runs as several calls: the first carries the chainable (or queueableChainable) option, its answer often says the chain goes on, and the page calls the same procedure again shortly after. Those calls are one row, "⛓ Name" with the tag "chain · 3 calls" (its tooltip: one chainable procedure that ran as 3 calls; the time is the sum) and the time of all of them, and the result of the last call (red when any call failed). The chevron, or the Right and Left arrow keys, open and close its calls under it, each named "call 1 of 3", "call 2 of 3" and so on, with its time where the Started column is gone, and without the chain tag. A call that only asks to be chainable (outside a chain, or one that could not be joined) carries the small tag chainable, or queueable chain for queueableChainable; "chain · 3 calls" is only for the group. Open one of its calls and the detail head says "call 2 of 3 in a chain", a link that selects the chain. Select the row to see the first call's Input and the last call's Output; its Calls tab says "This procedure ran as 3 calls in a chain", adds "the server answered 'continue' after each but the last" only when the answers did say so (a chain found by the chainable option and a shared input or token says that instead), and lists every call with its time, duration and result, and a click opens that call. "stopped early" means the last answer said the chain goes on and nothing followed within 30 s. The box on a chain ticks all its calls, and the summary bar counts calls. Filters apply to the calls, so a chain shows while any call matches. Export writes the calls with a chainId. Calls are joined when they go to the same procedure and the earlier answer says the chain goes on (the next call starts within 30 s), or the answer says nothing and the earlier call was chainable (the next call starts within 5 s). A call that started before the earlier one ended is never part of the chain, and calls to other places in between do not break a chain. Which answers say "goes on" is a best guess (vlcStatus such as InProgress or Queued, or a continuation id); an answer in another shape falls back to the option flag, so a real chain may show as separate rows.

<a id="actions-opened-bundle"></a>

### Opened bundle

Open bundle…, in the Tools row of Settings (the gear), loads a debug bundle, and its calls take the list's place, with the same filters, details, comparison, chains and export. The bar under the top bar says "Bundle: \<file\> · saved \<time\> · read-only", and the status bar of this tab says "Bundle: \<file\>" with the count of calls and, on the right, Not capturing. Nothing the page does is captured meanwhile (the Recording button shows Paused and is out of use), and Clear list is out of use. Back to live brings the live calls back as they were, with your selection, ticks, open chains and Recording choice. A bundle keeps each call's input, options, output and verdict, but not the response size, the timing breakdown or the raw text of an unreadable answer, so those are blank. A bundle saved with Mask values on holds placeholders, not values.

<a id="actions-http-vs-result"></a>

### HTTP vs Result

The Result, the last column of the list (after Took), is what the answer says, drawn as a glyph at every width: ✓ green for succeeded, ✕ red for failed, – grey when nothing useful came back. Hover it for the word (Succeeded, Failed, No response, No body) and the HTTP status, which is the transport. A 200 with Failed means Apex returned an error inside a successful response — hover for which rule fired; the detail line then says "HTTP 200 · Failed", and Aura's own state word is in the Raw view. The glyph is a second cue besides the colour. A call counts as failed, too, when no response came back (No response, in grey: aborted or offline), when the response is not JSON or an Aura system error, or when the session expired (client out of sync). A 2xx with an empty body shows No body in grey and is not counted as failed: DevTools hands back an empty body when it no longer holds the content. The Output tab then shows the raw text that came back, unless Mask values is on.

<a id="actions-started-took"></a>

### Started / Took

Started is the clock time the request left the browser; Took is the round trip (in milliseconds unless Time format says otherwise), left blank when the browser could not measure it; the Result mark follows it as the last column. Hover Took for where the time went: the round trip, the server's share (waiting for the first byte plus download) and the time before the request was away (blocked, DNS, connect, send). A call that took at least as long as the Slow call threshold in Settings (2 s when it is 0) also says it in words in its detail pane, under the first line: "Waited 1,840 ms for the server, received in 20 ms", written in the Time format. It is left out for a fast call, for a chain, and for a call loaded from a file, which keeps no timings.

<a id="actions-step"></a>

### Step

The OmniScript step the script was on when a call started is in the call's tooltip and the first line of its detail pane, and step:text in the filter box keeps the calls made on a matching step. It is known only while Structure has been following the script.

<a id="actions-all-apex-calls"></a>

### All Apex calls

A box in the toolbar, right after the filter box, and the same switch in Settings (the gear), under Calls; off by default, so the list shows only OmniStudio's calls (Data Mappers, Integration Procedures and OmniStudio Apex). Tick it to see every Apex call the page makes. The status bar says "all Apex calls" while it is on, so a changed choice is never in force unseen (the default goes unsaid). When the filters leave no call to show, the list says "No calls match…" with Clear filter, which drops every filter while DevTools is open (Settings keeps what you chose). Copy report and the debug bundle follow it: with All Apex calls off they list only OmniStudio's calls.

<a id="actions-recording-paused"></a>

### Recording / Paused

A toggle, named for the state it is in. While the panel captures calls it reads Recording with a red dot and is pressed in; click it to stop capturing, and it reads Paused with a pause icon. Calls made meanwhile are not captured, and an empty list says so; click it again to capture again. A test call you send is never left out, but sending is out of use while paused. Its tooltip says what a click does ("Capturing calls. Click to pause." or "Not capturing. Click to resume."), and so does the status bar (Recording or Paused). It is out of use while a debug bundle is loaded.

<a id="actions-failed-calls"></a>

### Failed calls

A call the row marks as failed opens on its Output tab, where the reason is, and its failure banner shows up to three lines before Show more. A tab you chose yourself stays chosen as you move between calls.

<a id="actions-row-menu"></a>

### Row menu

Right-click a call for Copy name, Copy input (honours Mask values), Show raw (see Raw view), Re-run… and Re-run as it was… (see Test calls), Compare with previous, Set as baseline (Clear baseline on the baseline) and Select for total time / Unselect for the summary bar. The call the menu is open for is outlined while it is open.

<a id="actions-empty-list"></a>

### Empty list

Calls are captured only while DevTools is open. Use Reload page to capture from the start to catch what the page does while loading. While capture is paused the list says so.

<a id="actions-mask-values"></a>

### Mask values

With the top bar's Mask values on, Export, Show raw, the comparisons, the failure text and the in: hit lines replace strings and numbers with placeholders, as the trees do. Mask values at start in Settings turns it on every time the panel opens. The raw text of an undecodable response is hidden. A Data Mapper name that was read from the call's input (not from its options) counts as a value and is masked too, in Copy name, Copy report, Export and Copy as Apex.

<a id="actions-clear-list"></a>

### Clear list

Removes every captured call from the list at once; a new list starts as the page makes more calls. It does not touch the settings. It is out of use while a bundle is open. Clear on reload does the same on every page load.

<a id="actions-clear-on-reload"></a>

### Clear on reload

In Settings (the gear), under Calls; off by default, so the captured calls are kept across page loads. Tick it to start a new list on every reload; the status bar says "clears on reload" while it is on. Export writes the ticked calls (or, with none ticked, the visible ones) to a JSON file. The list keeps the last 500 calls, and at most 200 of them that are not OmniStudio's, which go first, so a busy page cannot push the script's own calls out; when older OmniStudio calls are dropped the status bar says so.

<a id="actions-rest-calls"></a>

### REST calls

POST calls to an Integration Procedure's REST endpoint (/services/apexrest/…/integrationprocedure/Type\_SubType) are listed as Integration Procedures, named by the key in the URL.

<a id="actions-resizing"></a>

### Resizing

Drag the divider between the list and the detail pane to rebalance them, side by side or stacked. Double-click it to reset.

<a id="everywhere"></a>

## Everywhere

The top bar, Advanced, settings, the debug bundle and the rest of the shell. It is the same on every tab.

<a id="everywhere-no-omniscript-found"></a>

### No OmniScript found

Nothing is listed in the top bar. Work down these three steps.

- Step 1: open a page that is running an OmniScript (a preview or a published one) and let it finish loading.
- Step 2: press Rescan, or reload the page with DevTools open. The panel also looks again every few seconds.
- Step 3, if there is still nothing: the script may sit inside an iframe, so tick Show the Frame row in Settings, under Reading, and check the Frame picker; or it may keep its data on another property, so change the Data property in Settings under Reading (click the field to list what the script exposes). Every frame, document and open shadow root is searched; closed shadow roots cannot be read.

<a id="everywhere-theme"></a>

### Theme

Follows the DevTools theme (light or dark), including when you change it while the panel is open.

<a id="everywhere-advanced"></a>

### Advanced

The Advanced switch in the top bar shows the less common controls. Turning it off puts them back to their defaults.

- Top bar: nothing; the second row with Frame, Embedded scripts and Inspect element follows Show the Frame row in Settings, under Reading, where the Data property and Definition property are too.
- Calls: Failed only.
- Structure: Collapse done steps, Highlight on hover, Visible only, Timeline, Compare definition, the Time on this step line, and the Depends on / Used by / Written by line.
- Turning it off switches those filters and options back off, but keeps the two property names in Settings (the gear shows a count while one is not the default).
- Not under Advanced: Track changes, Compare data and the Changes view. The switch itself stays as it is.

<a id="everywhere-help-for-a-control"></a>

### Help for a control

Right-click a button or switch in the top bar or in the toolbar of any tab (Rescan, Mask values, Advanced, Refresh, Auto-refresh, Track changes, the views, Expand all, Follow current step, Recording and so on) and choose Help: \<name\>, or press ? while it has focus: this help opens showing only that control's entry, with its name in the filter box. Type in the box, or clear it, to see the rest. Text fields keep the browser's own right-click menu.

<a id="everywhere-searching-this-help"></a>

### Searching this help

The box at the top of this help narrows every section, and the shortcut table, to the entries that contain all the words you type, in any order. It has focus when the help opens; Esc still closes the help. Clear it to see everything again.

<a id="everywhere-tab-order"></a>

### Tab order

Drag a tab to another place in the strip, or press Alt+Shift+← / → on a focused tab. The order is kept between DevTools sessions (in extension storage); Restore default settings, or Reset next to Tab order in Settings, puts it back. The 1–3 keys follow the order shown.

<a id="everywhere-focus-mode"></a>

### Focus mode

On Structure and Calls, Ctrl+\\ (Cmd+\\ on a Mac), or the small grip that appears on the divider between the list and the detail, hides the list so the detail takes the full width; the divider stays as a thin strip with the grip. The grip, Ctrl+\\ again, a double-click on the strip, or Esc while the detail has the focus brings the list back at the width it had. Each tab keeps its own state while the panel is open; nothing is stored.

<a id="everywhere-tour"></a>

### Tour

The first time the panel opens in this browser, a small card walks through four things in turn: the OmniScript picker, the tab strip, the filter box of the tab on screen and the Settings gear, which sits just before the ? button. Next and Back move between the tips, Skip or Esc closes it, and the dots show where you are. Nothing is dimmed, and the panel stays usable meanwhile.

- Each tab also has a short tour of its own, three tips at most, shown the first time you open that tab: each tip rings a real control and says what to do with it. A tab tour never starts while another tour or a dialog is open, and never in the same DevTools window as another tour, so the first one appears the next time DevTools opens, one tab each time it opens.
- Every card has a Don't show tours link that stops all of them; Esc skips only the tour on screen.
- Show the tour again, at the end of Start here in this help, clears all of that and starts the panel tour again.
- The only thing kept is which tours were seen: four yes-or-no flags (tourSeen, tourSeenData, tourSeenStructure and tourSeenActions) in this browser's extension storage, whether or not Remember my settings is on. Nothing is sent anywhere.

<a id="everywhere-profiles"></a>

### Profiles

Profile, at the top of Settings (the gear in the top bar), puts a bundle of settings in force in one click; changing any of them afterwards makes the switch read Custom, which is shown but is not a choice. Simple: Advanced off, Track changes off, Refresh rate normal, Follow current step on, Failed only off, Time format seconds and minutes, Text size M. Standard (the defaults): Advanced off, Track changes off, Refresh rate normal, Follow current step on, Collapse done steps off, Visible only off, Failed only off, Slow call threshold off, Time format ms, Text size M. Expert: Advanced on, Track changes on, Refresh rate fast, Follow current step on, Collapse done steps off, Visible only off, Failed only off, Slow call threshold 500, Time format ms. A profile sets only what it lists; for example Expert leaves Text size as it is. Simple is Standard with durations written in seconds and minutes (Time format); the switch for Advanced is put in force by a profile but not compared, so Standard reads Standard whether Advanced is on or off. The profile is a setting: kept only with Remember my settings, and Restore default settings puts it back to Standard (the Advanced switch is kept).

<a id="everywhere-text-size"></a>

### Text size

Text size, in Settings (the gear in the top bar, under General), is a switch of four steps: S (90%), M (the default), L (112%) and XL (125%). It scales the text and controls of every tab at once. Ctrl+= (or Ctrl++) makes it larger, Ctrl+- smaller and Ctrl+0 puts it back to M (Cmd on a Mac), whatever has the focus in the panel; DevTools keeps its own shortcuts outside it. The size is a setting: it is kept only with Remember my settings, is listed under Settings that differ when it is not M, and Restore default settings puts it back.

<a id="everywhere-settings"></a>

### Settings

The gear in the top bar, just before the ? (or the , key), opens the settings. A small count on the gear shows how many settings differ from their defaults. Settings last until DevTools is closed, and nothing is stored in the browser apart from the tab order, the flags that the tours were seen and the Mask values at start flag, unless you tick Remember my settings (off by default).

- General: Profile and Text size (see Profiles and Text size), Mask values at start (kept in this browser even with Remember my settings off; turning it off deletes it) and Remember my settings (see their entries). Remember my settings, ticked, keeps the settings listed under Settings that differ, and the views you last chose, in this browser's extension storage, on this computer, and puts them back the next time DevTools opens; unticking it deletes them.
- Reading: Data property and Definition property, the element properties the Data and Structure tabs read (jsonDataStr and jsonDef by default); see their entries. Show the Frame row shows the top bar's second row (Frame, Embedded scripts, Inspect element), with Advanced on or off; off by default. Refresh rate sets how often the Data tab reads (see its entry).
- Calls: All Apex calls (also a box in the tab's toolbar), Clear on reload, Time format and Slow call threshold, which used to be in the tab's Advanced row; All Apex calls is also kept in the toolbar (see the Calls entries). Slow calls are kept by slow: in the tab's filter box.
- Sending: Allow test calls lets Calls send a call you compose to the org of the page (see Test calls). "Test calls run in your org as your user, through the page's own session. An Integration Procedure or a Data Mapper Load can create or change records." The first time, the switch stays off until you press I understand next to that sentence. Off by default, and never kept: it starts off every time DevTools opens.
- Open in Designer: Auto, Builder (core) or Designer (managed) with a namespace; see the Open in Designer entry.
- Settings that differ lists every setting that differs from its default, with its current and default value; Reset puts one back, live. When none differs it says everything is at its default.
- Restore default settings (it asks to confirm) puts all of them back without reloading DevTools: Tree view, the views you last chose, jsonDataStr and jsonDef, Track changes off, Follow current step on, Collapse done steps, Highlight on hover and Visible only off, Embedded scripts off, Clear on reload off, All Apex calls off, Failed only off, Slow call threshold 0 (2000 ms), Time format ms, Open in Designer Auto, Text size M, Profile Standard, Auto-refresh on, Refresh rate Normal, Mask values at start off, Allow test calls off and Mask values off.
- It also puts the tabs back in their default order, and keeps the Advanced switch (not listed: it only chooses which controls are shown), Remember my settings, captured calls, the history of earlier reads, the watch list and filter text.
- Tools: Save a debug bundle, Open bundle…, Compare JSON… and Copy report (see their entries). Compare JSON… compares two JSON texts you paste, side by side.

<a id="everywhere-mask-values"></a>

### Mask values

The Mask values box in the top bar (it reads just Mask in a narrow panel). While it is on, everything that leaves the panel has its strings and numbers replaced with placeholders: Copy JSON, Save file, the per-row copy buttons, the Structure value copy, the Calls export, Copy report and the debug bundle. The watch strip, the watch toasts and the lineage view are masked on screen too. Structure and keys are kept, and the status bar says "Masking copies and exports" while it is on. In the script's definition, which the debug bundle and Structure's Definition JSON export carry, the answers it holds (the response and defaultValue entries) are masked and every key, name and rule is kept; a definition that is not valid JSON is left out of the bundle. Off when DevTools opens unless Mask values at start is ticked in Settings (General), and the switch itself is never remembered.

<a id="everywhere-mask-values-at-start"></a>

### Mask values at start

In Settings (the gear), under General. Off by default. Ticked, the Mask values switch is turned on each time DevTools opens, so nothing leaves the panel unmasked until you turn the switch off yourself; the switch can still be turned off while DevTools is open. Kept in this browser even with Remember my settings off; turning it off deletes it. It is the one setting kept that way, as a yes-or-no flag like the tour flags: the switch itself is never stored. While it is on, Settings that differ lists it, and Restore default settings turns it off.

<a id="everywhere-refresh-rate"></a>

### Refresh rate

In Settings (the gear), under Reading. How often the Data tab re-reads the script while Auto-refresh is on: Fast (about twice a second, easing to every 2 seconds while nothing changes), Normal (the default: about once a second, easing to every 4 seconds) or Gentle (about every 3 seconds, easing to every 8 seconds), for a busy page. Touching the panel or a change in the data brings the quick pace back. The Structure and Calls tabs are not affected. Expert sets Fast; Simple and Standard use Normal.

<a id="everywhere-remember-my-settings"></a>

### Remember my settings

In Settings (the gear), under General. Off by default. Ticked, the settings are kept in this browser's extension storage, on this computer, and put back the next time DevTools opens; unticking it deletes them. Kept: the settings listed in the dialog, the views you last chose (Data: Tree, Form or Raw, never Sizes or Changes; Structure: the Current value view, the detail tab you picked by hand and Show internal; Calls: the Input, Output or Options tab you picked by hand) and the watch list, per script (paths and expressions, never values). Never kept: data, filter text, captured calls, the history of earlier reads, Mask values, Auto-refresh and Allow test calls. Mask values at start is kept on its own, with Remember my settings on or off (see its entry). What is remembered never leaves this computer.

<a id="everywhere-top-bar"></a>

### Top bar

The OmniScript and Frame pickers apply to every tab. The Frame picker, with Embedded scripts and Inspect element, is in the second row, shown only while Show the Frame row is ticked in Settings, under Reading, with Advanced on or off. Scripts are listed by Type/SubType/Language when their definition says (hover for the element), otherwise by element. Frame filters the list to one document; All frames searches everything. Rescan (the two-arrows button) looks for scripts and frames again. Mask values applies to everything that leaves the panel.

<a id="everywhere-show-the-frame-row"></a>

### Show the Frame row

In Settings (the gear), under Reading. Off by default. Ticked, the top bar keeps its second row, with the Frame picker, Embedded scripts and Inspect element, on screen whether Advanced is on or off; unticked, the row is hidden and Embedded scripts and Frame go back to off and All frames, because a filter you cannot see should not stay in force. Use it when you work across frames or embedded scripts. It is one of the settings the count on the gear shows when it is on; Remember my settings keeps it, and Restore default settings puts it back.

<a id="everywhere-embedded-scripts"></a>

### Embedded scripts

In the top bar's second row, shown with Show the Frame row in Settings; it is in force only while that row shows (hiding the row puts it back to off). An OmniScript placed inside another one, and the components inside a script that carry its data, read the same properties as the script around them, so a 40-element script has 40 of them, and several of them can carry the whole definition. Unless you tick this, each script is listed once (by the element holding the most data) and embedded ones are left out; ticked, every one is listed, with its element name when several share a Type/SubType/Language. A row reads "embedded" for an OmniScript inside another one and "component" for a component of a script. The Data status line says "N embedded scripts hidden" only for real embedded OmniScripts; the other components that are left out are counted in its tooltip ("N other components of a listed script hidden").

<a id="everywhere-debug-bundle"></a>

### Debug bundle

Save a debug bundle, in the Tools row of Settings (the gear), saves everything the panel shows as one JSON file, omniscript-debug-\<time\>.json, for a bug report or to send to the developer: the extension version, whether Advanced and Mask values are on, the size and theme of the panel, every setting, the selected script and the step it is on, the data (read from the page when you press the button, with the time it was read), the last 12 reads of it (time, step and size, with the values), the script's definition as the page holds it (its structure, names and settings, the same text Structure reads) with the number of elements and the names of the steps, the last 50 captured calls, and what each tab is showing (view, filter, selection, counts and the biggest values). Mask values applies to the org data in it: the data, calls and filter text, and the answers in the definition (its response and defaultValue entries). Keys, element and step names, rules and settings are kept, and so is the rest of the definition's text, such as labels and Set Values: look at the file before you share it. Data that is not valid JSON is included as raw text, or left out while masking (in the history only its length is given). Nothing is sent anywhere; the file is saved on your computer.

<a id="everywhere-copy-report"></a>

### Copy report

Copy report, in the Tools row of Settings (the gear), puts a few lines of Markdown on the clipboard, for a ticket or a chat: the script (Type/SubType/Language), the extension version, the step it is on, the size of the data, the number of Problems, what may stop Next on that step (the Validation list, best effort) and the last 5 failed calls with their reasons and times. A line whose fact is not known is left out. Mask values applies to the values a failed call's reason quotes; names and counts are kept. Nothing is sent anywhere.

<a id="everywhere-open-bundle"></a>

### Open bundle

Open bundle…, in the Tools row of Settings (the gear), reads a debug bundle from a file and shows its script as it was when it was saved, in place of the page: the top bar lists one entry, "\<script\> (loaded from \<file\>)", the Data tab shows the data and its history, Structure the definition and the step it was on, and Calls the calls. A bar under the top bar says "Bundle: \<file\> · saved \<time\> · read-only", with Back to live. Meanwhile nothing is read from the page: Refresh, Auto-refresh and Rescan are out of use, and a change on the page is not picked up. Back to live puts the page, its history and the picker back. A bundle saved with Mask values on shows placeholders. A bundle from an earlier version may lack the definition, so Structure is then empty. The file is read here and kept in memory only; nothing is sent anywhere.

<a id="everywhere-compare-json"></a>

### Compare JSON

Compare JSON, the button at the far right of the tab strip (also Ctrl/Cmd+Shift+L from anywhere in the panel, and Compare JSON… in the Tools row of Settings), opens a dialog the size of the panel with two boxes, Before and After, for any two JSON texts. Mask values, in the dialog's header, is the panel's own switch shown a second time: ticking either ticks both, and it hides the values in the comparison and in every copy, while what you paste is kept as typed (a note by the boxes says so while it is on).

- Views: each box has Text, Tree and Form. Text is the box you type in. Tree is the value as in Data, with its filter, Expand all and Collapse all. Form is a label and a read-only field for each key, lists opening in place. Tree and Form are greyed (Fix the JSON first) while the text does not parse, and Form needs an object or a list. The choice is kept for each box while DevTools is open.
- Tools, in the box's header row: Paste reads the clipboard (when the browser refuses, the box says Paste with Ctrl/Cmd+V instead), Load file… reads a .json file from disk, From the data takes the Data JSON of the selected script, From a call… lists the captured calls, newest first, each with its input and its output, Format indents, Sort keys puts every object's keys in order at every depth, Minify writes one line, Copy copies the text (masked while Mask values is on, from the value, so a box that is not JSON cannot be copied masked) and Clear empties the box. In a narrow box only Paste and Format stay in the row and the rest are in the … menu beside them. The file is read here and nothing is sent or stored.
- Errors: a box that is not JSON says where and what is wrong, as Line 3, column 1: Unexpected "\}". A key needs a colon and a value. The hints name a key with no colon, single quotes, an unquoted key, a trailing comma, = in place of a colon (an Apex map), a comment, a text before or after the one value, and a value that is not closed.
- Read loosely: when the text is nearly JSON, the line under the box offers Read loosely. It accepts single-quoted texts and keys, unquoted keys, trailing commas, // and /\* \*/ comments, = in place of a colon, unquoted words as texts and (a, b) as a list, which is how a debug log writes an Apex map such as \{Name=Ada, Age=36\}. The text stays as you typed it, an amber note says what was accepted, and the comparison, the Tree and the Form use the value that was read. Format rewrites the box as JSON. Change a character and the choice lapses. Text that is not even loosely JSON, such as a key with no value, is still refused.
- Compare (or Ctrl/Cmd+Enter) sets the two Side by side under the boxes, which fold to one line each (Before · 12 keys · edit; click it to edit again); Swap exchanges them. Esc or ✕ closes the dialog; what you pasted is kept while DevTools is open, so it is there when you open it again. Nothing is sent or stored.

<a id="everywhere-side-by-side"></a>

### Side by side

Every comparison in the panel opens Side by side: a call's Changes and Compare tabs, two debug runs, Compare data and Compare JSON. Before is on the left and After on the right, each row beside the same row of the other, and each pane numbered as its own Raw view. A changed value is amber on both sides; an added key or row is green on the right with a hatched gap on the left; a removed one is red on the left with the gap on the right. In two long texts the part that differs is marked; a short value, a number, true, false or null is marked whole. Rows of a list are lined up first, by a shared Id, Name or key when every row has one, otherwise by content, so one removed row is one gap. A branch with a difference inside is open; a run of unchanged keys or rows folds to one grey line (… 9 unchanged keys) that opens on a click or Enter, and a click on a branch's line closes or opens it. The head counts what changed, was added and was removed. Previous and Next go from one difference to the next: the current one is outlined, and the line under the panes names it (Difference 1 of 11 · Plan changed: "Standard" → "Premium"). The panes scroll together. Show unchanged draws the unchanged lines instead of folding them. List shows the same differences as blocks, one per path, a value before (red, −) and after (green, +); the choice is kept for each place while DevTools is open. Copy copies the differences as JSON and honours Mask values, which also applies to the values shown. With the panes focused, Up and Down go to the previous and next difference, Left closes a branch and Right opens it, Enter opens a fold, and Home and End go to the first and last difference. Where the panes would be narrower than about 640 px they become one: Before's line (−) above After's (+), both marked.

<a id="everywhere-more"></a>

### More

In a panel narrower than 600 px each toolbar keeps its main controls and moves the rest into the … button at its end. Its menu lists them, a switch showing on or off, and choosing one does what the control does. Widen the panel and they are back in the toolbar.

<a id="everywhere-rescan"></a>

### Rescan

The two-arrows button in the top bar looks for frames and OmniScripts again (Refresh only re-reads the script you have). It runs automatically every few seconds while the panel is visible.

<a id="everywhere-open-in-designer"></a>

### Open in Designer

The icon after the OmniScript picker, there only when the selected script's record Id is known (from its definition or header, or an attribute of its element) and the page is an org's own (Lightning, My Domain or a Visualforce page of it, not an Experience site). It opens the script in the OmniStudio Builder of core OmniStudio, or in the OmniScript Designer of a managed package; the tooltip says which and why ("managed package vlocity\_cmt, from the calls", or "set in Settings"). It opens in a new tab. The panel only builds the address, and nothing is sent; it is not shown while a bundle is open.

- Auto (the default) is a best guess, and the setting overrides it. It takes the script as managed when the element's name or class starts with vlocity\_cmt, vlocity\_ins, vlocity\_ps or vlocity\_hins, or the definition's field names or the captured calls to this org name one of them. The omnistudio namespace counts as the managed OmniStudio package only when the calls or the definition use it and the element's name starts with omnistudio- or the page's Lightning app address contains omnistudio\_\_ (core OmniStudio shows up as c- or runtime\_omnistudio-).
- In Settings, Open in Designer chooses Auto, Builder (core) or Designer (managed). For managed, a namespace field offers the ones this script shows first, then vlocity\_cmt, vlocity\_ins, vlocity\_ps and omnistudio, and takes one you type; empty uses the one seen, and omnistudio when none was seen. It is kept with Remember my settings.

<a id="everywhere-limits"></a>

### Limits

Closed shadow roots and cross-origin frames cannot be read. That is a browser restriction, not a setting.

<a id="everywhere-status-bar"></a>

### Status bar

At the foot: the selected script's name, then each tab's own status, on the left, what is being read on the right.

- Data: "Type/SubType/Language · 7.2 KB" on the left (the element's tag name stands in for a script without one), then "Live · changed 10:43:31 AM" on the right, with "N matches" while a $ query or a filter in the Raw view is on and "N embedded scripts hidden" when OmniScripts nested in this one are left out. Hover it for the element, the property read, how many scripts are listed and how many other components of a listed script are hidden.
- Calls: "5 calls · 1 failed" (failed only when there is one) and "Recording" or "Paused". It names a choice only when it is not the default: "all Apex calls" (All Apex calls is on), "clears on reload", "failed only", "slow: 800 ms" and "text: …" for the filter box.
- Both read "Bundle: \<file\>" and Read-only or Not capturing while a debug bundle is open.
- Text that does not fit is cut with … and is in full in the tooltip. At the far right are the extension version, a Buy me a coffee button (optional and free of conditions: it opens a small menu with Ko-fi (EUR, by card) or buycoffee.to (PLN, by card or BLIK); the one you pick opens in a new tab, and the panel passes nothing to either) and the note that this is unofficial. In a narrow panel the right side shrinks to the coffee icon and the version. The foot of this help links to the same page.

<a id="keys"></a>

## Keys

Single keys; ignored while typing in a field.

| Keys | What it does |
| --- | --- |
| <kbd>/</kbd> | Focus the filter |
| <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> | Switch to the first, second or third tab, in the order shown |
| <kbd>Alt</kbd> <kbd>Shift</kbd> <kbd>←</kbd> <kbd>→</kbd> | On a tab: move it one place left or right (or drag it); the order is kept |
| <kbd>n</kbd> <kbd>p</kbd> | Next / previous marked change (Data, with Track changes on) |
| <kbd>d</kbd> | Compare the selected call with the previous one to the same place (Calls) |
| <kbd>Shift</kbd> <kbd>D</kbd> | Compare the selected call with the last successful one to the same place (Calls) |
| <kbd>b</kbd> | Make the focused call the baseline for Compare; move to another call to compare with it, press b again to clear (Calls) |
| <kbd>x</kbd> | Mark or unmark the focused call (Calls) to add up its time; Shift-click a call's box for a range |
| <kbd>c</kbd> | Copy the value of the focused row, else the one under the pointer (Data), the selected element's value (Structure) or the selected call (Calls) |
| <kbd>Ctrl</kbd> <kbd>C</kbd> | In a tree or Raw: copy exactly what is highlighted, or, with nothing highlighted, the whole value the caret is in (Cmd+C on a Mac) |
| <kbd>↑</kbd> <kbd>↓</kbd> <kbd>j</kbd> <kbd>k</kbd> | Move to the previous / next call (Calls) or element (Structure) |
| <kbd>Home</kbd> <kbd>End</kbd> <kbd>PageUp</kbd> <kbd>PageDown</kbd> | Jump to the first / last call or element, or ten at a time |
| <kbd>←</kbd> <kbd>→</kbd> | Structure: → opens a section or moves to its first child, ← folds it or moves to its parent |
| <kbd>←</kbd> <kbd>→</kbd> | On the tab strip: previous / next tab (Home and End for the first and last) |
| <kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> <kbd>Enter</kbd> | In the Data tree (Tab into it): ↑ ↓ move between rows, Home and End go to the first and last, → opens a branch or moves to its first child, ← folds it or moves to its parent, Enter or Space opens and closes it |
| <kbd>↑</kbd> <kbd>↓</kbd> <kbd>Enter</kbd> <kbd>t</kbd> | In the Changes view: ↑ ↓ move between changes, Enter opens or closes one to show its values, t finds it in the tree |
| <kbd>Alt</kbd> <kbd>click</kbd> | In a tree: open or close a branch and everything inside it (Option-click on a Mac); a plain click changes one level |
| <kbd>Ctrl</kbd> <kbd>\</kbd> | Focus mode (Structure and Calls): hide the list so the detail takes the full width, or show it again (Cmd+\\ on a Mac). Esc in the detail also brings the list back |
| <kbd>Ctrl</kbd> <kbd>=</kbd> <kbd>-</kbd> <kbd>0</kbd> | Text size: larger, smaller, back to Medium (Cmd on a Mac); works wherever the focus is in the panel |
| <kbd>,</kbd> | Open or close the settings (the gear in the top bar) |
| <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>L</kbd> | Open Compare JSON, from anywhere in the panel (Cmd+Shift+L on a Mac) |
| <kbd>?</kbd> | Show or hide this help; with a toolbar or top-bar button or switch focused, open the help at its entry |
