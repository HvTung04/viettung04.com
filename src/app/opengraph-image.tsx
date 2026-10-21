import { ImageResponse } from "next/og";

export const alt = "Hoang Viet Tung — AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CREAM = "#fdfcfc";
const INK = "#201d1d";
const MUTE = "#6b6560";
const ACCENT = "#3b6ea5";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: CREAM,
          color: INK,
          padding: "72px",
          fontFamily: "monospace",
          borderTop: "14px solid " + INK,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              background: INK,
              color: CREAM,
              fontSize: "34px",
              fontWeight: 700,
            }}
          >
            +
          </div>
          <div style={{ display: "flex", fontSize: "30px", fontWeight: 700, letterSpacing: "2px" }}>
            VIET TUNG
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: "68px", fontWeight: 700, lineHeight: 1.08 }}>
            Hoang Viet Tung
          </div>
          <div style={{ display: "flex", fontSize: "40px", color: ACCENT, marginTop: "18px" }}>
            AI Engineer
          </div>
          <div style={{ display: "flex", fontSize: "27px", color: MUTE, marginTop: "26px" }}>
            Machine Learning · LLM · Computer Vision · Data Engineering
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid #e5e1dd",
            paddingTop: "26px",
            fontSize: "23px",
            color: MUTE,
          }}
        >
          <div style={{ display: "flex" }}>viettung04.com</div>
          <div style={{ display: "flex", color: ACCENT }}>Available for projects</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
