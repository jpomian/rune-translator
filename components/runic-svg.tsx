"use client"

import { useEffect, useRef } from "react"
import { convertToRunic } from "@/lib/runic-converter"

interface RunicSvgProps {
  number: string
}

export default function RunicSvg({ number }: RunicSvgProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const numValue = Number.parseInt(number, 10)
    if (isNaN(numValue) || numValue < 1 || numValue > 9999) return

    const { symbols, combined } = convertToRunic(numValue)

    // Clear existing content
    while (svgRef.current.firstChild) {
      svgRef.current.removeChild(svgRef.current.firstChild)
    }

    if (combined) {
      // Create a single combined symbol
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g")

      // Add paths from all symbols
      symbols.forEach((symbol) => {
        symbol.paths.forEach((path) => {
          const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
          pathElement.setAttribute("d", path.d)
          if (path.transform) {
            pathElement.setAttribute("transform", path.transform)
          }
          pathElement.setAttribute("stroke", "black")
          pathElement.setAttribute("stroke-width", "2")
          pathElement.setAttribute("fill", "none")
          g.appendChild(pathElement)
        })
      })

      svgRef.current?.appendChild(g)
    } else {
      // Add separate runic symbols to SVG
      symbols.forEach((symbol, index) => {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g")
        g.setAttribute("transform", `translate(${index * 50}, 0)`)

        // Add paths from the symbol
        symbol.paths.forEach((path) => {
          const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path")
          pathElement.setAttribute("d", path.d)
          if (path.transform) {
            pathElement.setAttribute("transform", path.transform)
          }
          pathElement.setAttribute("stroke", "black")
          pathElement.setAttribute("stroke-width", "2")
          pathElement.setAttribute("fill", "none")
          g.appendChild(pathElement)
        })

        svgRef.current?.appendChild(g)
      })
    }
  }, [number])

  // Calculate width based on combined or separate symbols
  const numValue = Number.parseInt(number, 10)
  const { symbols, combined } = convertToRunic(numValue)
  const svgWidth = combined ? 40 : symbols.length * 50

  return <svg id="runic-svg" ref={svgRef} width={svgWidth} height="100" viewBox={`0 0 ${svgWidth} 100`} />
}
