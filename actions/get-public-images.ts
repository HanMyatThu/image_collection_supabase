"use server";

import { Image } from "@/types/types";
import { createServerComponentClient } from "@/lib/supabase/server";

export const getPublicImages = async (): Promise<Image[]> => {
  const supabase = createServerComponentClient();

  const { data, error } = await supabase
    .from("images")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error);
    return [];
  }

  return (data as Image[]) || [];
};
