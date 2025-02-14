import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from 'next/image'
import { Footer } from '@/components/Footer'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Star Seeker | Hyperspace Tunneling Corp.",
  description: "The cosmos is calling, and the journey begins with Star Seeker. Start your cosmic adventure now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative grid grid-rows-[20px_1fr_20px] alignjustify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center">
            <Image
              className="dark:invert"
              src="/logo.svg"
              alt="Star Seeker logo"
              width={180}
              height={38}
              priority
            />
            {children}
          </main>
          <div className="flex flex-column justify-flex-end absolute bottom-0 left-0 pb-10 justify-center w-full">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
