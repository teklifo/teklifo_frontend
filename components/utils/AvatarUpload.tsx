"use client";

import Image from "next/image";
import { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Pencil } from "lucide-react";

type AvatarUploadProps = {
  image: string | null;
  name: string;
};

declare global {
  var cloudinary: any;
}

const AvatarUpload = ({ image, name }: AvatarUploadProps) => {
  const handleUpload = useCallback((result: any) => {
    const a = result.info.secure_url;
  }, []);

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset=""
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div onClick={() => open?.()}>
            <div className="cursor-pointer mb-3 rounded-full shadow-lg overflow-auto group">
              <div className="w-24 h-24 rounded-full flex justify-center items-center opacity-0 bg-zinc-700 absolute transition-opacity ease-in duration-200 group-hover:opacity-90">
                <Pencil className="text-white" />
              </div>
              {image ? (
                <Image
                  src="/docs/images/people/profile-picture-3.jpg"
                  width="96"
                  height="96"
                  alt={name}
                />
              ) : (
                <div className="w-24 h-24 flex justify-center items-center bg-sky-500 text-white dark:text-black">
                  <span className="text-3xl font-extrabold">
                    {name[0].toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default AvatarUpload;
