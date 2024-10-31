/** @format */

"use client";

import * as React from "react";
import { endOfToday, format, isAfter } from "date-fns";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "../_shared/button";
import { Popover, PopoverContent, PopoverTrigger } from "../_shared/popover";
import { cn } from "@/_shared/cn";
import { Calendar } from "../_shared/calander";
import { Calendar as CalendarIcon } from "lucide-react";
type IProps = {
  showIcon?: boolean;
  placeholder?: string;
  className?: string;
  setDate: (date: string | undefined) => void;
};

export function DatePickerComponent({
  showIcon,
  placeholder,
  className,
  setDate,
}: IProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    setDate(date ? format(date, "yyyy-MM-dd") : undefined);
  };

  const isDateDisabled = (date: Date) => {
    return isAfter(date, endOfToday());
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `w-40 h-11 rounded-md border p-2  border-[#EDEFF3] justify-start text-left font-normal",
            !date && "text-muted-foreground ${className}`
          )}
        >
          <div className="flex justify-between w-full">
            <div className="flex w-full items-center">
              {showIcon && <CalendarIcon size={16} />}
              {selectedDate ? (
                <span className=" px-4 ">
                  {format(selectedDate, "yyyy-MM-dd")}
                </span>
              ) : (
                <span className=" text-xs text-[#77838D] font-light ">
                  {placeholder}
                </span>
              )}
            </div>
            {/* <ChevronDown color="#1F1F1F" /> */}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto bg-white  p-0">
        <Calendar
          className=" "
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
        />
      </PopoverContent>
    </Popover>
  );
}
