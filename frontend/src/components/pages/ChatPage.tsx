import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Send from '@mui/icons-material/Send';
import { C } from '../../colors';
import { CHANNELS, CHAT_USERS, type ChatMessage } from '../../data/mockChat';
import PageHeader from '../shared/PageHeader';

export default function ChatPage() {
  const [channelId, setChannelId] = useState(CHANNELS[0].id);
  const [draft, setDraft] = useState('');
  const [localMessages, setLocalMessages] = useState<Record<string, ChatMessage[]>>({});
  const channel = CHANNELS.find(item => item.id === channelId) ?? CHANNELS[0];
  const messages = [...channel.messages.slice(-8), ...(localMessages[channel.id] ?? [])];

  const send = () => {
    const content = draft.trim();
    if (!content) return;
    setLocalMessages(prev => ({
      ...prev,
      [channel.id]: [
        ...(prev[channel.id] ?? []),
        { id: `local-${Date.now()}`, userId: 'me', content, timestamp: 'now', minutesAgo: 0 },
      ],
    }));
    setDraft('');
  };

  return (
    <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 3, md: 5 } }}>
      <PageHeader title="Chat" subtitle="Focused rooms for discussing the football news that is moving outcomes." />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '220px 1fr' }, gap: 3, minHeight: 0 }}>
        <Box sx={{ bgcolor: C.surface, border: `1px solid rgba(255,255,255,0.06)`, borderRadius: '9px', overflow: 'hidden', alignSelf: 'start' }}>
          {CHANNELS.map(item => (
            <Box
              key={item.id}
              component="button"
              onClick={() => setChannelId(item.id)}
              sx={{
                width: '100%',
                px: 2,
                py: 1.5,
                border: 0,
                borderTop: `1px solid rgba(255,255,255,0.055)`,
                bgcolor: item.id === channel.id ? 'rgba(46,230,200,0.08)' : 'transparent',
                color: item.id === channel.id ? C.accent : C.text2,
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 760 }}>#{item.name}</Typography>
              <Typography sx={{ fontSize: '0.66rem', color: C.text3, mt: 0.25 }}>{item.messages.length} messages</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ bgcolor: C.surface, border: `1px solid rgba(255,255,255,0.06)`, borderRadius: '9px', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 560 }}>
          <Box sx={{ px: 3, py: 2.2, borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
            <Typography sx={{ fontSize: '1rem', color: C.text1, fontWeight: 820 }}>#{channel.name}</Typography>
            <Typography sx={{ fontSize: '0.76rem', color: C.text3, mt: 0.35 }}>{channel.description}</Typography>
          </Box>

          <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', gap: 2.25, overflow: 'auto' }}>
            {messages.map(message => {
              const user = CHAT_USERS[message.userId];
              const isMe = message.userId === 'me';
              return (
                <Box key={message.id} sx={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: { xs: '92%', md: '72%' } }}>
                  {!message.isSystem && user && !isMe && (
                    <Typography sx={{ fontSize: '0.68rem', color: C.text3, mb: 0.45 }}>
                      {user.name}
                    </Typography>
                  )}
                  <Box sx={{ px: 1.6, py: 1.15, borderRadius: '8px', bgcolor: message.isSystem ? 'rgba(255,95,95,0.1)' : isMe ? 'rgba(46,230,200,0.1)' : C.card }}>
                    <Typography sx={{ fontSize: '0.82rem', color: message.isSystem ? C.text1 : C.text2, lineHeight: 1.65 }}>
                      {message.content}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ p: 2, borderTop: `1px solid rgba(255,255,255,0.06)`, display: 'flex', gap: 1 }}>
            <TextField
              value={draft}
              onChange={event => setDraft(event.target.value)}
              onKeyDown={event => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  send();
                }
              }}
              placeholder={`Message #${channel.name}`}
              size="small"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: C.text1,
                  bgcolor: C.bg,
                  borderRadius: '8px',
                  '& fieldset': { borderColor: 'rgba(255,255,255,0.08)' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.14)' },
                  '&.Mui-focused fieldset': { borderColor: C.accent },
                },
              }}
            />
            <IconButton onClick={send} disabled={!draft.trim()} sx={{ width: 40, height: 40, borderRadius: '8px', bgcolor: draft.trim() ? C.accent : C.border, color: draft.trim() ? '#050807' : C.text3, '&:hover': { bgcolor: draft.trim() ? C.accentBright : C.borderLight } }}>
              <Send sx={{ fontSize: 17 }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
