"use client";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Trash } from "lucide-react";
import { z } from "zod";
import { v4 } from "uuid";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useUploadModal } from "@/hooks/use-upload-modal";
import { useUser } from "@/hooks/use-user";
import { createImage } from "@/actions/images";
import { createClient } from "@/lib/supabase/client";
import { ToolTipHint } from "../common/tooltip-hint";

export const UploadModal = () => {
  const [isLoading, startTransition] = useTransition();
  const [imageLoading, setImageLoading] = useState(false);
  const [file, setFile] = useState<Blob | MediaSource | File | null>(null);

  const supabase = createClient();

  const uploadModal = useUploadModal();
  const { user } = useUser();

  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    is_public: z.boolean().default(true),
    image_path: z
      .instanceof(File, { message: "Please upload an image" })
      .refine((file) => file.size < 1000000, {
        message: "Your image must be less than 1MB.",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      is_public: true,
      image_path: undefined,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      setFile(null);
      form.reset();
      uploadModal.onClose();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user?.id) return;

    const imageFile = values.image_path;

    if (!imageFile) {
      throw new Error("Image is required. Please upload again!");
    }

    const uniqueId = v4();

    setImageLoading(true);
    //upload song
    const { data: imageData, error: imageError } = await supabase.storage
      .from("images")
      .upload(`image-${values.title}-${uniqueId}`, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (imageError) {
      form.reset();
      setFile(null);
      uploadModal.onClose();
      return toast.error(
        imageError.message || "Something went wrong! Please try again!"
      );
    }

    startTransition(() =>
      createImage({ ...values, user_id: user?.id, image_path: imageData.path })
        .then(() => {
          toast.success("A new image is created!");
        })
        .catch((error) => {
          toast.error(
            error.message || "Something went wrong! Please try again!"
          );
        })
        .finally(() => {
          setFile(null);
          form.reset();
          uploadModal.onClose();
          setImageLoading(false);
        })
    );
  };

  const handleRemoveImage = () => {
    setFile(null);
    form.resetField("image_path", { keepTouched: false });
  };

  return (
    <Dialog open={uploadModal.isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Upload you image</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-6">
          {file && (
            <div className="w-full flex ml-auto items-center justify-center">
              <div className="h-32 w-32 relative aspect-square rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-[10] group">
                  <ToolTipHint label="Remove" side="bottom">
                    <Button
                      type="button"
                      size="icon"
                      onClick={handleRemoveImage}
                      className="h-auto w-auto p-1 rounded-full group-hover:opacity-80"
                    >
                      <Trash
                        className="size-4 group-hover:opacity-80"
                        stroke="red"
                      />
                    </Button>
                  </ToolTipHint>
                </div>
                <Image
                  alt="thumbnail"
                  src={URL.createObjectURL(file)}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="image_path"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Upload Image</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        type="file"
                        placeholder="Enter image title"
                        accept="image/*"
                        onChange={(event) => {
                          onChange(event.target.files && event.target.files[0]);
                          setFile(event.target.files && event.target.files[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter image title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_public"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Make image public</FormLabel>
                      <FormDescription>
                        Everyone can access this image.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        color=""
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <div className="w-full">
                  <p className="text-destructive text-sm font-semibold">
                    {`${form.formState.errors.root.message}`}
                  </p>
                </div>
              )}
              <div className="w-full flex justify-end gap-x-2">
                <DialogClose asChild>
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  disabled={isLoading || !form.formState.isValid}
                  type="submit"
                  variant="pictury"
                >
                  Submit
                  {(isLoading || imageLoading) && (
                    <Loader2 className="ml-1 text-white size-4 animate-spin" />
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
