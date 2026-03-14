import { LucideIcon } from "lucide-react";
import React from "react";

type ZoneTotalCardProps = {
  title: string;
  total: number;
  icon: LucideIcon;
};

function ZoneTotalCard({ title, total, icon: Icon }: ZoneTotalCardProps) {
  return (
    <div className="bg-secondary text-primary-button flex w-80 items-center justify-between rounded-lg p-4 drop-shadow-lg">
      <div className="flex flex-col gap-2">
        <p className="text-lg">{title}</p>
        <p className="text-2xl font-bold">{total}</p>
      </div>
      <div className="bg-primary-button rounded-lg p-3 text-white">
        <Icon />
      </div>
    </div>
  );
}

export default ZoneTotalCard;
