"use client";

import LoginInForm from "@/components/Loginform";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="sm:border sm:w-6/12 sm:h-6/12 sm:rounded-lg sm:shadow-lg flex flex-col items-center justify-center">
        <LoginInForm />
        <br />
      </div>
    </div>
  );
}
