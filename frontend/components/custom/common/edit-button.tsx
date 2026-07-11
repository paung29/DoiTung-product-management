import { Edit } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type EditButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Shared edit button — the single UI used for every "edit" action across the app.
 * Gray ghost icon: a borderless pencil that tints gray on hover. Do not restyle
 * per-usage; always use this component so every edit trigger looks identical.
 */
const EditButton = forwardRef<HTMLButtonElement, EditButtonProps>(
  function EditButton({ className, type = "button", ...props }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        aria-label="Edit"
        className={cn(
          "rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900",
          className,
        )}
        {...props}
      >
        <Edit className="h-5 w-5" />
      </button>
    );
  },
);

export default EditButton;
