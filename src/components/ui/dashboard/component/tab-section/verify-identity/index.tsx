/** @format */
"use client";
import { Button } from "@/components/_shared/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_shared/form";
import { Input } from "@/components/_shared/input";
import { LoadingButton } from "@/components/_shared/loading-button";
import { Modal } from "@/components/_shared/modal";
import { useToast } from "@/components/_shared/toast/use-toast";
import FileDetails from "@/components/format-file-size";
import {
  useUpdateUserDocsMutation,
  useGetUsersQuery,
} from "@/redux/services/auth/auth";

import { ToastResponse } from "@/types/type";
import { Upload } from "lucide-react";
import Image from "next/image";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const VerifyAccount = () => {
  const { toast } = useToast();
  const [updateUserDoc, { isLoading }] = useUpdateUserDocsMutation();
  const { data: userData, isLoading: userDataLoading } = useGetUsersQuery();
  const [successModal, setSuccessModal] = useState(false);
  const [successPage, setSuccessPage] = useState(false);
  const [profileDoc, setProfileDoc] = useState<File | null>(null); // Store image file
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Check user verification status when data is loaded
  useEffect(() => {
    if (userData && !userDataLoading) {
      if (
        userData.identity_verification_status === "submitted" &&
        userData.identity_verified === true
      ) {
        setSuccessPage(true);
      }
    }
  }, [userData, userDataLoading]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileDoc(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const form = useForm({
    defaultValues: {
      identity_document: "",
    },
  });

  const handleSubmit = async (data: any) => {
    if (!profileDoc) {
      toast({
        variant: "destructive",
        title: "Please upload a file.",
        description: "An error occurred during verify identity",
      });
      return;
    }

    const formData = new FormData();
    formData.append("identity_document", profileDoc);

    try {
      const res = await updateUserDoc(formData as any).unwrap();
      setSuccessModal(true);
    } catch (err) {
      const error = err as ToastResponse;
      toast({
        variant: "destructive",
        title: error?.data?.message || "Verify Identity Failed",
        description: "An error occurred during verify identity",
      });
    }
  };

  const handleClick = () => {
    setSuccessPage(true);
    setSuccessModal(false);
  };

  // Show loading state while checking user data
  if (userDataLoading) {
    return (
      <div className="px-4 pb-10 h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="px-4 pb-10 h-full">
      {successPage ? (
        <div className="flex gap-y-2 flex-col items-center justify-center h-full">
          <Image
            src={"/images/user-sc.png"}
            width={100}
            height={100}
            alt="success"
          />
          <h1 className="text-2xl">Identity Verified</h1>
          <p className="text-gray-100 text-center w-80 text-xs">
            Your identity verification is complete. You can now enjoy the full
            99Apartment experience.
          </p>
        </div>
      ) : (
        <div>
          <h1 className="font-medium">Identity Verification</h1>
          <p className="text-xs text-gray-100 mt-3">
            Upload a valid means of ID (e.g driver’s license, national ID,
            international passport biodata page)
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <>
                <FormField
                  control={form.control}
                  name="identity_document"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem
                      className={`flex flex-col items-center border mt-4 shadow-none border-dashed border-primary-1 py-4 bg-[#f9faff] ${
                        profileDoc ? "h-fit" : "h-40"
                      } rounded-md justify-center`}
                    >
                      <FormLabel
                        className={`flex cursor-pointer  items-center  rounded-lg flex-col gap-2 justify-center w-full  h-24  border-none shadow-none ${
                          profileDoc ? "h-fit" : " h-24 "
                        } `}
                      >
                        {profileDoc ? (
                          <>
                            {profileDoc?.type === "application/pdf" ||
                            profileDoc?.type === "pdf" ? (
                              <div className="flex items-center flex-col ">
                                <Image
                                  src={"/images/docs.png"}
                                  width={50}
                                  height={50}
                                  alt="document"
                                />
                                {profileDoc && (
                                  <FileDetails file={profileDoc} />
                                )}
                              </div>
                            ) : (
                              <div>
                                {imagePreview && (
                                  <div className="flex items-center flex-col">
                                    <Image
                                      src={imagePreview}
                                      width={0}
                                      height={0}
                                      alt="Profile Preview"
                                      className=" h-[150px] w-[150px] "
                                    />
                                    {profileDoc && (
                                      <FileDetails file={profileDoc} />
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <Upload size={20} />
                            <p className=" text-center ">
                              Upload PNG, PDF, JPEG
                            </p>
                            <p className="text-[#726C6C]  text-xs text-center">
                              Max. file size is 3MB
                            </p>
                          </>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...fieldProps}
                          placeholder="Picture"
                          type="file"
                          className="border-none mx-auto hidden"
                          accept="image/*, application/pdf"
                          onChange={handleImageChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
              <div className="flex justify-end mt-6">
                <LoadingButton
                  className="w-40 h-10"
                  type="submit"
                  loading={isLoading}
                >
                  Submit
                </LoadingButton>
              </div>
            </form>
          </Form>
        </div>
      )}

      <Modal
        showModal={successModal}
        setShowModal={setSuccessModal}
        onClose={() => setSuccessModal(false)}
        className="relative max-w-96 py-10 rounded-none"
      >
        <div className="w-full px-8 flex-col flex justify-center items-center h-full">
          <Image
            src={"/images/file.png"}
            width={80}
            height={80}
            alt="success"
          />
          <h1 className="mt-6">File Uploaded Successfully</h1>
          <p className="text-gray-100 text-center text-xs mt-1">
            We&apos;ve received your submission, and our team is currently
            verifying We&apos;ve received your submission, and our team is
            currently verifying We&apos;ve received your submission, and our
            team is currently verifying the information. Expect an email shortly
            with updates on the verification process.
          </p>
          <LoadingButton
            loading={isLoading}
            className="w-full mt-6"
            onClick={handleClick}
          >
            Done
          </LoadingButton>
        </div>
      </Modal>
    </div>
  );
};

export default VerifyAccount;
