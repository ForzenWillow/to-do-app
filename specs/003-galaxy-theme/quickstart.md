# Quickstart: Galaxy Theme Validation

## Prerequisites

- The Galaxy Theme implementation is present in `index.html` and `styles.css`.
- A current desktop or mobile browser that supports CSS `:has()` and `prefers-reduced-motion`.
- No package installation, backend, or database is required.

## Run

Open the repository's `index.html` in a browser and use the visible theme radio group to select
Galaxy. The default theme is selected again after a page reload.

## Validation Scenarios

### Baseline Before Galaxy Theme

- The default page background is a pale green (`rgb(238, 244, 241)`) and task surfaces are light
   (`rgb(247, 250, 248)`). No theme selector is present before implementation.
- Before implementation, there was no appearance radio group; the task border was a fixed color.
- The existing task list and controls are visible at 320px and 1440px; the task row fits within
   the panel at both widths.
- The native Appearance radio group defaults to Default after reload. Selecting Galaxy by keyboard
   changes the checked option without navigation or changing the task count.

### Default-Theme Task Behavior Baseline

- With Default selected, valid add, valid edit/save, empty-edit rejection and correction, both
   completion toggle directions, and task-isolated deletion all behaved as expected.

1. **Default state**: Reload the page. Confirm Default is selected and the existing appearance is
   unchanged.
2. **Select Galaxy**: Use the keyboard and pointer to select Galaxy. Confirm the page and primary
   surfaces show blended gradients with multiple purple and dark-purple shades and no reload.
3. **Task border motion**: Add several tasks. Confirm each task has a multi-shade purple gradient
   border whose color placement shifts over time while text and controls remain stationary.
4. **Theme switching during edit**: Create a task, enter edit mode, type a draft, and switch
   themes. Confirm edit mode, draft, validation feedback, and completion state remain unchanged.
5. **Contrast and legibility**: Inspect page text, task descriptions, inputs, buttons, selected
   theme, completion labels, and validation feedback in Galaxy in normal, edit, invalid, and
   completed states. Check normal text at 4.5:1 and large text/control boundaries at 3:1 against
   their actual backgrounds.
6. **Task regressions**: With Galaxy active, add a valid task, edit/save it, attempt an empty edit,
   toggle completion both ways, and delete one task. Confirm outcomes and task isolation match the
   default theme.
7. **Reduced motion**: Enable the operating-system/browser reduced-motion preference. Confirm the
   task borders retain their multi-shade gradients but stop continuously shifting.
8. **Responsive layout**: At 320px and 1440px viewport widths, confirm the selector, task text,
   task borders, and all controls remain visible without clipping or overlap.
9. **Reset behavior**: Select Galaxy and reload. Confirm the default theme returns and tasks reset
   according to the existing session-only application behavior.

## Expected Result

Galaxy provides the requested purple-gradient visual treatment with readable content and shifting
task borders, while all existing task operations remain behaviorally unchanged.

## Implementation Verification Results

- Ten theme-switch checks activated Galaxy gradients and the shifting border, returned to the
   default appearance, and preserved both task descriptions.
- Ten default-theme regression checks passed for add, edit/save, empty validation and recovery,
   completion in both directions, and deleting only the selected task.
- Ten Galaxy regression runs passed for add, edit/save, empty-edit rejection, correction,
   completion in both directions, and task-isolated delete.
- In 10 of 10 theme switches during an edit draft, draft text, edit mode, and completion state
   remained unchanged. In 10 of 10 switches during empty-edit validation, the saved text, invalid
   draft, edit mode, and guidance remained unchanged; corrected text then saved successfully.
- The task-border gradient position changed over time while task content remained stationary.
- Reduced-motion emulation kept the multi-stop border gradient and set its animation to `none`.
- Ten default-theme regression checks passed for add, edit/save, empty validation and recovery,
   completion in both directions, and deleting only the selected task.
- Ten Galaxy regression runs passed for add, edit/save, empty-edit rejection, correction,
   completion in both directions, and task-isolated delete.
- In 10 of 10 theme switches during an edit draft, draft text, edit mode, and completion state
   remained unchanged. In 10 of 10 switches during empty-edit validation, the saved text, invalid
   draft, edit mode, and guidance remained unchanged; corrected text then saved successfully.
- Contrast samples met WCAG AA: normal text at least 4.61:1, task text at least 12.19:1,
   validation feedback at least 11.57:1, and gradient-border stops at least 3.78:1 against the
   task interior. Theme-selector and input boundaries measured at least 3.42:1 and 3.53:1.
- At 320px, the selector, task panel, task row, editor, and all three edit controls fit within the
   viewport. At 1440px, the editor and action controls fit within the task card.
- The selector's native Appearance radio group supports keyboard ArrowRight to select Galaxy;
   theme selection does not change task state or navigate.