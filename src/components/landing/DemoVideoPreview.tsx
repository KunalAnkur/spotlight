"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

const videoId = "QmiWGfZTHps";
const posterSources = [
  `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
  `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
];
const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;

const DemoVideoPreview = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [posterIndex, setPosterIndex] = useState(0);

  return (
    <div className="relative aspect-video overflow-hidden rounded-[1.6rem] bg-black/20 shadow-[0_28px_70px_rgba(0,0,0,0.28)]">
      {isPlaying ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={embedUrl}
          title="Movmash demo video"
          loading="eager"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="group absolute inset-0"
          aria-label="Play Movmash demo video"
          onClick={() => setIsPlaying(true)}
        >
          <Image
            src={posterSources[posterIndex]}
            alt="Movmash demo video preview"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="object-cover"
            onError={() => {
              setPosterIndex((currentIndex) =>
                currentIndex < posterSources.length - 1 ? currentIndex + 1 : currentIndex
              );
            }}
          />

          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-black/55 text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-transform duration-200 group-hover:scale-105">
              <Play className="h-8 w-8" fill="currentColor" strokeWidth={1.5} />
            </span>
          </span>

          <span className="pointer-events-none absolute bottom-5 left-5 rounded-full bg-black/55 px-4 py-2 font-parkinsans text-sm font-medium text-white/92 backdrop-blur-sm">
            Play Demo
          </span>
        </button>
      )}
    </div>
  );
};

export default DemoVideoPreview;
