import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

type CustomButtonProps = {
  label: string;
  onClick?: () => void;
  icon?: LucideIcon;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function CustomButton({
  label,
  onClick,
  icon: Icon,
  className = "",
  type = "button",
}: CustomButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 text-white transition hover:opacity-90 ${className}`}
    >
      {label ? <span className="text-sm">{label}</span> : null}
      {Icon && <Icon className={label ? undefined : "h-4 w-4"} />}
    </Button>
  );
}
