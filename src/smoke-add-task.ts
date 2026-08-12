import { addTask } from "./lib/tasks.js";

const task = await addTask(
  "Test new task",
  "Testing add_task Week 3",
);

console.log(task);