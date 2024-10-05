import type { Metadata } from "next";

import { Figtree } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { ModalProvider } from "@/providers/modal-provider";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pictury",
  description: "Get your favourite image here!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <ThemeProvider defaultTheme="dark" attribute="class">
          <ModalProvider />
          <Sidebar>{children}</Sidebar>
        </ThemeProvider>
      </body>
    </html>
  );
}
