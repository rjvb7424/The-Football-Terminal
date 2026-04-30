import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { C } from '../../colors';
import { NEWS, type NewsItem, type NewsCategory } from '../../data/mockNews';
import PageHeader from '../shared/PageHeader';
import StatusChip from '../shared/StatusChip';

type Sort = 'recent' | 'breaking';

const CATEGORY_FILTERS: { id: NewsCategory | 'all'; label: string }[] = [
  { id: 'all',      label: 'All' },
  { id: 'transfer', label: 'Transfers' },
  { id: 'injury',   label: 'Injuries' },
  { id: 'match',    label: 'Matches' },
  { id: 'tactical', label: 'Tactical' },
  { id: 'official', label: 'Official' },
  { id: 'rumour',   label: 'Rumours' },
];

const CATEGORY_VARIANT: Record<NewsCategory, string> = {
  transfer: 'transfer',
  injury:   'injury',
  match:    'positive',
  tactical: 'tactical',
  official: 'medium',
  rumour:   'rumour',
};

const CATEGORY_LABEL: Record<NewsCategory, string> = {
  transfer: 'TRANSFER',
  injury:   'INJURY',
  match:    'MATCH',
  tactical: 'TACTICAL',
  official: 'OFFICIAL',
  rumour:   'RUMOUR',
};

const BREAKING_BAR_COLOR: Record<string, string> = {
  breaking: C.negative,
  transfer: C.amber,
  injury:   C.negative,
  match:    C.positive,
  tactical: C.accent,
  official: C.accent,
  rumour:   C.amber,
};

function barColor(item: NewsItem): string {
  if (item.isBreaking) return BREAKING_BAR_COLOR.breaking;
  return BREAKING_BAR_COLOR[item.category] ?? C.text3;
}

function formatAge(minutesAgo: number): string {
  if (minutesAgo < 60) return `${minutesAgo}m`;
  const h = Math.floor(minutesAgo / 60);
  const m = minutesAgo % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        px: 1.5,
        py: 0.5,
        border: `1px solid ${active ? C.accent : C.border}`,
        borderRadius: '5px',
        bgcolor: active ? C.accentDim : 'transparent',
        color: active ? C.accent : C.text2,
        fontFamily: 'monospace',
        fontSize: '0.68rem',
        fontWeight: active ? 700 : 400,
        letterSpacing: '0.04em',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'all 0.15s ease',
        '&:hover': { borderColor: active ? C.accent : C.borderLight, color: active ? C.accent : C.text1 },
      }}
    >
      {label}
    </Box>
  );
}

function SortButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        px: 1.5,
        py: 0.5,
        border: `1px solid ${active ? C.accent : C.border}`,
        borderRadius: '5px',
        bgcolor: active ? C.accentDim : 'transparent',
        color: active ? C.accent : C.text2,
        fontFamily: 'monospace',
        fontSize: '0.68rem',
        fontWeight: active ? 700 : 400,
        letterSpacing: '0.04em',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'all 0.15s ease',
        '&:hover': { borderColor: active ? C.accent : C.borderLight, color: active ? C.accent : C.text1 },
      }}
    >
      {label}
    </Box>
  );
}

function BreakingBadge() {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        px: 0.875,
        py: 0.2,
        bgcolor: C.negativeDim,
        border: `1px solid rgba(248,81,73,0.4)`,
        borderRadius: '4px',
        flexShrink: 0,
      }}
    >
      <Box
        component="span"
        className="live-dot live-dot-red"
        sx={{ width: 5, height: 5 }}
      />
      <Typography
        sx={{
          fontSize: '0.58rem',
          fontWeight: 800,
          color: C.negative,
          fontFamily: 'monospace',
          letterSpacing: '0.08em',
        }}
      >
        BREAKING
      </Typography>
    </Box>
  );
}

