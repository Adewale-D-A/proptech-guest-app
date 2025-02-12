/** @format */
"use client";

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
        <div ref={dropdownRef} className="px-4">
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => handleMouseEnter("products")}
            onMouseLeave={handleMouseLeave}
          >
            {isMainRoute ? (
              <button
                className={` text-sm font-normal bg-transparent text-black   ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                Product
              </button>
            ) : (
              <button
                className={` text-sm font-normal bg-transparent text-black   `}
              >
                Product
              </button>
            )}
            {openDropdown === "products" && (
              <div className="absolute left-0 mt-2 w-32 bg-white border shadow-lg rounded-lg transition">
                <Link
                  href="/"
                  className="block  text-center text-sm py-2 transition"
                >
                  coming... soon
                </Link>
              </div>
            )}
          </div>
        </div>

        <div ref={dropdownRef} className="px-4">
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => handleMouseEnter("adventures")}
            onMouseLeave={handleMouseLeave}
          >
            {isMainRoute ? (
              <button
                className={` text-sm font-normal bg-transparent text-black   ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                Adventures
              </button>
            ) : (
              <button
                className={` text-sm font-normal bg-transparent text-black   `}
              >
                Adventures
              </button>
            )}
            {openDropdown === "adventures" && (
              <div className="absolute left-0 mt-2 w-32 bg-white border shadow-lg rounded-lg transition">
                <Link
                  href="/availability"
                  className="block  text-center text-sm py-2 transition"
                >
                  Availability
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
