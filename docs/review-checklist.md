\# Peer Review Checklist



\## Project



my-first-mcp



\## Peer Reviewer



Malak Qandil



\## Review Date



August 13, 2026



\## Review Checklist



\- \[x] Zod schemas and input validation reviewed

\- \[x] Error handling reviewed

\- \[x] Secrets protection reviewed

\- \[x] File path protection reviewed

\- \[x] Network host allowlist reviewed

\- \[x] Network timeout reviewed

\- \[x] Output limits reviewed

\- \[x] README/demo path reviewed

\- \[x] Three P0 tools demonstrated

\- \[x] Attack rejection demonstrated



\## What Worked



\- The three P0 tools, add\_task, list\_tasks, and complete\_task, were demonstrated successfully.

\- Zod validation correctly rejects invalid and overly long input.

\- File access is protected against path traversal.

\- External network requests use a host allowlist and timeout.

\- Tool errors shown to the model are short and actionable.

\- .gitignore and .env.example provide protection against accidentally committing secrets.

\- No accidental API keys or secrets were found in the repository.



\## Issues Found



\- The README/demo instructions should remain synchronized with the current project implementation.

\- Future tools should follow the same validation and security patterns.



\## Recommended Fixes



\- Keep the existing Zod validation limits.

\- Keep file path protection for future file tools.

\- Keep the network host allowlist and timeout.

\- Continue avoiding secrets in the repository.

\- Update the README whenever the demo flow or tool set changes.



\## Action Items



| Action | Owner | Due Date | Status |

|---|---|---|---|

| Keep current validation and security controls | Entesar Qandil | End of Week 4 | Done |

| Verify the three P0 tools after hardening | Malak Qandil | End of Week 4 | Done |

| Confirm attack rejection in Inspector | Malak Qandil | End of Week 4 | Done |

| Keep README/demo instructions up to date | Entesar Qandil | End of Week 4 | Done |



\## Peer Feedback



\### What Worked



The project demonstrates good basic security hardening. Input validation,

file path protection, network allowlisting, timeouts, output limits, and

secrets protection were implemented and demonstrated successfully.



\### Issues Found



The main area to keep improving is documentation and keeping the README and

demo instructions synchronized with the current implementation.



\### Recommended Fixes



Keep the existing security controls in place and update the documentation

whenever the tools or demo flow change.



\## Review Outcome



The Week 4 security hardening was reviewed with the peer. The P0 tools and

security controls were demonstrated, including rejection of invalid input.

The project is ready to move forward after the documented follow-up items.

