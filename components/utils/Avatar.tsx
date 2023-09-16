import Image from "next/image";
import { ImageType } from "@/types";

type AvatarProps = {
  image: ImageType | null;
  name: string;
};

const Avatar = ({ image, name }: AvatarProps) => {
  return (
    <div className="w-24 h-24 mb-3 rounded-full shadow-lg flex justify-center items-center overflow-hidden">
      {image ? (
        <Image
          src={image.url}
          width="150"
          height="150"
          alt={name}
          className="w-24 h-24"
        />
      ) : (
        <div className="w-24 h-24 flex justify-center items-center bg-sky-500 text-white dark:text-black">
          <span className="text-3xl font-extrabold">
            {name[0].toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};

export default Avatar;
