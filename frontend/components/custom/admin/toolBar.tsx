"use client";

import { Search, Plus } from "lucide-react";
import { useState } from "react";
import CustomButton from "../common/custom-button";

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
      

      {/* Create User button */}
      <CustomButton
        label="Create User"
        icon={Plus}
        onClick={onCreate}
        className="bg-[#6B4423] px-7 text-white hover:opacity-90"
      />
    </div>
  );
}
