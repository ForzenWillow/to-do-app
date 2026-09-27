---
description: "Task list for Edit Task feature implementation"
---

# Tasks: Edit Task

**Input**: Design documents from `specs/002-edit-task/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui.md`,
`quickstart.md`

**Tests**: Browser acceptance checks are requested. Use the scenarios in
`specs/002-edit-task/quickstart.md`; no automated test framework is planned.

**Organization**: Tasks are grouped by user story to support incremental implementation and
independent verification.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Tasks touch separate files and can run in parallel after their stated prerequisites.
- **[Story]**: Story tasks use `[US1]` through `[US4]` per `spec.md`.
- Every task includes its target file path.

## Path Conventions

- Application files are at the repository root: `index.html`, `styles.css`, and `app.js`.
- Feature validation and planning documents are under `specs/002-edit-task/`.

## Phase 1: Setup

**Purpose**: Establish a browser baseline before editing the existing application.

- [X] T001 [P] Run the current Add Tasks flow and confirm the Edit Task controls are absent; record the baseline in `specs/002-edit-task/quickstart.md`.

---

## Phase 2: Foundational

**Purpose**: Extend shared task state and rendering so each user story builds on the same task records.

- [X] T002 Add `completed`, `isEditing`, `draftDescription`, and `validationMessage` defaults to each new task record in `app.js`.
- [X] T003 Refactor task-list creation into an ID-based `renderTasks()` function in `app.js`, preserving Add Tasks behavior and rendering descriptions as text.

**Checkpoint**: Existing task creation still works and all task items render from the shared in-memory collection.

---

## Phase 3: User Story 1 - Edit a Task Description (Priority: P1)

**Goal**: Existing tasks expose task-scoped Edit and Exit controls and save valid rewritten descriptions.

**Independent Test**: Create two tasks, edit and save one task, and confirm the other remains unchanged and only the edited task returns to normal view.

### Tests for User Story 1

- [X] T004 [US1] Verify the pre-edit baseline and document expected Edit-button placement in `specs/002-edit-task/quickstart.md`.

### Implementation for User Story 1

- [X] T005 [US1] Render an Edit button only within each existing normal-view task item in `app.js`.
- [X] T006 [US1] Render per-task inline text editing plus Delete (X), completion, and Exit controls when `isEditing` is true in `app.js`.
- [X] T007 [US1] Initialize each draft from the saved description and save trimmed non-empty text on Exit in `app.js`.
- [X] T008 [P] [US1] Style normal task rows, the inline editor, and task-scoped action controls in `styles.css`.
- [X] T009 [US1] Verify Edit placement, entry into edit mode, valid text replacement, Exit save, and unaffected neighboring tasks; record results in `specs/002-edit-task/quickstart.md`.

**Checkpoint**: A task can enter edit mode and save a valid rewritten description without affecting other tasks.

---

## Phase 4: User Story 2 - Prevent Empty Task Text (Priority: P1)

**Goal**: Empty and whitespace-only drafts cannot replace a saved description.

**Independent Test**: In edit mode, submit an empty and then whitespace-only draft using Exit; confirm the saved text remains unchanged, edit mode remains active, and guidance is shown; then save corrected text.

### Tests for User Story 2

- [X] T010 [US2] Verify and record the empty/whitespace save baseline after edit mode exists in `specs/002-edit-task/quickstart.md`.

### Implementation for User Story 2

- [X] T011 [US2] Reject empty trimmed drafts on Exit, preserve the saved description, keep edit mode active, and set task-specific validation guidance in `app.js`.
- [X] T012 [P] [US2] Style invalid draft text and visible validation guidance for the editing task in `styles.css`.
- [X] T013 [US2] Verify empty rejection, whitespace-only rejection, preserved saved text, and successful correction; record results in `specs/002-edit-task/quickstart.md`.

**Checkpoint**: No task can be saved with a blank or whitespace-only description.

---

## Phase 5: User Story 3 - Mark a Task Complete or Incomplete (Priority: P2)

**Goal**: The edit-mode checkmark toggles only its task's completion state, which remains visually distinguishable.

**Independent Test**: Toggle one task complete and incomplete while another task remains unchanged; verify the visual and accessible state after each toggle.

### Tests for User Story 3

- [X] T014 [US3] Record the initial completion-toggle behavior and expected state changes in `specs/002-edit-task/quickstart.md`.

### Implementation for User Story 3

