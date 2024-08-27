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
import { Upload } from "lucide-react";
import Image from "next/image";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

const VerifyAccount = () => {
    const [successModal, setSuccessModal] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else {
      setPreview(null);
    }
  };
  const handleEmptyImage = () => {
    setPreview(null);
  };
  const form = useForm({
    defaultValues: {
      file1: "",
    },
  });
  return (
    <div className="px-4 pb-10">
      <div>
        <h1 className="font-medium">Identity Verification</h1>
        <p className="text-xs text-gray-100 mt-3">
          Upload a valid means of ID (e.g driver’s license, national ID,
          international passport biodata page)
        </p>
        <Form {...form}>
          <form action="">
            <>
              <FormField
                control={form.control}
                name="file1"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem className="flex flex-col items-center border mt-4 shadow-none border-dashed border-primary-1 bg-[#f9faff] h-40 rounded-md justify-center">
                    <FormLabel className="flex cursor-pointer  items-center  rounded-lg flex-col gap-2 justify-center w-full  h-24  border-none shadow-none ">
                      <Upload size={20} />
                      <p className=" text-center ">Upload PNG, PDF, JPEG</p>
                      <p className="text-[#726C6C]  text-xs text-center">
                        Max. file size is 3MB
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        placeholder="Picture"
                        type="file"
                        className="border-none mx-auto hidden"
                        accept="image/*, application/pdf"
                        onChange={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
            <div className="flex justify-end mt-6">
              <LoadingButton
                onClick={() => setSuccessModal(true)}
                className="w-40 h-10"
                type="button"
              >
                Submit
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
      <Modal
        showModal={successModal}
        setShowModal={setSuccessModal}
        onClose={() => setSuccessModal(false)}
        className="relative max-w-96 h-72 rounded-none"
      >
        <div className="w-full px-8 flex-col flex justify-center items-center h-full">
          <Image src={"/images/file.png"} width={80} height={80} alt="success" />
          <h1 className="mt-6">File Uploaded Successfully</h1>
          <p className="text-gray-100 text-xs mt-1">
            We've received your submission, and our team is currently verifying
            the information. Expect an email shortly with updates on the
            verification process.
          </p>
          <Button className="w-full mt-6">Done</Button>
        </div>
      </Modal>
    </div>
  );
};

export default VerifyAccount;
