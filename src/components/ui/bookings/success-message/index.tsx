/** @format */

import { Button } from "@/components/_shared/button";
import Image from "next/image";
import React from "react";

type MessageType = {
  onClose: () => void;
  heading: string;
  text: string;
  src?: string;
};

const SuccessfulMessage = ({ heading, onClose, text, src }: MessageType) => {
  return (
    <div>
      <div className="w-full px-8 pt-4 flex-col flex justify-center items-center h-full">
        <Image
          src={src ? src : "/images/box.png"}
          width={100}
          height={100}
          alt="success"
        />
        <h1 className="mt-6 text-2xl font-medium">{heading}</h1>
        <p className="text-gray-100 text-xs mt-1 text-center font-light">
          {text}
        </p>
        <div className="w-full gap-3 flex items-center my-6">
          <Button onClick={onClose} className="w-full h-9 text-xs">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulMessage;
