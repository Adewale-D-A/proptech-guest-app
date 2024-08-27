/** @format */

import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Card } from "../_shared/card";

const BackButton = ({
  navigation,
  className,
}: {
  navigation?: string;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <Card
      className={`cursor-pointer w-10 h-10 rounded-full shadow-sm border-neutral-100 ${className}`}
    >
      <div
        onClick={() => {
          if (navigation) {
            router.push(navigation);
          } else router.back();
        }}
        className="bg-white text-black shadow-sm w-full h-full rounded-full flex justify-center items-center"
      >
        <FaArrowLeft size={16} />
      </div>
    </Card>
  );
};

export default BackButton;
