import type { MetadataRoute } from "next";
import { personal } from "@/lib/data/site-content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: personal.name,
    short_name: "Brian Musanga",
    description: personal.headline,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0e14",
    theme_color: "#0a0e14",
    icons: [
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
