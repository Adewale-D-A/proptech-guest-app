/** @format */
"use client";
import BookingsComponent from "@/components/ui/bookings";
import {
  useGetBookingsQuery,
  useGetBookingStatsQuery,
} from "@/redux/services/booking";
import React from "react";

const BookingsContainer = () => {
  const { data, isLoading, error } = useGetBookingsQuery();
  const { data: statsData, isLoading: statsLoading } =
    useGetBookingStatsQuery();
  console.log("statsData", statsData);
  return (
    <BookingsComponent
      isLoading={isLoading}
      bookingData={data?.data ?? null}
      statsData={statsData?.data ?? null}
      statsLoading={statsLoading}
    />
  );
};

export default BookingsContainer;
