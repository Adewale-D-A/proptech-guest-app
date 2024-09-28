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
import { DatePicker } from "@/components/date-picker";
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
const ActiveBookingComponent = ({
  bookingData,
  isLoading,
}: {
  bookingData: BookingsResponse | null;
  isLoading: boolean;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("");
  const [extendConfirm, setExtendConfirm] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null
  );
  const [visitorCode, setVisitorCode] = useState("");

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
  return (
    <div>
      <BackButton className="mt-6 " />
      <Card className="shadow-sm mt-6  p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium">Booking List</h1>
          <SearchInput
            className="w-[28rem]"
            placeholder="Search apartment by  name, apartment type, No of Nights"
          />
          <section className="flex  items-center gap-3">
            <div className="flex items-center gap-1">
              <p className="text-xs">Filter:</p>
              <DatePicker
                className="w-60 mt-0 h-9"
                date={undefined}
                setDate={() => {}}
              />
            </div>
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
            <div className="bg-[#E7EAEC] border-gray-100 w-10 h-10 rounded-sm flex items-center justify-center">
              <House size={24} />
            </div>
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
            <div className="w-full gap-3 flex items-center mt-6">
              <Button className="w-full">Yes, I want to</Button>
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
    </div>
  );
};

export default ActiveBookingComponent;
