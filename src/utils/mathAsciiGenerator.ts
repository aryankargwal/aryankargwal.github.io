/**
 * Mathematical ASCII Art Generator
 * Generates random ASCII patterns based on mathematical functions
 * Used for blog carousel cards in the backwater page
 */

interface AsciiArt {
  pattern: string;
  functionName: string;
  color: string;
}

// Mathematical function library
const MATH_FUNCTIONS = [
  {
    name: "Mandelbrot Set",
    category: "Fractal",
    description: "Classic fractal boundary visualization"
  },
  {
    name: "Julia Set",
    category: "Fractal",
    description: "Complex plane fractal mapping"
  },
  {
    name: "Sierpinski Triangle",
    category: "Fractal",
    description: "Self-similar recursive triangle"
  },
  {
    name: "Normal Distribution",
    category: "Probability",
    description: "Bell curve probability function"
  },
  {
    name: "Poisson Distribution",
    category: "Probability",
    description: "Discrete event probability"
  },
  {
    name: "Beta Distribution",
    category: "Probability",
    description: "Continuous bounded distribution"
  },
  {
    name: "Lorenz Attractor",
    category: "Chaos",
    description: "Deterministic chaos visualization"
  },
  {
    name: "Rössler Attractor",
    category: "Chaos",
    description: "Strange attractor in phase space"
  },
  {
    name: "Henon Map",
    category: "Chaos",
    description: "Discrete chaotic dynamical system"
  },
  {
    name: "Logistic Map",
    category: "Chaos",
    description: "Population dynamics bifurcation"
  },
  {
    name: "Sine Wave",
    category: "Wave",
    description: "Trigonometric oscillation"
  },
  {
    name: "Cosine Wave",
    category: "Wave",
    description: "Phase-shifted oscillation"
  },
  {
    name: "Perlin Noise",
    category: "Wave",
    description: "Smooth gradient noise function"
  },
  {
    name: "Fourier Series",
    category: "Wave",
    description: "Harmonic function decomposition"
  },
  {
    name: "Golden Spiral",
    category: "Geometry",
    description: "Fibonacci-based spiral pattern"
  },
  {
    name: "Voronoi Diagram",
    category: "Geometry",
    description: "Space partitioning tessellation"
  },
  {
    name: "Bezier Curve",
    category: "Geometry",
    description: "Smooth parametric curve"
  },
  {
    name: "Dragon Curve",
    category: "Fractal",
    description: "Space-filling recursive curve"
  },
  {
    name: "Koch Snowflake",
    category: "Fractal",
    description: "Infinite perimeter fractal"
  },
  {
    name: "Brownian Motion",
    category: "Probability",
    description: "Random walk stochastic process"
  }
];

// Color palette from the site
const COLORS = [
  "#00f3ff", // cyber-cyan
  "#ccff00", // acid-lime
  "#ff0055", // error-red
  "#f5f5f5", // off-white
  "#a078ff", // purple (complementary)
];

/**
 * Generate pseudo-random ASCII pattern based on mathematical function
 * Creates an 8x8 ASCII art visualization
 */
function generateAsciiPattern(seed: number): string {
  const chars = ["█", "▓", "▒", "░", "◆", "◇", "★", "☆", "◈", "◉", "○", "●"];
  const width = 8;
  const height = 8;
  let pattern = "";

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Use mathematical functions to determine character
      const value = Math.sin(x * 0.5 + seed) * Math.cos(y * 0.5 + seed) + Math.sin((x + y) * 0.3 + seed);
      const normalized = (value + 2) / 4; // normalize to 0-1
      const charIndex = Math.floor(normalized * chars.length) % chars.length;
      pattern += chars[charIndex] + " ";
    }
    pattern += "\n";
  }

  return pattern;
}

/**
 * Generate random ASCII art with mathematical function name
 * Called once per blog card, uses deterministic seed based on blog data
 */
export function generateMathAsciiArt(seed?: number): AsciiArt {
  // Use provided seed or generate random one
  const actualSeed = seed !== undefined ? seed : Math.random() * 1000;

  // Select random function
  const funcIndex = Math.floor((actualSeed % MATH_FUNCTIONS.length));
  const selectedFunc = MATH_FUNCTIONS[funcIndex];

  // Select random color
  const colorIndex = Math.floor((actualSeed * 7) % COLORS.length);
  const selectedColor = COLORS[colorIndex];

  // Generate ASCII pattern
  const pattern = generateAsciiPattern(actualSeed);

  return {
    pattern,
    functionName: selectedFunc.name,
    color: selectedColor
  };
}

/**
 * Deterministic ASCII art generation based on blog title
 * Ensures the same blog always gets the same ASCII art
 */
export function generateDeterministicAsciiArt(blogTitle: string): AsciiArt {
  // Create seed from blog title
  let seed = 0;
  for (let i = 0; i < blogTitle.length; i++) {
    seed += blogTitle.charCodeAt(i) * (i + 1);
  }

  return generateMathAsciiArt(seed);
}

/**
 * Get all available mathematical functions
 * Useful for documentation or listing
 */
export function getAllMathFunctions() {
  return MATH_FUNCTIONS;
}

/**
 * Get a specific function by name
 */
export function getMathFunctionByName(name: string) {
  return MATH_FUNCTIONS.find(f => f.name === name);
}
