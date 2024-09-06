/** @format */
"use client";

import Navbar from "@/components/ui/navbar";
import SideBarScreen from "@/components/ui/side-bar";

import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

const layout = ({ children }: { children: any }) => {
  let isTab = useMediaQuery({ query: "(max-width:768px)" });
  const [isOpen, setIsOpen] = useState(!isTab);

  return (
    <div className="flex w-full bg-[#fcfcfc] h-screen">
      <div>
        <SideBarScreen setIsOpen={setIsOpen} isOpen={isOpen} isTab={false} />
      </div>

      <div className={`${isOpen ? "ml-[15rem]" : "ml-[4rem]"} w-full`}>
        <Navbar isOpen={isOpen} />
        <div className="px-5 pt-24 pb-10 bg-[#fcfcfc] h-full ">{children}</div>
      </div>
    </div>
  );
};

export default layout;
