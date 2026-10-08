import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import BlogLanguages from "@/components/blog/BlogLanguages";
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import BlogListingSchema from "@/components/SEO/BlogSchema";
import SecondaryPageLayout from "@/components/layout/SecondaryPageLayout";
import { blogKeywords } from "@/constants/seo-keywords";
import { defaultLocale, type Locale } from "@/i18n/config";
import { getTranslations, resolveLocale } from "@/i18n/server";
import { blogLanguagePaths } from "@/lib/blog";
import { createPageMetadata, pageUrl } from "@/lib/metadata";
import { client } from "@/sanity/lib/client";
import { postsQuery } from "@/sanity/lib/queries";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const locale = resolveLocale(params.locale);
  const t = getTranslations(locale, "blog");

  return createPageMetadata({
    title: t("metaTitle"),
    description: t("description"),
    path: "/blog",
    // The keyword list is English, so it only belongs on the English page.
    keywords: locale === defaultLocale ? blogKeywords : undefined,
    openGraph: {
      title: t("ogTitle"),
    },
    locale,
    // A language's blog is a page of its own only once it has a post; see blogLanguagePaths.
    languagePaths: await blogLanguagePaths(),
  });
}

export const revalidate = 60;

async function getPosts(locale: Locale) {
  try {
    const posts = await client.fetch(postsQuery, { language: locale }, { next: { revalidate: 60 } });
    return posts || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage({ params }: { params: { locale: string } }) {
  const locale = resolveLocale(params.locale);
  const t = getTranslations(locale, "blog");
  const blogName = getTranslations(locale, "nav")("blog");
  const blogUrl = pageUrl("/blog", locale);
  const posts = await getPosts(locale);
  // Which languages have a blog to offer: the same answer the page's hreflang is built from.
  const blogs = await blogLanguagePaths();
  const blogPosts = posts.slice(0, 10).map((post: any) => ({
    title: post.seoTitle?.trim() || post.title,
    url: post.slug?.current ? pageUrl(`/blog/${post.slug.current}`, locale) : "",
    datePublished: post.publishedAt,
  }));

  return (
    <>
      <BlogListingSchema
        title={t("ogTitle")}
        description={t("description")}
        url={blogUrl}
        posts={blogPosts}
      />

      <BreadcrumbSchema
        items={[
          { name: t("breadcrumbHome"), url: pageUrl("/", locale) },
          { name: blogName, url: blogUrl },
        ]}
      />

      <SecondaryPageLayout>
        <section className="mx-auto w-full max-w-6xl space-y-6">
          <h1 className="text-center font-parkinsans text-[1.65rem] font-semibold tracking-tight text-white md:text-start md:text-[2rem]">
            {t("title")}
          </h1>
          <BlogLanguages current={locale} blogs={blogs} label={t("languages")} soon={t("soon")} />
          {posts.length > 0 ? (
            <>
              <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-start">
                <p className="text-sm text-white/50">{t("intro")}</p>
                <p className="text-sm font-medium text-white/38">
                  {t(posts.length === 1 ? "postCountOne" : "postCountOther", { count: posts.length })}
                </p>
              </div>
              <div className="secondary-blog-grid">
                {posts.map((post: any) => (
                  <BlogCard key={post._id} post={post} locale={locale} />
                ))}
              </div>
            </>
          ) : (
            <div className="mx-auto max-w-2xl">
              <div className="secondary-surface text-center">
                <div className="secondary-page-hero-icon bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500 mb-5">
                  <BookOpenText className="h-6 w-6" />
                </div>
                <h2 className="secondary-card-title">{t("emptyTitle")}</h2>
                <p className="secondary-page-copy mt-4">{t("emptyCopy")}</p>
                {/* A language with no posts yet still has readers: point them at the blog that
                    exists rather than leaving them at a dead end. */}
                {locale !== defaultLocale ? (
                  <Link
                    href="/blog"
                    className="mt-5 inline-flex items-center gap-2 text-sm text-white/72 transition-colors hover:text-white"
                  >
                    {t("emptyCta")}
                    <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </Link>
                ) : null}
              </div>
            </div>
          )}
        </section>
      </SecondaryPageLayout>
    </>
  );
}
