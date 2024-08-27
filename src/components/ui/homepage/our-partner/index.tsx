/** @format */

import Marquee from "@/components/_shared/cards-animation";
import AnimatedContainer from "@/components/_shared/framer/animate-div";
import Image from "next/image";
import React from "react";
const shareImage = [
  "/trust/trust-1.png",
  "/trust/trust-2.png",
  "/trust/trust-3.png",
  "/trust/mindwalks.png",
];
const OurPartner = () => {
  return (
    <AnimatedContainer className="mb-20">
      <div className="max-w-screen-custom mx-auto px-4">
        <div className="flex items-center justify-center gap-x-1">
          <div className="h-[1px] w-8 bg-primary" />
          <p className="text-sm font-medium text-primary">OUR PARTNERS</p>
        </div>
        <div>
          <h1 className="text-center text-xl font-semibold mt-3">
            Trusted partners over the years
          </h1>
        </div>
        <Marquee className="[--duration:20s] mt-8" gap="gap-12">
          {shareImage.map((review, index) => (
            <Image
              width={70}
              height={70}
              key={index}
              alt="trusted"
              src={review}
              className="object-contain"
            />
          ))}
        </Marquee>
      </div>
    </AnimatedContainer>
  );
};

export default OurPartner;
