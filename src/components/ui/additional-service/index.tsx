/** @format */
"use client";
import React, { useState } from "react";
import { TbMessageReply } from "react-icons/tb";
import ReusableCard from "../reusable-card";
import { Card } from "@/components/_shared/card";
import { Form } from "@/components/_shared/form";
import { LoadingButton } from "@/components/_shared/loading-button";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";
import SearchInput from "@/components/search-input";
import { usePathname, useRouter } from "next/navigation";
import VolumeProgressBar from "./volume-progress";
import FirstStepForm from "./step_1";
import SecondStepForm from "./step_2";
import ThirdStepForm from "./step_3";
import { AdditionalServicesComponentProps } from "@/types/type";
import RequestTable from "../make-request/request-table";
import { format } from "date-fns/format";
import { Modal } from "@/components/_shared/modal";
import FilterDateComponent from "../make-request/filter-component";
import { Button } from "@/components/_shared/button";
import { selectCurrentUser } from "@/redux/slices/authSlice";
import { use99Selector } from "@/redux/hooks/hooks";
import { useCreateAdditionalMutation } from "@/redux/services/request";
import { useToast } from "@/components/_shared/toast/use-toast";
import { payment_method, urlRoute } from "@/_shared/constants";
import { useVerifyPayment } from "@/redux/hooks/useVerifyPayment";

