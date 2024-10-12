/** @format */
"use client";
import AdditionalServicesComponent from "@/components/ui/additional-service";
import {
  useGetAdditionalRequestQuery,
  useGetAdditionalRequestStatsQuery,
} from "@/redux/services/request";
import React, { useState } from "react";

const AdditionalServicesContainer = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, isLoading } = useGetAdditionalRequestStatsQuery();
  const { data: requestData } = useGetAdditionalRequestQuery({
    start_date: startDate,
    end_date: endDate,
    search: searchTerm,
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
    />
  );
};

export default AdditionalServicesContainer;
