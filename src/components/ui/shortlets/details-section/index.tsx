/** @format */

import { Card } from "@/components/_shared/card";
import React from "react";
import ApartmentDetails from "../apartment-details";
import ApartmentFeature from "../apartment-feature";
import CancelPolicies from "../cancel-policies";
import HouseRules from "../house-rules";
import PointInterest from "../points-interest";
import SafetyProperties from "../safety-property";
import { Shortlet } from "@/types/type";

const DetailsSection = ({
  apartmentDetails,
}: {
  apartmentDetails: Shortlet;
}) => {
  return (
    <div className="flex flex-col pb-10  gap-6 w-full md:w-1/2 ">
      <Card className=" h-fit shadow-sm border border-black/5">
        <ApartmentDetails apartmentDetails={apartmentDetails} />
      </Card>
      <Card className="h-fit shadow-sm border border-black/5">
        <ApartmentFeature apartmentDetails={apartmentDetails} />
      </Card>
      <Card className="h-fit shadow-sm border border-black/5">
        <HouseRules apartmentDetails={apartmentDetails} />
      </Card>
      <Card className="h-fit shadow-sm border border-black/5">
        <SafetyProperties apartmentDetails={apartmentDetails} />
      </Card>
      <Card className="h-fit shadow-sm border border-black/5">
        <CancelPolicies apartmentDetails={apartmentDetails} />
      </Card>
      <Card className="h-fit shadow-sm border border-black/5">
        <PointInterest apartmentDetails={apartmentDetails} />
      </Card>
    </div>
  );
};

export default DetailsSection;
