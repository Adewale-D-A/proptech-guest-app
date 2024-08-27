/** @format */
"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Camera, Eye, EyeOff, Link, LockKeyhole, MailIcon } from "lucide-react";
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

const PersonaInfo = () => {
  const [show, setShow] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
  });
  const handleSuccessClick = () => {
    setSuccessModal(true);
    setShow(false);
  };
  return (
    <section className="w-full h-full">
      <section className="w-full">
        <h1 className="font-medium">Personal Information</h1>
        <section className="relative mt-8">
          <Image
            src={"/images/user-1.png"}
            width={150}
            height={150}
            alt="user"
          />
          <div className="bg-primary-1 absolute top-28 left-28 flex items-center justify-center w-8 h-8 rounded-full cursor-pointer">
            <Camera size={18} className="text-white" />
          </div>
        </section>
        <section className="w-full mt-10">
          <Form {...form}>
            <form className=" w-full flex flex-col gap-4">
              <div className="flex items-center w-full gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
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
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
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
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <section className="flex items-center gap-4 w-full">
                <FormField
                  control={form.control}
                  name="lastName"
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
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <div className="w-full">
                  <FormLabel className="font-light text-xs">
                    Phone Number
                  </FormLabel>
                  <PhoneNumberInput
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    includePlusPrefix
                    required={false}
                    classNames="rounded-md mt-2"
                  />
                </div>
              </section>
              <section className="w-1/2 flex gap-4">
                <div className="w-full">
                  <Label className="font-light  text-xs">Gender *</Label>
                  <Select>
                    <SelectTrigger className="h-10 border-black/10 shadow-none text-gray-100 mt-2">
                      <SelectValue placeholder="Choose a tag" className=" " />
                    </SelectTrigger>

                    <SelectContent className="border-none">
                      {[
                        { id: "male", name: "Male" },
                        { id: "female", name: "Female" },
                      ].map((tag) => (
                        <SelectItem
                          key={tag.id}
                          value={tag.id}
                          className="border-none"
                        >
                          {tag.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </section>
              <div className="flex justify-end mt-6">
                <LoadingButton
                  onClick={() => setShow(true)}
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
                      <Button onClick={handleSuccessClick} className="w-full">
                        Yes, I want to
                      </Button>
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
          <Button className="w-full mt-6">Done</Button>
        </div>
      </Modal>
    </section>
  );
};

export default PersonaInfo;
