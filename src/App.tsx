import React, { useState, useEffect } from 'react';
import { INITIAL_TEAMS, INITIAL_MATCHES } from './data';
import { Team, Match, Athlete } from './types';
import { calculateStandings } from './utils';
import Hero from './components/Hero';
import About from './components/About';
import Teams from './components/Teams';
import Matches from './components/Matches';
import Leaderboard from './components/Leaderboard';
import logo from './assets/logo-black.png';

const TEAMS_STORAGE_KEY = 'jpffs_cup_teams_v4_fixed_goalkeepers';
const MATCHES_STORAGE_KEY = 'jpffs_cup_matches_v4_fixed_goalkeepers';

export default function App() {
  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem(TEAMS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_TEAMS;
  });

  const [matches, setMatches] = useState<Match[]>(() => {
    const saved = localStorage.getItem(MATCHES_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Match[];
        const isOld = parsed.length !== INITIAL_MATCHES.length || !parsed.some(m => m.round === 'Primeira fase');
        if (isOld) {
          localStorage.setItem(MATCHES_STORAGE_KEY, JSON.stringify(INITIAL_MATCHES));
          return INITIAL_MATCHES;
        }
        return parsed;
      } catch (e) {
        return INITIAL_MATCHES;
      }
    }
    return INITIAL_MATCHES;
  });

  // Keep localStorage in sync
  useEffect(() => {
    localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem(MATCHES_STORAGE_KEY, JSON.stringify(matches));
  }, [matches]);

  // Calculate dynamic standings
  const standings = calculateStandings(teams, matches);

  // Update specific player stats inside team state
  const handleUpdatePlayerStats = (
    teamId: Team['id'],
    playerId: string,
    field: keyof Athlete,
    delta: number
  ) => {
    setTeams(prevTeams => 
      prevTeams.map(team => {
        if (team.id !== teamId) return team;
        return {
          ...team,
          players: team.players.map(player => {
            if (player.id !== playerId) return player;
            
            // Ensure values don't drop below zero
            const currentVal = (player[field] as number) || 0;
            const newVal = Math.max(0, currentVal + delta);
            
            return {
              ...player,
              [field]: newVal
            };
          })
        };
      })
    );
  };

  // Safe scrolling method for landing sections
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col relative selection:bg-emerald-500 selection:text-black">
      
      {/* Floating Header / Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B0F19]/80 backdrop-blur-xl border-b border-slate-900/60 py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <img src={logo} alt="JPFFS" className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-200" />
            <div>
              <span className="font-black text-lg tracking-wider text-white uppercase block leading-none">JPFFS</span>
              <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest leading-none mt-1">Copa do Mundo</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-950/40 p-1.5 rounded-full border border-slate-900/80">
            <button 
              onClick={() => handleScrollToSection('about')} 
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-400 hover:text-white transition-all cursor-pointer hover:bg-slate-900/40"
            >
              Sobre Nós
            </button>
            <button 
              onClick={() => handleScrollToSection('teams')} 
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-400 hover:text-white transition-all cursor-pointer hover:bg-slate-900/40"
            >
              Seleções
            </button>
            <button 
              onClick={() => handleScrollToSection('matches')} 
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-400 hover:text-white transition-all cursor-pointer hover:bg-slate-900/40"
            >
              Tabela & Chaveamento
            </button>
            <button 
              onClick={() => handleScrollToSection('leaderboard')} 
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-400 hover:text-white transition-all cursor-pointer hover:bg-slate-900/40"
            >
              Classificação
            </button>
          </div>

          {/* CTA header button */}
          <button 
            onClick={() => handleScrollToSection('matches')}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all cursor-pointer"
          >
            Tabela de Jogos
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <Hero 
        teams={teams} 
        matches={matches} 
        onScrollToSection={handleScrollToSection} 
      />

      {/* Main Sections */}
      <main className="flex-1 pb-24 relative">
        {/* Subtle decorative stadium layout glow in background */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] bg-gradient-to-tr from-emerald-950/5 via-blue-950/10 to-emerald-950/5 blur-3xl pointer-events-none" />

        {/* Section 1: About */}
        <About />

        {/* Section 2: Teams & Players */}
        <Teams 
          teams={teams} 
          onUpdatePlayerStats={handleUpdatePlayerStats} 
        />

        {/* Section 3: Match predictor schedule */}
        <Matches 
          teams={teams} 
          matches={matches} 
          standings={standings}
        />

        {/* Section 4: Live Leaderboard table */}
        <Leaderboard standings={standings} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/80 bg-slate-950/50 py-12 px-4 md:px-8 text-center relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="JPFFS" className="h-9 w-auto object-contain" />
            <div className="text-left font-mono">
              <span className="font-extrabold text-white block text-sm">JPFFS Football Club</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Desde 2008</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold text-slate-500 font-mono">
            <span>⚽ 4 Seleções</span>
            <span>🏃‍♂️ 24 Atletas</span>
            <span>🏆 Copa do Mundo Amadora</span>
          </div>

          <p className="text-xs text-slate-500 font-mono">
            &copy; {new Date().getFullYear()} JPFFS. Todos os direitos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}
