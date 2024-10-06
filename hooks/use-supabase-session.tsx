"use client";
import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { Session, User } from "@supabase/supabase-js";

export const useSupabaseSession = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data) {
        setSession(data.session);
      }
      const { data: userData } = await supabase.auth.getUser();
      if (userData) {
        setUser(userData.user);
      }
    };
    fetchSession();
  }, [supabase]);

  return {
    session,
    user,
  };
};
