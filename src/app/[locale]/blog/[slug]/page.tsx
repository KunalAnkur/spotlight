import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Link2, User } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BlogContent from "@/components/blog/BlogContent";
import AuthorBio from "@/components/blog/AuthorBio";
import BlogCard from "@/components/blog/BlogCard";
import ArticleSchema from "@/components/blog/ArticleSchema";
import BreadcrumbSchema from "@/components/SEO/BreadcrumbSchema";
import FAQPageSchema from "@/components/SEO/FAQPageSchema";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postQuery, postSlugsQuery, relatedPostsQuery } from "@/sanity/lib/queries";
import { blogPostKeywords } from "@/constants/seo-keywords";
import retiredPosts from "@/content/retired-posts.json";
import { dateLocales, defaultLocale, locales, localizePath, type Locale } from "@/i18n/config";
import { getTranslations, resolveLocale, type Translator } from "@/i18n/server";
import { postLanguagePaths } from "@/lib/blog";
import { createPageMetadata, createSocialImage, pageUrl } from "@/lib/metadata";

export const revalidate = 60;

// These slugs are served by a permanent redirect in next.config.mjs, so prerendering them
// only produces pages nothing can ever reach. The redirects are English addresses.
const retiredSlugs = new Set(retiredPosts.map(({ from }) => from.replace("/blog/", "")));

/**
 * Authors habitually type the brand into Sanity's SEO Title ("... | Movmash"), and the root
 * layout's title template appends "| Movmash" again — which is how nine live posts ended up
 * titled "... | Movmash | Movmash" in the SERP. Strip any trailing brand segment here so the
 * template owns the suffix and the CMS field stays forgiving.
 */
function stripBrandSuffix(value: string) {
  return value.replace(/(?:\s*[|–—-]\s*Movmash\s*)+$/i, "").trim();
}

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

function getArticleDescription(post: any, t: Translator) {
  const explicitDescription = post.seoDescription?.trim();
  if (explicitDescription) {
    return explicitDescription;
  }

  const explicitExcerpt = post.excerpt?.trim();
  if (explicitExcerpt) {
    return explicitExcerpt;
  }

  const snippetAnswer = post.featuredSnippetAnswer?.trim();
  if (snippetAnswer) {
    return snippetAnswer;
  }

  const fallback = t("readOn", { title: post.title });
  return getArticleExcerpt(post.body, fallback) || fallback;
}

function getArticleIntro(post: any, t: Translator) {
  const featuredAnswer = post.featuredSnippetAnswer?.trim();

  if (featuredAnswer) {
    return featuredAnswer;
  }

  const excerpt = post.excerpt?.trim() || getArticleExcerpt(post.body)?.trim();

  if (excerpt && excerpt !== t("readOn", { title: post.title })) {
    return excerpt;
  }

  return t("defaultIntro");
}

/** The landing pages a post can point at, and the "blog" message keys that describe each. */
const relatedLandingPages: Record<string, string> = {
  "/": "relatedHome",
  "/watch-together": "relatedWatchTogether",
  "/long-distance-date-night": "relatedDateNight",
};

/**
 * A post belongs to one language. The same slug asked for under another language is not this
 * post — /tr/blog/an-english-slug is a 404, not the English article with Turkish menus.
 */
