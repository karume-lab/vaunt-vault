import type { Metadata } from "next";

export const metadataConfig: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "VauntVault | Premium Luxury Reselling & Affordability",
    template: "%s | VauntVault",
  },
  description:
    "Shop high-quality, affordable luxury items and access exclusive reselling guides at VauntVault. Your premier destination for streetwear, bags, shoes, jewelry, and off-site supplier stock.",
  keywords: [
    "VauntVault",
    "Luxury Reselling",
    "High Fashion Resale",
    "Streetwear Marketplace",
    "Private Supplier Access",
    "Reselling Guide",
    "Affordable Luxury Shoes",
    "Designer Bags Resale",
    "VVS1 Jewelry",
    "Rick Owens Resale",
    "Balenciaga LED Tracks",
    "Goyard Vault",
  ],
  authors: [{ name: "VauntVault Team", url: "https://vauntvault.com" }],
  creator: "VauntVault Team",
  publisher: "VauntVault Team",

  openGraph: {
    title: "VauntVault | Premium Luxury Reselling & Affordability",
    description:
      "Dress for less while making money doing it. Shop premium high-fashion pieces and unlock unfiltered reselling knowledge with VauntVault.",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "VauntVault",
    images: [
      {
        url: "/images/og-image.jpg", // Kept strictly as JPEG encoding for scraper compatibility
        width: 1200,
        height: 630,
        alt: "VauntVault - Premium Luxury Reselling & Affordability",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "VauntVault | Premium Luxury Reselling & Affordability",
    description:
      "Unlock 3 years of elite reselling knowledge condensed into an 8-page guide. High-quality fashion meet-ups and instant digital shipping.",
    images: ["/images/og-image.jpg"], // Leverages secure JPEG formatting
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
  },

  category: "ecommerce",
};

const SEOConfig = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: "VauntVault",
    alternateName: "VauntVault Platform",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://vauntvault.com",
    description:
      "High-performance, bespoke e-commerce store for luxury fashion and reselling tools.",
    author: {
      "@type": "Organization",
      name: "VauntVault",
    },
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD schema injection
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
    />
  );
};

export default SEOConfig;
