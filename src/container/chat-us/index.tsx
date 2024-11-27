/** @format */
"use client";
import { useToast } from "@/components/_shared/toast/use-toast";
import ChatUsComponent from "@/components/ui/chat-us";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/redux/services/message";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ChatUsContainer = () => {
  const searchParams = useSearchParams();
  const idParams = searchParams.get("id");
  const { data, isLoading, refetch } = useGetMessagesQuery({});
  const { toast } = useToast();
  const [sendMessage] = useSendMessageMutation();
  const [inputValue, setInputValue] = useState("");
  const [hardCodedValue, setHardCodedValue] = useState("");

  useEffect(() => {
    if (idParams) {
      setHardCodedValue("Hi, thanks for reaching out to get your bookings. ");
    } else {
      setHardCodedValue("");
    }
  }, [idParams]);

  const handleSendMessage = async (message: string) => {
    const fullMessage = `${hardCodedValue}${message.trim()}`;
    if (message.trim() !== "") {
      try {
        await sendMessage({ message: fullMessage }).unwrap();
        setInputValue("");
        setHardCodedValue("");
        refetch();
      } catch (err) {
        const errorMessage =
          (err as any)?.data?.message ||
          "Failed to send message. Please try again.";
        toast({
          variant: "destructive",
          title: "Error!",
          description: errorMessage,
        });
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 5000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  return (
    <ChatUsComponent
      chatData={data}
      handleSendMessage={handleSendMessage}
      isLoading={isLoading}
      inputValue={inputValue}
      setInputValue={setInputValue}
      hardCodedValue={hardCodedValue}
    />
  );
};

export default ChatUsContainer;
