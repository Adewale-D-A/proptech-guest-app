/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/_shared/button";
import { MdArrowBack } from "react-icons/md";
import { IoArrowForward } from "react-icons/io5";
import { CalendarCheck2, X } from "lucide-react";
import { Card } from "@/components/_shared/card";
import { TiStarFullOutline } from "react-icons/ti";
import { Label } from "@/components/_shared/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";
import ListCard from "../list-card";
import ShareReview from "../share-review";
import DetailsSection from "../details-section";
import AnimatedContainer from "@/components/_shared/framer/animate-div";
import AnythingElse from "../anything-else";
import BackButton from "@/components/back-btn";
import { ImageType } from "@/types/type";
import { formatCurrency } from "@/_shared";
import { DatePickerTime } from "@/components/date-picker-time";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/_shared/toast/use-toast";
import { Form } from "@/components/_shared/form";
import { use99Dispatch, use99Selector } from "@/redux/hooks/hooks";
import { selectCurrentUser } from "@/redux/slices/authSlice";
import { bookingSchema } from "@/_shared/validate";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateBookingMutation,
  useGetBookingPriceMutation,
} from "@/redux/services/booking";
import { LoadingButton } from "@/components/_shared/loading-button";
import { errorHandler, payment_method, urlRoute } from "@/_shared/constants";
import ThunderLoader from "@/components/loader/thunder-loader";
import { clearEmail, selectEmail } from "@/redux/slices/emailSlice";
import AuthModal from "../../auth/auth-modal";
import { Modal } from "@/components/_shared/modal";
import { Calendar } from "@/components/_shared/calander";
import useCheckAvaliability from "@/redux/hooks/check-avaliable-date";
import { Separator } from "@/components/_shared/separator";
import { parseISO } from "date-fns";
import Image from "next/image";

type FormValues = z.infer<typeof bookingSchema>;

