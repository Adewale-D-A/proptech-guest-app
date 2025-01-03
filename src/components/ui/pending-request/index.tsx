/** @format */
"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/_shared/table";
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
import { UserRequestsResponse } from "@/types/type";
import { format } from "date-fns";
import { Button } from "@/components/_shared/button";
import FilterDateComponent from "../make-request/filter-component";
import { Modal } from "@/components/_shared/modal";
import PaginationTable from "@/components/pagination";
const PendingRequestComponent = ({
  pendingRequest,
  setSearch,
  setStartDate,
  setEndDate,
  endDate,
  startDate,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
}: {
  pendingRequest: UserRequestsResponse | undefined;
  setSearch: (value: string) => void;
  setStartDate: (date: string | undefined) => void;
  setEndDate: (date: string | undefined) => void;
  endDate: string | undefined;
  startDate: string | undefined;
  pageIndex: number;
  pageSize: number;
  setPageIndex: (index: number) => void;
  totalPages?: number;
  setPageSize?: (index: number) => void;
}) => {
  const [showDate, setShowDate] = useState(false);
  const headers = [
    "S/N",
    "Date of Request ",
    "Request ID",
    "Apartment Name",
    "Request Subject",
    "Status",
    "Action",
  ];
  const handleDateSelect = (
    date: Date | undefined,
    setter: (date: string | undefined) => void
  ) => {
    if (date) {
      setter(format(date, "yyyy-MM-dd"));
    } else {
      setter(undefined);
    }
  };

  const handleApply = () => {
    setStartDate(startDate);
    setEndDate(endDate);
    setShowDate(false);
  };

  const handleCancel = () => {
    setStartDate("");
    setEndDate("");
    setShowDate(false);
  };
  const pendingRequestData =
    pendingRequest &&
    pendingRequest.data.filter((data) => data.payment_status === "pending");

  return (
    <section>
      <BackButton className="my-6 " />
      <Card className="shadow-sm   p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium">Request History</h1>
          <SearchInput
            className="w-[28rem]"
            placeholder="Search apartment by  name, apartment type, No of Nights"
            onChange={(e) => setSearch(e.target.value)}
          />
          <section className="flex  items-center gap-3">
            <Button
              variant={"text"}
              className="flex  items-center cursor-pointer gap-3"
              onClick={() => setShowDate(true)}
            >
              <p className="text-xs">Filter:</p>
              <div className="flex items-center gap-1 border w-60 h-9 text-xs px-2 rounded">
                {startDate && endDate && (
                  <>
                    {" "}
                    {startDate} - {endDate}
                  </>
                )}
              </div>
            </Button>
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
          {pendingRequestData && pendingRequestData?.length > 0 ? (
            <>
              <TableHeader>
                <TableRow className="bg-[#EAEAEA] rounded-md">
                  {headers.map((header) => (
                    <TableHead
                      key={header}
                      className="text-xs font-medium text-gray-500 "
                    >
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody className="">
                {pendingRequestData &&
                  pendingRequestData?.map((req, index) => (
                    <TableRow key={req.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {format(req?.created_at, "yyyy/MM/dd")}
                      </TableCell>
                      <TableCell>{req?.request_id}</TableCell>
                      <TableCell>
                        {req?.shortlet?.name || req?.service_type?.name}
                      </TableCell>
                      <TableCell>{req?.description}</TableCell>
                      <TableCell>
                        <Button
                          variant={
                            req.payment_status === "pending"
                              ? "secondary"
                              : "default"
                          }
                          className="h-8 text-xs"
                        >
                          {req?.payment_status}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="w-9 bg-[#E6F2FF] h-9 flex items-center justify-center cursor-pointer rounded">
                          <ScanSearch size={18} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </>
          ) : (
            <div className="text-center ">no request data </div>
          )}
        </Table>
        <PaginationTable
          pageSize={pageSize}
          pageIndex={pageIndex}
          handleOnChange={(index: number) => {
            setPageIndex(index);
          }}
          setPageIndex={setPageIndex}
          totalItemsCount={pendingRequest?.total ?? 0}
          setPageSize={setPageSize}
          // pageSizeOptions={[10, 25, 50]}
        />
      </Card>

      <Modal
        showModal={showDate}
        setShowModal={setShowDate}
        onClose={() => setShowDate(false)}
        className="max-w-2xl py-10"
      >
        <FilterDateComponent
          endDate={endDate}
          handleApply={handleApply}
          handleCancel={handleCancel}
          handleDateSelect={handleDateSelect}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
          startDate={startDate}
        />
      </Modal>
    </section>
  );
};

export default PendingRequestComponent;
