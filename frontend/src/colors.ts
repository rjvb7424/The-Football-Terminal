export const C = {
  bg: '#080b0f',
  surface: '#0d1117',
  card: '#161b22',
  cardHover: '#1c2129',
  border: '#21262d',
  borderLight: '#30363d',
  accent: '#00b4d8',
  accentBright: '#00d4ff',
  accentDim: 'rgba(0,180,216,0.12)',
  accentGlow: 'rgba(0,180,216,0.25)',
  positive: '#3fb950',
  positiveBright: '#56d364',
  positiveDim: 'rgba(63,185,80,0.12)',
  negative: '#f85149',
  negativeBright: '#ff6b6b',
  negativeDim: 'rgba(248,81,73,0.12)',
  amber: '#d29922',
  amberBright: '#e3b341',
  amberDim: 'rgba(210,153,34,0.12)',
  text1: '#e6edf3',
  text2: '#8b949e',
  text3: '#484f58',
  gold: '#ffd700',
} as const;

export type ImpactType = 'positive' | 'negative' | 'amber' | 'neutral';

export function impactColor(value: number): string {
  if (value > 5) return C.positive;
  if (value < -5) return C.negative;
  return C.amber;
}

export function impactBg(value: number): string {
  if (value > 5) return C.positiveDim;
  if (value < -5) return C.negativeDim;
  return C.amberDim;
}