const ShortLetPreviewComponent = ({
  apartmentDetails,
  availableDates,
  loadingAvailableDates,
}: {
  apartmentDetails: any;
  availableDates: any;
  loadingAvailableDates: boolean;
}) => {
  const router = useRouter();
  const dispatch = use99Dispatch();
  const searchParams = useSearchParams();
  const params = useParams();
  const { toast } = useToast();
  const [priceDetails, setPriceDetails] = useState({
    totalPrice: null as number | null,
    cautionPrice: null as number | null,
    taxFee: null as number | null,
    baseCost: null as number | null,
  });
  const [tokens, setTokens] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("");
  const email = use99Selector(selectEmail);
  const [booking, { isLoading }] = useCreateBookingMutation();
  const [bookingPrice, { isLoading: priceLoading }] =
    useGetBookingPriceMutation();
  const currentUser = use99Selector(selectCurrentUser);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imgLength = apartmentDetails && apartmentDetails?.images.length;
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [showDate, setShowDate] = useState(false);

  const [showError, setShowError] = useState(false);
  const { actions, state } = useCheckAvaliability({
    blockedDates: availableDates?.blocked_dates || [],
    bookedDates: availableDates?.booked_dates || [],
  });
  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
  };
  const handleNext = () => {
    if (apartmentDetails) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imgLength);
    }
  };
  const handlePrev = () => {
    if (apartmentDetails && apartmentDetails.length > 0) {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + apartmentDetails.length) % apartmentDetails.length
      );
    }
  };
  const time_stamp = "12:00";
  const totalImages = apartmentDetails?.images.length || 0;
  const startIndex = Math.max(currentIndex - 2, 0);
  const endIndex = Math.min(startIndex + 4, totalImages);
  const imagesToShow = apartmentDetails?.images.slice(startIndex, endIndex);
  const number_of_guests = Array.from(
    { length: apartmentDetails?.max_guests },
    (_, i) => ({
      key: i + 1,
      value: i + 1,
    })
  );
  const adjustedStartIndex =
    imagesToShow?.length < 4 && totalImages > 4
      ? Math.max(totalImages - 4, 0)
      : startIndex;
  const adjustedImagesToShow = apartmentDetails?.images.slice(
    adjustedStartIndex,
    adjustedStartIndex + 4
  );

  const remainingCount = totalImages - adjustedImagesToShow?.length;

  const form = useForm<FormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      check_in_day: "",
      check_in_time: time_stamp,
      check_out_day: "",
      check_out_time: time_stamp,
      number_of_guests: "",
    },
  });

  const { reset } = form;

  const onSubmit = async (values: FormValues) => {
    if (!currentUser) {
      handleOpen(true, "sign-in");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please log in to proceed with your booking.",
      });
      return;
    }
    const payload = {
      ...values,
      number_of_guests: Number(values.number_of_guests),
      shortlet_id: params?.id,
      payment_method: payment_method.pay_stack,
      callback_url: urlRoute.shortletUrl,
    };

    try {
      const res = await booking(payload).unwrap();
      const paymentUrl = res.data.payment || "";
      if (paymentUrl) {
        window.location.href = paymentUrl;
      }
      toast({
        variant: "default",
        title: res?.message,
        description: "Apartment booked",
      });
      reset();
    } catch (err) {
      errorHandler(err as any);
      const errorMessage = (err as any)?.data?.message;
      if (errorMessage === "User has identity has not been verified") {
        setShowError(true);
      }
    }
  };

  useEffect(() => {
    const checkInDay = form.watch("check_in_day");
    const checkInTime = time_stamp;
    const checkOutDay = form.watch("check_out_day");
    const checkOutTime = time_stamp;
    const numberOfGuests = form.watch("number_of_guests");
    // if (!token) {
    //   toast({
    //     variant: "destructive",
    //     title: "Login required",
    //     description: "Please log in to book an apartment",
    //   });
    //   return;
    // }
    if (
      checkInDay &&
      checkInTime &&
      checkOutDay &&
      checkOutTime &&
      numberOfGuests
    ) {
      const payload = {
        check_in_day: checkInDay ?? "",
        check_in_time: time_stamp,
        check_out_day: checkOutDay ?? "",
        check_out_time: time_stamp,
        number_of_guests: numberOfGuests ?? "",
        shortlet_id: params?.id,
      };

      (async () => {
        try {
          const res = await bookingPrice(payload).unwrap();
          setPriceDetails({
            totalPrice: res?.data?.total_cost,
            cautionPrice: res?.data?.caution_fee,
            taxFee: res?.data?.tax_fee,
            baseCost: res?.data?.base_cost,
          });
        } catch (err) {
          errorHandler(err as any);
        }
      })();
    }
  }, [
    form.watch("check_in_day"),
    time_stamp,
    form.watch("check_out_day"),
    time_stamp,
    form.watch("number_of_guests"),
  ]);

  useEffect(() => {
    const modalType = searchParams.get("auth");
    if (modalType) {
      handleOpen(true, modalType, email);
    }
  }, [searchParams]);

  const handleOpen = (open: boolean, modalType: string, params?: string) => {
    setShowModal(open);
    setType(modalType);
    if (open) {
      router.push(`?auth=${modalType}${params ? `&email=${params}` : ""}`, {
        shallow: true,
      } as any);
    } else {
      router.push(window.location.pathname, {
        shallow: true,
      } as any);
    }
  };

  const handleClose = () => {
    dispatch(clearEmail());
    handleOpen(false, type);
  };

  const disabledDates = availableDates?.blocked_dates.concat(
    availableDates?.booked_dates
  );
  const disabledDatesArray = disabledDates
    ? disabledDates.map((date: any) => parseISO(date))
    : [];
  const yesterday = new Date();

  return (
    <div className="pt-24">
      <section className="max-w-screen-custom mx-auto px-4">
        <BackButton />
        <AnimatedContainer className="flex mt-6 gap-4">
          <div className="w-full relative">
            <img
              src={apartmentDetails?.images[currentIndex].path || ""}
              alt={`Apartment Image ${currentIndex + 1}`}
              className="w-full rounded-xl h-[600px] object-cover"
            />
            <div className="flex justify-between absolute top-0 items-center h-full left-0 right-0 px-6">
              <Button
                onClick={handlePrev}
                disabled={apartmentDetails?.images.length === 0}
                className="bg-white shadow-md w-12 h-12 rounded-full px-4"
              >
                <MdArrowBack size={30} color="black" />
              </Button>
              <Button
                onClick={handleNext}
                disabled={apartmentDetails?.images.length === 0}
                className="bg-white shadow-md w-12 h-12 rounded-full px-4"
              >
                <IoArrowForward size={30} color="black" />
              </Button>
            </div>
          </div>

          <div className="w-1/3 relative flex flex-col gap-2">
            {adjustedImagesToShow &&
              adjustedImagesToShow?.map((image: ImageType, index: number) => {
                const isActive = currentIndex === adjustedStartIndex + index;
                return (
                  <div
                    key={index}
                    className={`w-full h-36 cursor-pointer relative rounded-md ${
                      isActive ? "bg-black bg-opacity-80" : ""
                    }`}
                    onClick={() => setCurrentIndex(adjustedStartIndex + index)}
                  >
                    <img
                      src={image.path}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-full h-full rounded-md object-cover ${
                        isActive ? "opacity-40" : ""
                      }`}
                    />
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                        <span>Active</span>
                      </div>
                    )}
                  </div>
                );
              })}
            {remainingCount > 0 && (
              <div className="relative bottom-24 text-white text-4xl font-semibold flex justify-center p-2 rounded mt-2">
                {remainingCount} +
              </div>
            )}
          </div>
        </AnimatedContainer>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-medium">
              {apartmentDetails?.name} - {apartmentDetails?.no_of_bedrooms}{" "}
              Bedroom
            </h1>
          </div>
          <div>
            <Button
              variant={"outline"}
              className="text-xs text-primary-1 flex items-center gap-2"
              onClick={() => setShowDate(true)}
            >
              <CalendarCheck2 size={16} /> Check Availability
            </Button>
          </div>
        </div>
        <div className="flex gap-6 mt-5 relative h-full">
          <DetailsSection apartmentDetails={apartmentDetails} />

          <AnimatedContainer className="w-1/2">
            <Card className="shadow-sm border border-black/5">
              <div className="flex border-b p-4 justify-between items-center">
                <div className="flex justify-center items-center bg-[#F2F8FF] w-36 h-9 rounded-md">
                  <h1 className="text-primary text-font-medium">
                    {formatCurrency(
                      apartmentDetails?.price,
                      apartmentDetails?.currency
                    )}
                    /<span className="text-xs">Night</span>{" "}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <TiStarFullOutline size={20} color="#FFA500" />
                  <span className="text-xs">4.5 (8 Reviews)</span>
                </div>
              </div>
              <section className="p-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center gap-4 w-full">
                        <div className="w-full">
                          <DatePickerTime
                            label="Check-in"
                            placeholder="DD/MM/YYYY"
                            onDateChange={(date) =>
                              form.setValue(
                                "check_in_day",
                                date ? date.toISOString().split("T")[0] : ""
                              )
                            }
                            onTimeChange={(time) =>
                              form.setValue("check_in_time", time ?? "")
                            }
                            error={
                              form.formState.errors.check_in_day?.message ||
                              form.formState.errors.check_in_time?.message
                            }
                            disabledDates={availableDates?.booked_dates.concat(
                              availableDates?.blocked_dates
                            )}
                          />
                        </div>
                        <div className="w-full">
                          <DatePickerTime
                            label="Check-out"
                            placeholder="DD/MM/YYYY"
                            onDateChange={(date) =>
                              form.setValue(
                                "check_out_day",
                                date ? date.toISOString().split("T")[0] : ""
                              )
                            }
                            onTimeChange={(time) =>
                              form.setValue("check_out_time", time ?? "")
                            }
                            error={
                              form.formState.errors.check_out_day?.message ||
                              form.formState.errors.check_out_time?.message
                            }
                            disabledDates={availableDates?.booked_dates.concat(
                              availableDates?.blocked_dates
                            )}
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-normal">
                          No of Guest
                        </Label>
                        <Select
                          value={form.watch("number_of_guests")}
                          onValueChange={(value) =>
                            form.setValue("number_of_guests", value)
                          }
                        >
                          <SelectTrigger className="border-black/10 h-10 shadow-none text-gray-100 mt-2">
                            <SelectValue
                              placeholder="Enter number of guests"
                              className="text-[#77838D] text-xs font-light"
                            >
                              {form.watch("number_of_guests") ||
                                "Enter number of guests"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent className="border-none">
                            {number_of_guests.map((num) => (
                              <SelectItem
                                key={num.key}
                                value={num.value.toString()}
                              >
                                {num.value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {form.formState.errors.number_of_guests && (
                          <span className="text-red-600 text-xs mt-1">
                            {form.formState.errors.number_of_guests.message}
                          </span>
                        )}
                      </div>
                      <section className="bg-[#F9F9F9] rounded-md mt-5">
                        {priceLoading ? (
                          <div className="flex pt-5 items-center justify-center">
                            <ThunderLoader />
                          </div>
                        ) : (
                          <>
                            {priceDetails.totalPrice !== null && (
                              <section>
                                <div className="border-b p-4">
                                  <h1 className="">Booking Summary</h1>
                                </div>
                                <div className="p-4">
                                  <div className=" py-3 flex flex-col gap-3">
                                    <ListCard
                                      amt={priceDetails.baseCost}
                                      costName="Estimated cost for 1 night "
                                      currency="NGN"
                                    />
                                    <ListCard
                                      amt={priceDetails.cautionPrice}
                                      costName="Refundable Caution fee"
                                      currency="NGN"
                                    />

                                    <ListCard
                                      amt={priceDetails.taxFee}
                                      costName="Tax (7.5%)"
                                      currency="NGN"
                                    />
                                    <Separator />
                                    <ListCard
                                      amt={priceDetails.totalPrice}
                                      costName="Total"
                                      currency="NGN"
                                    />
                                  </div>
                                </div>
                              </section>
                            )}
                          </>
                        )}
                        <div className="px-4 pb-4">
                          <LoadingButton
                            loading={isLoading}
                            variant="outline"
                            className="w-full"
                          >
                            Reserve Now
                          </LoadingButton>
                        </div>
                      </section>
                    </div>
                  </form>
                </Form>
              </section>
            </Card>
          </AnimatedContainer>
        </div>
        <ShareReview />
        <AnythingElse />
      </section>
      <AuthModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        onClose={handleClose}
        setShowModal={setShowModal}
        // setToken={setTokens}
        showModal={showModal}
        // token={tokens}
        type={type}
      />
      <Modal
        setShowModal={setShowError}
        showModal={showError}
        onClose={() => setShowError(false)}
        className=""
      >
        <section className="flex justify-between border-b p-4 items-center">
          <h1 className="font-semibold">Account Not Verified</h1>
          <X
            size={16}
            className="cursor-pointer"
            onClick={() => setShowError(false)}
          />
        </section>

        <div className="text-red-500 text-4xl mt-4 text-center ">⚠️</div>

        <p className=" p-5  font-medium text-center">
          Your account has not been verified by an admin. Please contact support
          or wait for the verification process to be completed.{" "}
        </p>
      </Modal>
      <Modal
        showModal={showDate}
        setShowModal={setShowDate}
        onClose={() => setShowDate(false)}
        className="w-fit max-w-lg"
      >
        <section>
          {loadingAvailableDates ? (
            <ThunderLoader />
          ) : (
            <section className="p-4">
              <section className="flex justify-between items-center">
                <h1 className="font-medium "> {apartmentDetails?.name}</h1>
                <X size={16} onClick={() => setShowDate(false)} />
              </section>
              <Calendar
                disabled={[...disabledDatesArray, { before: yesterday }]}
                className=" "
                mode="single"
              />
              <section className="flex justify-between items-center mt-6 w-full">
                <section className="flex w-full items-center gap-2">
                  <div className="relative">
                    <div className="w-5 h-5 flex justify-end  bg-[#E9E9E9] rounded-[2px] " />
                    <Image
                      src={"/marker.png"}
                      width={10}
                      height={8}
                      alt="marker"
                      className="top-0 right-0 absolute"
                    />
                  </div>
                  <span className="text-xs text-[#606569] font-medium">
                    Available Dates
                  </span>
                </section>
                <section className="flex justify-end items-center gap-2 w-full ">
                  <div className="w-5 h-5 bg-[#E9E9E9] rounded-[2px]" />
                  <span className="text-xs text-[#606569] font-medium ">
                    Unavailable Dates
                  </span>
                </section>
              </section>
            </section>
          )}
        </section>
      </Modal>
    </div>
  );
};

export default ShortLetPreviewComponent;
