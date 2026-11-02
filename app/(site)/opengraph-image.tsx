import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/lib/sanity/queries";

export const alt = "Larkhour: wake up to light, not an alarm";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const settings = await getSiteSettings();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#14233F", color: "#FFF3D6", padding: 72, position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 660 }}>
          <div style={{ fontSize: 40, fontWeight: 700 }}>{settings.siteName}</div>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1 }}>Wake up to light, not an alarm.</div>
          <div style={{ fontSize: 28 }}>{settings.disclaimer}</div>
        </div>
        <div style={{ position: "absolute", right: 0, top: 0, width: 520, height: 630, display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle at 50% 45%, rgba(245,165,36,0.75), rgba(245,165,36,0) 65%)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 170, height: 250, borderRadius: 85, background: "#F5A524", border: "4px solid #E9E2D0" }} />
            <div style={{ width: 200, height: 170, borderRadius: 44, background: "#E9E2D0", marginTop: -60, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 36, gap: 26 }}>
              <div style={{ width: 22, height: 22, borderRadius: 11, background: "#14233F" }} />
              <div style={{ width: 22, height: 22, borderRadius: 11, background: "#14233F" }} />
              <div style={{ width: 22, height: 22, borderRadius: 11, background: "#14233F" }} />
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
