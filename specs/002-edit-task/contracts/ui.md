# UI Contract: Edit Task

## Normal Task View

- Each existing task item shows its description, visible completion state, and an Edit button.
- Edit is rendered only inside an existing task item; it does not appear on the task-creation form
  or elsewhere.
- The Edit button has an accessible name identifying the action and task where practical.

## Edit Mode

- Selecting Edit changes only that task to edit mode.
- Its text can be selected and rewritten directly, with an accessible keyboard-operable editing
  interaction.
- The task shows three controls: Delete (X), a completion toggle, and Exit. These controls are
  scoped to that task.
- The completion control's accessible name and state communicate whether activating it will mark
  the task complete or incomplete.
- Activating completion changes that task's completion state immediately and visibly without
  leaving edit mode.

## Save and Validation

- Exit with non-empty text trims and saves the draft, then returns the task to normal view.
- Exit with blank or whitespace-only text does not save; it preserves the prior saved description,
  keeps the task in edit mode, and shows visible guidance associated with the editable text.
- A corrected non-empty draft can then be saved with Exit.
- Task text is exposed as text, not interpreted markup.

## Delete

- Delete (X) removes only the task whose edit controls were activated.
- Delete is available only while that task is in edit mode; no confirmation or undo is included.
- Other task items and their states remain unchanged.

## Persistence

Task changes apply immediately in the current page session and are lost when the page is refreshed,
consistent with the existing application behavior.