"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SearchBarProps {
  min?: number
  max?: number
  placeholder?: string
  onSearch: (value: number) => void
  label?: string
}

export function SearchBar({
  min = 1,
  max = 9999,
  placeholder = "",
  onSearch,
  label = "Number",
}: SearchBarProps) {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  const handleSearch = () => {
    const parsedNumber = Number.parseInt(value)

    if (isNaN(parsedNumber)) {
      setError("Please enter a valid number")
      return
    }

    if (parsedNumber < min || parsedNumber > max) {
      setError(`Please enter a number between ${min} and ${max}`)
      return
    }

    setError("")
    onSearch(parsedNumber)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search">{label}</Label>
          <Input
            id="search"
            type="number"
            min={min}
            max={max}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </form>
      {error && (
        <div className="text-sm text-red-500">
          {error}
        </div>
      )}
    </div>
  )
}