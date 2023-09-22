import Image from "next/image";
import { ImageType } from "@/types";

type AvatarProps = {
  image: ImageType | null;
  name: string;
  size?: "sm" | "md";
};

const Avatar = ({ image, name, size = "md" }: AvatarProps) => {
  const sizeClass = size === "sm" ? 10 : 24;
  const fontSize = size === "sm" ? "text-base" : "text-3xl";

  return (
    <div
      className={`w-${sizeClass} h-${sizeClass} rounded-full shadow-lg flex justify-center items-center overflow-hidden`}
    >
      {image ? (
        <Image
          src={image.url}
          width="150"
          height="150"
          alt={name}
          className={`w-${sizeClass} h-${sizeClass}`}
        />
      ) : (
        <div
          className={`w-${sizeClass} h-${sizeClass} flex justify-center items-center bg-sky-500 text-white dark:text-black`}
        >
          <span className={`${fontSize} font-extrabold`}>
            {name[0].toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};

export default Avatar;
