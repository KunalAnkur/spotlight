"use client";

import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "./PortableTextComponents";

interface BlogContentProps {
  body: any;
}

export default function BlogContent({ body }: BlogContentProps) {
  if (!body) return null;

  return (
    <div className="prose prose-invert max-w-none">
      <PortableText value={body} components={portableTextComponents} />
    </div>
  );
}

