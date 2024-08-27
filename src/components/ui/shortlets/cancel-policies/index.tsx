/** @format */
import AnimatedContainer from "@/components/_shared/framer/animate-div";
import { CircleAlert } from "lucide-react";

import React from "react";

const CancelPolicies = () => {
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
          We offer flexible cancellations for all bookings. Select the Flex Rate
          to cancel your booking up to 3 days before check-in and receive a full
          refund. For longer stays that are paid monthly, we require at least 30
          days notice to cancel or modify without fees
        </p>
      </div>
    </AnimatedContainer>
  );
};

export default CancelPolicies;
