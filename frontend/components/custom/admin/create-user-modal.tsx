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

const CreateUserSchema = z.object({
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
});

type CreateUserFormData = z.infer<typeof CreateUserSchema>;

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
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
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
        password: editingUser.password,
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

  if (!isOpen) return null;

  const roleOptions = [
    { id: "ADMIN", value: "Admin" },
    { id: "STAFF", value: "Staff" },
  ];

  const statusOptions = [
    { id: "Active", value: "Active" },
    { id: "Inactive", value: "Inactive" },
  ];

  return (
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
            <FormsInput
              control={form.control}
              path="email"
              label="Email"
              placeholder="john@doitung.com"
              type="email"
            />

            {/* Password */}
            <FormsInput
              control={form.control}
              path="password"
              label="Password"
              placeholder="Enter password"
              type="password"
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
              <CustomButton
                label={editingUser ? "Update" : "Create"}
                onClick={form.handleSubmit(handleSubmit)}
                className="flex-1 bg-yellow-900 text-white hover:bg-yellow-950"
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
