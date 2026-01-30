#!/usr/bin/env python3
"""
Scipy-based 32-bit ASCII Grid Generator
Generates clever mathematical/scientific patterns using scipy
"""

import numpy as np
from scipy import signal, ndimage, fft
from scipy.special import jn, yn
import json
import hashlib

# Grid size: 32 characters wide, 8 rows tall
GRID_WIDTH = 32
GRID_HEIGHT = 8

# ASCII characters for different intensities (dark to light)
ASCII_CHARS = " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"

def hash_string(text):
    """Create deterministic hash from string"""
    return int(hashlib.md5(text.encode()).hexdigest(), 16)

def normalize_grid(grid):
    """Normalize grid values to 0-1 range"""
    min_val = np.min(grid)
    max_val = np.max(grid)
    if max_val - min_val == 0:
        return np.zeros_like(grid)
    return (grid - min_val) / (max_val - min_val)

def grid_to_ascii(grid):
    """Convert normalized grid to ASCII art"""
    grid_norm = normalize_grid(grid)
    ascii_grid = []
    for row in grid_norm:
        ascii_row = ''.join([ASCII_CHARS[min(int(val * (len(ASCII_CHARS) - 1)), len(ASCII_CHARS) - 1)] for val in row])
        ascii_grid.append(ascii_row)
    return '\n'.join(ascii_grid)

# Pattern generators using scipy

def pattern_wave_interference(seed):
    """Wave interference pattern using scipy signals"""
    np.random.seed(seed % (2**32))
    x = np.linspace(0, 4*np.pi, GRID_WIDTH)
    y = np.linspace(0, 2*np.pi, GRID_HEIGHT)
    X, Y = np.meshgrid(x, y)
    
    freq1 = 2 + (seed % 3)
    freq2 = 3 + ((seed >> 4) % 3)
    
    wave1 = np.sin(freq1 * X) * np.cos(freq2 * Y)
    wave2 = np.cos(freq1 * Y) * np.sin(freq2 * X)
    
    return wave1 + wave2

def pattern_bessel_function(seed):
    """Bessel function pattern"""
    np.random.seed(seed % (2**32))
    x = np.linspace(0, 10, GRID_WIDTH)
    y = np.linspace(0, 10, GRID_HEIGHT)
    X, Y = np.meshgrid(x, y)
    R = np.sqrt(X**2 + Y**2)
    
    order = (seed % 5)
    return jn(order, R)

def pattern_gabor_filter(seed):
    """Gabor filter pattern from scipy"""
    np.random.seed(seed % (2**32))
    frequency = 0.1 + (seed % 10) * 0.05
    theta = (seed % 8) * np.pi / 8
    
    kernel = np.zeros((GRID_HEIGHT, GRID_WIDTH))
    sigma = 3.0
    
    for i in range(GRID_HEIGHT):
        for j in range(GRID_WIDTH):
            y = i - GRID_HEIGHT/2
            x = j - GRID_WIDTH/2
            
            x_theta = x * np.cos(theta) + y * np.sin(theta)
            y_theta = -x * np.sin(theta) + y * np.cos(theta)
            
            gaussian = np.exp(-(x_theta**2 + y_theta**2) / (2 * sigma**2))
            sinusoid = np.cos(2 * np.pi * frequency * x_theta)
            
            kernel[i, j] = gaussian * sinusoid
    
    return kernel

def pattern_fft_noise(seed):
    """FFT-based noise pattern"""
    np.random.seed(seed % (2**32))
    noise = np.random.randn(GRID_HEIGHT, GRID_WIDTH)
    fft_noise = fft.fft2(noise)
    
    # Apply frequency filter
    freq_filter = np.zeros_like(fft_noise)
    center_y, center_x = GRID_HEIGHT // 2, GRID_WIDTH // 2
    radius = 3 + (seed % 5)
    
    for i in range(GRID_HEIGHT):
        for j in range(GRID_WIDTH):
            dist = np.sqrt((i - center_y)**2 + (j - center_x)**2)
            if dist < radius:
                freq_filter[i, j] = 1
    
    filtered = fft_noise * freq_filter
    result = fft.ifft2(filtered).real
    
    return result

