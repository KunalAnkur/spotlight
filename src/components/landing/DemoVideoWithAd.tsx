"use client";

import { useEffect, useState } from "react";

type DemoVideoWithAdProps = {
  videoId: string;
  adUrl: string;
  adDurationSeconds?: number;
  skipAfterSeconds?: number;
};

const DemoVideoWithAd = ({
  videoId,
  adUrl,
  adDurationSeconds = 10,
  skipAfterSeconds = 5,
}: DemoVideoWithAdProps) => {
  const [isAdVisible, setIsAdVisible] = useState(Boolean(adUrl));
  const [secondsLeft, setSecondsLeft] = useState(adDurationSeconds);

  useEffect(() => {
    setIsAdVisible(Boolean(adUrl));
    setSecondsLeft(adDurationSeconds);
  }, [adUrl, adDurationSeconds]);

  useEffect(() => {
    if (!isAdVisible) return;

    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          setIsAdVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isAdVisible]);

  const elapsedSeconds = adDurationSeconds - secondsLeft;
  const canSkip = elapsedSeconds >= skipAfterSeconds;
  const skipCountdown = Math.max(skipAfterSeconds - elapsedSeconds, 0);

  return (
    <div className="relative aspect-video">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
        title="Movmash demo video"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />

      {isAdVisible && (
        <div className="absolute inset-0 z-20 bg-black/85">
          <div className="absolute right-3 top-3 z-30">
            {canSkip ? (
              <button
                type="button"
                onClick={() => setIsAdVisible(false)}
                className="rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
              >
                Skip ad
              </button>
            ) : (
              <div className="rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                Skip in {skipCountdown}s
              </div>
            )}
          </div>

          <div className="h-full w-full p-3 md:p-4">
            <div className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-white/15 bg-black">
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
                  Sponsored
                </p>
                <a
                  href={adUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-medium text-white/60 underline underline-offset-2 hover:text-white"
                >
                  Open ad
                </a>
              </div>

              <div className="relative flex-1">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={adUrl}
                  title="Advertisement"
                  loading="eager"
                  allow="autoplay; encrypted-media; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation-by-user-activation allow-popups-to-escape-sandbox"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoVideoWithAd;

