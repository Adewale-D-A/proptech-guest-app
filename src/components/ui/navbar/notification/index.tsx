/** @format */

import { Bell } from "lucide-react";
import { Button } from "@/components/_shared/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/_shared/drop-down";
import * as React from "react";

const NotificationDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="text">
          <Bell />{" "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 bg-white p-0 m-0">
        <section className="flex px-2 items-center justify-between">
          <h1 className="text-sm">All Notification</h1>
          <Button
            className="font-semibold p-0 text-xs text-[#017EFF]"
            variant={"text"}
          >
            Mark all as read
          </Button>
        </section>
        <section className="flex flex-col gap-2  h-96 overflow-y-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 23, 4, 5].map((data) => (
            <section>
              <section
                className="flex justify-between hover:bg-[#E9E9E9] py-2 cursor-pointer px-2"
                key={data}
              >
                <div className="w-full">
                  <div className="bg-[#017EFF] float-left  w-1.5 h-1.5 rounded-full mr-2 relative top-1" />
                  <div className="pl-4">
                    <p className="text-xs ">Lorem ipsum dolor sit amet</p>
                    <p className="text-[10px] font-light w-2/3 text-gray-100 mt-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed
                    </p>
                  </div>
                </div>
                <p className="text-[10px] text-gray-100 w-20 ">5 mins ago</p>
              </section>
            </section>
          ))}
        </section>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default NotificationDropDown;
