import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";

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
  variable: "--font-funnel",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://rvector.dev";
const SITE_TITLE = "rvector.dev | Ramon, Full-Stack Engineer & Web Hosting";
const SITE_DESCRIPTION =
  "Portfolio of Ramon, a full-stack software engineer in San Diego, CA. Full-stack and machine learning projects, plus custom website design, development, and managed hosting for businesses.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s | rvector.dev",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "rvector",
    "rvector.dev",
    "Ramon software engineer",
    "full-stack developer San Diego",
    "Next.js developer San Diego",
    "React developer San Diego",
    "TypeScript developer",
    "machine learning projects",
    "web design San Diego",
    "website hosting for small business",
    "managed web hosting San Diego",
    "custom web applications",
    "web development San Diego",
    "portfolio website",
  ],
  authors: [{ name: "Ramon", url: SITE_URL }],
  creator: "Ramon",
  publisher: "rvector.dev",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "rvector.dev",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "rvector.dev logo: a beaver coding on a laptop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
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
  manifest: "/site.webmanifest",
  category: "technology",
  other: {
    "geo.region": "US-CA",
    "geo.placename": "San Diego",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Ramon",
        url: SITE_URL,
        jobTitle: "Software Engineer",
        worksFor: { "@type": "Organization", name: "ModalAI" },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "University of California San Diego",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "San Diego",
          addressRegion: "CA",
          addressCountry: "US",
        },
        sameAs: [
          "https://github.com/RamonsArchive",
          "https://www.linkedin.com/in/ramonmnm100",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: "rvector.dev",
        description:
          "Custom website design, development, and managed hosting for businesses and organizations.",
        url: SITE_URL,
        image: `${SITE_URL}/og-image.png`,
        email: "clutchdev.apps@gmail.com",
        founder: { "@id": `${SITE_URL}/#person` },
        areaServed: { "@type": "City", name: "San Diego" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "San Diego",
          addressRegion: "CA",
          addressCountry: "US",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web design and hosting services",
          itemListElement: [
            "Custom website design and development",
            "Managed website hosting",
            "Admin dashboards",
            "Payments and integrations",
            "SEO and performance",
            "Ongoing maintenance",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Viewport and iOS status bar color control */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="theme-color" content="#070E1B" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="mobile-web-app-capable" content="yes" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${funnelSans.variable} ${jetbrainsMono.variable} font-funnel-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
