import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Essam Mohamed — AI Developer",
  description: "AI Developer building practical AI solutions with Python.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Essam Mohamed — AI Developer",
    description: "AI Developer building practical AI solutions with Python.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#050A18] text-slate-200">{children}</body>
    </html>
  );
}
