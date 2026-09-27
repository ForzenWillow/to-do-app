---
description: "Task list for Galaxy Theme implementation"
---

# Tasks: Galaxy Theme

**Input**: Design documents from `specs/003-galaxy-theme/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui.md`,
`quickstart.md`

**Tests**: Browser visual, accessibility, motion, responsive, and task-regression checks are
explicitly requested in the feature design. Use the scenarios in
`specs/003-galaxy-theme/quickstart.md`; do not add a test framework.

**Organization**: Tasks are grouped by user story. This feature changes presentation only and
does not modify `app.js` or task data.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Tasks touch separate files and can run in parallel after the stated prerequisites.
- **[Story]**: User-story tasks use `[US1]` through `[US3]` per `spec.md`.
- Every task includes its target file path.

## Path Conventions

- Application files are at the repository root: `index.html`, `styles.css`, and `README.md`.
- Feature design and validation documents are under `specs/003-galaxy-theme/`.

## Phase 1: Setup

**Purpose**: Capture the existing visual and behavior baseline before theme changes.

- [X] T001 [P] Record the default appearance, current task control behavior, and desktop/mobile layout in `specs/003-galaxy-theme/quickstart.md` before implementation.

---

## Phase 2: Foundational

**Purpose**: Add the CSS-only theme selection state without touching task behavior.

- [X] T002 Add a visible, labeled native Default/Galaxy radio group with Default checked by default in `index.html`.
- [X] T003 Add stable theme-control IDs and grouping semantics required by the CSS `:has()` selectors in `index.html`.

**Checkpoint**: The page exposes both theme choices accessibly, defaults to Default, and task data/handlers remain unchanged.

---

## Phase 3: User Story 1 - Use the Galaxy Theme (Priority: P1) MVP

**Goal**: Users can select Galaxy and see blended purple gradients throughout the interface and shifting multi-shade borders on every task.

**Independent Test**: Select Galaxy and confirm the page/panel surfaces use multi-stop purple gradients and every existing task has a visibly shifting purple gradient border, without a page reload.

### Tests for User Story 1

- [X] T004 [US1] Record default-theme appearance and selector behavior before CSS theme rules in `specs/003-galaxy-theme/quickstart.md`.

### Implementation for User Story 1

- [X] T005 [US1] Define scoped Galaxy CSS custom properties for deep violet, plum, purple, lavender, surfaces, text, controls, focus, and feedback colors in `styles.css`.
- [X] T006 [US1] Scope the Galaxy theme to `#task-app:has(#theme-galaxy:checked)` and style page background, header, task panel, selector, form, inputs, buttons, status labels, and feedback with blended gradients in `styles.css`.
- [X] T007 [P] [US1] Add a positioned multi-stop purple gradient border layer for `.task-item` that does not cover content or intercept pointer events in `styles.css`.
- [X] T008 [US1] Add a restrained shifting-border animation and disable continuous motion under `@media (prefers-reduced-motion: reduce)` while retaining the static gradient in `styles.css`.
- [X] T009 [US1] Verify Default/Galaxy selection, blended surface gradients, task border color shift, and default reset on reload; record outcomes in `specs/003-galaxy-theme/quickstart.md`.

**Checkpoint**: Galaxy is selectable, uses multiple purple gradient surfaces, and task borders visibly shift without changing layout or task behavior.

---

## Phase 4: User Story 2 - Keep Text Readable (Priority: P1)

**Goal**: Task content, controls, status, validation, selected theme, and focus remain legible in all relevant states.

**Independent Test**: Inspect Galaxy in normal, edit, invalid, completed, and focused states; verify text and meaningful control boundaries meet the design contrast thresholds.

### Tests for User Story 2

- [X] T010 [US2] Record Galaxy contrast/readability baselines for normal task text, form controls, and selector in `specs/003-galaxy-theme/quickstart.md` before contrast refinements.

### Implementation for User Story 2

- [X] T011 [US2] Refine Galaxy foreground, editor, button, status, validation, completion, and focus colors in `styles.css` to meet at least 4.5:1 normal-text and 3:1 large-text/control-boundary contrast against their actual adjacent surfaces.
- [X] T012 [P] [US2] Verify the theme selector and all task states with keyboard navigation and screen-reader-visible native radio semantics; record issues/results in `specs/003-galaxy-theme/quickstart.md`.
- [X] T013 [US2] Verify contrast for normal, edit, invalid, completed, and focused states and record measured pairings/results in `specs/003-galaxy-theme/quickstart.md`.

**Checkpoint**: Theme and task state remain distinguishable without relying on hue alone, and text/control contrast meets the specified thresholds.

---

## Phase 5: User Story 3 - Continue Managing Tasks (Priority: P1)

**Goal**: All existing task workflows continue to behave exactly as before with Galaxy selected, including while switching themes during edit.