- [X] T015 [US3] Wire the edit-mode checkmark control to toggle `completed` for its owning task ID and update its accessible name/state in `app.js`.
- [X] T016 [P] [US3] Style completed and incomplete task states distinctly in normal and edit views in `styles.css`.
- [X] T017 [US3] Verify toggling both directions, state retention after Exit, and isolation from other tasks; record results in `specs/002-edit-task/quickstart.md`.

**Checkpoint**: Each task's completion state toggles independently and remains visible after leaving edit mode.

---

## Phase 6: User Story 4 - Delete a Task (Priority: P2)

**Goal**: Delete (X) removes only the task whose edit controls were activated.

**Independent Test**: Create two tasks, delete one from its edit mode, and verify the other task's description and completion state remain unchanged.

### Tests for User Story 4

- [X] T018 [US4] Record the pre-delete task count and expected unaffected-task state in `specs/002-edit-task/quickstart.md`.

### Implementation for User Story 4

- [X] T019 [US4] Wire Delete (X) to remove only the task matching the active task item's ID from the collection in `app.js`.
- [X] T020 [US4] Verify deletion removes the selected task and preserves all other task text and completion states; record results in `specs/002-edit-task/quickstart.md`.

**Checkpoint**: Deletion is task-scoped and leaves every other task unchanged.

---

## Phase 7: Polish and Cross-Cutting Concerns

**Purpose**: Document usage and verify the complete interaction contract.

- [X] T021 [P] Document edit, save validation, completion, deletion, and session-only behavior in `README.md`.
- [X] T022 [P] Verify keyboard operation, text-only rendering, control visibility, and responsive behavior at desktop and mobile widths; record final results in `specs/002-edit-task/quickstart.md`.

---

## Dependencies and Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; establishes current browser baseline.
- **Foundational (Phase 2)**: Depends on Phase 1; T002 and T003 must complete before user stories.
- **User Story 1 (Phase 3)**: Depends on Phase 2; delivers the core edit/save flow.
- **User Story 2 (Phase 4)**: Depends on User Story 1; validates and protects the save flow.
- **User Story 3 (Phase 5)**: Depends on the shared task item and edit controls from User Story 1.
- **User Story 4 (Phase 6)**: Depends on the Delete control from User Story 1 and the shared renderer.
- **Polish (Phase 7)**: Depends on all four user stories.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Phase 2; no dependency on other stories.
- **User Story 2 (P1)**: Starts after User Story 1 because it extends Exit/save behavior.
- **User Story 3 (P2)**: Starts after User Story 1; independent of validation and deletion.
- **User Story 4 (P2)**: Starts after User Story 1; independent of validation and completion behavior.

### Within-Story Dependencies

- **US1**: T004 -> T005 and T006 -> T007; T008 can run alongside app.js changes after the controls are defined; T009 follows implementation.
- **US2**: T010 -> T011 and T012 in parallel -> T013.
- **US3**: T014 -> T015 and T016 in parallel -> T017.
- **US4**: T018 -> T019 -> T020.
- **Polish**: T021 and T022 can run in parallel after all story checkpoints.

## Parallel Execution Examples

### User Story 1

After the control structure is established, application behavior and presentation can be completed on separate files:

```text
T007 Save a valid task draft in app.js
T008 Style task rows and controls in styles.css
```

### User Story 2

After edit markup exists, validation and its visual presentation touch separate files:

```text
T011 Reject empty drafts in app.js
T012 Style validation feedback in styles.css
```

### User Story 3

After the checkmark control exists, state behavior and completed-state presentation touch separate files:

```text
T015 Toggle completion in app.js
T016 Style completed and incomplete states in styles.css
```

## Implementation Strategy

### MVP First

1. Complete Setup and Foundational phases.
2. Complete User Story 1 and verify valid edits can be saved independently.
3. Add User Story 2 before considering the edit workflow safe for release; empty descriptions must remain unsavable.

### Incremental Delivery

1. Add and verify edit/save behavior.
2. Add and verify empty-draft rejection and recovery.
3. Add completion toggling and verify both states.
4. Add task-scoped deletion and verify neighboring tasks are preserved.
5. Complete documentation and full responsive/browser checks.

## Notes

- Every implementation task includes a checkbox, sequential ID, appropriate story/parallel labels, and exact file path.
- Browser test tasks use `specs/002-edit-task/quickstart.md`; no new testing dependency is introduced.
- User Stories 3 and 4 may proceed in parallel after the shared edit controls are implemented and User Story 2 is verified.

## Phase 8: Convergence

- [ ] T023 Consolidate duplicate `.task-feedback` declarations and retain the intended feedback spacing in `styles.css` per plan: simplicity (partial)