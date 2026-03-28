import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar, User } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BlogContent from "@/components/blog/BlogContent";
import AuthorBio from "@/components/blog/AuthorBio";
import BlogCard from "@/components/blog/BlogCard";
import ArticleSchema from "@/components/blog/ArticleSchema";
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postQuery, postSlugsQuery, relatedPostsQuery } from "@/sanity/lib/queries";
import { blogPostKeywords } from "@/constants/seo-keywords";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://movmash.com";

export const revalidate = 60;

function getArticleExcerpt(body: any, fallbackTitle?: string) {
  if (typeof body === "string") {
    const text = body.trim();
    return text ? `${text.slice(0, 180)}${text.length > 180 ? "..." : ""}` : fallbackTitle;
  }

  if (Array.isArray(body)) {
    const firstBlock = body.find((block: any) => block._type === "block" && block.children);
    const text = firstBlock?.children
      ?.map((child: any) => child.text || "")
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    if (text) {
      return `${text.slice(0, 180)}${text.length > 180 ? "..." : ""}`;
    }
  }

  return fallbackTitle;
}

function getArticleIntro(body: any, title: string) {
  const excerpt = getArticleExcerpt(body)?.trim();

  if (excerpt && excerpt !== `Read ${title} on Movmash blog`) {
    return excerpt;
  }

  return "A Movmash note on making watch parties smoother, clearer, and easier to enjoy together.";
}

