# Threat Model

# Assets

* Local data files in `./data`
* Task data stored in `todos.json`
* Expense data stored in `expenses.json`
* API responses from JSONPlaceholder
* The local machine's filesystem

# Trust Boundaries

* Model → Tool arguments
* Tool → Filesystem
* Tool → External API (network)

# Top 5 Risks

1. Path traversal by trying to access files outside the `data` folder.
2. Invalid or malformed input sent to the tools.
3. Reading or returning very large responses.
4. Network request failures or invalid API responses.
5. Accidental exposure of sensitive project files.

# Mitigations This Week

* Restrict file access to the `data` directory only.
* Validate all inputs using Zod schemas.
* Limit returned lists and response size.
* Validate API responses before using them.
* Return clear error messages without exposing internal details.

# Out of Scope

This project does not use authentication, API keys, databases, or user accounts. These security features are outside the scope of this student project.
