/** @format */

"use client";
import React, { useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/_shared/input";
import { useForm } from "react-hook-form";
import { signInValidationSchema } from "@/_shared/validate";
import { useToast } from "@/components/_shared/toast/use-toast";
import { z } from "zod";
import { Button } from "@/components/_shared/button";
import { LoadingButton } from "@/components/_shared/loading-button";
import { useSignInMutation } from "@/redux/services/auth/auth";
import { use99Dispatch } from "@/redux/hooks/hooks";
import { setUserDetails, setUserToken } from "@/redux/slices/authSlice";
import Cookies from "js-cookie";
const SignInform = ({
  onClick,
  onClickForgetPassword,
  handleClose,
}: {
  onClick: () => void;
  onClickForgetPassword: () => void;
  handleClose: () => void;
}) => {
  const dispatch = use99Dispatch();
  const [signIn, { isLoading }] = useSignInMutation();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signInValidationSchema>>({
    resolver: zodResolver(signInValidationSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof signInValidationSchema>) => {
    try {
      const response = await signIn(values).unwrap();
      const token = response?.data?.access_token;
      dispatch(setUserToken(response?.data?.access_token));
      Cookies.set("access_token", response?.data?.access_token, { expires: 7 });
      const rememberMe = form.getValues("rememberMe");
      if (rememberMe) {
        Cookies.set("access_token", token, { expires: 30 });
      } else {
        Cookies.set("access_token", token, { expires: 7 });
      }
      dispatch(setUserDetails(response?.data?.user));
      toast({
        variant: "default",
        title: response?.message,
        description: "Welcome to 99Apartment 🚀",
      });
      handleClose();
    } catch (err) {
      const errorMessage =
        (err as any)?.data?.message || "Login failed. Please try again.";
      toast({
        variant: "destructive",
        title: "Error login!",
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
        <h1 className="text-lg text-center font-medium mt-4">Sign In</h1>
        <p className="text-xs font-light mt-1 w-72 mx-auto text-center">
          To continue using your account, please enter your sign-in details.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
            <div className="flex flex-col gap-2">
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-light">
                      Password
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
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="bg-transparent">
                        <div className="flex items-center gap-2">
                          <Input
                            type="checkbox"
                            id="rememberMe"
                            className="p-0 m-0 w-4 h-4 border shadow-none border-primary"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                          <p className="text-xs font-light">Remember me</p>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                variant={"text"}
                className="text-xs p-0 font-light text-primary hover:underline"
                onClick={onClickForgetPassword}
              >
                Forgot Password?
              </Button>
            </div>
            <LoadingButton className="w-full" loading={isLoading}>
              Sign in
            </LoadingButton>
            <p className="text-xs text-center font-light">
              Don’t have an account?{" "}
              <Button
                className="p-0 text-xs font-light text-primary hover:underline"
                variant={"text"}
                onClick={onClick}
              >
                Create Account
              </Button>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInform;
