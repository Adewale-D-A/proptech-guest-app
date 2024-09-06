/** @format */
"use client";
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
import { Card } from "@/components/_shared/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";
import { ScanSearch } from "lucide-react";
import BackButton from "@/components/back-btn";
const PendingRequestComponent = () => {
  const headers = [
    "S/N",
    "Date of Request ",
    "Request ID",
    "Apartment Name",
    "Request Subject",
    "Status",
    "Action",
  ];
  return (
    <section>
      <BackButton className="my-6 " />
      <Card className="shadow-sm   p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium">Request History</h1>
          <SearchInput
            className="w-[28rem]"
            placeholder="Search apartment by  name, apartment type, No of Nights"
          />
          <section className="flex  items-center gap-3">
            <div className="flex items-center gap-1">
              <p className="text-xs">Filter:</p>
              <DatePicker className="w-60 mt-0 h-9" />
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
                <TableHead key={h} className="text-xs text-gray-100 "> {h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5, 6].map((invoice, index) => (
              <TableRow key={invoice}>
                <TableCell className="font-medium text-xs">
                  {index + 1}
                </TableCell>
                <TableCell>25/03/2024 11:23 AM</TableCell>
                <TableCell className="font-medium text-xs">
                  REQ2024-ABC123
                </TableCell>
                <TableCell className="font-medium text-xs">
                  Sunshine - 2 Bedroom
                </TableCell>
                <TableCell className="font-medium text-xs">
                  Netflix Account Subscription
                </TableCell>
                <TableCell className="font-medium text-xs">
                  <div className="w-20 py-2 rounded-full  bg-[#E6F2FF] flex justify-center items-center">
                    <p className="text-xs text-primary-1 font-light">Pending</p>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-xs">
                  <div className="w-9 bg-[#E6F2FF] h-9 flex items-center justify-center cursor-pointer rounded">
                    <ScanSearch size={18} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
};

export default PendingRequestComponent;
