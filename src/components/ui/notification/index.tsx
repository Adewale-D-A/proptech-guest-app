/** @format */

import { Button } from "@/components/_shared/button";
import { Card } from "@/components/_shared/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";
import { DatePicker } from "@/components/date-picker";
import SearchInput from "@/components/search-input";
import React from "react";

const NotificationComponent = () => {
  return (
    <Card className="mt-6 shadow-sm">
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-lg font-medium">All Notification</h1>
        <SearchInput
          className="w-80"
          placeholder="Search by date, subject, etc..."
        />
        <section className="flex items-center ">
          <div className="flex items-center gap-1">
            <p className="text-xs">Filter:</p>
            <DatePicker className="w-60 mt-0 h-9" />
          </div>
          <div className="flex ml-4 items-center  gap-1">
            <p className="text-xs">Sort by: </p>
            <Select>
              <SelectTrigger className="h-9 w-60 border-black/10 shadow-none text-gray-100 ">
                <SelectValue placeholder="" className="text-xs " />
              </SelectTrigger>

              <SelectContent className="border-none">
                {[
                  { id: "all-notification", name: "All Notifications" },
                  { id: "newest-oldest", name: "Newest - Oldest" },
                  { id: "oldest", name: "Oldest - Newest" },
                ].map((tag) => (
                  <SelectItem
                    key={tag.id}
                    value={tag.id}
                    className="border-none"
                  >
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="font-semibold text-[#017EFF]" variant={"text"}>
            Mark all as read
          </Button>
        </section>
      </div>
      <section className="flex flex-col gap-2 p-2 ">
        {[1, 2, 3, 4, 5, 6].map((data) => (
          <section
            className="flex justify-between hover:bg-[#E9E9E9] p-2 cursor-pointer rounded"
            key={data}
          >
            <div className="w-full">
              <div className="bg-[#017EFF] float-left  w-2 h-2 rounded-full mr-2 relative top-1.5" />
              <div className="pl-4">
                <p className="text-sm ">Lorem ipsum dolor sit amet</p>
                <p className="text-xs font-light w-2/3 text-gray-100 mt-1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore.
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-100 w-20 ">5 mins ago</p>
          </section>
        ))}
      </section>
    </Card>
  );
};

export default NotificationComponent;
