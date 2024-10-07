/* eslint-disable @next/next/no-img-element */
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { DownloadIcon } from "lucide-react";

interface PreviewProps {
  children: React.ReactNode;
  url: string | null | undefined;
  onDownload?: () => void;
  disabled?: boolean;
}

export const Preview = ({
  children,
  url,
  onDownload,
  disabled = false,
}: PreviewProps) => {
  if (!url) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[600px] max-h-[600px] border-none bg-transparent p-0 shadow-none group">
        <div className="w-full h-full relative">
          {onDownload && (
            <div className="absolute bottom-1 right-2 z-10 opacity-0 group-hover:opacity-100">
              <Button
                variant="pictury"
                size="iconSm"
                onClick={onDownload}
                disabled={disabled}
              >
                <DownloadIcon className="size-4" />
              </Button>
            </div>
          )}
          <img
            src={url}
            alt="Message image zoom"
            className="rounded-md object-cover size-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
