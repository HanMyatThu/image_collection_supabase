"use client";
import { ImageIcon, Plus } from "lucide-react";

import { useUser } from "@/hooks/use-user";
import { UseAuthModal } from "@/hooks/use-auth-modal";
import { useUploadModal } from "@/hooks/use-upload-modal";
import { Image } from "@/types/types";
import { MediaItem } from "./media-item";
import { AlbumSection } from "./album-section";

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

  const privateImages = images.filter((image) => !image.is_public);
  const publicImages = images.filter((image) => image.is_public);

  return (
    <div className="flex flex-col overflow-hidden overflow-y-auto">
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
      <div className="flex flex-col gap-y-4 mt-4 px-3">
        {!images.length && (
          <div className="w-full mb-4 text-muted-foreground text-sm">
            No Image uploaded yet
          </div>
        )}
        {privateImages.length && (
          <AlbumSection title="Private images" status="private">
            {privateImages.map((image) => (
              <MediaItem key={image.id} data={image} />
            ))}
          </AlbumSection>
        )}
        {publicImages.length && (
          <AlbumSection title="Public images" status="public">
            {publicImages.map((image) => (
              <MediaItem key={image.id} data={image} />
            ))}
          </AlbumSection>
        )}
      </div>
    </div>
  );
};