def pattern_convolution(seed):
    """Convolution pattern using scipy signal"""
    np.random.seed(seed % (2**32))
    
    # Create base pattern
    base = np.random.randn(GRID_HEIGHT, GRID_WIDTH)
    
    # Create kernel
    kernel_size = 3
    kernel = signal.windows.gaussian(kernel_size, std=(seed % 5) + 1)
    kernel = np.outer(kernel, kernel)
    kernel = kernel / kernel.sum()
    
    # Convolve
    result = signal.convolve2d(base, kernel, mode='same', boundary='wrap')
    
    return result

def pattern_gradient_field(seed):
    """Gradient field pattern using scipy ndimage"""
    np.random.seed(seed % (2**32))
    
    # Create base field
    x = np.linspace(0, 2*np.pi, GRID_WIDTH)
    y = np.linspace(0, 2*np.pi, GRID_HEIGHT)
    X, Y = np.meshgrid(x, y)
    
    field = np.sin(X) * np.cos(Y) + np.random.randn(GRID_HEIGHT, GRID_WIDTH) * 0.1
    
    # Compute gradient
    gy, gx = np.gradient(field)
    magnitude = np.sqrt(gx**2 + gy**2)
    
    return magnitude

def pattern_sobel_edge(seed):
    """Edge detection pattern using Sobel filter"""
    np.random.seed(seed % (2**32))
    
    # Create structured noise
    noise = np.random.randn(GRID_HEIGHT, GRID_WIDTH)
    smoothed = ndimage.gaussian_filter(noise, sigma=1.5)
    
    # Apply Sobel edge detection
    sx = ndimage.sobel(smoothed, axis=0)
    sy = ndimage.sobel(smoothed, axis=1)
    edges = np.hypot(sx, sy)
    
    return edges

def pattern_cellular_automata(seed):
    """Simple cellular automata pattern"""
    np.random.seed(seed % (2**32))
    
    # Initialize random grid
    grid = np.random.choice([0, 1], size=(GRID_HEIGHT, GRID_WIDTH), p=[0.6, 0.4])
    
    # Run a few iterations
    iterations = 3
    for _ in range(iterations):
        new_grid = grid.copy()
        for i in range(1, GRID_HEIGHT-1):
            for j in range(1, GRID_WIDTH-1):
                neighbors = grid[i-1:i+2, j-1:j+2].sum() - grid[i, j]
                if grid[i, j] == 1:
                    new_grid[i, j] = 1 if neighbors in [2, 3] else 0
                else:
                    new_grid[i, j] = 1 if neighbors == 3 else 0
        grid = new_grid
    
    return grid.astype(float)

def pattern_perlin_noise_approx(seed):
    """Approximation of Perlin noise using scipy"""
    np.random.seed(seed % (2**32))
    
    # Generate multiple octaves
    result = np.zeros((GRID_HEIGHT, GRID_WIDTH))
    
    for octave in range(3):
        freq = 2 ** octave
        amplitude = 1.0 / (freq * 2)
        
        noise = np.random.randn(GRID_HEIGHT, GRID_WIDTH)
        smoothed = ndimage.gaussian_filter(noise, sigma=2/freq)
        
        result += smoothed * amplitude
    
    return result

# Pattern library
PATTERNS = [
    pattern_wave_interference,
    pattern_bessel_function,
    pattern_gabor_filter,
    pattern_fft_noise,
    pattern_convolution,
    pattern_gradient_field,
    pattern_sobel_edge,
    pattern_cellular_automata,
    pattern_perlin_noise_approx,
]

def generate_pattern(title):
    """Generate deterministic pattern for a given title"""
    seed = hash_string(title)
    pattern_func = PATTERNS[seed % len(PATTERNS)]
    
    grid = pattern_func(seed)
    ascii_art = grid_to_ascii(grid)
    
    pattern_name = pattern_func.__name__.replace('pattern_', '').replace('_', ' ').upper()
    
    return {
        'ascii': ascii_art,
        'name': pattern_name,
        'seed': seed
    }

def main():
    """Generate patterns for test titles"""
    test_titles = [
        "Understanding Distributed Systems",
        "Building Scalable APIs",
        "Machine Learning Fundamentals",
        "Graph Neural Networks",
        "Quantum Computing Basics"
    ]
    
    results = {}
    for title in test_titles:
        pattern = generate_pattern(title)
        results[title] = pattern
        print(f"\n{title}:")
        print(f"Pattern: {pattern['name']}")
        print(pattern['ascii'])
        print("-" * GRID_WIDTH)
    
    # Save to JSON
    with open('ascii_patterns.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\nGenerated patterns saved to ascii_patterns.json")

if __name__ == '__main__':
    main()
