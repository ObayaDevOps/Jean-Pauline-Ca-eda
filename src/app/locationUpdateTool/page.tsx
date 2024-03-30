"use client"; // This is a client component

import type { ReactElement, ReactNode } from "react";
import NavLayout from "../layout";
// import NestedLayout from '../components/nested-layout'
// import type { NextPageWithLayout } from '../../pages/_app';
import type { NextPage } from "next";
import React from "react";
import LocationUpdateTool from "@/src/components/locationUpdateTool/LocationUpdateTool";
import AuthGuard from '@/src/components/AuthGuard';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const UploadPage: NextPageWithLayout = () => {
  return <AuthGuard><LocationUpdateTool /></AuthGuard>;
};

UploadPage.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default UploadPage;
