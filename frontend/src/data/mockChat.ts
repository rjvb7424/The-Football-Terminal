export interface ChatUser {
  id: string;
  name: string;
  initials: string;
  color: string;
  role: string;
  isOnline: boolean;
}

export interface ChatMessage {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  minutesAgo: number;
  isSystem?: boolean;
}

export interface ChatChannel {
  id: string;
  name: string;
  description: string;
  unread: number;
  isLive?: boolean;
  messages: ChatMessage[];
}

export const CHAT_USERS: Record<string, ChatUser> = {
  xG_Analyst:   { id: 'xG_Analyst',   name: 'xG_Analyst',   initials: 'xG', color: '#2ee6c8', role: 'Data Analyst',     isOnline: true },
  TacticalNerd:  { id: 'TacticalNerd',  name: 'TacticalNerd',  initials: 'TN', color: '#54d66f', role: 'Tactics',          isOnline: true },
  TransferGuru:  { id: 'TransferGuru',  name: 'TransferGuru',  initials: 'TG', color: '#d7a84a', role: 'Transfer Intel',   isOnline: true },
  PressBoxMike:  { id: 'PressBoxMike',  name: 'PressBoxMike',  initials: 'PM', color: '#a0aaa4', role: 'Journalist',       isOnline: true },
  DataFoot:      { id: 'DataFoot',      name: 'DataFoot',      initials: 'DF', color: '#a0aaa4', role: 'Data Scientist',   isOnline: true },
  SignalOps:     { id: 'SignalOps',     name: 'SignalOps',     initials: 'SO', color: '#ff5f5f', role: 'Signal Trader',   isOnline: false },
  me:            { id: 'me',            name: 'You',            initials: 'FT', color: '#2ee6c8', role: 'Analyst',          isOnline: true },
};

