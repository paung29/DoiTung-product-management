

import LoginForm from "@/components/custom/form/login-form";
import { LoginPhoto } from "@/components/custom/login/login-photo";

export default function LoginPage() {


  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-col flex-1 justify-center ">
          <div className="flex justify-center items-center h-full gap-24">
            <LoginForm></LoginForm>
            <LoginPhoto></LoginPhoto>
          </div>
        </div>
      </div>
    </>
  );
}
