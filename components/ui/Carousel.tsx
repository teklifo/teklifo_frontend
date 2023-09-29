import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselProps = {
  children: React.ReactNode;
};

const Carousel = ({ children }: CarouselProps) => {
  return (
    <div id="carousel" className="relative w-full" data-carousel="slide">
      <div className="relative overflow-hidden rounded-lg">
        {React.Children.map(children, (child) => (
          <div
            className="flex justify-center items-center duration-700 ease-in-out"
            data-carousel-item
          >
            {child}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-zinc-800/30 group-hover:bg-white/50 dark:group-hover:bg-zinc-800/60">
          <ChevronLeft />
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-zinc-800/30 group-hover:bg-white/50 dark:group-hover:bg-zinc-800/60">
          <ChevronRight />
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
