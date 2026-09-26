import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import { siteConfig } from "@/lib/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Bilal Ahmed | Full Stack Developer",
    template: "%s | Bilal Ahmed",
  },
  description:
    "Full stack developer specializing in React, Next.js, Node.js, Express, and MongoDB",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "JavaScript",
    "TypeScript",
    "Web Development",
    "UI/UX",
  ],
  authors: [{ name: "Bilal Ahmed" }],
  creator: "Bilal Ahmed",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Bilal Ahmed | Full Stack Developer",
    description:
      "Full stack developer specializing in React, Next.js, Node.js, Express, and MongoDB",
    siteName: "Bilal Ahmed Portfolio",
    url: siteConfig.baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Bilal Ahmed | Full Stack Developer",
    description:
      "Full stack developer specializing in React, Next.js, Node.js, Express, and MongoDB",
    creator: "@bilaltech",
  },
  alternates: {
    canonical: siteConfig.baseUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Bilal Ahmed",
              url: siteConfig.baseUrl,
              jobTitle: "Full Stack Developer",
              description:
                "Full stack developer specializing in React, Next.js, Node.js, Express, and MongoDB",
              image: `${siteConfig.baseUrl}/og-image.png`,
              sameAs: [
                "https://github.com/bilal-ahmed-tech",
                "https://www.linkedin.com/in/bilal-ahmed-b54439369/",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "bilalahmed19015@gmail.com",
                contactType: "Main",
              },
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = stored ?? (prefersDark ? 'dark' : 'light');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          {children}
          <BackToTop />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
