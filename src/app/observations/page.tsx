"use client"; // This is a client component

import React, { useEffect, ReactElement, ReactNode } from "react";
import NavLayout from "../layout";
// import NestedLayout from '../components/nested-layout'
// import type { NextPageWithLayout } from '../../pages/_app';
import type { NextPage } from "next";
import Observations from "@/src/components/observations/Observations";
import AuthGuard from '@/src/components/AuthGuard';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const ObservationsPage: NextPageWithLayout = () => {
  return <Observations />;
};

ObservationsPage.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default ObservationsPage;
