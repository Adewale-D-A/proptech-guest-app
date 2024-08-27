/** @format */

import React, { useEffect, useState } from "react";
import UserDropDown from "./user-dropdown";
import NotificationDropDown from "./notification";

const Navbar = ({ isOpen }: { isOpen: boolean }) => {
  const [bgColor, setBgColor] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setBgColor("bg-white ");
      } else {
        setBgColor("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call it once to set initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div
        className={`bg-white border-b  ${
          isOpen ? "ml-[15rem]" : "ml-[4rem]"
        } h-24 z-30 fixed left-0 right-0 px-5 flex justify-between items-center  transition-colors duration-300`}
      >
        <div className="w-60">
          <h1 className="text-xl font-semibold">Welcome Back</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="">
            <NotificationDropDown />
          </div>
          <UserDropDown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
