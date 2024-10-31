/** @format */
"use client";
import React, { useState } from "react";

import SearchInput from "@/components/search-input";
import { Card } from "@/components/_shared/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";
import { House, X } from "lucide-react";
import BackButton from "@/components/back-btn";
import { Modal } from "@/components/_shared/modal";
import ExtendModal from "../extend-modal";
import TransferModal from "../transfer-modal";
import Image from "next/image";
import { Button } from "@/components/_shared/button";
import RescheduleModal from "../reshedule-modal";
import GenerateVisitor from "../generate-visitor";
import VisitorsCode from "../generate-visitor/copy-code";
import BookingTable from "../booking-table";
import { Booking, BookingsResponse } from "@/types/book";
import { format } from "date-fns";
import FilterDateComponent from "../../make-request/filter-component";
import { use99Selector } from "@/redux/hooks/hooks";
import { RootState } from "@/redux/store";
import { useCreateBookingMutation } from "@/redux/services/booking";
import { LoadingButton } from "@/components/_shared/loading-button";
import { useToast } from "@/components/_shared/toast/use-toast";
const ActiveBookingComponent = ({
  bookingData,
  isLoading,
  setSearch,
  setStartDate,
  setEndDate,
  endDate,
  startDate,
}: {
  bookingData: BookingsResponse | null;
  isLoading: boolean;
  setSearch: (value: string) => void;
  setStartDate: (date: string | undefined) => void;
  setEndDate: (date: string | undefined) => void;
  endDate: string | undefined;
  startDate: string | undefined;
}) => {
  const { toast } = useToast();
  const [showDate, setShowDate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("");
  const [extendConfirm, setExtendConfirm] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null
  );
  const [due, setDue] = useState<Date | undefined>();
  const [extendDate, setExtendDate] = useState<Date | undefined>();
  const [visitorCode, setVisitorCode] = useState("");
  const [booking, { isLoading: bookingLoading }] = useCreateBookingMutation();
  const selectedApt = use99Selector(
    (state: RootState) => state.apt.selectedApt
  );
  const handleShowModal = (
    open: boolean,
    types: string,
    bookingId?: number
  ) => {
    setShowModal(open);
    setType(types);
    if (bookingId) setSelectedBookingId(bookingId);
  };

  const handleActionSelect = (selectedType: string, bookingId?: number) => {
    handleShowModal(true, selectedType, bookingId);
  };
  const handleExtend = () => {
    setExtendConfirm(true);
    handleShowModal(false, "");
  };
  const headers = [
    "S/N",
    "Apartment Info",
    "Booking cost",
    "Date of Booking",
    "No of Nights",
    "Action",
  ];
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

  const handleSubmit = async () => {
    if (!due && !extendDate) {
      return;
    }
    const formattedDueDate = due ? format(due, "yyyy-MM-dd") : "";
    const formattedExtendDate = extendDate
      ? format(extendDate, "yyyy-MM-dd")
      : "";
    const payload = {
      check_in_day: formattedDueDate,
      check_in_time: selectedApt?.check_in_time ?? "",
      check_out_day: formattedExtendDate,
      check_out_time: selectedApt?.check_out_time ?? "",
      number_of_guests: selectedApt?.number_of_guests ?? "",
      shortlet_id: selectedApt?.shortlet?.id,
      payment_method: "paystack",
      callback_url: "/bookings",
    };
    try {
      await booking(payload).unwrap();
      setExtendConfirm(false);
    } catch (err) {
      const errorMessage =
        (err as any)?.data?.message ||
        "Failed to extend booking. Please try again.";
      toast({
        variant: "destructive",
        title: "Error!",
        description: errorMessage,
      });
    }
  };

  return (
    <div>
      <BackButton className="mt-6 " />
      <Card className="shadow-sm mt-6  p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium">Booking List</h1>
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
          bookingData={bookingData}
          isLoading={isLoading}
          handleActionSelect={handleActionSelect}
        />
      </Card>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onClose={() => setShowModal(false)}
        className="relative"
      >
        {type === "extend" ? (
          <ExtendModal
            onClickExtend={handleExtend}
            onClose={() => setShowModal(false)}
            due={due}
            setDue={setDue}
            setExtendDate={setExtendDate}
            extend={extendDate}
          />
        ) : type === "transfer" ? (
          <TransferModal onClose={() => setShowModal(false)} />
        ) : type === "reschedule" ? (
          <RescheduleModal onClose={() => setShowModal(false)} />
        ) : type === "generate" ? (
          <GenerateVisitor
            onClose={() => setShowModal(false)}
            onClick={() => handleActionSelect("generate-true")}
            bookingId={selectedBookingId}
            setVisitorCode={setVisitorCode}
          />
        ) : type === "generate-true" ? (
          <VisitorsCode
            visitorCode={visitorCode}
            onClose={() => setShowModal(false)}
          />
        ) : null}
      </Modal>
      <Modal
        showModal={extendConfirm}
        setShowModal={setExtendConfirm}
        onClose={() => setExtendConfirm(false)}
        className="relative h-80 "
      >
        <section>
          <div className="border-b flex items-center justify-between px-4 py-3">
            <section className="flex items-center gap-2">
              <div className="bg-[#E7EAEC] border-gray-100 w-10 h-10 rounded-sm flex items-center justify-center">
                <House size={24} />
              </div>
              <p className="font-medium">{selectedApt?.shortlet.name} </p>
            </section>
            <X
              className="text-gray-100 cursor-pointer"
              size={18}
              onClick={() => setExtendConfirm(false)}
            />
          </div>
          <div className="w-full px-8 pt-4 flex-col flex justify-center items-center h-full">
            <Image
              src={"/images/box.png"}
              width={80}
              height={80}
              alt="success"
            />
            <h1 className="mt-6 font-medium">Confirm Extension</h1>
            <p className="text-gray-100 font-light text-xs mt-1">
              Are you sure you want to proceed with extending your stay?
            </p>
            <div className="w-full gap-3 flex items-center my-6">
              <LoadingButton
                loading={bookingLoading}
                onClick={handleSubmit}
                className="w-full mt-0"
              >
                Yes, I want to
              </LoadingButton>
              <Button
                onClick={() => setExtendConfirm(false)}
                className="w-full"
                variant={"text"}
              >
                No, Cancel
              </Button>
            </div>
          </div>
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

export default ActiveBookingComponent;
