/** @format */

// import { fontHandwriting, fontHeading, fontSans } from "@/_shared/utils/font";
import ScrollToTopButton from "@/components/scroll-to-top";
import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "99Apartment  ",
  description: "",
  keywords: ["Estate management"],
  applicationName: "99Apartment",
  robots: "index, follow",
  category: "real estate, estate management , housing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={" scroll-smooth  "}>{children}</body>
      <ScrollToTopButton />
    </html>
  );
}
