import { cva, VariantProps } from "class-variance-authority";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "text-xs hover:opacity-85 cursor-pointer rounded-xl",
  {
    variants: {
      variant: {
        public: "bg-green-500 text-white hover:bg-green-500/90",
        private: "bg-accent hover:bg-accent/90 text-white",
      },
    },
    defaultVariants: {
      variant: "public",
    },
  }
);

interface StatusBadgeProps extends VariantProps<typeof badgeVariants> {
  variant: "public" | "private";
}

export const StatusBadge = ({ variant }: StatusBadgeProps) => {
  return <Badge className={cn(badgeVariants({ variant }))}>{variant}</Badge>;
};