const AdditionalServicesComponent = ({
  requestDataStats,
  requestData,
  isLoading,
  setSearchTerm,
  searchTerm,
  setStartDate,
  setEndDate,
  endDate,
  startDate,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
}: AdditionalServicesComponentProps) => {
  const { toast } = useToast();
  const currentUser = use99Selector(selectCurrentUser);
  const [showDate, setShowDate] = useState(false);
  const [createAdditional, {}] = useCreateAdditionalMutation();
  const [volume, setVolume] = useState<number>(0);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const pathName = usePathname();
  const [selectedDate, setSelectedDate] = useState<string | undefined>();

  const form = useForm({
    defaultValues: {
      name: `${currentUser?.first_name} ${currentUser?.last_name}`,
      shortlet_id: "",
      service_type_id: "",
      quantity: "",
      request_date: "",
      description: "",
      callback_url: urlRoute.additionalPayStackUrl,
      payment_method: payment_method.pay_stack,
    },
  });

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      setVolume(volume - 5);
    }
  };

  const handleNext = () => {
    if (step === 3) {
      form.handleSubmit(onSubmit)();
    } else {
      setStep(step + 1);
      setVolume(volume + 5);
    }
  };

  const onSubmit = async (values: any) => {
    const payload = {
      ...values,
      request_date: selectedDate,
    };

    try {
      const response = await createAdditional(payload).unwrap();
      toast({
        variant: "default",
        title: response?.message || "Additional Request",
        description: "Your Additional Request is successful.",
      });
      const paymentUrl = response.data.payment || "";
      if (paymentUrl) {
        window.location.href = paymentUrl;
      }
    } catch (err) {
      const errorMessage =
        (err as any)?.data?.message || "Failed . Please try again.";
      toast({
        variant: "destructive",
        title: "Error!",
        description: errorMessage,
      });
    }
  };

  const headers = [
    "S/N",
    "Date of Request ",
    "Request ID",
    "Apartment Name",
    "Request Subject",
    "Status",
    "Action",
  ];

  const handleNavigate = () => {
    router.push(`${pathName}/pending-request`);
  };

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
  const handleCancel = () => {
    setStartDate("");
    setEndDate("");
    setShowDate(false);
  };

  const handleApply = () => {
    setStartDate(startDate);
    setEndDate(endDate);
    setShowDate(false);
  };
  useVerifyPayment();

  return (
    <div className="mt-6">
      <section className="flex gap-4">
        <div className="w-1/2">
          <h1 className="text-xl font-medium">Additional Services Breakdown</h1>
          <Card className=" mt-4 shadow-sm h-[595px] p-4">
            <section className="grid grid-cols-2 gap-4">
              <ReusableCard
                text="Pending Requests"
                bookingAmt={requestDataStats?.data?.pending ?? 0}
                icon={<TbMessageReply size={16} />}
                color="#E6F2FF"
                showBtn
                btnText="View Pending Requests"
                onClick={handleNavigate}
                isLoading={isLoading}
              />
              <ReusableCard
                text="Total Requests"
                bookingAmt={requestDataStats?.data?.total ?? 0}
                icon={<TbMessageReply size={16} />}
                color="#E9E9E9"
                isLoading={isLoading}
              />
              <ReusableCard
                text="Completed Requests"
                bookingAmt={requestDataStats?.data?.completed ?? 0}
                icon={<TbMessageReply size={16} />}
                color="#E9E9E9"
                isLoading={isLoading}
              />
              <ReusableCard
                text="Cancelled Requests"
                bookingAmt={requestDataStats?.data?.cancelled ?? 0}
                icon={<TbMessageReply size={16} />}
                color="#E9E9E9"
                isLoading={isLoading}
              />
            </section>
          </Card>
        </div>
        <div className="w-1/2  ">
          <Card className=" w-full h-[40rem]  shadow-sm cursor-pointer">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="border-b p-4">
                    <VolumeProgressBar volume={volume} />
                    <div className="flex justify-between items-center">
                      <p>Guest Details</p>
                      <p>Service Details</p>
                      <p>Payment</p>
                    </div>
                  </div>
                  <section className="flex w-full p-4 h-full flex-col gap-2">
                    <h1 className="font-medium">
                      {step > 2
                        ? "Review details of your order"
                        : "Provide your request details below"}
                    </h1>
                    {step === 1 && <FirstStepForm form={form} />}
                    {step === 2 && (
                      <SecondStepForm
                        form={form}
                        setSelectedDate={setSelectedDate}
                      />
                    )}
                    {step === 3 && (
                      <ThirdStepForm
                        name={form.getValues("name")}
                        serviceType={form.getValues("service_type_id")}
                        quantity={form.getValues("quantity")}
                        requestDate={selectedDate}
                        description={form.getValues("description")}
                        form={form}
                        totalAmount={""}
                      />
                    )}
                  </section>
                </div>
                <div className="p-4 flex justify-between">
                  {step > 1 && (
                    <LoadingButton
                      variant={"text"}
                      type="button"
                      onClick={handlePrevious}
                      className="w-full text-xs mr-2 h-9"
                    >
                      Prev
                    </LoadingButton>
                  )}
                  {step < 3 && (
                    <LoadingButton
                      type={"button"}
                      onClick={handleNext}
                      className="w-full ml-2 text-xs h-9"
                    >
                      {step === 1 ? "Continue" : "Proceed to Payment"}
                    </LoadingButton>
                  )}

                  {step === 3 && (
                    <LoadingButton
                      type={"submit"}
                      onClick={handleNext}
                      className="w-full ml-2 text-xs h-9"
                    >
                      Make Payment
                    </LoadingButton>
                  )}
                </div>
              </form>
            </Form>
          </Card>
        </div>
      </section>
      <section>
        <Card className="shadow-sm mt-10  p-4">
          <div className="flex items-center justify-between">
            <h1 className="font-medium">Request History</h1>
            <SearchInput
              className="w-[28rem]"
              placeholder="Search apartment by  name, apartment type, No of Nights"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          <RequestTable
            headers={headers}
            requestData={requestData}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize}
            pageIndex={pageIndex}
            pageSize={pageSize}
          />
        </Card>
      </section>
      <Modal
        showModal={showDate}
        setShowModal={setShowDate}
        onClose={() => setShowDate(false)}
        className="max-w-xl py-10"
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
    </div>
  );
};

export default AdditionalServicesComponent;
