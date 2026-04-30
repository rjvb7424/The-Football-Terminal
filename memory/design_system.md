---
name: Design System
description: Colors, spacing standards, and component patterns for the Football Terminal UI
type: project
---

## Color palette (src/colors.ts)
- bg: #080b0f (near-black page background)
- surface: #0d1117 (panel/sidebar background)
- card: #161b22 (card header, inner panels)
- accent: #00b4d8 (cold cyan — primary brand color)
- positive: #3fb950 (green — gains, wins)
- negative: #f85149 (red — losses, drops)
- amber: #d29922 (uncertainty, transfer noise)
- text1: #e6edf3 / text2: #8b949e / text3: #484f58

## Spacing standards (after design cleanup)
- Page container: p: { xs: 3, md: 4 }
- Card grids: gap: 3
- FeatureCard inner padding: 2.5 (noPadding=false)
- PageHeader bottom separator: 1px border, mb: 3.5

## Sidebar
- Width: 200px with icon + text label per nav item
- Active state: cyan left border + accentDim background
- Brand at top, Settings/Home at bottom

## Key interactions
- Live ticker pauses on hover (CSS animation-play-state: paused)
- Cards lift on hover (.panel-lift class: translateY -1px)
- Signal rows open a Dialog modal with full probability breakdown
- Shock button in TopHeader toggles shockActive state, which adjusts OverviewPage probabilities
- PageId type: 'overview' | 'signals' | 'shifts' | 'matches' | 'titles' | 'transfers' | 'alerts'
