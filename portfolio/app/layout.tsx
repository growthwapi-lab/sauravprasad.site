import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Saurav Prasad — Website Designer & Full-Stack Developer",
    template: "%s | Saurav Prasad",
  },
  description:
    "Premium website design and full-stack development by Saurav Prasad. Specializing in business sites, e-commerce, SaaS, media platforms, and API integrations.",
  keywords: [
    "web designer",
    "full-stack developer",
    "Next.js developer",
    "website design",
    "e-commerce",
    "SaaS",
    "India",
    "Saurav Prasad",
  ],
  authors: [{ name: "Saurav Prasad" }],
  creator: "Saurav Prasad",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Saurav Prasad",
    title: "Saurav Prasad — Website Designer & Full-Stack Developer",
    description:
      "Premium website design and full-stack development. Specializing in business sites, e-commerce, SaaS, media platforms, and API integrations.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@sauravprasad",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-white text-gray-900"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {children}
      </body>
    </html>
  );
}
