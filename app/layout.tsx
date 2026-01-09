import FallingFlowers from "@/components/FallingFlower";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import type { Metadata } from "next";

const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  metadataBase: new URL("https://wedding-invitation-ecwh.vercel.app"),
  title: "Wedding Invitation",
  description: "Luxury wedding invitation landing page",

  openGraph: {
    title: "Wedding Invitation",
    description: "Luxury wedding invitation landing page",
    type: "website",
    url: "https://wedding-invitation-ecwh.vercel.app",
    images: [{ url: "/m1.jpg", width: 1200, height: 630 }],
  },


  twitter: {
    card: "summary_large_image",
    images: ["/m1.jpg"],
  },


  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`relative ${display.variable} ${body.variable} font-body`}>
        <div className="bg-ambient" aria-hidden="true" />
        <FallingFlowers />
        <div className="relative z-1">{children}</div>
      </body>
    </html>
  );
}
