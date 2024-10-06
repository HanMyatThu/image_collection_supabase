"use client";
import { User } from "@supabase/supabase-js";

import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { getSessionUser } from "@/actions/get-session-user";

type UserContextType = {
  user: User | null;
  setUser: Dispatch<User | null>;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface MyUserProviderProps {
  [propName: string]: unknown;
}

export const MyUserProvider = (props: MyUserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const data = await getSessionUser();
      setLoading(false);
      if (data) setUser(data);
    };

    if (!user) {
      fetchUser();
    }
  }, [user]);

  const value = {
    user,
    setUser,
    isLoading: loading,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("userUser must be used within User Provider");
  }
  return context;
};
