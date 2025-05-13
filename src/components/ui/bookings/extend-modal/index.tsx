/** @format */

import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Bath, Bed, House, MapPin, X } from "lucide-react";
import { faker } from "@faker-js/faker";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/_shared/button";
import { use99Selector } from "@/redux/hooks/hooks";
import { RootState } from "@/redux/store";
import { useGetAvailableDateMutation } from "@/redux/services/shortlet";
import { parseISO } from "date-fns";
import { LoadingButton } from "@/components/_shared/loading-button";
import ListCard from "../../shortlets/list-card";

const ExtendModal = ({
  onClose,
  onClickExtend,
  setExtendDate,
  extend,
}: {
  onClose: () => void;
  onClickExtend: () => void;
  setExtendDate: Dispatch<SetStateAction<Date | undefined>>;
  extend: Date | undefined;
}) => {
  const selectedApt = use99Selector(
    (state: RootState) => state.apt.selectedApt
  );
  const [getAvailableDate, { data: availableDates }] =
    useGetAvailableDateMutation();

  useEffect(() => {
    if (selectedApt?.shortlet?.id) {
      getAvailableDate(selectedApt?.shortlet?.id);
    }
  }, [selectedApt?.shortlet?.id, getAvailableDate]);

  const disabledDates = availableDates?.data?.booked_dates.concat(
    availableDates?.data?.blocked_dates
  );
  const disabledDatesArray = disabledDates
    ? disabledDates.map((date: any) => parseISO(date))
    : [];

  const yesterday = new Date();
  const originalCheckoutDate = selectedApt?.check_out_date
    ? parseISO(selectedApt.check_out_date)
    : null;
  const minExtendDate = originalCheckoutDate ? originalCheckoutDate : yesterday;

  console.log("selectedApt", selectedApt);

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
              src={selectedApt?.shortlet?.images[0]?.path}
              alt=""
              className="w-[60px] h-[60px] rounded"
            />
            <div className="flex flex-col gap-1">
              <p className="font-medium">{selectedApt?.shortlet.name} </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <MapPin color="#6d6d6d" size={12} />
                  <p className="text-xs font-light text-gray-100">
                    {selectedApt?.shortlet?.location}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Bed color="#6d6d6d" size={12} />
                  <p className="text-xs font-light text-gray-100">
                    {selectedApt?.shortlet.no_of_bedrooms} bed(s)
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Bath color="#6d6d6d" size={12} />
                  <p className="text-xs font-light text-gray-100">
                    {selectedApt?.shortlet.no_of_bathrooms} bathroom
                  </p>
                </div>
              </div>
            </div>
          </div>
          <section className="flex flex-col gap-2  mt-4">
            <div>
              <DatePicker
                date={originalCheckoutDate as any}
                setDate={() => {}}
                label="Due date"
                disabledCalendar={[
                  ...disabledDatesArray,
                  { before: yesterday },
                ]}
                disabled={true}
              />
            </div>
            <div>
              <DatePicker
                date={extend}
                setDate={setExtendDate}
                label="Extended date"
                disabledCalendar={[
                  ...disabledDatesArray,
                  { before: minExtendDate },
                ]}
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
                <ListCard
                  amt={selectedApt?.total_price ?? 0}
                  costName="Initial Booking balance"
                  currency={selectedApt?.currency}
                />
                <ListCard costName="Extended Booking per Night" amt={0} />
                <ListCard
                  amt={selectedApt?.tax_fee ?? 0}
                  costName="7.5% Tax"
                  currency={selectedApt?.currency}
                />
                <ListCard
                  amt={selectedApt?.number_of_days ?? 0}
                  costName="No of Extended Nights"
                />
              </section>
            </section>
            <LoadingButton
              onClick={onClickExtend}
              className="w-full h-9 text-xs mt-4"
              disabled={!extend}
            >
              Extend Booking
            </LoadingButton>
          </section>
        </section>
      </div>
    </div>
  );
};

export default ExtendModal;
