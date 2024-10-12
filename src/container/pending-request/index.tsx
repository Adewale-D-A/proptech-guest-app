/** @format */
"use client";
import PendingRequestComponent from "@/components/ui/pending-request";
import { useGetRequestQuery } from "@/redux/services/request";
import React, { useState } from "react";

const PendingRequestContainer = () => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const { data: requestData, refetch: refetchRequests } = useGetRequestQuery({
    search,
    start_date: startDate,
    end_date: endDate,
  });

  return (
    <PendingRequestComponent
      pendingRequest={requestData?.data?.user_requests}
      setSearch={setSearch}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      endDate={endDate}
      startDate={startDate}
    />
  );
};

export default PendingRequestContainer;
