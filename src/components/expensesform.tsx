import { useState } from "react";
import type { Expense } from "../types";

interface Props {
  addExpense: (expense: Expense) => void;
}

const categories = ["Food", "Travel", "Bills", "Others"];

export default function ExpenseForm({ addExpense }: Props) {
  const [form, setForm] = useState<Omit<Expense, "id">>({
    amount: 0,
    category: "Food",
    date: "",
    note: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.amount || !form.date) return;

    addExpense({
      ...form,
      id: Date.now(),
    });

    setForm({ amount: 0, category: "Food", date: "", note: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <input
        type="number"
        placeholder="Amount"
        className="border p-2 mr-2"
        value={form.amount}
        onChange={(e) =>
          setForm({ ...form, amount: Number(e.target.value) })
        }
      />

      <select
        className="border p-2 mr-2"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      >
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="date"
        className="border p-2 mr-2"
        value={form.date}
        onChange={(e) =>
          setForm({ ...form, date: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Note"
        className="border p-2 mr-2"
        value={form.note}
        onChange={(e) =>
          setForm({ ...form, note: e.target.value })
        }
      />

      <button className="bg-blue-500 text-white px-4 py-2">
        Add
      </button>
    </form>
  );
}