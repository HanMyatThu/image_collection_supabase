"use server";

import { User } from "@supabase/supabase-js";

import { createServerComponentClient } from "@/lib/supabase/server";

export const getSessionUser = async (): Promise<User | null> => {
  const supabase = createServerComponentClient();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return data.user;
};
