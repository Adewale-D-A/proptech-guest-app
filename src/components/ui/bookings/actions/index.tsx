/** @format */

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/_shared/drop-down";
import { use99Dispatch } from "@/redux/hooks/hooks";
import { setSelectedApt } from "@/redux/slices/apt";
import { Ellipsis } from "lucide-react";
import React from "react";

const ActionsDropdown = ({
  handleActionSelect,
  booking,
  id,
}: {
  handleActionSelect?: (value: string, id?: number) => void;
  id: number;
  booking?: any;
}) => {
  const dispatch = use99Dispatch();
  const handleSelectApt = (apt: any) => {
    dispatch(setSelectedApt(apt));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-8 h-8 rounded bg-[#E6F2FF] flex items-center justify-center cursor-pointer">
          <Ellipsis size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48  cursor-pointer relative right-4 bg-white">
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className=" cursor-pointer text-xs "
          onClick={() => {
            handleActionSelect?.("extend");
            handleSelectApt(booking);
          }}
        >
          Extend Booking
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className=" cursor-pointer  text-xs"
          onClick={() => {
            handleActionSelect?.("transfer");
            handleSelectApt(booking);
          }}
        >
          Transfer Booking
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className=" text-xs cursor-pointer "
          onClick={() => {
            handleSelectApt(booking);
            handleActionSelect?.("reschedule");
          }}
        >
          Reschedule Booking
        </DropdownMenuCheckboxItem>
        {/* <DropdownMenuCheckboxItem className=" text-xs cursor-pointer ">
          Change Apartment
        </DropdownMenuCheckboxItem> */}
        {/* <DropdownMenuCheckboxItem
          onClick={() => handleActionSelect?.("generate", id)}
          className=" text-xs cursor-pointer "
        >
          Generate Visitors Code
        </DropdownMenuCheckboxItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsDropdown;
