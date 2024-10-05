"use client";

import { CameraIcon, HomeIcon, Search } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const Header = ({ children, className }: HeaderProps) => {
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
          <>
            <div>
              <Button
                variant="pictury"
                onClick={() => {}}
                className="rounded-full"
              >
                Sign up
              </Button>
            </div>
            <div>
              <Button
                variant="link"
                className="no-underline hover:no-underline hover:opacity-80"
                onClick={() => {}}
              >
                Log in
              </Button>
            </div>
          </>
        </div>
      </div>
      {children}
    </div>
  );
};
