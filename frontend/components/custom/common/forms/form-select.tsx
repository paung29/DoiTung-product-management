import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Option } from "@/lib/types/model/option";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";

export type CustomSelectProps<T extends FieldValues> = {
  control: Control<T, any, any>;
  path: Path<T>;
  options: Option[];
  label?: string;

  className?: string;
  triggerClassName?: string;
  placeholder: string;
  onValueChange?: (value: string) => void;
};

export default function CustomSelect<T extends FieldValues>({
  control,
  path,
  options,
  label,
  className,
  triggerClassName,
  placeholder,
  onValueChange,
}: CustomSelectProps<T>) {
  return (
    <FormField
      control={control as Control<T>}
      name={path}
      render={({ field }) => (
        <FormItem className={cn("", className)}>
          {label && <FormLabel className="text-sm">{label}</FormLabel>}

          <Select
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
              onValueChange?.(value);
            }}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  "w-full min-w-[180px] truncate border",
                  "sm:min-w-[180px]",
                  "focus:border-[#2B9B9B] focus-visible:ring-0",
                  triggerClassName,
                )}
              >
                <SelectValue className="truncate" placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
