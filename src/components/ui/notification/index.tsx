/** @format */

import { Button } from "@/components/_shared/button";
import { Card } from "@/components/_shared/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/_shared/select";
import { DatePicker } from "@/components/date-picker";
import SearchInput from "@/components/search-input";
import { NotificationData } from "@/types/type";
import React, { useState } from "react";
import ThunderLoader from "@/components/loader/thunder-loader";
import { formatRelativeTime } from "@/components/relative-time-format";
import { useToast } from "@/components/_shared/toast/use-toast";

const NotificationComponent = ({
  notificationData,
  isLoading,
  readNotification,
  setStartDate,
  setEndDate,
  setSearchTerm,
  searchTerm,
}: {
  notificationData: NotificationData[];
  isLoading: boolean;
  readNotification: any;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
}) => {
  const { toast } = useToast();
  const [filter, setFilter] = useState("all-notification");
  const handleReadNotification = async (id: string) => {
    try {
      await readNotification(id).unwrap();
    } catch (err) {}
  };

  // Filter the notificationData based on the filter selection
  const filteredNotifications = notificationData.filter((notify) => {
    if (filter === "read-notification") {
      return notify.is_read;
    }
    if (filter === "un-read-notification") {
      return !notify.is_read;
    }
    return true; // for "all-notification", return all notifications
  });

  if (isLoading)
    return (
      <section className="flex items-center justify-center h-screen">
        <ThunderLoader />
      </section>
    );

  console.log("notificationData", notificationData);

  return (
    <Card className="mt-6 shadow-sm">
      <div className="flex items-center justify-between border-b p-4">
        <h1 className="text-lg font-medium">All Notification</h1>
        <SearchInput
          className="w-80"
          placeholder="Search by date, subject, etc..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <section className="flex items-center ">
          <div className="flex items-center gap-1">
            <p className="text-xs">Filter:</p>
            <DatePicker
              className="w-60 mt-0 h-9"
              date={undefined}
              setDate={() => {}}
            />
          </div>
          <div className="flex ml-4 items-center  gap-1">
            <p className="text-xs">Sort by: </p>
            <Select onValueChange={setFilter}>
              <SelectTrigger className="h-9 w-60 border-black/10 shadow-none text-gray-100 text-xs">
                <SelectValue placeholder="" className="text-xs " />
              </SelectTrigger>

              <SelectContent className="border-none">
                {[
                  { id: "all-notification", name: "All Notifications" },
                  { id: "read-notification", name: "Read Notifications" },
                  { id: "un-read-notification", name: "Un-read Notification" },
                ].map((tag) => (
                  <SelectItem
                    key={tag.id}
                    value={tag.id}
                    className="border-none text-xs"
                  >
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="font-semibold text-[#017EFF]" variant={"text"}>
            Mark all as read
          </Button>
        </section>
      </div>

      <section className="flex flex-col gap-2 p-2 ">
        {filteredNotifications && filteredNotifications.length > 0 ? (
          <section>
            {filteredNotifications &&
              filteredNotifications?.map((notify) => (
                <section
                  className="flex justify-between hover:bg-[#E9E9E9] p-2 cursor-pointer rounded"
                  key={notify.id}
                  onClick={() => handleReadNotification(String(notify.id))}
                >
                  <div className="w-full">
                    <div
                      className={` float-left  w-2 h-2 rounded-full mr-2 relative top-1.5 ${
                        notify.is_read ? "" : "bg-[#017EFF]"
                      } `}
                    />
                    <div className="pl-4">
                      <p className="text-sm ">{notify.title}</p>
                      <p className="text-xs font-light w-2/3 text-gray-100 mt-1">
                        {notify.message}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-100 w-20 ">
                    {notify?.created_at &&
                      formatRelativeTime(notify.created_at)}
                  </p>
                </section>
              ))}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-4"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5h2V17h-2v-.5zm2-2.5h-2V7h2v7z"
                fill="#017EFF"
              />
            </svg>

            <p className="text-sm font-medium">No notifications available</p>
          </div>
        )}
      </section>
    </Card>
  );
};

export default NotificationComponent;
