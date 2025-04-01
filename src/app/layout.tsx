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
  metadataBase: new URL("https://staging-guest.the99apartments.com"),
  title: "99Apartment - Book Your Dream Apartment with Ease",
  description:
    "Discover and book top apartments effortlessly with 99Apartment. Whether short-term or long-term rentals, find your ideal home with ease.",
  keywords: [
    "99Apartment",
    "apartment booking",
    "real estate",
    "housing",
    "rental homes",
    "short-term rentals",
    "long-term rentals",
    "property management",
    "vacation rentals",
  ],
  applicationName: "99Apartment",
  robots: "index, follow",
  category: "Real Estate, Apartment Booking, Housing",
  authors: [
    { name: "99Apartment", url: "https://staging-guest.the99apartments.com" },
  ],
  openGraph: {
    title: "99Apartment - Book Your Dream Apartment with Ease",
    description:
      "Discover and book top apartments effortlessly with 99Apartment. Whether short-term or long-term rentals, find your ideal home with ease.",
    url: "https://staging-guest.the99apartments.com",
    siteName: "99Apartment",
    images: [
      {
        url: "https://staging-guest.the99apartments.com/images/logo-color.png",
        width: 1200,
        height: 630,
        alt: "99Apartment",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "99Apartment - Book Your Dream Apartment with Ease",
    description:
      "Discover and book top apartments effortlessly with 99Apartment. Whether short-term or long-term rentals, find your ideal home with ease.",
    images: ["https://staging-guest.the99apartments.com/images/logo-color.png"],
  },
  other: {
    "google-site-verification": "",
    "schema:Organization": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "99Apartment",
      url: "https://staging-guest.the99apartments.com",
      logo: "https://staging-guest.the99apartments.com/images/logo.png",
      description:
        "99Apartment is the go-to platform for finding and booking apartments, providing seamless experiences for renters and homeowners alike.",
    }),
  },
  alternates: {
    canonical: "https://staging-guest.the99apartments.com",
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
