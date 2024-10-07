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

export const createImage = async (data: ImageRequest) => {
  const supabase = createServerComponentClient();
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
 * is_public === true && (user_id === userId && is_public === false)
 * @returns
 */
export const getImages = async (): Promise<Image[]> => {
  const supabase = createServerComponentClient();
  const { data: sessionUser } = await supabase.auth.getUser();

  if (sessionUser.user) {
    const { data, error } = await supabase
      .from("images")
      .select("*")
      .or(
        `is_public.eq.true,and(user_id.eq.${sessionUser.user.id}, is_public.eq.false)`
      )
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
    return [];
  }
  return (data as Image[]) || [];
};

/**
 * Update image
 *
 * @param id: string Image id
 * @param title: string  image title string
 * @param description: string image description string
 * @param is_public: boolean image publicity
 * if no session, return error
 * @return message
 */
export const updateImage = async (data: {
  id: string;
  title: string;
  description: string;
  is_public: boolean;
}) => {
  const supabase = createServerComponentClient();
  const { data: sessionUser, error: sessionError } =
    await supabase.auth.getUser();

  if (!sessionUser.user || sessionError) {
    throw new Error("Unauthorized access!");
  }

  const { error } = await supabase
    .from("images")
    .update({
      title: data.title,
      description: data.description,
      is_public: data.is_public,
    })
    .eq("id", data.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/${sessionUser.user.id}/images`);
  revalidatePath("/");
  return "Image updated";
};

/**
 * Get all images of a user
 * return null if user is not login
 * @returns Image[] return all images from the users (both private and public)
 */
export const getImagesByUserId = async (): Promise<Image[]> => {
  const supabase = createServerComponentClient();
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
    return [];
  }
  return (data as Image[]) || [];
};

/**
 * @param title string image title
 * Get Image by Title
 * use this function for search functionality
 * @return Image[] return images with search keyword for the users
 */
export const getImageByTitle = async (title: string): Promise<Image[]> => {
  const supabase = createServerComponentClient();

  if (!title) {
    const allImages = await getImages();
    return allImages;
  }

  const { data, error } = await supabase
    .from("images")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: true });

  if (error) {
    return [];
  }

  return (data as Image[]) || [];
};

/**
 * Download image from supabase storage
 * @param id string image id
 * @return download a string
 */
export const downloadImage = async (image: Image): Promise<string> => {
  const supabase = createServerComponentClient();

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getUser();

  if (!sessionData.user || sessionError) {
    throw new Error("Unabled to download an image");
  }

  const { data: imageData } = supabase.storage
    .from("images")
    .getPublicUrl(image.image_path, { download: true });

  if (!imageData) {
    throw new Error("Unabled to download an image");
  }

  return imageData.publicUrl;
};
