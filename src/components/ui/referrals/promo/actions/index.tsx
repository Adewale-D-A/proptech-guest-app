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
        <div className="cursor-pointer">
          <Ellipsis size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32  cursor-pointer relative right-4 bg-white">
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem className=" cursor-pointer text-xs ">
          View Offer
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem className=" cursor-pointer  text-xs">
          Delete Offer
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem className=" text-xs cursor-pointer ">
          Clear all
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsDropdown;
