"use server";
import { createServerComponentClient } from "@/lib/supabase/server";
import { Image } from "@/types/types";
import { revalidatePath } from "next/cache";

interface likeImageProps {
  user_id: string;
  image_id: string;
}

export const likeImage = async (data: likeImageProps) => {
  const supabase = createServerComponentClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user.user) {
    throw new Error("Unauthorized access");
  }

  const { error } = await supabase.from("favorites").insert(data);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  return "You have liked the image";
};

export const getLikeImages = async (): Promise<Image[]> => {
  const supabase = createServerComponentClient();

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getUser();

  if (sessionError || !sessionData) {
    console.log(sessionError?.message || "User Not Found");
    return [];
  }

  const { data, error } = await supabase
    .from("favorites")
    .select("*, images(*)")
    .eq("user_id", sessionData.user.id)
    .order("created_at", { ascending: true });

  if (error) {
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({
    ...item.images,
  }));
};

export const removelike = async (image_id: string) => {
  const supabase = createServerComponentClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user.user) {
    throw new Error("Unauthorized access");
  }

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user.user.id)
    .eq("image_id", image_id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  return "You have unliked the image";
};
