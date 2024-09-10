/** @format */

import React from "react";
import { MapPin } from "lucide-react";
import AnimatedContainer from "@/components/_shared/framer/animate-div";
import { Shortlet } from "@/types/type";

const ApartmentDetails = ({
  apartmentDetails,
}: {
  apartmentDetails: Shortlet;
}) => {
  return (
    <AnimatedContainer>
      <div className="p-4 border-b">
        <h1 className="font-medium">Location of Apartment</h1>
      </div>
      <section className="p-4">
        <div className="flex gap-3 items-center">
          <div className="bg-[#EAEAEA] w-12 h-12 rounded-md flex justify-center items-center">
            <MapPin size={24} />
          </div>
          <div>
            <h1 className="">{apartmentDetails?.location} </h1>
            <p className="text-[#707070] font-light text-xs">
              Lagos State, Nigeria *
            </p>
          </div>
        </div>
        <section className="mt-6">
          <h1 className="">The Neighborhood : Oniru</h1>
          <p className="text-[#707070] text-[13px] font-light mt-3 leading-relaxed">
            {apartmentDetails?.description}
          </p>
          <div className="bg-gray-200 w-full h-80 rounded-md mt-7" />
        </section>
      </section>
    </AnimatedContainer>
  );
};

export default ApartmentDetails;
