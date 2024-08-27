/** @format */

import AnimatedContainer from "@/components/_shared/framer/animate-div";
import { Car } from "lucide-react";
import React from "react";
import { TbPointerPin } from "react-icons/tb";

const interest = [
  "Landmark Center             ",
  "Club Havana",
  "HardRock Cafe",
  "Leisure Lake ",
  "The palms",
];
const distance = [
  "17 mins drive",
  "10 mins drive",
  "14 mins drive",
  "27 mins drive",
  "10 mins drive",
];
const PointInterest = () => {
  return (
    <AnimatedContainer className="">
      <div className="border-b p-4">
        <h1 className="font-medium ">Cancellation Policies </h1>
      </div>
      <div className="p-4 flex justify-between">
        <div className="flex flex-col gap-3">
          {interest.map((data) => (
            <div className="flex gap-2 items-center">
              <TbPointerPin />
              <p className="text-[#707070] text-[13px]  leading-relaxed font-light ">
                {data}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {distance.map((data) => (
            <div className="flex gap-2 items-center">
              <Car size={14} />
              <p className="text-[#707070] text-[13px] font-light  leading-relaxed">
                {data}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default PointInterest;
