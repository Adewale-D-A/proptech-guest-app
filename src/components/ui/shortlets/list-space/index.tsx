/** @format */
"use client";
import { Button } from "@/components/_shared/button";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Label } from "@/components/_shared/label";
import { Modal } from "@/components/_shared/modal";
import { Shortlet, ShortletType } from "@/types/type";
import { allAmenities, howLong, shortletAmount } from "@/_shared/data";
import AnimatedContainer from "@/components/_shared/framer/animate-div";
import { usePathname, useRouter } from "next/navigation";
import { Checkbox } from "@/components/_shared/check-box";
import CardSkeleton from "@/components/card-skeleton";
import { useVerifyPayment } from "@/redux/hooks/useVerifyPayment";
import { useGetAvailableDateMutation } from "@/redux/services/shortlet";
import { Calendar } from "@/components/_shared/calander";
import ThunderLoader from "@/components/loader/thunder-loader";
import useCheckAvaliability from "@/redux/hooks/check-avaliable-date";
import { parseISO } from "date-fns";
import SearchDash from "@/components/search-dash";
import CardItem from "@/components/apt-items-card";
import Image from "next/image";

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
  const [from, setFrom] = useState<Date | undefined>();
  const [to, setTo] = useState<Date | undefined>();
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
  const disabledDates = availableDates?.data?.blocked_dates.concat(
    availableDates?.data?.booked_dates
  );
  const disabledDatesArray = disabledDates
    ? disabledDates.map((date: any) => parseISO(date))
    : [];
  const yesterday = new Date();
  useVerifyPayment();

  return (
    <div className=" relative bottom-10 z-40">
      <div className="max-w-screen-custom mx-auto px-4">
        <SearchDash
          location={location}
          setLocation={setLocation}
          setNumOfRooms={setNumOfRooms}
          from={from}
          to={to}
          setDate={setDate}
          handleSearch={handleSearch}
          setFrom={setFrom}
          setTo={setTo}
        />
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
                        <CardItem
                          apartment={apartment}
                          onCheckAvailability={handleClickSingleApt}
                          handleRoute={handleRoute}
                          disabledDate={[
                            ...disabledDatesArray,
                            { before: yesterday },
                          ]}
                        />
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
                className=" "
                mode="single"
                disabled={[...disabledDatesArray, { before: yesterday }]}
              />
              <section className="flex justify-between items-center mt-6 px-5">
                <section className="flex items-center gap-2">
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
                <section className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-[#E9E9E9] rounded-[2px]" />

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
