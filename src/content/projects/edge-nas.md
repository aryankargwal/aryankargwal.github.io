---
title: "Neural Architecture Search for Edge Devices"
date: 2023-06-10
description: "Automated NAS framework optimizing for both accuracy and inference latency on resource-constrained edge hardware. Achieved 3x speedup with minimal accuracy loss."
tags: ["Machine Learning", "NAS", "Edge Computing", "PyTorch"]
status: "Archived"
repoUrl: "https://github.com/aryankargwal/edge-nas"
featured: false
---

## Context

Early research into automated model compression for deployment on embedded devices. Later superseded by more efficient pruning-based approaches.

## Methodology

- Evolutionary search over architecture space
- Multi-objective optimization (accuracy vs. latency)
- Hardware-aware cost modeling

## Archived Reason

While technically successful, the approach was too computationally expensive for practical deployment. Modern pruning techniques achieve similar results with 10x less search time.
