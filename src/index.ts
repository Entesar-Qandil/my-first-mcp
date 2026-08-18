import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";

import { fetchJson } from "./lib/http.js";
import { loadExpenses } from "./lib/expenses.js";
import {
  addTask,
  completeTask,
  loadTasks,
} from "./lib/tasks.js";
import { postSchema } from "./schemas/post.js";

function createServer(): McpServer {
  const server = new McpServer({
    name: "my-first-mcp",
    version: "0.1.0",
  });

  server.registerTool(
    "greet",
    {
      description: "Say hello to someone by name",
      inputSchema: z.object({
        name: z
          .string()
          .min(1)
          .max(100)
          .describe("The person's name to greet"),
      }),
    },
    async ({ name }) => {
      return {
        content: [
          {
            type: "text",
            text: `Hello, ${name}!`,
          },
        ],
      };
    },
  );

  server.registerTool(
    "get_post",
    {
      description: "Get a post from an external API",
      inputSchema: z.object({
        id: z
          .number()
          .int()
          .positive()
          .describe("The post ID"),
      }),
    },
    async ({ id }) => {
      try {
        const rawData = await fetchJson(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
        );

        const post = postSchema.parse(rawData);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(post),
            },
          ],
        };
      } catch (error) {
        console.error(
          `[get_post] ${
            error instanceof Error ? error.message : String(error)
          }`,
        );

        return {
          content: [
            {
              type: "text",
              text: "Could not fetch the post. Check the post ID and try again.",
            },
          ],
        };
      }
    },
  );

  server.registerTool(
    "read_expenses",
    {
      description: "Read and validate expense data from the data directory",
      inputSchema: z.object({}),
    },
    async () => {
      try {
        const expenses = await loadExpenses();

        if (expenses.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  items: [],
                  message: "No expenses found.",
                }),
              },
            ],
          };
        }

        const limitedExpenses = expenses.slice(0, 10);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                items: limitedExpenses,
                truncated: expenses.length > 10,
                message:
                  expenses.length > 10
                    ? "Only the first 10 expenses are shown."
                    : undefined,
              }),
            },
          ],
        };
      } catch (error) {
        console.error(
          `[read_expenses] ${
            error instanceof Error ? error.message : String(error)
          }`,
        );

        return {
          content: [
            {
              type: "text",
              text: "Could not read expenses. Check the data file and try again.",
            },
          ],
        };
      }
    },
  );

  server.registerTool(
    "list_tasks",
    {
      description: "List tasks from the local todos data",
      inputSchema: z.object({}),
    },
    async () => {
      try {
        const tasks = await loadTasks();

        if (tasks.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  items: [],
                  message: "No tasks found.",
                }),
              },
            ],
          };
        }

        const limitedTasks = tasks.slice(0, 10);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                items: limitedTasks,
                truncated: tasks.length > 10,
                message:
                  tasks.length > 10
                    ? "Only the first 10 tasks are shown."
                    : undefined,
              }),
            },
          ],
        };
      } catch (error) {
        console.error(
          `[list_tasks] ${
            error instanceof Error ? error.message : String(error)
          }`,
        );

        return {
          content: [
            {
              type: "text",
              text: "Could not load tasks. Check the data file and try again.",
            },
          ],
        };
      }
    },
  );

  server.registerTool(
    "add_task",
    {
      description: "Create a new task and save it to the local data file",
      inputSchema: z.object({
        title: z
          .string()
          .trim()
          .min(1)
          .max(200)
          .describe("The title of the task"),

        description: z
          .string()
          .max(500)
          .describe("The description of the task"),
      }),
    },
    async ({ title, description }) => {
      try {
        const task = await addTask(title, description);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(task),
            },
          ],
        };
      } catch (error) {
        console.error(
          `[add_task] ${
            error instanceof Error ? error.message : String(error)
          }`,
        );

        return {
          content: [
            {
              type: "text",
              text: "Could not create the task. Check the input and try again.",
            },
          ],
        };
      }
    },
  );

  server.registerTool(
    "complete_task",
    {
      description:
        "Mark a task as completed and save it to the local data file",

      inputSchema: z.object({
        id: z
          .string()
          .min(1)
          .max(100)
          .describe("The ID of the task to complete"),
      }),
    },
    async ({ id }) => {
      try {
        const task = await completeTask(id);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(task),
            },
          ],
        };
      } catch (error) {
        console.error(
          `[complete_task] ${
            error instanceof Error ? error.message : String(error)
          }`,
        );

        return {
          content: [
            {
              type: "text",
              text: "Could not complete the task. Check the task ID and try again.",
            },
          ],
        };
      }
    },
  );

  return server;
}

void serveStdio(createServer);

console.error("my-first-mcp MCP server running on stdio");