/** @format */

import { Button } from "@/components/_shared/button";
import AnimatedContainer from "@/components/_shared/framer/animate-div";
import React from "react";

const NightFree = () => {
  return (
    <div className="relative my-20 w-full h-[500px] overflow-hidden">
      <div
        className="w-full h-full py-14"
        style={{
          backgroundImage: `url(/images/apartment-5.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-screen-custom mx-auto h-full px-4 ">
          <div className="relative flex items-center rounded-lg bg-black/10 bg-opacity-60 backdrop-blur-md md:w-1/2 px-8 h-full ">
            <AnimatedContainer
              direction="left"
              className=" flex flex-col gap-4"
            >
              <h1 className="text-white text-4xl font-semibold">
                GET 3 NIGHTS FREE
              </h1>
              <p className="font-semibold w-3/4 text-white">
                8% Discount <span className="font-light">on our</span> Apartment
                & Free Laundry Service,{" "}
                <span className="font-light">
                  alongside others special benefits.
                </span>
              </p>
              <Button
                className="text-xs w-32 border-white h-8 text-white"
                variant={"outline"}
              >
                Know More
              </Button>
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NightFree;
