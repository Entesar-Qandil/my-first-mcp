import * as z from "zod/v4";

// Tool: complete_task
export const completeTaskInputSchema = z.object({
  taskId: z
    .string()
    .min(1)
    .max(100)
    .describe("The unique ID of the task to mark as completed"),
});