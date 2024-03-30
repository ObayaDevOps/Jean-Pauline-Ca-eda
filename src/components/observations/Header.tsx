import { MoonIcon } from "@heroicons/react/24/solid";
import React, { Dispatch, SetStateAction } from "react";
import Notifications from "./header/Notifications";
import UserMenu from "./header/UserMenu";

interface HeaderProps {
  mobileNavsidebar: boolean;
  setMobileNavsidebar: Dispatch<SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  mobileNavsidebar,
  setMobileNavsidebar,
}) => {
  return (
    <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
      <MoonIcon
        className="h-12 stroke-slate-600 cursor-pointer sm:hidden"
        onClick={() => setMobileNavsidebar(!mobileNavsidebar)}
      />
      {/* <SearchBox /> */}
      <div className="text-2xl font-extrabold font-avenir">Observations</div>
      <div className="flex flex-shrink-0 items-center ml-auto">
        <Notifications />
        <UserMenu />
        {/* <div className="border-l pl-3 ml-3 space-x-1">
          
          <LogOutButton />
        </div> */}
      </div>
    </header>
  );
};

export default Header;
