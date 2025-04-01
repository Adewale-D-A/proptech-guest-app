/** @format */
"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_shared/form";
import { Input } from "@/components/_shared/input";
import PhoneNumberInput from "@/components/phoneNumber";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/_shared/button";
import { LoadingButton } from "@/components/_shared/loading-button";
import { Modal } from "@/components/_shared/modal";
import { z } from "zod";
import { updateProfileSchema } from "@/_shared/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@/components/date-picker";
import { format } from "date-fns";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/redux/services/auth/auth";
import { ToastResponse } from "@/types/type";
import { toast } from "@/components/_shared/toast/use-toast";
import { use99Selector } from "@/redux/hooks/hooks";
import { selectUserToken } from "@/redux/slices/authSlice";

const PersonaInfo = () => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [profileDoc, setProfileDoc] = useState<File | null>(null); // Store image file
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const token = use99Selector(selectUserToken);
  const { refetch } = useGetUsersQuery(undefined, {
    skip: !token,
  });

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      gender: "",
    },
  });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileDoc(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (values: z.infer<typeof updateProfileSchema>) => {
    if (!profileDoc) {
      toast({
        variant: "destructive",
        title: "Please upload a file.",
        description: "An error occurred during verify identity",
      });
      return;
    }
    const dob = dateOfBirth ? format(dateOfBirth, "yyyy-MM-dd") : null;
    const formData = new FormData();
    formData.append("profile_photo", profileDoc);
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("email", values.email);
    formData.append("gender", values.gender);
    formData.append("phone", phone);
    if (dob) formData.append("dob", dob);

    try {
      await updateUser(formData as any).unwrap();
      setSuccessModal(true);
      setShow(false);
      refetch();
    } catch (err) {
      const error = err as ToastResponse;
      toast({
        variant: "destructive",
        title: error?.data?.message || "Update user Failed",
        description: "An error occurred during updating user.",
      });
    }
  };

  console.log("profileImage", profileImage);

  const handleSaveChangesClick = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      setShow(true);
    }
  };
  const handleModalSubmitClick = () => {
    form.handleSubmit(onSubmit)();
  };
  return (
    <section className="w-full h-full">
      <section className="w-full">
        <h1 className="font-medium">Personal Information</h1>
        <section className="relative mt-8">
          {imagePreview ? (
            <Image
              src={imagePreview}
              width={0}
              height={0}
              alt="Profile Preview"
              className="rounded-full h-[150px] w-[150px] "
            />
          ) : (
            <Image
              src={"/images/user-1.png"}
              width={150}
              height={150}
              alt="Default User"
            />
          )}
          <label className="bg-primary-1 absolute top-28 left-28 flex items-center justify-center w-8 h-8 rounded-full cursor-pointer">
            <Camera size={18} className="text-white" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </section>
        <section className="w-full mt-10">
          <Form {...form}>
            <form className=" w-full flex flex-col gap-4">
              <div className="flex items-center w-full gap-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="  font-light text-xs">
                        First Name *
                      </FormLabel>
                      <FormControl className="bg-transparent  w-full">
                        <Input
                          className="h-10 bg-white outline-none text-sm w-full  "
                          placeholder="President "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-light text-xs">
                        Last Name *
                      </FormLabel>
                      <FormControl className="bg-transparent w-full">
                        <Input
                          className="bg-white h-10 text-sm   w-full"
                          placeholder="Tinubu"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              <section className="flex items-center gap-4 w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className=" font-light text-xs">
                        Email Address *
                      </FormLabel>
                      <FormControl className="bg-transparent w-full">
                        <Input
                          type="email"
                          className="bg-white h-10 text-sm   w-full"
                          placeholder="Tinubu"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
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
              </section>
              <section className="flex items-center gap-4">
                <div className="w-full">
                  <Label className="font-light text-xs">Gender *</Label>
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="h-10 border-black/10 shadow-none text-gray-100 mt-2">
                          <SelectValue placeholder="Choose Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FormMessage className="text-xs text-red-500" />
                </div>
                <section className="w-full">
                  <DatePicker
                    label="Date of Birth"
                    className="h-10"
                    placeholder="DOB"
                    date={dateOfBirth}
                    setDate={setDateOfBirth}
                  />
                </section>
              </section>
              <div className="flex justify-end mt-6">
                <LoadingButton
                  onClick={handleSaveChangesClick}
                  className="w-40 h-10"
                  type="button"
                >
                  Save Changes
                </LoadingButton>
              </div>
              <Modal
                showModal={show}
                setShowModal={setShow}
                onClose={() => setShow(false)}
                className="relative h-56 rounded-none"
                showCloseIcon
              >
                <div className="w-full">
                  <h2 className="border-b  font-medium py-3 px-8">
                    Update Profile
                  </h2>
                  <div className="px-8 py-4">
                    <h3 className="text-[15px]">Confirm Update</h3>
                    <p className="text-gray-100 text-xs mt-1">
                      Are you sure you want to save changes
                    </p>
                    <div className="w-full gap-3 flex items-center mt-6">
                      <LoadingButton
                        className="w-full mt-0"
                        type="button"
                        onClick={handleModalSubmitClick}
                        loading={isLoading}
                      >
                        Yes, I want to
                      </LoadingButton>

                      <Button
                        onClick={() => setShow(false)}
                        className="w-full"
                        variant={"text"}
                      >
                        No, Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </Modal>
            </form>
          </Form>
        </section>
      </section>
      <Modal
        showModal={successModal}
        setShowModal={setSuccessModal}
        onClose={() => setSuccessModal(false)}
        className="relative max-w-96 h-72 rounded-none"
      >
        <div className="w-full px-8 flex-col flex justify-center items-center h-full">
          <Image src={"/images/box.png"} width={80} height={80} alt="success" />
          <h1 className="mt-6">Update Successful</h1>
          <p className="text-gray-100 text-xs mt-1">
            Your profile has been successfully updated
          </p>
          <Button
            className="w-full mt-6"
            onClick={() => setSuccessModal(false)}
          >
            Done
          </Button>
        </div>
      </Modal>
    </section>
  );
};

export default PersonaInfo;
