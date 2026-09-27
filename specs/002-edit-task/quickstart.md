# Quickstart: Edit Task Validation

## Prerequisites

- The Edit Task implementation is present in the static application files.
- A current desktop or mobile browser with JavaScript enabled.
- No package installation, backend, or database is required.

## Run

Open the repository's `index.html` in a browser. Create two tasks using the existing Add form so
there are existing task items to edit. All changes are held in the current page session.

## Validation Scenarios

### Baseline Before Edit Task

- The existing Add form creates a task and displays its text in the task list. Before this
   feature, the task row exposes no Edit, Delete, completion, or Exit controls.

### User Story 1 Browser Results

- Edit controls appeared only on the selected existing task in 10 of 10 checks; the creation form
   never showed Edit.
- Ten valid rewritten descriptions saved on Exit after trimming surrounding whitespace. Each task
   returned to normal view, and a neighboring task remained unchanged in every check.
- At 320px, the editable text and all three edit controls fit within the task row without overlap.

### Baseline Before User Story 2

- Empty and whitespace-only Exit attempts already leave the task in edit mode and preserve its
   last saved description in the task model. Before validation feedback was implemented, neither
   attempt displayed guidance or marked the editable text invalid.

### User Story 2 Browser Results

- Empty drafts were rejected in 10 of 10 checks and whitespace-only drafts were rejected in 10
   of 10 checks. All attempts preserved the saved description, remained in edit mode, and exposed
   visible guidance with an invalid state.
- A corrected non-empty draft saved successfully, cleared the guidance, and did not change a
   neighboring task.

### Baseline Before User Story 3

- The edit-mode checkmark was present with an unpressed state, but activating it did not change
   the task's `completed` state before the toggle behavior was implemented.

### User Story 3 Browser Results

- Ten alternating completion toggles changed only the selected task and updated its accessible
   pressed state each time. The final state remained visible after Exit; the neighboring task
   remained incomplete.

### Baseline Before User Story 4

- Selecting Delete (X) in edit mode did not change the task collection before delete behavior was
   implemented; both task records remained present.

### User Story 4 Browser Results

- Ten task-scoped delete checks removed the selected task and preserved its neighboring task's
   description and completed state in every check.

1. **Control placement**: Confirm each created task has an Edit button and the task-creation form
   has none.
2. **Enter edit mode**: Select Edit on the first task. Confirm only that task reveals Delete (X),
   completion, and Exit controls; the other task remains in normal view.
3. **Save rewritten text**: Replace the first task's text with `Updated task` and select Exit.
   Confirm the task shows `Updated task`, returns to normal view, and the second task is unchanged.
4. **Reject empty draft**: Enter edit mode, clear the text, and select Exit. Confirm the saved
   description remains unchanged, edit mode remains active, and guidance is visible.
5. **Reject whitespace-only draft**: Replace the draft with spaces and select Exit. Confirm the
   same rejection behavior as the empty draft.
6. **Recover after rejection**: After a rejected save, enter `Corrected task` and select Exit.
   Confirm it saves and the guidance clears.
7. **Toggle completion**: In edit mode, activate the completion control twice. Confirm the task
   visibly changes to complete and then incomplete, without changing the other task.
8. **Delete one task**: Enter edit mode for the first task and select Delete (X). Confirm it is
   removed and the second task remains unchanged.
9. **Text safety**: Edit a task to `<b>note</b>`, save, and confirm it appears as literal text.
10. **Reload behavior**: Refresh the page. Confirm tasks reset according to the existing
    session-only behavior.
11. **Responsive controls**: Repeat control-placement and edit-mode checks at desktop and narrow
    mobile widths; confirm controls remain visible, keyboard-operable, and do not overlap.

## Expected Result

Task-scoped controls are available only in their defined states. Valid edits save on Exit; empty
edits preserve the previous saved text and remain correctable; completion and deletion affect only
the selected task.

## Implementation Verification Results

- The Edit button appeared once per existing task and never appeared in the task-creation form.
- The editable task text supported keyboard replacement; valid text saved on Exit and left other
   tasks unchanged.
- Empty and whitespace-only drafts were rejected 10/10 times each with visible guidance while
   preserving the saved description; valid correction succeeded.
- Ten alternating completion toggles changed only the selected task, and the final state remained
   visible after Exit.
- Ten delete checks removed only the selected task and preserved the neighboring task's
   description and completion state.
- `<b>note</b>` rendered as literal text without creating markup.
- At 320px, the editor and all three controls fit within the task row. At 1440px, the task list
   remained within its planned maximum content width. Focus moved to the neighboring task after
   deletion.