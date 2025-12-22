import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface BlogCardProps {
  post: {
    _id: string;
    title: string;
    slug?: { current: string } | null;
    mainImage?: any;
    publishedAt?: string;
    author?: {
      name: string;
      image?: any;
    };
    categories?: Array<{ title: string }>;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  // Check if slug exists
  if (!post.slug?.current) {
    return null; // Don't render if no slug
  }

  // Safely get image URL - check if image has asset
  const imageUrl = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(600).height(320).url()
    : null;

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-sm rounded-xl overflow-hidden border border-white/5 hover:border-rose-500/20 transition-all duration-300"
    >
      {/* Image or Default Placeholder */}
      <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-fuchsia-500/10">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-rose-400/60"
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
              <p className="text-xs text-white/40 font-medium">No Image</p>
            </div>
          </div>
        )}
        
        {/* Category Badge - Top Right with better gradient */}
        {post.categories && post.categories.length > 0 && (
          <div className="absolute top-2.5 right-2.5">
            <span className="px-2.5 py-1 text-[10px] font-semibold rounded-md bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 backdrop-blur-sm text-white shadow-lg shadow-rose-500/30">
              {post.categories[0].title}
            </span>
          </div>
        )}

        {/* Date - Bottom Left over image */}
        {publishedDate && (
          <div className="absolute bottom-2.5 left-2.5">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm border border-white/10">
              <Calendar className="w-3 h-3 text-white/80" />
              <span className="text-[10px] text-white/90 font-medium">{publishedDate}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Author in same row */}
        <div className="flex items-start justify-between gap-2">
          {/* Title - Left Aligned */}
          <h3 className="text-base font-bold font-display text-white group-hover:text-rose-400 transition-colors line-clamp-2 leading-snug flex-1 min-w-0">
            {post.title || "Untitled Post"}
          </h3>
          
          {/* Author - Right Aligned */}
          {post.author && (
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {post.author.image?.asset?._ref ? (
                <div className="relative w-4 h-4 rounded-full overflow-hidden">
                  <Image
                    src={urlFor(post.author.image).width(16).height(16).url()}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-rose-500/40 to-pink-500/40 flex items-center justify-center">
                  <User className="w-2.5 h-2.5 text-rose-300" />
                </div>
              )}
              <span className="text-[11px] text-white/60 font-medium whitespace-nowrap">
                {post.author.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
