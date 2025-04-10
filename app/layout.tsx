import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { GithubIcon } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Runic Number Converter",
  description: "Convert numbers to runic interpretations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="absolute top-4 right-4">
          <div className="flex flex-col gap-2 place-items-center m-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/reference">
                <BookOpen className="mr-2 h-4 w-4" />
                Reference Chart
              </Link>
            </Button>
              <Link href='https://github.com/jpomian/rune-translator' className="flex flex-row gap-2 text-sm hover:text-zinc-800 hover:font-semibold">
                <GithubIcon className="h-5 w-5"/>
                <span>source/jpomian</span>
              </Link>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
