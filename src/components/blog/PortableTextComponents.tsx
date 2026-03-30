"use client";

import Link from "next/link";
import Image from "next/image";
import { PortableTextComponents } from "@portabletext/react";
import { getSanityImageDimensions, urlFor } from "@/sanity/lib/image";

// Custom components for rendering Portable Text (Sanity's rich text format)
export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      const dimensions = getSanityImageDimensions(value);
      const isPortrait = dimensions?.isPortrait;
      const imageUrl = urlFor(value).width(1600).fit("max").auto("format").url();

      return (
        <div className="my-10 w-full">
          <div className="rounded-[1.6rem] bg-white/[0.025] p-2 ring-1 ring-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
            <div className="flex justify-center overflow-hidden rounded-[1.2rem]">
              <Image
                src={imageUrl}
                alt={value.alt || "Blog post image"}
                width={dimensions?.width || 1600}
                height={dimensions?.height || 900}
                className={
                  isPortrait
                    ? "h-auto max-h-[76vh] w-auto max-w-full object-contain"
                    : "h-auto w-full object-contain"
                }
              />
            </div>
          </div>
          {value.caption && (
            <p className="mt-3 text-center text-xs text-white/46">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-6 list-disc space-y-2.5 text-white/72 marker:text-white/34">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal space-y-2.5 text-white/72 marker:text-white/34">
        {children}
      </ol>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="mb-6 mt-12 font-parkinsans text-3xl font-semibold leading-tight text-white break-words overflow-wrap-anywhere md:text-4xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-5 mt-10 font-parkinsans text-2xl font-semibold leading-tight text-white break-words overflow-wrap-anywhere md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 mt-8 font-parkinsans text-xl font-semibold leading-tight text-white break-words overflow-wrap-anywhere md:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-3 mt-6 font-parkinsans text-lg font-semibold leading-tight text-white break-words overflow-wrap-anywhere md:text-xl">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-6 text-base leading-[1.9] text-white/72 break-words overflow-wrap-anywhere md:text-lg">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-rose-200/16 bg-rose-200/[0.03] py-3 pl-6 italic text-base text-white/60 break-words overflow-wrap-anywhere">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value?.href?.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <Link
          href={value?.href || "#"}
          rel={rel}
          className="break-all text-rose-100 underline decoration-rose-200/18 underline-offset-4 transition-colors hover:text-white hover:decoration-rose-200/34"
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-white/90">{children}</em>
    ),
  },
};
