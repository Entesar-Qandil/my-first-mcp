# Security Policy

## Supported Version

This repository currently supports version 0.1.0.

## Reporting a Security Issue

If you discover a security issue in this repository, please report it to:

Mjaradat@nextflows.ai

Please do not publicly disclose the issue before it has been reviewed.

## Security Hardening

This project includes the following security mitigations:

- Zod input validation with string length limits and required values.
- File path resolution and path traversal protection.
- Network host allowlisting for external API requests.
- 8-second timeouts for network requests.
- Output limits to prevent excessively large responses.
- Clear tool errors without exposing raw stack traces to the model.
- Secrets are not required by this project, and .env and .env.local are ignored by Git.
