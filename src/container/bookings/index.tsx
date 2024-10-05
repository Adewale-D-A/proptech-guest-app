/** @format */
"use client";
import BookingsComponent from "@/components/ui/bookings";
import {
  useGetBookingsQuery,
  useGetBookingStatsQuery,
} from "@/redux/services/booking";
import React, { useState } from "react";

const BookingsContainer = () => {
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState<string | undefined>(undefined);
    const [endDate, setEndDate] = useState<string | undefined>(undefined);

  const { data, isLoading, error } = useGetBookingsQuery({
    search,
    start_date: startDate,
    end_date: endDate,
  });
  const { data: statsData, isLoading: statsLoading } =
    useGetBookingStatsQuery();

  return (
    <BookingsComponent
      isLoading={isLoading}
      bookingData={data?.data ?? null}
      statsData={statsData?.data ?? null}
      statsLoading={statsLoading}
      setSearch={setSearch}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
};

export default BookingsContainer;
