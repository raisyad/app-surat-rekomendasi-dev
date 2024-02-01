"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const LoginInForm = () => {
  const router = useRouter();
  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const loginResponse = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!loginResponse || loginResponse.ok !== true) {
        setMessage("invalid bang");
      } else {
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.refresh();
      router.push("/user/dashboards");
    }
  }, [status]);
  return (
    <div className="pt-6  ">
      <div className="flex items-center align-center justify-center pb-12">
        <img className="w-auto h-28" src="logo.png" alt="" />
      </div>
      <div className="w-[250px] sm:w-[400px]">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email
        </label>
        <div className="mt-2 mb-6">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            name="email"
            id="email"
            placeholder="your@gmail.com"
            autoComplete="given-name"
            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
          <div className="mt-2">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              name="password"
              id="password"
              autoComplete="given-name"
              className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        <button
          onClick={handleSubmit}
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700"
        >
          Login
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default LoginInForm;
