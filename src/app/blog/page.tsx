import type { Metadata } from "next";
import { BookOpenText } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import BlogListingSchema from "@/components/SEO/BlogSchema";
import SecondaryPageLayout from "@/components/layout/SecondaryPageLayout";
import { blogKeywords } from "@/constants/seo-keywords";
import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://movmash.com";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, tips, and stories to help you get the most out of Movmash. Learn about watch parties, video synchronization, and how to make the most of your shared viewing experience.",
  keywords: blogKeywords.join(", "),
  openGraph: {
    title: "Movmash Blog",
    description: "Insights, tips, and stories to help you get the most out of Movmash.",
    url: `${baseUrl}/blog`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/assets/logo-square.png`,
        width: 1200,
        height: 630,
        alt: "Movmash Blog",
      },
    ],
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
};

export const revalidate = 60;

async function getPosts() {
  try {
    const posts = await client.fetch(postsQuery, {}, { next: { revalidate: 60 } });
    return posts || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  const blogPosts = posts.slice(0, 10).map((post: any) => ({
    title: post.title,
    url: post.slug?.current ? `${baseUrl}/blog/${post.slug.current}` : "",
  }));

  return (
    <>
      <BlogListingSchema
        title="Movmash Blog"
        description="Insights, tips, and stories to help you get the most out of Movmash."
        url={`${baseUrl}/blog`}
        posts={blogPosts}
      />

      <BreadcrumbSchema
        items={[
          { name: "Home", url: baseUrl },
          { name: "Blog", url: `${baseUrl}/blog` },
        ]}
      />

      <SecondaryPageLayout>
        {posts.length > 0 ? (
          <section className="mx-auto w-full max-w-6xl space-y-6">
            <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left">
              <p className="text-sm text-white/50">
                Fresh notes on the product, shared watching, and better room experiences.
              </p>
              <p className="text-sm font-medium text-white/38">
                {posts.length} post{posts.length === 1 ? "" : "s"}
              </p>
            </div>
            <div className="secondary-blog-grid">
              {posts.map((post: any) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          </section>
        ) : (
          <section className="mx-auto max-w-2xl">
            <div className="secondary-surface text-center">
              <div className="secondary-page-hero-icon bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 mb-5">
                <BookOpenText className="h-6 w-6" />
              </div>
              <h2 className="secondary-card-title">No posts yet</h2>
              <p className="secondary-page-copy mt-4">
                We are still preparing the first stories, guides, and product notes. Check
                back soon.
              </p>
            </div>
          </section>
        )}
      </SecondaryPageLayout>
    </>
  );
}
