/** @format */

import { Textarea } from "@/components/_shared/textarea";
import { DatePicker } from "@/components/date-picker";
import TimePicker from "@/components/time-picker";
import React from "react";

const SecondStepForm = ({ form }: { form: any }) => {
  return (
    <div>
      <section className="flex gap-4 items-center w-full">
        <div className="flex w-full flex-col gap-1">
          <p className="text-xs">Select Date</p>
          <DatePicker
            className="w-full mt-0 h-9"
            date={undefined}
            setDate={() => {}}
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <p className="text-xs">Select Time</p>
          <TimePicker label="" className="w-full mt-0 h-9" />
        </div>
      </section>
      <div className="mt-4 ">
        <p className="text-xs mb-2">Any Specific instruction?</p>
        <Textarea className="resize-none text-sm" placeholder="Type Message" />
      </div>
    </div>
  );
};

export default SecondStepForm;
