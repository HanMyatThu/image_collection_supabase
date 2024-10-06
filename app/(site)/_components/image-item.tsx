"use client";
import Image from "next/image";
import { ZoomIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useLoadImage } from "@/hooks/use-load-image";
import { Image as ImageType } from "@/types/types";
import { ToolTipHint } from "@/components/common/tooltip-hint";

interface ImageItemProps {
  data: ImageType;
  onClick: (id: string) => void;
}

export const ImageItem = ({ data, onClick }: ImageItemProps) => {
  const imagePath = useLoadImage(data);

  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative group flex flex-col items-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 hover:bg-neutral-400/10 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          src={imagePath || "/images/liked.jpg"}
          className="object-cover"
          fill
          alt="song-image"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 bg-transparent opacity-0 group-hover:opacity-100"
        >
          <ZoomIn className="size-5" />
        </Button>
      </div>
      <div className="flex flex-col items-start w-full p-4 gap-y-4">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-neutral-400 text-sm pb-4 w-full truncate">
          {data.description}
        </p>
      </div>
      <div className="absolute bottom-24 right-5"></div>
    </div>
  );
};
