// src/App.tsx
import { useEffect, useState } from "react";
import type { Expense,Filter } from "./types";
import ExpenseForm from "./components/expensesform"
import ExpenseList from "./components/expenselist";
import Filters from "./components/filter";
import ExpenseChart from "./components/expensechart";
import { loadExpenses, saveExpenses } from "./localstorage";



function App() {
  // Lazy initialization prevents cascading renders in Strict Mode
  const [expenses, setExpenses] = useState<Expense[]>(() => loadExpenses());

 const [filter, setFilter] = useState<Filter>({
  category: "",
  sort: "latest",
});
  // Save to localStorage whenever expenses change
  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  // Add a new expense
  const addExpense = (expense: Expense) => setExpenses([expense, ...expenses]);

  // Delete an expense
  const deleteExpense = (id: number) =>
    setExpenses(expenses.filter((e) => e.id !== id));

  // Filter and sort expenses based on filter state
  const filteredExpenses = expenses
    .filter((e) => (filter.category ? e.category === filter.category : true))
    .sort((a, b) =>
      filter.sort === "amount"
        ? b.amount - a.amount
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  // Calculate total amount
  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Smart Expense Tracker</h1>

      <ExpenseForm addExpense={addExpense} />
      <Filters filter={filter} setFilter={setFilter} />

      <h2 className="mt-4 text-lg font-semibold">Total: ₹{total}</h2>

      <ExpenseChart expenses={filteredExpenses} />
      <ExpenseList expenses={filteredExpenses} deleteExpense={deleteExpense} />
    </div>
  );
}

export default App;