/** @format */

import { Button } from "@/components/_shared/button";
import { Card } from "@/components/_shared/card";
import React from "react";
import { MoveRight } from "lucide-react";

const ReusableCard = ({
  text,
  bookingAmt,
  icon,
  color,
  onClick,
  showBtn = false,
  btnText,
}: {
  text: string;
  bookingAmt: string;
  icon: any;
  color: string;
  onClick?: () => void;
  showBtn?: boolean;
  btnText?: string;
}) => {
  return (
    <Card className="p-4 h-48 w-full shadow-sm cursor-pointer">
      <div className="flex flex-col gap-2">
        <div
          className="w-8 h-8 rounded-full flex justify-center  items-center"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
        <p className="text-sm text-[#515151] font-light mt-3">{text}</p>
        <h1 className="text-2xl font-medium">{bookingAmt}</h1>
        {showBtn && (
          <Button
            variant={"text"}
            className="shadow-none p-0 text-primary justify-start text-xs gap-2 font-normal"
            onClick={onClick}
          >
            {btnText}
            <MoveRight size={16} />{" "}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ReusableCard;
