/** @format */

import Logo from "@/components/ui/logo";
import { Copy, X } from "lucide-react";
import React from "react";

const VisitorsCode = ({ onClose }: { onClose: () => void }) => {
  return (
    <div>
      <section className="flex justify-end p-3">
        <X
          className="text-gray-100 cursor-pointer"
          size={18}
          onClick={onClose}
        />
      </section>
      <section className="flex px-6 justify-center items-center flex-col">
        <Logo default width={177} height={36} />
        <h1 className="text-xl mt-5">Visitors Code</h1>
        <p className="text-xs w-5/6 mx-auto mt-2 font-light text-center">
          Your visitors passcode is important for entry into the apartment
          building. Please keep it safe and show it when needed for verification
        </p>
        <section className="bg-[#F4F6FF] py-4 my-6 rounded w-full p-4">
          <p className="text-sm text-center pb-2">VALID TILL 11:59PM</p>
          <div className="relative rounded-md  bg-white py-3">
            <div className="flex-1 w-full text-center font-medium">
              ABCD1234
            </div>
            <div className="absolute top-4 cursor-pointer right-3">
              <Copy color="#9D9D9D" size={18} />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default VisitorsCode;
