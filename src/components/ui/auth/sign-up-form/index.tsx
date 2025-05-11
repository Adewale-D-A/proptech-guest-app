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
import { signUpValidationSchema } from "@/_shared/validate";
import { useToast } from "@/components/_shared/toast/use-toast";
import { z } from "zod";
import { Button } from "@/components/_shared/button";
import { LoadingButton } from "@/components/_shared/loading-button";
import { Checkbox } from "@/components/_shared/check-box";
import PhoneNumberInput from "@/components/phoneNumber";
import { useSignUpMutation } from "@/redux/services/auth/auth";
import { ToastResponse } from "@/types/type";
import { useDispatch } from "react-redux";
import { setEmail } from "@/redux/slices/emailSlice";
import { use99Dispatch } from "@/redux/hooks/hooks";

const SignUpForm = ({
  onClickLogin,
  handleOpen,
}: {
  handleOpen: (open: boolean, modalType: string, email: string) => void;
  onClickLogin: () => void;
}) => {
  const { toast } = useToast();
  const dispatch = use99Dispatch();
  const [signUp, { isLoading }] = useSignUpMutation();
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [termsError, setTermsError] = useState("");
  const form = useForm<z.infer<typeof signUpValidationSchema>>({
    resolver: zodResolver(signUpValidationSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
      first_name: "",
      last_name: "",
    },
  });
  const onSubmit = async (
    values: z.infer<typeof signUpValidationSchema>,
    e?: React.BaseSyntheticEvent
  ) => {
    if (e) {
      e.preventDefault();
    }

    if (!isTermsChecked) {
      setTermsError("You must agree to the terms and conditions.");
      return;
    }
    setTermsError("");

    const userEmail = encodeURIComponent(values.email);
    dispatch(setEmail(userEmail));

    try {
      const signUpData = { ...values, phone };
      const response = await signUp(signUpData).unwrap();
      toast({
        variant: "default",
        title: response?.message || "Success!",
        description: "Welcome to 99Apartment 🚀",
      });
      handleOpen(true, "otp", userEmail);
    } catch (err: any) {
      const errorData = err?.data?.data;

      // Handle field-specific validation errors
      if (errorData?.message) {
        const fieldErrors = errorData.message;

        // Check for email errors
        if (fieldErrors.email) {
          toast({
            variant: "destructive",
            title: "Email Error",
            description: fieldErrors.email[0],
          });
          return;
        }

        // Check for phone errors
        if (fieldErrors.phone) {
          toast({
            variant: "destructive",
            title: "Phone Number Error",
            description: fieldErrors.phone[0],
          });
          return;
        }

        // Handle any other field errors
        const firstErrorField = Object.keys(fieldErrors)[0];
        if (firstErrorField) {
          toast({
            variant: "destructive",
            title: `${
              firstErrorField.charAt(0).toUpperCase() + firstErrorField.slice(1)
            } Error`,
            description: fieldErrors[firstErrorField][0],
          });
          return;
        }
      }

      // Fallback error message
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: "An error occurred during sign-up.",
      });
    }
  };

  return (
    <div className="w-full">
      <div className=" w-full">
        <div className="flex justify-center">
          <Logo default height={31} width={180} />
        </div>
        <h1 className="text-lg text-center font-medium mt-4">
          Create an Account
        </h1>
        <p className="text-xs font-light mt-1 w-72 mx-auto text-center">
          We are happy to have you. To use 99Apartment, you need to create an
          account first
        </p>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)(e);
            }}
            className="mt-6"
          >
            <div className="flex flex-col gap-2 w-full">
              <div className="flex  lg:flex-row flex-col w-full gap-4 ">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-xs font-light">
                        First name
                      </FormLabel>
                      <FormControl className="bg-transparent w-full">
                        <Input
                          className="bg-white   outline-none text-sm   w-full"
                          placeholder="Enter your first name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 font-light" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-xs font-light">
                        Last name
                      </FormLabel>
                      <FormControl className="bg-transparent w-full">
                        <Input
                          className="bg-white  outline-none text-sm  w-full"
                          placeholder="Enter your last name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 font-light" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs   font-light">
                      Email Address
                    </FormLabel>
                    <FormControl className="bg-transparent">
                      <Input
                        className="bg-white font-light w-full   "
                        placeholder="Enter email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 font-light" />
                  </FormItem>
                )}
              />
              <div className="w-full">
                <FormLabel className="font-light text-xs">
                  Phone Number
                </FormLabel>
                <PhoneNumberInput
                  value={phone}
                  onChange={setPhone}
                  includePlusPrefix
                  required={false}
                  classNames="rounded-md mt-2"
                />
              </div>
              <div className="flex  lg:flex-row flex-col w-full gap-4 ">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-xs  font-light">
                        Create Password
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
                  name="password_confirmation"
                  render={({ field, fieldState }) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-xs font-light">
                        Confirm Password
                      </FormLabel>
                      <FormControl className="bg-transparent">
                        <div className="relative">
                          <Input
                            className="bg-white text-sm "
                            placeholder="Enter your password"
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
                      <FormMessage className="text-xs text-red-500 font-light">
                        {fieldState.error?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex mt-6 gap-2">
              <Checkbox
                id="terms"
                className="p-0 m-0 border shadow-none border-primary"
                checked={isTermsChecked}
                onCheckedChange={(checked) => setIsTermsChecked(!!checked)}
              />
              <p className="text-xs font-light">
                By providing your email address you agree to our{" "}
                <span className="text-primary">Privacy Policy</span>
                and <span className="text-primary">Terms of Service</span>{" "}
              </p>
            </div>
            {termsError && (
              <p className="text-xs text-red-500 font-light mt-1">
                {termsError}
              </p>
            )}
            <LoadingButton loading={isLoading} className="w-full ">
              Create account
            </LoadingButton>
            <p className="text-xs text-center font-light ">
              Already have an account?{" "}
              <Button
                className="p-0 text-xs font-light text-primary hover:underline"
                variant={"text"}
                onClick={onClickLogin}
              >
                Log In
              </Button>{" "}
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
