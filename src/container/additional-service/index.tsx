/** @format */
"use client";
import AdditionalServicesComponent from "@/components/ui/additional-service";
import {
  useGetRequestQuery,
  useGetRequestStatsQuery,
} from "@/redux/services/request";
import React from "react";

const AdditionalServicesContainer = () => {
  const { data, isLoading } = useGetRequestStatsQuery();
  const { data: requestData } = useGetRequestQuery();
  return (
    <AdditionalServicesComponent
      requestDataStats={data}
      requestData={requestData?.data?.user_requests}
      isLoading={isLoading}
    />
  );
};

export default AdditionalServicesContainer;
