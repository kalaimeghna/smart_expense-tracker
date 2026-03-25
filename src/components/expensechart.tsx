import type { Expense } from "../types";
import { PieChart, Pie, Cell, Tooltip } from "recharts";//runtime

interface Props {
  expenses: Expense[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface CategoryData {
  [category: string]: { name: string; value: number };
}

export default function ExpenseChart({ expenses }: Props) {
  const data = Object.values(
    expenses.reduce((acc: CategoryData, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = { name: curr.category, value: 0 };
      }
      acc[curr.category].value += curr.amount;
      return acc;
    }, {} as CategoryData)
  );

  return (
    <div className="flex justify-center mt-4">
      <PieChart width={300} height={300}>
        <Pie data={data} dataKey="value" outerRadius={100}>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}