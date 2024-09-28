/** @format */
"use client";
import React, { useEffect, useState } from "react";
import Logo from "../logo";
import { Button } from "@/components/_shared/button";
import NavSectionTabs from "./nav-section";
import { Modal } from "@/components/_shared/modal";
import {
  ChangePasswordForm,
  ForgetPasswordOtp,
  ForgotPasswordForm,
  OtpForm,
  SignInform,
  SignUpForm,
  SuccessfulModal,
} from "../auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Menu } from "lucide-react";
import { clearEmail, selectEmail } from "@/redux/slices/emailSlice";
import { use99Dispatch, use99Selector } from "@/redux/hooks/hooks";
import { selectCurrentUser } from "@/redux/slices/authSlice";

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
  const [token, setToken] = useState("");
  const isMainRoute = pathName === "/shortlets" || pathName === "/landing";

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
            {currentUser ? (
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
                  onClick={() => router.push("/bookings")}
                >
                  Goto Dashboard
                </Button>
              </div>
            ) : (
              <>
                {" "}
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
              </>
            )}
          </div>
        </div>
        <Modal
          showModal={showModal}
          onClose={handleClose}
          setShowModal={setShowModal}
          className={`relative p-6 ${
            type === "sign-in" ||
            type === "forgot-password" ||
            type === "otp" ||
            type === "forget-password-otp" ||
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
              handleClose={handleClose}
            />
          )}
          {type === "forgot-password" && (
            <ForgotPasswordForm
              onClickLogin={() => handleOpen(true, "sign-in")}
              handleOpen={handleOpen}
            />
          )}
          {type === "create" && (
            <SignUpForm
              onClickLogin={() => handleOpen(true, "sign-in")}
              handleOpen={handleOpen}
            />
          )}
          {type === "otp" && (
            <OtpForm
              onClickChangePassword={() => handleOpen(true, "change-password")}
              onClickLogin={() => handleOpen(true, "sign-in")}
              handleOpen={handleOpen}
            />
          )}
          {type === "change-password" && (
            <ChangePasswordForm token={token} handleOpen={handleOpen} />
          )}
          {type === "successful" && (
            <SuccessfulModal onClickLogin={() => handleOpen(true, "sign-in")} />
          )}

          {type === "forget-password-otp" && (
            <ForgetPasswordOtp
              onClickChangePassword={() => handleOpen(true, "change-password")}
              onClickLogin={() => handleOpen(true, "sign-in")}
              handleOpen={handleOpen}
              setToken={setToken}
            />
          )}
        </Modal>
      </div>
    </>
  );
};

export default HomeNavBar;
