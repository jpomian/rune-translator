"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"
import RunicSvg from "@/components/runic-svg"
import { convertToRunic, getPlaceValueDescription } from "@/lib/runic-converter"
import { SearchBar } from "@/components/searchbar"
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const number = searchParams.get("number") || "0"
  const numValue = Number.parseInt(number, 10)
  const { symbols, combined } = convertToRunic(numValue)

  const downloadSvg = () => {
    const svgElement = document.getElementById("runic-svg")
    if (!svgElement) return

    const svgData = new XMLSerializer().serializeToString(svgElement)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const svgUrl = URL.createObjectURL(svgBlob)

    const downloadLink = document.createElement("a")
    downloadLink.href = svgUrl
    downloadLink.download = `runic-number-${number}.svg`
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(svgUrl)
  }

  // Function to explain the runic representation
  const explainRunic = () => {
    if (isNaN(numValue) || numValue < 1 || numValue > 9999) {
      return "Invalid number"
    }

    const thousands = Math.floor(numValue / 1000)
    const hundreds = Math.floor((numValue % 1000) / 100)
    const tens = Math.floor((numValue % 100) / 10)
    const units = numValue % 10

    const parts = []
    if (thousands > 0) parts.push(`${thousands}000`)
    if (hundreds > 0) parts.push(`${hundreds}00`)
    if (tens > 0) parts.push(`${tens}0`)
    if (units > 0) parts.push(`${units}`)

    return `Composed of: ${parts.join(" + ")}`
  }

  const handleSearch = (number: number) => {
    router.push(`/result?number=${number}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Runic Interpretation</CardTitle>
          <CardDescription>Runic representation of the number {number}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
        <SearchBar
            onSearch={handleSearch}
            placeholder="Enter a number (1-9999)"
          />
          <div className="border p-6 rounded-md bg-white flex justify-center">
            <RunicSvg number={number} />
          </div>
          <p className="text-sm text-muted-foreground">{explainRunic()}</p>

          {combined && (
            <p className="text-sm text-muted-foreground">
              For mixed numbers like {number}, the runes are combined into a single symbol.
            </p>
          )}

          <div className="text-sm text-muted-foreground">
            <p className="font-medium">Symbols used:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              {symbols.map((symbol, index) => (
                <li key={index}>
                  {symbol.value}: {getPlaceValueDescription(symbol.placeValue)}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <Button onClick={downloadSvg}>
            <Download className="mr-2 h-4 w-4" />
            Download SVG
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
