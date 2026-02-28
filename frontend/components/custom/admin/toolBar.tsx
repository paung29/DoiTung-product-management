"use client";

import { on } from "events";
import { Search, Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  onSearch: (keyword: string) => void;
  onCreate: () => void;
};

export default function ToolBar({ onSearch, onCreate }: Props) {
  const [keyword, setKeyword] = useState("");

  const submit = () => {
    onSearch(keyword.trim());
  };

  return (
    <div className="flex items-center gap-4">
      {/* Search input */}
      <div className="flex flex-1 items-center gap-3 rounded-xl border border-yellow-900/20 bg-white px-4 py-3">
        <Search size={18} className="text-yellow-900/50" />
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Search users..."
          className="w-full bg-transparent text-yellow-950 outline-none placeholder:text-yellow-900/40"
        />
      </div>

      {/* Search button */}
      <button
        onClick={submit}
        className="rounded-xl bg-[#6B4423] px-10 py-3 font-medium text-white hover:opacity-90 active:opacity-80"
      >
        Search
      </button>

      <button
        onClick={onCreate}
        className="flex items-center gap-2 rounded-xl bg-[#6B4423] px-7 py-3 font-medium text-white hover:opacity-90 active:opacity-80"
      >
        <Plus size={18} />
        Create User
      </button>
    </div>
  );
}
