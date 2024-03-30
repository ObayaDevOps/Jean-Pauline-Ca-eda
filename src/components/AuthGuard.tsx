"use client";

import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const user = useAppSelector((state) => state.authReducer.user);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  return (<>{user && children}</>)
}
