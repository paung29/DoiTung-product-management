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

export function LoginForm() {
  return (
    <Card className="w-full max-w-[487px] min-h-[650px] flex justify-center gap-8">
      <CardHeader className="flex justify-center flex-col items-center">
        <Image
          src={"/images/MFLF_Logo.png"}
          alt="MFLF Logo"
          height={100}
          width={340}
          className="object-cover max-h-[100px] mix-w-[340px]"
        />
        <CardTitle className=" font-semibold text-2xl">
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
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
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
