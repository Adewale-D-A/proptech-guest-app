/** @format */
/** @format */
"use client";
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
import { DatePicker } from "@/components/date-picker";
import SearchInput from "@/components/search-input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";
import { useGetReferralsQuery } from "@/redux/services/referral";
import { SkeletonTable } from "@/components/skeleton-preview";
import { format } from "date-fns";
const ReferralsSection = () => {
  const { data, isLoading, error } = useGetReferralsQuery({});
  console.log("datsa::", data);
  const headers = [
    "S/N",
    "Date of Request ",
    "Referral ID",
    "Name of User",
    "Date Used",
    "Status of Ref link",
  ];
  const skeletonRows = Array.from({ length: 5 }, (_, index) => (
    <SkeletonTable key={index} />
  ));
  return (
    <section className="">
      <Card className="w-full h-[414px] shadow-sm cursor-pointer flex items-center ">
        <section className="flex gap-4 items-center justify-between">
          <div className="w-1/2 pl-10 flex flex-col gap-3">
            <h1 className="text-3xl font-medium leading-[44px]">
              Earn discounts by referring others and enjoy special prices!
            </h1>
            <p className="text-sm font-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
            <Button className="w-56 mt-6">Generate Referral Link</Button>
          </div>
          <div className="w-1/2 flex justify-end ">
            <Image src={"/images/rafiki.png"} width={508} height={374} alt="" />
          </div>
        </section>
      </Card>
      <Card className="shadow-sm  mt-10  p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium">Referral History</h1>
          <SearchInput
            className="w-[28rem]"
            placeholder="Search apartment by  name, apartment type, No of Nights"
          />
          <section className="flex  items-center gap-3">
            <div className="flex items-center gap-1">
              <p className="text-xs">Filter:</p>
              <DatePicker
                date={undefined}
                setDate={() => {}}
                className="w-60 mt-0 h-9"
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
        {isLoading ? (
          <div>{skeletonRows}</div>
        ) : data && data.data && data?.data.data.length > 0 ? (
          <>
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
                {data &&
                  data.data &&
                  data.data.data.map((referral, index) => (
                    <TableRow key={referral.id}>
                      <TableCell className="font-medium text-xs">
                        {index + 1}
                      </TableCell>
                      <TableCell className="flex items-center gap-5">
                        {format(
                          referral.referred_user.created_at,
                          "yyyy/MM/dd"
                        )}
                      </TableCell>
                      <TableCell className="font-medium text-xs">
                        {referral.referral_code}
                      </TableCell>
                      <TableCell className="font-medium text-xs">
                        {referral?.referred_user.first_name}{" "}
                        {referral?.referred_user.last_name}
                      </TableCell>
                      <TableCell className="font-medium text-xs flex items-center gap-5">
                        {format(
                          referral.referred_user.updated_at,
                          "yyyy/MM/dd"
                        )}
                      </TableCell>
                      <TableCell className="font-medium text-xs">
                        <div className="w-20 py-2 rounded-full  bg-[#E9E9E9] flex justify-center items-center">
                          <p className="text-xs  font-light">Used</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <div className="text-center mt-4">no referral data</div>
        )}
      </Card>
    </section>
  );
};

export default ReferralsSection;
