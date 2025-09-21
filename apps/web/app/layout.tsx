import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GoPOS - Point of Sale System",
  description: "Modern POS system for beverage shops",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#1f1d2b] text-white`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
