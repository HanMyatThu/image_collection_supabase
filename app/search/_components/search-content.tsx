"use client";

import { MediaItem } from "@/components/common/media-item";
import { Image } from "@/types/types";

interface SearchContentProps {
  images: Image[];
}

export const SearchContent = ({ images }: SearchContentProps) => {
  if (!images.length) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No Images Found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {images.map((image) => (
        <div key={image.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={() => {}} data={image} />
          </div>
        </div>
      ))}
    </div>
  );
};
