/** @format */

import { footer } from "@/_shared/data";
import Link from "next/link";
import React from "react";
import Logo from "../logo";
import { Separator } from "@/components/_shared/separator";
import Image from "next/image";

const Footer = () => {
  const socialData = [
    "/images/instagram.png",
    "/images/twitter.png",
    "/images/linkldn.png",
    "/images/fb.png",
    "/images/snapchat.png",
    "/images/tiktok.png",
  ];
  return (
    <div className="bg-primary py-14">
      <div className="max-w-screen-custom mx-auto px-4">
        <div className="flex flex-col gap-8">
          <div className="flex md:flex-row items-center md:items-start flex-col justify-between ">
            <div className="">
              <div className="md:block flex justify-center flex-col items-center">
                <Logo width={202} height={30} />
                <p className="text-[13px] mt-2 text-center md:text-start text-white md:w-2/3">
                  Designed to solved all property and rental problems.
                </p>
              </div>
            </div>
            {footer.map((foot) => (
              <div key={foot.title} className="mt-6 md:mt-0">
                <h1 className="text-white text-center md:text-start font-semibold">
                  {foot.title}
                </h1>
                <div className="flex  flex-col items-center md:items-start font-light gap-1.5 mt-3">
                  {foot.section.map((ft) => (
                    <Link
                      href={ft.link}
                      key={ft.text}
                      className="text-white text-[13px] font-light"
                    >
                      {ft.text}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Separator className="bg-white" />
          <div className="flex md:flex-row flex-col-reverse gap-3 md:gap-0 justify-between items-center">
            <p className="text-[13px]  text-white">
              © {new Date().getFullYear()} The 99Apartments
            </p>
            <div className="flex items-center gap-2">
              {socialData.map((social, index) => (
                <Image
                  key={social}
                  className="cursor-pointer"
                  src={social}
                  width={index === 1 || index === 4 || index === 5 ? 25 : 35}
                  height={index === 1 || index === 4 || index === 5 ? 25 : 35}
                  alt="social media"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
