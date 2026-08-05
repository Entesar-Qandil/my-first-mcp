import { McpServer } from "@modelcontextprotocol/server";
import { completeTaskInputSchema } from "../schemas/completeTask.js";

export function registerCompleteTaskTool(server: McpServer) {
  server.registerTool(
    "complete_task",
    {
      description: "Mark a task as completed using its unique task ID",
      inputSchema: completeTaskInputSchema,
    },
    async (input) => {
      // Week 2: stub only — real task update will be added in Week 3
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ok: true,
                stub: true,
                tool: "complete_task",
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