**Independent Test**: In Galaxy, add, edit/save, reject an empty edit, toggle completion both ways, delete a task, and switch themes while a draft and validation message exist; confirm state and outcomes match the default theme.

### Tests for User Story 3

- [X] T014 [US3] Capture default-theme outcomes for add, edit/save, empty-edit rejection, completion toggle, and delete in `specs/003-galaxy-theme/quickstart.md` before running Galaxy regression checks.

### Implementation for User Story 3

- [X] T015 [US3] Exercise add, edit/save, empty-edit validation, completion toggle, and task-isolated delete with Galaxy active; record each result in `specs/003-galaxy-theme/quickstart.md` and make any required fixes CSS-only in `styles.css`.
- [X] T016 [US3] Switch Default/Galaxy while a task has an unsaved draft and while validation feedback is visible; verify draft, edit mode, validation, completion state, and task order are unchanged, then record results in `specs/003-galaxy-theme/quickstart.md`.

**Checkpoint**: Theme switching changes presentation only; all existing task data and actions remain unchanged.

---

## Phase 6: Polish and Cross-Cutting Concerns

**Purpose**: Verify responsive behavior, reduced motion, and document how to use the theme.

- [X] T017 [P] Verify at 320px and 1440px that the theme selector, task borders, task content, and all controls remain visible without clipping or overlap; record results in `specs/003-galaxy-theme/quickstart.md`.
- [X] T018 [P] Verify `prefers-reduced-motion` keeps the gradient border while stopping continuous animation; record results in `specs/003-galaxy-theme/quickstart.md`.
- [X] T019 [P] Document theme selection, default-on-reload behavior, contrast/accessibility, and reduced-motion support in `README.md`.
- [X] T020 [P] Review the final CSS for scoped theme selectors, duplicate/overridden rules, and unchanged default styling in `styles.css`.

---

## Dependencies and Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; captures default and existing behavior baselines.
- **Foundational (Phase 2)**: Depends on T001; creates the radio state CSS needs to distinguish themes.
- **User Story 1 (Phase 3)**: Depends on Phase 2; delivers the Galaxy palette, background, and task border.
- **User Story 2 (Phase 4)**: Depends on Galaxy surfaces from US1; validates and refines contrast/accessibility.
- **User Story 3 (Phase 5)**: Depends on the selectable theme and final core surfaces; checks task behavior and state preservation.
- **Polish (Phase 6)**: Depends on the theme and story checks; verifies viewport/motion support and docs.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Phase 2; core visual MVP.
- **User Story 2 (P1)**: Starts after User Story 1 because contrast must be checked against completed theme surfaces.
- **User Story 3 (P1)**: Starts after User Story 1; it is independent of the contrast refinements but should be completed before release.

### Within-Story Dependencies

- **US1**: T004 -> T005 and T006 in order; T007 can proceed in parallel with T006 after palette tokens are defined; T008 follows T007; T009 follows all visual work.
- **US2**: T010 -> T011 -> T013; T012 can run in parallel with T011 after theme controls exist.
- **US3**: T014 -> T015 and T016 in order after theme visual work.
- **Polish**: T017, T018, T019, and T020 touch separate concerns/files and can proceed in parallel after story checks.

## Parallel Execution Examples

### User Story 1

After T005 defines palette tokens, surface styling and task-border styling can be split across separate CSS sections in `styles.css`:

```text
T006 Style page and interface surfaces in styles.css
T007 Add the per-task gradient border layer in styles.css
```

### Polish

After user-story behavior and contrast checks are complete:

```text
T017 Verify responsive browser layouts and record results in quickstart.md
T018 Verify reduced-motion behavior and record results in quickstart.md
T019 Document Galaxy theme use in README.md
```

## Implementation Strategy

### MVP First

1. Complete setup and add the accessible theme selector.
2. Complete User Story 1: palette, gradient surfaces, and shifting task borders.
3. Validate the visual MVP immediately; do not treat it as release-ready until readability and task-regression stories pass.

### Incremental Delivery

1. Establish the CSS-only theme state and palette.
2. Add background/surface gradients and task border animation.
3. Verify contrast, focus, reduced motion, and responsive behavior.
4. Regression-test all existing task operations and theme switching during edits.
5. Document use and confirm default styling remains unchanged when Galaxy is not selected.

## Notes

- All implementation tasks are CSS/HTML or documentation; `app.js` and task data are intentionally unchanged.
- Browser checks use `specs/003-galaxy-theme/quickstart.md`; no test framework or dependency is added.
- Tasks marked `[P]` are parallel only after the dependencies stated above are complete.

## Phase 7: Convergence

- [X] T021 Consolidate Galaxy palette usage by applying declared custom properties to matching theme colors or removing unused tokens in `styles.css` per plan: CSS theme tokens (partial)