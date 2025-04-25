import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Solana Stae - Network Analytics",
  description: "Real-time Solana network analytics and monitoring",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}