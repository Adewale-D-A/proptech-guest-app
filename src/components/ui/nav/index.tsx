/** @format */
"use client";
import React, { useEffect, useState } from "react";
import Logo from "../logo";
import { Button } from "@/components/_shared/button";
import NavSectionTabs from "./nav-section";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Menu, X } from "lucide-react";
import { clearEmail, selectEmail } from "@/redux/slices/emailSlice";
import { use99Dispatch, use99Selector } from "@/redux/hooks/hooks";
import {
  logout,
  selectCurrentUser,
  setUserDetails,
} from "@/redux/slices/authSlice";
import { setActiveTab } from "@/redux/slices/active_tab";
import { MdOutlineDateRange } from "react-icons/md";
import AuthModal from "../auth/auth-modal";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useGetUsersQuery } from "@/redux/services/auth/auth";
import { jwtDecode } from "jwt-decode";
import { getToken } from "@/_shared";

const HomeNavBar = () => {
  const currentUser = use99Selector(selectCurrentUser);
  const router = useRouter();
  const dispatch = use99Dispatch();
  const searchParams = useSearchParams();
  const [scrolled, setScrolled] = useState(false);
  const pathName = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("");
  const email = use99Selector(selectEmail);
  const isMainRoute = pathName === "/shortlets" || pathName === "/landing";
  const token = getToken();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);
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
    }
  }, [token, dispatch, router, userData]);

  useEffect(() => {
    const token = getToken();
    if (!currentUser || !token) {
      dispatch(logout());
      Cookies.remove("access_token");
    }
  }, [currentUser, token, dispatch, router]);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section");
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setScrolled(heroBottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const modalType = searchParams.get("auth");
    if (modalType) {
      handleOpen(true, modalType, email);
    }
  }, [searchParams]);

  const handleOpen = (open: boolean, modalType: string, params?: string) => {
    setShowModal(open);
    setType(modalType);

    if (open) {
      router.push(`?auth=${modalType}${params ? `&email=${params}` : ""}`, {
        shallow: true,
      } as any);
    } else {
      router.push(window.location.pathname, {
        shallow: true,
      } as any);
    }
  };

  const handleClose = () => {
    dispatch(clearEmail());
    handleOpen(false, type);
  };

  return (
    <>
      <div
        className={`${
          scrolled
            ? "fixed left-0"
            : `${isMainRoute ? "absolute" : "fixed bg-white"}`
        }  w-full z-50  transition-all inset-x-0  duration-300 ${
          scrolled ? " bg-white/75 backdrop-blur-xl " : "bg-transparent"
        }`}
      >
        <div className="h-16 flex items-center max-w-screen-custom mx-auto px-4">
          <div className="flex justify-between items-center w-full">
            <div>
              {isMainRoute ? (
                <Logo
                  width={202}
                  height={30}
                  default={scrolled ? true : false}
                />
              ) : (
                <Logo width={202} height={30} default={true} />
              )}
            </div>
            <div className="lg:flex hidden">
              <NavSectionTabs scrolled={scrolled} isMainRoute={isMainRoute} />
            </div>
            {token ? (
              <div className="flex items-center gap-4">
                {isMainRoute ? (
                  <p
                    className={`${
                      scrolled ? "text-black" : "text-white"
                    } text-sm`}
                  >
                    Hi {currentUser?.first_name}
                  </p>
                ) : (
                  <p className={`text-black text-sm`}>
                    Hi {currentUser?.first_name}
                  </p>
                )}
                <Button
                  className="text-xs h-8"
                  onClick={() => {
                    router.push("/bookings");
                    dispatch(
                      setActiveTab({
                        id: "2",
                        title: "Bookings",
                        href: `/bookings`,
                        icon: <MdOutlineDateRange />,
                      })
                    );
                  }}
                >
                  Goto Dashboard
                </Button>
              </div>
            ) : (
              <>
                <div className="hidden lg:flex items-center gap-x-2">
                  <Button
                    variant={"outline"}
                    className={`text-xs h-8 ${
                      isMainRoute
                        ? `${scrolled ? "" : "text-white border-white"} `
                        : "text-black"
                    } w-24`}
                    onClick={() => handleOpen(true, "sign-in")}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="text-xs h-8"
                    onClick={() => handleOpen(true, "create")}
                  >
                    Create an account
                  </Button>
                </div>
                <div className="lg:hidden flex">
                  <Menu
                    color={
                      pathName === "/availability"
                        ? "black"
                        : scrolled
                        ? "black"
                        : "white"
                    }
                    onClick={toggleSidebar}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        {(pathName === "/shortlets" ||
          pathName === "/landing" ||
          "/availability") && (
          <AuthModal
            handleClose={handleClose}
            handleOpen={handleOpen}
            onClose={handleClose}
            setShowModal={setShowModal}
            showModal={showModal}
            type={type}
          />
        )}
      </div>
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-md"
            onClick={closeSidebar}
          ></div>

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 bottom-0 right-0 z-50 w-4/5 bg-white shadow-lg p-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Menu</h2>
              <X
                className="cursor-pointer"
                onClick={closeSidebar}
                size={24}
                color="black"
              />
            </div>
            <div className="mt-4">
              <ul className="space-y-4">
                <li className="cursor-pointer">Home</li>
                <li className="cursor-pointer">About</li>
                <li className="cursor-pointer">Contact</li>
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default HomeNavBar;
