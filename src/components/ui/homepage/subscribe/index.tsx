/** @format */

import { Button } from "@/components/_shared/button";
import AnimatedContainer from "@/components/_shared/framer/animate-div";
import { Input } from "@/components/_shared/input";
import Image from "next/image";
import React from "react";

const Subscribe = () => {
  return (
    <div className="bg-[#E6E7F5]/50">
      <div className="max-w-screen-custom mx-auto px-4">
        <div className="flex md:flex-row  flex-col-reverse  md:justify-between items-center">
          <AnimatedContainer direction="left" className="flex flex-col gap-4">
            <h1 className="text-2xl text-center md:text-start font-semibold">
              Subscribe to our <span className="font-normal">newsletter!</span>
            </h1>
            <p className="text-gray-100 font-light text-center md:text-start">
              Your mail address will be fully secure. We don’t share!
            </p>

            <div className="relative flex items-center">
              <Input
                className="pr-20 h-14 border-none bg-white rounded-full font-light"
                placeholder="Enter your email address "
              />
              <Button className="bg-[#284499] absolute right-2 top-2 bottom-0 text-white py-2 px-4 rounded-full text-xs font-light">
                Subscribe now
              </Button>
            </div>
          </AnimatedContainer>
          <div>
            <Image
              src={"/images/bro.png"}
              width={517}
              height={450}
              alt="subscribe"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
