import type { NextRequest } from "next/server";

/**
 * Where the error screens report a page that broke in the browser (src/lib/client-error.ts).
 *
 * Nothing is stored: the report is one line in the runtime log, which is what Vercel's Logs page
 * shows next to the request. A GET, so that Google's renderer — the visitor this is for — can
 * send it; robots.txt opens this one path under /api/ for that reason.
 */
export const dynamic = "force-dynamic";

const field = (value: string | null, max: number) => (value ?? "").slice(0, max);

export function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams;

  console.error(
    "[client-error]",
    JSON.stringify({
      where: field(query.get("w"), 8),
      path: field(query.get("p"), 200),
      name: field(query.get("n"), 80),
      message: field(query.get("m"), 300),
      digest: field(query.get("d"), 40),
      userAgent: field(request.headers.get("user-agent"), 300),
    }),
  );

  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
