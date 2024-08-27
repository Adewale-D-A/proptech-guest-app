/** @format */
"use client";
import { Card } from "@/components/_shared/card";
import { X } from "lucide-react";
import React, { useState } from "react";
import { FiUserCheck } from "react-icons/fi";

const VerifyAccount = () => {
  const [close, setClose] = useState(true);
  return (
    <div>
      {close && (
        <section className="relative">
          <Card className="mt-10 shadow-sm">
            <div className="flex h-[80px] items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <FiUserCheck className="text-primary-1" size={30} />
                <div>
                  <h2 className="text-sm font-medium">Verify your Account</h2>
                  <p className="text-xs text-[#6D6D6D]">
                    Complete your account set-up to enjoy the full 99Apartment
                    experience.
                  </p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border-2">
                <div />
              </div>
            </div>
          </Card>
          <div
            className="absolute top-[-10px] right-[-6px] bg-primary-1 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setClose(false)}
          >
            <X className="text-white" size={16} />
          </div>
        </section>
      )}
    </div>
  );
};

export default VerifyAccount;
