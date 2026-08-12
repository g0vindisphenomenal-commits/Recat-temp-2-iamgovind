import type { Metadata } from "next";

export const siteConfig = {
  name: "Govind B",
  description:
    "Digital marketer and web developer helping businesses grow through websites, SEO, advertising and digital solutions.",
  url: "https://iamgovind.com",
  ogImage: "https://iamgovind.com/og-image.jpg",
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
    default: "Govind B | Digital Marketer & Web Developer",
    template: "%s | Govind B",
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
    url: "https://iamgovind.com/",
    title: "Govind B | Digital Marketer & Web Developer",
    description:
      "Digital marketing, web development and growth solutions by Govind B.",
    siteName: "Govind B",
    images: [
      {
        url: "https://iamgovind.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Govind B - Digital Marketer & Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Govind B | Digital Marketer & Web Developer",
    description:
      "Digital marketing, web development and growth solutions by Govind B.",
    images: ["https://iamgovind.com/og-image.jpg"],
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
  ogDescription,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  ogDescription?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title: title ?? "Govind B | Digital Marketer & Web Developer",
    description: description ?? siteConfig.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url,
      title: title ?? "Govind B | Digital Marketer & Web Developer",
      description:
        ogDescription ??
        description ??
        "Digital marketing, web development and growth solutions by Govind B.",
      siteName: "Govind B",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
            ? `${title} - Govind B`
            : "Govind B - Digital Marketer & Web Developer",
        },
      ],
    },
    twitter: {
      title: title ?? "Govind B | Digital Marketer & Web Developer",
      description:
        ogDescription ??
        description ??
        "Digital marketing, web development and growth solutions by Govind B.",
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
