"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { useLoadImage } from "@/hooks/use-load-image";
import { Image as IImage } from "@/types/types";

interface ListItemProps {
  name: string;
  images: IImage[];
  href: string;
}

export const ListItem = ({ name, images, href }: ListItemProps) => {
  const router = useRouter();
  const link = useLoadImage(images[0]);

  const onClick = () => {
    router.push(href);
  };

  const hasFavImages = images.length >= 0 && link;

  return (
    <button
      onClick={onClick}
      className="relative group flex flex-col h-64 w-64 rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
    >
      {hasFavImages && (
        <Image
          src={link}
          alt="Media Item"
          className="object-cover opacity-55 group-hover:opacity-100 h-auto w-auto"
          fill
        />
      )}
      <p className="font-medium truncate absolute top-[45%] group-hover:opacity-55 flex justify-center ml-auto w-full group-hover:text-black/80">
        {images.length === 0 ? "No favourite image yet" : name}
      </p>
      {hasFavImages && (
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 flex flex-row items-center gap-x-1 text-blue-950 font-semibold">
          <div className="p-0.5 rounded-full bg-cyan-700/50 text-white/85">
            <ArrowRight className="size-4" />
          </div>
        </div>
      )}
    </button>
  );
};
