# my-first-mcp

A small Model Context Protocol (MCP) server built with TypeScript.

## Requirements

- Node.js 22 or newer
- npm
- MCP Inspector

## Installation

Run:

npm install

## Run the MCP Server

Run:

npm run dev

The server communicates over standard input/output (stdio).

## Available Tools

- greet
- get_post
- read_expenses
- list_tasks
- add_task
- complete_task

## Example Inputs

Example files are available in the `examples` directory:

- addTask.json
- listTasks.json
- completeTask.json

Example add_task input:

{
  "title": "Finish MCP Week 3 task",
  "description": "Test adding a task through MCP Inspector"
}

Example complete_task input:

{
  "id": "1"
}

## Data

Task data is stored in:

data/todos.json

Expense data is stored in:

data/expenses.json

Reset the task fixture after testing with:

git restore data/todos.json

## Security

The server includes:

- Zod input validation
- Protection against whitespace-only task titles
- File path protection
- Network host allowlisting
- Network timeouts
- Limited tool output
- Short actionable errors

See SECURITY.md for more information.

## MCP Inspector

Use:

Command: npx

Arguments: tsx src/index.ts

## Manual Test Evidence

See:

- docs/test-plan.md
- docs/evidence/

## Troubleshooting

Check Node.js:

node --version

Check npm:

npm --version

If add_task rejects a title, make sure it is not empty or only spaces.

If complete_task fails, make sure the task ID exists in data/todos.json.

## Project Structure

my-first-mcp/
  data/
  docs/
  examples/
  src/
  package.json
  package-lock.json
  SECURITY.md
  README.md

## License

This project is for educational purposes.