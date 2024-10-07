"use server";
import { revalidatePath } from "next/cache";

import { createServerComponentClient } from "@/lib/supabase/server";
import { Image } from "@/types/types";

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

/**
 * Get public images
 *
 * if no session, get public images only
 * if login, get public images and get private images where user Id === session user id
 * @returns
 */
export const getImages = async (): Promise<Image[]> => {
  const { data: sessionUser } = await supabase.auth.getUser();

  if (sessionUser.user) {
    const { data, error } = await supabase
      .from("images")
      .select("*")
      .eq("is_public", true)
      .or(`user_id.eq.${sessionUser.user.id}, is_public.eq.false`)
      .order("created_at", { ascending: true });

    if (error) {
      console.log(error);
      return [];
    }
    return (data as Image[]) || [];
  }

  const { data, error } = await supabase
    .from("images")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error);
    return [];
  }
  return (data as Image[]) || [];
};

/**
 * Get all images of a user
 * return null if user is not login
 * @returns Image[] return all images from the users (both private and public)
 */
export const getImagesByUserId = async (): Promise<Image[]> => {
  const { data: sessionUser } = await supabase.auth.getUser();

  if (!sessionUser.user) {
    return [] as Image[];
  }

  const { data, error } = await supabase
    .from("images")
    .select("*")
    .eq("user_id", sessionUser.user?.id)
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error);
    return [];
  }
  return (data as Image[]) || [];
};
