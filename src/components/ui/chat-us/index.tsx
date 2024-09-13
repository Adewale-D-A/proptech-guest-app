/** @format */
"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { chatData } from "@/_shared/data";
import ChatInput from "./chat-input";

const ChatUsComponent = () => {
  const [chatMessages, setChatMessages] = useState(chatData);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [showMenu, setShowMenu] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const emojiIconRef = useRef<HTMLDivElement | null>(null);

  // scroll down effect when chat is new
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

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        sender: "me",
        message: inputValue,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");

      // Scroll to bottom after the state has updated
      setTimeout(() => {
        scrollChatToBottom();
      }, 0);
    }
  };

  const handleTextareaKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
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
  }, [chatMessages]);

  function handleMenuClicked() {
    setShowMenu((prev) => !prev);
  }

  return (
    <div className="flex  flex-col justify-between h-screen p-4">
      <div className="overflow-y-auto" ref={chatContainerRef}>
        {chatMessages.map((chat, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              chat.sender === "me" ? "items-end" : "items-start"
            } `}
          >
            <section className=" flex flex-col">
              <div
                className={`shadow-sm border border-black/5  max-w-xs px-4 py-2 rounded-lg ${
                  chat.sender === "me"
                    ? "border-r-4 mr-14 border-r-primary-1 "
                    : "border-l-4 ml-14 border-l-primary-1 "
                }  `}
              >
                <p className="text-sm break-words">{chat.message}</p>
                <span
                  className={`text-xs mt-1 flex justify-end font-light text-gray-500`}
                >
                  {chat.time}
                </span>
              </div>
              <div className=" relative bottom-10">
                <Image
                  src={
                    chat.sender === "me"
                      ? "/images/user.png"
                      : "/images/logos.png"
                  }
                  width={40}
                  height={40}
                  alt=""
                  className={`${
                    chat.sender === "me" ? "float-right" : "float-left"
                  }`}
                />
              </div>
            </section>
          </div>
        ))}
      </div>
      <ChatInput
        emojiIconRef={emojiIconRef}
        emojiPickerRef={emojiPickerRef}
        handleEmojiSelect={handleEmojiSelect}
        handleMenuClicked={handleMenuClicked}
        handleSendMessage={handleSendMessage}
        handleTextareaKeyDown={handleTextareaKeyDown}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setShowEmoji={setShowEmoji}
        showEmoji={showEmoji}
        textareaRef={textareaRef}
        showMenu={showMenu}
      />
    </div>
  );
};

export default ChatUsComponent;
