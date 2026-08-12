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

  // --------------------------------
  // greet
  // --------------------------------

  server.registerTool(
    "greet",
    {
      description: "Say hello to someone by name",
      inputSchema: z.object({
        name: z.string().describe("The person's name to greet"),
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

  // --------------------------------
  // get_post
  // --------------------------------

  server.registerTool(
    "get_post",
    {
      description: "Get a post from an external API",
      inputSchema: z.object({
        id: z.number().int().positive().describe("The post ID"),
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
              text: "Failed to fetch or validate the post.",
            },
          ],
        };
      }
    },
  );

  // --------------------------------
  // read_expenses
  // --------------------------------

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

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                items: expenses.slice(0, 10),
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
              text: "Failed to read or validate expenses.",
            },
          ],
        };
      }
    },
  );

  // --------------------------------
  // list_tasks
  // --------------------------------

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

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                items: tasks.slice(0, 10),
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
              text: "Failed to load tasks.",
            },
          ],
        };
      }
    },
  );

  // --------------------------------
  // add_task
  // --------------------------------

  server.registerTool(
    "add_task",
    {
      description: "Create a new task and save it to the local data file",
      inputSchema: z.object({
        title: z
          .string()
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
              text: "Failed to create task.",
            },
          ],
        };
      }
    },
  );

  // --------------------------------
  // complete_task
  // --------------------------------

  server.registerTool(
    "complete_task",
    {
      description:
        "Mark a task as completed and save it to the local data file",

      inputSchema: z.object({
        id: z
          .string()
          .min(1)
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
              text: "Failed to complete task.",
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