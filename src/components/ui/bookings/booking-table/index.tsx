/** @format */

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/_shared/table";
import { Bath, Bed, MapPin } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ActionsDropdown from "../actions";
import HomeActionsDropdown from "../home-actions";
import { formatCurrency } from "@/_shared";
import { formatDate, formatDateTime } from "@/_shared/constants";
import ImageSkeleton from "@/components/img-skeleton";
import { SkeletonTable } from "@/components/skeleton-preview";
import { BookingsResponse } from "@/types/book";
import { Drawer, DrawerContent } from "@/components/_shared/drawer";
import { FileDown } from "lucide-react";
import { useGetSingleBookingsQuery } from "@/redux/services/booking";
import { IoArrowForward } from "react-icons/io5";
import { MdArrowBack } from "react-icons/md";
import { Button } from "@/components/_shared/button";
import Image from "next/image";
import { TbBed } from "react-icons/tb";
import { Separator } from "@/components/_shared/separator";
import { IoMdCheckboxOutline } from "react-icons/io";
import { Card } from "@/components/_shared/card";
import ThunderLoader from "@/components/loader/thunder-loader";
import { Booking } from "@/types/type";
import PaginationTable from "@/components/pagination";
import GoogleMapComponent from "@/components/google-map";

const BookingTable = ({
  headers,
  handleClickModal,
  bookingData,
  isLoading,
  handleActionSelect,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
}: {
  headers: string[];
  handleClickModal?: (value: string, booking?: Booking) => void;
  bookingData: BookingsResponse | null;
  isLoading: boolean;
  handleActionSelect?: (val: string) => void;
  pageIndex: number;
  pageSize: number;
  setPageIndex: (index: number) => void;
  setPageSize?: (index: number) => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  const pathName = usePathname();
  const skeletonRows = Array.from({ length: 5 }, (_, index) => (
    <SkeletonTable key={index} />
  ));
  const { data: singleBookings, isLoading: singleBookingLoading } =
    useGetSingleBookingsQuery(id);
  const singleBookingsData =
    singleBookings && singleBookings?.data?.bookings?.shortlet;
  const images = singleBookingsData?.images || [];
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpenSingleBooking = (bookingId: number) => {
    if (bookingId) {
      router.push(`?id=${bookingId}`, {
        shallow: true,
      } as any);
      setIsOpen(true);
    }
    return;
  };

  const handleBookingChat = (bookingId: string | number) => {
    if (bookingId) {
      router.push(`/contact-us/chat-with-us?id=${bookingId} `);
    }
  };

  const handleCloseDrawer = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      router.replace(pathName, { shallow: true } as any);
    }
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [images.length]);

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
                    {formatDateTime(book.created_at)}
                  </TableCell>
                  <TableCell className="font-medium text-xs">
                    {book.number_of_days} Night
                  </TableCell>
                  <TableCell className="font-medium text-xs">
                    {pathName === "/bookings" ? (
                      <HomeActionsDropdown
                        handleClickModal={handleClickModal}
                        handleClickModalRate={() =>
                          handleClickModal?.("rate", book)
                        }
                        handleClickModalRebook={() =>
                          handleClickModal?.("rebook", book)
                        }
                        handleClickModalCaution={() =>
                          handleClickModal?.("caution", book)
                        }
                        handleOpenSingleBooking={() =>
                          handleOpenSingleBooking(book.id)
                        }
                        handleBookingChat={() =>
                          handleBookingChat(book?.shortlet?.id)
                        }
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
      <PaginationTable
        pageSize={pageSize}
        pageIndex={pageIndex}
        handleOnChange={(index: number) => {
          setPageIndex(index);
        }}
        setPageIndex={setPageIndex}
        totalItemsCount={bookingData?.bookings?.total ?? 0}
        setPageSize={setPageSize}
        // pageSizeOptions={[10, 25, 50]}
      />
      <Drawer open={isOpen} onOpenChange={handleCloseDrawer} direction="right">
        <DrawerContent className="bg-white p-4 h-screen w-screen rounded-none">
          {singleBookingLoading ? (
            <>
              <div className="flex justify-center items-center h-full">
                <ThunderLoader />
              </div>
            </>
          ) : (
            <section className="flex gap-10 h-full">
              <Card className=" w-1/2 pb-8 p-4 shadow-sm h-full overflow-y-auto">
                <section>
                  {images && images?.length > 0 && (
                    <div className="w-full relative">
                      <div
                        style={{
                          width: "100%",
                          height: "600px",
                          position: "relative",
                        }}
                      >
                        <Image
                          layout="fill"
                          src={images[currentIndex]?.path || ""}
                          alt={`Apartment Image ${currentIndex + 1}`}
                          className="w-full rounded-xl h-[600px] object-cover"
                          unoptimized
                        />
                      </div>

                      <div className="flex justify-between absolute top-0 items-center h-full left-0 right-0 px-6">
                        <Button
                          onClick={handlePrevImage}
                          disabled={images?.length === 0}
                          className="bg-white shadow-md w-12 h-12 rounded-full px-4"
                        >
                          <MdArrowBack size={30} color="black" />
                        </Button>
                        <Button
                          onClick={handleNextImage}
                          disabled={images?.length === 0}
                          className="bg-white shadow-md w-12 h-12 rounded-full px-4"
                        >
                          <IoArrowForward size={30} color="black" />
                        </Button>
                      </div>
                    </div>
                  )}
                </section>
                <section className="flex pt-4 justify-between items-center">
                  <h1 className="text-2xl font-medium">
                    {singleBookingsData?.name}{" "}
                    {singleBookingsData?.no_of_bathrooms} Bedroom
                  </h1>
                  <div>
                    <h1 className="text-primary text-font-medium">
                      {formatCurrency(
                        singleBookingsData?.price,
                        singleBookingsData?.currency
                      )}
                      /<span className="text-xs">Total cost</span>{" "}
                    </h1>
                  </div>
                </section>
                <section className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="text-gray-100 flex items-center gap-1">
                      <MapPin size={12} />
                      <p className="text-xs font-light text-gray-100">
                        {singleBookingsData?.location}
                      </p>
                    </div>
                    <div className="text-gray-100 flex items-center gap-1">
                      <TbBed size={12} />
                      <p className="text-xs font-light">
                        {singleBookingsData?.no_of_bedrooms} Bedrooms
                      </p>
                    </div>
                  </div>
                </section>
                <section>
                  <Button
                    variant={"outline"}
                    className="border-primary font-normal  text-sm rounded-md text-primary flex items-center gap-x-3"
                  >
                    Print document <FileDown className="" size={16} />
                  </Button>
                </section>
                <section className="bg-[#f5f6ff] px-4 rounded-md mt-4 h-[70px] flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Check-in</p>
                    <span className="text-xs text-gray-400">
                      {singleBookings?.data?.bookings?.check_in_date &&
                        formatDate(
                          singleBookings?.data?.bookings?.check_in_date
                        )}
                    </span>
                  </div>
                  <Separator orientation="vertical" className="bg-gray-200" />
                  <div className="">
                    <p className="text-sm font-medium">Checkout </p>
                    <span className="text-xs text-gray-400">
                      {singleBookings?.data?.bookings?.check_out_date &&
                        formatDate(
                          singleBookings?.data?.bookings?.check_out_date
                        )}
                    </span>
                  </div>
                  <Separator orientation="vertical" className="bg-gray-200" />
                  <div className="">
                    <p className="text-sm font-medium">Confirmation Code</p>
                    <span className="text-xs text-gray-400">nil</span>
                  </div>
                </section>
                <section className="my-4">
                  <h1 className="text-lg font-medium">Cancellation Policies</h1>
                  <p className="text-sm text-[#6D6D6D]">
                    {singleBookingsData?.cancellation_policy}
                  </p>
                </section>
                <section>
                  <div className="">
                    <h1 className="font-medium">House Rules</h1>
                  </div>
                  <ul className="list-disc  mt-2  list-inside space-y-3">
                    {singleBookingsData &&
                      singleBookingsData.rules.map((rule, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <IoMdCheckboxOutline size={16} className=" mr-2" />
                          {rule.name}
                        </li>
                      ))}
                  </ul>
                </section>
              </Card>

              <div className="w-1/2 flex justify-center items-center h-full sticky top-0">
                {Number(singleBookingsData?.latitude) !== 0 &&
                Number(singleBookingsData?.longitude) !== 0 ? (
                  <GoogleMapComponent
                    lat={Number(singleBookingsData?.latitude)}
                    lng={Number(singleBookingsData?.longitude)}
                    height={"100%"}
                  />
                ) : (
                  <div>
                    <p>No location found yet!!!</p>
                  </div>
                )}
              </div>
            </section>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default BookingTable;
