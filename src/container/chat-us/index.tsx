/** @format */
"use client";
import { useToast } from "@/components/_shared/toast/use-toast";
import ChatUsComponent from "@/components/ui/chat-us";
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from "@/redux/services/message";
import React, { useEffect, useState } from "react";

const ChatUsContainer = () => {
  const { data, isLoading, refetch } = useGetMessagesQuery({});
  const { toast } = useToast();
  const [sendMessage] = useSendMessageMutation();
  const [inputValue, setInputValue] = useState("");
  const handleSendMessage = async (message: string) => {
    if (message.trim() !== "") {
      try {
        await sendMessage({ message }).unwrap();
        setInputValue("");
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
    />
  );
};

export default ChatUsContainer;
