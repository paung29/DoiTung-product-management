"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { X } from "lucide-react";
import { Account } from "@/lib/types/model/account";

import CustomButton from "../common/custom-button";
import FormsInput from "../common/forms/form-input";
import { z } from "zod";

const CreateUserSchema = z
  .object({
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

    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must not exceed 100 characters"),

    confirmPassword: z.string().min(1, "Please confirm your password"),

    role: z
      .string()
      .min(1, "Role is required")
      .refine(
        (val) => ["ADMIN", "STAFF"].includes(val),
        "Role must be either ADMIN or STAFF",
      ),

    status: z
      .string()
      .min(1, "Status is required")
      .refine(
        (val) => ["Active", "Inactive"].includes(val),
        "Status must be either Active or Inactive",
      ),

    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[0-9\-+\s()]+$/.test(val),
        "Phone number format is invalid",
      ),

    department: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

// Edit schema (no password fields required)
const EditUserSchema = z.object({
  name: z
    .string()
    .min(1)
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z\s]+$/),
  email: z.string().min(1).email().max(100),
  role: z.string().min(1),
  status: z.string().min(1),
  phone: z.string().optional(),
  department: z.string().optional(),
});

// Change password schema
const ChangePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmNewPassword: z.string().min(1, "Please confirm your password"),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmNewPassword"],
      });
    }
  });

type CreateUserFormData =
  | z.infer<typeof CreateUserSchema>
  | z.infer<typeof EditUserSchema>;

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateUserFormData) => void;
  editingUser?: Account | null;
}

export default function CreateUserModal({
  isOpen,
  onClose,
  onSubmit,
  editingUser = null,
}: CreateUserModalProps) {
  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(editingUser ? EditUserSchema : CreateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "STAFF",
      status: "Active",
      phone: "",
      department: "",
    },
  });

  useEffect(() => {
    if (editingUser) {
      form.reset({
        name: editingUser.name,
        email: editingUser.email,
        password: "",
        confirmPassword: "",
        role: editingUser.role_on_db.toUpperCase(),
        status: "Active",
        phone: "",
        department: "",
      });
    } else {
      form.reset({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "STAFF",
        status: "Active",
        phone: "",
        department: "",
      });
    }
  }, [editingUser, form]);

  const handleSubmit = (data: CreateUserFormData) => {
    onSubmit(data);
    form.reset();
    onClose();
  };

  const roleOptions = [
    { id: "ADMIN", value: "Admin" },
    { id: "STAFF", value: "Staff" },
  ];

  const statusOptions = [
    { id: "Active", value: "Active" },
    { id: "Inactive", value: "Inactive" },
  ];

  const [changePassOpen, setChangePassOpen] = React.useState(false);

  function ChangePasswordModal({
    name,
    isOpen,
    onClose,
  }: {
    name: string;
    isOpen: boolean;
    onClose: () => void;
  }) {
    const cpForm = useForm<z.infer<typeof ChangePasswordSchema>>({
      resolver: zodResolver(ChangePasswordSchema),
      defaultValues: { newPassword: "", confirmNewPassword: "" },
    });

    const handleCPSubmit = (data: z.infer<typeof ChangePasswordSchema>) => {
      console.log("Change Password for", name, data);
      onClose();
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
        <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold">Change Password</h3>
          <p className="mb-4 text-sm text-gray-600">Name: {name}</p>
          <Form {...cpForm}>
            <form
              onSubmit={cpForm.handleSubmit(handleCPSubmit)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  {...cpForm.register("newPassword")}
                  type="password"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  {...cpForm.register("confirmNewPassword")}
                  type="password"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <CustomButton
                  label="Cancel"
                  onClick={onClose}
                  className="border bg-white text-gray-700"
                />
                <CustomButton
                  label="Save"
                  onClick={cpForm.handleSubmit(handleCPSubmit)}
                  className="bg-primary-button text-white"
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          {/* Close Button */}
          <CustomButton
            onClick={onClose}
            icon={X}
            className="absolute top-4 right-4 bg-transparent p-0 hover:bg-transparent"
            label=""
          />

          {/* Title */}
          <h2 className="mb-6 text-2xl font-semibold text-gray-900">
            {editingUser ? "Edit User" : "Create User"}
          </h2>

          <p className="mb-4 text-sm text-gray-600">
            {editingUser
              ? "Update the user details below."
              : "Fill in the details to create a new user."}
          </p>

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
              {editingUser ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    {...form.register("email")}
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-700"
                    disabled
                  />
                </div>
              ) : (
                <FormsInput
                  control={form.control}
                  path="email"
                  label="Email"
                  placeholder="john@doitung.com"
                  type="email"
                />
              )}

              {/* Password fields shown only when creating a user */}
              {!editingUser && (
                <>
                  <FormsInput
                    control={form.control}
                    path="password"
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                  />

                  <FormsInput
                    control={form.control}
                    path="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm password"
                    type="password"
                  />
                </>
              )}

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
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  {...form.register("status")}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-yellow-900 focus:ring-1 focus:ring-yellow-900 focus:outline-none"
                >
                  {statusOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone */}
              <FormsInput
                control={form.control}
                path="phone"
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

                {editingUser ? (
                  <>
                    <CustomButton
                      label="Change Password"
                      onClick={() => setChangePassOpen(true)}
                      className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
                    />
                    <CustomButton
                      label="Update"
                      onClick={form.handleSubmit(handleSubmit)}
                      className="flex-1 bg-yellow-900 text-white hover:bg-yellow-950"
                    />
                  </>
                ) : (
                  <CustomButton
                    label="Create"
                    onClick={form.handleSubmit(handleSubmit)}
                    className="flex-1 bg-yellow-900 text-white hover:bg-yellow-950"
                  />
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>

      {changePassOpen && editingUser && (
        <ChangePasswordModal
          name={editingUser.name}
          isOpen={changePassOpen}
          onClose={() => setChangePassOpen(false)}
        />
      )}
    </>
  );
}
