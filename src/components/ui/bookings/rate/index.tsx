/** @format */

import { Button } from "@/components/_shared/button";
import { Label } from "@/components/_shared/label";
import { Textarea } from "@/components/_shared/textarea";
import { Star } from "lucide-react";
import React from "react";

const Rating = ({
  onClose,
  handleClickModalSuccessRate,
}: {
  onClose: () => void;
  handleClickModalSuccessRate: () => void;
}) => {
  return (
    <div className="p-4">
      <p className="text-sm">Rate your Stay</p>
      <section className="flex gap-3 items-center mt-4">
        {[1, 2, 3, 4, 5].map((data) => (
          <div>
            <Star />
          </div>
        ))}
      </section>
      <section className="mt-6">
        <Label className="text-xs font-normal">
          Describe your experience (optional)
        </Label>
        <Textarea className="mt-2 resize-none h-40 " />
      </section>
      <Button
        className="w-full
       mt-16"
        onClick={handleClickModalSuccessRate}
      >
        Submit
      </Button>
    </div>
  );
};

export default Rating;
