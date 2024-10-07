"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CopyIcon, DownloadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { format } from "date-fns";
import Image from "next/image";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useImageDetail } from "@/hooks/use-image-detail";
import { useLoadImage } from "@/hooks/use-load-image";
import { Image as IImage } from "@/types/types";
import { downloadFile } from "@/lib/utils";
import { updateImage } from "@/actions/images";

export const ImageDetail = () => {
  const { isOpen, onClose, selectedImage, setSelectedImage } = useImageDetail();
  const [defaultValue, setDefaultValue] = useState({
    title: selectedImage?.title,
    description: selectedImage?.description,
    is_public: selectedImage?.is_public,
  });
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (selectedImage) {
      setDefaultValue({
        title: selectedImage?.title,
        description: selectedImage?.description,
        is_public: selectedImage?.is_public,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage?.id]);

  const imagePath = useLoadImage(selectedImage || ({} as IImage));

  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    is_public: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue,
  });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      form.reset();
      setSelectedImage(null);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (selectedImage) {
      startTransition(() => {
        updateImage({ ...values, id: selectedImage?.id })
          .then(() => {
            toast.success("Image updated");
            router.refresh();
          })
          .catch((error) => {
            toast.error(error.message || "Something went wrong");
          })
          .finally(() => {
            onClose();
            form.reset();
            setSelectedImage(null);
          });
      });
    }
  };

  const handleDownload = () => {
    if (imagePath) {
      startTransition(() =>
        fetch(imagePath)
          .then(async (data) => {
            const blob = await data.blob();
            const url = window.URL.createObjectURL(blob);
            downloadFile(url);
            window.URL.revokeObjectURL(url);
            toast.success("Image downloaded");
          })
          .catch(() => {
            toast.error("Unabled to download file");
          })
      );
    }
  };

  const handleCopy = () => {
    window.navigator.clipboard.writeText(imagePath!);
    toast.success("URL is copied to clipboard");
  };

  if (!selectedImage) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="relative flex flex-row rounded-md overflow-hidden gap-x-6 mt-5 transition p-3">
          <div className="relative group aspect-square w-full h-full rounded-md overflow-hidden transition">
            <Image
              src={imagePath || "/images/liked.jpg"}
              className="object-cover"
              fill
              alt="song-image"
            />
          </div>
          <div className="space-y-4 w-full h-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  defaultValue={defaultValue?.title}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm font-semibold" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  defaultValue={defaultValue?.description}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm font-semibold" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="is_public"
                  defaultValue={defaultValue?.is_public}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Make image public</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.formState.errors.root && (
                  <div className="w-full">
                    <p className="text-red-500 text-sm font-semibold">
                      {`${form.formState.errors.root.message}`}
                    </p>
                  </div>
                )}
                <div className="w-full justify-end text-end">
                  <DialogClose asChild>
                    <Button variant="ghost" type="button">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button variant="pictury" type="submit">
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col space-y-4">
          <div className="flex-col">
            <p className="text-xs text-muted-foreground">Added on</p>
            <p className="text-sm">
              {selectedImage?.created_at
                ? format(selectedImage?.created_at, "dd/mm/yyyy, hh:mm:ss a")
                : "-"}
            </p>
          </div>
          <div className="flex-col">
            <p className="text-xs text-muted-foreground">Last modified on</p>
            <p>
              {selectedImage?.updated_at
                ? format(selectedImage?.updated_at, "dd/mm/yyyy, hh:mm:ss a")
                : "-"}
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={isLoading}
            >
              <DownloadIcon className="mr-1 size-4" /> Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <CopyIcon className="mr-1 size-4" />
              Get Public URL
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
