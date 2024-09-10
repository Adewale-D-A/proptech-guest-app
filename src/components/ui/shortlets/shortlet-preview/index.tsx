/** @format */
"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/_shared/button";
import { MdArrowBack } from "react-icons/md";
import { IoArrowForward } from "react-icons/io5";
import { CalendarCheck2 } from "lucide-react";
import { Card } from "@/components/_shared/card";
import { TiStarFullOutline } from "react-icons/ti";
import { DatePicker } from "@/components/date-picker";
import { Label } from "@/components/_shared/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";
import ListCard from "../list-card";
import { Input } from "@/components/_shared/input";
import ShareReview from "../share-review";
import DetailsSection from "../details-section";
import AnimatedContainer from "@/components/_shared/framer/animate-div";
import AnythingElse from "../anything-else";
import BackButton from "@/components/back-btn";
import { ImageType, Shortlet, ShortletPage } from "@/types/type";
import { formatCurrency } from "@/_shared";

const ShortLetPreviewComponent = ({
  apartmentDetails,
}: {
  apartmentDetails: any;
}) => {
  console.log("apartmentDetails::", apartmentDetails);

  const [currentIndex, setCurrentIndex] = useState(0);

  const imgLength = apartmentDetails && apartmentDetails?.images.length;

  const handleNext = () => {
    if (apartmentDetails) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imgLength);
    }
  };

  console.log("mgLength.length", imgLength);

  const handlePrev = () => {
    if (apartmentDetails && apartmentDetails.length > 0) {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + apartmentDetails.length) % apartmentDetails.length
      );
    }
  };

  const totalImages = apartmentDetails?.images.length || 0;

  console.log("totalImages", totalImages);

  const startIndex = Math.max(currentIndex - 2, 0);
  const endIndex = Math.min(startIndex + 4, totalImages);
  const imagesToShow = apartmentDetails?.images.slice(startIndex, endIndex);

  const adjustedStartIndex =
    imagesToShow?.length < 4 && totalImages > 4
      ? Math.max(totalImages - 4, 0)
      : startIndex;
  const adjustedImagesToShow = apartmentDetails?.images.slice(
    adjustedStartIndex,
    adjustedStartIndex + 4
  );

  const remainingCount = totalImages - adjustedImagesToShow?.length;

  console.log("remainingCount:::", remainingCount);

  console.log("apartmentDetails[currentIndex]?.images[0] ", apartmentDetails);

  return (
    <div className="pt-24">
      <section className="max-w-screen-custom mx-auto px-4">
        <BackButton />
        <AnimatedContainer className="flex mt-6 gap-4">
          <div className="w-full relative">
            <img
              src={apartmentDetails?.images[0].path || ""}
              alt={`Apartment Image ${currentIndex + 1}`}
              className="w-full rounded-xl h-[600px] object-cover"
            />
            <div className="flex justify-between absolute top-0 items-center h-full left-0 right-0 px-6">
              <Button
                onClick={handlePrev}
                disabled={apartmentDetails?.images.length === 0}
                className="bg-white shadow-md w-12 h-12 rounded-full px-4"
              >
                <MdArrowBack size={30} color="black" />
              </Button>
              <Button
                onClick={handleNext}
                disabled={apartmentDetails?.images.length === 0}
                className="bg-white shadow-md w-12 h-12 rounded-full px-4"
              >
                <IoArrowForward size={30} color="black" />
              </Button>
            </div>
          </div>

          <div className="w-1/3 relative flex flex-col gap-2">
            {adjustedImagesToShow &&
              adjustedImagesToShow?.map((image: ImageType, index: number) => {
                const isActive = currentIndex === adjustedStartIndex + index;
                return (
                  <div
                    key={index}
                    className={`w-full h-36 cursor-pointer relative rounded-md ${
                      isActive ? "bg-black bg-opacity-80" : ""
                    }`}
                    onClick={() => setCurrentIndex(adjustedStartIndex + index)}
                  >
                    <img
                      src={image.path}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-full h-full rounded-md object-cover ${
                        isActive ? "opacity-40" : ""
                      }`}
                    />
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        <span>Active</span>
                      </div>
                    )}
                  </div>
                );
              })}
            {remainingCount > 0 && (
              <div className="relative bottom-24 text-white text-4xl font-semibold flex justify-center p-2 rounded mt-2">
                {remainingCount} +
              </div>
            )}
          </div>
        </AnimatedContainer>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-medium">
              {apartmentDetails?.name} - {apartmentDetails?.no_of_bedrooms}{" "}
              Bedroom
            </h1>
          </div>
          <div>
            <Button
              variant={"outline"}
              className="text-xs text-primary-1 flex items-center gap-2"
            >
              <CalendarCheck2 size={16} /> Check Availability
            </Button>
          </div>
        </div>
        <div className="flex gap-6 mt-5 relative h-full">
          <DetailsSection apartmentDetails={apartmentDetails} />
          <div className="sticky top-[130px]"></div>
          <AnimatedContainer className="w-1/2">
            <Card className="shadow-sm border border-black/5">
              <div className="flex border-b p-4 justify-between items-center">
                <div className="flex justify-center items-center bg-[#F2F8FF] w-36 h-9 rounded-md">
                  <h1 className="text-primary text-font-medium">
                    {formatCurrency(
                      apartmentDetails?.price,
                      apartmentDetails?.currency
                    )}
                    /<span className="text-xs">Night</span>{" "}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <TiStarFullOutline size={20} color="#FFA500" />
                  <span className="text-xs">4.5 (8 Reviews)</span>
                </div>
              </div>
              <section className="p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center gap-4 w-full">
                    <div className="w-full">
                      <DatePicker label="Check-in" placeholder="DD/MM/YYYY" />
                    </div>
                    <div className="w-full">
                      <DatePicker label="Check-out" placeholder="DD/MM/YYYY" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-normal">No of Guest</Label>
                    <Select>
                      <SelectTrigger className="border-black/10 h-10 shadow-none text-gray-100 mt-2">
                        <SelectValue
                          placeholder="Enter number of guests"
                          className="text-[#77838D] text-xs font-light"
                        />
                      </SelectTrigger>
                      <SelectContent className="border-none">
                        {/* {roomOptions.map((option) => (
                          <React.Fragment key={option.id}>
                            <SelectItem
                              value={option.id}
                              className="border-none font-bold"
                            >
                              {option.name}
                            </SelectItem>
                            {option.details && (
                              <div className="pl-4">
                                {option.details.map((detail) => (
                                  <SelectItem
                                    key={detail.id}
                                    value={detail.id}
                                    className="border-none"
                                  >
                                    {detail.name}
                                  </SelectItem>
                                ))}
                              </div>
                            )}
                          </React.Fragment>
                        ))} */}
                      </SelectContent>
                    </Select>
                  </div>
                  <section className="bg-[#F9F9F9] rounded-md mt-5">
                    <div className="border-b p-4">
                      <h1 className="">Booking Summary</h1>
                    </div>
                    <div className="p-4">
                      <div className="border-b py-3 flex flex-col gap-3">
                        <ListCard
                          amt="#108,000.00"
                          costName="Estimated cost for 1 night "
                        />
                        <ListCard
                          amt="#108,000.00"
                          costName="Total (1 Night)"
                        />
                      </div>
                      <div className="pt-5">
                        <Button variant="outline" className="w-full">
                          Reserve Now
                        </Button>
                      </div>
                    </div>
                  </section>
                </div>
              </section>
            </Card>
          </AnimatedContainer>
        </div>
        <ShareReview />
        <AnythingElse />
      </section>
    </div>
  );
};

export default ShortLetPreviewComponent;
