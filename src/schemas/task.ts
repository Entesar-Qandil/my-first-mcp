import * as z from "zod/v4";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  description: z.string().max(500),
  status: z.enum(["open", "completed"]),
});

export const tasksSchema = z.array(taskSchema);

export type Task = z.infer<typeof taskSchema>;