/** @format */

import { Button } from "@/components/_shared/button";
import { Input } from "@/components/_shared/input";
import { Label } from "@/components/_shared/label";
import React from "react";

const CautionForm = ({ onSuccess }: { onSuccess: () => void }) => {
  return (
    <section className="p-4">
      <div className="flex flex-col gap-4">
        <section>
          <Label className="font-normal">Account Name</Label>
          <Input className="mt-2" />
        </section>
        <section>
          <Label className="font-normal">Bank Name</Label>
          <Input className="mt-2" />
        </section>
        <section>
          <Label className="font-normal">Account Number</Label>
          <Input className="mt-2" />
        </section>
        <section>
          <Label className="font-normal">Amount</Label>
          <Input className="mt-2" type="number" />
        </section>
      </div>
      <Button className="w-full mt-16" onClick={onSuccess}>
        Initiate Refund
      </Button>
    </section>
  );
};

export default CautionForm;
