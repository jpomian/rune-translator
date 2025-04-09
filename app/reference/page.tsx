import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ReferencePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Runic Number Reference</CardTitle>
          <CardDescription>Reference for the runic number system transformation rules</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Transformation Rules</h3>
            <p className="text-sm text-muted-foreground">
              The runic system uses the following transformation rules to represent different place values:
            </p>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Place Value</TableHead>
                  <TableHead>Transformation</TableHead>
                  <TableHead>Example</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Units (1-9)</TableCell>
                  <TableCell>Original symbols</TableCell>
                  <TableCell>1, 2, 3, ...</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tens (10-90)</TableCell>
                  <TableCell>Horizontally flipped</TableCell>
                  <TableCell>10, 20, 30, ...</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Hundreds (100-900)</TableCell>
                  <TableCell>Vertically flipped</TableCell>
                  <TableCell>100, 200, 300, ...</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Thousands (1000-9000)</TableCell>
                  <TableCell>Both horizontally and vertically flipped</TableCell>
                  <TableCell>1000, 2000, 3000, ...</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Combined Numbers</h3>
            <p className="text-sm text-muted-foreground">
              For numbers that include multiple place values (e.g., 123), the runic symbols for each place value
              (hundreds, tens, units) are combined into a single SVG image. The layout and positioning of the combined
              symbols are designed to be visually coherent.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Base Runic Symbols (Units 1-9)</h3>
            <p className="text-sm text-muted-foreground">
              These are the base symbols from which all other symbols are derived through transformations:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>1: Straight line with small line on top directed to the right</li>
              <li>2: Straight line with small line between top and center directed to the right</li>
              <li>3: Straight line with small line directed diagonally to the bottom right</li>
              <li>4: Straight line with small line directed diagonally to the top right</li>
              <li>5: Straight line with 2 small lines resembling a flag</li>
              <li>6: Straight line with small line detached from main line</li>
              <li>7: Straight line with 2 small lines (top right and down)</li>
              <li>8: Straight line with 2 small lines (middle right and up)</li>
              <li>9: Straight line with square attached at the top</li>
            </ul>
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
