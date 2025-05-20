import type { Metadata } from "next";
import "../styles/globals.css";
import Providers from "../components/Providers";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
