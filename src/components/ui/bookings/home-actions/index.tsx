/** @format */

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/_shared/drop-down";
import { Ellipsis } from "lucide-react";
import React from "react";

const HomeActionsDropdown = ({
  handleClickModal,
  handleOpenSingleBooking,
  handleClickModalRate,
  handleClickModalRebook,
}: {
  handleClickModal?: (value: string) => void;
  handleOpenSingleBooking: () => void;
  handleClickModalRate: () => void;
  handleClickModalRebook: () => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-8 h-8 rounded bg-[#E6F2FF] flex items-center justify-center cursor-pointer">
          <Ellipsis size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 p-0 pb-4 cursor-pointer relative right-4 bg-white flex flex-col gap-2 px-4">
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className=" cursor-pointer text-xs p-0"
          onClick={handleOpenSingleBooking}
        >
          View details
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className=" cursor-pointer  text-xs p-0"
          onClick={handleClickModalRebook}
        >
          Rebook apartment
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className=" text-xs cursor-pointer p-0"
          onClick={() => handleClickModal?.("caution")}
        >
          Request Caution fee
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className=" text-xs cursor-pointer p-0"
          onClick={handleClickModalRate}
        >
          Rate your Experience
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HomeActionsDropdown;
