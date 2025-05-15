/** @format */

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_shared/form";
import { Label } from "@/components/_shared/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";
import { Textarea } from "@/components/_shared/textarea";
import { DatePickerComponent } from "@/components/date-picker-component";
import { Booking } from "@/types/type";

import React from "react";
import { UseFormReturn } from "react-hook-form";

interface SecondStepFormProps {
  form: UseFormReturn<any>;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | undefined>>;
  shortlet: Booking[];
  selectedBookingId?: string;
}

const quantity = Array.from({ length: 10 }, (_, i) => ({
  key: i + 1,
  value: i + 1,
}));

const SecondStepForm = ({
  form,
  setSelectedDate,
  shortlet,
  selectedBookingId,
}: SecondStepFormProps) => {
  const selectedBooking = shortlet.find(
    (booking) => String(booking.shortlet.id) === selectedBookingId
  );

  const handleDateChange = (date: string | undefined) => {
    setSelectedDate(date || "");
  };

  const checkInDate = selectedBooking?.check_in_date
    ? new Date(selectedBooking.check_in_date)
    : undefined;
  const checkOutDate = selectedBooking?.check_out_date
    ? new Date(selectedBooking.check_out_date)
    : undefined;

  const maxSelectableDate = checkOutDate ? new Date(checkOutDate) : undefined;

  // Subtract one day from checkout date if it exists
  if (maxSelectableDate) {
    maxSelectableDate.setDate(maxSelectableDate.getDate() - 1);
  }

  console.log("Selected Booking ID:", selectedBookingId);
  console.log("Selected Booking:", selectedBooking);
  console.log("Check-in date:", checkInDate);
  console.log("Check-out date:", checkOutDate);

  return (
    <div>
      <section className="flex gap-4 items-center w-full">
        <div className="flex w-full flex-col gap-1">
          <p className="text-xs">Select Date</p>
          <DatePickerComponent
            className="w-full mt-0 h-9"
            setDate={handleDateChange}
            showIcon={true}
            minDate={checkInDate}
            maxDate={maxSelectableDate}
            disabledDates={(date) => {
              if (!checkInDate || !checkOutDate) return false;
              return (
                date < checkInDate ||
                (maxSelectableDate !== undefined && date > maxSelectableDate)
              );
            }}
            placeholder="Select date"
          />
        </div>
      </section>
      <section className="w-full mt-2">
        <Label className="text-xs  font-normal">Quantity</Label>
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="h-10 w-full border-black/10 shadow-none mt-2">
                  <SelectValue
                    placeholder="Select quantity"
                    className="text-xs"
                  />
                </SelectTrigger>
                <SelectContent>
                  {quantity.map((num) => (
                    <SelectItem key={num.key} value={num.value.toString()}>
                      {num.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs text-red-500 font-light" />
            </FormItem>
          )}
        />
      </section>

      <div className="mt-4 ">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-normal  ">
                Any Specific instruction?
              </FormLabel>
              <FormControl className="bg-transparent">
                <Textarea
                  className="resize-none text-sm"
                  placeholder="Type Message"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs text-red-500 font-light" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default SecondStepForm;
