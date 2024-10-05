/** @format */

import { Button } from "@/components/_shared/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/_shared/table";
import { UserRequestsResponse } from "@/types/type";
import { format } from "date-fns";
import { ScanSearch } from "lucide-react";

import React from "react";

const RequestTable = ({
  headers,
  requestData,
}: {
  headers: string[];
  requestData: UserRequestsResponse | undefined;
}) => {
  return (
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
                  <TableCell>{format(req.created_at, "yyyy/MM/dd")}</TableCell>
                  <TableCell>{req.request_id}</TableCell>
                  <TableCell>{req.shortlet.name}</TableCell>
                  <TableCell>{req.subject}</TableCell>
                  <TableCell>
                    <Button variant="secondary" className="h-8 text-xs">
                      {req.status}
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
  );
};

export default RequestTable;
