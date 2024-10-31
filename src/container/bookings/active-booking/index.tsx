/** @format */
"use client";
import ActiveBookingComponent from "@/components/ui/bookings/active-booking";
import { useGetBookingsQuery } from "@/redux/services/booking";
import React, { useState } from "react";

const ActiveBookingContainer = () => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const { data, isLoading, error } = useGetBookingsQuery({
    search,
    start_date: startDate,
    end_date: endDate,
  });

  return (
    <ActiveBookingComponent
      bookingData={data?.data ?? null}
      isLoading={isLoading}
      setSearch={setSearch}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      endDate={endDate}
      startDate={startDate}
    />
  );
};

export default ActiveBookingContainer;
