/** @format */

import React from "react";
import {
  CustomerSection,
  HeroSection,
  NightFree,
  OurPartner,
  OurProduct,
  PropertyNeeds,
  Subscribe,
} from "./component";

const HomePageComponent = () => {
  return (
    <>
      <HeroSection />
      <OurProduct />
      <PropertyNeeds />
      <NightFree />
      <CustomerSection />
      <OurPartner />
      <Subscribe />
    </>
  );
};

export default HomePageComponent;
