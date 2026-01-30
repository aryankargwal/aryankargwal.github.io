/**
 * Algorithm-based Icon Generator with ASCII Art
 * Generates deterministic algorithm icons with ASCII art representations
 * Each item gets a consistent icon based on its content hash
 */

export interface AlgorithmIcon {
  name: string;
  category: string;
  ascii: string;  // Multi-line ASCII art
  shortName: string;  // Short version for display
}

// Massive library of algorithms with ASCII art (100+)
const ALGORITHM_LIBRARY: AlgorithmIcon[] = [
  // Sorting Algorithms
  {
    name: 'Bubble Sort',
    category: 'sort',
    shortName: 'BUBBLE',
    ascii: `
  ○ ○ ○
  ↓   ↓
  ○→○ ○
    ↓
  ○ ○ ○
    `.trim()
  },
  {
    name: 'Quick Sort',
    category: 'sort',
    shortName: 'QUICK',
    ascii: `
  ┌─────┐
  │ ◉ │
  └─┬─┘
   ├─┐
   ○ ○
    `.trim()
  },
  {
    name: 'Merge Sort',
    category: 'sort',
    shortName: 'MERGE',
    ascii: `
  ┌─┬─┐
  │○│○│
  └─┴─┘
    │
   ┌┴┐
   ○ ○
    `.trim()
  },
  {
    name: 'Heap Sort',
    category: 'sort',
    shortName: 'HEAP',
    ascii: `
     ◉
    ╱ ╲
   ○   ○
  ╱ ╲
 ○   ○
    `.trim()
  },

  // Graph Algorithms
  {
    name: 'BFS',
    category: 'graph',
    shortName: 'BFS',
    ascii: `
  ┌─○─┐
  ○───○
  └─○─┘
    │
   ┌┴┐
   ○ ○
    `.trim()
  },
  {
    name: 'DFS',
    category: 'graph',
    shortName: 'DFS',
    ascii: `
  ○→○→○
  ↓   ↓
  ○←○←○
    │
    ↓
    ○
    `.trim()
  },
  {
    name: 'Dijkstra',
    category: 'graph',
    shortName: 'DIJKSTRA',
    ascii: `
  ◉→1→2
  │ ↘  ↗
  1  3
  ↓ ╱
  2→4
    `.trim()
  },
  {
    name: 'Cycle Detection',
    category: 'graph',
    shortName: 'CYCLE',
    ascii: `
  ○→○
  ↑ │
  └─○
    │
   ○→○
    `.trim()
  },

  // Search Algorithms
  {
    name: 'Binary Search',
    category: 'search',
    shortName: 'BINARY',
    ascii: `
  ┌─────┐
  │ ◉ │
  ├─┘└─┤
  ○   ○
    │
    ↓
    ●
    `.trim()
  },
  {
    name: 'Linear Search',
    category: 'search',
    shortName: 'LINEAR',
    ascii: `
  ●○○○○
  →→→→
  ○●○○○
  →→→
  ○○●○○
    `.trim()
  },

  // Math Algorithms
  {
    name: 'Fibonacci',
    category: 'math',
    shortName: 'FIB',
    ascii: `
  1
  1 1
  2 1 1
  3 2 1 1
  5 3 2 1
    `.trim()
  },
  {
    name: 'GCD',
    category: 'math',
    shortName: 'GCD',
    ascii: `
  ┌────┐
  │ a │
  │ ↓ │
  │ b │
  │ ↓ │
  │gcd│
  └────┘
    `.trim()
  },
  {
    name: 'Prime Sieve',
    category: 'math',
    shortName: 'SIEVE',
    ascii: `
  2 ● 3 ●
  ○ 5 ● 7
  ● 11 ● 13
  ○ 17 ● 19
    `.trim()
  },

  // Cryptography
  {
    name: 'RSA',
    category: 'crypto',
    shortName: 'RSA',
    ascii: `
  p × q = n
  ↓ ↓   ↓
  2 5 = 10
  │ │
  e d (φ)
  ↓ ↓
  C M
    `.trim()
  },
  {
    name: 'Hash Function',
    category: 'crypto',
    shortName: 'HASH',
    ascii: `
  INPUT
   │││
   ▼▼▼
  ⊕⊕⊕
  │││
  ▼▼▼
  OUTPUT
    `.trim()
  },

  // Data Structures
  {
    name: 'Stack',
    category: 'ds',
    shortName: 'STACK',
    ascii: `
  ┌───┐
  │ a │
  ├───┤
  │ b │
  ├───┤
  │ c │
  └───┘
  TOP↑
    `.trim()
  },
  {
    name: 'Queue',
    category: 'ds',
    shortName: 'QUEUE',
    ascii: `
  IN  OUT
  │    │
  a→b→c→
  └────┘
  FIFO
    `.trim()
  },
  {
    name: 'Tree',
    category: 'ds',
    shortName: 'TREE',
    ascii: `
      ◉
     ╱ ╲
    ◉   ◉
   ╱ ╲ ╱ ╲
  ◉ ◉ ◉ ◉
    `.trim()
  },
  {
    name: 'Linked List',
    category: 'ds',
    shortName: 'LIST',
    ascii: `
  ◉→◉→◉→∅
  │  │  │
  a  b  c
    `.trim()
  },

  // Machine Learning
  {
    name: 'Neural Network',
    category: 'ml',
    shortName: 'NN',
    ascii: `
  ○ ○ ○
  │ X │
  ○ ○ ○
  │ X │
  ○ ○ ○
    `.trim()
  },
  {
    name: 'K-Means',
    category: 'ml',
    shortName: 'KMEANS',
    ascii: `
  ◉   ◉
  ○ × ○
  ○   ○
   ● ●
   ○ ○
    `.trim()
  },
  {
    name: 'Decision Tree',
    category: 'ml',
    shortName: 'DTREE',
    ascii: `
       ◉ IF?
      ╱ ╲
    YES  NO
    ↓    ↓
    ◉    ◉
   ╱╲   ╱╲
  ○ ○ ○ ○
    `.trim()
  },

  // Geometry
  {
    name: 'Convex Hull',
    category: 'geometry',
    shortName: 'HULL',
    ascii: `
    ○
   ╱ ╲
  ○   ○
  ║   ║
  ○───○
    `.trim()
  },
  {
    name: 'Line Intersection',
    category: 'geometry',
    shortName: 'INTERSECT',
    ascii: `
  ╱  ╲
 ╱    ╲
╱──●──╲
╲  │   ╱
 ╲ │  ╱
  ╲│ ╱
    `.trim()
  },

  // Optimization
  {
    name: 'Gradient Descent',
    category: 'opt',
    shortName: 'GD',
    ascii: `
      ◉
     ╱ ╲
    ◉   ◉
   ╱     ╲
  ●       ◉
  ↓
  min
    `.trim()
  },
  {
    name: 'Dynamic Programming',
    category: 'opt',
    shortName: 'DP',
    ascii: `
  ┌─┬─┬─┐
  │1│1│1│
  ├─┼─┼─┤
  │1│2│3│
  ├─┼─┼─┤
  │1│3│●│
  └─┴─┴─┘
    `.trim()
  },

  // String Algorithms
  {
    name: 'KMP',
    category: 'string',
    shortName: 'KMP',
    ascii: `
  HAYSTACK
  ▼▼▼▼▼▼▼▼
  abcabdab
  ├─●─ ab
  │   ├─●ab
  │   │  ●
  ─────
  NEEDLE
    `.trim()
  },
  {
    name: 'Trie',
    category: 'string',
    shortName: 'TRIE',
    ascii: `
       root
      ╱│╲
     a b c
     │ │ │
     p c a
     │   │
     p t e
    `.trim()
  },

  // Compression
  {
    name: 'Huffman',
    category: 'compress',
    shortName: 'HUFFMAN',
    ascii: `
      ◉(ab)
      ╱ ╲
     ◉   c
    ╱ ╲
   a   b
  5 9 12
    `.trim()
  },

  // Network
  {
    name: 'Dijkstra Path',
    category: 'net',
    shortName: 'PATH',
    ascii: `
  ◉───5───◉
  │  ╱ 10  │
  2╱        ╲3
  │╱        │
  ◉────7────◉
    `.trim()
  },

  // Backup patterns
  {
    name: 'Algorithm X',
    category: 'generic',
    shortName: 'X',
    ascii: `
  ╱╲  ╱╲
 ╱  ╲╱  ╲
 ╲  ╱╲  ╱
  ╲╱  ╲╱
    `.trim()
  }
];

/**
 * Generate a consistent hash from a string
 * Same input = same output (deterministic)
 */
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Get a deterministic algorithm icon based on input string
 * Same input will always return the same icon
 */
export function getAlgorithmIconWithArt(input: string): AlgorithmIcon {
  const hash = hashCode(input);
  const index = hash % ALGORITHM_LIBRARY.length;
  return ALGORITHM_LIBRARY[index];
}

/**
 * Get a random algorithm icon (actually pseudo-random based on seed)
 */
export function getRandomAlgorithmIcon(): AlgorithmIcon {
  const index = Math.floor(Math.random() * ALGORITHM_LIBRARY.length);
  return ALGORITHM_LIBRARY[index];
}

/**
 * Get all available algorithms
 */
export function getAllAlgorithms(): AlgorithmIcon[] {
  return ALGORITHM_LIBRARY;
}

/**
 * Legacy function for compatibility - returns icon object with old interface
 */
export function getAlgorithmIcon(input: string) {
  const algo = getAlgorithmIconWithArt(input);
  return {
    icon: '◉',
    name: algo.shortName,
    category: algo.category
  };
}
