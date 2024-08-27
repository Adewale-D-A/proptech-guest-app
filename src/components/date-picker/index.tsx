/** @format */

"use client";

import * as React from "react";
import { format } from "date-fns";

import { Calendar } from "../_shared/calander";
import { Button } from "../_shared/button";
import { cn } from "@/_shared/cn";
import { Calendar as CalandarIcon } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../_shared/popover";
import { Label } from "../_shared/label";

type IProps = {
  showIcon?: boolean;
  placeholder?: string;
  className?: string;
  label?: string;
};

export function DatePicker({
  showIcon = true,
  placeholder,
  className,
  label,
}: IProps) {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <Label className="text-xs font-normal ">{label}</Label>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `w-full h-11 border p-2 mt-2  rounded-md  border-[#EDEFF3] justify-start text-left font-normal",
            !date && "text-muted-foreground ${className}`
          )}
        >
          <div className="flex justify-between w-full">
            <div className="flex w-full items-center">
              {date ? (
                format(date, "dd/MM/yyyy")
              ) : (
                <span className=" text-xs text-[#77838D] font-light ">
                  {placeholder}
                </span>
              )}
            </div>
            {showIcon && (
              <CalandarIcon className="mr-2 text-xs h-4 w-4" size={20} />
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto rounded-md bg-white  p-0">
        <Calendar
          className=" "
          mode="single"
          selected={date}
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
  );
}
