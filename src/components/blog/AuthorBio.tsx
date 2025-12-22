"use client";

import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "./PortableTextComponents";

interface AuthorBioProps {
  bio: any;
}

export default function AuthorBio({ bio }: AuthorBioProps) {
  if (!bio) return null;

  return (
    <div className="text-white/70 leading-relaxed">
      <PortableText value={bio} components={portableTextComponents} />
    </div>
  );
}

