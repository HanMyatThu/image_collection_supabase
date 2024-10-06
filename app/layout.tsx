import type { Metadata } from "next";

import { Figtree } from "next/font/google";

import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { UserProvider } from "@/providers/user-provider";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pictury",
  description: "Get your favourite image here!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <UserProvider>
          <ThemeProvider defaultTheme="dark" attribute="class">
            <Toaster />
            <ModalProvider />
            <Sidebar images={[]}>{children}</Sidebar>
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
