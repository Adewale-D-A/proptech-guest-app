/** @format */

import AnimatedContainer from "@/components/_shared/framer/animate-div";
import { Shortlet } from "@/types/type";
import React from "react";
import { IoMdCheckboxOutline } from "react-icons/io";

const rules = [
  "No structural changes without host permission",
  "No loud music after 10pm",
  "No illegal activities",
  "No smoking",
  "No Inflammables",
  "8 guests maximum",
];
const HouseRules = ({ apartmentDetails }: { apartmentDetails: Shortlet }) => {
  return (
    <AnimatedContainer className="">
      <div className="border-b p-4">
        <h1 className="font-medium">House Rules</h1>
      </div>
      <ul className="list-disc p-4  list-inside space-y-3">
        {apartmentDetails &&
          apartmentDetails.rules.map((rule, index) => (
            <li key={index} className="flex items-center text-sm">
              <IoMdCheckboxOutline size={16} className=" mr-2" />
              {rule.name}
            </li>
          ))}
      </ul>
    </AnimatedContainer>
  );
};

export default HouseRules;
