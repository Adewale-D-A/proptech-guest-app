/** @format */

import AnimatedContainer from "@/components/_shared/framer/animate-div";
import { Shortlet } from "@/types/type";
import RenderIcon from "../../render-icon";

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
      <div className="grid grid-cols-4 w-full gap-y-4 mt-4 px-4">
        {apartmentDetails.amenities.slice(0, 10).map((amenity) => (
          <div key={amenity.id} className="flex flex-col items-center gap-y-1">
            <RenderIcon value={amenity.image || ""} className="h-4 w-4" />
            <p className="text-xs font-light">{amenity.name}</p>
          </div>
        ))}
      </div>
    </AnimatedContainer>
  );
};

export default ApartmentFeature;
