// components/custom/staff/form/fields/ConditionForm.tsx
"use client";

const options = [
  { value: "GOOD", label: "Good" },
  { value: "INSERT", label: "Insect (Damaged Cluster)" },
  { value: "ROTTEN", label: "Rotten (Damaged Cluster)" },
];

export default function ConditionForm({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {options.map((option) => (
        <label
          key={option.value}
          className="bg-staff-form-field flex items-center gap-3 rounded-lg px-4 py-3"
        >
          <input
            type="radio"
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="h-5 w-5"
          />
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </div>
  );
}
