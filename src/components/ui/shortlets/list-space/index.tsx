/** @format */
"use client";
import { Button } from "@/components/_shared/button";
import React, { useEffect, useState } from "react";
import { Heart, MapPin, Search, CalendarCheck2, X } from "lucide-react";
import { Input } from "@/components/_shared/input";
import { Label } from "@/components/_shared/label";
import { Separator } from "@/components/_shared/separator";
import { SlidersHorizontal } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { TbBed } from "react-icons/tb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";
import { Modal } from "@/components/_shared/modal";
import { Shortlet, ShortletType } from "@/types/type";
import Image from "next/image";
import { Card } from "@/components/_shared/card";
import { allAmenities, howLong, shortletAmount } from "@/_shared/data";
import AnimatedContainer from "@/components/_shared/framer/animate-div";
import SparkleEffect from "@/components/_shared/framer/sparkle-effect";
import LoveSparkEffect from "@/components/_shared/framer/love-spark";
import { usePathname, useRouter } from "next/navigation";
import { Checkbox } from "@/components/_shared/check-box";
import CardSkeleton from "@/components/card-skeleton";
import { useVerifyPayment } from "@/redux/hooks/useVerifyPayment";
import { RiBarcodeFill } from "react-icons/ri";
import { useGetAvailableDateMutation } from "@/redux/services/shortlet";
import { Calendar } from "@/components/_shared/calander";
import ThunderLoader from "@/components/loader/thunder-loader";
import useCheckAvaliability from "@/redux/hooks/check-avaliable-date";

const ListSpace = ({
  setShowModal,
  showModal,
  shortletData,
  isLoading,
  setFilters,
}: ShortletType) => {
  const router = useRouter();
  const pathName = usePathname();
  const handleRoute = (aptName: string, id: number) => {
    router.push(`${pathName}/${aptName}/${id}`);
  };
  const [shortlet, setShortlet] = useState<Shortlet | null>(null);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [location, setLocation] = useState<string>("");
  const [numOfRooms, setNumOfRooms] = useState<string>("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showDate, setShowDate] = useState(false);
  const [
    getAvailableDate,
    { data: availableDates, isLoading: loadingAvailableDates },
  ] = useGetAvailableDateMutation();

  const handleAmenityChange = (amenityId: string) => {
    setSelectedAmenities((prevSelected) =>
      prevSelected.includes(amenityId)
        ? prevSelected.filter((id) => id !== amenityId)
        : [...prevSelected, amenityId]
    );
  };
  const { actions, state } = useCheckAvaliability({
    blockedDates: availableDates?.data?.blocked_dates || [],
    bookedDates: availableDates?.data?.booked_dates || [],
  });
  const handleSearch = () => {
    setFilters({
      location,
      room_option_id: numOfRooms,
    });
  };

  const skeletonRows = Array.from({ length: 5 }, (_, index) => (
    <CardSkeleton key={index} />
  ));

  const handleClickSingleApt = (shortlet: Shortlet) => {
    if (shortlet) {
      setShortlet(shortlet);
      setShowDate(true);
    }
  };

  useEffect(() => {
    if (shortlet?.id) {
      const aptId = shortlet?.id;
      getAvailableDate(aptId);
    }
  }, [shortlet?.id, getAvailableDate]);

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useVerifyPayment();

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
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
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
                <Select onValueChange={(value) => setNumOfRooms(value)}>
                  <SelectTrigger className="border-none shadow-none text-gray-100">
                    <SelectValue
                      placeholder="Choose number of rooms"
                      className="text-gray-100"
                    />
                  </SelectTrigger>

                  <SelectContent className="border-none">
                    {[1, 2, 3, 4, 5].map((room) => (
                      <SelectItem
                        key={room}
                        value={room.toString()}
                        className="border-none"
                      >
                        {room} Room{room > 1 ? "s" : ""}
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
              <Button
                className="bg-[#FFD772] rounded-l-none text-black h-full w-44"
                onClick={handleSearch}
              >
                SEARCH
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-24">
          <h1 className="text-3xl font-medium">Listed Spaces</h1>
          {isLoading ? (
            <div className="grid grid-cols-3 gap-4  mt-8">{skeletonRows}</div>
          ) : (
            <div className="grid grid-cols-3 gap-4 mt-8">
              {shortletData && shortletData.length <= 0 ? (
                <>
                  <div>no data avaliable</div>
                </>
              ) : (
                <>
                  {shortletData &&
                    shortletData.map((apartment) => (
                      <AnimatedContainer key={apartment.id}>
                        <Card
                          key={apartment.id}
                          className="relative shadow-sm pb-4"
                        >
                          <img
                            width={0}
                            height={0}
                            src={apartment.images[0].path}
                            alt={apartment.name}
                            className="w-full rounded-t-md h-60 object-cover relative cursor-pointer "
                            sizes="100vw"
                            loading="eager"
                          />
                          <div className="absolute top-2 px-2 flex justify-between items-center flex-1 w-full">
                            <SparkleEffect>
                              <div className="flex items-center gap-2 w-14 h-6 rounded justify-center bg-black/10 bg-opacity-60 cursor-pointer backdrop-blur-md z-40">
                                <FaStar color="#FFA500" size={16} />
                                <span className="text-xs font-medium text-white">
                                  {/* {apartment.rating} */}*****
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
                                  {apartment.no_of_bedrooms} Bedrooms
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between bg-[#F4F6FF] p-4 mt-4">
                              {apartment &&
                                apartment.amenities?.map((am, index) => (
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
                            <div className="flex justify-between items-center mt-4">
                              <div
                                className="flex text-primary cursor-pointer items-center gap-2"
                                onClick={() => handleClickSingleApt(apartment)}
                              >
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
                </>
              )}
            </div>
          )}
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
              {shortletAmount.map((amenity) => (
                <div key={amenity.id} className="flex items-center gap-1 mb-2 ">
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

      <Modal
        showModal={showDate}
        setShowModal={setShowDate}
        onClose={() => setShowDate(false)}
        className="w-fit max-w-lg"
      >
        <section>
          {loadingAvailableDates ? (
            <ThunderLoader />
          ) : (
            <section className="p-4">
              <section className="flex justify-between items-center">
                <h1 className="font-medium ">{shortlet?.name}</h1>
                <X size={16} onClick={() => setShowDate(false)} />
              </section>
              <Calendar
                mode="single"
                selected={
                  state?.filteredDates?.length > 0
                    ? state?.filteredDates[0]
                    : undefined
                }
                onSelect={handleDateChange}
                disabled={[
                  (date) =>
                    state?.filteredDates?.some(
                      (d) =>
                        d.toISOString().split("T")[0] ===
                        date.toISOString().split("T")[0]
                    ),
                  { before: new Date() },
                ]}
                className="pt-10"
              />
              <section className="flex justify-between items-center mt-6 px-5">
                <section className="flex items-center gap-2">
                  <Checkbox
                    checked={state?.availableChecked}
                    onCheckedChange={actions?.handleAvailableToggle}
                  />
                  <span className="text-xs text-[#606569] font-medium">
                    Available Dates
                  </span>
                </section>
                <section className="flex items-center gap-2">
                  <Checkbox
                    checked={state?.unavailableChecked}
                    onCheckedChange={actions?.handleUnavailableToggle}
                  />

                  <span className="text-xs text-[#606569] font-medium ">
                    Unavailable Dates
                  </span>
                </section>
              </section>
            </section>
          )}
        </section>
      </Modal>
    </div>
  );
};

export default ListSpace;
