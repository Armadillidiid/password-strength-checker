import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Password Strength Checker",
  description: "A tool to evaluate the strength of your passwords",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen bg-gray-50`}
      >
        {children}
      </body>
    </html>
  );
}
