import { ChevronDown } from "lucide-react";
import React from "react";

export type Option = {
  value: string;
  label: string;
};

type StaffSelectionFormProps = {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
};

function StaffSelectionForm({
  options,
  value,
  onChange,
  placeholder,
}: StaffSelectionFormProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg bg-[#e9ecf0] px-4 py-3 pr-10 text-sm text-[#2d201b] outline-none"
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#2d201b]">
        <ChevronDown />
      </div>
    </div>
  );
}

export default StaffSelectionForm;
