/** @format */

// import { fontHandwriting, fontHeading, fontSans } from "@/_shared/utils/font";
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
      <body className={`${poppins.className} antialiased scroll-smooth`}>
        {children}
        <ScrollToTopButton />
        <Toaster />
      </body>
    </html>
  );
}
