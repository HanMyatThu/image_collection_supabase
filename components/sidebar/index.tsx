"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HomeIcon, SearchIcon } from "lucide-react";

import { Box } from "./box";
import { SidebarItem } from "./sidebar-item";
import { Album } from "@/components/common/album";
import { Image } from "@/types/types";
interface SidebarProps {
  children: React.ReactNode;
  images: Image[];
}

export const Sidebar = ({ children, images }: SidebarProps) => {
  const pathname = usePathname();

  const routes = useMemo(() => {
    return [
      {
        label: "Home",
        active: pathname !== "/search",
        href: "/",
        icon: HomeIcon,
      },
      {
        label: "Search",
        active: pathname === "/search",
        href: "/search",
        icon: SearchIcon,
      },
    ];
  }, [pathname]);

  return (
    <aside className="flex h-full">
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-2 px-5 py-4">
            {routes.map((route) => (
              <SidebarItem key={route.label} {...route} />
            ))}
          </div>
        </Box>
        <Box>
          <div className="flex flex-col gap-y-2 px-5 py-4">
            <Album images={images} />
          </div>
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </aside>
  );
};
