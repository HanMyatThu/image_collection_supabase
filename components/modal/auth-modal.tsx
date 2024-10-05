"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

const strongPassword =
  /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;

export const AuthModal = () => {
  const { isOpen, isSignIn, onClose, changeMode } = UseAuthModal();

  const formSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password should have minimum 8 charactors")
      .max(60, "Max 60 words for password")
      .refine(
        (value) => {
          return strongPassword.test(value);
        },
        { message: "Strong password is required" }
      ),
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const title = isSignIn
    ? "Create an new account!"
    : "Login with your account!";
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
              <div className="w-full justify-center text-center">
                <Button variant="pictury" type="submit">
                  {isSignIn ? "Sign in" : "Sign up"}
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
