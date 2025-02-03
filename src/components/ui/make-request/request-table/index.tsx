/** @format */

import { formatCurrency, formatDateTime } from "@/_shared/constants";
import { Button } from "@/components/_shared/button";
import { Modal } from "@/components/_shared/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/_shared/table";
import PaginationTable from "@/components/pagination";
import StatusBadge from "@/components/status-badge";
import { UserRequest, UserRequestsResponse } from "@/types/type";
import { format } from "date-fns";
import { ScanSearch, X } from "lucide-react";
import { usePathname } from "next/navigation";

import React, { useState } from "react";

const RequestTable = ({
  headers,
  requestData,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
}: {
  headers: string[];
  requestData: UserRequestsResponse | undefined;
  pageIndex: number;
  pageSize: number;
  setPageIndex: (index: number) => void;
  setPageSize?: (index: number) => void;
}) => {
  const pathName = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [singleData, setSingleData] = useState<UserRequest>();

  const handleModalShow = (data: UserRequest) => {
    setShowModal(true);
    setSingleData(data);
  };
  const formattedDate = formatDateTime(singleData?.created_at ?? "");

  const ReusableCard = ({
    desc,
    title,
  }: {
    title: string;
    desc?: React.ReactNode | string;
  }) => {
    if (!desc) return null;
    return (
      <div className="flex justify-between border-b py-4 items-center">
        <p className="text-[#6D6D6D] text-sm">{title}</p>
        {title === "Status of request" ? (
          <>
            <StatusBadge
              desc={String(desc)}
              status={singleData?.booking?.payment_status ?? ""}
            />
          </>
        ) : (
          <h2 className="font-medium text-sm">{desc}</h2>
        )}
      </div>
    );
  };
  return (
    <>
      <Table className="mt-6">
        {requestData && requestData?.data.length > 0 ? (
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
              {requestData &&
                requestData?.data.map((req, index) => (
                  <TableRow key={req.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {format(req.created_at, "yyyy/MM/dd")}
                    </TableCell>
                    <TableCell>{req.request_id}</TableCell>
                    <TableCell>
                      {req?.shortlet?.name || req?.service_type?.name}
                    </TableCell>
                    <TableCell>
                      {pathName === "/additional-services"
                        ? req?.description
                        : req?.subject}
                    </TableCell>
                    <TableCell>
                      {pathName === "/additional-services" ? (
                        <>
                          <div
                            className={`h-8  flex justify-center items-center w-20 rounded-full text-xs ${
                              req?.booking?.payment_status === "pending"
                                ? "border"
                                : req?.booking?.payment_status === "success"
                                ? "text-[#00C814] bg-[#F0FDEF]"
                                : "bg-[#E9E9E9]"
                            } `}
                          >
                            <span
                              className={`${
                                req.status === "pending"
                                  ? ""
                                  : req.status === "completed"
                                  ? "text-[#00C814]"
                                  : ""
                              }`}
                            >
                              {req?.booking?.payment_status}
                            </span>
                          </div>
                        </>
                      ) : (
                        <StatusBadge
                          desc={req?.booking?.payment_status}
                          status={req?.booking?.payment_status}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <div
                        className="w-9 bg-[#E6F2FF] h-9 flex items-center justify-center cursor-pointer rounded"
                        onClick={() => handleModalShow(req)}
                      >
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
        totalItemsCount={requestData?.total ?? 0}
        setPageSize={setPageSize}
        // pageSizeOptions={[10, 25, 50]}
      />
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        onClose={() => setShowModal(false)}
        className="max-w-md"
      >
        <section>
          <div className="flex p-4 border-b justify-between items-center">
            <h1>Request Details</h1>
            <X size={16} onClick={() => setShowModal(false)} />
          </div>
          <section className="p-4 flex flex-col ">
            {singleData?.shortlet?.name && (
              <ReusableCard
                title="Apartment Name"
                desc={singleData.shortlet.name}
              />
            )}
            {singleData?.subject && (
              <ReusableCard title="Request Subject" desc={singleData.subject} />
            )}
            {formattedDate && (
              <ReusableCard title="Date & Time" desc={formattedDate} />
            )}
            {singleData?.request_id && (
              <ReusableCard title="Request ID" desc={singleData.request_id} />
            )}
            {singleData?.amount_charged && (
              <ReusableCard
                title="Amount Paid"
                desc={formatCurrency(
                  Number(singleData?.amount_paid),
                  singleData?.currency
                )}
              />
            )}
            {singleData?.description && (
              <ReusableCard title="Description" desc={singleData.description} />
            )}
            {singleData?.booking?.payment_status && (
              <ReusableCard
                title="Status of request"
                desc={singleData.booking.payment_status}
              />
            )}
            <Button className="mt-6">Escalate</Button>
          </section>
        </section>
      </Modal>
    </>
  );
};

export default RequestTable;
