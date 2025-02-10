/** @format */

import AnimatedContainer from "@/components/_shared/framer/animate-div";
import { Shortlet } from "@/types/type";
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

const PointInterest = ({
  apartmentDetails,
}: {
  apartmentDetails: Shortlet;
}) => {
  return (
    <AnimatedContainer className="">
      <div className="border-b p-4">
        <h1 className="font-medium ">Points of Interest</h1>
      </div>
      <div className="p-4 flex justify-between">
        <div className="flex gap-3">
          <TbPointerPin />
          <p className="text-[#707070] text-[13px]  leading-relaxed font-light ">
            {apartmentDetails?.point_of_interest}
          </p>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default PointInterest;
