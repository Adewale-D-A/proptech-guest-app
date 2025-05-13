/** @format */

import { bookingUpdateSchema } from "@/_shared/validate";
import { Button } from "@/components/_shared/button";
import { Form } from "@/components/_shared/form";
import { useToast } from "@/components/_shared/toast/use-toast";
import { DatePicker } from "@/components/date-picker";
import { DatePickerTime } from "@/components/date-picker-time";
import { use99Selector } from "@/redux/hooks/hooks";
import { RootState } from "@/redux/store";
import { faker } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bath, Bed, House, MapPin, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ListCard from "../../shortlets/list-card";
import { useGetAvailableDateMutation } from "@/redux/services/shortlet";
import { addDays, format } from "date-fns";
import { useRescheduleBookingMutation } from "@/redux/services/booking";
import { LoadingButton } from "@/components/_shared/loading-button";
import { errorHandler } from "@/_shared/constants";

// Add a default/fallback image constant at the top of the file
const DEFAULT_IMAGE = "/images/placeholder.jpg"; // Replace with your fallback image path

type FormValues = z.infer<typeof bookingUpdateSchema>;
const RescheduleModal = ({ onClose }: { onClose: () => void }) => {
  const [getAvailableDate, { data: availableDates }] =
    useGetAvailableDateMutation();
  const { toast } = useToast();
  const [resheduleBooking, { isLoading }] = useRescheduleBookingMutation();
  const selectedApt = use99Selector(
    (state: RootState) => state.apt.selectedApt
  );
  const shortlet_id = selectedApt && selectedApt?.shortlet.id;
  // const numberOfGuests = selectedApt?.number_of_guests;
  const checkInDateFromStore = selectedApt?.check_in_date
    ? new Date(selectedApt?.check_in_date)
    : undefined;
  const checkOutDateFromStore = selectedApt?.check_out_date
    ? new Date(selectedApt?.check_out_date)
    : undefined;
  const [newCheckout, setNewCheckout] = useState<Date | undefined>(undefined);

  const form = useForm<FormValues>({
    resolver: zodResolver(bookingUpdateSchema),
    defaultValues: {
      check_in_day: "",
      check_in_time: "",
    },
  });
  const { reset } = form;
  const onSubmit = async (values: FormValues) => {
    const check_out_day_format =
      newCheckout && format(newCheckout, "yyyy-MM-dd");

    const payload = {
      ...values,
      booking_id: selectedApt?.id,
      check_out_day: check_out_day_format,

      check_out_time: "12:00",
    };

    try {
      const response = await resheduleBooking(payload).unwrap();

      toast({
        variant: "default",
        title: response?.message,
        description: "Reschedule Apartment",
      });
      reset();
    } catch (err) {
      errorHandler(err as any);
    }
  };

  // useEffect(() => {
  //   if (shortlet_id) {
  //     getAvailableDate(shortlet_id);
  //   }
  // }, [shortlet_id, getAvailableDate]);

  // useEffect(() => {
  //   const checkInDay = form.watch("check_in_day");
  //   const checkInTime = form.watch("check_in_time");
  //   const checkOutDay = form.watch("check_out_day");
  //   const checkOutTime = form.watch("check_out_time");

  //   if (
  //     checkInDay &&
  //     checkInTime &&
  //     checkOutDay &&
  //     checkOutTime &&
  //     numberOfGuests
  //   ) {
  //     const payload = {
  //       check_in_day: checkInDay ?? "",
  //       check_in_time: checkInTime ?? "",
  //       check_out_day: checkOutDay ?? "",
  //       check_out_time: checkOutTime ?? "",
  //       number_of_guests: numberOfGuests ?? "",
  //       shortlet_id: selectedApt?.shortlet?.id,
  //     };

  //     (async () => {
  //       try {
  //         //  const res = await bookingPrice(payload).unwrap();
  //         //  setEstimatedPrice(res?.data?.total_cost);
  //       } catch (err) {
  //         const errorMessage =
  //           (err as any)?.data?.message || "shortlet failed. Please try again.";
  //         toast({
  //           variant: "destructive",
  //           title: "Error fees!",
  //           description:
  //             errorMessage || "Failed to calculate the price. Please try again",
  //         });
  //       }
  //     })();
  //   }
  // }, [
  //   form.watch("check_in_day"),
  //   form.watch("check_in_time"),
  //   form.watch("check_out_day"),
  //   form.watch("check_out_time"),
  //   numberOfGuests,
  // ]);

  useEffect(() => {
    const checkInDay = form.watch("check_in_day");

    if (checkInDay && selectedApt?.number_of_days) {
      const newCheckOutDay = addDays(
        new Date(checkInDay),
        selectedApt.number_of_days
      );

      if (newCheckOutDay) {
        setNewCheckout(addDays(newCheckOutDay, 0));
      }
    }
  }, [form.watch("check_in_day"), selectedApt?.number_of_days]);

  return (
    <div>
      <div className=" ">
        <div className="border-b flex items-center justify-between px-4 py-3">
          <section className="flex items-center gap-4">
            <div className="bg-[#E7EAEC] border-gray-100 w-10 h-10 rounded-sm flex items-center justify-center">
              <House size={24} />
            </div>
            <h1 className="font-medium">Do you wish to Reschedule?</h1>
          </section>
          <X
            className="text-gray-100 cursor-pointer"
            size={18}
            onClick={onClose}
          />
        </div>
        <section className="p-4">
          <div className="flex gap-4 items-center">
            <img
              src={selectedApt?.shortlet?.images?.[0]?.path || DEFAULT_IMAGE}
              alt={selectedApt?.shortlet?.name || "Apartment"}
              className="w-[60px] h-[60px] rounded object-cover"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_IMAGE;
                e.currentTarget.onerror = null; // Prevents infinite loop if fallback also fails
              }}
            />
            <div className="flex flex-col gap-1">
              <p className="font-medium">{selectedApt?.shortlet.name}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <MapPin color="#6d6d6d" size={12} />
                  <p className="text-xs font-light text-gray-100">
                    {selectedApt?.shortlet.location}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Bed color="#6d6d6d" size={12} />
                  <p className="text-xs font-light text-gray-100">
                    {selectedApt?.shortlet.no_of_bedrooms} bed(s)
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Bath color="#6d6d6d" size={12} />
                  <p className="text-xs font-light text-gray-100">
                    {selectedApt?.shortlet?.no_of_bathrooms} bathroom
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <section className="flex flex-col gap-2  mt-4">
                <section>
                  <p className="text-xs mb-1">Current date</p>
                  <div className="flex items-center gap-2 justify-between ">
                    <div className="w-full">
                      {" "}
                      <DatePicker
                        className="w-full"
                        date={checkInDateFromStore}
                        setDate={() => {}}
                        disabled={true}
                      />
                    </div>
                    <div className="w-full">
                      {" "}
                      <DatePicker
                        className="w-full"
                        date={checkOutDateFromStore}
                        setDate={() => {}}
                        disabled={true}
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <p className="text-xs mb-1">New date</p>
                  <div className="flex items-center gap-2 justify-between ">
                    <div className="w-full">
                      {" "}
                      <DatePickerTime
                        placeholder="YYYY-MM-DD"
                        onDateChange={(date) => {
                          form.setValue(
                            "check_in_day",
                            date ? format(date, "yyyy-MM-dd") : ""
                          );

                          if (date) {
                            form.setValue("check_in_time", "14:10");
                          }
                        }}
                        onTimeChange={(time) =>
                          form.setValue("check_in_time", time ?? "")
                        }
                        error={
                          form.formState.errors.check_in_day?.message ||
                          form.formState.errors.check_in_time?.message
                        }
                        disabledDates={availableDates?.data.booked_dates.concat(
                          availableDates?.data.blocked_dates
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <DatePicker
                        className="w-full"
                        date={newCheckout}
                        setDate={() => {}}
                        disabled={true}
                        placeholder="YYYY-MM-DD"
                      />
                    </div>
                  </div>
                </section>
                <Button
                  className="text-primary-1 cursor-pointer underline text-xs font-normal p-0 justify-start items-start"
                  variant={"text"}
                >
                  View similar apartments Available
                </Button>
                <section className="bg-black/5 rounded">
                  <h1 className="border-b px-4 py-3 text-sm">
                    Booking Summary
                  </h1>
                  <section className="p-4 flex flex-col gap-3">
                    <ListCard
                      amt={selectedApt?.total_price ?? 0}
                      costName="Initial Booking balance"
                      currency={selectedApt?.currency}
                    />
                    {/* <ListCard
                      amt={0}
                      costName="Extended Booking per Night"
                      currency={selectedApt?.currency}
                    /> */}

                    <ListCard
                      amt={selectedApt?.tax_fee ?? 0}
                      costName="7.5% Tax"
                      currency={selectedApt?.currency}
                    />
                    <ListCard
                      amt={selectedApt?.number_of_days ?? 0}
                      costName="No of Extended Nights"
                    />
                  </section>
                </section>
                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  className="w-full h-9 text-xs mt-4"
                >
                  Change Date
                </LoadingButton>
              </section>
            </form>
          </Form>
        </section>
      </div>
    </div>
  );
};

export default RescheduleModal;
