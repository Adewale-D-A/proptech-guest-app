/** @format */
"use client";
import PendingRequestComponent from "@/components/ui/pending-request";
import { useGetRequestQuery } from "@/redux/services/request";
import React from "react";

const PendingRequestContainer = () => {
  const { data: requestData, refetch: refetchRequests } = useGetRequestQuery();

  console.log("requestData", requestData);


  return (
    <PendingRequestComponent
      pendingRequest={requestData?.data?.user_requests}
    />
  );
};

export default PendingRequestContainer;
