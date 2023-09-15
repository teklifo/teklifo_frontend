import Image from "next/image";

type AvatarProps = {
  image: string | null;
  name: string;
};

const Avatar = ({ image, name }: AvatarProps) => {
  return image ? (
    <Image
      className="mb-3 rounded-full shadow-lg"
      src="/docs/images/people/profile-picture-3.jpg"
      width="96"
      height="96"
      alt={name}
    />
  ) : (
    <div className="w-24 h-24 mb-3 rounded-full shadow-lg flex justify-center items-center bg-sky-500 text-white dark:text-black">
      <span className="text-3xl font-extrabold">{name[0].toUpperCase()}</span>
    </div>
  );
};

export default Avatar;
