import { McpServer } from "@modelcontextprotocol/server";
import { listTasksInputSchema } from "../schemas/listTasks.js";

export function registerListTasksTool(server: McpServer) {
  server.registerTool(
    "list_tasks",
    {
      description: "List tasks, optionally filtered by status",
      inputSchema: listTasksInputSchema,
    },
    async (input) => {
      // Week 2: stub only — real task data will be added in Week 3
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ok: true,
                stub: true,
                tool: "list_tasks",
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