import Image from "next/image";
import { ImageType } from "@/types";

type AvatarProps = {
  image: ImageType | null;
  name: string;
  size?: "sm" | "md";
};

const Avatar = ({ image, name, size = "md" }: AvatarProps) => {
  const sizeClass = size === "sm" ? "w-10 h-10" : "w-24 h-24";
  const fontSize = size === "sm" ? "text-base" : "text-3xl";

  let firstLetter = "T";
  const match = name.match(/[A-Za-z]/);
  if (match) {
    firstLetter = match[0].toUpperCase();
  }

  return (
    <div
      className={`${sizeClass} rounded-full shadow-lg flex justify-center items-center overflow-hidden`}
    >
      {image ? (
        <Image
          src={image.url}
          width="150"
          height="150"
          alt={name}
          className={`${sizeClass}`}
        />
      ) : (
        <div
          className={`${sizeClass} flex justify-center items-center bg-sky-500 text-white dark:text-black`}
        >
          <span className={`${fontSize} font-extrabold`}>{firstLetter}</span>
        </div>
      )}
    </div>
  );
};

export default Avatar;
