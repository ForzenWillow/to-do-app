# Research: Galaxy Theme

## CSS-Only Theme Selection

**Decision**: Add a labeled native radio group for Default and Galaxy in `index.html`, with Default
checked initially. Scope Galaxy styles using CSS `:has()` selectors under the app root; do not add
theme JavaScript or persistent storage.

**Rationale**: A native checked state provides keyboard-operable theme selection without changing
the app's task handlers or data model. The user explicitly requests a CSS-only visual change and
the spec says theme selection resets on reload.

**Alternatives considered**: JavaScript-managed classes or local storage were rejected because
they add behavior/state beyond the visual-only requirement. A select menu is also viable, but the
two-option radio group exposes both choices directly.

## Gradient Palette and Task Border

**Decision**: Define theme-scoped CSS custom properties for a small range of deep violet, plum,
purple, lavender, and readable foreground colors. Use layered gradients for major surfaces and a
separate animated multi-stop border layer for each task item.

**Rationale**: Tokens keep the palette coherent while providing multiple blended colors. A
separate border layer can animate without moving task contents or changing task dimensions.

**Alternatives considered**: Applying gradients directly to task content backgrounds would compete
with task text and controls. A fixed solid border would fail the shifting-gradient requirement.

## Motion and Contrast

**Decision**: Use a slow border-only animation; disable continuous movement under
`prefers-reduced-motion: reduce` while retaining a static gradient. Target WCAG AA contrast for
text and meaningful control boundaries on each relevant surface.

**Rationale**: Restricting motion to the border preserves legibility and keeps task contents
stable. Reduced-motion support respects user preferences without removing the requested theme.
Contrast criteria make readability reviewable rather than subjective.

**Alternatives considered**: Animating the entire page or task surface was rejected as distracting
and potentially harmful to readability. Removing all gradients for reduced motion was rejected
because the visual theme remains required.

## Regression Validation

**Decision**: Validate theme switching and CSS presentation in the browser, then run existing task
flows with Galaxy active: add, valid edit/save, invalid edit, completion toggle, and delete.

**Rationale**: CSS-only changes can still cause clipping, obscured controls, or state-specific
contrast regressions. Testing the existing actions confirms that styling does not alter the task
workflow.

**Alternatives considered**: Static CSS inspection alone cannot validate interactive task states,
layout at narrow widths, or actual foreground/background contrast.