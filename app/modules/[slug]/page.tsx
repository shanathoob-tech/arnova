import React from "react";
import { Metadata } from "next";
import ModuleDetail from "./ModuleDetail";
import { moduleMap } from "./data";

export async function generateStaticParams() {
  return Object.keys(moduleMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const module = moduleMap[params.slug];
  if (!module) {
    return {
      title: "Module Not Found | ARNOVA Academic Studio",
    };
  }

  const keyword = `${module.name} ${module.abbreviation ? `(${module.abbreviation}) ` : ""}Assignment Help Sri Lanka`;
  return {
    title: `${keyword} | Pearson BTEC HND Computing | ARNOVA`,
    description: `Get Distinction-grade ${module.name} assignment help in Sri Lanka. 100% original, plagiarism-free solutions, reports, and code scripts.`,
  };
}

export default function ModulePage({ params }: { params: { slug: string } }) {
  return <ModuleDetail slug={params.slug} />;
}