export const CHANNELS: ChatChannel[] = [
  {
    id: 'general',
    name: 'general',
    description: 'All football, all signals, all the time.',
    unread: 4,
    isLive: true,
    messages: [
      { id: 'g-01', userId: 'SignalOps',    timestamp: '15:02', minutesAgo: 90, content: 'Morning all. Model running hot — 4 break signals queued up already today.' },
      { id: 'g-02', userId: 'DataFoot',     timestamp: '15:17', minutesAgo: 75, content: 'Bellingham back in full training. That\'s roughly +3pp for Madrid xTitle by my numbers.' },
      { id: 'g-03', userId: 'TacticalNerd', timestamp: '15:24', minutesAgo: 68, content: 'Still leaning into the Madrid trade. Bellingham + Mbappé vs Barça looks genuinely scary even with Gavi back.' },
      { id: 'g-04', userId: 'xG_Analyst',   timestamp: '15:37', minutesAgo: 55, content: 'Did anyone see the Trent Alexander-Arnold story? His father confirmed 99% done to Madrid. Free transfer incoming.' },
      { id: 'g-05', userId: 'TransferGuru', timestamp: '15:38', minutesAgo: 54, content: 'His agent has been silent for two weeks. Classic pre-announcement radio silence.' },
      { id: 'g-06', userId: 'PressBoxMike', timestamp: '15:59', minutesAgo: 33, content: 'Osimhen to Chelsea medical confirmed Friday morning. Romano\'s first for a reason.' },
      { id: 'g-07', userId: 'SignalOps',    timestamp: '16:00', minutesAgo: 32, content: 'Chelsea top-4 probability up 12pp on this news. Striker depth was genuinely their gap.' },
      { id: 'g-08', userId: 'DataFoot',     timestamp: '16:06', minutesAgo: 26, content: 'Salah contract story is the one everyone\'s sleeping on. Agent confirmed talks completely dead.' },
      { id: 'g-09', userId: 'xG_Analyst',   timestamp: '16:07', minutesAgo: 25, content: 'Free transfer at his age with his xG? PSG or Inter would be insane NOT to move hard on this.' },
      { id: 'g-10', userId: 'TacticalNerd', timestamp: '16:12', minutesAgo: 20, content: 'Guardiola 3-4-3 vs Arsenal... Rodri in a back three is actually elegant. Press-resistant and still dominant in possession.' },
      { id: 'g-11', userId: 'TransferGuru', timestamp: '16:17', minutesAgo: 15, content: 'Four tier-1 transfer signals in 12 hours. I\'ve never seen market volatility like this in April.' },
      { id: 'g-12', userId: 'PressBoxMike', timestamp: '16:21', minutesAgo: 11, content: 'Something big is about to break. I can feel it.' },
      { id: 'g-sys-01', userId: 'system', timestamp: '16:29', minutesAgo: 3, isSystem: true,
        content: 'BREAKING — Mbappé officially ruled out of El Clásico with thigh strain. Madrid title probability: −38pp. [injury · Real Madrid · La Liga]' },
      { id: 'g-13', userId: 'xG_Analyst',   timestamp: '16:29', minutesAgo: 3, content: 'There it is. La Liga title race just completely flipped.' },
      { id: 'g-14', userId: 'DataFoot',     timestamp: '16:29', minutesAgo: 3, content: 'Madrid −38pp, Barça +27pp. Biggest single-signal shift I\'ve recorded this week. Signal strength: 10.' },
      { id: 'g-15', userId: 'TacticalNerd', timestamp: '16:30', minutesAgo: 2, content: 'Bellingham return is a counter-signal but it doesn\'t come close to covering this.' },
      { id: 'g-16', userId: 'SignalOps',    timestamp: '16:30', minutesAgo: 2, content: 'Loading positions accordingly 👀' },
      { id: 'g-17', userId: 'PressBoxMike', timestamp: '16:31', minutesAgo: 1, content: 'Called it. This terminal existed for exactly this moment.' },
    ],
  },
  {
    id: 'el-clasico',
    name: 'el-clasico',
    description: 'Real Madrid vs Barcelona — Saturday build-up.',
    unread: 2,
    isLive: true,
    messages: [
      { id: 'ec-01', userId: 'DataFoot',     timestamp: '15:37', minutesAgo: 55, content: 'Pre-match model running. Barça 38% | Draw 24% | Real 38%. Dead even before injury news.' },
      { id: 'ec-02', userId: 'TacticalNerd', timestamp: '15:47', minutesAgo: 45, content: 'Leaked lineup has Gavi starting. First time since October. That changes Barcelona\'s press game entirely.' },
      { id: 'ec-03', userId: 'xG_Analyst',   timestamp: '15:48', minutesAgo: 44, content: 'Gavi\'s press trigger rate is the best in La Liga this season. Barça press with him is elite level.' },
      { id: 'ec-04', userId: 'PressBoxMike', timestamp: '15:59', minutesAgo: 33, content: 'Ancelotti press conf just ended — Vinicius confirmed as false nine if Mbappé misses. High-IQ move.' },
      { id: 'ec-05', userId: 'SignalOps',    timestamp: '16:12', minutesAgo: 20, content: 'Xavi 4-2-4 rumour from Mundo Deportivo. Genuinely insane gamble if true.' },
      { id: 'ec-06', userId: 'DataFoot',     timestamp: '16:17', minutesAgo: 15, content: '4-2-4 needs 100% press success rate in transition. Unrealistic against this Madrid even without Mbappé.' },
      { id: 'ec-07', userId: 'TacticalNerd', timestamp: '16:21', minutesAgo: 11, content: 'Bellingham vs Gavi in midfield is the matchup of the whole weekend regardless.' },
      { id: 'ec-sys-01', userId: 'system', timestamp: '16:29', minutesAgo: 3, isSystem: true,
        content: 'BREAKING — Mbappé officially ruled out of El Clásico. Probability model updated in real time.' },
      { id: 'ec-08', userId: 'xG_Analyst',   timestamp: '16:29', minutesAgo: 3, content: 'New model: Barça 46% | Draw 24% | Real 30%. That\'s an 8pp swing just from one injury.' },
      { id: 'ec-09', userId: 'DataFoot',     timestamp: '16:30', minutesAgo: 2, content: 'Even with Vinicius false nine + Bellingham, xG model puts Madrid at a meaningful disadvantage now.' },
      { id: 'ec-10', userId: 'PressBoxMike', timestamp: '16:31', minutesAgo: 1, content: 'Best El Clásico storyline in years and this terminal had it 90 minutes before every mainstream outlet.' },
    ],
  },
  {
    id: 'transfers',
    name: 'transfers',
    description: 'Transfer rumours, velocities, and probability shifts.',
    unread: 0,
    messages: [
      { id: 'tr-01', userId: 'TransferGuru', timestamp: '14:40', minutesAgo: 112, content: 'Osimhen-Chelsea fee agreed. €75m plus add-ons. Romano had it. Medical Friday.' },
      { id: 'tr-02', userId: 'SignalOps',    timestamp: '14:41', minutesAgo: 111, content: 'Velocity bar is maxed out on this one. Went from 18% to 44% probability in 6 hours.' },
      { id: 'tr-03', userId: 'xG_Analyst',   timestamp: '14:57', minutesAgo: 95, content: 'Trent to Madrid is the free transfer of the decade if it happens. World-class RB, zero fee.' },
      { id: 'tr-04', userId: 'TransferGuru', timestamp: '15:24', minutesAgo: 68, content: 'Salah contract collapse is confirmed. Agent Ramy Abbas went public. Free transfer incoming June.' },
      { id: 'tr-05', userId: 'PressBoxMike', timestamp: '15:37', minutesAgo: 55, content: 'Liverpool losing Salah and Trent in the same summer is unprecedented. They\'ll need to spend big.' },
      { id: 'tr-06', userId: 'TacticalNerd', timestamp: '15:47', minutesAgo: 45, content: 'Wirtz to City rumour is building. Telegraph linked it. €120m+ is the asking price.' },
      { id: 'tr-07', userId: 'DataFoot',     timestamp: '16:12', minutesAgo: 20, content: 'Running 4 tier-1 transfer signals right now simultaneously. Market is unusually active for April.' },
      { id: 'tr-08', userId: 'SignalOps',    timestamp: '16:21', minutesAgo: 11, content: 'Millot bid from Liverpool: £35m submitted, Southampton holding at £45m. Interesting battle.' },
    ],
  },
  {
    id: 'premier-league',
    name: 'premier-league',
    description: 'England\'s top flight — live discussion.',
    unread: 0,
    messages: [
      { id: 'pl-01', userId: 'PressBoxMike', timestamp: '12:54', minutesAgo: 218, content: 'Haaland hat-trick vs Wolves. 33 league goals. He\'s broken Shearer\'s record scoring pace.' },
      { id: 'pl-02', userId: 'xG_Analyst',   timestamp: '12:55', minutesAgo: 217, content: 'xG for the hat-trick: 1.8. He\'s converting everything that moves. Projection puts him at 40+ with 12 games left.' },
      { id: 'pl-03', userId: 'TacticalNerd', timestamp: '13:45', minutesAgo: 167, content: 'Everton hearing date confirmed May 12th. Another 10-point deduction would almost certainly relegate them.' },
      { id: 'pl-04', userId: 'SignalOps',    timestamp: '15:17', minutesAgo: 75, content: 'Saka limped off Arsenal training. North London Derby Sunday. This is a big signal.' },
      { id: 'pl-05', userId: 'xG_Analyst',   timestamp: '15:24', minutesAgo: 68, content: 'Arsenal without Saka is −8pp win probability in any match this season per my model. Non-trivial.' },
      { id: 'pl-06', userId: 'PressBoxMike', timestamp: '15:37', minutesAgo: 55, content: 'Spurs will be checking that injury report every 10 minutes.' },
    ],
  },
  {
    id: 'champions-league',
    name: 'champions-league',
    description: 'UCL quarter-finals and beyond.',
    unread: 0,
    messages: [
      { id: 'ucl-01', userId: 'DataFoot',     timestamp: '11:47', minutesAgo: 285, content: 'Inzaghi signs 2-year extension at Inter. Stability signals are good for their UCL push.' },
      { id: 'ucl-02', userId: 'TacticalNerd', timestamp: '12:54', minutesAgo: 218, content: 'De Bruyne back in the squad for City\'s QF 2nd leg. They hold 1-0 on aggregate.' },
      { id: 'ucl-03', userId: 'xG_Analyst',   timestamp: '13:19', minutesAgo: 193, content: 'City UCL probability up 18pp with KDB available. His press resistance in finals is elite.' },
      { id: 'ucl-04', userId: 'SignalOps',    timestamp: '14:18', minutesAgo: 134, content: 'PSG disciplinary case opened by UEFA. Partial ground closure possible for next home European game.' },
      { id: 'ucl-05', userId: 'PressBoxMike', timestamp: '15:02', minutesAgo: 90, content: 'PSG playing behind closed doors in Europe would flip the home advantage. Wild outcome if it lands.' },
    ],
  },
  {
    id: 'la-liga',
    name: 'la-liga',
    description: 'Spain\'s top flight — El Clásico weekend.',
    unread: 3,
    isLive: true,
    messages: [
      { id: 'll-01', userId: 'TacticalNerd', timestamp: '13:19', minutesAgo: 193, content: 'Barcelona leaked lineup: Lewandowski, Yamal, Pedri, Gavi. If Gavi really starts this changes everything.' },
      { id: 'll-02', userId: 'DataFoot',     timestamp: '14:04', minutesAgo: 148, content: 'Pre-Clásico title race: Barça 58% | Madrid 39% | Atlético 3%. Very tight before today\'s news.' },
      { id: 'll-03', userId: 'xG_Analyst',   timestamp: '14:04', minutesAgo: 148, content: 'Ancelotti confirmed Vinicius false nine if Mbappé misses. That press conf told us everything we needed.' },
      { id: 'll-04', userId: 'SignalOps',    timestamp: '15:02', minutesAgo: 90, content: 'Mbappé doubt has been rising all day. Absence from training day 2 was the tell.' },
      { id: 'll-sys-01', userId: 'system', timestamp: '16:29', minutesAgo: 3, isSystem: true,
        content: 'BREAKING — Mbappé confirmed out of El Clásico. La Liga title model update in progress.' },
      { id: 'll-05', userId: 'DataFoot',     timestamp: '16:29', minutesAgo: 3, content: 'Updated: Barça 85% | Madrid 13% | Atlético 2%. Title race is essentially over if Madrid drop points Saturday.' },
      { id: 'll-06', userId: 'TacticalNerd', timestamp: '16:30', minutesAgo: 2, content: 'Insane how fast a single injury confirmation shifts everything. This is exactly why the terminal matters.' },
    ],
  },
];
