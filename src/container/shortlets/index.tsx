/** @format */
"use client";
import ShortletComponent from "@/components/ui/shortlets";
import { useGetGuestShortletMutation } from "@/redux/services/shortlet";

import React, { useEffect, useState } from "react";

const ShortletsPageContainer = () => {
  const [getGuestShortlet, { data, error, isLoading }] =
    useGetGuestShortletMutation();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    getGuestShortlet({}).unwrap();
  }, [getGuestShortlet]);

  return (
    <ShortletComponent
      showModal={showModal}
      setShowModal={setShowModal}
      shortletData={data?.data?.shortlet?.data ?? []}
      isLoading={isLoading}
    />
  );
};

export default ShortletsPageContainer;
