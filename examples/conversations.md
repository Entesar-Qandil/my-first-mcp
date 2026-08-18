\# Example Conversations



These examples show how a person can use the MCP server together with a model.



\## Conversation A — List Tasks



\### User prompt



> What tasks do I currently have?



\### Expected tool call



1\. `list\_tasks`

&#x20;  - Arguments: `{}`



\### Good final answer



> You currently have one task: "Finish MCP assignment", and it is open.



\---



\## Conversation B — Add a Task



\### User prompt



> Add a task called "Review Week 5 README" with the description "Check the README before submission."



\### Expected tool call



1\. `add\_task`

&#x20;  - Arguments:

&#x20;    ```json

&#x20;    {

&#x20;      "title": "Review Week 5 README",

&#x20;      "description": "Check the README before submission."

&#x20;    }

&#x20;    ```



\### Good final answer



> Done. I added the task "Review Week 5 README."



\---



\## Conversation C — Complete a Task



\### User prompt



> Mark task 1 as completed.



\### Expected tool call



1\. `complete\_task`

&#x20;  - Arguments:

&#x20;    ```json

&#x20;    {

&#x20;      "id": "1"

&#x20;    }

&#x20;    ```



\### Good final answer



> Done. Task 1 has been marked as completed.

