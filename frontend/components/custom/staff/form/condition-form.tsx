// components/common/forms/form-radio-cards.tsx
"use client";

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { ConditionOptions } from "@/lib/types/model/type";

import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";

type FormRadioCardsProps<T extends FieldValues> = {
  control: Control<T>;
  path: Path<T>;
  label?: string;

  className?: string;
};

export default function FormRadioCards<T extends FieldValues>({
  control,
  path,
  className,
}: FormRadioCardsProps<T>) {

  const options = ConditionOptions
  
  return (
    <FormField
      control={control}
      name={path}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          <FormControl>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {options.map((option) => {
                const checked = field.value === option.id;
                return (
                  <label
                    key={option.value}
                    className="bg-staff-form-field flex flex-row items-center gap-2 rounded-lg p-2 text-sm"
                  >
                    <input
                      type="radio"
                      name={field.name}
                      value={option.id}
                      checked={checked}
                      onChange={() => field.onChange(option.id)}
                      onBlur={field.onBlur}
                      className="h-5 w-5 accent-green-600"
                    />

                    <span className="item-center">{option.value}</span>
                  </label>
                );
              })}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

// <FormField
//   control={control}
//   name={path}
//   render={({ field }) => (
//     <FormItem className={cn("w-full", className)}>
//       {label && <FormLabel className="text-sm">{label}</FormLabel>}

//       <FormControl>
//         <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-3")}>
//           {options.map((option) => {
//             const checked = field.value === option.value;

//             return (
//               <label
//                 key={option.value}
//                 className={cn(
//                   "bg-staff-form-field flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 ring-1 ring-transparent transition",
//                   checked && "ring-primary",
//                 )}
//               >
//                 <input
//                   type="radio"
//                   name={field.name}
//                   value={option.value}
//                   checked={checked}
//                   onChange={() => field.onChange(option.value)}
//                   onBlur={field.onBlur}
//                   className="h-5 w-5"
//                 />

//                 <div className="flex flex-col">
//                   <span className="text-sm">{option.value}</span>
//                   {option.value && (
//                     <span className="text-xs opacity-70">
//                       {option.value}
//                     </span>
//                   )}
//                 </div>
//               </label>
//             );
//           })}
//         </div>
//       </FormControl>

//       <FormMessage />
//     </FormItem>
//   )}
// />
// );
//
