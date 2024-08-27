/** @format */
"use client";
import React from "react";
import Logo from "../../logo";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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

const OtpForm = ({
  onClickChangePassword,
  onClickLogin,
}: {
  onClickChangePassword: () => void;
  onClickLogin: () => void;
}) => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      code: "",
    },
  });
  function onSubmit(values: any) {
    console.log(values);
    if (values) {
      toast({
        variant: "default",
        title: "Otp successful!",
        description: "Welcome to 99Apartment 🚀",
      });
    } else if (!values) {
      toast({
        variant: "destructive",
        title: "Error otp!",
      });
    }
  }
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
          Please input the 6-digit code sent to your email address linked to
          your card to verify this payment.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 h-full">
            <div className="flex flex-col justify-between h-full ">
              <div className="flex flex-col items-center  gap-2 flex-1">
                <FormField
                  control={form.control}
                  name="code"
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
                  >
                    Resend
                  </Button>
                </p>
              </div>
              <div className="h-full flex-1">
                <LoadingButton
                  onClick={onClickChangePassword}
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

export default OtpForm;
