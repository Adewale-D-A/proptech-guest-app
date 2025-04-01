/** @format */
"use client";
import AdditionalServicesComponent from "@/components/ui/additional-service";
import { use99Selector } from "@/redux/hooks/hooks";
import { useGetUserActiveBookingsQuery } from "@/redux/services/booking";
import {
  useGetAdditionalRequestQuery,
  useGetAdditionalRequestStatsQuery,
} from "@/redux/services/request";
import { selectCurrentUser } from "@/redux/slices/authSlice";
import React, { useState } from "react";

const AdditionalServicesContainer = () => {
  const currentUser = use99Selector(selectCurrentUser);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data: shortlet, refetch: refetchBookings } =
    useGetUserActiveBookingsQuery(currentUser?.id as number);
  const { data, isLoading } = useGetAdditionalRequestStatsQuery();
  const { data: requestData } = useGetAdditionalRequestQuery({
    start_date: startDate,
    end_date: endDate,
    search: searchTerm,
    page: pageIndex + 1,
    limit: pageSize,
  });

  return (
    <AdditionalServicesComponent
      requestDataStats={data}
      requestData={requestData?.data?.additional_service}
      isLoading={isLoading}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      endDate={endDate}
      startDate={startDate}
      setPageIndex={setPageIndex}
      shortlet={shortlet?.data?.bookings ?? []}
      setPageSize={setPageSize}
      pageIndex={pageIndex}
      pageSize={pageSize}
    />
  );
};

export default AdditionalServicesContainer;
