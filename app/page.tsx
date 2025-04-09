"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Home() {
  const [number, setNumber] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const parsedNumber = Number.parseInt(number)

    if (isNaN(parsedNumber)) {
      setError("Please enter a valid number")
      return
    }

    if (parsedNumber < 1 || parsedNumber > 9999) {
      setError("Please enter a number between 1 and 9999")
      return
    }

    setError("")
    router.push(`/result?number=${parsedNumber}`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Runic Number Converter</CardTitle>
          <CardDescription>Enter a number between 1 and 9999 to see its runic interpretation</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="number">Number</Label>
              <Input
                id="number"
                type="number"
                min="1"
                max="9999"
                placeholder="Enter a number (1-9999)"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <p>The runic system uses transformations of the base symbols:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Units (1-9): Original symbols</li>
                  <li>Tens (10-90): Horizontally flipped</li>
                  <li>Hundreds (100-900): Vertically flipped</li>
                  <li>Thousands (1000-9000): Both horizontally and vertically flipped</li>
                </ul>
                <p className="mt-1">Mixed numbers (like 123) will be displayed as combined runes.</p>
              </AlertDescription>
            </Alert>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full">
            Convert to Runes
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
