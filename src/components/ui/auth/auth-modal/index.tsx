/** @format */

import { Modal } from "@/components/_shared/modal";
import React from "react";
import {
  ChangePasswordForm,
  ForgetPasswordOtp,
  ForgotPasswordForm,
  OtpForm,
  SignInform,
  SignUpForm,
  SuccessfulModal,
} from "..";

interface AuthModalProps {
  showModal: boolean;
  type: string;
  onClose: () => void;
  handleOpen: (open: boolean, modalType: string, params?: string) => void;
  // setToken: (val: string) => void;
  // token: string;
  handleClose: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthModal = ({
  handleOpen,
  showModal,
  type,
  // setToken,
  // token,
  handleClose,
  setShowModal,
}: AuthModalProps) => {
  return (
    <>
      <Modal
        showModal={showModal}
        onClose={handleClose}
        setShowModal={setShowModal}
        className={`relative p-4 xs:p-6 ${
          type === "sign-in" ||
          type === "forgot-password" ||
          type === "otp" ||
          type === "forget-password-otp" ||
          type === "change-password" ||
          type === "successful"
            ? "min-w-[400px]"
            : "sm:min-w-[550px]"
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
          <ChangePasswordForm handleOpen={handleOpen} />
        )}
        {type === "successful" && (
          <SuccessfulModal onClickLogin={() => handleOpen(true, "sign-in")} />
        )}

        {type === "forget-password-otp" && (
          <ForgetPasswordOtp
            onClickChangePassword={() => handleOpen(true, "change-password")}
            onClickLogin={() => handleOpen(true, "sign-in")}
            handleOpen={handleOpen}
          />
        )}
      </Modal>
    </>
  );
};

export default AuthModal;
