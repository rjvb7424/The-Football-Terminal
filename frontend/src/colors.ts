export const C = {
  bg: '#050807',
  surface: '#0c1210',
  card: '#121917',
  cardHover: '#17211e',
  border: '#1d2926',
  borderLight: '#2c3a36',
  accent: '#2ee6c8',
  accentBright: '#75ffe9',
  accentDim: 'rgba(46,230,200,0.1)',
  accentGlow: 'rgba(46,230,200,0.2)',
  positive: '#54d66f',
  positiveBright: '#7cf294',
  positiveDim: 'rgba(84,214,111,0.11)',
  negative: '#ff5f5f',
  negativeBright: '#ff8585',
  negativeDim: 'rgba(255,95,95,0.11)',
  amber: '#d7a84a',
  amberBright: '#efc86a',
  amberDim: 'rgba(215,168,74,0.11)',
  text1: '#f1f5ef',
  text2: '#a0aaa4',
  text3: '#5f6b65',
  gold: '#e5c76b',
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
