import React from "react";
import { Metadata } from "next";
import BlogLanding from "./BlogLanding";

export const metadata: Metadata = {
  title: "BTEC HND Computing Study Guides & Blog | ARNOVA Academic Studio",
  description:
    "Explore our free HND computing study tips, BTEC grading guides, and module-specific tutorials. Learn how to write Distinction-grade reports.",
};

export default function BlogIndexPage() {
  return <BlogLanding />;
}
