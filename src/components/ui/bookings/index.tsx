/** @format */
"use client";
import React, { useState } from "react";
import ReusableCard from "../reusable-card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/_shared/table";
import { Calendar, House, X } from "lucide-react";
import { Card } from "@/components/_shared/card";
import SearchInput from "@/components/search-input";
import { DatePicker } from "@/components/date-picker";
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
import { faker, tr } from "@faker-js/faker";
import { MapPin } from "lucide-react";
import { Bed } from "lucide-react";
import { Bath } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import ActionsDropdown from "./actions";
import HomeActionsDropdown from "./home-actions";
import { Modal } from "@/components/_shared/modal";
import { Label } from "@/components/_shared/label";
import CautionForm from "./caution-form";
import SuccessfulMessage from "./success-message";
import Rating from "./rate";

const headers = [
  "S/N",
  "Apartment Info",
  "Booking cost",
  "Date of Booking",
  "No of Nights",
  "Action",
];

const BookingsComponent = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("");
  const handleClickModal = (type: string) => {
    setShow(true);
    setModalType(type);
  };
  const handleNavigate = () => {
    router.push(`${pathName}/active-bookings`);
  };
  return (
    <div className="mt-10">
      <h1 className="font-medium text-lg">Bookings Breakdown</h1>
      <section className="flex mt-6 items-center gap-4 w-full">
        <ReusableCard
          icon={<Calendar size={16} />}
          text="Active Bookings"
          bookingAmt="2 Bookings"
          color="#E6F2FF"
          onClick={handleNavigate}
          showBtn={true}
          btnText="  View Bookings"
        />
        <ReusableCard
          icon={<CalendarCheck2 size={16} />}
          text="Total Bookings"
          bookingAmt="50 Bookings"
          color="#E9E9E9"
        />
        <ReusableCard
          icon={<Database size={16} />}
          text="Total Booking Cost"
          bookingAmt="#1.5Million"
          color="#E9E9E9"
        />
        <ReusableCard
          icon={<CalendarClock size={16} />}
          text="Total Booking Duration"
          bookingAmt="1200 Hours"
          color="#E9E9E9"
        />
      </section>
      <Card className="shadow-sm mt-6  p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium">Booking History</h1>
          <SearchInput
            className="w-[28rem]"
            placeholder="Search apartment by  name, apartment type, No of Nights"
          />
          <section className="flex  items-center gap-3">
            <div className="flex items-center gap-1">
              <p className="text-xs">Filter:</p>
              <DatePicker className="w-60 mt-0 h-9" />
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
        <Table className="mt-4 rounded-md">
          {/* <TableCaption>A list of your recent bookings.</TableCaption> */}
          <TableHeader className="rounded-md">
            <TableRow className="bg-[#EAEAEA] rounded-md ">
              {headers.map((h) => (
                <TableHead className="text-xs text-gray-100 "> {h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5, 6].map((invoice, index) => (
              <TableRow key={invoice}>
                <TableCell className="font-medium text-xs">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <div className="flex gap-4 items-center">
                    <img
                      src={faker.image.avatar()}
                      alt=""
                      className="w-9 h-9 rounded"
                    />
                    <div>
                      <p className="text-xs">Sunshine - 2 Bedroom</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <MapPin color="#6d6d6d" size={12} />
                          <p className="text-[10px] text-gray-100">
                            Lekki Phase II
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bed color="#6d6d6d" size={12} />
                          <p className="text-[10px] text-gray-100">2 bed(s)</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath color="#6d6d6d" size={12} />
                          <p className="text-[10px] text-gray-100">
                            2 bathroom
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-xs">
                  #116,100.00
                </TableCell>
                <TableCell className="font-medium text-xs">
                  28 Mar, 2024 5:25 AM
                </TableCell>
                <TableCell className="font-medium text-xs">1 Night</TableCell>
                <TableCell className="font-medium text-xs">
                  {pathName === "/bookings" ? (
                    <HomeActionsDropdown handleClickModal={handleClickModal} />
                  ) : (
                    <ActionsDropdown onActionSelect={() => {}} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <Modal
        showModal={show}
        setShowModal={setShow}
        onClose={() => setShow(false)}
        className={`relative   rounded-none max-w-md `}
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
              onClose={() => setShow(false)}
              handleClickModalSuccessRate={() =>
                handleClickModal("rate-success")
              }
            />
          )}
        </section>
      </Modal>
    </div>
  );
};

export default BookingsComponent;
