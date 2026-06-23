import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";

type CustomDatePickerProps<T extends FieldValues> = {
  control: Control<T>;
  path: Path<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
};

export default function CustomDatePicker<T extends FieldValues>({
  control,
  path,
  label,
  placeholder = "Select date",
  className = "",
  buttonClassName = "",
}: CustomDatePickerProps<T>) {
  return (
    <FormField
      control={control}
      name={path}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  type="button"
                  variant="outline"
                  data-empty={!field.value}
                  className="w-full justify-between text-left"
                >
                  {field.value ? (
                    format(field.value as Date, "dd/MM/yyyy")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <ChevronDownIcon className="h-4 w-4 opacity-60" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value as Date | undefined}
                onSelect={field.onChange}
                defaultMonth={field.value as Date | undefined}
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}
