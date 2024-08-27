/** @format */
"use client";
import React, { useState } from "react";
import { TbMessageReply } from "react-icons/tb";
import ReusableCard from "../reusable-card";
import { Card } from "@/components/_shared/card";
import { Form } from "@/components/_shared/form";
import { LoadingButton } from "@/components/_shared/loading-button";
import { ScanSearch } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/_shared/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";
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

import { usePathname, useRouter } from "next/navigation";
import VolumeProgressBar from "./volume-progress";
import FirstStepForm from "./step_1";
import SecondStepForm from "./step_2";
import ThirdStepForm from "./step_3";

const AdditionalServicesComponent = () => {
  const [volume, setVolume] = useState<number>(0);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const pathName = usePathname();
  const form = useForm({
    defaultValues: {
      name: "",
      apartment: "",
      request: "",
      description: "",
    },
  });

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      setVolume(volume - 5);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      setVolume(volume + 5);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  // Form Submission Handler
  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    // Submit your form data here
    // After submission, you might want to reset the form or perform any other actions
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

  return (
    <div className="mt-6">
      <section className="flex gap-4">
        <div className="w-1/2">
          <h1 className="text-xl font-medium">Additional Services Breakdown</h1>
          <Card className=" mt-4 shadow-sm h-[595px] p-4">
            <section className="grid grid-cols-2 gap-4">
              <ReusableCard
                text="Pending Requests"
                bookingAmt="100"
                icon={<TbMessageReply size={16} />}
                color="#E6F2FF"
                showBtn
                btnText="View Pending Requests"
                onClick={handleNavigate}
              />
              <ReusableCard
                text="Total Requests"
                bookingAmt="100"
                icon={<TbMessageReply size={16} />}
                color="#E9E9E9"
              />
              <ReusableCard
                text="Completed Requests"
                bookingAmt="100"
                icon={<TbMessageReply size={16} />}
                color="#E9E9E9"
              />
              <ReusableCard
                text="Cancelled Requests"
                bookingAmt="100"
                icon={<TbMessageReply size={16} />}
                color="#E9E9E9"
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
                    {step === 2 && <SecondStepForm form={form} />}
                    {step === 3 && <ThirdStepForm form={form} />}
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
                  <LoadingButton
                    type={step === 3 ? "submit" : "button"}
                    onClick={handleNext}
                    className="w-full ml-2 text-xs h-9"
                  >
                    {step === 1
                      ? "Continue"
                      : step === 2
                      ? "Proceed to Payment"
                      : "Make Payment"}
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
                  <TableHead className="text-xs text-gray-100 "> {h}</TableHead>
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
                    <div className="w-24 py-2 rounded  bg-[#00C814]/10 flex justify-center items-center">
                      <p className="text-xs text-[#00C814]">Completed</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-xs">
                    <ScanSearch className="text-[#00C814] " />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>
    </div>
  );
};

export default AdditionalServicesComponent;
