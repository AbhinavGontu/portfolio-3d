import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/ui/Navigation";
import { SITE_CONFIG } from "@/lib/utils/constants";

/**
 * Metadata configuration for SEO and social sharing
 * 
 * This metadata is critical for:
 * - Search engine discovery (Google, Bing indexing)
 * - Social media previews (LinkedIn, Twitter cards)
 * - Browser tab titles and bookmarks
 * 
 * The keywords array targets specific search queries that recruiters
 * might use when looking for candidates with 3D/React expertise.
 * 
 * OpenGraph tags ensure the portfolio looks professional when shared
 * on social platforms, with proper title and description.
 */
export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  authors: [{ name: SITE_CONFIG.author }],
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
  ],
  openGraph: {
    type: "website",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  robots: {
    index: true,  // Allow search engine indexing
    follow: true, // Allow crawling of links on this page
  },
};

/**
 * Root layout component wrapping all pages
 * 
 * This layout is rendered once and persists across page navigation,
 * providing consistent structure and avoiding re-mounting of common
 * components like Navigation and Footer.
 * 
 * The Navigation and Footer are placed here (not in page components)
 * to maintain state and avoid layout shifts during client-side navigation.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/**
         * Font optimization strategy:
         * 
         * 1. preconnect to fonts.googleapis.com - establishes early connection
         *    to reduce DNS lookup and TLS negotiation time (saves ~200ms)
         * 
         * 2. preconnect to fonts.gstatic.com with crossOrigin - prepares for
         *    actual font file downloads from Google's CDN
         * 
         * 3. display=swap in the font URL ensures text remains visible during
         *    font loading (FOIT avoidance), improving perceived performance
         * 
         * Inter is chosen for its excellent readability and wide weight range,
         * supporting everything from thin (300) to extra-bold (800) text.
         */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/**
         * Global layout structure:
         * 
         * Navigation: Fixed header that remains visible during scroll,
         *             providing constant access to all sections
         * 
         * children:   Dynamic page content injected here by Next.js router,
         *             changes based on the current route
         * 
         * Footer:     Consistent footer with contact links and tech stack info,
         *             rendered at the bottom of every page
         * 
         * The 'antialiased' class enables font smoothing for better text
         * rendering across browsers and operating systems.
         */}
        <Navigation />
        {children}
      </body>
    </html>
  );
}
