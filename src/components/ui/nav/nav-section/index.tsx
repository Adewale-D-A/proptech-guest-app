/** @format */
"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/_shared/navigation-menu";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const NavSectionTabs = ({
  scrolled,
  isMainRoute,
}: {
  scrolled: boolean;
  isMainRoute: boolean;
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  let timeoutId: NodeJS.Timeout | null = null;
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle opening dropdown
  const handleMouseEnter = (menu: string) => {
    if (timeoutId) clearTimeout(timeoutId);
    setOpenDropdown(menu);
  };

  // Delay closing dropdown to prevent flickering
  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setOpenDropdown(null);
    }, 200); // Small delay for smooth interaction
  };

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
        {/* <NavigationMenuItem>
          <Link href="/availability" legacyBehavior passHref>
            {isMainRoute ? (
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-none font-normal  ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                Availability
              </NavigationMenuLink>
            ) : (
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-none font-normal  text-black`}
              >
                Availability
              </NavigationMenuLink>
            )}
          </Link>
        </NavigationMenuItem> */}

        <div ref={dropdownRef} className="px-4">
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => handleMouseEnter("availability")}
            onMouseLeave={handleMouseLeave}
          >
            {isMainRoute ? (
              <Link href="/availability">
                <button
                  className={`text-sm font-normal bg-transparent text-black cursor-pointer ${
                    scrolled ? "text-black" : "text-white"
                  }`}
                >
                  Availability
                </button>
              </Link>
            ) : (
              <Link href="/availability">
                <button
                  className={`text-sm font-normal bg-transparent text-black cursor-pointer`}
                >
                  Availability
                </button>
              </Link>
            )}
            {openDropdown === "availability" && (
              <div className="absolute left-0 mt-2 w-32 bg-white border shadow-lg rounded-lg transition px-3">
                <Link
                  href="/shortlets"
                  className="block text-sm py-2 transition"
                >
                  All Apartments
                </Link>
                <Link
                  href="/shortlets?room_option_id=self&20con"
                  className="block text-sm py-2 transition"
                >
                  Studio
                </Link>
                <Link
                  href="/shortlets?room_option_id=1%20bed"
                  className="block text-sm py-2 transition"
                >
                  1 Bedroom
                </Link>
                <Link
                  href="/shortlets?room_option_id=2%20bed"
                  className="block text-sm py-2 transition"
                >
                  2 Bedroom
                </Link>
                <Link
                  href="/shortlets?room_option_id=3%20bed"
                  className="block text-sm py-2 transition"
                >
                  3 Bedroom
                </Link>
              </div>
            )}
          </div>
        </div>

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
