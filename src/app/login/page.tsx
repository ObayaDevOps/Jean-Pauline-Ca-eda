"use client"; // This is a client component

// import type { ReactElement, ReactNode } from 'react';
// import NavLayout from '../layout';
import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useRouter } from "next/navigation";
import { emailAndPasswordLogin } from '@/src/redux/actions/auth'


const LoginPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.authReducer.user);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async () => {
    dispatch(emailAndPasswordLogin(email, password))
  };

  return (
    <div className="h-4/5 w-full flex flex-col justify-center items-center space-y-8">
      <p className="font-medium text-lg">Login</p>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="user email"
        className="border h-12 w-72 rounded"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        className="border h-12 w-72 rounded"
      />
      <button
        type="button"
        className="h-12 w-72 bg-primary-blue-100 rounded text-white"
        onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
