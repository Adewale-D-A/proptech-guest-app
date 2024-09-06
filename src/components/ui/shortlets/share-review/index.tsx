/** @format */

import { reviews } from "@/_shared/data";
import Marquee from "@/components/_shared/cards-animation";
import Image from "next/image";
import React from "react";
import { ReviewCard } from "./review-card";
import AnimatedContainer from "@/components/_shared/framer/animate-div";

const ShareReview = () => {
  const shareImage = [
    "/social/linkl.png",
    "/social/twit.png",
    "/social/wht.png",
    "/social/instagram-icon.png",
    "/social/fbs.png",
    "/social/mail.png",
  ];
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  return (
    <AnimatedContainer className="mt-10">
      <div className="">
        <h1 className="text-sm">SHARE</h1>
        <section className="flex items-center gap-6 mt-4">
          {shareImage.map((img) => (
            <Image key={img} width={24} height={24} alt="share" src={img} />
          ))}
        </section>
        <section className="mt-20">
          <h1 className="text-center text-4xl font-medium">
            Guest Reviews: Discover What <br className="md:flex hidden" /> Our
            Guests Have to Say!
          </h1>
        </section>
      </div>
      {/* <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden    ">
        <Marquee pauseOnHover className="[--duration:28s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:28s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div> */}
      <div className="flex flex-col mt-10 pb-10 gap-4">
        <div className="grid  gap-4 grid-cols-3 w-full">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </div>
        <div className="grid gap-4 grid-cols-3 w-full">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default ShareReview;
