# Data Model: Galaxy Theme

## Application Data

This visual feature introduces no new task fields and does not modify the existing Task entity or
task collection.

## Theme Selection State

| State | Representation | Lifetime | Effect |
|---|---|---|---|
| Default selected | Checked native Default radio control | Current document; initial state on each reload | Existing default presentation; no task behavior changes. |
| Galaxy selected | Checked native Galaxy radio control | Current document only | CSS changes visual tokens and task presentation; task records and task workflow remain unchanged. |

Theme selection is presentation state only. Switching it MUST NOT change task descriptions,
completion, edit mode, edit drafts, validation messages, or task ordering.