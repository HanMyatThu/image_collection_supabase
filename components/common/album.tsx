"use client";
import { ImageIcon, Plus } from "lucide-react";

import { useUser } from "@/hooks/use-user";
import { UseAuthModal } from "@/hooks/use-auth-modal";
import { useUploadModal } from "@/hooks/use-upload-modal";
import { Image } from "@/types/types";
import { MediaItem } from "./media-item";

interface AlbumProps {
  images: Image[];
}

export const Album = ({ images }: AlbumProps) => {
  const authModal = UseAuthModal();
  const uploadModal = useUploadModal();
  const { user } = useUser();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pt-2">
        <div className="inline-flex items-center gap-x-4">
          <ImageIcon className="size-4" />
          <p className="text-muted-foreground font-medium text-md">
            Your Images
          </p>
        </div>
        <Plus
          onClick={onClick}
          className="size-4 text-muted-foreground cursor-pointer hover:text-white transition-colors"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {images.map((image) => (
          <MediaItem key={image.id} data={image} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
};
