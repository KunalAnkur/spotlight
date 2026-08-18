"use client";

import { useEffect, useRef } from "react";

const videoSrc =
  "https://asset.movmash.com/platform/vid/spotlight-cover-video-v2.mp4";

const DemoVideoPreview = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React omits `muted` from the server-rendered HTML, so the browser can see
    // an unmuted autoplaying video on first paint and block it. Setting the
    // property directly on hydration guarantees autoplay is allowed.
    video.muted = true;

    // Autoplay can still be refused (battery saver, reduced-data mode). The
    // rejection is expected, not an error worth surfacing.
    void video.play().catch(() => {});
  }, []);

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl bg-white/[0.03] shadow-[0_28px_70px_rgba(0,0,0,0.28)]">
      <video
        ref={videoRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-label="Movmash demo video"
        tabIndex={-1}
      />
    </div>
  );
};

export default DemoVideoPreview;
