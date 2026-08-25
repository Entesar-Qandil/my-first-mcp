import * as z from "zod/v4";

export const expenseRowSchema = z.object({
  id: z.number().int().positive(),
  description: z.string().min(1),
  amount: z.number().nonnegative(),
  category: z.string().min(1),
});

export const expensesSchema = z.array(expenseRowSchema);

export type ExpenseRow = z.infer<typeof expenseRowSchema>;