/** @format */

import * as React from "react";
import { format, parseISO } from "date-fns";
import { Calendar } from "../_shared/calander";
import { Button } from "../_shared/button";
import { cn } from "@/_shared/cn";
import { Calendar as CalandarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../_shared/popover";
import { Label } from "../_shared/label";
import { Input } from "../_shared/input";

type IProps = {
  showIcon?: boolean;
  placeholder?: string;
  className?: string;
  label?: string;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange?: (time: string | null) => void;
  error?: string;
  disabledDates?: string[];
  minDate?: Date;
  disabled?: boolean;
};

export function DatePickerTime({
  showIcon = true,
  placeholder,
  className,
  label,
  onDateChange,
  onTimeChange,
  error,
  disabledDates = [],
  minDate,
  disabled,
}: IProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [time, setTime] = React.useState<string>("");
  const [open, setOpen] = React.useState(false); // Add this state

  const disabledDatesArray = disabledDates.map((date) => parseISO(date));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    onDateChange(date);
    setOpen(false); // Close the popover after date selection
  };

  const formattedDate = date ? format(date, "yyyy-MM-dd") : placeholder;

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <Label className="text-xs font-normal">{label}</Label>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full h-11 border p-2 mt-2 rounded-md border-[#EDEFF3] justify-start text-left font-normal",
              !date && "text-muted-foreground",
              className
            )}
            disabled={disabled}
          >
            <div className="flex justify-between w-full">
              <div className="flex w-full items-center">
                <span className="text-xs font-light">{formattedDate}</span>
                {time && (
                  <span className="text-xs px-2 text-[#77838D] font-light">
                    {time}
                  </span>
                )}
              </div>
              {showIcon && (
                <CalandarIcon className="mr-2 text-xs h-4 w-4" size={20} />
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto rounded-md bg-white p-0">
          <div className="flex gap-4">
            <div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                disabled={[...disabledDatesArray, { before: minDate || today }]}
              />
              {/* <section className="p-4">
                <Input
                  type="time"
                  value={time}
                  onChange={handleTimeChange}
                  className="border h-10"
                />
              </section> */}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {error && <span className="text-red-600 text-xs mt-1">{error}</span>}
    </div>
  );
}
