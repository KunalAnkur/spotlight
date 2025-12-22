import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BlogCard from "@/components/blog/BlogCard";
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import BlogListingSchema from "@/components/SEO/BlogSchema";
import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movmash.com';

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, tips, and stories to help you get the most out of Movmash. Learn about watch parties, video synchronization, and how to make the most of your shared viewing experience.",
  openGraph: {
    title: "Movmash Blog",
    description: "Insights, tips, and stories to help you get the most out of Movmash.",
    url: `${baseUrl}/blog`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
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

// Revalidate every 60 seconds to get fresh data
export const revalidate = 60;

// Step 2: Fetch posts from Sanity
async function getPosts() {
  try {
    const posts = await client.fetch(postsQuery, {}, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    console.log("Fetched posts:", posts?.length || 0, "posts");
    return posts || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  // Fetch posts from Sanity
  const posts = await getPosts();
  
  // Prepare blog posts for ItemList schema (just URLs, not full Article schemas)
  const blogPosts = posts.slice(0, 10).map((post: any) => ({
    title: post.title,
    url: post.slug?.current ? `${baseUrl}/blog/${post.slug.current}` : '',
  }));
  
  return (
    <>
      {/* ItemList Schema - Google recognizes this as a rich result type */}
      <BlogListingSchema
        title="Movmash Blog"
        description="Insights, tips, and stories to help you get the most out of Movmash."
        url={`${baseUrl}/blog`}
        posts={blogPosts}
      />
      
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: baseUrl },
          { name: "Blog", url: `${baseUrl}/blog` },
        ]}
      />
      
      <div className="min-h-screen bg-[#18181b]">
      <Navbar />
      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Background glow effects - same as contact page */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(225,29,72,0.08)_0%,_transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(236,72,153,0.06)_0%,_transparent_70%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Compact Header */}
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-2 text-white">
                <span className="text-gradient">Blog</span>
              </h1>
              <p className="text-white/60 text-sm md:text-base max-w-2xl">
                Insights, tips, and stories to help you get the most out of Movmash.
              </p>
            </div>

            {/* Blog Posts Grid */}
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {posts.map((post: any) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-rose-500/10 to-pink-500/10 mb-4">
                <svg
                  className="w-7 h-7 text-rose-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <p className="text-base text-white/70 mb-1">No blog posts yet</p>
              <p className="text-sm text-white/50">
                Check back soon for exciting content!
              </p>
            </div>
          )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </>
  );
}
