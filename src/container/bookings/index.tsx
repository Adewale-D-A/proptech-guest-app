/** @format */
"use client";
import BookingsComponent from "@/components/ui/bookings";
import { useGetBanksQuery } from "@/redux/services/banks";
import {
  useGetBookingsQuery,
  useGetBookingStatsQuery,
} from "@/redux/services/booking";
import React, { useState } from "react";

const BookingsContainer = () => {
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
  const { data: statsData, isLoading: statsLoading } =
    useGetBookingStatsQuery();
  const { data: banksData, isLoading: banksLoading } = useGetBanksQuery({});

  console.log("banks::", banksData);

  return (
    <BookingsComponent
      isLoading={isLoading}
      bookingData={data?.data ?? null}
      statsData={statsData?.data ?? null}
      statsLoading={statsLoading}
      setSearch={setSearch}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      banksData={banksData?.data?.banks ?? []}
      endDate={endDate}
      startDate={startDate}
      setPageIndex={setPageIndex}
      setPageSize={setPageSize}
      pageIndex={pageIndex}
      pageSize={pageSize}
    />
  );
};

export default BookingsContainer;