async function getPost(slug: string) {
  try {
    const post = await client.fetch(postQuery, { slug });
    return post || null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const imageUrl = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : `${baseUrl}/assets/logo-square.png`;

  const description =
    getArticleExcerpt(post.body, `Read ${post.title} on Movmash blog`) ||
    `Read ${post.title} on Movmash blog`;

  const categoryKeywords = post.categories?.map((cat: any) => cat.title) || [];
  const keywords = [...blogPostKeywords, ...categoryKeywords];

  return {
    title: post.title,
    description,
    keywords: keywords.join(", "),
    authors: post.author?.name ? [{ name: post.author.name }] : undefined,
    openGraph: {
      title: post.title,
      description,
      url: `${baseUrl}/blog/${params.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      tags: categoryKeywords,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/blog/${params.slug}`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(postSlugsQuery);
    return slugs.map((item) => ({
      slug: item.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

async function getRelatedPosts(currentPostId: string, categoryRefs: string[]) {
  try {
    if (categoryRefs.length === 0) return [];
    const posts = await client.fetch(relatedPostsQuery, {
      currentPostId,
      categoryRefs,
    });
    return posts || [];
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const categoryRefs = (post as any).categoryRefs?.filter(Boolean) || [];
  const relatedPosts = await getRelatedPosts(post._id, categoryRefs);

  const imageUrl = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(1400).height(800).url()
    : null;

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const articleImageUrl = imageUrl || `${baseUrl}/assets/logo-square.png`;
  const articleDescription =
    getArticleExcerpt(post.body, `Read ${post.title} on Movmash blog`) ||
    `Read ${post.title} on Movmash blog`;
  const articleIntro = getArticleIntro(post.body, post.title);

  const authorImageUrl = post.author?.image?.asset?._ref
    ? urlFor(post.author.image).width(200).height(200).url()
    : undefined;

  const publishedDateISO = post.publishedAt || new Date().toISOString();
  const categoryLabel = post.categories?.[0]?.title || "Movmash";

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={articleDescription}
        url={`${baseUrl}/blog/${params.slug}`}
        image={articleImageUrl}
        datePublished={publishedDateISO}
        dateModified={publishedDateISO}
        authorName={post.author?.name || "Movmash"}
        authorImage={authorImageUrl}
        publisherName="Movmash"
        categories={post.categories?.map((cat: any) => cat.title) || []}
      />

      <BreadcrumbSchema
        items={[
          { name: "Home", url: baseUrl },
          { name: "Blog", url: `${baseUrl}/blog` },
          { name: post.title, url: `${baseUrl}/blog/${params.slug}` },
        ]}
      />

      <div className="min-h-screen text-white">
        <Navbar />
        <main className="relative overflow-hidden pb-24 pt-24 md:pb-28 md:pt-28">
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[34rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.10)_0%,rgba(244,63,94,0.04)_34%,transparent_76%)] blur-[60px] md:w-[48rem]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(244,63,94,0.03)_0%,transparent_100%)]" />

          <div className="landing-shell relative z-10">
            <article className="mx-auto max-w-6xl">
              <div className="mx-auto max-w-6xl">
                <header className="mt-6 w-full max-w-6xl space-y-5 pb-5 md:pb-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <Link
                      href="/blog"
                      className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back to blog</span>
                    </Link>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38 md:justify-end">
                      {publishedDate ? (
                        <span className="inline-flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{publishedDate}</span>
                        </span>
                      ) : null}
                      {post.author?.name ? <span>By {post.author.name}</span> : null}
                      <span className="inline-flex items-center rounded-full bg-[linear-gradient(90deg,rgba(251,113,133,0.16)_0%,rgba(251,191,36,0.08)_100%)] px-3 py-1.5 text-white/78">
                        {categoryLabel}
                      </span>
                    </div>
                  </div>

                  <h1 className="max-w-5xl font-parkinsans text-[2rem] font-semibold leading-[1.02] tracking-[-0.035em] text-white md:text-[2.6rem] lg:text-[3.1rem]">
                    {post.title}
                  </h1>

                  <p className="max-w-5xl text-base leading-8 text-white/64 md:text-[1.05rem] md:leading-8">
                    {articleIntro}
                  </p>
                </header>
              </div>

              {imageUrl ? (
                <div className="mx-auto mt-5 max-w-6xl md:mt-6">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-white/[0.03] ring-1 ring-white/[0.05] shadow-[0_34px_90px_rgba(0,0,0,0.26)]">
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,12,0.02)_0%,rgba(9,9,12,0.16)_100%)]" />
                  </div>
                </div>
              ) : null}

              <div className="mt-16 w-full max-w-5xl">
                <BlogContent body={post.body} />
              </div>

              {post.author?.bio ? (
                <section className="mt-16 w-full max-w-5xl border-t border-white/6 pt-10">
                  <div className="flex items-start gap-4">
                    {post.author.image?.asset?._ref ? (
                      <div className="relative h-14 w-14 overflow-hidden rounded-full ring-1 ring-white/10">
                        <Image
                          src={urlFor(post.author.image).width(56).height(56).url()}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(251,113,133,0.16)_0%,rgba(255,255,255,0.05)_100%)] ring-1 ring-white/8">
                        <User className="h-6 w-6 text-white/60" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/34">
                        About the author
                      </p>
                      <h2 className="mt-2 font-parkinsans text-[1.3rem] font-semibold tracking-tight text-white">
                        {post.author.name}
                      </h2>
                      <div className="mt-3 text-sm leading-relaxed text-white/62">
                        <AuthorBio bio={post.author.bio} />
                      </div>
                    </div>
                  </div>
                </section>
              ) : null}

              {relatedPosts.length > 0 ? (
                <section className="mt-20 border-t border-white/6 pt-12">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(251,113,133,0.12)_0%,rgba(251,191,36,0.08)_100%)]">
                      <BookOpen className="h-5 w-5 text-white/74" />
                    </div>
                    <div>
                      <h2 className="font-parkinsans text-2xl font-semibold tracking-tight text-white md:text-[2rem]">
                        More from Movmash
                      </h2>
                      <p className="mt-1 text-sm text-white/54">
                        Other reads on rooms, shared watching, and smoother hosting.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {relatedPosts.map((relatedPost: any) => (
                      <BlogCard key={relatedPost._id} post={relatedPost} />
                    ))}
                  </div>
                </section>
              ) : null}
            </article>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
