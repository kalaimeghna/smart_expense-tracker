import type { Expense } from "./types";

export const loadExpenses = (): Expense[] => {
  const data = localStorage.getItem("expenses");
  return data ? JSON.parse(data) : [];
};

export const saveExpenses = (expenses: Expense[]) => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};