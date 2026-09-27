"use strict";

const tasks = [];
let nextTaskId = 1;

function renderTasks(taskList) {
  taskList.replaceChildren();

  for (const task of tasks) {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.classList.toggle("is-completed", task.completed);
    taskItem.dataset.taskId = String(task.id);

    const taskRow = document.createElement("div");
    taskRow.className = "task-row";

    if (task.isEditing) {
      const editContent = document.createElement("div");
      editContent.className = "task-edit-content";

      const editableText = document.createElement("input");
      editableText.className = "task-editable-text";
      editableText.type = "text";
      editableText.setAttribute("role", "textbox");
      editableText.setAttribute("aria-label", `Edit task text: ${task.description}`);
      editableText.setAttribute("aria-describedby", `task-feedback-${task.id}`);
      editableText.dataset.action = "edit-text";
      if (task.validationMessage) {
        editableText.setAttribute("aria-invalid", "true");
      }
      editableText.value = task.draftDescription;

      const feedback = document.createElement("p");
      feedback.className = "task-feedback";
      feedback.id = `task-feedback-${task.id}`;
      feedback.setAttribute("role", "status");
      feedback.setAttribute("aria-live", "polite");
      feedback.textContent = task.validationMessage;

      editContent.append(editableText, feedback);

      const actions = document.createElement("div");
      actions.className = "task-actions";

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "task-action task-delete-button";
      deleteButton.dataset.action = "delete";
      deleteButton.setAttribute("aria-label", `Delete task: ${task.description}`);
      deleteButton.title = "Delete task";
      deleteButton.textContent = "×";

      const completeButton = document.createElement("button");
      completeButton.type = "button";
      completeButton.className = "task-action task-complete-button";
      completeButton.dataset.action = "toggle-complete";
      completeButton.setAttribute("aria-pressed", String(task.completed));
      completeButton.setAttribute(
        "aria-label",
        task.completed ? "Mark task incomplete" : "Mark task complete",
      );
      completeButton.title = task.completed ? "Mark incomplete" : "Mark complete";
      completeButton.textContent = "✓";

      const exitButton = document.createElement("button");
      exitButton.type = "button";
      exitButton.className = "task-action task-exit-button";
      exitButton.dataset.action = "exit-edit";
      exitButton.textContent = "Exit";

      actions.append(deleteButton, completeButton, exitButton);
      taskRow.append(editContent, actions);
    } else {
      const taskText = document.createElement("span");
      taskText.className = "task-text";
      taskText.textContent = task.description;

      const completionState = document.createElement("span");
      completionState.className = "task-state";
      completionState.textContent = task.completed ? "Complete" : "Incomplete";

      const editButton = document.createElement("button");
      editButton.type = "button";
      editButton.className = "task-action task-edit-button";
      editButton.dataset.action = "edit";
      editButton.setAttribute("aria-label", `Edit task: ${task.description}`);
      editButton.textContent = "Edit";

      taskRow.append(taskText, completionState, editButton);
    }

    taskItem.append(taskRow);
    taskList.append(taskItem);
  }
}

function initializeTaskApp() {
  const taskForm = document.querySelector("#task-form");
  const taskDescription = document.querySelector("#task-description");
  const taskList = document.querySelector("#task-list");
  const taskFeedback = document.querySelector("#task-feedback");

  if (!taskForm || !taskDescription || !taskList || !taskFeedback) {
    return;
  }

  taskList.addEventListener("click", (event) => {
    const actionButton = event.target.closest("button[data-action]");
    if (!actionButton) {
      return;
    }

    const taskItem = actionButton.closest("li[data-task-id]");
    const task = tasks.find((item) => String(item.id) === taskItem?.dataset.taskId);
    if (!task) {
      return;
    }

    if (actionButton.dataset.action === "edit") {
      task.isEditing = true;
      task.draftDescription = task.description;
      task.validationMessage = "";
      renderTasks(taskList);
      taskList.querySelector(`[data-task-id="${task.id}"] [data-action="edit-text"]`).focus();
      return;
    }

    if (actionButton.dataset.action === "toggle-complete") {
      task.completed = !task.completed;
      renderTasks(taskList);
      taskList.querySelector(
        `[data-task-id="${task.id}"] [data-action="toggle-complete"]`,
      ).focus();
      return;
    }

    if (actionButton.dataset.action === "delete") {
      const taskIndex = tasks.findIndex((item) => item.id === task.id);
      tasks.splice(taskIndex, 1);
      renderTasks(taskList);

      const nextTask = tasks[Math.min(taskIndex, tasks.length - 1)];
      if (nextTask) {
        const nextAction = nextTask.isEditing ? "edit-text" : "edit";
        taskList.querySelector(
          `[data-task-id="${nextTask.id}"] [data-action="${nextAction}"]`,
        ).focus();
      } else {
        taskDescription.focus();
      }
      return;
    }

    if (actionButton.dataset.action === "exit-edit") {
      const description = task.draftDescription.trim();
      if (!description) {
        task.validationMessage = "Enter a task description before exiting.";
        renderTasks(taskList);
        const editableText = taskList.querySelector(
          `[data-task-id="${task.id}"] [data-action="edit-text"]`,
        );
        editableText.focus();
        return;
      }

      task.description = description;
      task.draftDescription = "";
      task.validationMessage = "";
      task.isEditing = false;
      renderTasks(taskList);
      taskList.querySelector(`[data-task-id="${task.id}"] [data-action="edit"]`).focus();
    }
  });

  taskList.addEventListener("input", (event) => {
    const editableText = event.target.closest('[data-action="edit-text"]');
    if (!editableText) {
      return;
    }

    const taskItem = editableText.closest("li[data-task-id]");
    const task = tasks.find((item) => String(item.id) === taskItem?.dataset.taskId);
    if (!task) {
      return;
    }

    task.draftDescription = editableText.value;
    if (task.validationMessage && task.draftDescription.trim()) {
      task.validationMessage = "";
      editableText.removeAttribute("aria-invalid");
      taskItem.querySelector(".task-feedback").textContent = "";
    }
  });

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const description = taskDescription.value.trim();
    if (!description) {
      taskFeedback.textContent = "Enter a task description.";
      taskDescription.setAttribute("aria-invalid", "true");
      taskDescription.focus();
      return;
    }

    const task = {
      id: nextTaskId,
      description,
      completed: false,
      isEditing: false,
      draftDescription: "",
      validationMessage: "",
    };
    nextTaskId += 1;
    tasks.push(task);

    renderTasks(taskList);
    taskDescription.value = "";
    taskDescription.removeAttribute("aria-invalid");
    taskFeedback.textContent = "";
    taskDescription.focus();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeTaskApp, { once: true });
} else {
  initializeTaskApp();
}