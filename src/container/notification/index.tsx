/** @format */
"use client";
import { useToast } from "@/components/_shared/toast/use-toast";
import NotificationComponent from "@/components/ui/notification";
import {
  useGetNotificationsQuery,
  useReadNotificationMutation,
} from "@/redux/services/notification";
import React, { useState, useEffect } from "react";

const NotificationContainer = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data, isLoading, error } = useGetNotificationsQuery({
    start_date: startDate,
    end_date: endDate,
    search: searchTerm,
  });

  const [readNotification] = useReadNotificationMutation();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(data?.data.data || []);

  useEffect(() => {
    if (data) {
      setNotifications(data?.data.data);
    }
  }, [data]);
  const handleReadNotification = async (id: string) => {
    try {
      setNotifications((prev) =>
        prev.map((notify) =>
          String(notify.id) === id ? { ...notify, is_read: true } : notify
        )
      );
      await readNotification(id).unwrap();
    } catch (err) {
      const errorMessage =
        (err as any)?.data?.message || "Notification failed. Please try again.";
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    }
  };

  return (
    <NotificationComponent
      notificationData={notifications}
      isLoading={isLoading}
      readNotification={handleReadNotification}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      setSearchTerm={setSearchTerm}
      searchTerm={searchTerm}
    />
  );
};

export default NotificationContainer;
