/** @format */

import { Button } from "@/components/_shared/button";
import { Input } from "@/components/_shared/input";
import { Label } from "@/components/_shared/label";
import { X } from "lucide-react";
import React from "react";

const GenerateVisitor = ({
  onClick,
  onClose,
}: {
  onClose: () => void;
  onClick: () => void;
}) => {
  return (
    <div>
      <div className="flex items-center border-b p-4 justify-between">
        <h1>Generate Visitors code</h1>
        <X
          className="text-gray-100 cursor-pointer"
          size={18}
          onClick={onClose}
        />
      </div>
      <section className="p-4">
        <Label className="text-xs font-light">Visitors Name</Label>
        <Input className="mt-2 h-10" />
        <Button className="w-full mt-6" onClick={onClick}>
          Generate Code
        </Button>
      </section>
    </div>
  );
};

export default GenerateVisitor;
