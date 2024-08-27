/** @format */
"use client";

import { RiQuestionnaireLine } from "react-icons/ri";
import { Card } from "@/components/_shared/card";
import { PhoneIncoming, MoveRight, ChevronUp, ChevronDown } from "lucide-react";
import React, { ReactNode, useState } from "react";
import { RiChatSmile2Line } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
const faqData = [
  {
    question: "What amenities are included in the short let apartments?",
    answer:
      "The amenities included in each short-term rental vary depending on the property. Common amenities may include Wi-Fi, kitchen facilities, parking, laundry facilities, air conditioning, and more. You can view what to expect for each listing on our website's listing details page.",
  },
  {
    question:
      " Is there a maximum no of days per booking for short let rentals?",
    answer:
      "You can track your order using the tracking number provided in the email.",
  },
  {
    question: "How do I cancel or modify my booking?",
    answer: "Yes, our customer support is available 24/7 via chat and phone.",
  },
  {
    question: "What safety measures are in place for each apartment ",
    answer: "Yes, our customer support is available 24/7 via chat and phone.",
  },
  // Add more questions and answers here
];

const ContactPageComponent = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const ReusableCard = ({
    icon,
    headerTitle,
    text,
    chatOption,
    onClick,
  }: {
    icon: ReactNode;
    headerTitle: string;
    text: string;
    chatOption?: boolean;
    onClick?: () => void;
  }) => {
    return (
      <Card className="w-full shadow-sm p-4 h-48 flex flex-col justify-between">
        <section className="flex flex-col gap-4">
          <div className="bg-primary-1 w-10 h-10 flex justify-center text-white items-center rounded">
            {icon}
          </div>
          <div>
            <h1 className="font-medium text-lg">{headerTitle}</h1>
            <p className="text-gray-100 font-light text-sm">{text}</p>
          </div>
        </section>
        <div
          className="text-primary-1 text-xs font-medium flex items-center gap-2 underline cursor-pointer"
          onClick={() => {
            chatOption ? router.push(`${pathName}/chat-with-us`) : null;
          }}
        >
          {chatOption ? "Send a message" : "+234-000-000-0000"}{" "}
          {chatOption ? <MoveRight /> : null}
        </div>
      </Card>
    );
  };

  return (
    <div className="mt-6">
      <div>
        <h1 className="text-xl font-medium">Get in Touch</h1>
        <p className="text-sm mt-2 font-light text-[#6D6D6D]">
          We are happy to help you if you have any questions. Put a call through
          or Message us, one of our agents will respond to you
        </p>
      </div>
      <div className="flex mt-6 items-center gap-4 w-full">
        <ReusableCard
          text="    We respond promptly to incoming calls"
          headerTitle="Call Us"
          icon={<PhoneIncoming size={20} />}
        />
        <ReusableCard
          headerTitle="Chat with us"
          text="We respond promptly to your messages"
          icon={<RiChatSmile2Line size={20} />}
          chatOption
        />
      </div>
      <section>
        <Card className=" shadow-sm mt-6  gap-4">
          <div className="flex gap-3 border-b p-4 px-8">
            <RiQuestionnaireLine size={28} />
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-medium">Any questions? We got you</h1>
              <p className="text-gray-100 text-xs font-light">
                The team is committed to providing support and answers to make
                booking short let less overwhelming and easier for you.
              </p>
            </div>
          </div>
          <section className="py-4 px-8">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="shadow-sm mt-4 py-4 cursor-pointer"
                onClick={() => toggleAnswer(index)}
              >
                <div className="flex justify-between items-center  pb-2">
                  <div className="flex items-center gap-3">
                    <h1 className="font-medium">{item.question}</h1>
                  </div>
                  <div>
                    {openIndex === index ? <ChevronUp /> : <ChevronDown />}
                  </div>
                </div>
                {openIndex === index && (
                  <div className="mt-4 text-gray-100 text-sm font-light">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </section>
        </Card>
      </section>
    </div>
  );
};

export default ContactPageComponent;
