export interface Expense {
  id: number;
  amount: number;
  category: string;
  date: string;
  note: string;
}
// src/types.ts
export type SortType = "latest" | "amount";

export interface Filter {
  category: string;
  sort: SortType;
}
