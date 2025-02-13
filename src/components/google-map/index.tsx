/** @format */

// components/Map.js
import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { NEXT_PUBLIC_GOOGLE_MAP_APT_KEY } from "@/_shared/constants";

const Map = ({
  lat,
  lng,
  width,
  height,
}: {
  lat: number;
  lng: number;
  height?: string;
  width?: string;
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: NEXT_PUBLIC_GOOGLE_MAP_APT_KEY,
  });

  const center = {
    lat: lat, // Latitude for San Francisco
    lng: lng, // Longitude for San Francisco
  };

  const mapContainerStyle = {
    width: width ? width : "100%",
    height: height ? height : "400px",
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
      <Marker position={center} />
    </GoogleMap>
  );
};

export default Map;
