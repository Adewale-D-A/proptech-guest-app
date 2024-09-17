/** @format */
"use client";
import ShortletComponent from "@/components/ui/shortlets";
import { useGetGuestShortletMutation } from "@/redux/services/shortlet";
import React, { useEffect, useState } from "react";

const ShortletsPageContainer = () => {
  const [filters, setFilters] = useState({
    location: "",
    room_option_id: "",
  });
  const [getGuestShortlet, { data, isLoading }] = useGetGuestShortletMutation();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getGuestShortlet(filters).unwrap();
      } catch (error) {
        console.error("Error fetching guest shortlets:", error);
      }
    };

    fetchData();
  }, [getGuestShortlet, filters]);

  return (
    <ShortletComponent
      showModal={showModal}
      setShowModal={setShowModal}
      shortletData={data?.data?.shortlet?.data ?? []}
      isLoading={isLoading}
      setFilters={setFilters}
    />
  );
};

export default ShortletsPageContainer;
