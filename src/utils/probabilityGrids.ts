/**
 * Pure JavaScript ASCII Grid Generator
 * Generates 32-bit probability/statistics visualizations
 * No external dependencies - runs anywhere including GitHub Actions
 */

// Grid size: 32 characters wide, 8 rows tall
const GRID_WIDTH = 32;
const GRID_HEIGHT = 8;

// ASCII characters for different intensities (dark to light)
const ASCII_CHARS = " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

// 10 distinct colors for grid rotation
const GRID_COLORS = [
  '#00f3ff', // cyan
  '#ccff00', // lime
  '#ff0055', // hot pink
  '#ff6b35', // orange
  '#9b5de5', // purple
  '#00f5d4', // turquoise
  '#fee440', // yellow
  '#f15bb5', // magenta
  '#00bbf9', // blue
  '#06ffa5', // mint green
];

/**
 * Create deterministic hash from string
 */
function hashString(text: string): number {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Seeded random number generator
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }

  gaussian(): number {
    // Box-Muller transform
    const u1 = this.next();
    const u2 = this.next();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }
}

/**
 * Normalize grid values to 0-1 range
 */
function normalizeGrid(grid: number[][]): number[][] {
  const flat = grid.flat();
  const min = Math.min(...flat);
  const max = Math.max(...flat);
  
  if (max - min === 0) {
    return grid.map(row => row.map(() => 0));
  }
  
  return grid.map(row => row.map(val => (val - min) / (max - min)));
}

/**
 * Convert normalized grid to ASCII art
 */
function gridToAscii(grid: number[][]): string {
  const normalized = normalizeGrid(grid);
  return normalized.map(row => 
    row.map(val => {
      const idx = Math.min(
        Math.floor(val * (ASCII_CHARS.length - 1)),
        ASCII_CHARS.length - 1
      );
      return ASCII_CHARS[idx];
    }).join('')
  ).join('\n');
}

// ===== PROBABILITY DISTRIBUTION PATTERNS =====

/**
 * Normal/Gaussian Distribution (Bell Curve)
 */
function patternGaussianDistribution(seed: number): number[][] {
  const rng = new SeededRandom(seed);
  const grid = [];
  
  for (let y = 0; y < GRID_HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
      const xNorm = (x - GRID_WIDTH / 2) / (GRID_WIDTH / 6);
      const yNorm = (y - GRID_HEIGHT / 2) / (GRID_HEIGHT / 6);
      
      // 2D Gaussian
      const gauss = Math.exp(-(xNorm * xNorm + yNorm * yNorm) / 2);
      const noise = rng.gaussian() * 0.1;
      
      row.push(gauss + noise);
    }
    grid.push(row);
  }
  
  return grid;
}

/**
 * Binomial Distribution
 */
function patternBinomialDistribution(seed: number): number[][] {
  const rng = new SeededRandom(seed);
  const grid = [];
  const n = 20; // number of trials
  const p = 0.5; // probability
  
  for (let y = 0; y < GRID_HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
      const k = Math.floor((x / GRID_WIDTH) * n);
      
      // Binomial probability mass function approximation
      let prob = 1;
      for (let i = 0; i < k; i++) {
        prob *= ((n - i) / (i + 1)) * (p / (1 - p));
      }
      prob *= Math.pow(1 - p, n);
      
      const yFactor = Math.exp(-((y - GRID_HEIGHT/2) ** 2) / 8);
      
      row.push(prob * yFactor * 10 + rng.next() * 0.1);
    }
    grid.push(row);
  }
  
  return grid;
}

/**
 * Poisson Distribution
 */
function patternPoissonDistribution(seed: number): number[][] {
  const rng = new SeededRandom(seed);
  const grid = [];
  const lambda = 5 + (seed % 5); // rate parameter
  
  for (let y = 0; y < GRID_HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
      const k = Math.floor((x / GRID_WIDTH) * 15);
      
      // Poisson PMF
      let prob = Math.exp(-lambda) * Math.pow(lambda, k);
      for (let i = 1; i <= k; i++) {
        prob /= i;
      }
      
      const yWave = Math.sin((y / GRID_HEIGHT) * Math.PI);
      
      row.push(prob * 20 * yWave + rng.next() * 0.05);
    }
    grid.push(row);
  }
  
  return grid;
}

