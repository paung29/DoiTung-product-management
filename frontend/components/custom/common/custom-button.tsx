
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

type CustomButtonProps = {
    label: string;
    onClick: () => void;
    icon ?: LucideIcon;
}

export default function CustomButton({label, onClick, icon : Icon}: CustomButtonProps) {
    return (
        <Button onClick={onClick}>
            <h1>{label}</h1>
            {Icon && <Icon />}
        </Button>
    )
}