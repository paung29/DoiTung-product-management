
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

type CustomButtonProps = {
    label: string;
    onClick: () => void;
    icon ?: LucideIcon;
    className?: string;
}

export default function CustomButton({label, onClick, icon : Icon, className = ""}: CustomButtonProps) {
    return (
        <Button  onClick={onClick} className={`text-white hover:opacity-90 transition ${className}`}>
            <h1>{label}</h1>
            {Icon && <Icon />}
        </Button>
    )
}