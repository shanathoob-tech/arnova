import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HND Assignment Help Sri Lanka | Pearson BTEC Computing & Software Engineering | ARNOVA",
  description:
    "Professional HND assignment help in Sri Lanka for Pearson BTEC Computing & Software Engineering students. 100% original, plagiarism-free, on-time delivery. Get Distinction-grade support today!",
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
