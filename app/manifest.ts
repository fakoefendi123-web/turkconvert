import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TurkConvert — Ücretsiz Online Dosya Dönüştürme",
    short_name: "TurkConvert",
    description:
      "Ücretsiz, hızlı ve reklamsız dosya dönüştürme araçları. Üyelik gerekmez.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
