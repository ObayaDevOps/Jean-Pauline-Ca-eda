"use client"; // This is a client component

import type { ReactElement, ReactNode } from "react";
// import NavLayout from '../layout';
import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { emailAndPasswordSignUp } from '@/src/redux/actions/auth'

import { useRouter } from "next/navigation";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};



const SignUpPage: NextPageWithLayout = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.authReducer.user);

   useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const handleSubmit = async () => {
    dispatch(emailAndPasswordSignUp(email, password))
  };

  return (
    <div className="h-4/5 w-full flex flex-col justify-center items-center space-y-8">
      <p className="font-medium text-lg">Sign Up</p>
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        className="border h-12 w-72 rounded"
      />
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        className="border h-12 w-72 rounded"
      />
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
        Sign Up
      </button>
    </div>
  );
};

export default SignUpPage;
