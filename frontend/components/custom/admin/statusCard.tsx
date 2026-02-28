import { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  value: number;
  label: string;
};

export default function StatusCard({ icon, value, label }: StatCardProps) {
  return (
    <div className="flex h-40 w-96 flex-col items-center justify-between rounded-2xl border border-yellow-900/30 bg-[#F7F1E3] p-6 shadow-sm md:flex-row">
      <div className="text-yellow-900/60">{icon}</div>

      <div className="flex-1 text-center">
        <div className="text-4xl font-semibold text-yellow-950">{value}</div>
        <div className="mt-1 text-sm text-yellow-900/60">{label}</div>
      </div>
    </div>
  );
}
