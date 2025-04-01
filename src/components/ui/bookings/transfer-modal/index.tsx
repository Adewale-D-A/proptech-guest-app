/** @format */

import { useToast } from "@/components/_shared/toast/use-toast";
import { X } from "lucide-react";
import React, { useState } from "react";
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
import { LoadingButton } from "@/components/_shared/loading-button";
import Image from "next/image";
import { Button } from "@/components/_shared/button";
import { use99Selector } from "@/redux/hooks/hooks";
import { selectCurrentUser } from "@/redux/slices/authSlice";
import { RootState } from "@/redux/store";
import { useTransferBookingMutation } from "@/redux/services/booking";

const TransferModal = ({ onClose }: { onClose: () => void }) => {
  const currentUser = use99Selector(selectCurrentUser);
  const selectedApt = use99Selector(
    (state: RootState) => state.apt.selectedApt
  );
  const [submit, setSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [transferBooking, { isLoading }] = useTransferBookingMutation();

  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      repName: `${currentUser?.first_name} ${currentUser?.last_name}`,
      repPhone: "",
      email: "",
      booking_id: selectedApt?.id,
    },
  });

  async function onSubmit(values: any) {
    const { email, booking_id } = values;

    try {
      await transferBooking({ email, booking_id }).unwrap();
      toast({
        variant: "default",
        title: "Transfer done",
      });
      setSuccess(true);
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || "Transfer submission failed. Please try again.";
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: errorMessage,
      });
    }
  }
  return (
    <div>
      {success ? (
        <div className="w-full pb-10 px-8 pt-4 flex-col flex justify-center items-center h-full">
          <Image src={"/images/box.png"} width={80} height={80} alt="success" />
          <h1 className="mt-6 font-medium">Thank You for Reaching Out</h1>
          <p className="text-gray-100 text-center text-xs font-light mt-1">
            Your message has been received, and your request will be addressed
            shortly, Kindly check your dashboard for update on your request.
          </p>
          <div className="w-full gap-3 flex items-center mt-6">
            <Button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="w-full"
            >
              Done
            </Button>
          </div>
        </div>
      ) : (
        <>
          {!submit ? (
            <>
              <section className="p-4">
                <div className="border-b flex items-center justify-between px-4 py-3">
                  <h1>Fill out the following to Transfer Stay</h1>
                  <X
                    className="text-gray-100 cursor-pointer"
                    size={18}
                    onClick={onClose}
                  />
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
                    <div className="flex flex-col gap-3">
                      <FormField
                        control={form.control}
                        name="repName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs   font-light">
                              Recipient’s Name
                            </FormLabel>
                            <FormControl className="bg-transparent">
                              <Input
                                className="bg-white font-light w-full   "
                                placeholder="Recipient’s Name"
                                {...field}
                                disabled
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
                          value={currentUser?.phone as string}
                          onChange={setPhoneNumber}
                          includePlusPrefix
                          required={false}
                          classNames="rounded-md mt-2"
                          disabled={true}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs   font-light">
                              Recipient’s Email Address
                            </FormLabel>
                            <FormControl className="bg-transparent">
                              <Input
                                className="bg-white font-light w-full   "
                                placeholder="Recipient’s email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-red-500 font-light" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="booking_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs   font-light">
                              Booking Number
                            </FormLabel>
                            <FormControl className="bg-transparent">
                              <Input
                                className="bg-white font-light w-full   "
                                placeholder="Booking id"
                                {...field}
                                disabled
                              />
                            </FormControl>
                            <FormMessage className="text-xs text-red-500 font-light" />
                          </FormItem>
                        )}
                      />
                      <LoadingButton
                        className="w-full h-10 mt-4"
                        type="submit"
                        loading={isLoading}
                      >
                        Submit Request
                      </LoadingButton>
                    </div>
                  </form>
                </Form>
              </section>
            </>
          ) : (
            <>
              <section className="pb-10">
                <div className="border-b">
                  <div className=" flex items-center justify-between px-4 py-3">
                    <h1>Do you wish to Transfer Request </h1>
                    <X
                      className="text-gray-100 cursor-pointer"
                      size={18}
                      onClick={() => setSubmit(false)}
                    />
                  </div>
                </div>
                <div className="w-full px-8 pt-4 flex-col flex justify-center items-center h-full">
                  <Image
                    src={"/images/box.png"}
                    width={80}
                    height={80}
                    alt="success"
                  />
                  <h1 className="mt-6 font-medium">Confirm Request</h1>
                  <p className="text-gray-100 font-light text-center text-xs mt-1">
                    Are you sure you want to proceed with this request? This
                    action cannot be reversed
                  </p>
                  <div className="w-full gap-3 flex items-center mt-6">
                    <Button
                      onClick={() => {
                        setSuccess(true);
                        setSubmit(false);
                      }}
                      className="w-full"
                    >
                      Yes, I want to
                    </Button>
                    <Button
                      onClick={() => setSubmit(false)}
                      className="w-full"
                      variant={"text"}
                    >
                      No, Cancel
                    </Button>
                  </div>
                </div>
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TransferModal;
