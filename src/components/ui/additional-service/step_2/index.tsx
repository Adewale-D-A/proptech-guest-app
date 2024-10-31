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

import React from "react";
import { UseFormReturn } from "react-hook-form";

interface SecondStepFormProps {
  form: UseFormReturn<any>;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | undefined>>;
}
const quantity = Array.from({ length: 10 }, (_, i) => ({
  key: i + 1,
  value: i + 1,
}));
const SecondStepForm = ({ form, setSelectedDate }: SecondStepFormProps) => {
  const handleDateChange = (date: string | undefined) => {
    setSelectedDate(date || "");
  };
  return (
    <div>
      <section className="flex gap-4 items-center w-full">
        <div className="flex w-full flex-col gap-1">
          <p className="text-xs">Select Date</p>
          <DatePickerComponent
            className="w-full mt-0 h-9"
            setDate={handleDateChange}
            showIcon={true}
          />
        </div>
      </section>
      <section className="w-full mt-2">
        <Label className="text-xs  font-normal">Apartment</Label>
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="h-10 w-full border-black/10 shadow-none mt-2">
                  <SelectValue
                    placeholder="Select apartment"
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
