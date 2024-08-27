/** @format */

import { cn } from "@/_shared/cn";
import { Card } from "@/components/_shared/card";
import Image from "next/image";
import { TiStarFullOutline } from "react-icons/ti";

export const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <Card
      className={cn(
        "relative w-full cursor-pointer overflow-hidden rounded-xl border p-4",

        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",

        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <blockquote className="mt-2 text-sm font-light">{body}</blockquote>
      <section className="flex justify-between items-center mt-3">
        <div className="flex flex-row p-3 items-center gap-2">
          <img
            className="rounded-full"
            width="32"
            height="32"
            alt=""
            src={img}
          />
          <div className="flex flex-col">
            <figcaption className="text-sm  ">{name}</figcaption>
            <p className="text-xs font-light text-[#707070]">{username}</p>
          </div>
        </div>
        <div className="relative">
          <Image src="/social/shape.png" width={75} height={30} alt="rate" />
          <div className="flex items-center absolute top-1/3 left-4 gap-1">
            <TiStarFullOutline color="#FFA500" size={16} />
            <span className="text-xs">5.0</span>
          </div>
        </div>
      </section>
    </Card>
  );
};
