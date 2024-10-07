"use client";
import Image from "next/image";
import { ZoomIn, HeartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLoadImage } from "@/hooks/use-load-image";
import { Image as ImageType } from "@/types/types";
import { Preview } from "@/components/common/preview";

interface ImageItemProps {
  data: ImageType;
  onClick: (id: string, isLike: boolean) => void;
  favImageIds: string[];
  disabled?: boolean;
}

export const ImageItem = ({
  data,
  onClick,
  favImageIds,
  disabled = false,
}: ImageItemProps) => {
  const imagePath = useLoadImage(data);

  const isLiked = favImageIds.includes(data.id);

  return (
    <div className="relative flex flex-col items-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 hover:bg-neutral-400/10 transition p-3">
      <div className="relative group aspect-square w-full h-full rounded-md overflow-hidden hover:scale-105 transition">
        <Image
          src={imagePath || "/images/liked.jpg"}
          className="object-cover"
          fill
          alt="song-image"
        />
        <Preview url={imagePath}>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 bg-transparent opacity-0 group-hover:opacity-100"
          >
            <ZoomIn className="size-5" />
          </Button>
        </Preview>
      </div>
      <div className="flex flex-col items-start w-full p-4 gap-y-2">
        <div className="relative w-full">
          <p className="font-semibold truncate w-full">{data.title}</p>
          <Button
            onClick={() => onClick(data.id, isLiked)}
            disabled={disabled}
            className="absolute right-0 top-0"
            size="icon"
            variant="ghost"
          >
            <HeartIcon className="size-5" fill={isLiked ? "red" : "none"} />
          </Button>
        </div>
        <p className="text-neutral-400 text-sm w-full truncate">
          {data.description}
        </p>
      </div>
    </div>
  );
};
