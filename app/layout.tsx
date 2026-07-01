import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ARNOVA Assignment | Academic Support Sri Lanka",
  description:
    "Professional assignment support for Degree and HND students with transparent 2025 pricing, fast quotes, and confidential service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
