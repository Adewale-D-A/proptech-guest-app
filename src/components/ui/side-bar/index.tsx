/** @format */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import { AiOutlineHome } from "react-icons/ai";

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/_shared/tooltip";
import Logo from "../logo";
import { Label } from "@/components/_shared/label";
import { navigationOptions } from "@/_shared/sidebar";

type Props = {
  setIsOpen: (val: boolean) => void;
  isOpen: boolean;
  isTab: boolean;
};

const SideBarScreen = ({ isOpen, isTab, setIsOpen }: Props) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const pathName = usePathname();

  const Sidebar_animation = isTab
    ? {
        open: {
          x: 0,
          width: "15rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "15rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <motion.div
      initial={{ x: isTab ? -250 : 0 }}
      variants={Sidebar_animation}
      animate={isOpen ? "open" : "closed"}
      className="bg-primary-1 flex flex-col justify-between border-r h-full z-40 w-60 fixed left-0"
    >
      <ul
        className={`flex flex-col ${
          isOpen ? "" : "px-3 "
        } mt-[30px] gap-3 w-full `}
      >
        <div className="mb-3 px-3 ">
          {isOpen ? (
            <Logo width={200} height={26} />
          ) : (
            <Image
              src={"/images/99-logo.png"}
              width={50}
              height={50}
              alt="logo"
              className="cursor-pointer"
            />
          )}
        </div>
        {navigationOptions.map((data) => (
          <li key={data.id} className="w-full">
            <Link href={data.href} passHref>
              <div
                className={`flex hover:bg-primary hover:text-primary-0 items-center h-[40px]  hover:text-[#CFCFCF] ${
                  isOpen ? "justify-start  gap-x-3 px-3" : "justify-center"
                } ${
                  activeTab === data.id
                    ? `bg-[#9B9B9B]/20  border-white text-white ${
                        isOpen ? " border-l-[3px] " : "border-b-[3px]"
                      }`
                    : "text-[#CFCFCF]"
                }`}
                onClick={() => handleTabClick(data.id)}
              >
                {isOpen ? (
                  <>
                    <div>{data.icon}</div>
                    <p
                      className={`text-sm font-normal ${
                        isOpen ? "flex" : "hidden"
                      }`}
                    >
                      {data.title}
                    </p>
                  </>
                ) : (
                  <>
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger>{data.icon}</TooltipTrigger>
                        <TooltipContent>
                          <Label className="font-light text-xs text-black">
                            {data.title}
                          </Label>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <div>
          <Link href={"/"} passHref>
            <div
              className={`flex hover:bg-primary hover:text-primary-0 items-center h-[40px]  hover:text-[#CFCFCF] ${
                isOpen ? "justify-start  gap-x-3 px-3" : "justify-center"
              } ${isOpen ? " " : " border-b"}`}
            >
              {isOpen ? (
                <>
                  <div className="text-white">
                    <AiOutlineHome />{" "}
                  </div>
                  <p
                    className={`text-sm text-white font-normal ${
                      isOpen ? "flex" : "hidden"
                    }`}
                  >
                    Goto Homepage
                  </p>
                </>
              ) : (
                <>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger>
                        {" "}
                        <AiOutlineHome className="text-white" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <Label className="font-light text-xs text-black">
                          Goto Homepage
                        </Label>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}
            </div>
          </Link>
        </div>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`p-4 cursor-pointer flex items-center ${
            isOpen ? "justify-end" : "justify-center "
          }`}
        >
          <div
            className={`${
              isOpen
                ? ""
                : "w-10 h-8  bg-[#9B9B9B]/20  border-b-[3px] flex items-center justify-center"
            }`}
          >
            <ArrowLeft color="white" size={16} className="" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SideBarScreen;






