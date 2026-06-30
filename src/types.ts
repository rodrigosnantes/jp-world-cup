export interface Athlete {
  id: string;
  name: string;
  nickname?: string;
  number: number;
  position: 'Goleiro' | 'Defensor' | 'Meia' | 'Atacante';
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  mvpCount: number;
}

export interface Team {
  id: 'brasil' | 'espanha' | 'inglaterra' | 'italia';
  name: string;
  shortName: string;
  flag: string; // Emoji or visual representation
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  players: Athlete[];
}

export interface Match {
  id: string;
  homeTeamId: Team['id'];
  awayTeamId: Team['id'];
  homeScore?: number;
  awayScore?: number;
  isCompleted: boolean;
  date: string;
  time: string;
  round: string; // e.g. "Rodada 1", "Semifinal", "Final"
}

export interface TeamStanding {
  teamId: Team['id'];
  name: string;
  shortName: string;
  primaryColor: string;
  textColor: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalsDifference: number;
  points: number;
}
