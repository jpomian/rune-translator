interface RunePath {
  d: string
  transform?: string
}

interface RunicSymbol {
  value: number
  paths: RunePath[]
  placeValue: "unit" | "ten" | "hundred" | "thousand"
}

// Base paths for units 1-9
const unitPaths: Record<number, string[]> = {
  1: ["M10,10 L10,90", "M10,10 L30,10"],
  2: ["M10,10 L10,90", "M10,30 L30,30"],
  3: ["M10,10 L10,90", "M10,10 L30,40"],
  4: ["M10,10 L10,90", "M10,40 L30,10"],
  5: ["M10,10 L10,90", "M10,10 L30,10", "M30,10 L10,30"],
  6: ["M10,10 L10,90", "M25,10 L25,30"],
  7: ["M10,10 L10,90", "M10,10 L30,10", "M10,10 L30,10", "M30,10 L30,30"],
  8: ["M10,10 L10,90", "M10,30 L30,30", "M30,10 L30,30"],
  9: ["M10,10 L10,90", "M10,10 L30,10", "M30,10 L30,30", "M30,30 L10,30"],
}

// Center point for transformations
const centerX = 20
const centerY = 50

// Function to create a runic symbol for a specific digit and place value
function createRunicSymbol(digit: number, placeValue: "unit" | "ten" | "hundred" | "thousand"): RunicSymbol {
  // Ensure digit is between 1-9
  if (digit < 1 || digit > 9) {
    throw new Error(`Invalid digit: ${digit}. Must be between 1 and 9.`)
  }

  // Get the base paths for this digit
  const basePaths = unitPaths[digit]

  // Create paths with appropriate transformations based on place value
  const paths: RunePath[] = basePaths.map((d) => {
    const path: RunePath = { d }

    switch (placeValue) {
      case "unit":
        // No transformation for units
        break
      case "ten":
        // Horizontal flip for tens
        path.transform = `scale(-1, 1) translate(-${2 * centerX}, 0)`
        break
      case "hundred":
        // Vertical flip for hundreds
        path.transform = `scale(1, -1) translate(0, -${2 * centerY})`
        break
      case "thousand":
        // Both horizontal and vertical flip for thousands
        path.transform = `scale(-1, -1) translate(-${2 * centerX}, -${2 * centerY})`
        break
    }

    return path
  })

  return {
    value: digit * (placeValue === "unit" ? 1 : placeValue === "ten" ? 10 : placeValue === "hundred" ? 100 : 1000),
    paths,
    placeValue,
  }
}

// Convert a number to its runic representation
export function convertToRunic(number: number): {
  symbols: RunicSymbol[]
  combined: boolean
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
    result.push(createRunicSymbol(thousands, "thousand"))
  }

  // Add hundreds symbol if needed
  if (hundreds > 0) {
    result.push(createRunicSymbol(hundreds, "hundred"))
  }

  // Add tens symbol if needed
  if (tens > 0) {
    result.push(createRunicSymbol(tens, "ten"))
  }

  // Add units symbol if needed
  if (units > 0) {
    result.push(createRunicSymbol(units, "unit"))
  }

  // Check if we need to combine the symbols (if there's more than one place value)
  const shouldCombine = result.length > 1

  return {
    symbols: result,
    combined: shouldCombine,
  }
}

// Function to get a description of the place value
export function getPlaceValueDescription(placeValue: "unit" | "ten" | "hundred" | "thousand"): string {
  switch (placeValue) {
    case "unit":
      return "unit (original)"
    case "ten":
      return "ten (horizontally flipped)"
    case "hundred":
      return "hundred (vertically flipped)"
    case "thousand":
      return "thousand (horizontally and vertically flipped)"
  }
}
