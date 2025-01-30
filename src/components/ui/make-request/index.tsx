/** @format */
"use client";
import React, { useState } from "react";
import { TbMessageReply } from "react-icons/tb";
import ReusableCard from "../reusable-card";
import { Card } from "@/components/_shared/card";
import { CircleAlert } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/_shared/form";
import { LoadingButton } from "@/components/_shared/loading-button";
import { useForm } from "react-hook-form";
import { Input } from "@/components/_shared/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";

import { Textarea } from "@/components/_shared/textarea";
import { Label } from "@/components/_shared/label";
import SearchInput from "@/components/search-input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/_shared/tooltip";
import { usePathname, useRouter } from "next/navigation";
import { Modal } from "@/components/_shared/modal";
import Image from "next/image";
import { Button } from "@/components/_shared/button";
import { CreateRequestBody, MakeARequestResponseData } from "@/types/type";
import RequestTable from "./request-table";
import { use99Selector } from "@/redux/hooks/hooks";
import { selectCurrentUser } from "@/redux/slices/authSlice";
import { apartmentOptions } from "@/_shared/data";
import { useCreateRequestMutation } from "@/redux/services/request";
import { format } from "date-fns/format";
import FilterDateComponent from "./filter-component";
import { errorHandler } from "@/_shared/constants";
import { useToast } from "@/components/_shared/toast/use-toast";

const MakeRequestComponent = ({
  requestDataStats,
  requestData,
  isLoading,
  shortlet,
  onNewRequest,
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
}: MakeARequestResponseData) => {
  const [showDate, setShowDate] = useState(false);
  const currentUser = use99Selector(selectCurrentUser);
  const [createRequest, { isLoading: createLoading }] =
    useCreateRequestMutation();
  const { toast } = useToast();

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const pathName = usePathname();
  const form = useForm({
    defaultValues: {
      name: `${currentUser?.first_name} ${currentUser?.last_name}`,
      shortlet_id: "",
      subject: "",
      description: "",
    },
  });

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

  const onSubmit = async (data: any) => {
    if (!data.shortlet_id || !data.subject || !data.description) {
      return toast({
        variant: "destructive",
        title: `missing field`,
        description: "some input field are missing",
      });
    }
    const requestBody: CreateRequestBody = {
      shortlet_id: Number(data.shortlet_id),
      subject: data.subject,
      description: data.description,
    };
    try {
      await createRequest(requestBody).unwrap();
      onNewRequest();
      setShowModal(true);
    } catch (err) {
      errorHandler(err as any);
    }
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

  return (
    <div className="mt-6">
      <section className="flex gap-4">
        <div className="w-1/2 ">
          <h1 className="text-xl font-medium">Requests Breakdown</h1>
          <section className="grid grid-cols-2 mt-4 gap-4">
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
        </div>
        <div className="w-1/2">
          <Card className=" w-full shadow-sm cursor-pointer">
            <div className="border-b p-4">
              <div className="flex justify-between items-center">
                <h1 className="font-medium">Do you have any Request?</h1>
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger>
                      <CircleAlert className="text-primary-1" />
                    </TooltipTrigger>
                    <TooltipContent className="w-40 text-center">
                      <Label className="font-light text-xs text-black text-center">
                        Your request will be addressed within 24 hours.
                      </Label>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className="text-xs mt-2 text-[#515151]">
                We are all ears! Tell us what you need, and we&apos;ll make it
                happen.
              </p>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex p-4 flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-normal  ">
                          Guest Name
                        </FormLabel>
                        <FormControl className="bg-transparent">
                          <Input
                            className=" font-light w-full  h-10 "
                            placeholder="Enter name "
                            {...field}
                            disabled
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500 font-light" />
                      </FormItem>
                    )}
                  />
                  <section className="flex items-center gap-3 w-full">
                    <section className="w-full">
                      <Label className="text-xs  font-normal">Apartment</Label>
                      <FormField
                        control={form.control}
                        name="shortlet_id"
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="h-10 w-full border-black/10 shadow-none mt-2">
                                <SelectValue
                                  placeholder="Select apartment"
                                  className="text-xs"
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {shortlet.length > 0 ? (
                                  <>
                                    {shortlet.map((item) => (
                                      <SelectItem
                                        key={item.shortlet.id}
                                        value={String(item.shortlet.id)}
                                      >
                                        {item.shortlet.name}
                                      </SelectItem>
                                    ))}
                                  </>
                                ) : (
                                  <p className="text-sm">No Apartment</p>
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-xs text-red-500 font-light" />
                          </FormItem>
                        )}
                      />
                    </section>
                    <section className="w-full">
                      <Label className="text-xs  font-normal">
                        Subject of Request
                      </Label>
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({}) => (
                          <FormItem>
                            <Select
                              onValueChange={(value) =>
                                form.setValue("subject", value)
                              }
                            >
                              <SelectTrigger className="h-10 w-full border-black/10 shadow-none mt-2">
                                <SelectValue
                                  placeholder="Select subject"
                                  className="text-xs"
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {apartmentOptions.map((tag) => (
                                  <SelectItem key={tag.id} value={tag.name}>
                                    {tag.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-xs text-red-500 font-light" />
                          </FormItem>
                        )}
                      />
                    </section>
                  </section>
                  <section>
                    <Label className="text-xs  font-normal">Description</Label>
                    <Textarea
                      placeholder="Tell us more"
                      className="mt-2 resize-none"
                      {...form.register("description")}
                    />
                  </section>
                  <LoadingButton
                    type="submit"
                    className="w-full  mt-5 h-11"
                    loading={createLoading}
                  >
                    Submit Request
                  </LoadingButton>
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
        showModal={showModal}
        setShowModal={setShowModal}
        onClose={() => setShowModal(false)}
        className="max-w-sm"
      >
        <section>
          <div className="w-full px-8 pt-4 flex-col flex justify-center items-center h-full">
            <Image
              src={"/images/box.png"}
              width={80}
              height={80}
              alt="success"
            />
            <h1 className="mt-6 font-medium">Thank You for Reaching Out</h1>
            <p className="text-gray-100 text-xs mt-1 text-center font-light">
              Your message has been received, and your request will be addressed
              shortly, Kindly check your dashboard for update on your request.
            </p>
            <div className="w-full gap-3 flex items-center my-6">
              <Button
                onClick={() => setShowModal(false)}
                className="w-full h-9 text-xs"
              >
                Done
              </Button>
            </div>
          </div>
        </section>
      </Modal>
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
    </div>
  );
};

export default MakeRequestComponent;
