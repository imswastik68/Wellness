"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import SupabaseAuthProvider from "./supabase-auth-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SupabaseAuthProvider>
        {children}
        <Toaster />
      </SupabaseAuthProvider>
    </ThemeProvider>
  );
} 