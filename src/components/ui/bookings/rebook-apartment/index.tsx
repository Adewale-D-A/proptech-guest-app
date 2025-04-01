/** @format */

import { Button } from "@/components/_shared/button";
import { Calendar } from "@/components/_shared/calander";
import { LoadingButton } from "@/components/_shared/loading-button";
import { parseISO } from "date-fns";
import React from "react";

const RebookApartment = ({
  handleRebook,
  reBookingLoading,
  reBookEndDate,
  reBookStartDate,
  onClose,
  availableDates,
  handleStartDateSelect,
  handleEndDateSelect,
  minCheckoutDate,
}: ReBookType) => {
  const disabledDates = availableDates?.booked_dates.concat(
    availableDates?.blocked_dates
  );
  const disabledDatesArray = disabledDates
    ? disabledDates.map((date: any) => parseISO(date))
    : [];

  const yesterday = new Date();
  return (
    <div className="pb-4 ">
      <section className="px-10 pt-6">
        <h1>Select a time period</h1>
      </section>
      <div className="flex mt-3 justify-center">
        <div className="border rounded-bl-md rounded-tl-md">
          <section className="flex items-center justify-between p-4 border-b">
            <p className="text-xs text-[#6D6D6D]">From</p>
            <p className="text-xs">{reBookStartDate}</p>
          </section>
          <Calendar
            className=" "
            mode="single"
            selected={reBookStartDate ? new Date(reBookStartDate) : undefined}
            onSelect={handleStartDateSelect}
            disabled={[...disabledDatesArray, { before: yesterday }]}
          />
        </div>
        <div className="border rounded-br-md rounded-tr-md">
          <section className="flex items-center justify-between p-4 border-b">
            <p className="text-xs text-[#6D6D6D]">To</p>
            <p className="text-xs">{reBookEndDate}</p>
          </section>
          <Calendar
            className=" "
            mode="single"
            selected={reBookEndDate ? new Date(reBookEndDate) : undefined}
            onSelect={handleEndDateSelect}
            disabled={[
              ...disabledDatesArray,
              { before: minCheckoutDate || yesterday },
            ]}
          />
        </div>
      </div>

      <div className="flex items-center px-10 gap-4">
        <Button
          variant={"outline"}
          className="w-full h-9 mt-16"
          onClick={onClose}
        >
          Cancel
        </Button>
        <LoadingButton
          className="w-full mt-16 h-9"
          onClick={handleRebook}
          loading={reBookingLoading}
        >
          Confirm
        </LoadingButton>
      </div>
    </div>
  );
};

export default RebookApartment;
