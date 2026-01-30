---
title: "Multi-Robot SLAM with Distributed Consensus"
date: 2023-11-20
description: "Decentralized SLAM framework for heterogeneous robot teams. Implements consensus-based map merging with formal verification of convergence guarantees."
tags: ["Robotics", "SLAM", "Distributed Systems", "ROS2"]
status: "Research Prototype"
repoUrl: "https://github.com/aryankargwal/multi-robot-slam"
paperUrl: "https://arxiv.org/abs/placeholder"
featured: true
---

## Abstract

This work presents a novel approach to multi-robot SLAM that eliminates the need for centralized coordination. Each robot maintains a local map and exchanges updates with neighbors using a gossip-based protocol.

## Innovation

- **Byzantine Fault Tolerance**: System remains operational even with malicious agents
- **Formal Verification**: Convergence proofs using Lyapunov stability analysis
- **Real-time Performance**: Sub-10ms consensus updates on embedded hardware

## Experimental Results

Tested with teams of 4-8 Turtlebot3 robots in GPS-denied environments. Achieved 15% improvement in map accuracy compared to centralized approaches.

## Publications

Paper under review at ICRA 2025.
