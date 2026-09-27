# Implementation Plan: Galaxy Theme

**Branch**: `003-galaxy-theme` | **Date**: 2026-09-27 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/003-galaxy-theme/spec.md`

## Summary

Add a selectable Galaxy appearance using a native theme radio control and CSS-only theme-state
selectors. Layer blended purple gradients across the page and task surfaces, animate a multi-shade
gradient border on each task, and preserve readable foreground/surface contrast. Keep all task
logic, data, and event handlers unchanged; use reduced-motion rules to stop continuous border
animation when requested.

## Technical Context

**Language/Version**: HTML and CSS; current evergreen browsers

**Primary Dependencies**: None

**Storage**: No new application storage; selected radio state lasts only until page reload

**Testing**: Browser visual, accessibility, reduced-motion, responsive, and task-regression checks;
no automated test harness exists

**Target Platform**: Desktop and mobile web browsers that support CSS `:has()` selectors and
`prefers-reduced-motion`

**Project Type**: Static single-page web application

**Performance Goals**: Theme selection applies immediately; task border motion remains smooth and
does not block task actions

**Constraints**: CSS-only visual state; no JavaScript behavior or task-data changes; keep the
existing default theme; use CSS variables for theme tokens; respect reduced-motion preferences;
maintain usable desktop/mobile layouts

**Scale/Scope**: One theme selector, page-level theme surfaces, and per-task border/presentation

## Constitution Check

| Principle | Gate | Status |
|---|---|---|
| Specification-first development | Theme states and visual/behavior acceptance criteria are defined in `spec.md`. | PASS |
| Responsible AI use | Student author reviews and can explain all markup and styling changes. | PASS |
| Incremental, verifiable delivery | Add the selector and theme surfaces, then task borders, then validate contrast, motion, responsiveness, and task regressions. | PASS |
| Meaningful version control | Keep selector markup, theme styling, and verified refinements in coherent descriptive commits. | PASS |
| Documented decisions and simplicity | Use one native radio group plus CSS selectors; do not add a framework or alter task logic. | PASS |
| Technology and quality constraints | Stay within HTML and CSS, preserve semantic controls, and verify common viewport usability. | PASS |

**Gate Result**: PASS. The feature is a presentation-only extension of the static application and
does not conflict with the constitution.

**Post-Design Gate (Phase 1)**: PASS. The theme adds no JavaScript behavior, task-data fields,
backend, database, or dependencies. CSS selectors control presentation only; contrast and
reduced-motion requirements are included in the browser validation plan.

## Project Structure

### Documentation (this feature)

```text
specs/003-galaxy-theme/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    └── ui.md
```

### Source Code

```text
index.html    # Native theme selector only; existing task form and list remain intact
styles.css    # Theme state selectors, palette tokens, gradients, task borders, and motion rules
app.js        # No changes planned; task behavior remains the regression baseline
```

**Structure Decision**: Keep theme choice in a labeled native radio group inside the existing page
and scope visual state with CSS `:has(#theme-galaxy:checked)` selectors under `#task-app`. The
default radio is checked on load, so reload restores the existing default appearance. The browser
updates the checked state without application JavaScript or task-model changes.

## Styling Approach

### Palette and Surfaces

- Define Galaxy-only CSS custom properties for deep violet, dark plum, mid-purple, lavender, and
  cool near-white text.
- Apply layered multi-stop gradients to the page background, header accents, task panel, selector,
  inputs, and controls; avoid replacing the interface with one flat purple color.
- Keep content surfaces darker or lighter than foreground text as appropriate. Reserve saturated
  purple for borders, selected controls, focus accents, and decoration.

### Shifting Task Border

- Give each `.task-item` a positioned gradient-border layer with multiple purple stops.
- Animate background position or angle slowly so visible border hues shift over time while task
  contents remain stationary and above the border layer.
- Preserve rounded corners, existing row sizing, and clickable controls; the gradient layer must
  not intercept pointer events.
- In `prefers-reduced-motion: reduce`, disable continuous animation while retaining the static
  multi-stop gradient border.

### Accessibility and Contrast

- Keep the theme selector as a visible, labeled, keyboard-operable native radio group; expose
  selected state through native control semantics and a visible focus indicator.
- Target WCAG AA contrast: at least 4.5:1 for normal text and 3:1 for large text and meaningful
  control boundaries against every Galaxy surface where they appear.
- Do not use hue alone to communicate selected theme, task completion, validation, or focus; retain
  existing labels, pressed states, shapes, and text treatments.
- Verify task text, editor text, buttons, status labels, error guidance, and focus outlines in both
  normal and edit states.

## Risks

- CSS `:has()` support is required for CSS-only theme switching. The target is current evergreen
  browsers; verify supported project browsers before implementation.
- Gradient motion can distract or reduce readability if too fast or too visually busy. Use a slow,
  restrained transition, keep the interior surface stable, and honor reduced motion.
- A layered gradient border can cover content, clip at rounded corners, or intercept clicks if
  stacking and pointer behavior are wrong. Validate task controls in normal and edit states.
- Purple gradients may produce low contrast at some color-stop combinations. Check each actual
  text/control-on-surface pairing rather than relying on palette-level impressions.
- CSS state selectors must be scoped so default styles remain unchanged when Galaxy is not selected.

## Assumptions

- The existing default appearance remains selected on page load; theme choice is not persisted.
- A native radio group with Default and Galaxy options is acceptable as the theme-selection UI.
- Modern target browsers support CSS relational `:has()` selectors and reduced-motion media queries.
- Theme switching may occur while tasks are being edited and changes only presentation; task data
  and all in-progress task states remain in the existing JavaScript model.
- No new imagery or external assets are needed; the requested space aesthetic is delivered with
  CSS gradients and color treatments only.

## Complexity Tracking

No constitution violations or additional architectural complexity require justification.