/** @format */
"use client";
import React from "react";
import Logo from "../../logo";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/_shared/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/_shared/toast/use-toast";
import { Button } from "@/components/_shared/button";
import { LoadingButton } from "@/components/_shared/loading-button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/_shared/form/otp-input";
import {
  useForgotPasswordMutation,
  useVerifyForgetPasswordMutation,
} from "@/redux/services/auth/auth";
import { useSearchParams } from "next/navigation";
import { ToastResponse } from "@/types/type";
import { use99Dispatch } from "@/redux/hooks/hooks";
import { setUserToken } from "@/redux/slices/authSlice";

const ForgetPasswordOtp = ({
  onClickLogin,
  handleOpen,
}: {
  onClickChangePassword: () => void;
  onClickLogin: () => void;
  handleOpen: (open: boolean, modalType: string) => void;
}) => {
  const [verifyPasswordOtp, { isLoading }] = useVerifyForgetPasswordMutation();
  const [resendOtp, { isLoading: resendLoading }] = useForgotPasswordMutation();
  const dispatch = use99Dispatch();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      otp: "",
    },
  });
  async function onSubmit(values: any) {
    try {
      const verifyData = { ...values, email };
      const response = await verifyPasswordOtp(verifyData).unwrap();
      dispatch(setUserToken(response?.data?.token));
      toast({
        variant: "default",
        title: response?.message || "Success!",
        description: "Welcome to The Spotlagos 🚀",
      });
      handleOpen(true, "change-password");
    } catch (err) {
      const error = err as ToastResponse;
      toast({
        variant: "destructive",
        title: error?.data?.message || "Unable to verify ",
        description: "An error occurred ",
      });
    }
  }

  const handleResendOtp = async () => {
    try {
      const resendResponse = await resendOtp({ email }).unwrap();
      toast({
        variant: "default",
        title: resendResponse?.message || "OTP resent successfully!",
        description: "Check your email for the OTP.",
      });
    } catch (err) {
      const error = err as ToastResponse;

      toast({
        variant: "destructive",
        title: error?.data?.message || "Unable to resend OTP",
        description: "An error occurred while resending the OTP.",
      });
    }
  };

  return (
    <div className="w-full h-full">
      <div className=" w-full h-full">
        <div className="flex justify-center">
          <Logo default height={31} width={180} />
        </div>
        <h1 className="text-lg text-center font-medium mt-4">
          OTP Verification
        </h1>
        <p className="text-xs font-light mt-1 w-5/6 mx-auto text-center text-[#6D6D6D]">
          Please input the 6-digit code sent to your email for verification
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 h-full">
            <div className="flex flex-col justify-between h-full ">
              <div className="flex flex-col items-center  gap-2 flex-1">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup className="flex gap-2 sm:gap-3">
                            <InputOTPSlot index={0} className={` `} />
                            <InputOTPSlot index={1} className="" />
                            <InputOTPSlot index={2} className="" />
                            <InputOTPSlot index={3} className="" />
                            <InputOTPSlot index={4} className="" />
                            <InputOTPSlot index={5} className=" " />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="text-xs">
                  Didn’t receive code?{" "}
                  <Button
                    variant={"text"}
                    className="p-0 font-normal underline text-primary-1 text-xs"
                    onClick={handleResendOtp}
                    disabled={resendLoading}
                  >
                    {resendLoading ? "Resending..." : "Resend"}
                  </Button>
                </p>
              </div>
              <div className="h-full flex-1">
                <LoadingButton
                  loading={isLoading}
                  type="submit"
                  className="w-full "
                >
                  Continue
                </LoadingButton>
                <p className="text-xs text-center font-light ">
                  Back to {"  "}
                  <Button
                    className="p-0 text-xs font-light text-primary hover:underline"
                    variant={"text"}
                    onClick={onClickLogin}
                  >
                    Log in
                  </Button>{" "}
                </p>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPasswordOtp;
