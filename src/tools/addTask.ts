import { McpServer } from "@modelcontextprotocol/server";
import { addTaskInputSchema } from "../schemas/addTask.js";

export function registerAddTaskTool(server: McpServer) {
  server.registerTool(
    "add_task",
    {
      description: "Create a new task with a title and optional description",
      inputSchema: addTaskInputSchema,
    },
    async (input) => {
      // Week 2: stub only — real task creation will be added in Week 3
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ok: true,
                stub: true,
                tool: "add_task",
                input,
              },
              null,
              2,
            ),
          },
        ],
      };
    },
  );
}