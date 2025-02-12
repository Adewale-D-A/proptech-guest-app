/** @format */
import React from "react";
import { Shortlet } from "@/types/type";
import { Heart, MapPin, CalendarCheck2 } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { TbBed } from "react-icons/tb";
import Image from "next/image";
import { Card } from "@/components/_shared/card";
import SparkleEffect from "@/components/_shared/framer/sparkle-effect";
import LoveSparkEffect from "@/components/_shared/framer/love-spark";
import { RiBarcodeFill } from "react-icons/ri";
import { Button } from "@/components/_shared/button";
import { usePathname } from "next/navigation";
import { Calendar } from "../_shared/calander";

interface CardItemProps {
  apartment: Shortlet;
  onCheckAvailability: (apartment: Shortlet) => void;
  handleRoute: any;
  disabledDate?: any;
}

const CardItem = ({
  apartment,
  onCheckAvailability,
  handleRoute,
  disabledDate,
}: CardItemProps) => {
  const pathName = usePathname();
  return (
    <Card key={apartment.id} className="relative shadow-sm pb-4">
      <img
        width={0}
        height={0}
        src={apartment.images[0].path}
        alt={apartment.name}
        className="w-full rounded-t-md h-60 object-cover relative cursor-pointer"
        sizes="100vw"
        loading="eager"
      />
      <div className="absolute top-2 px-2 flex justify-between items-center flex-1 w-full">
        <SparkleEffect>
          <div className="flex items-center gap-2 w-14 h-6 rounded justify-center bg-black/10 bg-opacity-60 cursor-pointer backdrop-blur-md z-40">
            <FaStar color="#FFA500" size={16} />
            <span className="text-xs font-medium text-white">*****</span>
          </div>
        </SparkleEffect>
        <LoveSparkEffect>
          <div className="bg-black/10 bg-opacity-60 z-40 cursor-pointer backdrop-blur-md w-[30px] h-[30px] rounded flex justify-center items-center hover:bg-red-500 text-white">
            <Heart size={18} />
          </div>
        </LoveSparkEffect>
      </div>
      <div className="px-4">
        <div className="flex justify-between items-center my-3">
          <h3 className="font-medium">{apartment.name}</h3>
          <h3 className="text-primary font-medium">
            ₦{apartment.price.toLocaleString()}/
            <span className="text-xs font-light text-gray-100">Night</span>
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-gray-100 flex items-center gap-1">
            <MapPin size={12} />
            <p className="text-xs font-light text-gray-100">
              {apartment.location}
            </p>
          </div>
          <div className="text-gray-100 flex items-center gap-1">
            <TbBed size={12} />
            <p className="text-xs font-light">
              {apartment.no_of_bedrooms} Bedrooms
            </p>
          </div>
        </div>
        <div className="flex justify-between bg-[#F4F6FF] p-4 mt-4">
          {apartment.amenities?.map((am, index) => (
            <section key={index}>
              <div className="flex flex-col items-center gap-y-1">
                {am?.image ? (
                  <Image
                    src={am.image as string}
                    width={16}
                    height={16}
                    alt={am.name || "Amenity"}
                  />
                ) : (
                  <RiBarcodeFill size={16} />
                )}
                <p className="text-xs font-light">
                  {am?.name || "Unnamed Amenity"}
                </p>
              </div>
            </section>
          ))}
        </div>
        {pathName === "/availability" && (
          <section>
            <div className="flex justify-center border rounded-md mt-4">
              <Calendar disabled={disabledDate} className=" " mode="single" />
            </div>
            <section className="flex justify-between items-center mt-6 w-full">
              <section className="flex w-full items-center gap-2">
                <div className="w-5 h-5 flex justify-end items-end bg-[#E9E9E9] rounded-[2px] px-1 py-1">
                  <Image
                    src={"/marker.png"}
                    width={8}
                    height={8}
                    alt="marker"
                  />
                </div>
                <span className="text-xs text-[#606569] font-medium">
                  Available Dates
                </span>
              </section>
              <section className="flex justify-end items-center gap-2 w-full ">
                <div className="w-5 h-5 bg-[#E9E9E9] rounded-[2px]" />
                <span className="text-xs text-[#606569] font-medium ">
                  Unavailable Dates
                </span>
              </section>
            </section>
          </section>
        )}
        <div className="flex justify-between items-center mt-4">
          {pathName !== "/availability" ? (
            <div
              className="flex text-primary cursor-pointer items-center gap-2"
              onClick={() => onCheckAvailability(apartment)}
            >
              <CalendarCheck2 size={16} />
              <p className="text-sm">Check Availability</p>
            </div>
          ) : (
            <h3 className="text-[#252525] font-medium">
              ₦{apartment.price.toLocaleString()}/
              <span className="text-xs font-light ">Night</span>
            </h3>
          )}
          <Button
            className="text-xs font-normal h-8 w-32"
            onClick={() => handleRoute(apartment.name, apartment.id)}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CardItem;
