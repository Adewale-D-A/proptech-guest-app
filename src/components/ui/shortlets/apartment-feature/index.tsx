/** @format */

import { TbPool, TbAirConditioning } from "react-icons/tb";
import { Car, Heater } from "lucide-react";
import { Dumbbell } from "lucide-react";

import { LuMonitor } from "react-icons/lu";
import { FaUtensils } from "react-icons/fa";
import { GiWashingMachine } from "react-icons/gi";
import { Wifi } from "lucide-react";
import AnimatedContainer from "@/components/_shared/framer/animate-div";
import { Shortlet } from "@/types/type";

const features = [
  { icon: <TbPool size={16} />, label: "Pool" },
  { icon: <TbAirConditioning size={16} />, label: "Air-Conditioner" },
  { icon: <LuMonitor size={16} />, label: "Television" },
  { icon: <Wifi size={16} />, label: "Internet" },
  { icon: <FaUtensils size={16} />, label: "Kitchen" },
  { icon: <Dumbbell size={16} />, label: "Gym" },
  { icon: <Car size={16} />, label: "Parking" },
  { icon: <GiWashingMachine size={16} />, label: "Washing Machine" },
  { icon: <TbAirConditioning size={16} />, label: "Heater" },
];

const ApartmentFeature = ({
  apartmentDetails,
}: {
  apartmentDetails: Shortlet;
}) => {
  return (
    <AnimatedContainer className="w-full pb-4">
      <div className="p-4 border-b">
        <h1 className="font-medium">Apartment Features</h1>
      </div>
      <div className="grid grid-cols-4 w-full gap-y-4  mt-4">
        {apartmentDetails.amenities[0]?.id === 4 && (
          <div className="flex flex-col items-center gap-y-1">
            <TbPool size={16} />
            <p className="text-xs font-light">
              {apartmentDetails.amenities[0]?.name}
            </p>
          </div>
        )}
        {apartmentDetails.amenities[2]?.id === 3 && (
          <div className="flex flex-col items-center gap-y-1">
            <Heater size={16} />
            <p className="text-xs font-light">
              {apartmentDetails.amenities[2].name}
            </p>
          </div>
        )}
        {apartmentDetails.amenities[1].id === 2 && (
          <div className="flex flex-col items-center gap-y-1">
            <TbAirConditioning size={16} />
            <p className="text-xs font-light">
              {apartmentDetails.amenities[1]?.name}
            </p>
          </div>
        )}
        {apartmentDetails.amenities[0].id === 1 && (
          <div className="flex flex-col items-center gap-y-1">
            <Wifi size={16} />
            <p className="text-xs font-light">
              {apartmentDetails.amenities[0].name}
            </p>
          </div>
        )}
      </div>
    </AnimatedContainer>
  );
};

export default ApartmentFeature;
