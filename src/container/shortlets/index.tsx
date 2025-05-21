/** @format */
"use client";
import ShortletComponent from "@/components/ui/shortlets";
import { useGetGuestShortletMutation } from "@/redux/services/shortlet";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ShortletsPageContainer = () => {
  const searchParams = useSearchParams();
  const roomOptionId = searchParams.get("room_option_id");
  const location = searchParams.get("location") || "";

  const [filters, setFilters] = useState({
    location: location,
    room_option_id: roomOptionId || "",
  });
  const [getGuestShortlet, { data, isLoading }] = useGetGuestShortletMutation();

  const [showModal, setShowModal] = useState(false);

  // Update filters when URL params change
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      location: location || prev.location,
      room_option_id: roomOptionId || prev.room_option_id,
    }));
  }, [roomOptionId, location]);

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
