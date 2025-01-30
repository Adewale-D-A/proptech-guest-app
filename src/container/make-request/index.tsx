/** @format */
"use client";
import MakeRequestComponent from "@/components/ui/make-request";
import { use99Selector } from "@/redux/hooks/hooks";
import { useGetUserActiveBookingsQuery } from "@/redux/services/booking";
import {
  useGetRequestQuery,
  useGetRequestStatsQuery,
} from "@/redux/services/request";
import { selectCurrentUser } from "@/redux/slices/authSlice";
import React, { useEffect, useState } from "react";

const MakeRequestContainer = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const currentUser = use99Selector(selectCurrentUser);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const { data, isLoading, refetch: refetchStats } = useGetRequestStatsQuery();
  const { data: requestData, refetch: refetchRequests } = useGetRequestQuery({
    start_date: startDate,
    end_date: endDate,
    search: searchTerm,
    page: pageIndex + 1,
    limit: pageSize,
  });
  const { data: shortlet, refetch: refetchBookings } =
    useGetUserActiveBookingsQuery(currentUser?.id as number);
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
      shortlet={shortlet?.data?.bookings ?? []}
      onNewRequest={handleNewRequest}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
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

export default MakeRequestContainer;
