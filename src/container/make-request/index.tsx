/** @format */
"use client";
import MakeRequestComponent from "@/components/ui/make-request";
import { useGetBookingsQuery } from "@/redux/services/booking";
import {
  useGetRequestQuery,
  useGetRequestStatsQuery,
} from "@/redux/services/request";
import React, { useEffect, useState } from "react";

const MakeRequestContainer = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { data, isLoading, refetch: refetchStats } = useGetRequestStatsQuery();
  const { data: requestData, refetch: refetchRequests } = useGetRequestQuery({
    start_date: startDate,
    end_date: endDate,
    search: searchTerm,
  });
  const {
    data: shortlet,
    error,
    refetch: refetchBookings,
  } = useGetBookingsQuery({});

  useEffect(() => {
    if (shouldRefetch) {
      refetchRequests();
      refetchStats();
      refetchBookings();
      setShouldRefetch(false);
    }
  }, [shouldRefetch, refetchRequests, refetchStats, refetchBookings]);

  const handleNewRequest = () => {
    setShouldRefetch(true);
  };

  return (
    <MakeRequestComponent
      requestDataStats={data}
      requestData={requestData?.data?.user_requests}
      isLoading={isLoading}
      shortlet={shortlet?.data?.bookings?.data ?? []}
      onNewRequest={handleNewRequest}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      endDate={endDate}
      startDate={startDate}
    />
  );
};

export default MakeRequestContainer;
