/** @format */
"use client";
import React, { useEffect, useState } from "react";
import ReusableCard from "../reusable-card";

import { Calendar as CalendarIcon, House, X } from "lucide-react";
import { Card } from "@/components/_shared/card";
import SearchInput from "@/components/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";
import { CalendarCheck2 } from "lucide-react";
import { Database } from "lucide-react";
import { CalendarClock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Modal } from "@/components/_shared/modal";
import CautionForm from "./caution-form";
import SuccessfulMessage from "./success-message";
import Rating from "./rate";
import BookingTable from "./booking-table";
import { Booking, BookingData } from "@/types/type";
import { BookingsResponse } from "@/types/book";
import { format } from "date-fns";
import { Button } from "@/components/_shared/button";
import FilterDateComponent from "../make-request/filter-component";
import { useCreateBookingMutation } from "@/redux/services/booking";
import { useToast } from "@/components/_shared/toast/use-toast";
import RebookApartment from "./rebook-apartment";
import { useGetAvailableDateMutation } from "@/redux/services/shortlet";
import { useVerifyPayment } from "@/redux/hooks/useVerifyPayment";
import { payment_method, urlRoute } from "@/_shared/constants";

const headers = [
  "S/N",
  "Apartment Info",
  "Booking cost",
  "Date of Booking",
  "No of Nights",
  "Action",
];

