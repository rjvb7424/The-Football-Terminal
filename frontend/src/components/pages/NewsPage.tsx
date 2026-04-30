import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { C } from '../../colors';
import { NEWS, type NewsCategory } from '../../data/mockNews';
import PageHeader from '../shared/PageHeader';

const FILTERS: Array<NewsCategory | 'all'> = ['all', 'injury', 'transfer', 'match', 'tactical', 'rumour'];

function categoryColor(category: NewsCategory) {
  if (category === 'injury') return C.negative;
  if (category === 'rumour' || category === 'transfer') return C.amber;
  if (category === 'match') return C.positive;
  return C.accent;
}

export default function NewsPage() {
  const [filter, setFilter] = useState<NewsCategory | 'all'>('all');
  const stories = useMemo(
    () => (filter === 'all' ? NEWS : NEWS.filter(item => item.category === filter)).slice(0, 10),
    [filter],
  );

  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 3, md: 5 } }}>
      <PageHeader title="News" subtitle="The story layer, stripped back to impact and context." />

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
        {FILTERS.map(item => (
          <Box
            key={item}
            component="button"
            onClick={() => setFilter(item)}
            sx={{
              px: 1.35,
              py: 0.6,
              border: `1px solid ${filter === item ? 'rgba(46,230,200,0.42)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: '7px',
              bgcolor: filter === item ? 'rgba(46,230,200,0.08)' : 'transparent',
              color: filter === item ? C.accent : C.text2,
              fontSize: '0.72rem',
              textTransform: 'capitalize',
              cursor: 'pointer',
            }}
          >
            {item}
          </Box>
        ))}
      </Box>

      <Box sx={{ bgcolor: C.surface, border: `1px solid rgba(255,255,255,0.06)`, borderRadius: '9px', overflow: 'hidden' }}>
        {stories.map(story => (
          <Box key={story.id} sx={{ px: { xs: 2, md: 3 }, py: 2.4, borderTop: `1px solid rgba(255,255,255,0.055)` }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 1 }}>
              <Typography sx={{ fontSize: '0.68rem', color: categoryColor(story.category), fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {story.category}
              </Typography>
              <Typography sx={{ fontSize: '0.68rem', color: C.text3, fontFamily: 'monospace', flexShrink: 0 }}>
                {story.minutesAgo}m
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '1rem', color: C.text1, fontWeight: 780, lineHeight: 1.35, mb: 0.8 }}>
              {story.headline}
            </Typography>
            <Typography sx={{ fontSize: '0.82rem', color: C.text2, lineHeight: 1.7, maxWidth: 760 }}>
              {story.summary}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
