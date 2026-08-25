import { readDataFile } from "./files.js";
import { expensesSchema, type ExpenseRow } from "../schemas/expense.js";

export async function loadExpenses(): Promise<ExpenseRow[]> {
  const rawFile = await readDataFile("expenses.json");

  const parsedJson: unknown = JSON.parse(rawFile);

  return expensesSchema.parse(parsedJson);
}