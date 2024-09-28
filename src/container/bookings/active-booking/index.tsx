/** @format */
"use client";
import ActiveBookingComponent from "@/components/ui/bookings/active-booking";
import { useGetBookingsQuery } from "@/redux/services/booking";
import React from "react";

const ActiveBookingContainer = () => {
  const { data, isLoading, error } = useGetBookingsQuery();

  return (
    <ActiveBookingComponent
      bookingData={data?.data ?? null}
      isLoading={isLoading}
    />
  );
};

export default ActiveBookingContainer;
