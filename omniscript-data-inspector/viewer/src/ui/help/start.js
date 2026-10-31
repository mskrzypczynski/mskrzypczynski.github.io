'use strict';

/* "Start here": the five things to try first on each tab, shown at the top of
 * its help before the reference entries. Kept short on purpose; the entries
 * below explain each one. Keep these in step with what the tab does. */

export const START = {
  data: [
    'Pick your OmniScript in the bar at the top (press Rescan if the list is empty). Its data appears as a tree.',
    'Use the page: values that change flash amber, and Auto-refresh keeps the tree live.',
    'Type in the filter to narrow the tree. A path such as Step:Rows|2:Field or key=value works too.',
    'Hover a row for its buttons (copy, watch, show in Structure), or right-click it for more.',
    'Tick Track changes to keep marks and compare reads of the data JSON; Raw and Sizes show the same data as text and by size.'
  ],
  structure: [
    'Pick your OmniScript in the bar at the top. The list shows every element of its definition.',
    'Click an element to see its value, properties, rules and calls on the right.',
    'Follow current step keeps the step the script is on selected; Current step takes you back to it.',
    'Type in the filter to find an element by name, type or label. Actions only lists what calls something.',
    'Problems (N) appears only while the definition has something provably wrong.'
  ],
  actions: [
    'Use the page as you normally do: its Apex calls appear here as they are made, decoded.',
    'Click a call to see its input, options and output on the right.',
    'A call that failed opens on its output, where the reason is.',
    'Type in the filter to find a call by class or method. in: searches inputs and outputs.',
    'Compare with previous (or press d) shows what changed between two calls to the same place.'
  ]
};
