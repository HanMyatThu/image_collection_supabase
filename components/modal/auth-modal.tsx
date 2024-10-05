"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { UseAuthModal } from "@/hooks/use-auth-modal";
import { createClient } from "@/lib/supabase/client";

export const AuthModal = () => {
  const router = useRouter();
  const { isOpen, isSignIn, onClose, changeMode } = UseAuthModal();

  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const formSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password should have minimum 8 charactors")
      .max(60, "Max 60 words for password"),
  });

  const handleClose = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    if (isSignIn) {
      //sign in
      const { error } = await supabase.auth.signInWithPassword(values);
      setLoading(false);
      if (error) {
        form.setError("root", { message: error.message });
        toast.error(error.message);
      } else {
        form.reset();
        onClose();
        router.refresh();
        toast.success("You have login successfully");
      }
    } else {
      const { error } = await supabase.auth.signUp(values);
      setLoading(false);
      if (error) {
        form.setError("root", { message: error.message });
        toast.error(error.message);
      } else {
        form.reset();
        onClose();
        router.refresh();
        toast.success("Please confirm your email.");
      }
    }
  };

  const title = isSignIn
    ? "Login with your account!"
    : "Create an new account!";

  const label = isSignIn
    ? "Don't have an account? "
    : "Already have an account?";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="space-y-5 items-center">
          <DialogTitle className="text-center">Welcome to Pictury</DialogTitle>
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
              <div className="w-full justify-center text-center">
                <Button variant="pictury" type="submit">
                  {isSignIn ? "Sign in" : "Sign up"}
                  {loading && <Loader2 className="ml-2 animate-spin size-5" />}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="w-full flex flex-col items-center justify-center space-y-2">
          <div className="text-sm flex flex-row gap-x-1 text-muted-foreground">
            {label}
            <p>
              Go to{" "}
              <button
                onClick={() => changeMode(!isSignIn)}
                className="font-bold"
              >
                {isSignIn ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
