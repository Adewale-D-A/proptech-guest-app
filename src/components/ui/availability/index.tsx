/** @format */
"use client";
import React, { useState } from "react";
import HeroSection from "./hero-section";
import { ListSpace } from "../shortlets/component";
import { useGetGuestListMutation } from "@/redux/services/shortlet";

const AvailabilityPageComponent = () => {
  const [filters, setFilters] = useState({
    shortlet_name: "",
    room_option_id: "",
    start_date: "",
    end_date: "",
  });
  const [getGuestList, { data, isLoading }] = useGetGuestListMutation();

  React.useEffect(() => {
    getGuestList(filters);
  }, [filters, getGuestList]);

  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <section className="">
        <HeroSection />
        <ListSpace
          shortletData={data?.data?.data ?? []}
          setShowModal={setShowModal}
          showModal={showModal}
          isLoading={isLoading}
          setFilters={setFilters}
        />
      </section>
    </div>
  );
};

export default AvailabilityPageComponent;
