/** @format */

import { Button } from "@/components/_shared/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/_shared/drop-down";
import { Ellipsis } from "lucide-react";
import React from "react";

const ActionsDropdown = ({
  onActionSelect,
}: {
  onActionSelect: (value: string) => void;
}) => {
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
          onClick={() => onActionSelect("extend")}
        >
          Extend Booking
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className=" cursor-pointer  text-xs"
          onClick={() => onActionSelect("transfer")}
        >
          Transfer Booking
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className=" text-xs cursor-pointer "
          onClick={() => onActionSelect("reschedule")}
        >
          Reschedule Booking
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem className=" text-xs cursor-pointer ">
          Change Apartment
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          onClick={() => onActionSelect("generate")}
          className=" text-xs cursor-pointer "
        >
          Generate Visitors Code
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsDropdown;
