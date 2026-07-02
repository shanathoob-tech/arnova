import React from "react";
import { Metadata } from "next";
import ComputingDetail from "./ComputingDetail";

export const metadata: Metadata = {
  title: "HND Computing Assignment Help Sri Lanka | Pearson BTEC | ARNOVA",
  description:
    "Expert HND computing assignment support in Sri Lanka. 100% original, plagiarism-free, BTEC syllabus mapped guidelines, source code, and design reports.",
};

export default function HndComputingHelpPage() {
  return <ComputingDetail />;
}
