import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "YourVisaSite - Australian Visa Intelligence Platform",
  description: "Navigate your Australian visa journey with real-time tracking, expert lawyer consultations, and intelligent document guidance.",
  keywords: "australian visa, immigration, visa tracker, visa lawyer, visa application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-gray-50 text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
