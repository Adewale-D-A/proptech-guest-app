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
import { useGetBookingsQuery } from "@/redux/services/booking";
import { useGetServiceTypeQuery } from "@/redux/services/request";
import { Booking } from "@/types/type";

import React from "react";

const FirstStepForm = ({
  form,
  shortlet,
}: {
  form: any;
  shortlet: Booking[];
}) => {
  const { data } = useGetServiceTypeQuery();
  const serviceData = data && data?.data && data?.data?.serviceTypes?.data;
  // const { data: shortlet } = useGetBookingsQuery({});

  // const shortletData = (shortlet && shortlet?.data?.bookings?.data) ?? [];

  return (
    <div className="flex flex-col gap-y-2">
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
                disabled
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 font-light" />
          </FormItem>
        )}
      />

      <section className="w-full">
        <Label className="text-xs  font-normal">Apartment</Label>
        <FormField
          control={form.control}
          name="shortlet_id"
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
                  {shortlet.length > 0 ? (
                    <>
                      {shortlet.map((item) => (
                        <SelectItem
                          key={item.shortlet.id}
                          value={String(item.shortlet.id)}
                        >
                          {item.shortlet.name}
                        </SelectItem>
                      ))}
                    </>
                  ) : (
                    <p className="text-sm">No Apartment</p>
                  )}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs text-red-500 font-light" />
            </FormItem>
          )}
        />
      </section>

      <section className="w-full">
        <Label className="text-xs  font-normal">Additional Services</Label>
        <FormField
          control={form.control}
          name="service_type_id"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) =>
                  form.setValue("service_type_id", value)
                }
              >
                <SelectTrigger className="h-10 w-full border-black/10 shadow-none mt-2">
                  <SelectValue placeholder="" className="text-xs " />
                </SelectTrigger>

                <SelectContent className="border-none">
                  {serviceData &&
                    serviceData.map((tag: any) => (
                      <SelectItem
                        key={tag.id}
                        value={String(tag.id)}
                        className="border-none "
                      >
                        {tag.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </section>
    </div>
  );
};

export default FirstStepForm;
