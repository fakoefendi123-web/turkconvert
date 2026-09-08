import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "turkconvert â€” Ãœcretsiz Online Dosya DÃ¶nÃ¼ÅŸtÃ¼rme",
    short_name: "turkconvert",
    description:
      "Ãœcretsiz, hÄ±zlÄ± ve reklamsÄ±z dosya dÃ¶nÃ¼ÅŸtÃ¼rme araÃ§larÄ±. Ãœyelik gerekmez.",
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
