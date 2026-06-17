"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { X } from "lucide-react";

import { Form } from "@/components/ui/form";

import CustomButton from "../common/custom-button";
import FormsInput from "../common/forms/form-input";

import { Account } from "@/lib/types/model/account";

const ChangePasswordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>;

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: Account | null;

  onSubmit: (
    userId: number,
    data: ChangePasswordFormData,
  ) => Promise<void> | void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
  user,
  onSubmit,
}: ChangePasswordModalProps) {
  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [isOpen, form]);

  const handleSubmit = async (data: ChangePasswordFormData) => {
    if (!user) return;

    await onSubmit(Number(user.account_id), data);

    form.reset();
    onClose();
  };

  if (!isOpen) return null;

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
        <h2 className="mb-2 text-2xl font-semibold text-gray-900">
          Change Password
        </h2>

        <p className="mb-6 text-sm text-gray-600">
          Update password for <span className="font-medium">{user?.name}</span>
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormsInput
              control={form.control}
              path="newPassword"
              label="New Password"
              placeholder="Enter new password"
              type="password"
            />

            <FormsInput
              control={form.control}
              path="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm new password"
              type="password"
            />

            <div className="flex gap-4 pt-6">
              <CustomButton
                label="Cancel"
                onClick={onClose}
                className="flex-1 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              />

              <CustomButton
                label="Update Password"
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
