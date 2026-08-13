import { loadExpenses } from "./lib/expenses.js";

const expenses = await loadExpenses();

console.log(expenses);