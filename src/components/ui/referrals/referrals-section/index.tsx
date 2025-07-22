/** @format */
"use client";
import { Button } from "@/components/_shared/button";
import { Card } from "@/components/_shared/card";
import Image from "next/image";
import React, { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";
import {
  useGenerateReferralCodeMutation,
  useGetReferralsQuery,
  useUpdateReferralCodeMutation,
} from "@/redux/services/referral";
import { SkeletonTable } from "@/components/skeleton-preview";
import { format } from "date-fns";
import { useToast } from "@/components/_shared/toast/use-toast";
import { FiCopy, FiEdit2, FiCheck, FiX } from "react-icons/fi";
import { Input } from "@/components/_shared/input";
import useCanvasConfetti from "@/components/_shared/animation/fire_work_3";
import { use99Selector } from "@/redux/hooks/hooks";
import { selectCurrentUser } from "@/redux/slices/authSlice";
import { updateUserReferralCode } from "@/redux/slices/authSlice";
import { use99Dispatch } from "@/redux/hooks/hooks";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/_shared/pagination";
const ReferralsSection = () => {
  const currentUser = use99Selector(selectCurrentUser);
  const dispatch = use99Dispatch();
  const { toast } = useToast();

  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  // State for editing referral code
  const [isEditing, setIsEditing] = useState(false);
  const [editingCode, setEditingCode] = useState("");

  // Build query parameters
  const queryParams = {
    page,
    limit,
    sort: sortOrder,
    ...(searchQuery && { search: searchQuery }),
    ...(startDate && { start_date: format(startDate, "yyyy-MM-dd") }),
    ...(endDate && { end_date: format(endDate, "yyyy-MM-dd") }),
  };

  const { data, isLoading } = useGetReferralsQuery(queryParams);

  // Mutation hooks
  const [generateReferralCode, { isLoading: isGenerating }] =
    useGenerateReferralCodeMutation();
  const [updateReferralCode, { isLoading: isUpdating }] =
    useUpdateReferralCodeMutation();

  const socialData = [
    "/link.png",
    "/twitter.png",
    "/whatsapp.png",
    "/insta.png",
    "/fb.png",
    "/mail.png",
  ];

  const { handleClickCanvas } = useCanvasConfetti();

  // Handler for generating new referral code
  const handleGenerateReferralCode = async () => {
    try {
      const response = await generateReferralCode().unwrap();
      if (response && response.data && response.data.referral_code) {
        // Update the user's referral code in the Redux store
        dispatch(updateUserReferralCode(response.data.referral_code));

        toast({
          variant: "default",
          title: "Success!",
          description: `New referral code generated: ${response.data.referral_code}`,
        });
        handleClickCanvas();
      }
    } catch (err) {
      const errorMessage =
        (err as any)?.data?.message || "Failed to generate the code.";
      toast({
        variant: "destructive",
        title: "Error!",
        description: errorMessage,
      });
    }
  };

  // Clear filters handler
  const handleClearFilters = () => {
    setSearchQuery("");
    setStartDate(undefined);
    setEndDate(undefined);
    setSortOrder("desc");
    setPage(1);
  };

  // Handler for updating referral code
  const handleUpdateReferralCode = async (newCode: string) => {
    try {
      const response = await updateReferralCode({
        referral_code: newCode,
      }).unwrap();
      if (response && response.data && response.data.referral_code) {
        // Update the user's referral code in the Redux store
        dispatch(updateUserReferralCode(response.data.referral_code));

        toast({
          variant: "default",
          title: "Success!",
          description: `Referral code updated to: ${response.data.referral_code}`,
        });

        // Exit edit mode
        setIsEditing(false);
        setEditingCode("");
      }
    } catch (err) {
      const errorMessage =
        (err as any)?.data?.message || "Failed to update the code.";
      toast({
        variant: "destructive",
        title: "Error!",
        description: errorMessage,
      });
    }
  };

  // Handler for starting edit mode
  const handleStartEdit = () => {
    setIsEditing(true);
    setEditingCode(currentUser?.referral_code || "");
  };

  // Handler for canceling edit mode
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingCode("");
  };

  // Handler for saving edited code
  const handleSaveEdit = () => {
    const trimmedCode = editingCode.trim();

    if (!trimmedCode) {
      toast({
        variant: "destructive",
        title: "Invalid Code",
        description: "Referral code cannot be empty.",
      });
      return;
    }

    if (trimmedCode === currentUser?.referral_code) {
      // No changes made, just cancel edit mode
      handleCancelEdit();
      return;
    }

    // Check minimum length (you can adjust this)
    if (trimmedCode.length < 3) {
      toast({
        variant: "destructive",
        title: "Invalid Code",
        description: "Referral code must be at least 3 characters long.",
      });
      return;
    }

    handleUpdateReferralCode(trimmedCode);
  };

  const handleCopyCode = () => {
    if (currentUser?.referral_code && !isEditing) {
      navigator.clipboard.writeText(currentUser?.referral_code);
      toast({
        variant: "default",
        title: "Copied!",
        description: "Referral code copied to clipboard!",
      });
    } else if (isEditing) {
      toast({
        variant: "destructive",
        title: "Cannot copy",
        description: "Please save or cancel editing first.",
      });
    }
  };

  const headers = [
    "S/N",
    "Date of Request ",
    "Referral ID",
    "Name of User",
    "Date Used",
    "Status of Ref link",
  ];
  const skeletonRows = Array.from({ length: 5 }, (_, index) => (
    <SkeletonTable key={index} />
  ));
  return (
    <>
      <section className="">
        <Card className="w-full h-[414px] shadow-sm cursor-pointer flex items-center ">
          <section className="flex gap-4 items-center justify-between">
            <div className="w-1/2 pl-10 flex flex-col gap-3">
              <h1 className="text-3xl font-medium leading-[44px]">
                Earn discounts by referring others and enjoy special prices!
              </h1>
              <p className="text-sm font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore.
              </p>

              <section>
                <section className="border h-12 rounded-md flex justify-between items-center px-2">
                  {isEditing ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        value={editingCode}
                        onChange={(e) => setEditingCode(e.target.value)}
                        className="h-8 text-sm border-none shadow-none focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter referral code"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSaveEdit();
                          } else if (e.key === "Escape") {
                            handleCancelEdit();
                          }
                        }}
                        autoFocus
                      />
                      <div className="flex items-center gap-1">
                        <Button
                          onClick={handleSaveEdit}
                          disabled={isUpdating}
                          size="sm"
                          className="h-6 w-6 p-0"
                          variant="ghost"
                          title={isUpdating ? "Updating..." : "Save changes"}
                        >
                          {isUpdating ? (
                            <div className="h-3 w-3 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
                          ) : (
                            <FiCheck className="h-3 w-3 text-green-600" />
                          )}
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          size="sm"
                          className="h-6 w-6 p-0"
                          variant="ghost"
                        >
                          <FiX className="h-3 w-3 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 flex-1">
                        <p className="flex-1">
                          {isGenerating
                            ? "Generating..."
                            : currentUser?.referral_code}
                        </p>
                        <Button
                          onClick={handleStartEdit}
                          size="sm"
                          className="h-6 w-6 p-0"
                          variant="ghost"
                          title="Edit referral code"
                        >
                          <FiEdit2 className="h-3 w-3 text-gray-600" />
                        </Button>
                      </div>
                    </>
                  )}

                  <div className="flex items-center gap-2 ml-2">
                    <Button
                      onClick={handleGenerateReferralCode}
                      disabled={isGenerating || isEditing}
                      className="h-8 text-xs"
                    >
                      {isGenerating ? "Generating..." : "Generate New"}
                    </Button>
                    <div
                      className={`flex bg-[#EAEAEA] w-20 h-8 rounded justify-center items-center gap-2 ${
                        isEditing
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      <p className=" text-sm">copy</p>
                      <FiCopy
                        className={
                          isEditing ? "cursor-not-allowed" : "cursor-pointer"
                        }
                        onClick={handleCopyCode}
                      />{" "}
                    </div>
                  </div>
                </section>
                <section className="flex items-center gap-10 mt-4">
                  <p>SHARE</p>
                  <div className="flex items-center gap-6">
                    {socialData.map((data) => (
                      <section
                        className="border w-10 h-10 flex justify-center items-center rounded-full"
                        key={data}
                      >
                        <Image src={data} alt="" width={16} height={16} />
                      </section>
                    ))}
                  </div>
                </section>
              </section>
            </div>
            <div className="w-1/2 flex justify-end ">
              <Image
                src={"/images/rafiki.png"}
                width={508}
                height={374}
                alt=""
              />
            </div>
          </section>
        </Card>
        <Card className="shadow-sm  mt-10  p-4">
          <div className="flex items-center justify-between">
            <h1 className="font-medium">Referral History</h1>
            <SearchInput
              className="w-[28rem]"
              placeholder="Search apartment by  name, apartment type, No of Nights"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <section className="flex  items-center gap-3">
              <div className="flex items-center gap-1">
                <p className="text-xs">Filter:</p>
                <DatePicker
                  date={startDate}
                  setDate={setStartDate}
                  className="w-60 mt-0 h-9"
                  removeBg={true}
                />
              </div>
              <div className="flex items-center  gap-1">
                <p className="text-xs">Sort by:</p>
                <Select
                  value={sortOrder}
                  onValueChange={(value: "asc" | "desc") => setSortOrder(value)}
                >
                  <SelectTrigger className="h-9 w-20 border-black/10 shadow-none text-gray-100 ">
                    <SelectValue placeholder="" className="text-xs " />
                  </SelectTrigger>

                  <SelectContent className="border-none">
                    <SelectItem value="desc" className="border-none">
                      Newest - Oldest
                    </SelectItem>
                    <SelectItem value="asc" className="border-none">
                      Oldest - Newest
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleClearFilters}
                variant="outline"
                size="sm"
                className="h-9"
              >
                Clear Filters
              </Button>
            </section>
          </div>
          {isLoading ? (
            <div>{skeletonRows}</div>
          ) : data && data.data && data?.data.data.length > 0 ? (
            <>
              <Table className="mt-4 rounded-md">
                <TableHeader className="rounded-md">
                  <TableRow className="bg-[#EAEAEA] rounded-md ">
                    {headers.map((h) => (
                      <TableHead key={h} className="text-xs text-gray-100 ">
                        {" "}
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data &&
                    data.data &&
                    data.data.data.map((referral, index) => (
                      <TableRow key={referral.id}>
                        <TableCell className="font-medium text-xs">
                          {index + 1}
                        </TableCell>
                        <TableCell className="flex items-center gap-5">
                          {format(
                            referral.referred_user.created_at,
                            "yyyy/MM/dd"
                          )}
                        </TableCell>
                        <TableCell className="font-medium text-xs">
                          {referral.referral_code}
                        </TableCell>
                        <TableCell className="font-medium text-xs">
                          {referral?.referred_user.first_name}{" "}
                          {referral?.referred_user.last_name}
                        </TableCell>
                        <TableCell className="font-medium text-xs flex items-center gap-5">
                          {format(
                            referral.referred_user.updated_at,
                            "yyyy/MM/dd"
                          )}
                        </TableCell>
                        <TableCell className="font-medium text-xs">
                          <div className="w-20 py-2 rounded-full  bg-[#E9E9E9] flex justify-center items-center">
                            <p className="text-xs  font-light">Used</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>

              {/* Pagination Controls */}
              {data?.data && data.data.last_page > 1 && (
                <div className="mt-4 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setPage(Math.max(1, page - 1))}
                          className={
                            page === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {Array.from(
                        { length: Math.min(5, data.data.last_page) },
                        (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationLink
                                onClick={() => setPage(pageNum)}
                                isActive={page === pageNum}
                                className="cursor-pointer"
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                      )}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setPage(Math.min(data.data.last_page, page + 1))
                          }
                          className={
                            page === data.data.last_page
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="text-center mt-4">no referral data</div>
          )}
        </Card>
      </section>
    </>
  );
};

export default ReferralsSection;
