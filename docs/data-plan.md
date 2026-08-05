# Week 3 Data Plan

## add_task

* **Source:** Local JSON file
* **Fixture path:** `./data/todos.json`
* **Auth:** none
* **Failure modes:** Empty file, invalid JSON, missing required task fields
* **Rate limits:** none
* **Example response:**

```json
{
  "id": "2",
  "title": "Finish MCP assignment",
  "description": "Complete Week 3 real data integration",
  "status": "open"
}
```

## list_tasks

* **Source:** Local JSON file
* **Fixture path:** `./data/todos.json`
* **Auth:** none
* **Failure modes:** Empty file, invalid JSON, missing or malformed task data
* **Rate limits:** none
* **Example response:**

```json
[
  {
    "id": "1",
    "title": "Finish MCP assignment",
    "description": "Complete Week 3 real data integration",
    "status": "open"
  }
]
```

## complete_task

* **Source:** Local JSON file
* **Fixture path:** `./data/todos.json`
* **Auth:** none
* **Failure modes:** Empty file, invalid JSON, task ID not found, malformed task data
* **Rate limits:** none
* **Example response:**

```json
{
  "id": "1",
  "title": "Finish MCP assignment",
  "description": "Complete Week 3 real data integration",
  "status": "completed"
}
```

# Data Source Decision

All three P0 tools use the local JSON fixture at `./data/todos.json`.

The project uses a local fixture instead of an external API so the Demo Day workflow works offline without authentication, API keys, network failures, or rate limits.
