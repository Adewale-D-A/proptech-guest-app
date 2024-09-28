/** @format */

import { formatCurrency } from "@/_shared";
import React from "react";

const ListCard = ({
  amt,
  costName,
  currency,
}: {
  costName: string;
  amt: number | null;
  currency?: string;
}) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-[#545454] text-xs font-light">{costName}</p>
      {amt !== null && (
        <p className="text-sm">
          {currency ? formatCurrency(amt, currency) : amt.toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default ListCard;
