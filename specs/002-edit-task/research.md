# Research: Edit Task

## Existing Application Integration

**Decision**: Extend the existing in-memory task array and task-list rendering in `app.js`; retain
the current static page, styles, and task-creation workflow.

**Rationale**: The app already creates tasks with stable IDs and safely renders descriptions. The
Edit Task feature acts on these same records and does not require a new service or dependency.

**Alternatives considered**: A separate editing module or framework component layer was rejected
because this small application has no module system or framework and the feature is local to each
task item.

## Edit State and Save Behavior

**Decision**: Track `completed`, `isEditing`, and `draftDescription` per task. Initialize the draft
from the saved description on entry to edit mode; commit a trimmed non-empty draft on Exit. If the
draft is empty after trimming, preserve the saved description and keep edit mode active with
guidance.

**Rationale**: Draft state prevents an invalid edit from destroying the last saved description.
Per-task state supports the specification's assumption that tasks can be edited independently.

**Alternatives considered**: Writing directly into the saved description during editing was
rejected because a blank draft would lose the prior value and make validation recovery unreliable.

## Task Controls and Rendering

**Decision**: Render an Edit button only in each existing task's normal view. In edit mode, render
Delete (X), completion toggle, and Exit for that task only. Use button labels/accessibility names
that communicate each action; render the task description as text.

**Rationale**: This directly enforces the control-placement requirement, keeps actions scoped to a
task, and avoids interpreting user text as markup.

**Alternatives considered**: A global Edit control was rejected because it would violate the
requirement that Edit appear only for created tasks. Rendering user text as HTML is unnecessary and
unsafe.

## Validation Approach

**Decision**: Verify edit entry/exit, valid save, empty and whitespace-only rejection, recovery,
completion toggle both directions, task-specific delete, unaffected neighboring tasks, and
responsive controls in a browser.

**Rationale**: The project has no automated test harness; browser checks can directly validate the
visible interaction contract without introducing dependencies.

**Alternatives considered**: Adding a new test framework solely for this feature would exceed the
current project setup. Revisit if automated tests are introduced project-wide.