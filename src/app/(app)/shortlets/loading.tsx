/** @format */

import ThunderLoader from "@/components/loader/thunder-loader";
import React from "react";

const loading = () => {
  return (
    <div className="flex  justify-center items-center h-screen">
      <ThunderLoader />
    </div>
  );
};

export default loading;
