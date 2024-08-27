/** @format */

import { Button } from "@/components/_shared/button";
import React from "react";
import { SlLockOpen } from "react-icons/sl";

const SuccessfulModal = ({ onClickLogin }: { onClickLogin: () => void }) => {
  return (
    <div className="flex py-10 justify-center items-center flex-col h-full">
      <div className="w-24 h-24 flex justify-center items-center rounded-full bg-[#17C682]">
        <SlLockOpen color="white" size={40} />
      </div>
      <h1 className="text-lg mt-6 text-center font-medium ">
        Password Changed
      </h1>
      <p className="text-xs font-light mt-1 w-72 mx-auto text-center">
        Your password has been changed successfully.
      </p>
      <Button className="w-full mt-10" onClick={onClickLogin}>
        Back to Log in
      </Button>
    </div>
  );
};

export default SuccessfulModal;
