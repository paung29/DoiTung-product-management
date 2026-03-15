"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { X } from "lucide-react";
import { Account } from "@/lib/types/model/account";

interface CreateUserFormData {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  phone: string;
  department: string;
}

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

  // Update form values when editing user changes
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                {...form.register("name", { required: true })}
                placeholder="John Doe"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-yellow-900 focus:ring-1 focus:ring-yellow-900 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                {...form.register("email", { required: true })}
                type="email"
                placeholder="john@doitung.com"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-yellow-900 focus:ring-1 focus:ring-yellow-900 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                {...form.register("password", { required: true })}
                type="password"
                placeholder="Enter password"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-yellow-900 focus:ring-1 focus:ring-yellow-900 focus:outline-none"
              />
            </div>

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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                {...form.register("phone")}
                placeholder="081-234-5678"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-yellow-900 focus:ring-1 focus:ring-yellow-900 focus:outline-none"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                {...form.register("department")}
                placeholder="Management"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-yellow-900 focus:ring-1 focus:ring-yellow-900 focus:outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-yellow-900 px-4 py-2 text-white hover:bg-yellow-950"
              >
                {editingUser ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