/**
 * Exponential Distribution
 */
function patternExponentialDistribution(seed: number): number[][] {
  const rng = new SeededRandom(seed);
  const grid = [];
  const lambda = 1.5;
  
  for (let y = 0; y < GRID_HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
      const xVal = (x / GRID_WIDTH) * 5;
      const expVal = lambda * Math.exp(-lambda * xVal);
      
      const yModulation = 1 - Math.abs(y - GRID_HEIGHT/2) / (GRID_HEIGHT/2);
      
      row.push(expVal * yModulation + rng.next() * 0.1);
    }
    grid.push(row);
  }
  
  return grid;
}

/**
 * Beta Distribution
 */
function patternBetaDistribution(seed: number): number[][] {
  const rng = new SeededRandom(seed);
  const grid = [];
  const alpha = 2 + (seed % 5);
  const beta = 2 + ((seed >> 4) % 5);
  
  for (let y = 0; y < GRID_HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
      const p = x / GRID_WIDTH;
      
      // Beta distribution approximation
      const betaVal = Math.pow(p, alpha - 1) * Math.pow(1 - p, beta - 1);
      
      const yWave = Math.cos((y / GRID_HEIGHT) * Math.PI * 2);
      
      row.push(betaVal * (1 + yWave * 0.3) + rng.next() * 0.05);
    }
    grid.push(row);
  }
  
  return grid;
}

/**
 * Random Walk / Brownian Motion
 */
function patternRandomWalk(seed: number): number[][] {
  const rng = new SeededRandom(seed);
  const grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(0));
  
  // Multiple random walks
  const numWalks = 5;
  for (let w = 0; w < numWalks; w++) {
    let y = Math.floor(GRID_HEIGHT / 2);
    
    for (let x = 0; x < GRID_WIDTH; x++) {
      if (y >= 0 && y < GRID_HEIGHT) {
        grid[y][x] += 1;
      }
      
      // Random step up or down
      const step = rng.next() < 0.5 ? -1 : 1;
      y = Math.max(0, Math.min(GRID_HEIGHT - 1, y + step));
    }
  }
  
  return grid;
}

/**
 * Markov Chain State Transition
 */
function patternMarkovChain(seed: number): number[][] {
  const rng = new SeededRandom(seed);
  const grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(0));
  
  // States 0 to GRID_HEIGHT-1
  let state = Math.floor(GRID_HEIGHT / 2);
  
  for (let x = 0; x < GRID_WIDTH; x++) {
    grid[state][x] = 1;
    
    // Transition probabilities
    const rand = rng.next();
    if (rand < 0.3 && state > 0) {
      state--;
    } else if (rand < 0.6 && state < GRID_HEIGHT - 1) {
      state++;
    }
    // else stay in same state
  }
  
  // Blur the path
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      if (grid[y][x] > 0) {
        if (y > 0) grid[y-1][x] += 0.5;
        if (y < GRID_HEIGHT - 1) grid[y+1][x] += 0.5;
      }
    }
  }
  
  return grid;
}

/**
 * Central Limit Theorem Visualization
 */
function patternCentralLimitTheorem(seed: number): number[][] {
  const rng = new SeededRandom(seed);
  const grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(0));
  
  const samples = 200;
  const sumDistribution = [];
  
  // Sum of uniform random variables
  for (let i = 0; i < samples; i++) {
    let sum = 0;
    for (let j = 0; j < 12; j++) {
      sum += rng.next();
    }
    sumDistribution.push(sum);
  }
  
  // Histogram
  for (const val of sumDistribution) {
    const binX = Math.floor((val / 12) * GRID_WIDTH);
    const binY = Math.floor(rng.next() * GRID_HEIGHT);
    
    if (binX >= 0 && binX < GRID_WIDTH && binY >= 0 && binY < GRID_HEIGHT) {
      grid[binY][binX] += 1;
    }
  }
  
  return grid;
}

