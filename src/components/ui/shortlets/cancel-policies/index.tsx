/** @format */
import AnimatedContainer from "@/components/_shared/framer/animate-div";
import { Shortlet } from "@/types/type";
import { CircleAlert } from "lucide-react";

import React from "react";

const CancelPolicies = ({
  apartmentDetails,
}: {
  apartmentDetails: Shortlet;
}) => {
  return (
    <AnimatedContainer className="">
      <div className="border-b p-4">
        <h1 className="font-medium ">Cancellation Policies </h1>
      </div>
      <div className="p-4">
        <CircleAlert
          size={16}
          className="float-left relative top-1"
          color="#707070 "
        />
        <p className="text-[#707070] text-[13px] font-light ml-8 leading-relaxed">
          {apartmentDetails?.cancellation_policy}
        </p>
      </div>
    </AnimatedContainer>
  );
};

export default CancelPolicies;
