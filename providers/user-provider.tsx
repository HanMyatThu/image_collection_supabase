"use client";

import { MyUserProvider } from "@/hooks/use-user";

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  return <MyUserProvider>{children}</MyUserProvider>;
};
