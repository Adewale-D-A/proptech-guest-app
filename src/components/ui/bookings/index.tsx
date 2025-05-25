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
import BookingTable from "./successfulBooking-table";
import { Booking, BookingData } from "@/types/type";
import { BookingsInterface, BookingsResponse } from "@/types/book";
import { addDays, format, isBefore } from "date-fns";
import { Button } from "@/components/_shared/button";
import FilterDateComponent from "../make-request/filter-component";
import {
  useCautionFeeBookingMutation,
  useCreateBookingMutation,
} from "@/redux/services/booking";
import { useToast } from "@/components/_shared/toast/use-toast";
import RebookApartment from "./rebook-apartment";
import { useGetAvailableDateMutation } from "@/redux/services/shortlet";
import { useVerifyPayment } from "@/redux/hooks/useVerifyPayment";
import { errorHandler, payment_method, urlRoute } from "@/_shared/constants";
import { Form } from "@/components/_shared/form";
import { useForm } from "react-hook-form";
import { useVerifyBankMutation } from "@/redux/services/banks";

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
  banksData,
}: BookingsInterface) => {
  const router = useRouter();
  const { toast } = useToast();
  const [booking, { isLoading: reBookingLoading }] = useCreateBookingMutation();
  const [showDate, setShowDate] = useState(false);
  const pathName = usePathname();
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("");
  const [tableSearchTerm, setTableSearchTerm] = useState(""); // Add new state for table filtering
  const [reBookStartDate, setReBookStartDate] = useState<string | undefined>();
  const [reBookEndDate, setReBookEndDate] = useState<string | undefined>();
  const [selectedBank, setSelectedBank] = useState({ code: "", name: "" });
  const [bookingInfo, setBookingInfo] = useState<any>(null);
  const [getAvailableDate, { data: availableDates }] =
    useGetAvailableDateMutation();
  const [
    verifyBank,
    { data: bankDetails, isLoading: verifyBankLoading, error: verifyError },
  ] = useVerifyBankMutation();
  const [cautionFeeBooking, { isLoading: isCautionLoading }] =
    useCautionFeeBookingMutation();
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
    setter: (date: string | undefined) => void,
    minDate?: Date
  ) => {
    if (date) {
      if (minDate && isBefore(date, minDate)) {
        setter(undefined);
      } else {
        setter(format(date, "yyyy-MM-dd"));
      }
    } else {
      setter(undefined);
    }
  };
  const [minCheckoutDate, setMinCheckoutDate] = useState<Date | undefined>(
    undefined
  );

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      setReBookStartDate(formattedDate);
      setMinCheckoutDate(addDays(date, 1));
      setReBookEndDate(undefined);
    } else {
      setReBookStartDate(undefined);
      setMinCheckoutDate(undefined);
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date && minCheckoutDate && isBefore(date, minCheckoutDate)) {
      return;
    }
    setReBookEndDate(date ? format(date, "yyyy-MM-dd") : undefined);
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

  const form = useForm({
    defaultValues: {
      booking_id: 0,
      account_name: "",
      account_number: "",
      bank_name: "",
    },
  });

  const onSubmit = async (values: any) => {
    const payload = {
      ...values,
      booking_id: bookingInfo?.id,
      bank_name: selectedBank?.name,
    };
    try {
      await cautionFeeBooking(payload).unwrap();
      handleClickModal("success");
      form.reset();
    } catch (err) {
      errorHandler(err as any);
    }
  };

  const accountNumber = form.watch("account_number");

  useEffect(() => {
    if (selectedBank && accountNumber.length === 10) {
      verifyBank({
        bank_code: selectedBank?.code,
        account_number: accountNumber,
      });
    }
  }, [selectedBank, accountNumber, verifyBank]);

  useEffect(() => {
    if (bankDetails?.data?.account_name) {
      form.setValue("account_name", bankDetails.data.account_name);
    }
  }, [bankDetails, form]);
  useEffect(() => {
    if (accountNumber.length !== 10) {
      form.setValue("account_name", "");
    }
  }, [accountNumber, form]);
  useEffect(() => {
    if (selectedBank) {
      form.setValue("account_number", "");
      form.setValue("account_name", "");
    }
  }, [selectedBank]);

  // Filter bookings based on search term
  const filteredBookingData = bookingData
    ? {
        ...bookingData,
        bookings: {
          ...bookingData.bookings,
          data: bookingData.bookings?.data?.filter((booking) => {
            console.log("Filtering booking:", booking);
            console.log("Current search term:", tableSearchTerm);

            if (!tableSearchTerm) return true;

            const searchLower = tableSearchTerm.toLowerCase();

            // Fix the typeMatch to be a boolean comparison
            const nameMatch = booking.shortlet?.name
              ?.toLowerCase()
              .includes(searchLower);
            const typeMatch = booking.shortlet?.no_of_bedrooms
              ?.toString()
              .includes(searchLower); // Fixed to be a boolean comparison
            const nightsMatch = booking.number_of_days
              ?.toString()
              .includes(searchLower);

            const isMatch = nameMatch || typeMatch || nightsMatch;
            console.log("Keep this booking?", isMatch);

            return isMatch;
          }),
        },
      }
    : null;

  // Fix the path to access data lengths
  console.log("Original data length:", bookingData?.bookings?.data?.length);
  console.log(
    "Filtered data length:",
    filteredBookingData?.bookings?.data?.length
  );

  return (
    <div className="mt-10">
      <h1 className="font-medium text-lg">Bookings Breakdown</h1>
      <section className="lg:flex grid xs:grid-cols-1  grid-cols-2 mt-6 items-center gap-4 w-full">
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
          {/* <SearchInput
            className="w-[28rem]"
            placeholder="Search apartment by  name, apartment type, No of Nights"
            onChange={(e) => setSearch(e.target.value)}
          /> */}
          <div className="mt-4 mb-4">
            <SearchInput
              className="w-[28rem]"
              placeholder="Search apartment by  name, apartment type, No of Nights"
              value={tableSearchTerm}
              onChange={(e) => setTableSearchTerm(e.target.value)}
            />
          </div>
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

        {/* Add new search input specifically for table filtering */}

        <BookingTable
          headers={headers}
          handleClickModal={handleClickModal}
          bookingData={filteredBookingData} // Use filtered data instead of original data
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
          modalType === "rebook" ? "max-w-2xl" : "max-w-md"
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
            <section>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CautionForm
                    banksData={banksData}
                    form={form}
                    setSelectedBank={setSelectedBank}
                    verifyBankLoading={verifyBankLoading}
                    verifyError={verifyError}
                    isCautionLoading={isCautionLoading}
                  />
                </form>
              </Form>
            </section>
          )}
          {modalType === "success" && (
            <SuccessfulMessage
              heading="  Thank You for Reaching Out"
              text="   Your message has been received, and your request will be addressed shortly, Kindly check your notifications for update on your request."
              onClose={() => setShow(false)}
            />
          )}
          {modalType === "rate-success" && (
            <SuccessfulMessage
              heading=" Thanks for the Review"
              text="  Thank you for your valuable feedback! Your review means a lot to us and helps us improve to better serve you."
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
              handleEndDateSelect={handleEndDateSelect}
              handleStartDateSelect={handleStartDateSelect}
              minCheckoutDate={minCheckoutDate}
            />
          )}
        </section>
      </Modal>
      <Modal
        showModal={showDate}
        setShowModal={setShowDate}
        onClose={() => setShowDate(false)}
        className="max-w-2xl py-10"
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
