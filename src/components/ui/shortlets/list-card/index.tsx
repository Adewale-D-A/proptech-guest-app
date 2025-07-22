/** @format */

import { formatCurrency } from "@/_shared";
import React from "react";

const ListCard = ({
  amt,
  costName,
  currency,
  isDiscount = false,
}: {
  costName: string;
  amt: number | null;
  currency?: string;
  isDiscount?: boolean;
}) => {
  return (
    <div className="flex justify-between items-center">
      <p
        className={`text-xs font-light ${
          costName === "Total"
            ? "text-primary-1 font-semibold"
            : isDiscount
            ? "text-green-600 font-medium"
            : "text-[#545454]"
        }`}
      >
        {costName}
      </p>
      {amt !== null && (
        <p
          className={`text-sm ${
            costName === "Total"
              ? "text-primary-1 font-semibold"
              : isDiscount
              ? "text-green-600 font-medium"
              : ""
          }`}
        >
          {currency ? formatCurrency(amt, currency) : amt.toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default ListCard;
