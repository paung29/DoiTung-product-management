"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormsInput from "../common/forms/form-input";

import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
});

type LoginFormData = z.infer<typeof LoginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      setIsLoading(true);
      if (data.password === "admin") {
        router.push("/admin")
      }else {
        router.push("/staff/2025")
      }
      console.log("Login data:", data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex h-auto w-full max-w-175 flex-col justify-center gap-8 p-6 sm:max-w-85 md:h-162.5 md:max-w-121.75">
      <CardHeader className="flex flex-col items-center justify-center">
        <Image
          src={"/images/MFLF_Logo.png"}
          alt="MFLF Logo"
          height={100}
          width={340}
          className="h-auto max-h-25 w-56 object-contain md:w-80"
        />
        <CardTitle className="text-xl font-semibold">
          Login to your account
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Error Message */}
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <FormsInput
                control={form.control}
                path="email"
                inputClassName="w-full"
                placeholder="hello@example.com"
                type="email"
              />
            </div>

            {/* Password Field with Toggle */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-primary-button ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <FormsInput
                  control={form.control}
                  path="password"
                  type={showPassword ? "text" : "password"}
                  inputClassName="w-full pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || form.formState.isSubmitting}
              className="bg-primary-button hover:bg-primary-button/90 w-full font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login now"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
