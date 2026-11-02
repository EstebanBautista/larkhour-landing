import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return new Response("Revalidation is not configured", { status: 401 });

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret);
  if (!isValidSignature) return new Response("Invalid signature", { status: 401 });
  if (!body?._type) return new Response("Missing _type", { status: 400 });

  // expire: 0 so the next visit shows the published edit, not stale content.
  revalidateTag(body._type, { expire: 0 });
  return Response.json({ revalidated: body._type });
}
