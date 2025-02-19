/** @format */
"use client";
import Navbar from "@/components/ui/navbar";
import SideBarScreen from "@/components/ui/side-bar";
import { use99Dispatch } from "@/redux/hooks/hooks";
import { useGetUsersQuery } from "@/redux/services/auth/auth";
import { logout, setUserDetails } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { jwtDecode } from "jwt-decode";
import { getToken } from "@/_shared";
const DashboardLayout = ({ children }: { children: any }) => {
  const isTab = useMediaQuery({ query: "(max-width:768px)" });
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(!isTab);
  const dispatch = use99Dispatch();
  const token = getToken();
  const { data: userData } = useGetUsersQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (token) {
      try {
        const { exp } = jwtDecode<{ exp: number }>(token);
        const isTokenExpired = Date.now() >= exp * 1000;
        if (isTokenExpired) {
          dispatch(logout());
          router.push("/landing");
        } else {
          if (userData) {
            dispatch(setUserDetails(userData));
          }
        }
      } catch (error) {
        dispatch(logout());
        router.push("/landing");
      }
    } else return router.push("/landing");
  }, [token, dispatch, router, userData]);

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
