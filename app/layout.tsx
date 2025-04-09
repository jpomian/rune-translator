import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Runic Number Converter",
  description: "Convert numbers to runic interpretations",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="absolute top-4 right-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/reference">
              <BookOpen className="mr-2 h-4 w-4" />
              Reference Chart
            </Link>
          </Button>
        </div>
        {children}
      </body>
    </html>
  )
}
