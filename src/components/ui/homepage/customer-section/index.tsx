/** @format */

import React from "react";
import { FaComputer } from "react-icons/fa6";
import { Smile } from "lucide-react";
import AnimatedContainer from "@/components/_shared/framer/animate-div";

const CustomerSection = () => {
  return (
    <AnimatedContainer className="my-20">
      <div className="max-w-screen-custom mx-auto px-4">
        <div className="flex md:flex-row  flex-col  md:justify-between items-center">
          <div className="flex items-center md:items-start flex-col gap-2">
            <div className="flex items-center gap-x-1">
              <div className="h-[1px] w-8 bg-primary" />
              <p className="text-sm font-medium text-primary">OUR VALUES</p>
            </div>
            <h1 className="font-semibold text-center md:text-start w-full sm:w-3/4 text-2xl">
              Tech-Driven Innovation and Customer-Centric Excellence
            </h1>
            <p className="text-[13px] w-full text-center md:text-start md:w-96 text-gray-100 font-light">
              Our values form the bedrock of everything we do. We are guided by
              two fundamental principles: leveraging technology and staying
              unwaveringly customer-centric. These values are not mere words;
              they are the pillars upon which we build the future of property
              technology.
            </p>
          </div>
          <div className="w-full">
            <div className="w-full bg-[#E6E7F5]/30 rounded-md px-4 py-6 flex flex-col gap-10">
              <div className="">
                <div className="bg-[#2E4393] w-10 h-10 rounded-full flex justify-center items-center">
                  <FaComputer size={20} color="white" />
                </div>

                <h1 className="font-medium py-1 text-lg">
                  Leveraging Technology
                </h1>
                <p className="text-gray-100 text-sm font-light">
                  We offer efficient and professional services that sets us
                  apart
                </p>
              </div>
              <div>
                <div className="bg-[#FF7A1A] w-10 h-10 rounded-full flex justify-center items-center">
                  <Smile size={20} color="white" />
                </div>
                <h1 className="font-medium py-1  text-lg">Customer Centric</h1>
                <p className="text-gray-100 font-light text-sm ">
                  Pay monthly, quarterly or yearly to fit your schedule.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default CustomerSection;
