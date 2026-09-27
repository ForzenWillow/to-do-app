# Feature Specification: Edit Task

**Feature Branch**: `Not created`

**Created**: 2026-09-27

**Status**: Draft

**Input**: User description: "Create a specification for the feature 'Edit Task' in a To-Do application. Every existing task has an Edit button that appears only on created tasks. Pressing Edit reveals Delete (X), a checkmark to mark the task complete or incomplete, and Exit. The user can click the task text to rewrite it. Empty text cannot be saved. Pressing Exit saves rewritten text and returns to normal view."

## User Scenarios & Testing

### User Story 1 - Edit a Task Description (Priority: P1)

As a To-Do application user, I want to edit the text of an existing task and save it, so that I
can correct or update what the task says.

**Why this priority**: Updating existing task text is the central purpose of this feature.

**Independent Test**: Create a task, enter its edit mode, replace its text, and select Exit;
confirm the changed text is saved and the task returns to normal view.

**Acceptance Scenarios**:

1. **Given** an existing task is in normal view, **When** the user selects its Edit button,
   **Then** only that task enters edit mode and reveals Delete (X), completion toggle, and Exit
   controls.
2. **Given** a task is in edit mode, **When** the user selects its text and replaces it with
   non-empty text, **Then** the replacement is shown as the task's edited text.
3. **Given** a task has non-empty edited text, **When** the user selects Exit, **Then** the text
   is saved and the task returns to normal view.
4. **Given** the task-creation input and existing tasks are displayed, **When** the user views
  the page, **Then** each existing task has an Edit button and the task-creation input has none.

---

### User Story 2 - Prevent Empty Task Text (Priority: P1)

As a To-Do application user, I want empty edited text rejected, so that an existing task cannot
become a blank task.

**Why this priority**: Preventing an empty save protects task-list integrity during the primary
edit workflow.

**Independent Test**: Enter edit mode, remove all task text, and select Exit; confirm the task is
not saved blank, remains in edit mode, and the user receives guidance to enter text.

**Acceptance Scenarios**:

1. **Given** a task is in edit mode, **When** the user removes all text and selects Exit,
   **Then** the empty value is not saved, the task remains in edit mode, and visible guidance
   requests non-empty text.
2. **Given** a blank save was rejected, **When** the user enters non-empty text and selects Exit,
   **Then** the text is saved and the task returns to normal view.
3. **Given** edited text contains only whitespace, **When** the user selects Exit, **Then** the
   value is treated as empty and is not saved.

---

### User Story 3 - Mark a Task Complete or Incomplete (Priority: P2)

As a To-Do application user, I want to toggle whether an existing task is complete, so that the
task's completion state reflects my progress.

**Why this priority**: Completion state is a useful task-management action exposed by the requested
edit controls, but description editing is the core workflow.

**Independent Test**: Enter edit mode for an existing task, activate its checkmark control, and
confirm the task visibly changes to complete; activate it again and confirm it returns to
incomplete.

**Acceptance Scenarios**:

1. **Given** an incomplete task is in edit mode, **When** the user activates its checkmark control,
   **Then** that task is marked complete and the changed state is visually distinguishable.
2. **Given** a completed task is in edit mode, **When** the user activates its checkmark control,
   **Then** that task is marked incomplete and the changed state is visually distinguishable.

---

### User Story 4 - Delete a Task (Priority: P2)

As a To-Do application user, I want to delete an existing task from edit mode, so that I can
remove a task I no longer need.

**Why this priority**: Deletion supports task maintenance but is secondary to editing task text.

**Independent Test**: Enter edit mode for a task, activate its Delete (X) control, and confirm
that task is removed from the list.

**Acceptance Scenarios**:

1. **Given** an existing task is in edit mode, **When** the user activates Delete (X), **Then**
   that task is removed from the list and its edit controls are no longer present.
2. **Given** multiple tasks exist, **When** the user deletes one task, **Then** other tasks remain
   unchanged.

### Edge Cases

- Text containing only spaces or other whitespace cannot be saved.
- When an empty save is rejected, the existing saved description remains unchanged while the user
  corrects the edit.
- Editing or deleting one task does not change another task's description or completion state.
- The Edit button is available only for an existing task, never for the task-creation input.

## Requirements

### Functional Requirements

- **FR-001**: Every existing task MUST display an Edit button in its normal view.
- **FR-002**: The Edit button MUST appear only within an existing task item and MUST NOT appear on
  the task-creation input or elsewhere.
- **FR-003**: Selecting a task's Edit button MUST put that task into edit mode and reveal a Delete
  (X) button, a completion toggle, and an Exit button for that task.
- **FR-004**: In edit mode, the user MUST be able to select the task's displayed text and replace
  it with new text.
- **FR-005**: Selecting Exit with non-empty edited text MUST save the new text and return that
  task to normal view.
- **FR-006**: Empty or whitespace-only edited text MUST NOT be saved. Exit MUST leave the task in
  edit mode and show guidance requesting non-empty text; the last saved description MUST remain
  unchanged.
- **FR-007**: The completion toggle MUST switch the edited task between complete and incomplete
  states, and the current state MUST be visually distinguishable.
- **FR-008**: Selecting Delete (X) MUST remove only the task whose edit controls were activated.

### Key Entities

- **Task**: An existing task with a description, a completion state, and an edit mode state.

## Out of Scope

- Adding new tasks or changing task-creation behavior.
- Saving tasks across page reloads or synchronizing them across users or devices.
- Reordering, searching, filtering, prioritizing, or assigning due dates to tasks.
- Bulk edit, bulk completion, or bulk deletion.
- Confirm dialogs or undo behavior for deletion.

## Success Criteria

### Measurable Outcomes

- **SC-001**: In 10 of 10 edit checks, selecting Edit on an existing task exposes that task's
  Delete (X), completion, and Exit controls, with no Edit control outside task items.
- **SC-002**: In 10 of 10 valid edit checks, selecting Exit saves the replacement text and returns
  the task to normal view without affecting other tasks.
- **SC-003**: In 10 of 10 empty or whitespace-only save checks, no blank description is saved and
  the user receives visible guidance while the task remains editable.
- **SC-004**: In 10 of 10 completion-toggle checks, each activation changes the task to the
  opposite completion state and the state is visibly distinguishable.
- **SC-005**: In 10 of 10 deletion checks, the selected task is removed and all other tasks remain
  present with their prior descriptions and completion states.

## Assumptions

- Each task's edit mode and completion state are independent; more than one task may be edited
  without changing the state of other tasks.
- Clicking or keyboard-focusing the task text in edit mode allows its description to be rewritten.
- On Exit, surrounding whitespace is trimmed; a resulting empty description is rejected.
- An empty-save rejection preserves the last saved description and keeps the task in edit mode
  until valid text is saved or the task is deleted.
- The checkmark toggles completion immediately and remains available while the task is in edit
  mode; exiting edit mode preserves the completion state.
- Deletion removes a task immediately without confirmation or undo.
- Task changes remain in memory only and are lost when the page is refreshed.