/** @format */
"use client";

import Navbar from "@/components/ui/navbar";
import SideBarScreen from "@/components/ui/side-bar";
import { use99Selector } from "@/redux/hooks/hooks";
import { isAuthenticated, selectUserToken } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const DashboardLayout = ({ children }: { children: any }) => {
  let isTab = useMediaQuery({ query: "(max-width:768px)" });
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(!isTab);

  const token = use99Selector(selectUserToken);
  const userAuthenticated = use99Selector(isAuthenticated);
  useEffect(() => {
    if (!token) {
      router.push("/landing");
    }
  }, [router]);

  if (!userAuthenticated) {
    return null;
  }
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

export default DashboardLayout;
