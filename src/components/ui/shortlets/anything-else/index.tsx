/** @format */

import BlurFade from "@/components/_shared/blur-animation";
import { Card } from "@/components/_shared/card";
import AnimatedContainer from "@/components/_shared/framer/animate-div";
import Image from "next/image";
import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineMarkEmailRead } from "react-icons/md";

const AnythingElse = () => {
  return (
    <AnimatedContainer className="relative my-20 ">
      <div className="bg-[#F4F6FF] lg:h-[22rem] w-full rounded-xl" />
      <div className="flex justify-center">
        <Card className="border w-full lg:w-[95%]  bg-white lg:absolute top-[-65px] border-black/5 shadow-sm rounded-xl">
          <div className="flex lg:flex-row flex-col-reverse  items-center justify-between p-4 md:p-6 w-full">
            <AnimatedContainer direction="left" className="lg:w-1/2">
              <h1 className="text-3xl sm:text-4xl leading-[45px] w-full lg:w-3/4">
                Anything else you&apos;d like to know?
              </h1>

              <div className="flex sm:flex-row flex-col mt-6 items-stretch w-full">
                <div className="sm:w-1/2 sm:border-r flex flex-col">
                  <div className="w-10 h-10 bg-primary-1 flex justify-center items-center rounded-md">
                    <MdOutlineMarkEmailRead size={24} color="white" />
                  </div>
                  <div className="mt-4">
                    <h2 className="font-medium">Email Us</h2>
                    <p className="text-[#707070] font-light mt-1 text-xs">
                      We respond promptly to incoming calls
                    </p>
                  </div>
                  <p className="text-primary-1 text-sm font-medium sm:mt-6 mt-2">
                    hello@thespotlagos.com
                  </p>
                </div>

                <div className="sm:w-1/2 sm:px-4 mt-6 sm:mt-0 flex flex-col">
                  <div className="w-10 h-10 bg-primary-1 flex justify-center items-center rounded-md">
                    <FaWhatsapp size={24} color="white" />
                  </div>
                  <div className="mt-4">
                    <h2 className="font-medium">Call Us</h2>
                    <p className="text-[#707070] font-light mt-1 text-xs">
                      Schedule a call, We respond swiftly
                    </p>
                  </div>
                  <p className="text-primary-1 text-sm  font-medium mt-2 sm:mt-6">
                    +234-816-736-4648
                  </p>
                </div>
              </div>
            </AnimatedContainer>
            <div className="lg:w-1/2">
              <BlurFade delay={0.25} inView>
                <Image
                  width={0}
                  height={0}
                  src={"/images/apartment-3.jpg"}
                  alt="apartment"
                  className="w-full rounded-md object-cover"
                  sizes="100vw"
                  loading="eager"
                />
              </BlurFade>
            </div>
          </div>
        </Card>
      </div>
    </AnimatedContainer>
  );
};

export default AnythingElse;
