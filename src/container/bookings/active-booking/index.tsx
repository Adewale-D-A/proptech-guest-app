/** @format */
"use client";
import ActiveBookingComponent from "@/components/ui/bookings/active-booking";
import { use99Selector } from "@/redux/hooks/hooks";
import { useGetUserActiveBookingsQuery } from "@/redux/services/booking";
import { selectCurrentUser } from "@/redux/slices/authSlice";
import React, { useState } from "react";

const ActiveBookingContainer = () => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const currentUser = use99Selector(selectCurrentUser);
  const { data, isLoading } = useGetUserActiveBookingsQuery(
    currentUser?.id as number
  );

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
