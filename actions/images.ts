"use server";
import { revalidatePath } from "next/cache";

import { createServerComponentClient } from "@/lib/supabase/server";

interface ImageRequest {
  title: string;
  description: string;
  is_public: boolean;
  user_id: string;
  image_path: string;
}

const supabase = createServerComponentClient();

export const createImage = async (data: ImageRequest) => {
  const { error } = await supabase.from("images").insert(data);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");

  return "image created";
};
