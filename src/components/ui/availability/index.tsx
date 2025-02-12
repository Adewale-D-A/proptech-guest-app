/** @format */
"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "./hero-section";
import { ListSpace } from "../shortlets/component";
import { useGetGuestListQuery } from "@/redux/services/shortlet";

const AvailabilityPageComponent = () => {
  const [filters, setFilters] = useState({
    location: "",
    room_option_id: "",
  });
  const { data, isLoading } = useGetGuestListQuery({});

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
