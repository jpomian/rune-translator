interface RunicSymbol {
  value: number
  paths: string[]
}

const runicSymbols: RunicSymbol[] = [
  // Units (1-9)
  { value: 1, paths: ["M10,10 L10,90", "M10,10 L30,10"] },
  { value: 2, paths: ["M10,10 L10,90", "M10,30 L30,30"] },
  { value: 3, paths: ["M10,10 L10,90", "M10,10 L30,40"] },
  { value: 4, paths: ["M10,10 L10,90", "M10,40 L30,10"] },
  { value: 5, paths: ["M10,10 L10,90", "M10,10 L30,10", "M30,10 L10,30"] },
  { value: 6, paths: ["M10,10 L10,90", "M25,10 L25,30"] },
  { value: 7, paths: ["M10,10 L10,90", "M10,10 L30,10", "M10,10 L30,10", "M30,10 L30,30"] },
  { value: 8, paths: ["M10,10 L10,90", "M10,30 L30,30", "M30,10 L30,30"] },
  { value: 9, paths: ["M10,10 L10,90", "M10,10 L30,10", "M30,10 L30,30", "M30,30 L10,30"] },

  // Tens (10-90)
  { value: 10, paths: ["M10,10 L10,90", "M10,90 L30,90"] },
  { value: 20, paths: ["M10,10 L10,90", "M10,90 L30,90", "M10,10 L30,10"] },
  { value: 30, paths: ["M10,10 L10,90", "M10,40 L30,90"] },
  { value: 40, paths: ["M10,10 L10,90", "M10,90 L30,40"] },
  { value: 50, paths: ["M10,10 L10,90", "M10,90 L30,90", "M30,90 L30,40"] },
  { value: 60, paths: ["M10,10 L10,90", "M20,40 L20,90"] },
  { value: 70, paths: ["M10,10 L10,90", "M10,40 L30,90", "M30,90 L30,40"] },
  { value: 80, paths: ["M10,10 L10,90", "M10,40 L30,40", "M30,40 L30,90"] },
  { value: 90, paths: ["M10,10 L10,90", "M10,90 L30,90", "M30,90 L30,10", "M30,10 L10,10"] },

  // Hundreds (100-900)
  { value: 100, paths: ["M10,10 L10,90", "M10,90 L30,90", "M30,90 L30,10"] },
  { value: 200, paths: ["M10,10 L10,90", "M10,10 L30,10", "M30,10 L30,90", "M30,90 L10,90"] },
  { value: 300, paths: ["M10,10 L10,90", "M10,90 L30,40"] },
  { value: 400, paths: ["M10,10 L10,90", "M10,90 L30,10", "M30,10 L30,90"] },
  { value: 500, paths: ["M10,10 L10,90", "M10,90 L30,40", "M30,40 L10,40"] },
  { value: 600, paths: ["M10,10 L10,90", "M10,90 L10,40", "M10,40 L30,40"] },
  { value: 700, paths: ["M10,10 L10,90", "M10,90 L30,90", "M30,90 L10,40"] },
  { value: 800, paths: ["M10,10 L10,90", "M10,10 L30,10", "M30,10 L30,40", "M30,40 L10,40"] },
  { value: 900, paths: ["M10,10 L10,90", "M10,10 L30,10", "M30,10 L30,90", "M30,90 L10,40"] },

  // Thousands (1000-9000)
  { value: 1000, paths: ["M10,10 L10,90", "M10,90 L30,90", "M30,90 L30,10", "M30,10 L10,10"] },
  { value: 2000, paths: ["M10,10 L10,90", "M10,10 L30,10", "M30,10 L30,90"] },
  { value: 3000, paths: ["M10,10 L10,90", "M10,40 L30,10", "M30,10 L30,90"] },
  { value: 4000, paths: ["M10,10 L10,90", "M10,10 L30,90", "M30,90 L30,10"] },
  { value: 5000, paths: ["M10,10 L10,90", "M10,10 L30,10", "M30,10 L10,40", "M10,40 L30,40"] },
  { value: 6000, paths: ["M10,10 L10,90", "M10,10 L10,40", "M10,40 L30,40"] },
  { value: 7000, paths: ["M10,10 L10,90", "M10,10 L30,10", "M30,10 L10,90"] },
  { value: 8000, paths: ["M10,10 L10,90", "M10,10 L30,10", "M30,10 L30,90", "M30,90 L10,40"] },
  { value: 9000, paths: ["M10,10 L10,90", "M10,10 L30,10", "M30,10 L30,90", "M30,90 L10,90"] },
]

function isPureValue(num: number): boolean {
  return (
    num === 0 ||
    (num >= 1 && num <= 9) ||
    (num % 10 === 0 && num >= 10 && num <= 90) ||
    (num % 100 === 0 && num >= 100 && num <= 900) ||
    (num % 1000 === 0 && num >= 1000 && num <= 9000)
  )
}

export function convertToRunic(number: number): {
  symbols: RunicSymbol[]
  combined: boolean
  combinedPaths: string[]
} {
  // Ensure the number is between 1 and 9999
  const safeNumber = Math.max(1, Math.min(9999, number))

  // Break down the number into thousands, hundreds, tens, and units
  const thousands = Math.floor(safeNumber / 1000)
  const hundreds = Math.floor((safeNumber % 1000) / 100)
  const tens = Math.floor((safeNumber % 100) / 10)
  const units = safeNumber % 10

  const result: RunicSymbol[] = []

  // Add thousands symbol if needed
  if (thousands > 0) {
    result.push(runicSymbols.find((s) => s.value === thousands * 1000)!)
  }

  // Add hundreds symbol if needed
  if (hundreds > 0) {
    result.push(runicSymbols.find((s) => s.value === hundreds * 100)!)
  }

  // Add tens symbol if needed
  if (tens > 0) {
    result.push(runicSymbols.find((s) => s.value === tens * 10)!)
  }

  // Add units symbol if needed
  if (units > 0) {
    result.push(runicSymbols.find((s) => s.value === units)!)
  }

  // Check if we need to combine the symbols
  const shouldCombine = !isPureValue(safeNumber)

  // If we need to combine, merge all paths into a single symbol
  let combinedPaths: string[] = []
  if (shouldCombine) {
    // Collect all paths from all symbols
    result.forEach((symbol) => {
      combinedPaths = [...combinedPaths, ...symbol.paths]
    })
  }

  return {
    symbols: result,
    combined: shouldCombine,
    combinedPaths,
  }
}

// Function to check if a number is a compound number (examples from the image)
export function isCompoundExample(num: number): boolean {
  const examples = [1992, 4723, 6859, 7052, 2971, 9433, 9938]
  return examples.includes(num)
}
