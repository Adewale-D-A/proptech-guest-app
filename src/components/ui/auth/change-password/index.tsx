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

const ChangePasswordForm = ({
  onClickSuccess,
}: {
  onClickSuccess: () => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      newPassword: "",
      password: "",
    },
  });
  function onSubmit(values: any) {
    console.log(values);
    if (values) {
      toast({
        variant: "default",
        title: "change password successful!",
        description: "Welcome to 99Apartment 🚀",
      });
    } else if (!values) {
      toast({
        variant: "destructive",
        title: "Error login!",
      });
    }
  }
  return (
    <div className="w-full">
      <div className=" w-full">
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
                    <FormLabel className="text-xs  font-light">
                      New Password
                    </FormLabel>
                    <FormControl className="bg-transparent">
                      <div className="relative">
                        <Input
                          className="bg-white font-light   w-full   pr-10"
                          placeholder="Enter password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <div
                          className="absolute right-2 top-2 "
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Eye
                              size={18}
                              className="text-black/50 cursor-pointer"
                            />
                          ) : (
                            <EyeOff
                              size={18}
                              className="text-black/50 cursor-pointer"
                            />
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
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs  font-light">
                      Confirm Password
                    </FormLabel>
                    <FormControl className="bg-transparent">
                      <div className="relative">
                        <Input
                          className="bg-white font-light   w-full   pr-10"
                          placeholder="Enter password"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <div
                          className="absolute right-2 top-2 "
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <Eye
                              size={18}
                              className="text-black/50 cursor-pointer"
                            />
                          ) : (
                            <EyeOff
                              size={18}
                              className="text-black/50 cursor-pointer"
                            />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 font-light" />
                  </FormItem>
                )}
              />
            </div>
            <LoadingButton onClick={onClickSuccess} className="w-full ">
              Change Password
            </LoadingButton>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
