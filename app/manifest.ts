 import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Password Strength Checker",
    description: "A tool to evaluate the strength of your passwords",
    start_url: "/",
    display: "standalone",
    icons: [
      { src: "/favicon/favicon.ico" },
      { src: "/favicon/favicon-32x32.png", sizes: "32x32" },
      { src: "/favicon/favicon-16x16.png", sizes: "16x16" },
      { src: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
