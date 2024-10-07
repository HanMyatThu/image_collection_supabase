"use client";
import { CameraIcon, HomeIcon, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { UseAuthModal } from "@/hooks/use-auth-modal";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { signOut } from "@/actions/auth";
import { User } from "@supabase/supabase-js";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  user: User | null;
}

export const Header = ({ children, className, user }: HeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const { changeMode, onOpen } = UseAuthModal();

  const handleSignOut = () => {
    startTransition(() => {
      signOut()
        .then(() => {
          toast.success("You have log out successfully");
          router.push("/");
        })
        .catch((error) => {
          toast.error(error.message || "Something went wrong.");
          router.refresh();
        });
    });
  };

  return (
    <div className={cn("h-fit bg-gradient-to-b from-cyan-800 p-6", className)}>
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="flex flex-row gap-x-3 items-center justify-center">
          <Image
            src="/images/logo.png"
            alt="logo"
            className="object-cover"
            width={100}
            height={100}
          />
          <div className="hidden md:flex lg:flex gap-x-2 items-center ml-6">
            <p className="font-semibold text-neutral-200">
              Get your favourite image here!
            </p>
            <CameraIcon className="size-8 ml-2" stroke="cyan" />
          </div>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-1 bg-white flex items-center justify-center hover:opacity-75 transition-opacity">
            <HomeIcon className="size-5" stroke="black" />
          </button>
          <button className="rounded-full p-1 bg-white flex items-center justify-center hover:opacity-75 transition-opacity">
            <Search className="size-5" stroke="black" />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <Button
              variant="pictury"
              onClick={handleSignOut}
              className="rounded-full"
            >
              Sign out
            </Button>
          ) : (
            <>
              <div>
                <Button
                  variant="pictury"
                  onClick={() => {
                    changeMode(false);
                    onOpen();
                  }}
                  className="rounded-full"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  variant="link"
                  className="no-underline hover:no-underline hover:opacity-80"
                  onClick={() => {
                    changeMode(true);
                    onOpen();
                  }}
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
