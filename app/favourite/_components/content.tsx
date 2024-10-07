"use client";
import { useTransition } from "react";
import { toast } from "sonner";

import { ImageItem } from "./image-item";

import { UseAuthModal } from "@/hooks/use-auth-modal";
import { Image } from "@/types/types";
import { removelike } from "@/actions/favourites";
import { useUser } from "@/hooks/use-user";

interface ContentProps {
  images: Image[];
}

export const Content = ({ images }: ContentProps) => {
  const [isLoading, startTransition] = useTransition();
  const { user } = useUser();
  const { onOpen } = UseAuthModal();

  const favImageIds = images.map((image) => image.id);

  if (!images.length) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No Favourite images.
      </div>
    );
  }

  const handleLikeImage = (id: string) => {
    if (!user?.id) {
      onOpen();
      return toast.error("Please login first");
    }
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
  };

  return (
    <div className="flex px-4 mb-5 overflow-hidden overflow-y-auto">
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
    </div>
  );
};
