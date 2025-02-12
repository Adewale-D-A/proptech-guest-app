/** @format */
"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/_shared/drop-down";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/_shared/navigation-menu";
import Link from "next/link";
import React from "react";

const NavSectionTabs = ({
  scrolled,
  isMainRoute,
}: {
  scrolled: boolean;
  isMainRoute: boolean;
}) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            {isMainRoute ? (
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-transparent font-normal   ${
                  scrolled ? "text-black" : "text-white"
                } `}
              >
                Home
              </NavigationMenuLink>
            ) : (
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-transparent font-normal   text-black `}
              >
                Home
              </NavigationMenuLink>
            )}
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/pricing" legacyBehavior passHref>
            {isMainRoute ? (
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-none font-normal  ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                About Us
              </NavigationMenuLink>
            ) : (
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-none font-normal  text-black`}
              >
                About Us
              </NavigationMenuLink>
            )}
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem className="">
          {isMainRoute ? (
            <NavigationMenuTrigger
              className={` font-normal bg-transparent  text-white ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              Products
            </NavigationMenuTrigger>
          ) : (
            <NavigationMenuTrigger
              className={` font-normal bg-transparent  text-black `}
            >
              Products
            </NavigationMenuTrigger>
          )}
          <NavigationMenuContent className="rounded-[20px]">
            <div>hey</div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="w-full rounded-none mx-auto">
          {isMainRoute ? (
            <NavigationMenuTrigger
              className={` font-normal bg-transparent  text-white ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              Adventures
            </NavigationMenuTrigger>
          ) : (
            <NavigationMenuTrigger
              className={` font-normal bg-transparent  text-black `}
            >
              Adventures
            </NavigationMenuTrigger>
          )}
          <NavigationMenuContent className="rounded-none bg-white w-full mx-auto">
            <div className="w-[50px] mx-auto ">hey</div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/pricing"
            className="bg-transparent"
            legacyBehavior
            passHref
          >
            {isMainRoute ? (
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-transparent font-normal  ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                Blog
              </NavigationMenuLink>
            ) : (
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-transparent font-normal  text-black`}
              >
                Blog
              </NavigationMenuLink>
            )}
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/pricing" legacyBehavior passHref>
            {isMainRoute ? (
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-transparent font-normal  ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                Subscription
              </NavigationMenuLink>
            ) : (
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-transparent font-normal  text-black`}
              >
                Subscription
              </NavigationMenuLink>
            )}
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavSectionTabs;
