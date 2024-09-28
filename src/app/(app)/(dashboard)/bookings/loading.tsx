/** @format */

import Loader from "@/components/loader";
import React from "react";

const loading = () => {
  return (
    <div className="flex  justify-center items-center h-screen">
      <Loader />
    </div>
  );
};

export default loading;
