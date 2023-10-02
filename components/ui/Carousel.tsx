"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselProps = {
  children: React.ReactNode;
  currentIndex: number;
  handlePrevious: () => void;
  handleNext: () => void;
};

const Carousel = ({
  children,
  currentIndex,
  handlePrevious,
  handleNext,
}: CarouselProps) => {
  return (
    <div className="relative w-full">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {React.Children.map(children, (child, index) => (
          <div
            className={`${
              index === currentIndex
                ? "translate-x-0"
                : index > currentIndex
                ? "translate-x-full"
                : "-translate-x-full"
            } duration-700 ease-in-out absolute inset-0 transition-transform transform`}
          >
            <div className="flex justify-center items-center">{child}</div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
        onClick={handlePrevious}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 shadow-md dark:bg-zinc-800/30">
          <ChevronLeft />
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
        onClick={handleNext}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 shadow-md dark:bg-zinc-800/30">
          <ChevronRight />
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
