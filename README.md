# To-do list

A small single-page To-Do application built with HTML, CSS, and browser-native JavaScript.

## Run

Open `index.html` in a current web browser. No package installation, backend, database, or build
step is required.

Tasks are held in memory for the current page session and are cleared when the page is refreshed or
closed.

## Add Tasks

Enter a task description and select **Add**. Empty and whitespace-only descriptions are rejected;
surrounding whitespace is trimmed. Task descriptions are displayed as text.

## Edit Tasks

Select **Edit** on an existing task to rewrite its text. Select **Exit** to save non-empty text;
blank or whitespace-only edits remain unsaved until corrected. In edit mode, use the checkmark to
toggle completion or **X** to delete that task.

## Galaxy Theme

Use the **Appearance** options to switch between the default styling and Galaxy. Galaxy uses
blended purple gradients and shifting task borders. Reduced-motion preferences stop the border
animation while keeping its gradient. The default theme is selected again after reload.

## Feature Documentation

Specifications, implementation plans, task lists, and browser validation guides are in
[`specs/001-add-tasks/`](specs/001-add-tasks/), [`specs/002-edit-task/`](specs/002-edit-task/),
and [`specs/003-galaxy-theme/`](specs/003-galaxy-theme/).