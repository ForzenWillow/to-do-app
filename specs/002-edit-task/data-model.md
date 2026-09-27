# Data Model: Edit Task

## Task

An existing task shown in the in-memory task list.

| Field | Type | Rules |
|---|---|---|
| `id` | Integer | Stable and unique for the lifetime of the current page session; identifies the task targeted by controls. |
| `description` | String | Last saved user-facing text; MUST remain non-empty after trimming. |
| `completed` | Boolean | Whether the task is complete; toggled immediately by the checkmark control. |
| `isEditing` | Boolean | Whether the task currently exposes editing controls. |
| `draftDescription` | String | Temporary unsaved text while editing; initialized from `description` on edit entry. |
| `validationMessage` | String | Empty unless an Exit attempt has an empty draft; does not replace the saved description. |

## Relationships and Scope

- Tasks remain records in the existing ordered in-memory collection.
- Editing, completion, validation, and deletion actions target a task by its stable ID.
- Each task's editing and completion state is independent; changing one record does not alter
  another.
- Task state is not persisted across page reloads.

## Validation Rules

1. On edit entry, initialize `draftDescription` from the task's saved `description`.
2. Allow replacement text to be drafted without changing the saved `description`.
3. On Exit, trim the draft. If it is non-empty, save it to `description`, clear the validation
   message, and leave edit mode.
4. If the trimmed draft is empty, do not change the saved `description`, do not leave edit mode,
   and expose visible guidance to enter non-empty text.
5. The completion control toggles `completed` immediately and does not implicitly save or discard
   the description draft.
6. Delete removes only the selected task record.
7. Render descriptions as text; do not interpret user-provided markup.

## State Transitions

| Current state | Event | Result |
|---|---|---|
| Normal | Select Edit | Set `isEditing`; initialize draft; reveal Delete, completion, and Exit controls. |
| Editing | Change task text | Update only `draftDescription`. |
| Editing with non-empty draft | Select Exit | Trim and save draft; clear validation; return to normal. |
| Editing with empty draft | Select Exit | Preserve saved text; keep editing; show validation guidance. |
| Editing | Toggle completion | Switch `completed`; remain editing. |
| Editing | Select Delete | Remove only this task. |
| Normal or editing | Reload page | In-memory task collection resets under the existing application behavior. |