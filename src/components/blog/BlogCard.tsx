import Link from "next/link";
import Image from "next/image";
import { Calendar, User } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface BlogCardProps {
  post: {
    _id: string;
    title: string;
    seoTitle?: string;
    excerpt?: string;
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
  const visibleTitle = post.seoTitle?.trim() || post.title || "Untitled Post";
  const excerpt = post.excerpt?.trim();

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-white/[0.02] transition-colors duration-200 hover:bg-white/[0.03]"
    >
      <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-rose-500/12 via-pink-500/8 to-fuchsia-500/10">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090c]/72 via-[#09090c]/18 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.05]">
                <svg
                  className="h-8 w-8 text-white/40"
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
              <p className="text-xs font-medium text-white/36">No cover image</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
          {post.categories && post.categories.length > 0 ? (
            <span className="text-white/56">{post.categories[0].title}</span>
          ) : (
            <span>Movmash</span>
          )}
          {publishedDate ? (
            <>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3 w-3" />
                {publishedDate}
              </span>
            </>
          ) : null}
        </div>

        <h3 className="mt-3 line-clamp-2 font-parkinsans text-lg font-semibold leading-tight tracking-tight text-white transition-colors group-hover:text-white/88">
          {visibleTitle}
        </h3>

        {excerpt ? (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/60">
            {excerpt}
          </p>
        ) : null}

        {post.author ? (
          <div className="mt-auto flex items-center gap-2.5 pt-5 text-xs text-white/56">
            {post.author.image?.asset?._ref ? (
              <div className="relative h-5 w-5 overflow-hidden rounded-full">
                <Image
                  src={urlFor(post.author.image).width(20).height(20).url()}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/8">
                <User className="h-3 w-3 text-white/50" />
              </div>
            )}
            <span>{post.author.name}</span>
          </div>
        ) : null}
      </div>
    </Link>
  );
}
