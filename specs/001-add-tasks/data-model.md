# Data Model: Add Tasks

## Task

Represents one task created by the user and shown in the current task list.

| Field | Type | Rules |
|---|---|---|
| `id` | Integer | Unique among tasks created during the current page session; generated when a valid submission is accepted. |
| `description` | String | Required after trimming; stores the trimmed user-entered description. |

## Collection and Relationships

- The page maintains an ordered in-memory collection of Task records.
- Tasks have no relationships to users, projects, or other entities in this feature.
- Equal descriptions do not make records duplicates; each accepted submission creates a distinct
  Task with its own identifier.
- New tasks are appended after existing tasks.

## Validation Rules

1. Trim leading and trailing whitespace before validating or storing the description.
2. Reject a description whose trimmed value is empty; do not create a Task or change the task list.
3. For valid input, create exactly one Task with the trimmed description and a session-unique ID.
4. Render the description as text so user content is not interpreted as markup.

## State Transitions

| Current state | Event | Result |
|---|---|---|
| Input contains blank or whitespace-only text | Add submitted | Keep task collection unchanged; retain input and show validation guidance. |
| Input contains a non-empty trimmed description | Add submitted | Append one Task; clear input and validation feedback; show the new item without reload. |
| Page is reloaded | Browser reload | Start with an empty in-memory task collection. |