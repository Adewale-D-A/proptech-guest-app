/** @format */
"use client";
import React, { useEffect, useState } from "react";
import Logo from "../logo";
import { Button } from "@/components/_shared/button";
import NavSectionTabs from "./nav-section";
import { Modal } from "@/components/_shared/modal";
import {
  ChangePasswordForm,
  ForgotPasswordForm,
  OtpForm,
  SignInform,
  SignUpForm,
  SuccessfulModal,
} from "../auth";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";

const HomeNavBar = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const pathName = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("");
  const isMainRoute = pathName === "/shortlets" || pathName === "/landing";

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section");
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setScrolled(heroBottom < 0);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Clean up event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpen = (open: boolean, types: string) => {
    setShowModal(open);
    setType(types);
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
        <div className=" h-16 flex items-center max-w-screen-custom mx-auto px-4 ">
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
            <div className="hidden md:flex items-center gap-x-2">
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
            <div className="md:hidden flex">
              <Menu color={scrolled ? "black" : "white"} />
            </div>
          </div>
        </div>
        <Modal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          setShowModal={setShowModal}
          className={`relative p-6 ${
            type === "sign-in" ||
            type === "forgot-password" ||
            type === "otp" ||
            type === "change-password" ||
            type === "successful"
              ? "min-w-[400px]"
              : "min-w-[550px]"
          } ${
            type === "create" ||
            type === "change-password" ||
            type === "successful"
              ? "h-fit"
              : "h-[450px]"
          } bg-white`}
        >
          {type === "sign-in" && (
            <SignInform
              onClick={() => handleOpen(true, "create")}
              onClickForgetPassword={() => handleOpen(true, "forgot-password")}
            />
          )}
          {type === "forgot-password" && (
            <ForgotPasswordForm
              onClickLogin={() => handleOpen(true, "sign-in")}
              onClickOtp={() => handleOpen(true, "otp")}
            />
          )}
          {type === "create" && (
            <SignUpForm onClickLogin={() => handleOpen(true, "sign-in")} />
          )}
          {type === "otp" && (
            <OtpForm
              onClickChangePassword={() => handleOpen(true, "change-password")}
              onClickLogin={() => handleOpen(true, "sign-in")}
            />
          )}

          {type === "change-password" && (
            <ChangePasswordForm
              onClickSuccess={() => handleOpen(true, "successful")}
            />
          )}
          {type === "successful" && (
            <SuccessfulModal onClickLogin={() => handleOpen(true, "sign-in")} />
          )}
        </Modal>
      </div>
    </>
  );
};

export default HomeNavBar;
