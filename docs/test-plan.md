# Manual Test Plan

| id | tool | setup | input | expected | result | evidence |
|---|---|---|---|---|---|---|
| TC-01 | add_task | Reset `data/todos.json` to the known fixture state. Use `examples/addTask.json`. | `{"title":"Finish MCP Week 3 task","description":"Test adding a task through MCP Inspector"}` | Tool accepts the input, creates a new task, returns the created task, and persists it to `data/todos.json`. | | |
| TC-02 | add_task | Use MCP Inspector with the server running. | `{"title":"","description":"Invalid empty title"}` | Input is rejected by Zod validation because `title` must contain at least 1 character. No task is created. | | |
| TC-03 | list_tasks | Reset `data/todos.json` to the known fixture state. Use `examples/listTasks.json`. | `{}` | Tool returns the tasks from `data/todos.json` and returns a valid JSON response. | | |
| TC-04 | list_tasks | Use MCP Inspector with the server running. | `null` | Input is rejected because `list_tasks` requires an object input. | | |
| TC-05 | complete_task | Reset `data/todos.json` so task ID `1` exists. Use `examples/completeTask.json`. | `{"id":"1"}` | Tool finds the task, marks it as completed, returns the updated task, and persists the change to `data/todos.json`. | | |
| TC-06 | complete_task | Use MCP Inspector with the server running. | `{"id":""}` | Input is rejected by Zod validation because `id` must contain at least 1 character. No task is modified. | | |
| TC-07 | list_tasks | Temporarily replace `data/todos.json` with an empty task array, then restore the fixture after the test. | `{}` | Tool returns an empty `items` array and the message `No tasks found.` | | |
| TC-08 | get_post | Simulate offline/timeout by blocking or disabling the allowed network request. Restore normal network access after the test. | `{"id":1}` | The network request fails or times out, and the tool returns the short actionable error: `Could not fetch the post. Check the post ID and try again.` | | |
