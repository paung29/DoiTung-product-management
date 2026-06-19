"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { X } from "lucide-react";

import CustomButton from "../common/custom-button";
import FormsInput from "../common/forms/form-input";
import { z } from "zod";
import ApiErrorUI from "../common/error-handle";
import { useRouter } from "next/navigation";
import { updateUserInfo } from "@/lib/server-actions/admin/update-user-info-client";
import { UpdateUserInfoFormData } from "@/lib/types/model/type";
import { Account } from "@/lib/types/model/account";
import CustomSelect from "../common/forms/form-select";

const EditUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must not exceed 100 characters"),
  role: z
    .string()
    .min(1, "Role is required")
    .refine(
      (val) => ["ADMIN", "STAFF"].includes(val),
      "Role must be either ADMIN or STAFF",
    ),

  active_status: z.string().min(1, "Status is required"),
  phone_no: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[0-9\-+\s()]+$/.test(val),
      "Phone number format is invalid",
    ),
});

export type EditUserFormData = z.infer<typeof EditUserSchema>;

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: Account | null;
}

const statusOptions = [
  { id: "true", value: "Active" },
  { id: "false", value: "Inactive" },
];

export default function EditUserModal({
  isOpen,
  onClose,
  account
}: EditUserModalProps) {

  
  console.log(account?.status)

  const router = useRouter();
  
  const [error, setError] = useState<string | null>(null)

  const form = useForm<EditUserFormData>({

    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      active_status: "",
      phone_no: ""
    },
  });

  const handleSubmit = async (data: EditUserFormData) => {

    console.log("Submit click")
    setError(null);

    const reformData : UpdateUserInfoFormData = {
      user_id : Number(account?.account_id),
      phone_no : String(data.phone_no),
      name : data.name,
      role : data.role,
      active_status : data.active_status === "true",
    }

    try {
      const response = await updateUserInfo(reformData);

      if (response.success === false) {
        setError(response.message || "Failed to update user");
        return;
      }
      
      onClose();
      router.refresh();
    } catch (error) {
      setError("Cannot connect to server");
    }
  };

  const roleOptions = [
    { id: "ADMIN", value: "Admin" },
    { id: "STAFF", value: "Staff" },
  ];

  useEffect(() => {
    if (!account) return;

    console.log(account.status)

    const statusValue = String(account.status).toLowerCase();

    form.reset({
      name : account.name,
      email : account.email,
      role : account.role_on_db.toUpperCase() || "STAFF",
      active_status: statusValue === "true" || statusValue === "active" ? "true" : "false",
      phone_no : account.phone_no
    });

    setError(null);
  }, [account, form]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {/* Close Button */}
        <CustomButton
          type="button"
          onClick={onClose}
          icon={X}
          className="absolute top-4 right-4 bg-transparent p-0 hover:bg-transparent"
          label="Cancel"
        />

        {/* Title */}
        <h2 className="mb-6 text-2xl font-semibold text-gray-900">
          Edit User
        </h2>

        <p className="mb-4 text-sm text-gray-600">
          Update the user details below.
        </p>

        <ApiErrorUI message={error}/>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Name */}
            <FormsInput
              control={form.control}
              path="name"
              label="Name"
              placeholder="John Doe"
            />

            {/* Email */}
            <FormsInput
              control={form.control}
              path="email"
              label="Email"
              placeholder="john@doitung.com"
              type="email"
            />

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                {...form.register("role")}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-yellow-900 focus:ring-1 focus:ring-yellow-900 focus:outline-none"
              >
                {roleOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.value}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <CustomSelect
                key={`status-${account?.account_id}-${form.watch("active_status")}`}
                control={form.control}
                path="active_status"
                label="Status"
                placeholder="Select status"
                options={statusOptions}
              />
            </div>

            {/* Phone */}
            <FormsInput
              control={form.control}
              path="phone_no"
              label="Phone"
              placeholder="081-234-5678"
            />

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <CustomButton
                label="Cancel"
                onClick={onClose}
                className="flex-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              />
              <CustomButton
                label= "Update"
                type="submit"
                className="flex-1 bg-yellow-900 text-white hover:bg-yellow-950"
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
