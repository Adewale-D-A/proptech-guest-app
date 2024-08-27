/** @format */
"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/_shared/tabs";
import React from "react";
import { BadgePercent } from "lucide-react";
import { TbPointerShare } from "react-icons/tb";
import ReferralsSection from "./referrals-section";
import PromoSection from "./promo";

const ReferralsComponent = () => {
  return (
    <div>
      <div className="w-full mt-6">
        <Tabs defaultValue="referral" className="">
          <TabsList className="shadow-none border-none ">
            <TabsTrigger
              value="referral"
              className="data-[state=active]:shadow-none data-[state=active]:text-primary-1 data-[state=active]:border-b pb-2 data-[state=active]:border-b-primary-1 rounded-none data-[state=active]:rounded-none flex items-center gap-2"
            >
              <TbPointerShare size={18} /> Referrals
            </TabsTrigger>
            <TabsTrigger
              value="promo"
              className="data-[state=active]:shadow-none data-[state=active]:text-primary-1 pb-2 data-[state=active]:border-b data-[state=active]:border-b-primary-1 rounded-none data-[state=active]:rounded-none flex items-center gap-2"
            >
              <BadgePercent size={18} /> Promo & Disconut
            </TabsTrigger>
          </TabsList>
          <TabsContent value="referral" className="w-full mt-10">
            <ReferralsSection />
          </TabsContent>
          <TabsContent value="promo" className="w-full mt-10">
            <PromoSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReferralsComponent;
