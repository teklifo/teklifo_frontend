"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Pencil } from "lucide-react";
import { ImageType } from "@/types";

type AvatarUploadProps = {
  image: ImageType | null;
  name: string;
  onUpload: (value: ImageType) => Promise<any>;
};

declare global {
  var cloudinary: any;
}

const AvatarUpload = ({ image, name, onUpload }: AvatarUploadProps) => {
  const [uploadedImage, setUploadedImage] = useState<ImageType | null>(null);

  const handleUpload = useCallback(
    async (result: any) => {
      const updatedCompany = await onUpload({
        id: result.info.public_id,
        url: result.info.secure_url,
      });
      setUploadedImage(updatedCompany.image);
    },
    [onUpload]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_}
      options={{
        maxFiles: 1,
        maxFileSize: 2000000,
        cropping: true,
        croppingAspectRatio: 1 / 1,
      }}
    >
      {({ open }) => {
        return (
          <div onClick={() => open?.()}>
            <div className="w-24 h-24 cursor-pointer mb-3 rounded-full shadow-lg flex justify-center items-center overflow-hidden group">
              <div className="w-24 h-24 rounded-full flex justify-center items-center opacity-0 bg-zinc-700 absolute transition-opacity ease-in duration-200 group-hover:opacity-90">
                <Pencil className="text-white" />
              </div>
              {image || uploadedImage ? (
                <Image
                  src={uploadedImage ? uploadedImage.url : image!.url}
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
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default AvatarUpload;
