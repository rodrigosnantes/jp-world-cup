import { Team, Match, TeamStanding } from './types';

export function calculateStandings(teams: Team[], matches: Match[]): TeamStanding[] {
  const standings: Record<string, TeamStanding> = {};

  // Initialize standings for each team
  teams.forEach(team => {
    standings[team.id] = {
      teamId: team.id,
      name: team.name,
      shortName: team.shortName,
      primaryColor: team.primaryColor,
      textColor: team.textColor,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalsDifference: 0,
      points: 0,
    };
  });

  // Calculate based on completed matches
  matches.forEach(match => {
    if (match.isCompleted && match.homeScore !== undefined && match.awayScore !== undefined) {
      const home = standings[match.homeTeamId];
      const away = standings[match.awayTeamId];

      if (home && away) {
        home.played += 1;
        away.played += 1;

        home.goalsFor += match.homeScore;
        home.goalsAgainst += match.awayScore;

        away.goalsFor += match.awayScore;
        away.goalsAgainst += match.homeScore;

        if (match.homeScore > match.awayScore) {
          home.won += 1;
          home.points += 3;
          away.lost += 1;
        } else if (match.homeScore < match.awayScore) {
          away.won += 1;
          away.points += 3;
          home.lost += 1;
        } else {
          home.drawn += 1;
          home.points += 1;
          away.drawn += 1;
          away.points += 1;
        }
      }
    }
  });

  // Calculate goal differences and convert to array
  const standingsList = Object.values(standings).map(standing => {
    standing.goalsDifference = standing.goalsFor - standing.goalsAgainst;
    return standing;
  });

  // Sort standings: Points desc, Goals Difference desc, Goals For desc, Name asc
  return standingsList.sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    if (b.goalsDifference !== a.goalsDifference) {
      return b.goalsDifference - a.goalsDifference;
    }
    if (b.goalsFor !== a.goalsFor) {
      return b.goalsFor - a.goalsFor;
    }
    return a.name.localeCompare(b.name);
  });
}
