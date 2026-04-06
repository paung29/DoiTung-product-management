
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

type CustomButtonProps = {
    label: string;
    onClick?: () => void;
    icon ?: LucideIcon;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export default function CustomButton({label, onClick, icon : Icon, className = "", type = "button"}: CustomButtonProps) {
    return (
        <Button type={type}  onClick={onClick} className={`text-white hover:opacity-90 transition ${className}`}>
            <h1>{label}</h1>
            {Icon && <Icon />}
        </Button>
    )
}