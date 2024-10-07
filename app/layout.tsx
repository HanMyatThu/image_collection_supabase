import type { Metadata } from "next";

import { Figtree } from "next/font/google";

import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { UserProvider } from "@/providers/user-provider";
import { getImagesByUserId } from "@/actions/images";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pictury",
  description: "Get your favourite image here!",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const images = await getImagesByUserId();
  console.log(images, "images");

  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <UserProvider>
          <ThemeProvider defaultTheme="dark" attribute="class">
            <Toaster />
            <ModalProvider />
            <Sidebar images={images}>{children}</Sidebar>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
