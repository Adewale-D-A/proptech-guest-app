/** @format */

import { formatCurrency } from "@/_shared";
import React from "react";

const ListCard = ({
  amt,
  costName,
}: {
  costName: string;
  amt: number | null;
}) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-[#545454] text-xs font-light">{costName}</p>
      {amt && <p className="text-sm">{formatCurrency(amt)}</p>}
    </div>
  );
};

export default ListCard;
