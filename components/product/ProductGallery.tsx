"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, PackageSearch } from "lucide-react";
import Carousel from "@/components/ui/Carousel";
import { ImageType } from "@/types";

type ProductGalleryProps = {
  images: ImageType[];
  name: string;
};

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const t = useTranslations("Product");

  const numberOfChildren = images.length;

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === numberOfChildren ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? numberOfChildren - 1 : prevIndex - 1
    );
  };

  const selectImage = (index: number) => {
    setCurrentIndex(index);
  };

  const slideThumbnailsLeft = () => {
    const slider = document.getElementById("slider");
    if (!slider) return;
    slider.scrollLeft = slider?.scrollLeft - 200;
  };

  const slideThumbnailsRight = () => {
    const slider = document.getElementById("slider");
    if (!slider) return;
    slider.scrollLeft = slider?.scrollLeft + 200;
  };

  return (
    <>
      {images.length > 0 ? (
        <Carousel
          currentIndex={currentIndex}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        >
          {images.map((image, index) => (
            <Image
              key={image.id}
              src={image.url}
              alt={`${name} ${index}`}
              width="500"
              height="500"
              priority
              className="absolute w-full h-full inset-0 object-contain bg-white"
            />
          ))}
        </Carousel>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <PackageSearch size={64} className="text-zinc-400" />
          <span className="max-w-md text-xl text-center text-zinc-400">
            {t("noImage")}
          </span>
        </div>
      )}
      {/* Thumbnails */}
      {images.length > 0 && (
        <div className="mt-8 relative flex items-center">
          <button
            type="button"
            className="flex items-center justify-center h-full px-4 cursor-pointer"
            onClick={slideThumbnailsLeft}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md dark:bg-zinc-800">
              <ChevronLeft />
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <div
            id="slider"
            className="w-full h-full overflow-hidden whitespace-nowrap scroll-smooth"
          >
            {images.map((image, index) => (
              <Image
                key={image.id}
                src={image.url}
                alt={`${name} ${index}`}
                width="100"
                height="100"
                priority
                className={`w-[100px] h-[100px] object-contain mx-1 p-2 inline-block cursor-pointer ease-in-out duration-300 border-2 bg-white rounded-md hover:border-sky-500 ${
                  currentIndex === index ? "border-sky-500" : "border-zinc-200"
                }`}
                onClick={() => selectImage(index)}
              />
            ))}
          </div>
          <button
            type="button"
            className="flex items-center justify-center h-full px-4 cursor-pointer"
            onClick={slideThumbnailsRight}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md dark:bg-zinc-800">
              <ChevronRight />
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default ProductGallery;
