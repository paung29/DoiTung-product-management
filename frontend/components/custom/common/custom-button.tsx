
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

type CustomButtonProps = {
    label: string;
    onClick: () => void;
    icon ?: LucideIcon;
    bgColor ?: string;
}

export default function CustomButton({label, onClick, icon : Icon, bgColor = "#007A55"}: CustomButtonProps) {
    return (
        <Button className={`bg-[${bgColor}]`} onClick={onClick}>
            <h1>{label}</h1>
            {Icon && <Icon />}
        </Button>
    )
}