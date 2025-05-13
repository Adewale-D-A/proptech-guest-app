/** @format */

"use client";

import * as React from "react";
import { endOfToday, format, isAfter, isBefore } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../_shared/button";
import { Popover, PopoverContent, PopoverTrigger } from "../_shared/popover";
import { cn } from "@/_shared/cn";
import { Calendar } from "../_shared/calander";

type IProps = {
  showIcon?: boolean;
  placeholder?: string;
  className?: string;
  setDate: (date: string | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: (date: Date) => boolean;
};

export function DatePickerComponent({
  showIcon,
  placeholder,
  className,
  setDate,
  minDate,
  maxDate,
  disabledDates,
}: IProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    setDate(date ? format(date, "yyyy-MM-dd") : undefined);
  };

  const isDateDisabled = (date: Date) => {
    // Check if date is within allowed range
    if (minDate && isBefore(date, minDate)) return true;
    if (maxDate && isAfter(date, maxDate)) return true;

    // Check custom disabled dates function
    if (disabledDates && disabledDates(date)) return true;

    return false;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-40 h-11 rounded-md border p-2 border-[#EDEFF3] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            className
          )}
        >
          <div className="flex justify-between w-full">
            <div className="flex w-full items-center">
              {showIcon && <CalendarIcon size={16} />}
              {selectedDate ? (
                <span className="px-4">
                  {format(selectedDate, "yyyy-MM-dd")}
                </span>
              ) : (
                <span className="text-xs text-[#77838D] font-light">
                  {/* {placeholder} */}
                </span>
              )}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto bg-white p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
          disabled={isDateDisabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
