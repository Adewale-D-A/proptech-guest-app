/** @format */
"use client";
import PendingRequestComponent from "@/components/ui/pending-request";
import {
  useGetAdditionalRequestQuery,
  useGetRequestQuery,
} from "@/redux/services/request";
import React, { useState } from "react";

const PendingRequestContainer = () => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const { data: requestData, refetch: refetchRequests } =
    useGetAdditionalRequestQuery({
      search,
      start_date: startDate,
      end_date: endDate,
      page: pageIndex + 1,
      limit: pageSize,
    });

  return (
    <PendingRequestComponent
      pendingRequest={requestData?.data?.additional_service}
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

export default PendingRequestContainer;
