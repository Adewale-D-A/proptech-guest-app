/** @format */
"use client";
import ShortletComponent from "@/components/ui/shortlets";
import React, { useState } from "react";

const ShortletsPageContainer = () => {
  const [showModal, setShowModal] = useState(false);
  return <ShortletComponent showModal={showModal} setShowModal ={setShowModal}/>;
};

export default ShortletsPageContainer;
