import React from "react";
import { Metadata } from "next";
import BlogDetail from "./BlogDetail";
import { blogPosts } from "../data";

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug];
  if (!post) {
    return {
      title: "Post Not Found | ARNOVA Academic Blog",
    };
  }

  return {
    title: `${post.title} | ARNOVA Blog`,
    description: post.metaDescription,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogDetail slug={params.slug} />;
}
