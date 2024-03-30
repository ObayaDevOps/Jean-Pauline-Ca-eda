import React, { useEffect, useRef, useState } from "react";

const UserMenu = () => {
  const [userMenuStatus, setUserMenuStatus] = useState(false);
  const buttonRef = useRef(null);

  const userMenuhandle = () => {
    setUserMenuStatus(!userMenuStatus);
  };

  return (
    <button
      className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg relative"
      onClick={userMenuhandle}
      ref={buttonRef}>
      <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
        <img
          src="/avatar.png"
          alt="user profile photo"
          className="h-full w-full object-cover"
        />
      </span>
    </button>
  );
};

export default UserMenu;
