"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  BoltIcon,
  CubeTransparentIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { App, Credentials } from "realm-web";

import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setUser } from "@/src/redux/slices/authSlice";
import { logOutUser } from "../redux/actions/auth";

const app = new App({ id: "echospectra-mobile-app-nxmob" });

const allFalseHovers = {
  dashboard: false,
  observations: false,
  tracks: false,
  assets: false,
};

interface hoveredProp {
  dashboard: boolean;
  observations: boolean;
  tracks: boolean;
  assets: boolean;
}

export default function SideNav() {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.authReducer.user);
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState<hoveredProp>(allFalseHovers);

  useEffect(() => {
    if (
      !isHovered.dashboard &&
      !isHovered.observations &&
      !isHovered.tracks &&
      !isHovered.assets
    ) {
      if (pathname == "/")
        setIsHovered({
          dashboard: true,
          observations: false,
          tracks: false,
          assets: false,
        });
      if (pathname == "/observations")
        setIsHovered({
          dashboard: false,
          observations: true,
          tracks: false,
          assets: false,
        });
    }
  }, [isHovered]);

 
  const handleLogout = async () => {
    try {
      // Calling the logOutUser function from the auth action.
      dispatch(logOutUser());
     
     
    } catch (error) {
      console.log(error);
    }
  };
  const clearHovers = () => {
    setIsHovered(allFalseHovers);
  };

  return (
    <aside
      className={`${
        false ? "block" : "hidden"
      } w-[25%] max-w-[400px] min-w-[275px] lg:flex lg:flex-col z-50 text-center py-4`}>
      <div className="flex justify-start mb-8 px-7">
        <Image
          width={160}
          height={10}
          className="object-cover"
          src="/logos/logo.png"
          alt="ASIO Earth"
          priority
        />
      </div>
      <div className="flex-grow flex flex-col font-medium text-neutral-black-80 bg-white">
        <Link
          href={"/"}
          className={` ${
            isHovered.dashboard
              ? "bg-primary-blue-10 text-primary-blue-100"
              : "bg-white"
          }`}
          onMouseEnter={() =>
            setIsHovered({
              dashboard: true,
              observations: false,
              tracks: false,
              assets: false,
            })
          }
          onMouseLeave={clearHovers}>
          <div className="flex justify-start items-center gap-3 my-3 px-12 group">
            <HomeIcon className="h-6 w-6 group-hover:text-primary-blue-100" />
            <span className="inline-flex items-center justify-between py-3  rounded-lg px-3 cursor-pointer relative  text-shadow-dashboard font-avenir text-lg tracking-wide">
              Dashboard
            </span>
          </div>
        </Link>
        <Link
          href={"/observations"}
          className={` ${
            isHovered.observations
              ? "bg-primary-blue-10 text-primary-blue-100"
              : "bg-white"
          }`}
          onMouseEnter={() =>
            setIsHovered({
              dashboard: false,
              observations: true,
              tracks: false,
              assets: false,
            })
          }
          onMouseLeave={clearHovers}>
          <div className="flex justify-start items-center gap-3 my-3 px-12 group">
            <BoltIcon className="h-6 w-6 group-hover:text-primary-blue-100" />
            <span className="inline-flex items-center justify-between py-3 rounded-lg px-3 cursor-pointer relative group text-shadow-dashboard font-avenir text-lg tracking-wide">
              Observations
            </span>
          </div>
        </Link>
        <Link
          href={"#"}
          onMouseEnter={() =>
            setIsHovered({
              dashboard: false,
              observations: false,
              tracks: true,
              assets: false,
            })
          }
          onMouseLeave={clearHovers}
          className={` ${
            isHovered.tracks
              ? "bg-primary-blue-10 text-primary-blue-100"
              : "bg-white"
          }`}>
          <div className="flex justify-start items-center gap-3 my-3 px-12 group">
            <CubeTransparentIcon className="h-6 w-6 group-hover:text-primary-blue-100" />
            <span className="inline-flex items-center justify-between py-3 rounded-lg px-3 cursor-pointer relative group text-shadow-dashboard font-avenir text-lg tracking-wide">
              Tracks
            </span>
          </div>
        </Link>
        <Link
          href={"#"}
          onMouseEnter={() =>
            setIsHovered({
              dashboard: false,
              observations: false,
              tracks: false,
              assets: true,
            })
          }
          onMouseLeave={clearHovers}
          className={` ${
            isHovered.assets
              ? "bg-primary-blue-10 text-primary-blue-100"
              : "bg-white"
          }`}>
          <div className="flex justify-start items-center gap-3 my-3 px-12 group">
            <Square3Stack3DIcon className="h-6 w-6 group-hover:text-primary-blue-100" />
            <span className="inline-flex items-center justify-between py-3  rounded-lg px-3 cursor-pointer relative group text-shadow-dashboard font-avenir text-lg tracking-wide">
              Assets
            </span>
          </div>
        </Link>
        <div className="h-full flex items-end">
          <div className="w-full flex flex-col items-center space-y-3 border">
            <p>**temp for dev!**</p>
            <Link href={"/upload"}>
              <div className="flex justify-center items-center border border-primary-blue-80 p-2">
                <p>upload page</p>
              </div>
            </Link>
            <Link href={"/locationUpdateTool"}>
              <div className="flex justify-center items-center border border-primary-blue-80 p-2">
                <p>location update</p>
              </div>
            </Link>
            {!user ? (
              <>
                {" "}
                <Link href={"/signup"}>
                  <div className="flex justify-center items-center border border-primary-blue-80 p-2">
                    <p>sign up</p>
                  </div>
                </Link>
                <Link href={"/login"}>
                  <div className="flex justify-center items-center border border-primary-blue-80 p-2">
                    <p>login</p>
                  </div>
                </Link>
              </>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="bg-extended-yellow-120 text-white font-bold rounded h-12 w-32">
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
