"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    // <Card className="w-full max-w-[700px] md:max-w-[487px] sm:max-w-[340px] h-auto md:h-[650px] flex flex-col justify-center gap-8 p-6">
    <Card className="w-full max-w-175 md:max-w-121.75 sm:max-w-85 h-auto md:h-162.5 flex flex-col justify-center gap-8 p-6">
      <CardHeader className="flex justify-center flex-col items-center">
        <Image
          src={"/images/MFLF_Logo.png"}
          alt="MFLF Logo"
          height={100}
          width={340}
          // className="object-contain w-56 md:w-80 h-auto max-h-[100px]"
          className="object-contain w-56 md:w-80 h-auto max-h-25"
        />
        <CardTitle className="font-semibold text-xl">
          Login to your account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="hello@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-primary-button"
                >
                  Forgot?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full bg-primary-button font-semibold"
        >
          Login now
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LoginForm;
