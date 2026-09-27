# Implementation Plan: Edit Task

**Branch**: `002-edit-task` | **Date**: 2026-09-27 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/002-edit-task/spec.md`

## Summary

Extend the existing browser-only task list with per-task edit mode, inline description rewriting,
non-empty save validation, completion toggling, and deletion. Keep the current HTML/CSS/JavaScript
application and session-only state; add no backend, database, or framework.

## Technical Context

**Language/Version**: HTML, CSS, and browser-native JavaScript; current evergreen browsers

**Primary Dependencies**: None

**Storage**: Existing in-memory task array; no persistence across reloads

**Testing**: Browser acceptance checks using the existing application; no automated test harness

**Target Platform**: Desktop and mobile web browsers

**Project Type**: Static single-page web application

**Performance Goals**: Edit, save, toggle, and delete changes appear immediately without navigation

**Constraints**: Keep existing task creation behavior; edit controls belong only to task items;
descriptions remain rendered as text; empty or whitespace-only descriptions cannot be saved

**Scale/Scope**: Existing in-memory tasks in one page session; per-task editing, completion, and
deletion only

## Constitution Check

| Principle | Gate | Status |
|---|---|---|
| Specification-first development | Implement only the defined Edit Task stories and acceptance criteria. | PASS |
| Responsible AI use | Student author reviews and can explain all submitted implementation changes. | PASS |
| Incremental, verifiable delivery | Implement edit/save and its validation first, then completion toggle, then deletion; verify each story in a browser. | PASS |
| Meaningful version control | Keep each implementation commit coherent and descriptively named. | PASS |
| Documented decisions and simplicity | Extend existing task state and rendering in `app.js`; avoid new dependencies and abstractions without need. | PASS |
| Technology and quality constraints | Use semantic HTML, CSS, and browser-native JavaScript with usable desktop/mobile layout. | PASS |

**Gate Result**: PASS. The feature fits the current static SPA architecture and introduces no
constitution violation.

**Post-Design Gate (Phase 1)**: PASS. The data model preserves saved descriptions during invalid
edits, controls are scoped to task items, and the design uses the existing HTML/CSS/JavaScript
stack with no backend, database, or new dependency.

## Project Structure

### Documentation (this feature)

```text
specs/002-edit-task/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    └── ui.md
```

### Source Code

```text
index.html    # Existing task-creation form and task list shell
styles.css    # Existing responsive task list presentation
app.js        # In-memory task model, rendering, and interactions
```

**Structure Decision**: Extend the current root-level static app. Keep task data in the existing
array, render each task's normal/edit state from its data, and attach actions to each task item.
Use a per-task draft description so rejected empty edits do not overwrite the last saved text.

## Risks

- Re-rendering while editing could discard a user's unsaved draft or move focus. Keep draft text
  separate from the saved description and restore focus appropriately after control actions.
- Deletion and completion controls are repeated per task; actions must be scoped to the owning task
  ID so neighboring tasks are not changed.
- Empty-save validation must preserve the last saved description while keeping the draft editable.
- Completion must remain visually distinguishable in both normal and edit mode.
- Browser-native text editing controls vary in keyboard behavior; verify mouse and keyboard use in
  current desktop and mobile browsers.

## Assumptions

- The Add Tasks feature creates tasks with stable session-unique IDs and descriptions in `app.js`.
- Edit mode and completion state are independent for each task; multiple tasks can be edited.
- Text edits are staged in a draft and committed when Exit is selected; completion changes apply
  immediately and survive leaving edit mode for the current session.
- Exit with an empty or whitespace-only draft is rejected, keeps the task in edit mode, and leaves
  the saved description unchanged.
- Deletion removes the selected task immediately with no confirmation or undo.
- All changes remain in memory only and are lost on reload.

## Complexity Tracking

No constitution violations or additional architectural complexity require justification.
