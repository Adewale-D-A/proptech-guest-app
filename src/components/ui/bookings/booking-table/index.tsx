/** @format */

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/_shared/table";
import { Bath, Bed, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";
import ActionsDropdown from "../actions";
import HomeActionsDropdown from "../home-actions";
import { formatCurrency } from "@/_shared";
import { formatDateTime } from "@/_shared/constants";
import ImageSkeleton from "@/components/img-skeleton";
import { SkeletonTable } from "@/components/skeleton-preview";
import { BookingsResponse } from "@/types/book";

const BookingTable = ({
  headers,
  handleClickModal,
  bookingData,
  isLoading,
  handleActionSelect,
}: {
  headers: string[];
  handleClickModal?: (value: string) => void;
  bookingData: BookingsResponse | null;
  isLoading: boolean;
  handleActionSelect?: (val: string) => void;
}) => {
  const pathName = usePathname();

  const skeletonRows = Array.from({ length: 5 }, (_, index) => (
    <SkeletonTable key={index} />
  ));
  return (
    <div>
      {isLoading ? (
        <div>{skeletonRows}</div>
      ) : (
        <Table className="mt-4 rounded-md">
          <TableHeader className="rounded-md">
            <TableRow className="bg-[#EAEAEA] rounded-md ">
              {headers.map((h) => (
                <TableHead key={h} className="text-xs text-gray-100 ">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookingData &&
              bookingData?.bookings &&
              bookingData?.bookings?.data.map((book, index) => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium text-xs">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-4 items-center">
                      <ImageSkeleton />
                      <div>
                        <p className="text-xs">{book.shortlet.name}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <MapPin color="#6d6d6d" size={12} />
                            <p className="text-[10px] text-gray-100">
                              {book.shortlet.location}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bed color="#6d6d6d" size={12} />
                            <p className="text-[10px] text-gray-100">
                              {book.shortlet.no_of_bedrooms} bed(s)
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath color="#6d6d6d" size={12} />
                            <p className="text-[10px] text-gray-100">
                              {book.shortlet.no_of_bathrooms} bathroom(s)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-xs">
                    {formatCurrency(book.total_price, book.currency)}
                  </TableCell>
                  <TableCell className="font-medium text-xs">
                    {formatDateTime(book.shortlet.created_at)}
                  </TableCell>
                  <TableCell className="font-medium text-xs">
                    {book.number_of_days} Night
                  </TableCell>
                  <TableCell className="font-medium text-xs">
                    {pathName === "/bookings" ? (
                      <HomeActionsDropdown
                        handleClickModal={handleClickModal}
                      />
                    ) : (
                      <ActionsDropdown
                        handleActionSelect={handleActionSelect}
                        id={book?.id}
                        booking={book}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default BookingTable;
