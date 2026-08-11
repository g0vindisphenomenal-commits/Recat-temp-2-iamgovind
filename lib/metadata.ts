import type { Metadata } from "next";

export const siteConfig = {
  name: "iamgovind",
  description:
    "Portfolio of Govind B — Digital Marketer & Full-Stack Web Developer based in Trivandrum, Kerala.",
  url: "https://iamgovind.com",
  ogImage: "/og-image.png",
  creator: "@iamg0vind",
  authors: [
    {
      name: "Govind B",
      url: "https://iamgovind.com",
    },
  ],
  keywords: [
    "iamgovind",
    "Govind",
    "Digital Marketer",
    "Web Developer",
    "Kerala",
    "Trivandrum",
    "SEO",
    "Next.js",
    "React",
    "E-Commerce",
  ],
} as const;


export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "iamgovind",
    template: "%s | iamgovind",
  },

  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
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
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-black.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],

    shortcut: "/favicon-black.png",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
};


export function createMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title ?? siteConfig.name,
        },
      ],
    },
    twitter: {
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
