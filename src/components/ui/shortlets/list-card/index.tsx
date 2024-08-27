/** @format */

import React from "react";

const ListCard = ({ amt, costName }: { costName: string; amt: string }) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-[#545454] text-xs font-light">{costName}</p>
      <p className="text-sm">{amt}</p>
    </div>
  );
};

export default ListCard;
