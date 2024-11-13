/** @format */

import { Button } from "@/components/_shared/button";
import { Card } from "@/components/_shared/card";
import Image from "next/image";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/_shared/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";
import { DatePicker } from "@/components/date-picker";
import SearchInput from "@/components/search-input";
import ActionsDropdown from "./actions";
import { useGetPromoQuery } from "@/redux/services/referral";
import { format } from "date-fns";

const PromoSection = () => {
  const { data } = useGetPromoQuery({});
  const offerData = data?.data && data?.data?.offer && data?.data?.offer?.data;

  const headers = [
    "S/N",
    "Discount Name ",
    "Discount ID",
    "Valid Until",
    "Discount Status",
    "Action",
  ];
  return (
    <div>
      <Card className="w-full h-[414px] shadow-sm cursor-pointer flex items-center ">
        <section className="flex gap-4 items-center justify-between px-10">
          <div className="w-1/2  flex flex-col gap-3">
            <h1 className="text-3xl font-medium leading-[44px]">
              Exclusive Offers on Short-term Rentals
            </h1>
            <p className="text-sm font-light">
              Find your perfect place without breaking the bank. Sign up for our
              Promo and Discount Card today and start saving on your next home
            </p>
          </div>
          <div className="w-1/2 flex justify-end ">
            <Image
              className="rounded-md"
              src={"/images/apartment-1.jpg"}
              width={508}
              height={374}
              alt=""
            />
          </div>
        </section>
      </Card>
      <Card className="shadow-sm  mt-10  p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium">Promo History</h1>
          <SearchInput
            className="w-[28rem]"
            placeholder="Search apartment by  name, apartment type, No of Nights"
          />
          <section className="flex  items-center gap-3">
            <div className="flex items-center gap-1">
              <p className="text-xs">Filter:</p>
              <DatePicker
                className="w-60 mt-0 h-9"
                date={undefined}
                setDate={() => {}}
              />
            </div>
            <div className="flex items-center  gap-1">
              <p className="text-xs">Sort by:</p>
              <Select>
                <SelectTrigger className="h-9 w-20 border-black/10 shadow-none text-gray-100 ">
                  <SelectValue placeholder="" className="text-xs " />
                </SelectTrigger>

                <SelectContent className="border-none">
                  {[
                    { id: "all", name: "All" },
                    { id: "newest-oldest", name: "Newest - Oldest" },
                    { id: "oldest", name: "Oldest - Newest" },
                  ].map((tag) => (
                    <SelectItem
                      key={tag.id}
                      value={tag.id}
                      className="border-none"
                    >
                      {tag.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </section>
        </div>
        <Table className="mt-4 rounded-md">
          <TableHeader className="rounded-md">
            <TableRow className="bg-[#EAEAEA] rounded-md ">
              {headers.map((h) => (
                <TableHead key={h} className="text-xs text-gray-100 ">
                  {" "}
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {offerData &&
              offerData?.map((offer, index) => (
                <TableRow key={offer?.id}>
                  <TableCell className="font-medium text-xs">
                    {index + 1}
                  </TableCell>
                  <TableCell>{offer?.name}</TableCell>
                  <TableCell className="font-medium text-xs">
                    {offer?.offer_id}
                  </TableCell>
                  <TableCell className="flex items-center gap-5">
                    {format(offer?.created_at, "yyyy/MM/dd")}{" "}
                  </TableCell>

                  <TableCell className="font-medium text-xs">
                    <div
                      className={`w-16 py-2 rounded-xl ${
                        offer?.is_active ? "bg-[#E1FFEB]" : "bg-gray-50"
                      }  flex justify-center items-center`}
                    >
                      <p
                        className={`text-xs  font-light  ${
                          offer?.is_active ? "text-[#08AD40]" : "text-gray-500"
                        } `}
                      >
                        {offer?.is_active ? "Active" : "Pending"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-xs">
                    <ActionsDropdown onActionSelect={() => {}} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default PromoSection;
