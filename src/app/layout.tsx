import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const funnelSans = localFont({
  src: [
    {
      path: "./fonts/static/FunnelSans-Light.woff2",
      weight: "300",
      style: "light",
    },
    {
      path: "./fonts/static/FunnelSans-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/static/FunnelSans-Regular.woff2",
      weight: "400",
      style: "regular",
    },
    {
      path: "./fonts/static/FunnelSans-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/static/FunnelSans-Medium.woff2",
      weight: "500",
      style: "medium",
    },
    {
      path: "./fonts/static/FunnelSans-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/static/FunnelSans-SemiBold.woff2",
      weight: "600",
      style: "semibold",
    },
    {
      path: "./fonts/static/FunnelSans-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/static/FunnelSans-Bold.woff2",
      weight: "700",
      style: "bold",
    },
    {
      path: "./fonts/static/FunnelSans-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/static/FunnelSans-ExtraBold.woff2",
      weight: "800",
      style: "extrabold",
    },
    {
      path: "./fonts/static/FunnelSans-ExtraBoldItalic.woff2",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-funnel-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Clutch Studio - Web Development Portfolio | San Diego, CA",
  description:
    "Professional web development services in San Diego, California. Specializing in React, Next.js, TypeScript, and modern web applications. View portfolio of responsive websites, e-commerce solutions, and custom web applications.",
  keywords: [
    "web development San Diego",
    "React developer San Diego",
    "Next.js developer California",
    "TypeScript developer San Diego",
    "web design San Diego",
    "custom web applications",
    "responsive website design",
    "e-commerce development",
    "portfolio website",
    "frontend developer San Diego",
    "full-stack developer California",
    "modern web development",
    "UI/UX design San Diego",
    "web application development",
    "San Diego web developer",
  ],
  authors: [{ name: "Clutch Studio", url: "https://clutchstudio.dev" }],
  creator: "Clutch Studio",
  publisher: "Clutch Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://clutchstudio.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Clutch Studio - Web Development Portfolio | San Diego, CA",
    description:
      "Professional web development services in San Diego, California. Specializing in React, Next.js, TypeScript, and modern web applications.",
    url: "https://clutchstudio.dev",
    siteName: "Clutch Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Clutch Studio - Web Development Portfolio San Diego",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clutch Studio - Web Development Portfolio | San Diego, CA",
    description:
      "Professional web development services in San Diego, California. Specializing in React, Next.js, TypeScript, and modern web applications.",
    images: ["/og-image.jpg"],
    creator: "@clutchstudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  manifest: "/site.webmanifest",
  category: "technology",
  classification: "Web Development Services",
  other: {
    "geo.region": "US-CA",
    "geo.placename": "San Diego",
    "geo.position": "32.7157;-117.1611",
    ICBM: "32.7157, -117.1611",
    "DC.title": "Clutch Studio Web Development Portfolio",
    "DC.creator": "Clutch Studio",
    "DC.subject": "Web Development, React, Next.js, TypeScript, San Diego",
    "DC.description":
      "Professional web development services in San Diego, California",
    "DC.publisher": "Clutch Studio",
    "DC.contributor": "Clutch Studio",
    "DC.date": "2025",
    "DC.type": "Service",
    "DC.format": "text/html",
    "DC.identifier": "https://clutchstudio.dev",
    "DC.language": "en",
    "DC.coverage": "San Diego, California, United States",
    "DC.rights": "Copyright 2025 Clutch Studio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Clutch Studio",
    description:
      "Professional web development services in San Diego, California. Specializing in React, Next.js, TypeScript, and modern web applications.",
    url: "https://clutchstudio.dev",
    telephone: "+1-619-XXX-XXXX",
    email: "clutchdev.apps@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Diego",
      addressRegion: "CA",
      addressCountry: "US",
      postalCode: "92101",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.7157,
      longitude: -117.1611,
    },
    areaServed: {
      "@type": "City",
      name: "San Diego",
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 32.7157,
        longitude: -117.1611,
      },
      geoRadius: "50000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "React Development",
            description: "Custom React applications and components",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Next.js Development",
            description: "Full-stack Next.js applications",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "TypeScript Development",
            description: "Type-safe web applications",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Responsive Web Design",
            description: "Mobile-first responsive websites",
          },
        },
      ],
    },
    sameAs: [
      "https://github.com/yourusername",
      "https://linkedin.com/in/yourusername",
    ],
    openingHours: "Mo-Fr 09:00-17:00",
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Credit Card, PayPal, Bank Transfer",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${funnelSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
