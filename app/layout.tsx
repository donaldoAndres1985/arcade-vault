import type { Metadata } from "next";
import { Press_Start_2P, JetBrains_Mono, Courier_Prime } from "next/font/google";
import "./globals.css";

// Display face for headings/UI chrome — mirrors the "pixel" role in
// references/templates/styles.css (--pixel).
const pixelFont = Press_Start_2P({
  variable: "--font-press-start-2p",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Body/data face — mirrors the "mono" role in styles.css (--mono).
const monoFont = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Fallback in the --mono stack, kept for parity with the template's font
// stack ("JetBrains Mono", "Courier Prime", "Courier New", monospace).
const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arcade Vault · Portal Retro",
  description:
    "Una plataforma para jugar online y competir por la mayor cantidad de puntos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${pixelFont.variable} ${monoFont.variable} ${courierPrime.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* perspective grid + scanlines + vignette, see .av-bg in globals.css */}
        <div className="av-bg" aria-hidden="true" />
        {/* film-grain overlay, see .av-noise in globals.css */}
        <div className="av-noise" aria-hidden="true" />
        <div id="av-root">{children}</div>
      </body>
    </html>
  );
}
