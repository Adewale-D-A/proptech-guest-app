/** @format */

import React from "react";
import { Bath, Bed, House, MapPin, X } from "lucide-react";
import { faker } from "@faker-js/faker";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/_shared/button";

const ExtendModal = ({
  onClose,
  onClickExtend,
}: {
  onClose: () => void;
  onClickExtend: () => void;
}) => {
  const ReusableCard = ({ text, amt }: { text: string; amt: string }) => {
    return (
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-100">{text}</p>
        <p className="text-xs">{amt}</p>
      </div>
    );
  };
  return (
    <div>
      <div className=" ">
        <div className="border-b flex items-center justify-between px-4 py-3">
          <div className="bg-[#E7EAEC] border-gray-100 w-10 h-10 rounded-sm flex items-center justify-center">
            <House size={24} />
          </div>
          <X
            className="text-gray-100 cursor-pointer"
            size={18}
            onClick={onClose}
          />
        </div>
        <section className="p-4">
          <div className="flex gap-4 items-center">
            <img
              src={faker.image.avatar()}
              alt=""
              className="w-[60px] h-[60px] rounded"
            />
            <div className="flex flex-col gap-1">
              <p className="font-medium">Victoria 99 3 Bedroom</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <MapPin color="#6d6d6d" size={12} />
                  <p className="text-xs font-light text-gray-100">
                    Lekki Phase II
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Bed color="#6d6d6d" size={12} />
                  <p className="text-xs font-light text-gray-100">2 bed(s)</p>
                </div>
                <div className="flex items-center gap-1">
                  <Bath color="#6d6d6d" size={12} />
                  <p className="text-xs font-light text-gray-100">2 bathroom</p>
                </div>
              </div>
            </div>
          </div>
          <section className="flex flex-col gap-2  mt-4">
            <div>
              <DatePicker
                date={undefined}
                setDate={() => {}}
                label="Due date"
              />
            </div>
            <div>
              <DatePicker
                date={undefined}
                setDate={() => {}}
                label="Extended date"
              />
            </div>
            <Button
              className="text-primary-1 cursor-pointer underline text-xs font-normal p-0 justify-start items-start"
              variant={"text"}
            >
              View similar apartments Available
            </Button>
            <section className="bg-black/5 rounded mt-4">
              <h1 className="border-b px-4 py-3 text-sm">Booking Summary</h1>
              <section className="p-4 flex flex-col gap-3">
                <ReusableCard text="Initial Booking balance" amt="#0.00" />
                <ReusableCard
                  text="Extended Booking per Night"
                  amt="#108,000.00"
                />
                <ReusableCard text="7.5% Tax" amt="#8,100.00" />
                <ReusableCard text="No of Extended Nights " amt="0" />
              </section>
            </section>
            <Button onClick={onClickExtend} className="w-full h-9 text-xs mt-4">
              Extend Booking
            </Button>
          </section>
        </section>
      </div>
    </div>
  );
};

export default ExtendModal;
