/** @format */

"use client";

import * as React from "react";
import { Button } from "../_shared/button";
import { cn } from "@/_shared/cn";
import { Clock } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../_shared/popover";
import { Label } from "../_shared/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../_shared/select";

type IProps = {
  showIcon?: boolean;
  placeholder?: string;
  className?: string;
  label?: string;
};

export function TimePicker({
  showIcon = true,
  placeholder = "Select time",
  className,
  label,
}: IProps) {
  const [time, setTime] = React.useState<{
    hour: number;
    minute: number;
    period: "AM" | "PM";
  }>({
    hour: 12,
    minute: 0,
    period: "AM",
  });

  const handleHourChange = (value: string) => {
    setTime((prevTime) => ({ ...prevTime, hour: parseInt(value) }));
  };

  const handleMinuteChange = (value: string) => {
    setTime((prevTime) => ({ ...prevTime, minute: parseInt(value) }));
  };

  const handlePeriodChange = (value: string) => {
    setTime((prevTime) => ({
      ...prevTime,
      period: value as "AM" | "PM",
    }));
  };

  const formatTime = () => {
    const hour = String(time.hour).padStart(2, "0");
    const minute = String(time.minute).padStart(2, "0");
    return `${hour}:${minute} ${time.period}`;
  };

  return (
    <Popover>
      <Label className="text-xs font-normal ">{label}</Label>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `w-full h-9 border p-2  rounded-md border-[#EDEFF3] justify-start text-left font-normal`,
            !time && `text-muted-foreground ${className}`
          )}
        >
          <div className="flex justify-between w-full">
            <div className="flex w-full items-center">
              {time ? (
                formatTime()
              ) : (
                <span className="text-xs text-[#77838D] font-light">
                  {placeholder}
                </span>
              )}
            </div>
            {showIcon && <Clock className="mr-2 text-xs h-4 w-4" size={20} />}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full  rounded-md bg-white p-4">
        <div className="flex items-center w-full space-x-2">
          <Select onValueChange={handleHourChange}>
            <SelectTrigger className="h-10  w-full border-black/10 shadow-none text-gray-100">
              <SelectValue placeholder="HH" className="text-xs" />
            </SelectTrigger>
            <SelectContent className="border-none ">
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={`${i + 1}`} className="w-10">
                  {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>:</span>
          {/* Minutes */}
          <Select onValueChange={handleMinuteChange}>
            <SelectTrigger className="h-10 w-full border-black/10 shadow-none text-gray-100">
              <SelectValue placeholder="MM" className="text-xs" />
            </SelectTrigger>
            <SelectContent className="border-none w-full">
              {Array.from({ length: 60 }, (_, i) => (
                <SelectItem key={i} value={`${i}`}>
                  {i < 10 ? `0${i}` : i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* AM/PM */}
          <Select onValueChange={handlePeriodChange}>
            <SelectTrigger className="h-10 w-full border-black/10 shadow-none text-gray-100">
              <SelectValue placeholder="AM/PM" className="text-xs" />
            </SelectTrigger>
            <SelectContent className="border-none">
              {["AM", "PM"].map((period) => (
                <SelectItem key={period} value={period}>
                  {period}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default TimePicker;
