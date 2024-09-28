/** @format */
"use client";
import MakeRequestComponent from "@/components/ui/make-request";
import { useGetBookingsQuery } from "@/redux/services/booking";
import {
  useGetRequestQuery,
  useGetRequestStatsQuery,
} from "@/redux/services/request";
import { useGetGuestShortletMutation } from "@/redux/services/shortlet";
import React, { useEffect, useState } from "react";

const MakeRequestContainer = () => {
  const { data, isLoading } = useGetRequestStatsQuery();
  const { data: requestData } = useGetRequestQuery();
  const { data: shortlet, error } = useGetBookingsQuery();

  console.log("shortlet", shortlet?.data?.bookings?.data);

  return (
    <MakeRequestComponent
      requestDataStats={data}
      requestData={requestData?.data?.user_requests}
      isLoading={isLoading}
      shortlet={shortlet?.data?.bookings?.data ?? []}
    />
  );
};

export default MakeRequestContainer;
