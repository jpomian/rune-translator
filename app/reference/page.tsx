import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ReferencePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Runic Number Reference</CardTitle>
          <CardDescription>Reference chart for the runic number system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border p-4 rounded-md bg-white">
            <Image
              src="/runes.png"
              alt="Runic number system reference chart"
              width={400}
              height={500}
              className="mx-auto"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Converter
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
