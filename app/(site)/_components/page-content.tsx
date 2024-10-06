"use client";

import { Image } from "@/types/types";
import { ImageItem } from "./image-item";

interface PageContentProps {
  images: Image[];
}

export const PageContent = ({ images }: PageContentProps) => {
  if (!images.length) {
    return <div className="mt-4 text-neutral-400">No images available.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
      {images.map((image) => (
        <ImageItem key={image.id} onClick={() => {}} data={image} />
      ))}
    </div>
  );
};
