import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { registerAddTaskTool } from "./tools/addTask.js";
import { registerListTasksTool } from "./tools/listTasks.js";
import { registerCompleteTaskTool } from "./tools/completeTask.js";

function createServer(): McpServer {
  const server = new McpServer({
    name: "my-first-mcp",
    version: "0.2.0",
  });

  registerAddTaskTool(server);
  registerListTasksTool(server);
  registerCompleteTaskTool(server);

  return server;
}

void serveStdio(createServer);
console.error("my-first-mcp MCP server running on stdio");