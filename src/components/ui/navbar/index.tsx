/** @format */

import React, { useEffect, useState } from "react";
import UserDropDown from "./user-dropdown";
import NotificationDropDown from "./notification";
import { use99Selector } from "@/redux/hooks/hooks";
import { RootState } from "@/redux/store";
import { ChevronRight, LayoutGrid } from "lucide-react";

const Navbar = ({ isOpen }: { isOpen: boolean }) => {
  const [bgColor, setBgColor] = useState<string>("");
  const activeTab = use99Selector((state: RootState) => state.tab.activeTab);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setBgColor("bg-white ");
      } else {
        setBgColor("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

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
        <div className="flex items-center">
          <LayoutGrid size={16} /> <span className="px-1 ">Dashboard</span>{" "}
          <ChevronRight size={18} color="#284499" />
          <span className="text-primary pl-1"> {activeTab?.title}</span>
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
