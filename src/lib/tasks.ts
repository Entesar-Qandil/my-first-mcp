import { readDataFile, writeDataFile } from "./files.js";
import { tasksSchema, type Task } from "../schemas/task.js";

export async function loadTasks(): Promise<Task[]> {
  const rawFile = await readDataFile("todos.json");

  const parsedJson: unknown = JSON.parse(rawFile);

  return tasksSchema.parse(parsedJson);
}

export async function addTask(
  title: string,
  description: string,
): Promise<Task> {
  const tasks = await loadTasks();

  const nextId =
    tasks.length === 0
      ? "1"
      : String(
          Math.max(...tasks.map((task) => Number(task.id))) + 1,
        );

  const newTask: Task = {
    id: nextId,
    title,
    description,
    status: "open",
  };

  const updatedTasks = [...tasks, newTask];

  await writeDataFile(
    "todos.json",
    JSON.stringify(updatedTasks, null, 2),
  );

  return newTask;
}

export async function completeTask(taskId: string): Promise<Task> {
  const tasks = await loadTasks();

  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    throw new Error(`Task with id ${taskId} not found`);
  }

  const completedTask: Task = {
    ...task,
    status: "completed",
  };

  const updatedTasks = tasks.map((item) =>
    item.id === taskId ? completedTask : item,
  );

  await writeDataFile(
    "todos.json",
    JSON.stringify(updatedTasks, null, 2),
  );

  return completedTask;
}