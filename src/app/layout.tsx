import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/site/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://portfolio.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dognon Franck — Développeur · Créateur · Entrepreneur",
    template: "%s · Dognon Franck",
  },
  description:
    "Portfolio de Dognon Franck — développeur, créateur et entrepreneur basé à Cotonou. Conception de produits numériques modernes avec React, Next.js, TypeScript, Prisma et PostgreSQL.",
  keywords: [
    "Dognon Franck",
    "Développeur",
    "Créateur",
    "Entrepreneur",
    "Cotonou",
    "Bénin",
    "Next.js",
    "React",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "PHP",
    "JavaScript",
    "Portfolio",
    "Full Stack",
  ],
  authors: [{ name: "Dognon Franck", url: siteUrl }],
  creator: "Dognon Franck",
  publisher: "Dognon Franck",
  icons: {
    icon: "/franck-logo.png",
    apple: "/franck-logo.png",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": `${siteUrl}/rss.xml`,
      "application/atom+xml": `${siteUrl}/atom.xml`,
    },
  },
  openGraph: {
    title: "Dognon Franck — Développeur · Créateur · Entrepreneur",
    description:
      "Développeur, créateur et entrepreneur basé à Cotonou. Crafting premium digital products with engineering precision.",
    url: siteUrl,
    siteName: "Dognon Franck",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/franck-logo.png",
        width: 1200,
        height: 630,
        alt: "Dognon Franck — Développeur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dognon Franck — Développeur · Créateur · Entrepreneur",
    description:
      "Développeur, créateur et entrepreneur basé à Cotonou. Crafting premium digital products.",
    creator: "@dognonfranck",
    images: ["/franck-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "google-site-verification-token",
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dognon Franck",
  url: siteUrl,
  image: `${siteUrl}/franck-logo.png`,
  jobTitle: "Développeur · Créateur · Entrepreneur",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cotonou",
    addressCountry: "Bénin",
  },
  email: "yvandr186@gmail.com",
  worksFor: {
    "@type": "Organization",
    name: "Independent",
  },
  sameAs: [
    "https://github.com/dognonfranck",
    "https://twitter.com/dognonfranck",
    "https://linkedin.com/in/dognonfranck",
    "https://dribbble.com/dognonfranck",
  ],
  knowsAbout: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "PHP",
    "React",
    "Next.js",
    "Prisma",
    "PostgreSQL",
    "Product Design",
    "UI/UX",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
