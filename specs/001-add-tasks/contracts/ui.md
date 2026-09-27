# UI Contract: Add Tasks

## Components

- **Task description input**: A text input with a persistent visible label. It accepts the task
  description and retains rejected text so the user can correct it.
- **Add button**: A submit button associated with the description input. Activating it submits the
  form without navigating away or refreshing the page.
- **Task list**: A semantic list showing each accepted task description as a separate item in
  submission order.
- **Feedback region**: A visible status area for validation guidance. Changes are announced to
  assistive technology without moving focus away from the input.

## Interaction Contract

1. Submitting an empty or whitespace-only value creates no list item, keeps the entered value, and
   displays guidance that a description is required.
2. Submitting a non-empty value trims surrounding whitespace, adds exactly one list item, clears
   the input and prior feedback, and leaves the user on the same page.
3. A later submission with the same description creates a separate list item.
4. The input remains labeled, the Add button is keyboard-operable, and task text is exposed as
   ordinary text rather than interpreted markup.

## Exclusions

The UI does not provide task editing, completion, deletion, filtering, sorting, or persistence
across reloads as part of this feature.