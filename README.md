## Week 2 – Design and Multi-Tool Server

During Week 2, the project was expanded from a single-tool MCP server into a multi-tool server skeleton.

The current P0 tools are:

* `add_task` — creates a new task.
* `list_tasks` — lists tasks and can filter them by status.
* `complete_task` — marks a task as completed.

The tools currently use stub handlers. Real data handling will be added during Week 3.

### Run the MCP Server

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The server uses the MCP stdio transport and should display:

```text
my-first-mcp MCP server running on stdio
```

The server then waits for MCP requests through standard input/output.
