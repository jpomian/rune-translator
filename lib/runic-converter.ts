interface RunePath {
  d: string;
  transform?: string;
}

interface RunicSymbol {
  value: number;
  paths: RunePath[];
  placeValue: "unit" | "ten" | "hundred" | "thousand";
}

// Base pole path (vertical line)
const BASE_POLE = "M10,10 L10,90";

// Symbol paths relative to the base pole
const SYMBOL_PATHS: Record<number, string[]> = {
  1: ["M10,10 L20,10"],  // Small line on top right
  2: ["M10,30 L20,30"],  // Small line middle right
  3: ["M10,10 L20,40"],  // Diagonal bottom right
  4: ["M10,30 L20,10"],  // Diagonal top right
  5: ["M10,10 L20,10", "M20,10 L10,30"],  // Flag shape
  6: ["M15,10 L20,10"],  // Detached line
  7: ["M10,10 L20,10", "M20,10 L20,30"],  // Right then down
  8: ["M10,30 L20,30", "M10,40 L20,40"],  // Two middle lines
  9: ["M10,10 L20,10", "M20,10 L20,30", "M20,30 L10,30"]  // Square
};

// Function to create a runic symbol for a specific digit and place value
function createRunicSymbol(digit: number, placeValue: "unit" | "ten" | "hundred" | "thousand"): RunicSymbol {
  if (digit < 1 || digit > 9) {
    throw new Error(`Invalid digit: ${digit}. Must be between 1 and 9.`);
  }

  // Start with the base pole
  const paths: RunePath[] = [{ d: BASE_POLE }];

  // Add the symbol paths with appropriate transformations
  SYMBOL_PATHS[digit].forEach(path => {
    const runePath: RunePath = { d: path };

    switch (placeValue) {
      case "ten":
        // Horizontal flip for tens
        runePath.transform = `scale(-1, 1) translate(-20, 0)`;
        break;
      case "hundred":
        // Vertical flip for hundreds
        runePath.transform = `scale(1, -1) translate(0, -100)`;
        break;
      case "thousand":
        // Both horizontal and vertical flip for thousands
        runePath.transform = `scale(-1, -1) translate(-20, -100)`;
        break;
      // No transformation for units
    }

    paths.push(runePath);
  });

  return {
    value: digit * (placeValue === "unit" ? 1 : 
                   placeValue === "ten" ? 10 : 
                   placeValue === "hundred" ? 100 : 1000),
    paths,
    placeValue,
  };
}

export function convertToRunic(number: number): {
  symbols: RunicSymbol[];
  combined: boolean;
} {
  const safeNumber = Math.max(1, Math.min(9999, number));
  
  const thousands = Math.floor(safeNumber / 1000);
  const hundreds = Math.floor((safeNumber % 1000) / 100);
  const tens = Math.floor((safeNumber % 100) / 10);
  const units = safeNumber % 10;

  const result: RunicSymbol[] = [];

  if (thousands > 0) {
    result.push(createRunicSymbol(thousands, "thousand"));
  }
  if (hundreds > 0) {
    result.push(createRunicSymbol(hundreds, "hundred"));
  }
  if (tens > 0) {
    result.push(createRunicSymbol(tens, "ten"));
  }
  if (units > 0) {
    result.push(createRunicSymbol(units, "unit"));
  }

  return {
    symbols: result,
    combined: result.length > 1,
  };
}

export function getPlaceValueDescription(placeValue: "unit" | "ten" | "hundred" | "thousand"): string {
  switch (placeValue) {
    case "unit": return "unit (original)";
    case "ten": return "ten (horizontally flipped)";
    case "hundred": return "hundred (vertically flipped)";
    case "thousand": return "thousand (horizontally and vertically flipped)";
  }
}