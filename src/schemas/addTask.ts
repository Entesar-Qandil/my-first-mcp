import * as z from "zod/v4";

// Tool: add_task
export const addTaskInputSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(200)
    .describe("The title of the task to create"),

  description: z
    .string()
    .max(500)
    .optional()
    .describe("Optional details about the task"),
});