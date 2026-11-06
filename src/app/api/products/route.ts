import { NextResponse } from "next/server";
import { BUILD_ONLY } from "@/lib/build-only";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

/**
 * The product feed, as it was when the site was built.
 *
 * The home page's product preview and the shop page both fetch this from the browser on every
 * visit. It used to proxy Guardian live on each of those requests, which made it one of the two
 * things left running a Vercel Function per page view. Products change rarely and the pages
 * that list them are already built once per deploy (see lib/build-only.ts), so the feed is too:
 * it is fetched at build and served from the CDN until the next deploy.
 */
export const dynamic = "force-static";

export async function GET() {
  try {
    const response = await fetch(`${apiBaseUrl}/api/v1/products`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      ...BUILD_ONLY,
    });

    const payload = await response.json();

    return NextResponse.json(payload, {
      status: response.status,
    });
  } catch (error) {
    console.error("Failed to fetch products from Guardian:", error);

    return NextResponse.json(
      {
        success: false,
        status: "error",
        message: "Failed to fetch products",
        data: [],
      },
      { status: 500 },
    );
  }
}
