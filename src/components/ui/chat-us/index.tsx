/** @format */
"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ChatInput from "./chat-input";
import { formatChatTime } from "@/_shared/constants";
import ThunderLoader from "@/components/loader/thunder-loader";

interface ChatUsComponentProps {
  chatData: ChatApiResponse | undefined;
  handleSendMessage: (message: string) => void;
  isLoading: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  hardCodedValue: string;
}

const ChatUsComponent = ({
  chatData,
  handleSendMessage,
  isLoading,
  setInputValue,
  inputValue,
  hardCodedValue,
}: ChatUsComponentProps) => {
  const allChatMessageData = chatData && chatData.data.data;
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const emojiIconRef = useRef<HTMLDivElement | null>(null);

  const scrollChatToBottom = () => {
    if (chatContainerRef.current) {
      const chatContainer = chatContainerRef.current;
      const paddingBottom = 100;

      chatContainer.style.display = "none";
      chatContainer.offsetHeight;
      chatContainer.style.display = "block";

      const lastMessage = chatContainer.lastElementChild as HTMLElement;
      if (lastMessage) {
        chatContainer.scrollTop =
          lastMessage.offsetTop +
          lastMessage.offsetHeight -
          chatContainer.clientHeight +
          paddingBottom;
      }
    }
  };

  const handleTextareaKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [inputValue]);

  const handleEmojiSelect = (emoji: any) => {
    setInputValue(inputValue + emoji.native);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target as Node) &&
      !emojiIconRef.current?.contains(event.target as Node)
    ) {
      setShowEmoji(false);
    }
  };

  useEffect(() => {
    if (showEmoji) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmoji]);

  useEffect(() => {
    scrollChatToBottom();
  }, [allChatMessageData]);

  function handleMenuClicked() {
    setShowMenu((prev) => !prev);
  }

  const sortedChatMessages =
    allChatMessageData?.slice().sort((a, b) => {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }) || [];

  return (
    <div className="flex  flex-col justify-between h-screen p-4">
      <div className="overflow-y-auto" ref={chatContainerRef}>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <ThunderLoader />{" "}
          </div>
        ) : sortedChatMessages && sortedChatMessages.length > 0 ? (
          sortedChatMessages.map((chat, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                chat.sender !== "admin" ? "items-end" : "items-start"
              } `}
            >
              <section className=" flex flex-col">
                <div
                  className={`shadow-sm border border-black/5  max-w-xs px-4 py-2 rounded-lg ${
                    chat.sender !== "admin"
                      ? "border-r-4 mr-14 border-r-primary-1 "
                      : "border-l-4 ml-14 border-l-primary-1 "
                  }  `}
                >
                  <p className="text-sm break-words">{chat.message}</p>
                  <span
                    className={`text-xs mt-1 flex justify-end font-light text-gray-500`}
                  >
                    {formatChatTime(chat.created_at)}
                  </span>
                </div>
                <div className=" relative bottom-10">
                  <Image
                    src={
                      chat.sender !== "admin"
                        ? "/images/user.png"
                        : "/images/logos.png"
                    }
                    width={40}
                    height={40}
                    alt=""
                    className={`${
                      chat.sender !== "admin" ? "float-right" : "float-left"
                    }`}
                  />
                </div>
              </section>
            </div>
          ))
        ) : (
          <div className="text-center flex flex-col items-center justify-center h-screen text-gray-500">
            <Image
              src={"/images/no-message.png"}
              width={100}
              height={100}
              alt="no message"
              unoptimized
            />{" "}
            No messages yet
          </div>
        )}
      </div>
      <ChatInput
        emojiIconRef={emojiIconRef}
        emojiPickerRef={emojiPickerRef}
        handleEmojiSelect={handleEmojiSelect}
        handleMenuClicked={handleMenuClicked}
        handleSendMessage={() => handleSendMessage(inputValue)}
        handleTextareaKeyDown={handleTextareaKeyDown}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setShowEmoji={setShowEmoji}
        showEmoji={showEmoji}
        textareaRef={textareaRef}
        showMenu={showMenu}
        hardCodedValue={hardCodedValue}
      />
    </div>
  );
};

export default ChatUsComponent;
