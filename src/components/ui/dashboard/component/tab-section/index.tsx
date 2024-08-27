/** @format */

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/_shared/tabs";
import React from "react";
import { TbUserEdit } from "react-icons/tb";
import { TbUserScan } from "react-icons/tb";
import PersonaInfo from "./personal";
import VerifyIdentity from "./verify-identity";

const TabSections = () => {
  return (
    <div className="mt-10">
      <Tabs defaultValue="account" className="flex gap-4">
        <TabsList className="w-56 p-2 bg-white shadow-sm h-fit  flex flex-col  border-black/5  items-start justify-start gap-3">
          <TabsTrigger
            value="account"
            className="justify-start data-[state=active]:text-primary-1 data-[state=active]:shadow-none data-[state=active]:bg-[#E9EBF2] font-medium py-2 w-52 items-center gap-3 flex text-xs"
          >
            <div>
              {" "}
              <TbUserEdit size={20} />
            </div>{" "}
            Personal Information
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="justify-start text-xs data-[state=active]:text-primary-1 data-[state=active]:shadow-none data-[state=active]:bg-[#E9EBF2] font-medium py-2 w-52 items-center gap-3 flex "
          >
            <div>
              <TbUserScan size={20} />
            </div>{" "}
            Verify Identity
          </TabsTrigger>
        </TabsList>

        <section className=" w-full shadow-sm border border-black/5  rounded-md">
          <TabsContent
            value="account"
            className="bg-white pb-10 pt-4 px-4 h-[650px]"
          >
            <PersonaInfo />
          </TabsContent>
          <TabsContent
            value="password"
            className="bg-white pb-10 pt-4 px-4 h-[350px]"
          >
            <VerifyIdentity />
          </TabsContent>
        </section>
      </Tabs>
    </div>
  );
};

export default TabSections;
