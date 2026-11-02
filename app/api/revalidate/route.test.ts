import { encodeSignatureHeader } from "@sanity/webhook";
import { beforeEach, describe, expect, it, vi } from "vitest";

const revalidateTag = vi.hoisted(() => vi.fn());
vi.mock("next/cache", () => ({ revalidateTag }));

import { POST } from "./route";

const SECRET = "test-secret";
const URL_ = "http://localhost/api/revalidate";

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    revalidateTag.mockClear();
    process.env.SANITY_REVALIDATE_SECRET = SECRET;
  });

  it("returns 401 without a signature and does not revalidate", async () => {
    const res = await POST(new Request(URL_, { method: "POST", body: JSON.stringify({ _type: "page" }) }) as never);
    expect(res.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("returns 401 with a wrong signature and does not revalidate", async () => {
    const body = JSON.stringify({ _type: "page" });
    const signature = await encodeSignatureHeader(body, Date.now(), "other-secret");
    const res = await POST(new Request(URL_, { method: "POST", body, headers: { "sanity-webhook-signature": signature } }) as never);
    expect(res.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("revalidates the document type tag with a valid signature", async () => {
    const body = JSON.stringify({ _type: "page" });
    const signature = await encodeSignatureHeader(body, Date.now(), SECRET);
    const res = await POST(new Request(URL_, { method: "POST", body, headers: { "sanity-webhook-signature": signature } }) as never);
    expect(res.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith("page", { expire: 0 });
  }, 15000);
});
