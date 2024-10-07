import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Image } from "@/types/types";
import { StatusBadge } from "@/components/common/status-badge";

export const columns: ColumnDef<Image>[] = [
  {
    accessorKey: "action",
    header: () => {
      return null;
    },
    cell: () => {
      return null;
    },
  },
  {
    accessorKey: "title",
    header: () => {
      return "Title";
    },
    cell: ({ row }) => {
      const title: string = row.getValue("title");
      return (
        <div className="text-nowrap text-sm text-muted-foreground">{title}</div>
      );
    },
  },
  {
    accessorKey: "description",
    header: () => {
      return "Description";
    },
    cell: ({ row }) => {
      const description: string = row.getValue("description");
      return (
        <div className="text-wrap text-sm text-muted-foreground">
          {description}
        </div>
      );
    },
  },
  {
    accessorKey: "is_public",
    header: () => {
      return "Permission";
    },
    cell: ({ row }) => {
      const is_public = row.getValue("is_public");
      return (
        <div className="text-nowrap text-sm text-muted-foreground">
          <StatusBadge variant={is_public ? "public" : "private"} />
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: () => {
      return "Created At";
    },
    cell: ({ row }) => {
      const created_at: string = row.getValue("created_at");
      return (
        <div className="text-nowrap text-sm text-muted-foreground">
          {format(created_at, "dd/mm/yyyy, hh:mm:ss a")}
        </div>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: () => {
      return "Last Modified At";
    },
    cell: ({ row }) => {
      const updated_at: string = row.getValue("updated_at");
      return (
        <div className="text-nowrap text-sm text-muted-foreground">
          {updated_at ? format(updated_at, "dd/mm/yyyy, hh:mm:ss a") : "-"}
        </div>
      );
    },
  },
];
