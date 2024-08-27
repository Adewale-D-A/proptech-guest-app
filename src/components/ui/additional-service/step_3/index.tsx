/** @format */

import { Card } from "@/components/_shared/card";
import React from "react";

const ThirdStepForm = ({ form }: { form: any }) => {
  const ReusableCard = ({
    text,
    description,
  }: {
    text: string;
    description: string;
  }) => {
    return (
      <div className="flex border-b py-3 justify-between items-center">
        <p
          className={`text-sm font-light  ${
            text === "Total" ? "" : "text-[#707070]"
          }  `}
        >
          {text}
        </p>
        <p className="text-sm">{description}</p>
      </div>
    );
  };
  return (
    <div>
      <Card className="bg-[#F9F9F9] shadow-sm p-4 border-[#F9F9F9]">
        <h3 className="mb-2 font-medium">Order Summary</h3>
        <div className="flex flex-col ">
          <ReusableCard text="Type of Service" description="Cleaning" />
          <ReusableCard description="4/4/2024,  12:00PM" text="Date" />
          <ReusableCard description="#5,000.00" text="Cleaning Fee" />
          <ReusableCard description="#5,000.00" text="Total" />
        </div>
      </Card>
    </div>
  );
};

export default ThirdStepForm;
