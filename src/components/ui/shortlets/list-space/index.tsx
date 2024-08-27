/** @format */
"use client";
import { Button } from "@/components/_shared/button";
import React, { useState } from "react";
import { Heart, MapPin, Search, CalendarCheck2 } from "lucide-react";
import { Input } from "@/components/_shared/input";
import { Label } from "@/components/_shared/label";
import { Separator } from "@/components/_shared/separator";
import { SlidersHorizontal } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { TbBed, TbPool, TbAirConditioning } from "react-icons/tb";
import { LuMonitor } from "react-icons/lu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";
import { Modal } from "@/components/_shared/modal";
import { ShortletType } from "@/types/type";
import Image from "next/image";
import { Card } from "@/components/_shared/card";
import { Wifi } from "lucide-react";
import { apartments } from "@/_shared/data";
import AnimatedContainer from "@/components/_shared/framer/animate-div";
import SparkleEffect from "@/components/_shared/framer/sparkle-effect";
import LoveSparkEffect from "@/components/_shared/framer/love-spark";
import { usePathname, useRouter } from "next/navigation";
import { Checkbox } from "@/components/_shared/check-box";

const ListSpace = ({ setShowModal, showModal }: ShortletType) => {
  const router = useRouter();
  const pathName = usePathname();
  const handleRoute = (aptName: string, id: number) => {
    router.push(`${pathName}/${aptName}/${id}`);
  };
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleAmenityChange = (amenityId: string) => {
    setSelectedAmenities((prevSelected) =>
      prevSelected.includes(amenityId)
        ? prevSelected.filter((id) => id !== amenityId)
        : [...prevSelected, amenityId]
    );
  };
  const allAmenities = [
    { id: "1", name: "Air Conditioning" },
    { id: "2", name: "Pool" },
    { id: "3", name: "WiFi" },
    { id: "4", name: "Kitchen" },
    { id: "5", name: "Gym" },
    { id: "6", name: "Washer" },
    { id: "7", name: "Pool" },
    { id: "8", name: "Hot tub" },
    { id: "9", name: "Smoke Alarm" },
    { id: "10", name: "Free parking on premises" },
    { id: "11", name: "Dedicated Workspace" },
    // Add more amenities here
  ];
   const howLong = [
     { id: "1", name: "Long Stay" },
     { id: "2", name: "Short Stay" },
   ];
    const amount = [
      { id: "1", name: "₦10,000 - ₦50,000  Per Night" },
      { id: "2", name: "₦51,000 - ₦100,000  Per Night" },
    ];

  return (
    <div className=" relative bottom-10 z-40">
      <div className="max-w-screen-custom mx-auto px-4">
        <div className="bg-[#f5f6ff] w-5/6 mx-auto rounded-full flex items-center  h-20 shadow-sm">
          <div className="flex justify-between h-full flex-1 items-center">
            <div className="flex-1 gap-3 flex justify-between px-6">
              <div className="flex gap-4 w-full items-center">
                <Search size={20} />
                <div className="w-full">
                  <Input
                    placeholder="Location"
                    className="w-full text-gray-100 border-none shadow-none"
                  />
                  <Label className="text-xs">
                    Where would you love to stay
                  </Label>
                </div>
              </div>
              <Separator
                orientation="vertical"
                className=" bg-black/10  h-20"
              />
              <div className="w-full flex flex-col justify-center">
                <Select>
                  <SelectTrigger className="border-none shadow-none text-gray-100">
                    <SelectValue
                      placeholder="Choose a tag"
                      className="text-gray-100  "
                    />
                  </SelectTrigger>

                  <SelectContent className="border-none">
                    {[
                      { id: "66059257bcb47c8944881922", name: "Marketing" },
                      { id: "66059257bcb47c8944881924", name: "Sales" },
                    ].map((tag) => (
                      <SelectItem
                        key={tag.id}
                        value={tag.id}
                        className="border-none"
                      >
                        {tag.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  <Label className="text-xs mt-2">Select Number of Rooms</Label>
                </Select>
              </div>
              <Separator
                orientation="vertical"
                className=" bg-black/10  h-20"
              />
              <div
                onClick={() => setShowModal(true)}
                className="w-1/2 cursor-pointer flex  pl-6 items-center"
              >
                <SlidersHorizontal />
              </div>
            </div>
            <div className="h-full cursor-pointer">
              <Button className="bg-[#FFD772] rounded-l-none text-black h-full w-44">
                SEARCH
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-24">
          <h1 className="text-3xl font-medium">Listed Spaces</h1>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {apartments.map((apartment) => (
              <AnimatedContainer>
                <Card key={apartment.id} className="relative shadow-sm pb-4">
                  <Image
                    width={0}
                    height={0}
                    src={apartment.images[0]} // Display the first image initially
                    alt={apartment.name}
                    className="w-full rounded-t-md h-60 object-cover relative cursor-pointer "
                    sizes="100vw"
                    loading="eager"
                  />
                  <a
                    href="#"
                    className=" rounded-t-md absolute w-full h-60 top-0 left-0 bg-black opacity-0 z-10 transition-opacity duration-300 hover:opacity-30 "
                  ></a>
                  <div className="absolute top-2 px-2 flex justify-between items-center flex-1 w-full">
                    <SparkleEffect>
                      <div className="flex items-center gap-2 w-14 h-6 rounded justify-center bg-black/10 bg-opacity-60 cursor-pointer backdrop-blur-md z-40">
                        <FaStar color="#FFA500" size={16} />
                        <span className="text-xs font-medium text-white">
                          {apartment.rating}
                        </span>
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
                        <span className="text-xs font-light text-gray-100">
                          Night
                        </span>
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
                          {apartment.bedrooms} Bedrooms
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between bg-[#F4F6FF] p-4 mt-4">
                      <div className="flex flex-col items-center gap-y-1">
                        <TbPool size={16} />
                        <p className="text-xs font-light">Pool</p>
                      </div>
                      <div className="flex flex-col items-center gap-y-1">
                        <TbAirConditioning size={16} />
                        <p className="text-xs font-light">Air-Conditioner</p>
                      </div>
                      <div className="flex flex-col items-center gap-y-1">
                        <LuMonitor size={16} />
                        <p className="text-xs font-light">Television</p>
                      </div>
                      <div className="flex flex-col items-center gap-y-1">
                        <Wifi size={16} />
                        <p className="text-xs font-light">Internet</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex text-primary items-center gap-2">
                        <CalendarCheck2 size={16} />
                        <p className="text-sm">Check Availability</p>
                      </div>
                      <Button
                        className="text-xs font-normal h-8 w-32"
                        onClick={() =>
                          handleRoute(apartment.name, apartment.id)
                        }
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </div>
      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        setShowModal={setShowModal}
        showCloseIcon
        className="relative min-w-[500px]  bg-white"
      >
        <section>
          <h1 className="border-b py-3 px-4 font-medium text-lg">
            Filter your Search
          </h1>
          <div className="p-4 border-b">
            <h2>Features, Amenities & Rules</h2>
            <div className="flex mt-4 items-center flex-wrap gap-5">
              {allAmenities.map((amenity) => (
                <div key={amenity.id} className="flex items-center gap-1 mb-2">
                  <Checkbox
                    id={amenity.id}
                    checked={selectedAmenities.includes(amenity.id)}
                    onChange={() => handleAmenityChange(amenity.id)}
                    className="form-checkbox border border-[#252525]"
                  />
                  <Label htmlFor={amenity.id} className="text-xs font-normal">
                    {amenity.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-b">
            <h2>Feature Type</h2>
            <div className="flex items-center mt-2 flex-wrap gap-3">
              {howLong.map((amenity) => (
                <div key={amenity.id} className="flex items-center gap-1 mb-2">
                  <Checkbox
                    id={amenity.id}
                    checked={selectedAmenities.includes(amenity.id)}
                    onChange={() => handleAmenityChange(amenity.id)}
                    className="form-checkbox border border-[#252525]"
                  />
                  <Label htmlFor={amenity.id} className="text-xs font-normal">
                    {amenity.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 border-b">
            <div>
              <h1>Price Range (Shortlet)</h1>
            </div>
            <div className="flex mt-4 flex-col gap-2">
              {amount.map((amenity) => (
                <div key={amenity.id} className="flex items-center gap-1 mb-2">
                  <Checkbox
                    id={amenity.id}
                    checked={selectedAmenities.includes(amenity.id)}
                    onChange={() => handleAmenityChange(amenity.id)}
                    className="form-checkbox border border-[#252525]"
                  />
                  <Label htmlFor={amenity.id} className="text-xs font-normal">
                    {amenity.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex py-4 px-4 justify-end gap-3">
            <Button
              variant={"outline"}
              className="h-9 w-24 text-gray-100 text-xs border-none bg-[#E5E5E5]"
            >
              Cancel
            </Button>
            <Button className="h-9 w-24 text-xs">Search</Button>
          </div>
        </section>
      </Modal>
    </div>
  );
};

export default ListSpace;
