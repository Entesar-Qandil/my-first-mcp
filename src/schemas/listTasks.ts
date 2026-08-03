import * as z from "zod/v4";

// Tool: list_tasks
export const listTasksInputSchema = z.object({
  status: z
    .enum(["open", "completed", "all"])
    .optional()
    .describe("Filter tasks by status; defaults to all tasks"),

  limit: z
    .number()
    .int()
    .positive()
    .max(50)
    .optional()
    .describe("Maximum number of tasks to return; defaults to 20"),
});