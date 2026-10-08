/**
 * What a search engine receives from each language of the site.
 *
 * Black-box on purpose: these read the served HTML the way a crawler does, so they hold
 * whatever the implementation looks like. Run against a dev or production server:
 *
 *   node --test scripts/seo-i18n.test.mjs          (expects http://localhost:3111)
 *   BASE_URL=http://localhost:3000 node --test scripts/seo-i18n.test.mjs
 *   BASE_URL=https://movmash.com node --test scripts/seo-i18n.test.mjs
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const base = process.env.BASE_URL ?? "http://localhost:3111";
const site = "https://movmash.com";

/** A path that is not translated yet. Swap it for another when legal gets translated. */
const untranslated = "/legal";

const everyLanguage = {
  en: site,
  tr: `${site}/tr`,
  es: `${site}/es`,
  ar: `${site}/ar`,
  "x-default": site,
};

async function get(path, headers = {}) {
  const res = await fetch(base + path, { redirect: "manual", headers });
  return { status: res.status, location: res.headers.get("location"), html: await res.text() };
}

/** Every `<name …>` tag in the document, as a lower-cased attribute map. */
function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b([^>]*)>`, "gi"))].map(([, attrs]) =>
    Object.fromEntries(
      [...attrs.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key.toLowerCase(), value]),
    ),
  );
}

const canonical = (html) => tags(html, "link").find((link) => link.rel === "canonical")?.href;
const robots = (html) => tags(html, "meta").find((meta) => meta.name === "robots")?.content;
const ogLocale = (html) => tags(html, "meta").find((meta) => meta.property === "og:locale")?.content;
const title = (html) => html.match(/<title>([^<]*)<\/title>/)?.[1];

const hreflang = (html) =>
  Object.fromEntries(
    tags(html, "link")
      .filter((link) => link.rel === "alternate" && link.hreflang)
      .map((link) => [link.hreflang, link.href]),
  );

/** The language menu: anchors that say which language they lead to. */
const languageMenu = (html) =>
  Object.fromEntries(
    tags(html, "a")
      .filter((a) => a.hreflang)
      .map((a) => [a.hreflang, a.href]),
  );

/** Every other same-site link on the page. */
const siteLinks = (html) =>
  tags(html, "a")
    .filter((a) => !a.hreflang && a.href?.startsWith("/"))
    .map((a) => a.href);

const webPageNode = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map(([, json]) => JSON.parse(json))
    .find((node) => node["@type"] === "WebPage");

test("the English home page stays at / and names every language version", async () => {
  const { status, html } = await get("/");

  assert.equal(status, 200);
  assert.equal(tags(html, "html")[0].lang, "en");
  assert.equal(canonical(html), site);
  assert.match(robots(html), /^index/);
  assert.deepEqual(hreflang(html), everyLanguage);
});

for (const [locale, expected] of Object.entries({
  tr: { dir: "ltr", ogLocale: "tr_TR" },
  es: { dir: "ltr", ogLocale: "es_ES" },
  ar: { dir: "rtl", ogLocale: "ar_AR" },
})) {
  test(`/${locale} is an indexable page of its own, not a hidden copy of English`, async () => {
    const english = await get("/");
    const { status, html } = await get(`/${locale}`);

    assert.equal(status, 200);
    assert.equal(tags(html, "html")[0].lang, locale);
    assert.equal(tags(html, "html")[0].dir, expected.dir);
    assert.equal(canonical(html), `${site}/${locale}`);
    assert.match(robots(html), /^index/);
    assert.deepEqual(hreflang(html), everyLanguage);
    assert.equal(ogLocale(html), expected.ogLocale);
    assert.notEqual(title(html), title(english.html), "the search title is still English");
  });

  test(`/${locale} describes itself in its own language in structured data`, async () => {
    const node = webPageNode((await get(`/${locale}`)).html);

    assert.equal(node.inLanguage, locale);
    assert.equal(node.url, `${site}/${locale}`);
  });
}

test("an address serves one language, whatever language cookie the visitor carries", async () => {
  const { html } = await get("/", { cookie: "NEXT_LOCALE=tr" });

  assert.equal(tags(html, "html")[0].lang, "en");
});

test("/en redirects to the bare English address instead of duplicating it", async () => {
  const home = await get("/en");
  const games = await get("/en/games?from=test");

  assert.equal(home.status, 308);
  assert.equal(new URL(home.location, base).pathname, "/");
  assert.equal(games.status, 308);
  assert.equal(new URL(games.location, base).pathname, "/games");
  assert.equal(new URL(games.location, base).search, "?from=test");
});

test("a page whose copy is still English stays out of the index in other languages", async () => {
  const { status, html } = await get(`/tr${untranslated}`);

  assert.equal(status, 200);
  assert.match(robots(html), /noindex/);
  assert.equal(canonical(html), site + untranslated);
  assert.deepEqual(hreflang(html), {});
});

test("made-up file addresses are 404s rather than copies of the home page", async () => {
  assert.equal((await get("/wp-login.php")).status, 404);
  assert.equal((await get("/index.html")).status, 404);
});

test("real static files are still served", async () => {
  assert.equal((await get("/favicon.ico")).status, 200);
});

test("the language menu is plain links to the same page in each language", async () => {
  assert.deepEqual(languageMenu((await get("/")).html), {
    en: "/",
    tr: "/tr",
    es: "/es",
    ar: "/ar",
  });
  assert.deepEqual(languageMenu((await get(`/tr${untranslated}`)).html), {
    en: untranslated,
    tr: `/tr${untranslated}`,
    es: `/es${untranslated}`,
    ar: `/ar${untranslated}`,
  });
});

test("links on a Turkish page keep the visitor in Turkish", async () => {
  const links = siteLinks((await get("/tr")).html);

  assert.ok(links.includes("/tr/games"), "the games link is missing");
  assert.ok(links.includes("/tr#features"), "the features anchor is missing");
  assert.deepEqual(
    links.filter((href) => !/^\/tr(?:[/#?]|$)/.test(href)),
    [],
    "these links drop back to English",
  );
});

test("every link in the footer leads to a page, in every language", async () => {
  const seen = new Map();

  for (const language of ["en", "tr", "es", "ar"]) {
    const { html } = await get(language === "en" ? "/" : `/${language}`);
    const footer = html.match(/<footer[\s\S]*<\/footer>/)?.[0];
    assert.ok(footer, `the ${language} home page has no footer`);

    for (const href of siteLinks(footer)) {
      const path = href.split("#")[0];
      if (!seen.has(path)) seen.set(path, (await get(path)).status);
      assert.equal(seen.get(path), 200, `${href}, linked from the ${language} footer`);
    }
  }
});

test("links on an English page never carry a language prefix", async () => {
  const links = siteLinks((await get("/")).html);

  assert.deepEqual(links.filter((href) => /^\/(?:en|tr|es|ar)(?:[/#?]|$)/.test(href)), []);
});

test("the sitemap lists each language of a translated page and skips untranslated ones", async () => {
  const { html: xml } = await get("/sitemap.xml");

  for (const url of [site, `${site}/tr`, `${site}/es`, `${site}/ar`]) {
    assert.ok(xml.includes(`<loc>${url}</loc>`), `${url} is not in the sitemap`);
  }
  assert.ok(
    xml.includes(`<xhtml:link rel="alternate" hreflang="ar" href="${site}/ar" />`),
    "language alternates are missing from the sitemap",
  );
  assert.ok(xml.includes(`<loc>${site}${untranslated}</loc>`));
  assert.ok(!xml.includes(`<loc>${site}/tr${untranslated}</loc>`));
});

/* ------------------------------------------------------------------------------------------
 * The landing pages.
 *
 * Each exists in every language: one address per language, its own search title, its own copy.
 * "Its own copy" is checked the blunt way — nothing a visitor reads on the English page may
 * turn up again on the Turkish one, apart from names that are the same everywhere.
 * ---------------------------------------------------------------------------------------- */

const landingPages = ["/watch-together", "/long-distance-date-night", "/games"];

const otherLanguages = {
  tr: { dir: "ltr", ogLocale: "tr_TR" },
  es: { dir: "ltr", ogLocale: "es_ES" },
  ar: { dir: "rtl", ogLocale: "ar_AR" },
};

/** Names that read the same in every language. */
const sameEverywhere = new Set([
  "YouTube", "Vimeo", "Twitch", "Dailymotion", "Netflix", "Disney+", "Prime Video", "Max", "Hulu",
  "Crunchyroll", "Movmash", "Connect 4",
]);

/** An attribute or text value as the reader meets it, with HTML escaping undone. */
const unescaped = (value = "") =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

/** The page between the menu and the footer. */
const mainOf = (html) => html.match(/<main\b[\s\S]*<\/main>/)?.[0] ?? "";

/** Everything a visitor reads or is read aloud in a piece of HTML: text, image descriptions, labels. */
function wording(html) {
  const text = html
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, " ")
    .split(/<[^>]*>/)
    .map((piece) => unescaped(piece).trim());
  const spoken = [...html.matchAll(/\s(?:alt|aria-label|title)="([^"]*)"/g)].map(([, value]) => unescaped(value).trim());

  return new Set([...text, ...spoken].filter((piece) => /\p{L}{2}/u.test(piece) && !sameEverywhere.has(piece)));
}

const description = (html) => tags(html, "meta").find((meta) => meta.name === "description")?.content;
const headings = (html) => [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(([, inner]) => inner);

const schemaNodes = (html, type) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map(([, json]) => JSON.parse(json))
    .filter((node) => node["@type"] === type);

for (const path of landingPages) {
  const everyVersion = {
    en: site + path,
    tr: `${site}/tr${path}`,
    es: `${site}/es${path}`,
    ar: `${site}/ar${path}`,
    "x-default": site + path,
  };

  test(`${path} names every language version`, async () => {
    const { status, html } = await get(path);

    assert.equal(status, 200);
    assert.equal(tags(html, "html")[0].lang, "en");
    assert.equal(canonical(html), site + path);
    assert.match(robots(html), /^index/);
    assert.deepEqual(hreflang(html), everyVersion);
  });

  for (const [locale, expected] of Object.entries(otherLanguages)) {
    const address = `/${locale}${path}`;

    test(`${address} is an indexable page of its own`, async () => {
      const english = await get(path);
      const { status, html } = await get(address);

      assert.equal(status, 200);
      assert.equal(tags(html, "html")[0].lang, locale);
      assert.equal(tags(html, "html")[0].dir, expected.dir);
      assert.equal(canonical(html), site + address);
      assert.match(robots(html), /^index/);
      assert.deepEqual(hreflang(html), everyVersion);
      assert.equal(ogLocale(html), expected.ogLocale);
      assert.notEqual(title(html), title(english.html), "the search title is still English");
      assert.notEqual(description(html), description(english.html), "the search description is still English");
      assert.ok(unescaped(title(html)).length <= 60, `the search title is ${unescaped(title(html)).length} characters`);
      assert.ok(unescaped(description(html)).length <= 160, `the search description is ${unescaped(description(html)).length} characters`);
    });

    test(`${address} is written in its own language from the heading to the last question`, async () => {
      const english = await get(path);
      const { html } = await get(address);

      assert.equal(headings(html).length, 1, `${address} has ${headings(html).length} main headings`);
      assert.notEqual(headings(html)[0], headings(english.html)[0], "the main heading is still English");

      const englishWording = wording(mainOf(english.html));
      assert.ok(englishWording.size > 40, "the English page gave too little to compare with");
      assert.deepEqual(
        [...wording(mainOf(html))].filter((piece) => englishWording.has(piece)),
        [],
        `${address} still says these in English`,
      );
    });

    test(`${address} describes itself in its own language in structured data`, async () => {
      const english = await get(path);
      const { html } = await get(address);
      const page = schemaNodes(html, "WebPage")[0];
      const questions = (source) => schemaNodes(source, "FAQPage")[0].mainEntity.map((entry) => entry.name);
      const crumbs = schemaNodes(html, "BreadcrumbList")[0].itemListElement;

      assert.equal(page.inLanguage, locale);
      assert.equal(page.url, site + address);
      assert.equal(questions(html).length, questions(english.html).length, "a question went missing");
      assert.deepEqual(
        questions(html).filter((question) => questions(english.html).includes(question)),
        [],
        "these questions are still English",
      );
      assert.deepEqual(crumbs.map((crumb) => crumb.item), [`${site}/${locale}`, site + address]);
    });

    test(`every link on ${address} keeps the visitor in ${locale} and leads to a page`, async () => {
      const links = siteLinks(mainOf((await get(address)).html));

      assert.ok(links.length > 0, "the page has no links to check");
      assert.deepEqual(
        links.filter((href) => !new RegExp(`^/${locale}(?:[/#?]|$)`).test(href)),
        [],
        "these links drop back to English",
      );
      for (const href of new Set(links.map((link) => link.split("#")[0]))) {
        assert.equal((await get(href)).status, 200, `${href}, linked from ${address}`);
      }
    });
  }
}

