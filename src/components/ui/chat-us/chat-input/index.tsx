/** @format */

import { Button } from "@/components/_shared/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/_shared/tooltip";
import {
  SendHorizontal,
  Smile,
  Plus,
  Image as Img,
  Camera,
  File,
  User,
} from "lucide-react";
import React from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { ChatInputProps } from "@/types/type";

const ChatInput = ({
  inputValue,
  setInputValue,
  textareaRef,
  handleTextareaKeyDown,
  handleSendMessage,
  showEmoji,
  emojiPickerRef,
  handleEmojiSelect,
  setShowEmoji,
  emojiIconRef,
  handleMenuClicked,
  showMenu,
}: ChatInputProps) => {
  const Actions = [
    {
      color: "#4da5fe",
      icon: <Img size={20} />,
      y: 82,
      title: "Photo",
    },
    {
      color: "#1b8cfe",
      icon: <User size={20} />,
      y: 152,
      title: "Contact",
    },

    {
      color: "#0172e4",
      icon: <Camera size={20} />,
      y: 222,
      title: "Image",
    },
    {
      color: "#0159b2",
      icon: <File size={20} />,
      y: 292,
      title: "Documents",
    },
  ];
  return (
    <div className="w-full  pt-4 bg-white sticky bottom-0 left-0 ">
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
        className={`w-full border max-h-28 min-h-20  overflow-y-auto rounded-lg   outline-none relative py-7 pr-16 pl-20 resize-none text-sm`}
        ref={textareaRef}
        rows={1}
        cols={50}
        onKeyDown={handleTextareaKeyDown}
      />
      <div className="absolute right-4 top-9 ">
        <button
          onClick={handleSendMessage}
          className="bg-primary-1  text-white w-10 h-10 rounded-full flex items-center justify-center"
        >
          <SendHorizontal size={20} />
        </button>
      </div>
      <div className="absolute flex items-center gap-2 left-4 top-9 ">
        <div
          className={`z-40 fixed bottom-[81px]`}
          style={{
            display: showEmoji ? "inline" : "none",
          }}
          ref={emojiPickerRef}
        >
          <Picker data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
        <div ref={emojiIconRef} onClick={() => setShowEmoji(!showEmoji)}>
          <Smile className="cursor-pointer" />
        </div>
        <div className="relative w-max">
          <div
            style={{
              position: "relative",
              display: showMenu ? "inline-block " : "none",
            }}
          >
            {Actions.map((el, index) => (
              <TooltipProvider key={index} delayDuration={0}>
                <Tooltip>
                  <div
                    className="absolute w-12 h-12 rounded-full flex justify-center items-center text-white"
                    style={{ top: -el.y, backgroundColor: el.color }}
                  >
                    <TooltipTrigger>{el.icon}</TooltipTrigger>
                    <TooltipContent className="text-black font-light">
                      {el.title}
                    </TooltipContent>
                  </div>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
        <Button
          variant={"text"}
          className="m-0 p-0"
          onClick={handleMenuClicked}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
