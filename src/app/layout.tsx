import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

// Load Rubik font with multiple weights
const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "James Nguyen Portfolio",
  description: "Showcase of my work as a Software Engineer & Animator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
