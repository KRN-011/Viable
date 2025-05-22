import type { Metadata } from "next";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Providers from "../components/Providers";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

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
      <body className={`antialiased`}>
        <Providers>
          <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Providers>
      </body>
    </html>
  );
}
