import { StatusBadge } from "./status-badge";

interface AlbumSectionProps {
  children: React.ReactNode;
  title: string;
  status: "public" | "private";
}

export const AlbumSection = ({
  title,
  children,
  status = "private",
}: AlbumSectionProps) => {
  return (
    <div className="gap-y-4">
      <div className="w-full flex justify-between mb-4">
        <p className="text-muted-foreground">{title}</p>
        <StatusBadge variant={status} />
      </div>
      {children}
    </div>
  );
};
