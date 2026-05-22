import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Footer } from "@/components/layout/footer";

import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "AnsCTF",
  description: "Modern CTF Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}

          <Toaster
            richColors
            position="top-center"
          />
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}