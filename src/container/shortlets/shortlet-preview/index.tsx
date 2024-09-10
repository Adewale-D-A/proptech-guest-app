/** @format */
"use client";
import ShortLetPreviewComponent from "@/components/ui/shortlets/shortlet-preview";
import { useGetSingleGuestShortletMutation } from "@/redux/services/shortlet";
import { Shortlet } from "@/types/type";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const ShortLetPreviewContainer = () => {
  const { id } = useParams();
  const [getSingleGuestShortlet, { data: shortletData, isLoading, error }] =
    useGetSingleGuestShortletMutation();

  const numericId = typeof id === "string" ? parseInt(id, 10) : null;

  useEffect(() => {
    if (numericId) {
      getSingleGuestShortlet(numericId);
    }
  }, [numericId, getSingleGuestShortlet]);

  if (isLoading) return <p>Loading...</p>;
  console.log("shortletData?.data?.shortlet", shortletData);
  return (
    <div>
      {shortletData ? (
        <ShortLetPreviewComponent
          apartmentDetails={shortletData.data.shortlet}
        />
      ) : (
        <p>No shortlet data available</p>
      )}
    </div>
  );
};

export default ShortLetPreviewContainer;
