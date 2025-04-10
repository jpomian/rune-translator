"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/searchbar"; // Adjust the import path

export default function Home() {
  const router = useRouter();

  const handleSearch = (number: number) => {
    router.push(`/result?number=${number}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Runic Number Converter</CardTitle>
          <CardDescription>
            Enter a number between 1 and 9999 to see its runic interpretation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Enter a number (1-9999)"
          />

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <p>The runic system uses transformations of the base symbols:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Units (1-9): Original symbols</li>
                <li>Tens (10-90): Horizontally flipped</li>
                <li>Hundreds (100-900): Vertically flipped</li>
                <li>
                  Thousands (1000-9000): Both horizontally and vertically
                  flipped
                </li>
              </ul>
              <p className="mt-1">
                Mixed numbers (like <span className="font-semibold">123</span>)
                will be displayed as combined runes.
              </p>
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => document.querySelector("form")?.requestSubmit()}
            className="w-full"
          >
            Convert to Runes
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
