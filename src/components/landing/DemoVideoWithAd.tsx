"use client";

import { useEffect, useRef, useState } from "react";

type DemoVideoWithAdProps = {
  contentSrc: string;
  adTagUrl: string;
};

const DemoVideoWithAd = ({
  contentSrc,
  adTagUrl,
}: DemoVideoWithAdProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const adContainerRef = useRef<HTMLDivElement | null>(null);
  const adsLoaderRef = useRef<any>(null);
  const adsManagerRef = useRef<any>(null);
  const adDisplayContainerRef = useRef<any>(null);
  const adRequestedRef = useRef(false);
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [adFailed, setAdFailed] = useState(false);
  const [isAdsReady, setIsAdsReady] = useState(!adTagUrl);

  const loadImaSdk = () =>
    new Promise<void>((resolve, reject) => {
      const sdkWindow = window as Window & { google?: { ima?: unknown } };
      if (sdkWindow.google?.ima) {
        resolve();
        return;
      }

      const existingScript = document.querySelector(
        'script[data-ima-sdk="true"]'
      ) as HTMLScriptElement | null;

      if (existingScript) {
        const onLoad = () => resolve();
        const onError = () => reject(new Error("Failed to load IMA SDK"));
        existingScript.addEventListener("load", onLoad, { once: true });
        existingScript.addEventListener("error", onError, { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = "https://imasdk.googleapis.com/js/sdkloader/ima3.js";
      script.async = true;
      script.dataset.imaSdk = "true";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load IMA SDK"));
      document.head.appendChild(script);
    });

  useEffect(() => {
    const videoElement = videoRef.current;
    const adContainerElement = adContainerRef.current;

    if (!videoElement || !adContainerElement) {
      return;
    }

    if (!adTagUrl) {
      setIsAdsReady(true);
      return;
    }

    let isMounted = true;
    let onFirstPlay: (() => void) | null = null;
    let onResize: (() => void) | null = null;

    const cleanupAdsManager = () => {
      if (adsManagerRef.current) {
        try {
          adsManagerRef.current.destroy();
        } catch {
          // ignore destroy errors from third-party SDK
        }
        adsManagerRef.current = null;
      }
    };

    const resumeContent = () => {
      setIsAdPlaying(false);
      videoElement.controls = true;
      void videoElement.play().catch(() => {
        // ignored: browser may require explicit user gesture
      });
    };

    const handleAdFailure = (event?: any) => {
      if (process.env.NODE_ENV !== "production") {
        const message = event?.getError?.()?.toString?.();
        if (message) {
          console.error("[IMA] Ad error:", message);
        } else {
          console.error("[IMA] Ad failed to load or play.");
        }
      }
      setAdFailed(true);
      setIsAdsReady(true);
      cleanupAdsManager();
      resumeContent();
    };

    const initializeAds = async () => {
      try {
        await loadImaSdk();
      } catch {
        if (isMounted) {
          setAdFailed(true);
          setIsAdsReady(true);
        }
        return;
      }

      if (!isMounted) return;

      const sdkWindow = window as Window & { google?: any };
      const ima = sdkWindow.google?.ima;
      if (!ima) {
        setAdFailed(true);
        setIsAdsReady(true);
        return;
      }

      adDisplayContainerRef.current = new ima.AdDisplayContainer(
        adContainerElement,
        videoElement
      );
      adsLoaderRef.current = new ima.AdsLoader(adDisplayContainerRef.current);

      const onAdsManagerLoaded = (event: any) => {
        adsManagerRef.current = event.getAdsManager(videoElement);

        adsManagerRef.current.addEventListener(
          ima.AdErrorEvent.Type.AD_ERROR,
          handleAdFailure
        );

        adsManagerRef.current.addEventListener(
          ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
          () => {
            setIsAdPlaying(true);
            videoElement.controls = false;
          }
        );

        adsManagerRef.current.addEventListener(
          ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
          () => {
            resumeContent();
          }
        );

        adsManagerRef.current.addEventListener(
          ima.AdEvent.Type.ALL_ADS_COMPLETED,
          () => {
            setIsAdPlaying(false);
          }
        );

        try {
          const width = adContainerElement.clientWidth || 1280;
          const height = adContainerElement.clientHeight || 720;
          adsManagerRef.current.init(width, height, ima.ViewMode.NORMAL);
          adsManagerRef.current.start();
        } catch {
          handleAdFailure();
        }
      };

      const onAdError = (event: any) => handleAdFailure(event);

      adsLoaderRef.current.addEventListener(
        ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
        onAdsManagerLoaded,
        false
      );
      adsLoaderRef.current.addEventListener(
        ima.AdErrorEvent.Type.AD_ERROR,
        onAdError,
        false
      );

      onFirstPlay = () => {
        if (adRequestedRef.current) return;
        adRequestedRef.current = true;

        try {
          adDisplayContainerRef.current.initialize();
          const adsRequest = new ima.AdsRequest();
          adsRequest.adTagUrl = adTagUrl;

          const width = adContainerElement.clientWidth || 1280;
          const height = adContainerElement.clientHeight || 720;
          adsRequest.linearAdSlotWidth = width;
          adsRequest.linearAdSlotHeight = height;
          adsRequest.nonLinearAdSlotWidth = width;
          adsRequest.nonLinearAdSlotHeight = Math.floor(height / 3);

          adsLoaderRef.current.requestAds(adsRequest);
          videoElement.pause();
        } catch {
          handleAdFailure();
        }
      };

      videoElement.addEventListener("play", onFirstPlay, { once: true });
      setIsAdsReady(true);

      onResize = () => {
        if (!adsManagerRef.current) return;
        try {
          const width = adContainerElement.clientWidth || 1280;
          const height = adContainerElement.clientHeight || 720;
          adsManagerRef.current.resize(width, height, ima.ViewMode.NORMAL);
        } catch {
          // ignore resize errors from third-party SDK
        }
      };

      window.addEventListener("resize", onResize);
    };

    void initializeAds();

    return () => {
      isMounted = false;
      if (onFirstPlay) {
        videoElement.removeEventListener("play", onFirstPlay);
      }
      if (onResize) {
        window.removeEventListener("resize", onResize);
      }
      cleanupAdsManager();
    };
  }, [adTagUrl]);

  const showAdBadge = isAdPlaying && !adFailed;
  const showSetupBadge = !isAdsReady && !adFailed && Boolean(adTagUrl);
  const showAdFailedBadge = adFailed && Boolean(adTagUrl);

  return (
    <div className="relative aspect-video">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full bg-black"
        controls={isAdsReady || adFailed || !adTagUrl}
        playsInline
        preload="metadata"
      >
        <source src={contentSrc} type="video/mp4" />
      </video>

      <div
        ref={adContainerRef}
        className={`absolute inset-0 z-20 ${showAdBadge ? "pointer-events-auto" : "pointer-events-none"}`}
      />

      {showAdBadge && (
        <div className="absolute left-3 top-3 z-30 rounded-md border border-white/20 bg-black/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
          Advertisement
        </div>
      )}

      {showSetupBadge && (
        <div className="absolute left-3 top-3 z-30 rounded-md border border-white/20 bg-black/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
          Preparing ad...
        </div>
      )}

      {showAdFailedBadge && (
        <div className="absolute left-3 bottom-3 z-30 rounded-md border border-amber-300/30 bg-black/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-200">
          Ad unavailable
        </div>
      )}
    </div>
  );
};

export default DemoVideoWithAd;
