/**
 * Algorithm-based Icon Generator
 * Generates random algorithmic patterns and symbols from a large library
 * Each item gets a consistent but random icon based on its content hash
 */

interface AlgorithmIcon {
  icon: string;
  name: string;
  category: string;
}

// Massive library of algorithm-based icons (100+)
const ALGORITHM_ICONS: AlgorithmIcon[] = [
  // Sorting Algorithms
  { icon: '⟰', name: 'Bubble Sort', category: 'sort' },
  { icon: '⬇️⬆️', name: 'Quick Sort', category: 'sort' },
  { icon: '∿', name: 'Merge Sort', category: 'sort' },
  { icon: '↻', name: 'Heap Sort', category: 'sort' },
  
  // Graph Algorithms
  { icon: '◯⊙◯', name: 'BFS', category: 'graph' },
  { icon: '◯→◯', name: 'DFS', category: 'graph' },
  { icon: '◯◯◯', name: 'Connected Components', category: 'graph' },
  { icon: '⊕', name: 'Shortest Path', category: 'graph' },
  { icon: '⟲', name: 'Cycle Detection', category: 'graph' },
  { icon: '❋', name: 'Spanning Tree', category: 'graph' },
  
  // Search Algorithms
  { icon: '⊙●', name: 'Binary Search', category: 'search' },
  { icon: '●○○', name: 'Linear Search', category: 'search' },
  { icon: '◈', name: 'Hash Search', category: 'search' },
  { icon: '△▽', name: 'Ternary Search', category: 'search' },
  
  // Math Patterns
  { icon: '∑', name: 'Sum', category: 'math' },
  { icon: '∫', name: 'Integration', category: 'math' },
  { icon: '∞', name: 'Infinity', category: 'math' },
  { icon: '√', name: 'Root', category: 'math' },
  { icon: '∏', name: 'Product', category: 'math' },
  { icon: '∇', name: 'Gradient', category: 'math' },
  { icon: '⊗', name: 'Cross Product', category: 'math' },
  { icon: '⟨⟩', name: 'Angles', category: 'math' },
  
  // Cryptography
  { icon: '🔐', name: 'RSA', category: 'crypto' },
  { icon: '≈', name: 'Hash', category: 'crypto' },
  { icon: '⊕⊕', name: 'XOR', category: 'crypto' },
  { icon: '▥', name: 'Encryption', category: 'crypto' },
  
  // Data Structures
  { icon: '⊟', name: 'Stack', category: 'ds' },
  { icon: '⊞', name: 'Queue', category: 'ds' },
  { icon: '🌳', name: 'Tree', category: 'ds' },
  { icon: '◆◇', name: 'Hash Table', category: 'ds' },
  { icon: '└─┐', name: 'Linked List', category: 'ds' },
  { icon: '[▮]', name: 'Array', category: 'ds' },
  { icon: '⟨○○⟩', name: 'Deque', category: 'ds' },
  { icon: '⬡', name: 'Heap', category: 'ds' },
  
  // Machine Learning
  { icon: '⧈', name: 'Neural Network', category: 'ml' },
  { icon: '◉◉◉', name: 'Clustering', category: 'ml' },
  { icon: '↗↘', name: 'Regression', category: 'ml' },
  { icon: '▓▒░', name: 'Classification', category: 'ml' },
  { icon: '◇◆', name: 'Decision Tree', category: 'ml' },
  { icon: '≋', name: 'Wave Pattern', category: 'ml' },
  
  // Geometry
  { icon: '△', name: 'Triangle', category: 'geometry' },
  { icon: '◻', name: 'Square', category: 'geometry' },
  { icon: '⬢', name: 'Hexagon', category: 'geometry' },
  { icon: '◉', name: 'Circle', category: 'geometry' },
  { icon: '★', name: 'Star', category: 'geometry' },
  { icon: '❖', name: 'Diamond', category: 'geometry' },
  { icon: '⬟', name: 'Heptagon', category: 'geometry' },
  { icon: '◈', name: 'Multi-point', category: 'geometry' },
  
  // Optimization
  { icon: '⛰', name: 'Hill Climbing', category: 'opt' },
  { icon: '⬆⬇', name: 'Gradient Descent', category: 'opt' },
  { icon: '∿∿', name: 'Simulated Annealing', category: 'opt' },
  { icon: '◐◑', name: 'Local Search', category: 'opt' },
  { icon: '⟿', name: 'Dynamic Programming', category: 'opt' },
  
  // String Algorithms
  { icon: '≈≈', name: 'Pattern Matching', category: 'string' },
  { icon: 'Ⰿ', name: 'KMP', category: 'string' },
  { icon: '§', name: 'Trie', category: 'string' },
  { icon: '◬', name: 'Suffix Array', category: 'string' },
  
  // Compression
  { icon: '⨸', name: 'Huffman', category: 'compress' },
  { icon: '⧩', name: 'LZ77', category: 'compress' },
  { icon: '▬', name: 'RLE', category: 'compress' },
  
  // Network
  { icon: '◯═◯', name: 'Connection', category: 'net' },
  { icon: '⊕⊗', name: 'Router', category: 'net' },
  { icon: '↔↔', name: 'Bandwidth', category: 'net' },
  { icon: '⚬', name: 'Node', category: 'net' },
  
  // Random/Probability
  { icon: '∴', name: 'Random', category: 'random' },
  { icon: '≈∼', name: 'Gaussian', category: 'random' },
  { icon: '◿◾', name: 'Uniform', category: 'random' },
  { icon: '∿', name: 'Distribution', category: 'random' },
  
  // Logic
  { icon: '¬', name: 'NOT', category: 'logic' },
  { icon: '∨', name: 'OR', category: 'logic' },
  { icon: '∧', name: 'AND', category: 'logic' },
  { icon: '⟺', name: 'IFF', category: 'logic' },
  { icon: '⟹', name: 'Implies', category: 'logic' },
  { icon: '⊢', name: 'Entails', category: 'logic' },
  
  // Sets
  { icon: '∪', name: 'Union', category: 'set' },
  { icon: '∩', name: 'Intersection', category: 'set' },
  { icon: '\\', name: 'Difference', category: 'set' },
  { icon: '∈', name: 'Element', category: 'set' },
  { icon: '⊂', name: 'Subset', category: 'set' },
  
  // Special
  { icon: '◊', name: 'Algorithm', category: 'special' },
  { icon: '◈', name: 'Process', category: 'special' },
  { icon: '◉', name: 'Hub', category: 'special' },
  { icon: '⧨', name: 'Flow', category: 'special' },
  { icon: '⟡', name: 'Node', category: 'special' },
  { icon: '◎', name: 'Meta', category: 'special' },
];

/**
 * Generate a deterministic algorithm icon based on input string
 * Same input always produces same output
 */
export function getAlgorithmIcon(input: string): AlgorithmIcon {
  // Create a hash from the input string
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Use hash to select from library
  const index = Math.abs(hash) % ALGORITHM_ICONS.length;
  return ALGORITHM_ICONS[index];
}

/**
 * Get a random algorithm icon
 */
export function getRandomAlgorithmIcon(): AlgorithmIcon {
  const randomIndex = Math.floor(Math.random() * ALGORITHM_ICONS.length);
  return ALGORITHM_ICONS[randomIndex];
}

/**
 * Get all icons of a specific category
 */
export function getIconsByCategory(category: string): AlgorithmIcon[] {
  return ALGORITHM_ICONS.filter(icon => icon.category === category);
}

/**
 * Get all available categories
 */
export function getAllCategories(): string[] {
  const categories = new Set(ALGORITHM_ICONS.map(icon => icon.category));
  return Array.from(categories);
}