async function getPost(slug: string, locale: Locale) {
  try {
    const post = await client.fetch(postQuery, { slug, language: locale });
    return post || null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale = resolveLocale(params.locale);
  const post = await getPost(params.slug, locale);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const imageUrl = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(1200).height(630).fit("crop").format("jpg").url()
    : createSocialImage().url;

  const description = getArticleDescription(post, getTranslations(locale, "blog"));
  const metadataTitle = stripBrandSuffix(post.seoTitle?.trim() || post.title) || post.title;

  const categoryKeywords = post.categories?.map((cat: any) => cat.title) || [];
  const primaryKeyword = post.primaryKeyword?.trim();
  const keywords = [
    // The shared keyword list is English, so it only belongs on English posts.
    ...(locale === defaultLocale ? blogPostKeywords : []),
    ...categoryKeywords,
    ...(primaryKeyword ? [primaryKeyword] : []),
  ];

  return {
    ...createPageMetadata({
      title: metadataTitle,
      description,
      path: `/blog/${params.slug}`,
      keywords,
      image: createSocialImage({
        url: imageUrl,
        alt: post.title,
      }),
      openGraphType: "article",
      openGraph: {
        type: "article",
        publishedTime: post.publishedAt,
        authors: post.author?.name ? [post.author.name] : undefined,
        tags: categoryKeywords,
      },
      locale,
      // Each translation has its own slug, so the post says where its other languages live.
      languagePaths: postLanguagePaths({ ...post, slug: params.slug }),
    }),
    authors: post.author?.name ? [{ name: post.author.name }] : undefined,
  };
}

/** Called once per language by Next, with that language in `params`: only its own posts. */
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  try {
    const posts = await client.fetch<{ slug: string; language: string }[]>(postSlugsQuery);
    return posts
      .filter((post) => post.language === params.locale)
      .filter((post) => !(post.language === defaultLocale && retiredSlugs.has(post.slug)))
      .map((post) => ({
        slug: post.slug,
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

async function getRelatedPosts(currentPostId: string, categoryRefs: string[], locale: Locale) {
  try {
    if (categoryRefs.length === 0) return [];
    const posts = await client.fetch(relatedPostsQuery, {
      currentPostId,
      categoryRefs,
      language: locale,
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
  params: { locale: string; slug: string };
}) {
  const locale = resolveLocale(params.locale);
  const post = await getPost(params.slug, locale);

  if (!post) {
    notFound();
  }

  const t = getTranslations(locale, "blog");
  const blogName = getTranslations(locale, "nav")("blog");
  const postUrl = pageUrl(`/blog/${params.slug}`, locale);

  // The language menu leads to this post's translation where one exists, and to that
  // language's blog where it does not — never to this slug under another language.
  const versions = postLanguagePaths({ ...post, slug: params.slug });
  const languageMenuPaths = Object.fromEntries(
    locales.map((language) => [language, versions[language] ?? "/blog"]),
  );

  const categoryRefs = (post as any).categoryRefs?.filter(Boolean) || [];
  const relatedPosts = await getRelatedPosts(post._id, categoryRefs, locale);

  const imageUrl = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(1600).fit("max").auto("format").url()
    : null;

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(dateLocales[locale], {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Most posts were rewritten long after they were first published. Showing only the
  // original date makes a current guide look stale in the SERP, so surface the editorial
  // update date when it is a different day.
  const updatedDate =
    post.updatedAt && post.updatedAt.slice(0, 10) !== post.publishedAt?.slice(0, 10)
      ? new Date(post.updatedAt).toLocaleDateString(dateLocales[locale], {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";

  const faqs = Array.isArray(post.faq)
    ? post.faq.filter((item: any) => item?.question && item?.answer)
    : [];

  const articleImageUrl = imageUrl || createSocialImage().url;
  const articleDescription = getArticleDescription(post, t);
  const articleIntro = getArticleIntro(post, t);

  const authorImageUrl = post.author?.image?.asset?._ref
    ? urlFor(post.author.image).width(200).height(200).url()
    : undefined;

  const publishedDateISO = post.publishedAt || new Date().toISOString();
  const modifiedDateISO = post.updatedAt || post._updatedAt || post.publishedAt || new Date().toISOString();
  const categoryLabel = post.categories?.[0]?.title || "Movmash";
  const primaryKeyword = post.primaryKeyword?.trim();
  const schemaKeywords = [...(post.categories?.map((cat: any) => cat.title) || []), ...(primaryKeyword ? [primaryKeyword] : [])];
  const relatedLandingPage = relatedLandingPages[post.relatedLandingPage || ""];

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={articleDescription}
        url={postUrl}
        image={articleImageUrl}
        datePublished={publishedDateISO}
        dateModified={modifiedDateISO}
        authorName={post.author?.name || "Movmash"}
        authorImage={authorImageUrl}
        publisherName="Movmash"
        categories={post.categories?.map((cat: any) => cat.title) || []}
        keywords={schemaKeywords}
        inLanguage={locale}
      />

      <BreadcrumbSchema
        items={[
          { name: t("breadcrumbHome"), url: pageUrl("/", locale) },
          { name: blogName, url: pageUrl("/blog", locale) },
          { name: post.title, url: postUrl },
        ]}
      />

      {/* The questions are already on the page; this is the same markup the landing pages
          emit, for answer engines rather than a SERP rich result. */}
      <FAQPageSchema faqs={faqs} />

      <div className="min-h-screen text-white">
        <Navbar languagePaths={languageMenuPaths} />
        <main className="relative overflow-hidden pb-24 pt-24 md:pb-28 md:pt-28">
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[34rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(244,63,94,0.10)_0%,rgba(244,63,94,0.04)_34%,transparent_76%)] blur-[60px] md:w-[48rem]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(244,63,94,0.03)_0%,transparent_100%)]" />

          <div className="landing-shell relative z-10">
            <article className="mx-auto max-w-6xl">
              <div className="mx-auto max-w-6xl">
                <header className="mt-6 w-full max-w-6xl space-y-5 pb-5 md:pb-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <Link
                      href={localizePath(locale, "/blog")}
                      className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
                    >
                      <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                      <span>{t("back")}</span>
                    </Link>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/38 md:justify-end">
                      {publishedDate ? (
                        <span className="inline-flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{publishedDate}</span>
                        </span>
                      ) : null}
                      {updatedDate ? <span>{t("updated", { date: updatedDate })}</span> : null}
                      {post.author?.name ? <span>{t("by", { name: post.author.name })}</span> : null}
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
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] ring-1 ring-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.26)]">
                      <Image
                        src={imageUrl}
                        // What the picture shows, as the editor described it. Repeating the
                        // title told a reader who cannot see it nothing they had not just heard.
                        alt={post.mainImage?.alt?.trim() || post.title}
                        fill
                        sizes="(min-width: 1280px) 1152px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)"
                        className="object-cover object-center"
                        priority
                      />
                  </div>
                </div>
              ) : null}

              <div className="mt-16 w-full max-w-5xl">
                <BlogContent body={post.body} />
              </div>

              {relatedLandingPage ? (
                <section className="mt-14 w-full max-w-5xl border-t border-white/6 pt-8">
                  <div className="rounded-[1.35rem] bg-white/[0.022] px-5 py-5 sm:px-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/34">
                      {t("relatedPage")}
                    </p>
                    <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h2 className="font-parkinsans text-[1.05rem] font-semibold tracking-tight text-white">
                          {t(`${relatedLandingPage}Title`)}
                        </h2>
                        <p className="mt-1.5 max-w-2xl text-sm leading-7 text-white/60">
                          {t(`${relatedLandingPage}Copy`)}
                        </p>
                      </div>
                      <Link
                        href={localizePath(locale, post.relatedLandingPage)}
                        className="inline-flex items-center gap-2 text-sm text-white/72 transition-colors hover:text-white"
                      >
                        <Link2 className="h-4 w-4" />
                        {t("openPage")}
                        <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                      </Link>
                    </div>
                  </div>
                </section>
              ) : null}

              {faqs.length > 0 ? (
                <section className="mt-16 w-full max-w-5xl border-t border-white/6 pt-10">
                  <div className="space-y-5">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/34">
                        {t("faqKicker")}
                      </p>
                      <h2 className="mt-2 font-parkinsans text-[1.4rem] font-semibold tracking-tight text-white md:text-[1.7rem]">
                        {t("faqTitle")}
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {faqs.map((item: any) => (
                        <article key={item.question} className="rounded-[1.2rem] bg-white/[0.02] px-5 py-5">
                          <h3 className="font-parkinsans text-[1rem] font-semibold tracking-tight text-white">
                            {item.question}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-white/62">
                            {item.answer}
                          </p>
                        </article>
                      ))}
                    </div>
                  </div>
                </section>
              ) : null}

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
                        {t("aboutAuthor")}
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
                        {t("moreTitle")}
                      </h2>
                      <p className="mt-1 text-sm text-white/54">
                        {t("moreCopy")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {relatedPosts.map((relatedPost: any) => (
                      <BlogCard key={relatedPost._id} post={relatedPost} locale={locale} />
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
