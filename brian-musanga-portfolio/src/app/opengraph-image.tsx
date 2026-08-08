import { ImageResponse } from "next/og";
import { personal } from "@/lib/data/site-content";

export const alt = `${personal.name}, ${personal.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="154 74 187 364" width="187" height="364">
  <g fill="none" stroke="#fefaef" stroke-width="52" stroke-linecap="round" stroke-linejoin="round">
    <path d="M180 100L180 412" />
    <path d="M180 100A78 78 0 0 1 180 256" />
    <path d="M180 256A78 78 0 0 1 180 412" />
  </g>
  <g fill="none" stroke="#fefaef" stroke-width="22" stroke-linecap="round" stroke-linejoin="round" opacity="0.5">
    <path d="M246 284L246 384" />
    <path d="M330 284L330 384" />
    <path d="M246 284L288 334L330 284" />
  </g>
</svg>`;

const markUrl = `data:image/svg+xml;utf8,${encodeURIComponent(markSvg)}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0e14",
          padding: "72px 80px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markUrl} width={72} height={140} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              color: "#fefaef",
              letterSpacing: "-0.02em",
            }}
          >
            {personal.name}
          </div>
          <div style={{ fontSize: 30, color: "#e8a55c", marginTop: 20 }}>
            {personal.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "rgba(254, 250, 239, 0.65)",
          }}
        >
          {personal.location}
        </div>
      </div>
    ),
    size,
  );
}
