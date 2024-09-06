/** @format */

import { allInOneData } from "@/_shared/data";
import { Card } from "@/components/_shared/card";
import AnimatedContainer from "@/components/_shared/framer/animate-div";
import Image from "next/image";
import React from "react";

const OurProduct = () => {
  return (
    <AnimatedContainer className="mt-20">
      <div className="max-w-screen-custom mx-auto px-4">
        <div className="flex items-center justify-center gap-x-1">
          <div className="h-[1px] w-8 bg-primary" />
          <p className="text-sm font-medium text-primary">WHAT WE OFFER</p>
        </div>
        <div className="flex mt-2 justify-center items-center gap-x-2">
          <Image src={"/images/tags.png"} width={50} height={50} alt="tags" />
          <h1 className="text-2xl md:text-4xl font-semibold">
            All In One Proptech Solution
          </h1>
        </div>
        <div className="grid mt-10 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 ">
          {allInOneData.map((apt) => (
            <Card key={apt.id} className="p-2 pb-6 border-gray-50 ">
              <Image
                width={0}
                height={0}
                src={apt.image}
                alt="Hero"
                className="w-full rounded-md h-48 object-cover "
                sizes="100vw"
                loading="eager"
              />
              <div className="flex flex-col gap-3 mt-4">
                <h2 className="font-medium">{apt.title}</h2>
                <p className="text-xs text-gray-100 font-light">{apt.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default OurProduct;
