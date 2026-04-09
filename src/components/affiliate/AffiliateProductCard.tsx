"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type AffiliateProduct,
  toRenderableAffiliateImageUrl,
} from "@/lib/affiliate-products";
import { trackAffiliateProductClick } from "@/lib/affiliate-tracking";
import { AFFILIATE_CARD_ART_STYLES } from "@/components/affiliate/constants";

interface AffiliateProductCardProps {
  product: AffiliateProduct;
  position: number;
  context: "home_preview" | "shop_page";
  variant?: "compact" | "full";
  className?: string;
}

export default function AffiliateProductCard({
  product,
  position,
  context,
  variant = "full",
  className,
}: AffiliateProductCardProps) {
  const art = AFFILIATE_CARD_ART_STYLES[position % AFFILIATE_CARD_ART_STYLES.length];
  const compact = variant === "compact";
  const images = useMemo(
    () =>
      product.images
        .filter((url) => typeof url === "string" && url.trim())
        .map((url) => toRenderableAffiliateImageUrl(url)),
    [product.images],
  );
  const [imageEmblaRef, imageEmblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: false,
    containScroll: "trimSnaps",
    loop: images.length > 1,
  });
  const [imageIndex, setImageIndex] = useState(0);
  const [canImagePrev, setCanImagePrev] = useState(false);
  const [canImageNext, setCanImageNext] = useState(false);
  const [failedImageMap, setFailedImageMap] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setImageIndex(0);
    setFailedImageMap({});
  }, [product.id, images.length]);

  useEffect(() => {
    if (!imageEmblaApi) return;

    const updateImageControls = () => {
      setImageIndex(imageEmblaApi.selectedScrollSnap());
      setCanImagePrev(imageEmblaApi.canScrollPrev());
      setCanImageNext(imageEmblaApi.canScrollNext());
    };

    updateImageControls();
    imageEmblaApi.on("select", updateImageControls);
    imageEmblaApi.on("reInit", updateImageControls);

    return () => {
      imageEmblaApi.off("select", updateImageControls);
      imageEmblaApi.off("reInit", updateImageControls);
    };
  }, [imageEmblaApi]);

  const badgeVariants: Record<number, string> = {
    0: "bg-violet-600/50 text-violet-200 border-violet-500/30",
    1: "bg-pink-700/45 text-pink-200 border-pink-500/25",
    2: "bg-cyan-700/45 text-cyan-200 border-cyan-500/25",
    3: "bg-violet-700/45 text-purple-200 border-purple-500/25",
  };
  const badgeCls = badgeVariants[position % AFFILIATE_CARD_ART_STYLES.length] ?? badgeVariants[0];

  return (
    <article
      className={cn(
        "group block w-full overflow-hidden rounded-lg border border-white/[0.09] bg-gradient-to-b from-white/[0.055] to-white/[0.018] transition-colors duration-300 hover:border-white/[0.18] md:rounded-2xl",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden border-b border-white/[0.07]",
          compact ? "h-[72px] md:h-28" : "h-[112px] md:h-36",
        )}
      >
        <div className="absolute inset-0" style={{ background: art.hero }} />
        <div className="absolute inset-0" style={{ background: art.glow }} />

        {images.length > 0 ? (
          <div className="absolute inset-0 overflow-hidden" ref={imageEmblaRef}>
            <div className="flex h-full">
              {images.map((image, index) => (
                <div key={`${product.id}-${index}`} className="min-w-0 flex-[0_0_100%]">
                  {!failedImageMap[index] ? (
                    <img
                      src={image}
                      alt={`${product.name} image ${index + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      onError={() =>
                        setFailedImageMap((prev) => ({ ...prev, [index]: true }))
                      }
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/65 to-transparent" />

        {product.category ? (
          <div className="absolute left-2 top-2 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[8px] font-medium text-white/82 backdrop-blur-sm md:left-2.5 md:top-2.5 md:px-2.5 md:py-1 md:text-[10px]">
            {product.category}
          </div>
        ) : null}

        {product.rating ? (
          <div className="absolute right-2 top-2 rounded-full bg-white/92 px-1.5 py-0.5 text-[8.5px] font-semibold text-black/80 md:right-2.5 md:top-2.5 md:px-2 md:py-1 md:text-[10px]">
            {product.rating} ★
          </div>
        ) : null}

        {product.badge ? (
          <div
            className={cn(
              "absolute bottom-2 left-2 rounded-full border px-2 py-0.5 text-[7.5px] font-semibold tracking-wide backdrop-blur-sm md:bottom-2.5 md:left-2.5 md:px-2.5 md:py-1 md:text-[9.5px]",
              badgeCls,
            )}
          >
            {product.badge}
          </div>
        ) : null}

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => imageEmblaApi?.scrollPrev()}
              disabled={!canImagePrev}
              className="absolute left-1.5 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 transition hover:bg-black/55 disabled:opacity-30 md:left-2 md:h-6 md:w-6"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => imageEmblaApi?.scrollNext()}
              disabled={!canImageNext}
              className="absolute right-1.5 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/90 transition hover:bg-black/55 disabled:opacity-30 md:right-2 md:h-6 md:w-6"
              aria-label="Next image"
            >
              <ChevronRight className="h-3 w-3" />
            </button>
            <div className="absolute bottom-2 right-2 flex items-center gap-1 md:bottom-2.5 md:right-2.5">
              {images.map((_, idx) => (
                <button
                  key={`${product.id}-dot-${idx}`}
                  type="button"
                  onClick={() => imageEmblaApi?.scrollTo(idx)}
                  aria-label={`Go to image ${idx + 1}`}
                  className={cn(
                    "h-[5px] rounded-full transition-all",
                    imageIndex === idx ? "w-3.5 bg-white/90" : "w-[5px] bg-white/45",
                  )}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div
        className={cn(
          "bg-white/[0.025]",
          compact ? "px-2 py-1.5 md:px-3 md:py-2.5" : "px-3 py-2.5 md:px-3.5 md:py-3",
        )}
      >
        <div className="flex items-baseline justify-between gap-2">
          <p
            className={cn(
              "line-clamp-1 font-medium text-white/92",
              compact ? "text-[11px] md:text-[13px]" : "text-[12px] md:text-[14px]",
            )}
          >
            {product.name}
          </p>
          <span
            className={cn(
              "shrink-0 bg-gradient-to-r from-violet-300 to-pink-300 bg-clip-text font-semibold text-transparent",
              compact ? "text-[10px] md:text-[13px]" : "text-[11px] md:text-[14px]",
            )}
          >
            {product.price}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-2">
          <p
            className={cn(
              "line-clamp-1 text-white/38",
              compact ? "text-[8px] md:text-[10px]" : "text-[9px] md:text-[11px]",
            )}
          >
            {product.meta}
          </p>

          <a
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackAffiliateProductClick({
                product,
                context,
                position: position + 1,
              })
            }
            className={cn(
              "inline-flex shrink-0 items-center gap-1 text-white/48 transition hover:text-white/90",
              compact ? "text-[8px] md:text-[10px]" : "text-[9px] md:text-[11px]",
            )}
          >
            View
            <ExternalLink className={compact ? "h-2.5 w-2.5" : "h-3 w-3"} />
          </a>
        </div>
      </div>
    </article>
  );
}
