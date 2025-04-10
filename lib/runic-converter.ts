interface RunePath {
  d: string
}

interface RunicSymbol {
  value: number
  paths: RunePath[]
  placeValue: "unit" | "ten" | "hundred" | "thousand"
}

// Base pole path (vertical line) moved to origin
const BASE_POLE = "M0,0 L0,80"

// Define separate path sets for each place value
// Units - original symbols (right side)
const UNIT_PATHS: Record<number, string[]> = {
  1: ["M0,0 L20,0"], // Small line on top right
  2: ["M0,20 L20,20"], // Small line middle right
  3: ["M0,0 L20,30"], // Diagonal bottom right
  4: ["M0,20 L20,0"], // Diagonal top right
  5: ["M0,0 L20,0", "M20,0 L0,20"], // Flag shape
  6: ["M15,0 L15,20"], // Detached line
  7: ["M0,0 L20,0", "M20,0 L20,20"], // Right then down
  8: ["M0,20 L20,20", "M20,0 L20,20"], // Two middle lines
  9: ["M0,0 L20,0", "M20,0 L20,20", "M20,20 L0,20"], // Square
}

// Tens - left side (instead of horizontal flip)
const TEN_PATHS: Record<number, string[]> = {
  1: ["M0,0 L-20,0"], // Small line on top left
  2: ["M0,20 L-20,20"], // Small line middle left
  3: ["M0,0 L-20,30"], // Diagonal bottom left
  4: ["M0,20 L-20,0"], // Diagonal top left
  5: ["M0,0 L-20,0", "M-20,0 L0,20"], // Flag shape left
  6: ["M-15,0 L-15,20"], // Detached line left
  7: ["M0,0 L-20,0", "M-20,0 L-20,20"], // Left then down
  8: ["M0,20 L-20,20", "M-20,0 L-20,20"], // Two middle lines left
  9: ["M0,0 L-20,0", "M-20,0 L-20,20", "M-20,20 L0,20"], // Square left
}

// Hundreds - bottom side (instead of vertical flip)
const HUNDRED_PATHS: Record<number, string[]> = {
  1: ["M0,80 L20,80"], // Small line on bottom right
  2: ["M0,60 L20,60"], // Small line middle bottom right
  3: ["M0,80 L20,50"], // Diagonal up right
  4: ["M0,60 L20,80"], // Diagonal down right
  5: ["M0,80 L20,80", "M20,80 L0,60"], // Flag shape bottom
  6: ["M15,60 L15,80"], // Detached line bottom
  7: ["M0,80 L20,80", "M20,80 L20,60"], // Right then up
  8: ["M0,60 L20,60", "M20,80 L20,60"], // Two middle lines bottom
  9: ["M0,80 L20,80", "M20,80 L20,60", "M20,60 L0,60"], // Square bottom
}

// Thousands - bottom left (instead of both flips)
const THOUSAND_PATHS: Record<number, string[]> = {
  1: ["M0,80 L-20,80"], // Small line on bottom left
  2: ["M0,60 L-20,60"], // Small line middle bottom left
  3: ["M0,80 L-20,50"], // Diagonal up left
  4: ["M0,60 L-20,80"], // Diagonal down left
  5: ["M0,80 L-20,80", "M-20,80 L0,60"], // Flag shape bottom left
  6: ["M-15,60 L-15,80"], // Detached line bottom left
  7: ["M0,80 L-20,80", "M-20,80 L-20,60"], // Left then up
  8: ["M0,60 L-20,60", "M-20,80 L-20,60"], // Two middle lines bottom left
  9: ["M0,80 L-20,80", "M-20,80 L-20,60", "M-20,60 L0,60"], // Square bottom left
}

function createRunicSymbol(digit: number, placeValue: "unit" | "ten" | "hundred" | "thousand"): RunicSymbol {
  if (digit < 1 || digit > 9) {
    throw new Error(`Invalid digit: ${digit}. Must be between 1 and 9.`)
  }

  // Start with the base pole
  const paths: RunePath[] = [{ d: BASE_POLE }]

  let pathSet: Record<number, string[]>

  switch (placeValue) {
    case "unit":
      pathSet = UNIT_PATHS
      break
    case "ten":
      pathSet = TEN_PATHS
      break
    case "hundred":
      pathSet = HUNDRED_PATHS
      break
    case "thousand":
      pathSet = THOUSAND_PATHS
      break
  }

  pathSet[digit].forEach((path) => {
    paths.push({ d: path })
  })

  return {
    value: digit * (placeValue === "unit" ? 1 : placeValue === "ten" ? 10 : placeValue === "hundred" ? 100 : 1000),
    paths,
    placeValue,
  }
}

export function convertToRunic(number: number): {
  symbols: RunicSymbol[]
  combined: boolean
} {
  const safeNumber = Math.max(1, Math.min(9999, number))

  const thousands = Math.floor(safeNumber / 1000)
  const hundreds = Math.floor((safeNumber % 1000) / 100)
  const tens = Math.floor((safeNumber % 100) / 10)
  const units = safeNumber % 10

  const result: RunicSymbol[] = []

  if (thousands > 0) {
    result.push(createRunicSymbol(thousands, "thousand"))
  }
  if (hundreds > 0) {
    result.push(createRunicSymbol(hundreds, "hundred"))
  }
  if (tens > 0) {
    result.push(createRunicSymbol(tens, "ten"))
  }
  if (units > 0) {
    result.push(createRunicSymbol(units, "unit"))
  }

  return {
    symbols: result,
    combined: result.length > 1,
  }
}

export function getPlaceValueDescription(placeValue: "unit" | "ten" | "hundred" | "thousand"): string {
  switch (placeValue) {
    case "unit":
      return "unit (right side)"
    case "ten":
      return "ten (left side)"
    case "hundred":
      return "hundred (bottom right)"
    case "thousand":
      return "thousand (bottom left)"
  }
}
