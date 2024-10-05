import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  label: string;
  active: boolean;
  href: string;
  icon: LucideIcon;
}

export const SidebarItem = ({
  label,
  active,
  href,
  icon: Icon,
}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1",
        active && "text-white"
      )}
    >
      <Icon className="size-4" />
      <p className="truncate w-[100px]">{label}</p>
    </Link>
  );
};
