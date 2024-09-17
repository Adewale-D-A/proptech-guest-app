/** @format */
"use client";
import React from "react";
import { HeroSection, ListSpace } from "./component";
import { ShortletType } from "@/types/type";

const ShortletComponent = ({
  setShowModal,
  showModal,
  shortletData,
  isLoading,
  setFilters,
}: ShortletType) => {
  return (
    <>
      <HeroSection />
      <ListSpace
        shortletData={shortletData}
        setShowModal={setShowModal}
        showModal={showModal}
        isLoading={isLoading}
        setFilters={setFilters}
      />
    </>
  );
};

export default ShortletComponent;
