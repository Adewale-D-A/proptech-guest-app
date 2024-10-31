/** @format */
"use client";
import ShortLetPreviewComponent from "@/components/ui/shortlets/shortlet-preview";
import {
  useGetAvailableDateMutation,
  useGetSingleGuestShortletMutation,
} from "@/redux/services/shortlet";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const ShortLetPreviewContainer = () => {
  const { id } = useParams();
  const [
    getSingleGuestShortlet,
    { data: shortletData, isLoading: loadingShortlet },
  ] = useGetSingleGuestShortletMutation();
  const [
    getAvailableDate,
    { data: availableDates, isLoading: loadingAvailableDates },
  ] = useGetAvailableDateMutation();
  const numericId = typeof id === "string" ? parseInt(id, 10) : null;

  useEffect(() => {
    if (numericId) {
      getSingleGuestShortlet(numericId);
      getAvailableDate(numericId);
    }
  }, [numericId, getSingleGuestShortlet, getAvailableDate]);

  if (loadingShortlet || loadingAvailableDates) return <p>Loading...</p>;

  return (
    <div>
      {shortletData ? (
        <ShortLetPreviewComponent
          apartmentDetails={shortletData.data.shortlet}
          availableDates={availableDates?.data}
        />
      ) : (
        <p>No shortlet data available</p>
      )}
    </div>
  );
};

export default ShortLetPreviewContainer;
