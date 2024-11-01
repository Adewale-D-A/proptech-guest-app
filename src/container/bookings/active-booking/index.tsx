/** @format */
"use client";
import ActiveBookingComponent from "@/components/ui/bookings/active-booking";
import { useGetBookingsQuery } from "@/redux/services/booking";
import React, { useState } from "react";

const ActiveBookingContainer = () => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, error } = useGetBookingsQuery({
    search,
    start_date: startDate,
    end_date: endDate,
    page: pageIndex + 1,
    limit: pageSize,
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
      setPageIndex={setPageIndex}
      setPageSize={setPageSize}
      pageIndex={pageIndex}
      pageSize={pageSize}
    />
  );
};

export default ActiveBookingContainer;
