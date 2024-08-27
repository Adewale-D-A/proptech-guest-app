/** @format */

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_shared/form";
import { Input } from "@/components/_shared/input";
import { Label } from "@/components/_shared/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";

import React from "react";

const FirstStepForm = ({ form }: { form: any }) => {
  return (
    <div>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-normal  ">Guest Name</FormLabel>
            <FormControl className="bg-transparent">
              <Input
                className=" font-light w-full  h-10 "
                placeholder="Enter name "
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 font-light" />
          </FormItem>
        )}
      />

      <section className="w-full">
        <Label className="text-xs  font-normal">Apartment</Label>
        <Select>
          <SelectTrigger className="h-10 w-full border-black/10 shadow-none text-gray-100 mt-2">
            <SelectValue placeholder="" className="text-xs " />
          </SelectTrigger>

          <SelectContent className="border-none">
            {[
              { id: "all", name: "All" },
              { id: "newest-oldest", name: "Newest - Oldest" },
              { id: "oldest", name: "Oldest - Newest" },
            ].map((tag) => (
              <SelectItem key={tag.id} value={tag.id} className="border-none">
                {tag.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      <section className="w-full">
        <Label className="text-xs  font-normal">Additional Services</Label>
        <Select>
          <SelectTrigger className="h-10 w-full border-black/10 shadow-none text-gray-100 mt-2">
            <SelectValue placeholder="" className="text-xs " />
          </SelectTrigger>

          <SelectContent className="border-none">
            {[
              { id: "all", name: "All" },
              { id: "cleaning ", name: "Cleaning " },
              { id: "laundry", name: "Laundry" },
            ].map((tag) => (
              <SelectItem key={tag.id} value={tag.id} className="border-none">
                {tag.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>
    </div>
  );
};

export default FirstStepForm;
