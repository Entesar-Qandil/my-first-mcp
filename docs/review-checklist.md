# Peer Review – Week 4 Security Hardening

## Project

`my-first-mcp`

## Peer Reviewer

Malak Qandil

## Review Date

August 13, 2026

---

## 1. Review Checklist

* [done] Zod schemas and input validation reviewed
* [done] Error handling reviewed
* [done] Secrets protection reviewed
* [done] File path protection reviewed
* [done] Network host allowlist reviewed
* [done] Network request timeout reviewed
* [done] Output limits and truncation reviewed
* [done] README/demo path reviewed
* [done] Three P0 tools demonstrated
* [done] Invalid input rejection demonstrated

---

## 2. Demo Reviewed

The following P0 tools were exercised during the peer review:

* `add_task`
* `list_tasks`
* `complete_task`

The reviewer also exercised invalid inputs to verify that validation and error handling behaved as expected.

---

## 3. Tool-Level Review Notes

### 3.1 `add_task` — Successful Call

**Input:**

```json
{
  "title": "Review MCP security",
  "description": "Test the hardened task tool"
}
```

**Observed result:**

The server accepted the request and returned the newly created task with a generated ID and `open` status.

**Reviewer result:** Passed.

### 3.2 `list_tasks` — Successful Call

**Input:**

```json
{}
```

**Observed result:**

The server returned the stored tasks, including the task created during the review.

**Reviewer result:** Passed.

### 3.3 `complete_task` — Successful Call

**Input:**

```json
{
  "id": "2"
}
```

**Observed result:**

The server returned the task with ID `2` and changed its status to `completed`.

**Reviewer result:** Passed.

### 3.4 `add_task` — Invalid Input

**Input:**

```json
{
  "title": "",
  "description": "Testing invalid input"
}
```

**Observed result:**

The MCP Inspector rejected the request because the `title` value failed the Zod minimum-length validation.

**Reviewer result:** Rejected as expected.

### 3.5 `complete_task` — Invalid Task ID

**Input:**

```json
{
  "id": "999999"
}
```

**Observed result:**

The tool returned the short actionable error:

`Could not complete the task. Check the task ID and try again.`

No raw stack trace was returned to the model.

**Reviewer result:** Rejected as expected.

### 3.6 `greet` — Overly Long Input

**Input:**

A `name` value longer than 100 characters was submitted.

**Observed result:**

The MCP Inspector rejected the request with:

`Input validation error: Invalid arguments for tool greet: name: Too big: expected string to have <=100 characters`

**Reviewer result:** Rejected as expected.

---

## 4. Security Controls Reviewed

The following security controls were reviewed during the peer review:

* Zod input validation and length limits.
* File path protection against path traversal.
* External network host allowlisting.
* Network request timeouts.
* Output limits and truncation messages.
* Short, actionable tool-facing errors.
* `.gitignore` protection for environment files.
* `.env.example` containing placeholders only.
* Repository checked for accidental API keys or secrets.
* `SECURITY.md` documenting the main security controls.

---

## 5. What Worked

The three P0 tools (`add_task`, `list_tasks`, and `complete_task`) were exercised successfully.

The reviewer confirmed that valid tool calls returned the expected results.

Invalid input was rejected by Zod validation.

An invalid task ID was handled with a short actionable error instead of exposing a raw stack trace.

File access is protected against path traversal.

External network requests use an explicit host allowlist and timeout.

Tool outputs are limited to avoid unnecessarily large responses.

`.gitignore` protects environment files, and `.env.example` contains placeholders only.

No accidental API keys or secrets were found in the repository.

`SECURITY.md` documents the main security controls.

---

## 6. Issues Found

1. The README and demo instructions should remain synchronized with the current implementation.
2. Future tools should follow the same validation and security patterns.
3. Documentation should be updated whenever the available tools or demo flow changes.

---

## 7. Recommended Fixes

* Keep the existing Zod validation limits.
* Continue protecting file access against path traversal.
* Keep the network host allowlist and request timeout.
* Continue avoiding secrets and API keys in the repository.
* Keep tool-facing error messages short and actionable.
* Update the README whenever the demo flow or tool set changes.
* Apply the same security patterns to future tools.

---

## 8. Action Items

| Action Item                                      | Owner          | Due Date      | Status |
| ------------------------------------------------ | -------------- | ------------- | ------ |
| Keep current validation and security controls    | Entesar Qandil | End of Week 4 | Done   |
| Verify the three P0 tools after hardening        | Malak Qandil   | End of Week 4 | Done   |
| Confirm invalid-input rejection in Inspector     | Malak Qandil   | End of Week 4 | Done   |
| Keep README/demo instructions synchronized       | Entesar Qandil | End of Week 4 | Done   |
| Apply the same security patterns to future tools | Entesar Qandil | End of Week 4 | Done   |

---

## 9. Peer Feedback

### What Worked

The project demonstrates good basic security hardening. Input validation, file path protection, network allowlisting, timeouts, output limits, and secrets protection were implemented and reviewed successfully.

The three P0 tools were exercised and returned the expected results for valid calls.

Invalid inputs were rejected by the validation layer, and invalid task IDs produced short actionable errors.

### Issues Found

The main area to keep improving is documentation and keeping the README and demo instructions synchronized with the current implementation.

Future tools should follow the same validation and security patterns.

### Recommended Fixes

Keep the existing validation and security controls in place.

Continue protecting file access and network requests.

Keep secrets out of the repository.

Update the README whenever the tools or demo flow changes.

---

## 10. Review Outcome

The Week 4 security hardening was reviewed with peer reviewer Malak Qandil.

The three P0 tools were exercised:

* `add_task`
* `list_tasks`
* `complete_task`

The review also included invalid-input testing and verification of security controls.

The documented follow-up items are focused mainly on keeping the README and demo documentation synchronized with the implementation.

**Peer reviewer:** Malak Qandil

**Review status:** Completed

**Project status:** Ready to move forward after the documented follow-up items are addressed.
