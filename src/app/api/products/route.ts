import { NextResponse } from "next/server";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function GET() {
  try {
    const response = await fetch(
      `${apiBaseUrl}/api/v1/products`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );

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
