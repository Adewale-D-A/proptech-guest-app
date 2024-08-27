/** @format */

import { Card } from "@/components/_shared/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/_shared/drop-down";
import { faker } from "@faker-js/faker";
import React from "react";

const UserDropDown = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <Card className="flex cursor-pointer shadow-sm border-gray-200 w-32 justify-center h-11 items-center gap-3">
            <img
              src={faker.image.avatar()}
              alt=""
              className="w-8 h-8 rounded-full"
            />
            <div>
              <h1 className="text-xs font-semibold">John Doe</h1>
              <p className="text-[10px] text-[#6D6D6D] font-light">
                Super Admin
              </p>
            </div>
          </Card>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-40 bg-white/50 z-50"
          align="end"
          forceMount
        >
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer flex items-center gap-x-2">
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer flex items-center gap-x-2">
              PNG
            </DropdownMenuItem>{" "}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropDown;
