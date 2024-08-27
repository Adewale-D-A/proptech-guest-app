/** @format */
"use client";
import React from "react";
import { HeroSection, ListSpace } from "./component";
import { ShortletType } from "@/types/type";

const ShortletComponent = ({ setShowModal, showModal }: ShortletType) => {
  return (
    <>
      <HeroSection />
      <ListSpace setShowModal={setShowModal} showModal={showModal} />
    </>
  );
};

export default ShortletComponent;
