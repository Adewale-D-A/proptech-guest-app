/** @format */

"use client";
import React, { useState } from "react";
import Logo from "../../logo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_shared/form";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/_shared/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/_shared/toast/use-toast";
import { LoadingButton } from "@/components/_shared/loading-button";
import { useResetPasswordMutation } from "@/redux/services/auth/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { use99Dispatch } from "@/redux/hooks/hooks";
import { clearEmail } from "@/redux/slices/emailSlice";

const changePasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    password_confirmation: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords must match",
    path: ["password_confirmation"],
  });

const ChangePasswordForm = ({
  handleOpen,
  token,
}: {
  handleOpen: (open: boolean, modalType: string) => void;
  token: string;
}) => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const dispatch = use99Dispatch();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    const payload = { ...values, email, token };
    try {
      const response = await resetPassword(payload).unwrap();
      toast({
        variant: "default",
        title: response?.message || "Password changed successfully!",
        description: "Your password has been updated.",
      });
      dispatch(clearEmail());
      handleOpen(true, "successful");
    } catch (err) {
      const errorMessage =
        (err as any)?.data?.message ||
        "Failed to change password. Please try again.";
      toast({
        variant: "destructive",
        title: "Error!",
        description: errorMessage,
      });
    }
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="flex justify-center">
          <Logo default height={31} width={180} />
        </div>
        <h1 className="text-lg text-center font-medium mt-4">
          Change Password
        </h1>
        <p className="text-xs font-light mt-1 w-72 mx-auto text-center">
          Enter a new password that you can remember easily.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-light">
                      New Password
                    </FormLabel>
                    <FormControl className="bg-transparent">
                      <div className="relative">
                        <Input
                          className="bg-white font-light w-full pr-10"
                          placeholder="Enter password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <div
                          className="absolute right-2 top-2 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Eye size={18} className="text-black/50" />
                          ) : (
                            <EyeOff size={18} className="text-black/50" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 font-light" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password_confirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-light">
                      Confirm Password
                    </FormLabel>
                    <FormControl className="bg-transparent">
                      <div className="relative">
                        <Input
                          className="bg-white font-light w-full pr-10"
                          placeholder="Confirm password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <div
                          className="absolute right-2 top-2 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Eye size={18} className="text-black/50" />
                          ) : (
                            <EyeOff size={18} className="text-black/50" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 font-light" />
                  </FormItem>
                )}
              />
            </div>
            <LoadingButton
              onClick={form.handleSubmit(onSubmit)}
              className="w-full"
              loading={isLoading}
            >
              Change Password
            </LoadingButton>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
