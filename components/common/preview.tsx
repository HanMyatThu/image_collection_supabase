/* eslint-disable @next/next/no-img-element */
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface PreviewProps {
  children: React.ReactNode;
  url: string | null | undefined;
}

export const Preview = ({ children, url }: PreviewProps) => {
  if (!url) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[600px] max-h-[600px] border-none bg-transparent p-0 shadow-none">
        <img
          src={url}
          alt="Message image zoom"
          className="rounded-md object-cover size-full"
        />
      </DialogContent>
    </Dialog>
  );
};
