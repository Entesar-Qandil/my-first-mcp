# To-Do List MCP — Week 2 Design

 Pitch

The To-Do List MCP helps users organize and manage their daily tasks through simple, focused tools. It is designed for people who want to create, view, complete, search, and manage tasks through an MCP-compatible client. The MCP exposes a small set of clearly named tools that each perform one specific task action. The project will focus on a simple and reliable workflow that can be demonstrated without paid APIs or authentication.

# User & Demo Story

A user asks the MCP to add a task called “Finish MCP assignment”. The `add_task` tool creates the task and returns its details. The user then asks to see their current tasks, so `list_tasks` returns the available tasks. After finishing the assignment, the user asks to mark it as complete, and `complete_task` updates the task status and returns the completed task. The goal is to show a clear end-to-end task management workflow through MCP tools.

## Tool Inventory

| tool_name       | description (1 line)                                      | inputs              | output (shape)                                               | priority (P0/P1) |
| --------------- | --------------------------------------------------------- | ------------------- | ------------------------------------------------------------ | ---------------- |
| `add_task`      | Creates a new task with a title and optional description. | title, description? | Created task object with id, title, description, and status. | P0               |
| `list_tasks`    | Returns the user's current tasks and their statuses.      | none                | Array of task objects.                                       | P0               |
| `complete_task` | Marks a specific task as completed.                       | task_id             | Updated task object with completed status.                   | P0               |
| `get_task`      | Returns the details of one task by its ID.                | task_id             | Single task object.                                          | P1               |
| `delete_task`   | Deletes a specific task by its ID.                        | task_id             | Confirmation with deleted task ID.                           | P1               |
| `search_tasks`  | Searches tasks by a text query.                           | query               | Array of matching task objects.                              | P1               |

# Out of Scope

* User authentication and account management.
* Paid APIs or external paid services.
* Mobile or web user interfaces.
* Multi-user collaboration and shared task lists.

# Success Criteria

* [ ] `add_task` successfully creates a task and returns its task details.
* [ ] `list_tasks` returns tasks that were previously added.
* [ ] `complete_task` changes a task from open to completed and returns the updated task.

## Risks

1. **Risk:** The project may become too complex if too many task-management features are added.
   **Mitigation:** Keep the scope limited to the six tools listed above and avoid adding features outside the agreed design.

2. **Risk:** Tool schemas may be unclear or inconsistent, causing invalid inputs or confusing model behavior.
   **Mitigation:** Use focused Zod schemas with clear descriptions and validate tool inputs before implementing the handlers.

# Demo Day Scope

The three P0 tools — `add_task`, `list_tasks`, and `complete_task` — are the minimum working functionality required for the Demo Day. P1 tools may remain stubs if time is limited.