const BookingsComponent = ({
  bookingData,
  isLoading,
  statsLoading,
  statsData,
  setSearch,
  setStartDate,
  setEndDate,
  endDate,
  startDate,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
}: {
  bookingData: BookingsResponse | null;
  isLoading: boolean;
  statsLoading: boolean;
  statsData: BookingData | null;
  setSearch: (value: string) => void;
  setStartDate: (date: string | undefined) => void;
  setEndDate: (date: string | undefined) => void;
  endDate: string | undefined;
  startDate: string | undefined;
  pageIndex: number;
  pageSize: number;
  setPageIndex: (index: number) => void;
  totalPages?: number;
  setPageSize?: (index: number) => void;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [booking, { isLoading: reBookingLoading }] = useCreateBookingMutation();
  const [showDate, setShowDate] = useState(false);
  const pathName = usePathname();
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("");
  const [reBookStartDate, setReBookStartDate] = useState<string | undefined>();
  const [reBookEndDate, setReBookEndDate] = useState<string | undefined>();
  const [bookingInfo, setBookingInfo] = useState<any>(null);
  const [
    getAvailableDate,
    { data: availableDates, isLoading: loadingAvailableDates },
  ] = useGetAvailableDateMutation();
  const bookingId = bookingInfo && bookingInfo?.shortlet?.id;
  const handleClickModal = (type: string, booking?: Booking) => {
    setShow(true);
    setModalType(type);
    setBookingInfo(booking);
  };

  const handleNavigate = () => {
    router.push(`${pathName}/active-bookings`);
  };
  const handleDateSelect = (
    date: Date | undefined,
    setter: (date: string | undefined) => void
  ) => {
    if (date) {
      setter(format(date, "yyyy-MM-dd"));
    } else {
      setter(undefined);
    }
  };

  const handleApply = () => {
    setStartDate(startDate);
    setEndDate(endDate);
    setShowDate(false);
  };

  const handleCancel = () => {
    setStartDate("");
    setEndDate("");
    setShowDate(false);
  };

  const handleRebook = async () => {
    const payload = {
      shortlet_id: bookingInfo?.shortlet?.id,
      check_in_day: reBookStartDate,
      check_out_day: reBookEndDate,
      check_in_time: bookingInfo?.check_in_time,
      check_out_time: bookingInfo?.check_out_time,
      number_of_guests: Number(bookingInfo?.number_of_guests),
      payment_method: payment_method.pay_stack,
      callback_url: urlRoute.reBookUrl,
    };
    try {
      const res = await booking(payload).unwrap();
      const paymentUrl = res.data.payment || "";
      if (paymentUrl) {
        window.location.href = paymentUrl;
      }
      toast({
        variant: "default",
        title: res?.message,
        description: "Apartment rebooked",
      });
      setShow(false);
    } catch (err) {
      const errorMessage =
        (err as any)?.data?.message || "Submission failed. Please try again.";
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    }
  };

  useEffect(() => {
    if (bookingId) {
      getAvailableDate(bookingId);
    }
  }, [bookingId, getAvailableDate]);
  useVerifyPayment();
  return (
    <div className="mt-10">
      <h1 className="font-medium text-lg">Bookings Breakdown</h1>
      <section className="flex mt-6 items-center gap-4 w-full">
        <ReusableCard
          icon={<CalendarIcon size={16} />}
          text="Active Bookings"
          bookingAmt={`${statsData?.active_bookings} Bookings`}
          color="#E6F2FF"
          onClick={handleNavigate}
          showBtn={true}
          btnText="  View Bookings"
          isLoading={statsLoading}
        />
        <ReusableCard
          icon={<CalendarCheck2 size={16} />}
          text="Total Bookings"
          bookingAmt={`${statsData?.total_bookings} Bookings`}
          color="#E9E9E9"
          isLoading={statsLoading}
        />
        <ReusableCard
          icon={<Database size={16} />}
          text="Total Booking Cost"
          bookingAmt={statsData?.total_booking_cost ?? 0}
          color="#E9E9E9"
          isLoading={statsLoading}
        />
        <ReusableCard
          icon={<CalendarClock size={16} />}
          text="Total Booking Duration"
          bookingAmt={`${statsData?.total_duration} Hours`}
          color="#E9E9E9"
          isLoading={statsLoading}
        />
      </section>
      <Card className="shadow-sm mt-6  p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium">Booking History</h1>
          <SearchInput
            className="w-[28rem]"
            placeholder="Search apartment by  name, apartment type, No of Nights"
            onChange={(e) => setSearch(e.target.value)}
          />
          <section className="flex  items-center gap-3">
            <Button
              variant={"text"}
              className="flex  items-center cursor-pointer gap-3"
              onClick={() => setShowDate(true)}
            >
              <p className="text-xs">Filter:</p>
              <div className="flex items-center gap-1 border w-60 h-9 text-xs px-2 rounded">
                {startDate && endDate && (
                  <>
                    {" "}
                    {startDate} - {endDate}
                  </>
                )}
              </div>
            </Button>
            <div className="flex items-center  gap-1">
              <p className="text-xs">Sort by:</p>
              <Select>
                <SelectTrigger className="h-9 w-20 border-black/10 shadow-none text-gray-100 ">
                  <SelectValue placeholder="" className="text-xs " />
                </SelectTrigger>

                <SelectContent className="border-none">
                  {[
                    { id: "all", name: "All" },
                    { id: "newest-oldest", name: "Newest - Oldest" },
                    { id: "oldest", name: "Oldest - Newest" },
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
              </Select>
            </div>
          </section>
        </div>
        <BookingTable
          headers={headers}
          handleClickModal={handleClickModal}
          bookingData={bookingData}
          isLoading={isLoading}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
          pageIndex={pageIndex}
          pageSize={pageSize}
        />
      </Card>
      <Modal
        showModal={show}
        setShowModal={setShow}
        onClose={() => setShow(false)}
        className={`relative   rounded-none  ${
          modalType === "rebook" ? "max-w-xl" : "max-w-md"
        } `}
      >
        <section>
          {modalType === "rate" ? (
            <div>
              <div className="border-b flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="bg-[#E7EAEC] border-gray-100 w-10 h-10 rounded-sm flex items-center justify-center">
                    <House size={24} />
                  </div>
                  <p>Rate your Stay with 99Apartment</p>
                </div>
                <X
                  className="text-gray-100 cursor-pointer"
                  size={18}
                  onClick={() => setShow(false)}
                />
              </div>{" "}
            </div>
          ) : modalType === "caution" ? (
            <div className="flex items-center justify-between border-b p-4">
              <h1 className="text-lg ">Caution Fee refund</h1>
              <X
                className="cursor-pointer "
                size={18}
                onClick={() => setShow(false)}
              />
            </div>
          ) : modalType === "rebook" ? (
            <div>
              <div className="flex items-center justify-between border-b p-4">
                <h1 className="text-lg ">
                  Rebook {bookingInfo?.shortlet?.name} Apartment
                </h1>
                <X
                  className="cursor-pointer "
                  size={18}
                  onClick={() => setShow(false)}
                />
              </div>
            </div>
          ) : null}

          {modalType === "caution" && (
            <CautionForm onSuccess={() => handleClickModal("success")} />
          )}
          {modalType === "success" && (
            <SuccessfulMessage
              heading="  Thank You for Reaching Out"
              text="   Your message has been received, and your request will be addressed
          shortly, Kindly check your notifications for update on your request."
              onClose={() => setShow(false)}
            />
          )}
          {modalType === "rate-success" && (
            <SuccessfulMessage
              heading=" Thanks for the Review"
              text="  Thank you for your valuable feedback! Your review means a lot to us and helps us improve to better 
serve you."
              onClose={() => setShow(false)}
              src="/images/success.png"
            />
          )}
          {modalType === "rate" && (
            <Rating
              bookingId={bookingInfo?.id}
              onClose={() => setShow(false)}
              handleClickModalSuccessRate={() =>
                handleClickModal("rate-success")
              }
            />
          )}

          {modalType === "rebook" && (
            <RebookApartment
              handleRebook={handleRebook}
              reBookingLoading={reBookingLoading}
              handleDateSelect={handleDateSelect}
              reBookEndDate={reBookEndDate}
              reBookStartDate={reBookStartDate}
              setReBookEndDate={setReBookEndDate}
              setReBookStartDate={setReBookStartDate}
              onClose={() => setShow(false)}
              availableDates={availableDates?.data}
            />
          )}
        </section>
      </Modal>
      <Modal
        showModal={showDate}
        setShowModal={setShowDate}
        onClose={() => setShowDate(false)}
        className="max-w-xl py-10"
      >
        <FilterDateComponent
          endDate={endDate}
          handleApply={handleApply}
          handleCancel={handleCancel}
          handleDateSelect={handleDateSelect}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          startDate={startDate}
        />
      </Modal>
    </div>
  );
};

export default BookingsComponent;
