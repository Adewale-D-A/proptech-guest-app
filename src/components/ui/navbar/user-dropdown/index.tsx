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
import { LogOut } from "lucide-react";
import { use99Dispatch, use99Selector } from "@/redux/hooks/hooks";
import { logout, selectCurrentUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const UserDropDown = () => {
  const router = useRouter();
  const currentUser = use99Selector(selectCurrentUser);
  const dispatch = use99Dispatch();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/landing");
    Cookies.remove("access_token");
  };
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
              <h1 className="text-xs font-semibold">
                {currentUser?.first_name} {currentUser?.last_name}{" "}
              </h1>
            </div>
          </Card>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-40 bg-white z-50"
          align="end"
          forceMount
        >
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer flex items-center gap-x-2">
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer flex items-center gap-x-2"
              onClick={handleLogout}
            >
              <LogOut size={20} /> Logout
            </DropdownMenuItem>{" "}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropDown;
