import { Card } from '@/components/_shared/card';
import React from 'react'
import ApartmentDetails from '../apartment-details';
import ApartmentFeature from '../apartment-feature';
import CancelPolicies from '../cancel-policies';
import HouseRules from '../house-rules';
import PointInterest from '../points-interest';
import SafetyProperties from '../safety-property';

const DetailsSection = () => {
  return (
    <div className="flex flex-col pb-10 h-[600px] overflow-y-auto  gap-6 w-1/2 ">
      <Card className=" h-fit shadow-sm border border-black/5">
        <ApartmentDetails />
      </Card>
      <Card className="h-fit shadow-sm border border-black/5">
        <ApartmentFeature />
      </Card>
      <Card className="h-fit shadow-sm border border-black/5">
        <HouseRules />
      </Card>
      <Card className="h-fit shadow-sm border border-black/5">
        <SafetyProperties />
      </Card>
      <Card className="h-fit shadow-sm border border-black/5">
        <CancelPolicies />
      </Card>
      <Card className="h-fit shadow-sm border border-black/5">
        <PointInterest />
      </Card>
    </div>
  );
}

export default DetailsSection
