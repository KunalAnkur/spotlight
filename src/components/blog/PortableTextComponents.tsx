"use client";

import Link from "next/link";
import Image from "next/image";
import { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

// Custom components for rendering Portable Text (Sanity's rich text format)
export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-10 w-full">
          <Image
            src={urlFor(value).width(1200).height(600).url()}
            alt={value.alt || "Blog post image"}
            width={1200}
            height={600}
            className="rounded-lg object-cover w-full"
          />
          {value.caption && (
            <p className="text-xs text-white/50 mt-2 text-center">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-6 list-disc space-y-2 text-white/70 marker:text-rose-400/60">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal space-y-2 text-white/70 marker:text-rose-400/60">
        {children}
      </ol>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold font-display mb-6 mt-12 text-white break-words overflow-wrap-anywhere leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold font-display mb-5 mt-10 text-white break-words overflow-wrap-anywhere leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold font-display mb-4 mt-8 text-white break-words overflow-wrap-anywhere leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-bold font-display mb-3 mt-6 text-white break-words overflow-wrap-anywhere leading-tight">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-base md:text-lg text-white/70 leading-[1.8] mb-6 break-words overflow-wrap-anywhere">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-3 border-rose-500/50 pl-6 py-3 my-8 italic text-white/60 text-base break-words overflow-wrap-anywhere">
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
          className="text-rose-400 hover:text-rose-300 underline decoration-rose-500/50 hover:decoration-rose-400 transition-colors break-all"
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

