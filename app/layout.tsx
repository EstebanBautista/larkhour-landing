import { Anybody, Atkinson_Hyperlegible_Next } from "next/font/google";
import "./globals.css";

const anybody = Anybody({ subsets: ["latin"], weight: "variable", axes: ["wdth"], variable: "--font-anybody", display: "swap" });
const atkinson = Atkinson_Hyperlegible_Next({ subsets: ["latin"], variable: "--font-atkinson", display: "swap", preload: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anybody.variable} ${atkinson.variable}`}>
      <body>{children}</body>
    </html>
  );
}