test("the sitemap lists every language of the landing pages", async () => {
  const { html: xml } = await get("/sitemap.xml");

  for (const path of landingPages) {
    for (const prefix of ["", "/tr", "/es", "/ar"]) {
      assert.ok(xml.includes(`<loc>${site}${prefix}${path}</loc>`), `${prefix}${path} is not in the sitemap`);
    }
    assert.ok(
      xml.includes(`<xhtml:link rel="alternate" hreflang="ar" href="${site}/ar${path}" />`),
      `${path} names no language alternates in the sitemap`,
    );
  }
});

/* ------------------------------------------------------------------------------------------
 * The blog.
 *
 * A post is a separate document per language, so what to expect depends on what is published.
 * The expectations are read from Sanity directly — the same public dataset the site reads —
 * and the served pages are checked against them. With no translated post published yet, the
 * translation checks have nothing to look at and pass trivially; they start biting the day
 * the first translation goes live.
 * ---------------------------------------------------------------------------------------- */

const languages = ["en", "tr", "es", "ar"];

const env = Object.fromEntries(
  readFileSync(new URL("../.env", import.meta.url), "utf8")
    .split("\n")
    .filter((line) => /^[A-Z_]+=/.test(line))
    .map((line) => [
      line.slice(0, line.indexOf("=")),
      line.slice(line.indexOf("=") + 1).trim().replace(/^["']|["']$/g, ""),
    ]),
);

async function sanity(query) {
  const res = await fetch(
    `https://${env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2025-12-22/data/query/` +
      `${env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`,
  );
  return (await res.json()).result;
}

const posts = await sanity(`*[_type == "post" && defined(slug.current)]{
  "slug": slug.current,
  "language": coalesce(language, "en"),
  "modified": coalesce(updatedAt, _updatedAt),
  "coverAlt": mainImage.alt,
  "versions": *[_type == "translation.metadata" && references(^._id)][0].translations[].value->{
    "language": coalesce(language, "en"),
    "slug": slug.current
  }
}`);

/** "/blog", "/tr/blog", "/blog/a-slug", "/tr/blog/bir-adres". */
const blogPath = (language, slug) =>
  `${language === "en" ? "" : `/${language}`}/blog${slug ? `/${slug}` : ""}`;

const languagesWithPosts = languages.filter((language) =>
  posts.some((post) => post.language === language),
);

/** Where a post lives in each language it has been published in, itself included. */
const versionsOf = (post) =>
  Object.fromEntries(
    [...(post.versions ?? []), post]
      .filter((version) => version?.slug)
      .map((version) => [version.language, blogPath(version.language, version.slug)]),
  );

/** hreflang as it should be served for a set of language versions. */
function expectedHreflang(paths) {
  if (Object.keys(paths).length < 2) return {};
  const links = Object.fromEntries(
    languages.filter((language) => paths[language]).map((language) => [language, site + paths[language]]),
  );
  return paths.en ? { ...links, "x-default": site + paths.en } : links;
}

/** One post per language, plus every post that has a translation. */
const samplePosts = [
  ...languagesWithPosts.map((language) => posts.find((post) => post.language === language)),
  ...posts.filter((post) => Object.keys(versionsOf(post)).length > 1),
].filter((post, index, all) => all.indexOf(post) === index);

const schemaNode = (html, type) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map(([, json]) => JSON.parse(json))
    .find((node) => node["@type"] === type);

test("each language's blog lists that language's posts and no others", async () => {
  for (const language of languagesWithPosts) {
    const links = siteLinks((await get(blogPath(language))).html);

    for (const post of posts) {
      const href = blogPath(post.language, post.slug);
      assert.equal(links.includes(href), post.language === language, `${href} on ${blogPath(language)}`);
    }
  }
});

test("every blog has one main heading, written in its own language", async () => {
  const headingOf = async (language) => {
    const headings = [...(await get(blogPath(language))).html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
    assert.equal(headings.length, 1, `${blogPath(language)} has ${headings.length} main headings`);
    return headings[0][1];
  };
  const english = await headingOf("en");

  for (const language of languages.filter((other) => other !== "en")) {
    assert.notEqual(await headingOf(language), english, `${blogPath(language)} is headed in English`);
  }
});

test("a blog offers every language as a pill: its own marked, those with posts linked, the empty ones not", async () => {
  for (const language of languages) {
    const { html } = await get(blogPath(language));
    const pills = html.match(/<nav[^>]*id="blog-languages"[\s\S]*?<\/nav>/)?.[0];
    assert.ok(pills, `${blogPath(language)} has no language pills`);

    const others = languages.filter((other) => other !== language);
    const marked = (attribute, value) =>
      tags(pills, "span").filter((span) => span[attribute] === value).map((span) => span.lang);

    assert.deepEqual(marked("aria-current", "page"), [language], `the pill of ${blogPath(language)} itself`);
    // A pill is a link only when there is something to read behind it.
    assert.deepEqual(
      Object.fromEntries(tags(pills, "a").map((a) => [a.hreflang, a.href])),
      Object.fromEntries(others.filter((other) => languagesWithPosts.includes(other)).map((other) => [other, blogPath(other)])),
      `the links on ${blogPath(language)}`,
    );
    assert.deepEqual(
      marked("aria-disabled", "true").sort(),
      others.filter((other) => !languagesWithPosts.includes(other)).sort(),
      `the languages ${blogPath(language)} shows as not written yet`,
    );
  }
});

test("a blog that has posts is indexable under its own address", async () => {
  const blogs = Object.fromEntries(languagesWithPosts.map((language) => [language, blogPath(language)]));

  for (const language of languagesWithPosts) {
    const { status, html } = await get(blogPath(language));

    assert.equal(status, 200);
    assert.equal(tags(html, "html")[0].lang, language);
    assert.equal(canonical(html), site + blogPath(language));
    assert.match(robots(html), /^index/);
    assert.deepEqual(hreflang(html), expectedHreflang(blogs));
  }
});

test("a language with no posts yet keeps its blog out of the index and offers the English one", async () => {
  for (const language of languages.filter((other) => !languagesWithPosts.includes(other))) {
    const { status, html } = await get(blogPath(language));
    const links = siteLinks(html);

    assert.equal(status, 200);
    assert.match(robots(html), /noindex/);
    assert.equal(canonical(html), `${site}/blog`);
    assert.deepEqual(hreflang(html), {});
    assert.ok(links.includes("/blog"), `${blogPath(language)} has no link to the English blog`);
    assert.deepEqual(
      links.filter((href) => /\/blog\/./.test(href)),
      [],
      `${blogPath(language)} lists posts written in another language`,
    );
  }
});

/** An attribute value as the reader hears it, with React's escaping undone. */
const plain = (value = "") =>
  value.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&amp;/g, "&");

test("a post's cover is described in the words its editor wrote, on its page and on its card", async () => {
  const described = samplePosts.filter((post) => post.coverAlt);
  assert.ok(described.length > 0, "no sample post has a cover description to look for");

  for (const post of described) {
    const pages = { page: blogPath(post.language, post.slug), index: blogPath(post.language) };

    for (const [where, path] of Object.entries(pages)) {
      const images = tags((await get(path)).html, "img");

      assert.ok(
        images.some((image) => plain(image.alt) === post.coverAlt),
        `${post.slug}: no image on the blog ${where} is described as "${post.coverAlt}"`,
      );
    }
  }
});

test("a post is served under its own language and nowhere else", async () => {
  const post = posts.find((candidate) => candidate.language === "en");

  assert.equal((await get(blogPath("en", post.slug))).status, 200);

  for (const language of languages.filter((other) => other !== "en")) {
    if (posts.some((other) => other.language === language && other.slug === post.slug)) continue;
    assert.equal(
      (await get(blogPath(language, post.slug))).status,
      404,
      `${blogPath(language, post.slug)} serves an English post as if it were ${language}`,
    );
  }
});

test("a post names its language, its own address and every translation", async () => {
  for (const post of samplePosts) {
    const path = blogPath(post.language, post.slug);
    const { status, html } = await get(path);
    const article = schemaNode(html, "Article");

    assert.equal(status, 200, path);
    assert.equal(tags(html, "html")[0].lang, post.language, path);
    assert.equal(canonical(html), site + path);
    assert.match(robots(html), /^index/, path);
    assert.deepEqual(hreflang(html), expectedHreflang(versionsOf(post)), path);
    assert.equal(article.inLanguage, post.language, path);
    assert.equal(article.url, site + path);
  }
});

test("the language menu on a post leads to its translation, or to that language's blog", async () => {
  for (const post of samplePosts) {
    const versions = versionsOf(post);
    const expected = Object.fromEntries(
      languages.map((language) => [language, versions[language] ?? blogPath(language)]),
    );

    assert.deepEqual(languageMenu((await get(blogPath(post.language, post.slug))).html), expected);
  }
});

test("a post links back to the blog of its own language", async () => {
  for (const post of samplePosts) {
    const links = siteLinks((await get(blogPath(post.language, post.slug))).html);

    assert.ok(links.includes(blogPath(post.language)), `no link to ${blogPath(post.language)}`);
  }
});

test("a landing page offers each guide in the reader's language, and only once it is published in it", async () => {
  const guideLinks = (html) => siteLinks(mainOf(html)).filter((href) => /\/blog\/./.test(href));

  for (const path of landingPages) {
    const englishGuides = [...new Set(guideLinks((await get(path)).html))];
    assert.ok(englishGuides.length > 0, `${path} links to no guides`);

    for (const language of languages.filter((other) => other !== "en")) {
      const expected = englishGuides.flatMap((href) => {
        const post = posts.find((candidate) => blogPath(candidate.language, candidate.slug) === href);
        assert.ok(post, `${href}, linked from ${path}, is not a published post`);
        return versionsOf(post)[language] ?? [];
      });

      assert.deepEqual(
        [...new Set(guideLinks((await get(`/${language}${path}`)).html))].sort(),
        expected.sort(),
        `the guides on /${language}${path}`,
      );
    }
  }
});

test("the sitemap lists every post under its language, dated when it was really last edited", async () => {
  const { html: xml } = await get("/sitemap.xml");
  const entries = xml.split("<url>");

  for (const post of posts) {
    const loc = `<loc>${site}${blogPath(post.language, post.slug)}</loc>`;
    const entry = entries.find((candidate) => candidate.includes(loc));

    assert.ok(entry, `${loc} is not in the sitemap`);
    assert.equal(
      new Date(entry.match(/<lastmod>([^<]*)<\/lastmod>/)?.[1]).toISOString(),
      new Date(post.modified).toISOString(),
      `${post.slug} carries the wrong last-modified date`,
    );
  }

  for (const language of languages) {
    assert.equal(
      xml.includes(`<loc>${site}${blogPath(language)}</loc>`),
      languagesWithPosts.includes(language),
      `${blogPath(language)} in the sitemap`,
    );
  }
});
