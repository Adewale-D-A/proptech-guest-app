/** @format */
import { Button } from "@/components/_shared/button";
import { Calendar } from "@/components/_shared/calander";
import { FilterDateComponentProps } from "@/types/type";
import React from "react";

const FilterDateComponent = ({
  startDate,
  endDate,
  handleDateSelect,
  handleCancel,
  handleApply,
  setEndDate,
  setStartDate,
}: FilterDateComponentProps) => {
  return (
    <div>
      <section className="px-10">
        <h1>Select a time period</h1>
      </section>
      <div className="flex mt-3 justify-center">
        <div className="border rounded-bl-md rounded-tl-md">
          <section className="flex items-center justify-between p-4 border-b">
            <p className="text-xs text-[#6D6D6D]">From</p>
            <p className="text-xs">{startDate}</p>
          </section>
          <Calendar
            className=" "
            mode="single"
            selected={startDate ? new Date(startDate) : undefined}
            onSelect={(date) =>
              handleDateSelect(date, (date) => setStartDate(date))
            }
            removeBg={true}
          />
        </div>
        <div className="border rounded-br-md rounded-tr-md">
          <section className="flex items-center justify-between p-4 border-b">
            <p className="text-xs text-[#6D6D6D]">To</p>
            <p className="text-xs">{endDate}</p>
          </section>
          <Calendar
            className=" "
            mode="single"
            selected={endDate ? new Date(endDate) : undefined}
            onSelect={(date) =>
              handleDateSelect(date, (date) => setEndDate(date))
            }
            removeBg={true}
          />
        </div>
      </div>
      <section className="flex px-10 mt-4 justify-end items-center gap-3">
        <Button
          className="text-xs h-9 w-24 bg-[#E9E9E9]"
          variant={"secondary"}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button className="text-xs h-9 w-24" onClick={handleApply}>
          Apply
        </Button>
      </section>
    </div>
  );
};

export default FilterDateComponent;
