/** @format */

"use client";
import React from "react";
import Logo from "../../logo";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_shared/form";
import { Input } from "@/components/_shared/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/_shared/toast/use-toast";
import { Button } from "@/components/_shared/button";
import { LoadingButton } from "@/components/_shared/loading-button";
import { useForgotPasswordMutation } from "@/redux/services/auth/auth";
import { z } from "zod";
import { use99Dispatch } from "@/redux/hooks/hooks";
import { setEmail } from "@/redux/slices/emailSlice";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
});

const ForgotPasswordForm = ({
  onClickLogin,
  handleOpen,
}: {
  onClickLogin: () => void;
  handleOpen: (open: boolean, modalType: string, email: string) => void;
}) => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const dispatch = use99Dispatch();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      const response = await forgotPassword(values).unwrap();

      toast({
        variant: "default",
        title: response?.message || "otp sent!",
        description:
          "Please check your email for instructions to reset your password.",
      });
      const userEmail = encodeURIComponent(values.email);
      dispatch(setEmail(userEmail));
      handleOpen(true, "forget-password-otp", userEmail);
    } catch (err) {
      const errorMessage =
        (err as any)?.data?.message ||
        "Failed to send password reset code. Please try again.";
      toast({
        variant: "destructive",
        title: "Error!",
        description: errorMessage,
      });
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <div className="flex justify-center">
          <Logo default height={31} width={180} />
        </div>
        <h1 className="text-lg text-center font-medium mt-4">Password Reset</h1>
        <p className="text-xs font-light mt-1 w-72 mx-auto text-center">
          Enter your email address to receive a code to reset your password
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 h-full">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-2 flex-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-light">
                        Email Address
                      </FormLabel>
                      <FormControl className="bg-transparent">
                        <Input
                          className="bg-white font-light w-full"
                          placeholder="Enter email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 font-light" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="h-full flex-1">
                <LoadingButton className="w-full" loading={isLoading}>
                  Continue
                </LoadingButton>
                <p className="text-xs text-center font-light">
                  Back to{" "}
                  <Button
                    className="p-0 text-xs font-light text-primary hover:underline"
                    variant={"text"}
                    onClick={onClickLogin}
                  >
                    Log in
                  </Button>
                </p>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
