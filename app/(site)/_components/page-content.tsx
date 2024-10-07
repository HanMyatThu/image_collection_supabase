"use client";
import { useTransition } from "react";
import { toast } from "sonner";

import { Image } from "@/types/types";
import { ImageItem } from "./image-item";
import { likeImage, removelike } from "@/actions/favourites";
import { UseAuthModal } from "@/hooks/use-auth-modal";

interface PageContentProps {
  images: Image[];
  favImageIds: string[];
  userId: string | undefined;
}

export const PageContent = ({
  images,
  userId,
  favImageIds,
}: PageContentProps) => {
  const [isLoading, startTransition] = useTransition();
  const { onOpen } = UseAuthModal();

  if (!images.length) {
    return <div className="mt-4 text-neutral-400">No images available.</div>;
  }

  const handleLikeImage = (id: string, isLike: boolean) => {
    if (!userId) {
      onOpen();
      return toast.error("Please login first");
    }
    if (isLike) {
      //remove
      startTransition(() => {
        removelike(id)
          .then(() => {
            toast.success("You have unliked an image.");
          })
          .catch((error) => {
            toast.error(error.message || "Something went wrong");
          });
      });
    } else {
      //like
      startTransition(() => {
        likeImage({
          user_id: userId,
          image_id: id,
        })
          .then(() => {
            toast.success("You have liked an image.");
          })
          .catch((error) => {
            toast.error(error.message || "Something went wrong");
          });
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
      {images.map((image) => (
        <ImageItem
          key={image.id}
          onClick={handleLikeImage}
          data={image}
          favImageIds={favImageIds}
          disabled={isLoading}
        />
      ))}
    </div>
  );
};
