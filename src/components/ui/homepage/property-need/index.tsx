/** @format */

import AnimatedContainer from "@/components/_shared/framer/animate-div";
import { Separator } from "@/components/_shared/separator";
import Image from "next/image";
import React from "react";

const PropertyNeeds = () => {
  const ReusableComponent = ({
    amount,
    text,
    color,
  }: {
    amount: number;
    text: string;
    color: string;
  }) => {
    return (
      <div>
        <div>
          <h1 style={{ color: color }} className="text-xl font-semibold">
            {amount}+
          </h1>
          <p className="text-xs">{text}</p>
        </div>
      </div>
    );
  };
  return (
    <AnimatedContainer className="mt-20">
      <div className="max-w-screen-custom mx-auto px-4">
        <div className="flex md:flex-row flex-col  justify-between items-center">
          <div className="md:w-1/2 w-full flex flex-col gap-2">
            <div className="flex items-center gap-x-1">
              <div className="h-[1px] w-8 bg-primary" />
              <p className="text-sm font-medium text-primary">WHAT WE OFFER</p>
            </div>
            <h1 className="font-semibold text-2xl">
              99 Solutions for all your Property Needs
            </h1>
            <p className="text-[13px] w-full md:w-96 text-gray-100 font-light">
              We are a property technology company building an on demand real
              estate ecosystem that provides comfortable, affordable and
              convenient real estate services in urban cities in Nigeria.
            </p>
            <div className="flex mt-3 items-center gap-3">
              <ReusableComponent
                amount={400}
                text="Apartments"
                color="#7C0DBE"
              />
              <Separator orientation="vertical" className=" bg-black/10 h-10" />
              <ReusableComponent amount={1000} text="Guest" color="#FF00D6" />
              <Separator orientation="vertical" className=" bg-black/10 h-10" />
              <ReusableComponent
                amount={5000}
                text="Bookings"
                color="#4CE7F3"
              />
              <Separator orientation="vertical" className=" bg-black/10 h-10" />
              <ReusableComponent
                amount={3500}
                text="5 Star Rating"
                color="#009CFF"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <Image
              src={"/images/apartment-4.png"}
              width={600}
              height={384}
              alt="apartment"
            />
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default PropertyNeeds;
