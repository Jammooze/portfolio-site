import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

// Load Rubik font with multiple weights
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nguyenjames.me";
const title = "James Nguyen | Software Engineer & 3D Animator";
const description =
  "Portfolio of James Nguyen, a software engineer and 3D animator building interactive experiences, games, and animation pipelines.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | James Nguyen",
  },
  description,
  keywords: [
    "James Nguyen",
    "software engineer portfolio",
    "3D animator",
    "game developer",
    "technical artist",
    "Unity developer",
    "Unreal Engine",
    "Maya animation",
  ],
  authors: [{ name: "James Nguyen" }],
  creator: "James Nguyen",
  icons: {
    icon: "/images/glorp.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: "James Nguyen Portfolio",
    images: [
      {
        url: "/images/jimmypfp.png",
        width: 600,
        height: 600,
        alt: "James Nguyen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/jimmypfp.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111827",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "James Nguyen",
  url: siteUrl,
  image: `${siteUrl}/images/jimmypfp.png`,
  jobTitle: "Software Engineer & 3D Animator",
  sameAs: [
    "https://www.artstation.com/jammooze",
    "https://www.linkedin.com/in/james-nguyen-45a6a8208/",
    "https://www.instagram.com/yamesnewyen/",
    "https://github.com/Jammooze",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${rubik.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
