import { Team, Match } from './types';

export const INITIAL_TEAMS: Team[] = [
  {
    id: 'brasil',
    name: 'Brasil',
    shortName: 'BRA',
    flag: '🇧🇷',
    primaryColor: '#FACC15', // Yellow-400
    secondaryColor: '#15803D', // Green-700
    textColor: '#1E3A8A', // Deep Blue
    players: [
      { id: 'bra_1', name: 'Ricardinho', nickname: 'Goleiro', number: 11, position: 'Atacante', goals: 0, assists: 0, yellowCards: 1, redCards: 0, mvpCount: 1 },
      { id: 'bra_2', name: 'Flavinho', nickname: 'Xerife', number: 3, position: 'Defensor', goals: 1, assists: 0, yellowCards: 2, redCards: 0, mvpCount: 0 },
      { id: 'bra_3', name: 'Gilmar paquetá', nickname: 'Maestro', number: 10, position: 'Meia', goals: 4, assists: 5, yellowCards: 0, redCards: 0, mvpCount: 3 },
      { id: 'bra_4', name: 'Emanuel', nickname: 'Artilheiro', number: 9, position: 'Atacante', goals: 6, assists: 2, yellowCards: 1, redCards: 0, mvpCount: 2 },
      { id: 'bra_5', name: 'Japa', nickname: 'Curinga', number: 8, position: 'Meia', goals: 2, assists: 3, yellowCards: 3, redCards: 1, mvpCount: 0 },
      { id: 'bra_6', name: 'Tilmar', nickname: 'Raio', number: 1, position: 'Goleiro', goals: 3, assists: 4, yellowCards: 0, redCards: 0, mvpCount: 1 }
    ]
  },
  {
    id: 'espanha',
    name: 'Espanha',
    shortName: 'ESP',
    flag: '🇪🇸',
    primaryColor: '#DC2626', // Red-600
    secondaryColor: '#FBBF24', // Yellow-500
    textColor: '#FFFFFF',
    players: [
      { id: 'esp_1', name: 'André', nickname: 'La Muralla', number: 7, position: 'Atacante', goals: 0, assists: 0, yellowCards: 0, redCards: 0, mvpCount: 0 },
      { id: 'esp_2', name: 'Hendor', nickname: 'La Roca', number: 4, position: 'Defensor', goals: 0, assists: 1, yellowCards: 1, redCards: 0, mvpCount: 0 },
      { id: 'esp_3', name: 'Victor', nickname: 'Maestro', number: 6, position: 'Meia', goals: 1, assists: 3, yellowCards: 2, redCards: 0, mvpCount: 1 },
      { id: 'esp_4', name: 'Bruno', nickname: 'El Niño', number: 9, position: 'Atacante', goals: 5, assists: 1, yellowCards: 0, redCards: 0, mvpCount: 2 },
      { id: 'esp_5', name: 'Renato', nickname: 'Cérebro', number: 8, position: 'Meia', goals: 3, assists: 4, yellowCards: 0, redCards: 0, mvpCount: 2 },
      { id: 'esp_6', name: 'Joao vitor', nickname: 'Flecha', number: 1, position: 'Goleiro', goals: 2, assists: 2, yellowCards: 1, redCards: 0, mvpCount: 0 }
    ]
  },
  {
    id: 'inglaterra',
    name: 'Inglaterra',
    shortName: 'ING',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    primaryColor: '#FFFFFF', // White
    secondaryColor: '#1E3A8A', // Dark Blue
    textColor: '#1E3050',
    players: [
      { id: 'ing_1', name: 'Aranha', nickname: 'Paredão', number: 4, position: 'Meia', goals: 0, assists: 0, yellowCards: 1, redCards: 0, mvpCount: 0 },
      { id: 'ing_2', name: 'Jean', nickname: 'Xerife', number: 5, position: 'Defensor', goals: 1, assists: 1, yellowCards: 3, redCards: 0, mvpCount: 0 },
      { id: 'ing_3', name: 'Samuel', nickname: 'Estrela', number: 10, position: 'Meia', goals: 4, assists: 3, yellowCards: 1, redCards: 0, mvpCount: 2 },
      { id: 'ing_4', name: 'Luiz paulo', nickname: 'Furacão', number: 9, position: 'Atacante', goals: 5, assists: 2, yellowCards: 0, redCards: 0, mvpCount: 2 },
      { id: 'ing_5', name: 'Rodrigo Nantes', nickname: 'Maestro', number: 1, position: 'Goleiro', goals: 1, assists: 2, yellowCards: 2, redCards: 0, mvpCount: 0 }
    ]
  },
  {
    id: 'italia',
    name: 'Itália',
    shortName: 'ITA',
    flag: '🇮🇹',
    primaryColor: '#1D4ED8', // Blue-700
    secondaryColor: '#15803D', // Green-700
    textColor: '#FFFFFF',
    players: [
      { id: 'ita_1', name: 'Fabiano', nickname: 'Gigi', number: 14, position: 'Atacante', goals: 0, assists: 0, yellowCards: 0, redCards: 0, mvpCount: 1 },
      { id: 'ita_2', name: 'Pietro', nickname: 'Muralha', number: 3, position: 'Defensor', goals: 0, assists: 0, yellowCards: 4, redCards: 0, mvpCount: 1 },
      { id: 'ita_3', name: 'alex', nickname: 'Motorista', number: 8, position: 'Meia', goals: 1, assists: 5, yellowCards: 2, redCards: 0, mvpCount: 1 },
      { id: 'ita_4', name: 'paulo cesar', nickname: 'Imortal', number: 17, position: 'Atacante', goals: 4, assists: 1, yellowCards: 0, redCards: 0, mvpCount: 1 },
      { id: 'ita_5', name: 'Rodrigo costa', nickname: 'Flecha', number: 1, position: 'Goleiro', goals: 3, assists: 3, yellowCards: 1, redCards: 0, mvpCount: 1 }
    ]
  }
];

