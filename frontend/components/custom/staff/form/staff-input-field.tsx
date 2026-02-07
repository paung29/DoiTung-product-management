import { Input } from "@/components/ui/input";

type StaffInputFieldProps = {
  placeholder: string;
  isDisable?: boolean;
};

function StaffInputField({
  placeholder,
  isDisable = false,
}: StaffInputFieldProps) {
  return (
    <Input
      type="number"
      min={0}
      className={`bg-staff-form-field ${isDisable ? "cursor-not-allowed opacity-50" : null}`}
      disabled={isDisable}
      placeholder={placeholder}
    ></Input>
  );
}

export default StaffInputField;
