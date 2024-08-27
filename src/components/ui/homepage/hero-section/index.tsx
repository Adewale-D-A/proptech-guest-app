/** @format */
"use client";
import { Button } from "@/components/_shared/button";
import AnimatedContainer from "@/components/_shared/framer/animate-div";
import GradualSpacing from "@/components/_shared/framer/gradual-spacing";
import Link from "next/link";
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
    image: "/images/apartment-6.jpg",
    title: "PropTech for Everyone",
    text: "Designed to solve all your property and rental problems.",
  },
  {
    id: 4,
    image: "/images/apartment-5.jpg",
    title: "PropTech for Everyone",
    text: "Designed to solve all your property and rental problems.",
  },
  {
    id: 5,
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
      className="relative w-full h-[640px] overflow-hidden"
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === activeSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >sl
          {/* Black background overlay */}
          <div className="absolute inset-0 bg-black opacity-60 z-20" />

          <div className="relative flex flex-col items-center justify-center w-full h-full z-30">
            <h1 className="text-white text-3xl  md:text-4xl lg:text-6xl font-semibold">
              <GradualSpacing text={slide.title} />{" "}
            </h1>
            <AnimatedContainer>
              <p className="text-white text-center sm:text-xl mt-4">{slide.text}</p>
            </AnimatedContainer>
            <AnimatedContainer className="flex mt-12 items-center gap-x-3">
              <Link href={"/shortlets"}>
                <Button className="text-xs w-28 h-8">Shortlet</Button>
              </Link>
              <Button
                variant={"outline"}
                className="text-xs w-56 h-8 border-white text-white"
              >
                Split Eazy (Shared Housing)
              </Button>
            </AnimatedContainer>
          </div>
        </div>
      ))}

      {/* Dots for navigation */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-1 z-30">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full border border-white cursor-pointer ${
              index === activeSlide ? "bg-white" : ""
            }`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