function NewsRow({ item, isFirst }: { item: NewsItem; isFirst: boolean }) {
  const bar = barColor(item);
  const age = formatAge(item.minutesAgo);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        px: 2.5,
        py: 2,
        borderBottom: `1px solid ${C.border}`,
        '&:last-child': { borderBottom: 'none' },
        bgcolor: item.isBreaking && isFirst ? 'rgba(248,81,73,0.03)' : 'transparent',
        transition: 'background-color 0.15s',
        '&:hover': { bgcolor: item.isBreaking ? 'rgba(248,81,73,0.05)' : 'rgba(255,255,255,0.02)' },
      }}
    >
      {/* Priority bar */}
      <Box
        sx={{
          width: 3,
          alignSelf: 'stretch',
          bgcolor: bar,
          borderRadius: 2,
          flexShrink: 0,
          minHeight: 40,
          opacity: item.isBreaking ? 1 : 0.5,
        }}
      />

      {/* Time */}
      <Box sx={{ flexShrink: 0, width: 44, pt: 0.25 }}>
        <Typography sx={{ fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 700, color: item.isBreaking ? C.negative : C.text2 }}>
          {age}
        </Typography>
        <Typography sx={{ fontSize: '0.58rem', fontFamily: 'monospace', color: C.text3, mt: 0.15 }}>
          {item.publishedAt}
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {/* Badges row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.875, flexWrap: 'wrap' }}>
          {item.isBreaking && <BreakingBadge />}
          <StatusChip
            variant={CATEGORY_VARIANT[item.category] as any}
            label={CATEGORY_LABEL[item.category]}
          />
          {item.competition && (
            <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.04em' }}>
              {item.competition}
            </Typography>
          )}
        </Box>

        {/* Headline */}
        <Typography
          sx={{
            fontSize: item.isBreaking ? '0.92rem' : '0.85rem',
            fontWeight: item.isBreaking ? 800 : 700,
            color: item.isBreaking ? C.text1 : C.text1,
            lineHeight: 1.3,
            mb: 0.75,
            letterSpacing: '-0.01em',
          }}
        >
          {item.headline}
        </Typography>

        {/* Summary */}
        <Typography
          sx={{
            fontSize: '0.75rem',
            color: C.text2,
            lineHeight: 1.65,
            mb: 1,
          }}
        >
          {item.summary}
        </Typography>

        {/* Footer: source + tags */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Box
            sx={{
              px: 0.875,
              py: 0.15,
              bgcolor: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: '3px',
            }}
          >
            <Typography sx={{ fontSize: '0.58rem', color: C.text2, fontFamily: 'monospace', fontWeight: 600 }}>
              {item.source}
            </Typography>
          </Box>
          {item.team && (
            <Typography sx={{ fontSize: '0.6rem', color: C.text3, fontFamily: 'monospace' }}>
              {item.team}
            </Typography>
          )}
          {item.tags.slice(0, 3).map(tag => (
            <Typography key={tag} sx={{ fontSize: '0.6rem', color: C.text3 }}>
              · {tag}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Breaking score pill — only on breaking items */}
      {item.isBreaking && (
        <Box
          sx={{
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.25,
            pt: 0.25,
          }}
        >
          <Typography sx={{ fontSize: '0.52rem', color: C.text3, fontFamily: 'monospace', letterSpacing: '0.06em' }}>
            SIGNAL
          </Typography>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '6px',
              bgcolor: C.negativeDim,
              border: `1px solid rgba(248,81,73,0.3)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: '0.92rem', fontFamily: 'monospace', fontWeight: 800, color: C.negative, lineHeight: 1 }}>
              {item.breakingScore}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

function BreakingFeed({ items }: { items: NewsItem[] }) {
  const breaking = items.filter(i => i.isBreaking);
  const regular = items.filter(i => !i.isBreaking);

  if (breaking.length === 0 && regular.length === 0) {
    return (
      <Box sx={{ p: 6, textAlign: 'center' }}>
        <Typography sx={{ color: C.text3, fontSize: '0.8rem' }}>No stories match your filters.</Typography>
      </Box>
    );
  }

  return (
    <>
      {breaking.length > 0 && (
        <>
          <Box sx={{ px: 2.5, py: 0.875, bgcolor: C.card, borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box component="span" className="live-dot live-dot-red" sx={{ width: 6, height: 6 }} />
            <Typography sx={{ fontSize: '0.58rem', color: C.negative, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.08em' }}>
              BREAKING NOW — {breaking.length} STOR{breaking.length !== 1 ? 'IES' : 'Y'}
            </Typography>
          </Box>
          {breaking.map((item, i) => (
            <NewsRow key={item.id} item={item} isFirst={i === 0} />
          ))}
        </>
      )}
      {regular.length > 0 && (
        <>
          {breaking.length > 0 && (
            <Box sx={{ px: 2.5, py: 0.875, bgcolor: C.card, borderBottom: `1px solid ${C.border}`, borderTop: `1px solid ${C.border}` }}>
              <Typography sx={{ fontSize: '0.58rem', color: C.text3, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.08em' }}>
                LATEST NEWS
              </Typography>
            </Box>
          )}
          {regular.map((item, i) => (
            <NewsRow key={item.id} item={item} isFirst={i === 0} />
          ))}
        </>
      )}
    </>
  );
}

export default function NewsPage() {
  const [category, setCategory] = useState<NewsCategory | 'all'>('all');
  const [sort, setSort] = useState<Sort>('breaking');

  const filtered = useMemo(() => {
    const list = category === 'all' ? NEWS : NEWS.filter(n => n.category === category);

    if (sort === 'recent') {
      return [...list].sort((a, b) => a.minutesAgo - b.minutesAgo);
    }
    return [...list].sort((a, b) => {
      if (a.isBreaking !== b.isBreaking) return a.isBreaking ? -1 : 1;
      return b.breakingScore - a.breakingScore;
    });
  }, [category, sort]);

  const breakingCount = NEWS.filter(n => n.isBreaking).length;

  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 3, md: 4 } }}>
      <PageHeader
        title="News"
        subtitle="Every story that matters — sorted by impact before the headlines catch up."
        right={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.5, bgcolor: C.negativeDim, border: `1px solid rgba(248,81,73,0.3)`, borderRadius: '5px' }}>
            <Box component="span" className="live-dot live-dot-red" sx={{ width: 6, height: 6 }} />
            <Typography sx={{ fontSize: '0.65rem', fontFamily: 'monospace', fontWeight: 700, color: C.negative }}>
              {breakingCount} BREAKING
            </Typography>
          </Box>
        }
      />

      {/* Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 2.5, flexWrap: 'wrap' }}>
        {/* Category filters */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {CATEGORY_FILTERS.map(f => (
            <FilterChip
              key={f.id}
              label={f.label}
              active={category === f.id}
              onClick={() => setCategory(f.id as NewsCategory | 'all')}
            />
          ))}
        </Box>

        {/* Sort */}
        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
          <SortButton label="Most Breaking" active={sort === 'breaking'} onClick={() => setSort('breaking')} />
          <SortButton label="Most Recent"   active={sort === 'recent'}   onClick={() => setSort('recent')} />
        </Box>
      </Box>

      {/* Count */}
      <Typography sx={{ fontSize: '0.65rem', color: C.text3, fontFamily: 'monospace', mb: 2 }}>
        {filtered.length} STOR{filtered.length !== 1 ? 'IES' : 'Y'}
        {category !== 'all' && ` · ${CATEGORY_LABEL[category as NewsCategory]}`}
        {' · '}SORTED BY {sort === 'breaking' ? 'SIGNAL STRENGTH' : 'MOST RECENT'}
      </Typography>

      {/* Feed */}
      <Box
        sx={{
          bgcolor: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {sort === 'breaking' ? (
          <BreakingFeed items={filtered} />
        ) : (
          filtered.length === 0 ? (
            <Box sx={{ p: 6, textAlign: 'center' }}>
              <Typography sx={{ color: C.text3, fontSize: '0.8rem' }}>No stories match your filters.</Typography>
            </Box>
          ) : (
            filtered.map((item, i) => (
              <NewsRow key={item.id} item={item} isFirst={i === 0} />
            ))
          )
        )}
      </Box>
    </Box>
  );
}