export const INITIAL_MATCHES: Match[] = [
  // Primeira fase (Data 27 Junho)
  { id: 'm1', homeTeamId: 'brasil', awayTeamId: 'inglaterra', homeScore: 0, awayScore: 1, isCompleted: true, date: '2026-06-27', time: '19:00', round: 'Primeira fase' },
  { id: 'm2', homeTeamId: 'espanha', awayTeamId: 'italia', homeScore: 5, awayScore: 4, isCompleted: true, date: '2026-06-27', time: '19:40', round: 'Primeira fase' },

  // Segunda fase (Data 27 Junho)
  { id: 'm3', homeTeamId: 'espanha', awayTeamId: 'inglaterra', homeScore: undefined, awayScore: undefined, isCompleted: false, date: '2026-06-27', time: '20:20', round: 'Segunda fase' },
  { id: 'm4', homeTeamId: 'brasil', awayTeamId: 'italia', homeScore: undefined, awayScore: undefined, isCompleted: false, date: '2026-06-27', time: '21:00', round: 'Segunda fase' },

  // Terceira fase (Data 11 Julho)
  { id: 'm5', homeTeamId: 'brasil', awayTeamId: 'espanha', homeScore: undefined, awayScore: undefined, isCompleted: false, date: '2026-07-11', time: '19:00', round: 'Terceira fase' },
  { id: 'm6', homeTeamId: 'inglaterra', awayTeamId: 'italia', homeScore: undefined, awayScore: undefined, isCompleted: false, date: '2026-07-11', time: '19:40', round: 'Terceira fase' },

  // Finais (Data 18 Julho)
  { id: 'm7', homeTeamId: 'italia', awayTeamId: 'brasil', homeScore: undefined, awayScore: undefined, isCompleted: false, date: '2026-07-18', time: '19:00', round: 'Finais (3º Lugar)' },
  { id: 'm8', homeTeamId: 'espanha', awayTeamId: 'inglaterra', homeScore: undefined, awayScore: undefined, isCompleted: false, date: '2026-07-18', time: '20:00', round: 'Finais (Grande Final)' }
];

export const GENERAL_STATS = {
  tournamentName: 'Copa JPFFS 2026',
  location: 'Arena JPFFS, São Paulo - Brasil',
  organizer: 'JPFFS Club',
  totalAthletes: 22,
  totalTeams: 4,
  rules: [
    'Partidas de 1 tempo de 15 minutos na primeira fase e na segunda fase 1 tempo de 20 minutos',
    'Substituições ilimitadas ao longo da partida',
    'Critério de desempate: Pontos > Saldo de Gols > Gols Pró > Confronto Direto'
  ]
};
