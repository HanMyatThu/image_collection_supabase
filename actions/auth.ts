"use server";

import { createServerComponentClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface formData {
  email: string;
  password: string;
}

export const signOut = async () => {
  const supabase = createServerComponentClient();

  const { data, error: sessionError } = await supabase.auth.getSession();

  if (!data.session || sessionError) {
    throw new Error("Unable to sign out.");
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  return "You have sign out successfully";
};

export const signIn = async (loginData: formData) => {
  const supabase = createServerComponentClient();

  const { error } = await supabase.auth.signInWithPassword(loginData);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  return "You have login successfully.";
};

export const signUp = async (signUpData: formData) => {
  const supabase = createServerComponentClient();

  const { error } = await supabase.auth.signUp(signUpData);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  return "You have sign up successfully.";
};
