import type { Filter } from "../types";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

export default function Filters({ filter, setFilter }: Props) {
  const categories = ["", "Food", "Travel", "Bills", "Others"];
  const sortOptions: Filter["sort"][] = ["latest", "amount"];

  return (
    <div className="flex gap-2 mt-4">
      {/* Category Filter */}
      <select
        className="border p-2"
        value={filter.category}
        onChange={(e) =>
          setFilter((prev) => ({ ...prev, category: e.target.value }))
        }
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat === "" ? "All Categories" : cat}
          </option>
        ))}
      </select>

      {/* Sort Filter */}
      <select
        className="border p-2"
        value={filter.sort}
        onChange={(e) =>
          setFilter((prev) => ({
            ...prev,
            sort: e.target.value as Filter["sort"], // type cast needed
          }))
        }
      >
        {sortOptions.map((s) => (
          <option key={s} value={s}>
            {s === "latest" ? "Most Recent" : "Highest Amount"}
          </option>
        ))}
      </select>
    </div>
  );
}