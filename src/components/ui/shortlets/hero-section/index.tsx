/** @format */
"use client";

import AnimatedContainer from "@/components/_shared/framer/animate-div";
import GradualSpacing from "@/components/_shared/framer/gradual-spacing";
import React, { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/images/apartment-1.jpg",
    title: "PropTech for Everyone",
    text: "Designed to solve all your property and rental problems.",
  },
  {
    id: 2,
    image: "/images/apartment-2.jpg",
    title: "PropTech for Everyone",
    text: "Designed to solve all your property and rental problems.",
  },
  {
    id: 3,
    image: "/images/apartment-3.jpg",
    title: "PropTech for Everyone",
    text: "Designed to solve all your property and rental problems.",
  },
];

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="hero-section"
      className="relative w-full h-[640px] overflow-hidden "
    >
      <div
        className={`absolute w-full h-full`}
        style={{
          backgroundImage: `url(/images/apartment-6.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Black background overlay */}
        <div className="absolute inset-0 bg-black opacity-60 z-20" />

        <div className="relative flex flex-col items-center justify-center w-full h-full z-30 px-4">
          <h1 className="text-white text-6xl font-semibold">
            <GradualSpacing text={"Shortlets"} />{" "}
          </h1>
          <AnimatedContainer>
            <p className="text-white text-center text-xl mt-4">
              From a room for a night to an apartment for as long as you like
            </p>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