/**
 * Correlation Heatmap
 */
function patternCorrelationMatrix(seed: number): number[][] {
  const rng = new SeededRandom(seed);
  const grid = [];
  
  for (let y = 0; y < GRID_HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
      // Correlation coefficient visualization
      const dist = Math.abs(x - y * (GRID_WIDTH / GRID_HEIGHT));
      const correlation = Math.exp(-dist / 10);
      
      row.push(correlation + rng.next() * 0.1);
    }
    grid.push(row);
  }
  
  return grid;
}

/**
 * Wave Interference Pattern
 */
function patternWaveInterference(seed: number): number[][] {
  const grid = [];
  const freq1 = 1 + (seed % 3);
  const freq2 = 2 + ((seed >> 4) % 3);
  
  for (let y = 0; y < GRID_HEIGHT; y++) {
    const row = [];
    for (let x = 0; x < GRID_WIDTH; x++) {
      const xNorm = (x / GRID_WIDTH) * 2 * Math.PI * freq1;
      const yNorm = (y / GRID_HEIGHT) * 2 * Math.PI * freq2;
      
      const wave = Math.sin(xNorm) * Math.cos(yNorm) + 
                   Math.cos(xNorm * 0.7) * Math.sin(yNorm * 1.3);
      
      row.push(wave);
    }
    grid.push(row);
  }
  
  return grid;
}

// Pattern library
const PATTERNS = [
  { fn: patternGaussianDistribution, name: 'GAUSSIAN DISTRIBUTION' },
  { fn: patternBinomialDistribution, name: 'BINOMIAL DISTRIBUTION' },
  { fn: patternPoissonDistribution, name: 'POISSON DISTRIBUTION' },
  { fn: patternExponentialDistribution, name: 'EXPONENTIAL DECAY' },
  { fn: patternBetaDistribution, name: 'BETA DISTRIBUTION' },
  { fn: patternRandomWalk, name: 'BROWNIAN MOTION' },
  { fn: patternMarkovChain, name: 'MARKOV CHAIN' },
  { fn: patternCentralLimitTheorem, name: 'CENTRAL LIMIT THEOREM' },
  { fn: patternCorrelationMatrix, name: 'CORRELATION MATRIX' },
  { fn: patternWaveInterference, name: 'WAVE INTERFERENCE' },
];

/**
 * Get next color from rotation (avoiding last 10 used colors)
 */
function getNextColor(usedColors: string[]): { color: string, updated: string[] } {
  // Find colors not in the last 10 used
  const availableColors = GRID_COLORS.filter(c => !usedColors.slice(-10).includes(c));
  
  // If all colors are in recent history, start fresh with first color
  const color = availableColors.length > 0 ? availableColors[0] : GRID_COLORS[0];
  
  // Update history: add new color and keep last 10
  const updated = [...usedColors, color].slice(-10);
  
  return { color, updated };
}

/**
 * Generate deterministic pattern for a given title
 * @param title - Blog post title to generate pattern from
 * @param usedColors - Array of recently used colors (optional)
 * @returns Object with ascii art, pattern name, seed, color, and updated color history
 */
export function generateProbabilityGrid(
  title: string, 
  usedColors: string[] = []
): { ascii: string; name: string; seed: number; color: string; usedColors: string[] } {
  const seed = hashString(title);
  const pattern = PATTERNS[seed % PATTERNS.length];
  
  const grid = pattern.fn(seed);
  const ascii = gridToAscii(grid);
  
  const { color, updated } = getNextColor(usedColors);
  
  return {
    ascii,
    name: pattern.name,
    seed,
    color,
    usedColors: updated
  };
}

/**
 * Get all available patterns
 */
export function getAllPatterns() {
  return PATTERNS.map(p => p.name);
}

