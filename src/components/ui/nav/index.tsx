/** @format */
"use client";
import React, { useEffect, useState } from "react";
import Logo from "../logo";
import { Button } from "@/components/_shared/button";
import NavSectionTabs from "./nav-section";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Menu, User, X } from "lucide-react";
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
import { useGetUsersQuery } from "@/redux/services/auth/auth";
import { jwtDecode } from "jwt-decode";
import { getToken } from "@/_shared";
import { navItems } from "@/_shared/data";
import Image from "next/image";
import useWindowSize from "@/components/responsivness";
import Cookies from "js-cookie";

const HomeNavBar = () => {
  const { width } = useWindowSize();
  const mdScreen = width !== undefined && width <= 1024;
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
  const [openMenu, setOpenMenu] = useState(false);

  const toggleSubMenu = (name: string) => {
    if (name === "Adventures") {
      setOpenMenu(!openMenu);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/landing");
    Cookies.remove("access_token");
  };

  const handleGoToDashboard = () => {
    router.push("/bookings");
    dispatch(
      setActiveTab({
        id: "2",
        title: "Bookings",
        href: `/bookings`,
        icon: <MdOutlineDateRange />,
      })
    );
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
                  className=" w-16 h-auto rounded-lg"
                />
              ) : (
                <Logo width={202} height={30} default={true} />
              )}
            </div>
            <div className="lg:flex hidden">
              <NavSectionTabs scrolled={scrolled} isMainRoute={isMainRoute} />
            </div>
            {token ? (
              <>
                <div className="hidden lg:flex items-center gap-4">
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
      {mdScreen && (
        <>
          {isSidebarOpen && (
            <>
              <div
                className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-md"
                onClick={closeSidebar}
              ></div>

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 bottom-0 right-0 z-50 w-4/5 bg-white shadow-lg p-4"
              >
                <section className="flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-center">
                      <Image
                        src={"/images/logos.png"}
                        width={40}
                        height={40}
                        alt="logo"
                        unoptimized
                        priority
                      />
                      <X
                        className="cursor-pointer"
                        onClick={closeSidebar}
                        size={24}
                        color="black"
                      />
                    </div>
                    <section>
                      {token && (
                        <div className="flex mt-6 lg:flex-row lg:items-center gap-4 flex-col w-full">
                          <section className="flex items-center gap-x-2">
                            <div className="bg-slate-200 w-14 h-14 flex justify-center items-center  rounded-full">
                              <User size={30} />
                            </div>
                            {isMainRoute ? (
                              <p className={` text-sm`}>
                                Hi {currentUser?.first_name}
                              </p>
                            ) : (
                              <p className={`text-black text-sm`}>
                                Hi {currentUser?.first_name}
                              </p>
                            )}
                          </section>
                        </div>
                      )}
                    </section>
                    <div className=" flex mt-4 flex-col gap-2">
                      {navItems.map((item, index) => (
                        <div
                          key={index}
                          className="cursor-pointer list-none border-b  py-2"
                          onClick={() => {
                            if (item.name !== "Adventures") {
                              router.push(item.path);
                            } else toggleSubMenu(item.name);
                          }}
                        >
                          {item.subNav ? (
                            <div>
                              <span className="font-medium flex justify-between items-center">
                                {item.name}
                              </span>

                              {openMenu && (
                                <ul className="mt-2 pl-6 space-y-2">
                                  {item.subNav.map((subItem, subIndex) => (
                                    <li
                                      key={subIndex}
                                      className="text-sm font-medium text-gray-600"
                                      onClick={() => router.push(item.path)}
                                    >
                                      {subItem.name}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ) : (
                            <span>{item.name}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    {token ? (
                      <div className="flex lg:flex-row lg:items-center gap-4 flex-col w-full">
                        <Button
                          className="text-xs w-full h-8"
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
                        <div className="block w-full items-center gap-x-2 ">
                          <Button
                            variant={"outline"}
                            className={`text-xs h-8 w-full`}
                            onClick={() => {
                              handleOpen(true, "sign-in");
                              closeSidebar();
                            }}
                          >
                            Sign In
                          </Button>
                          <Button
                            className="text-xs h-8 mt-4 w-full"
                            onClick={() => {
                              handleOpen(true, "create");
                              closeSidebar();
                            }}
                          >
                            Create an account
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </section>
              </motion.div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default HomeNavBar;
