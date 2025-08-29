/** @format */

import { Poppins } from "next/font/google";
import ScrollToTopButton from "@/components/scroll-to-top";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/_shared/toast/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://proptech-guest-app.vercel.app/"),
  title: "The Spotlagos - Book Your Dream Apartment with Ease",
  description:
    "Discover and book top apartments effortlessly with The Spotlagos. Whether short-term or long-term rentals, find your ideal home with ease.",
  keywords: [
    "The Spotlagos",
    "apartment booking",
    "real estate",
    "housing",
    "rental homes",
    "short-term rentals",
    "long-term rentals",
    "property management",
    "vacation rentals",
  ],
  applicationName: "The Spotlagos",
  robots: "index, follow",
  category: "Real Estate, Apartment Booking, Housing",
  authors: [
    { name: "The Spotlagos", url: "https://proptech-guest-app.vercel.app" },
  ],
  openGraph: {
    title: "The Spotlagos - Book Your Dream Apartment with Ease",
    description:
      "Discover and book top apartments effortlessly with The Spotlagos. Whether short-term or long-term rentals, find your ideal home with ease.",
    url: "https://proptech-guest-app.vercel.app",
    siteName: "The Spotlagos",
    images: [
      {
        url: "https://proptech-guest-app.vercel.app/images/logo-color.png",
        width: 1200,
        height: 630,
        alt: "The Spotlagos",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Spotlagos - Book Your Dream Apartment with Ease",
    description:
      "Discover and book top apartments effortlessly with The Spotlagos. Whether short-term or long-term rentals, find your ideal home with ease.",
    images: ["https://proptech-guest-app.vercel.app/images/logo-color.png"],
  },
  other: {
    "google-site-verification": "",
    "schema:Organization": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "The Spotlagos",
      url: "https://proptech-guest-app.vercel.app",
      logo: "https://proptech-guest-app.vercel.app/images/logo.png",
      description:
        "The Spotlagos is the go-to platform for finding and booking apartments, providing seamless experiences for renters and homeowners alike.",
    }),
  },
  alternates: {
    canonical: "https://proptech-guest-app.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased scroll-smooth`}>
        {children}
        <ScrollToTopButton />
        <Toaster />
      </body>
    </html>
  );
}
