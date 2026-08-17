"use client";

const videoId = "QmiWGfZTHps";
const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0&loop=1&playlist=${videoId}`;

const DemoVideoPreview = () => {
  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl bg-white/[0.03] shadow-[0_28px_70px_rgba(0,0,0,0.28)]">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={embedUrl}
        title="Movmash demo video"
        loading="eager"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
};

export default DemoVideoPreview;
