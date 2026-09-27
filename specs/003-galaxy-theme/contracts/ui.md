# UI Contract: Galaxy Theme

## Theme Selector

- Show a visible, labeled, keyboard-operable native radio group with Default and Galaxy options.
- Default is selected when the page loads.
- Selecting either option changes presentation without reloading the page or changing task data.
- The checked option is visibly identifiable and available to assistive technology through native
  radio semantics.

## Galaxy Surfaces

- The page background and primary interface surfaces use blended gradients containing multiple
  purple and dark-purple shades.
- Text-bearing surfaces use stable backgrounds with sufficient contrast; decorative gradients
  must not make text difficult to read.
- Theme styles cover the task-creation form, task panel, task items, inputs, controls, status
  labels, and validation feedback.

## Task Border

- Every task row displays a border made from a gradient of multiple purple shades.
- The border shifts slowly while Galaxy is active; task contents do not move with the effect.
- Border layers do not cover task content, change control hit targets, or intercept pointer input.
- Under reduced-motion preferences, the border remains a multi-shade gradient but does not
  continuously animate.

## Accessibility and Responsiveness

- Normal text targets at least 4.5:1 contrast; large text and meaningful control boundaries target
  at least 3:1 against their adjacent surfaces.
- Focus indicators, completion state, and validation feedback remain visible and distinguishable
  in both themes.
- At 320px mobile and 1440px desktop viewport widths, the selector, task text, and task controls
  remain visible without clipping or overlap.

## Behavior Preservation

Galaxy changes appearance only. Add, edit/save, empty-edit validation, completion toggle, and delete
continue to behave as they do in the default theme. Switching themes during edit preserves the
current draft, validation message, edit mode, and completion state.