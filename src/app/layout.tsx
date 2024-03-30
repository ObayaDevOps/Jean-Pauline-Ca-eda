"use client";
import React, { useEffect, ReactElement, ReactNode } from "react";
import "./globals.css";
import localFont from "@next/font/local";

const avenir = localFont({
  src: "../../public/fonts/AvenirLTStd-Book.otf",
  variable: "--font-avenir",
});

import { Montserrat } from "next/font/google";
import { Providers } from "@/src/redux/provider";
import SideNav from "../components/SideNav";
import { store } from "@/src/redux/store";

import { loadUser } from "@/src/redux/actions/auth";
const montserrat = Montserrat({ subsets: ["latin"] });

// export const metadata = {
//   title: 'ASIO',
//   description: 'An ASIO Spatial Product',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Karla:wght@400;500&display=swap"
        />
      </head>
      <body className={montserrat.className}>
        <Providers>
          <div
            className={`${avenir.variable} font-sans flex min-h-screen h-screen w-screen`}>
            <SideNav />
            <main className="w-full">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
