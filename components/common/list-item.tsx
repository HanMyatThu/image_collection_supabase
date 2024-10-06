"use client";

import { PlayIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

export const ListItem = ({ name, image, href }: ListItemProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(href);
  };
  return (
    <button className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image alt="like" src={image} fill className="object-cover" />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div className="absolute transition opacity-0 group-hover:opacity-100 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5  hover:scale-110">
        <PlayIcon className="size-4 text-black" />
      </div>
    </button>
  );
};
