import { Image } from "@/types/types";

import { createClient } from "@/lib/supabase/client";

export const useLoadImage = (image: Image) => {
  const supabaseClient = createClient();

  if (!image) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(image.image_path);

  return imageData.publicUrl;
};
