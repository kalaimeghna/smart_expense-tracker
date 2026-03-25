import type { Expense } from "../types";

interface Props {
  expenses: Expense[];
  deleteExpense: (id: number) => void;
}

export default function ExpenseList({ expenses, deleteExpense }: Props) {
  return (
    <div className="mt-4">
      {expenses.map((exp) => (
        <div
          key={exp.id}
          className="flex justify-between bg-gray-100 p-3 mb-2 rounded"
        >
          <div>
            <p className="font-semibold">
              {exp.category} - ₹{exp.amount}
            </p>
            <small>
              {exp.date} | {exp.note}
            </small>
          </div>

          <button
            onClick={() => deleteExpense(exp.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}