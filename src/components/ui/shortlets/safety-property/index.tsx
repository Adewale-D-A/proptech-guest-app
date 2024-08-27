import AnimatedContainer from '@/components/_shared/framer/animate-div';
import React from 'react'
import { IoMdCheckboxOutline } from "react-icons/io";

const property = [
  "Carbon monoxide alarm",
  "Smoke Alarm",
  "A must-climb stairs",
 
];
const SafetyProperties = () => {
  return (
    <AnimatedContainer className="">
      <div className="border-b p-4">
        <h1 className="font-medium ">Safety & property </h1>
      </div>
      <ul className="list-disc p-4  list-inside space-y-3">
        {property.map((rule, index) => (
          <li key={index} className="flex items-center text-sm">
            <IoMdCheckboxOutline size={16} className=" mr-2" />
            {rule}
          </li>
        ))}
      </ul>
    </AnimatedContainer>
  );
}

export default SafetyProperties
