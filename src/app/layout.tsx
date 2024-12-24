'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Toaster from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();

  const hideSidebarRoutes = ["/login"];
  const shouldHideSidebar = hideSidebarRoutes.includes(pathname);

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        {!shouldHideSidebar && <Sidebar />}
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            {children}
            <Toaster position="top-center"
              toastOptions= {{
                duration: 2000,
                style: {
                  background: "#000000",
                  color: "#fff"
                }
              }}
            />
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
