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

import { Textarea } from "@/components/_shared/textarea";
import { Label } from "@/components/_shared/label";
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

const MakeRequestComponent = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const pathName = usePathname();
  const form = useForm({
    defaultValues: {
      name: "",
      apartment: "",
      request: "",
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

  const onSubmit = (data: any) => {
    if (data) {
      setShowModal(true);
    }
    console.log(data);
  };

  return (
    <div className="mt-6">
      <section className="flex gap-4">
        <div className="w-1/2 ">
          <h1 className="text-xl font-medium">Requests Breakdown</h1>
          <section className="grid grid-cols-2 mt-4 gap-4">
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
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500 font-light" />
                      </FormItem>
                    )}
                  />
                  <section className="flex items-center gap-3 w-full">
                    <section className="w-full">
                      <Label className="text-xs  font-normal">Apartment</Label>
                      <Select>
                        <SelectTrigger className="h-10 w-full border-black/10 shadow-none text-gray-100 mt-2 ">
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
                    </section>
                    <section className="w-full">
                      <Label className="text-xs  font-normal">
                        Subject of Request
                      </Label>
                      <Select>
                        <SelectTrigger className="h-10 w-full border-black/10 shadow-none text-gray-100 mt-2">
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
                  <LoadingButton type="submit" className="w-full  mt-5 h-11">
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
          <Table className="mt-6">
            <TableHeader>
              <TableRow className="bg-[#EAEAEA] rounded-md">
                {headers.map((header) => (
                  <TableHead key={header} className="text-xs font-medium text-gray-500 ">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4].map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>12-02-2023</TableCell>
                  <TableCell>PD#00234</TableCell>
                  <TableCell>True_</TableCell>
                  <TableCell>Maintenance</TableCell>
                  <TableCell>
                    <Button variant="secondary" className="h-8 text-xs">
                      Pending
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
          </Table>
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
    </div>
  );
};

export default MakeRequestComponent;
