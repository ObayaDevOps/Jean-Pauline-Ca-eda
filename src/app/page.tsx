"use client";
import React, { useEffect, ReactElement, ReactNode } from "react";
// import NavLayout from '/layouts/navLayout'
import NavLayout from "./layout";
// import type { NextPageWithLayout } from '../pages/_app';
import type { NextPage } from "next";
import MapPage from "../components/mapPage/MapPage";
import AuthGuard from '@/src/components/AuthGuard';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const Home: NextPageWithLayout = () => {
  return (
    <AuthGuard>
      <div className="flex justify-center items-center text-6xl pt-16">
        DashBoard
      </div>
    </AuthGuard>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <NavLayout>{page}</NavLayout>;
};

export default Home;
