import type { Metadata } from "next";
import "../styles/globals.css";
import Providers from "../components/Providers";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Viable",
  description: "Your Reading Arena",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-background-lightMuted`}>
        <Providers>
          <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
}
