import React from "react";

const Notifications = () => {
  return (
    <div
      style={{ borderRadius: "50%" }}
      className="bg-blue-500 h-12 w-12 text-center pt-1">
      <button className="relative p-2 text-gray-400 hover:bg-blue-400 hover:text-blue-400 focus:bg-blue-400 focus:text-blue-400 rounded-full">
        <span className="sr-only">Notifications</span>
        <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full" />
        <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping" />
        <img src="/icons/notification.png" className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Notifications;
