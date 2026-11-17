import { Anton, JetBrains_Mono, Manrope, Playfair_Display } from "next/font/google";

export const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });

export const playfair = Playfair_Display({
  weight: ["500", "600", "700"],
  style: ["italic"],
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const fontVariables = [anton, playfair, manrope, jetbrainsMono]
  .map((font) => font.variable)
  .join(" ");
