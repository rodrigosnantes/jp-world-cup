import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Award, User, Sparkles, ChevronRight, Plus, Minus, Check, Shirt } from 'lucide-react';
import { Team, Athlete } from '../types';
import Flag from './Flag';

interface TeamsProps {
  teams: Team[];
  onUpdatePlayerStats: (teamId: Team['id'], playerId: string, field: keyof Athlete, delta: number) => void;
}

export default function Teams({ teams, onUpdatePlayerStats }: TeamsProps) {
  const [activeTeamId, setActiveTeamId] = useState<Team['id']>('brasil');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const activeTeam = teams.find(t => t.id === activeTeamId) || teams[0];

  // Group players by position for tactical preview
  const goalkeeper = activeTeam.players.find(p => p.position === 'Goleiro');
  const defenders = activeTeam.players.filter(p => p.position === 'Defensor');
  const midfielders = activeTeam.players.filter(p => p.position === 'Meia');
  const forwards = activeTeam.players.filter(p => p.position === 'Atacante');

  // Let's create a tactical placement on society pitch (6 players)
  // Goleiro, 2 Defensores (left, right), 2 Meias (left, right), 1 Atacante
  // We'll map them carefully. If there aren't enough of a position, we just map players.
  const tacticalPlayers = activeTeam.players;

  const handleStatChange = (playerId: string, field: keyof Athlete, delta: number) => {
    onUpdatePlayerStats(activeTeamId, playerId, field, delta);
  };

  return (
    <section id="teams" className="py-24 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-sm font-bold tracking-widest text-emerald-400 uppercase">Plantéis de Elite</h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-white">As 4 Seleções da Copa JPFFS</h3>
        <p className="text-slate-400">
          Clique nas seleções abaixo para visualizar a escalação tática oficial de cada plantel e ver todos os atletas inscritos.
        </p>
      </div>

      {/* Team Tabs Selector */}
      <div className="flex flex-wrap justify-center gap-3">
        {teams.map(team => {
          const isActive = team.id === activeTeamId;
          return (
            <button
              key={team.id}
              id={`tab-team-${team.id}`}
              onClick={() => {
                setActiveTeamId(team.id);
                setSelectedPlayerId(null);
              }}
              className={`px-6 py-4 rounded-2xl flex items-center gap-3 border text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <Flag countryId={team.id} className="w-8 h-6 rounded shadow-sm" />
              <div className="text-left">
                <span className="block text-xs text-slate-500 uppercase tracking-widest leading-none">Seleção</span>
                <span className="text-base font-extrabold">{team.name}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Team Visual Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Tactical Pitch Layout (5 cols on lg) */}
        <div className="lg:col-span-5 bg-slate-950/80 rounded-3xl border border-slate-800/80 overflow-hidden relative p-6 h-[550px] flex flex-col justify-between">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          
          {/* Header Team badge */}
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <Flag countryId={activeTeam.id} className="w-12 h-9 rounded shadow" />
              <div>
                <h4 className="text-xl font-extrabold text-white leading-tight uppercase tracking-wider">{activeTeam.name}</h4>
                <p className="text-xs text-slate-400 font-mono">Formação Society (1-2-2-1)</p>
              </div>
            </div>
            
            <div 
              className="w-4 h-12 rounded-full" 
              style={{ background: `linear-gradient(to bottom, ${activeTeam.primaryColor}, ${activeTeam.secondaryColor})` }} 
            />
          </div>

          {/* Virtual Pitch Field */}
          <div className="flex-1 relative my-6 bg-emerald-950/30 rounded-2xl border-2 border-emerald-500/15 overflow-hidden flex flex-col justify-between p-4">
            {/* Field Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {/* Half pitch line */}
              <div className="h-1/2 border-b border-emerald-500/15 relative">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border border-emerald-500/15" />
              </div>
              {/* Penalty boxes */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-14 border-b border-x border-emerald-500/15 rounded-b-xl" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-14 border-t border-x border-emerald-500/15 rounded-t-xl" />
            </div>

            {/* Tactical Positions Map */}
            <div className="relative w-full h-full flex flex-col justify-between z-10 py-2">
              {/* Atacante */}
              <div className="flex justify-center">
                {forwards.map(player => (
                  <TacticalPlayerNode 
                    key={player.id} 
                    player={player} 
                    team={activeTeam}
                  />
                ))}
              </div>

              {/* Meias */}
              <div className="flex justify-around px-4">
                {midfielders.map(player => (
                  <TacticalPlayerNode 
                    key={player.id} 
                    player={player} 
                    team={activeTeam}
                  />
                ))}
              </div>

              {/* Defensores */}
              <div className="flex justify-around px-8">
                {defenders.map(player => (
                  <TacticalPlayerNode 
                    key={player.id} 
                    player={player} 
                    team={activeTeam}
                  />
                ))}
              </div>

              {/* Goleiro */}
              <div className="flex justify-center">
                {goalkeeper && (
                  <TacticalPlayerNode 
                    player={goalkeeper} 
                    team={activeTeam}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-slate-500 font-mono">
            Distribuição tática no campo society
          </div>
        </div>

        {/* Squad list & stats controller (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-extrabold text-slate-300 uppercase tracking-widest font-mono">Ficha Técnica dos Atletas</h4>
            <span className="text-xs bg-slate-800 text-slate-300 font-mono px-3 py-1 rounded-full border border-slate-700/80">
              {activeTeam.players.length} Atletas
            </span>
          </div>

          {/* Roster Container */}
          <div className="grid gap-4 max-h-[490px] overflow-y-auto pr-1">
            {[...activeTeam.players]
              .sort((a, b) => {
                if (a.position === 'Goleiro' && b.position !== 'Goleiro') return -1;
                if (a.position !== 'Goleiro' && b.position === 'Goleiro') return 1;
                return 0;
              })
              .map(player => {
                return (
                  <div 
                    key={player.id}
                    className="p-5 rounded-2xl bg-slate-950/40 border border-slate-800/80 hover:bg-slate-900/30 transition-all duration-200"
                  >
                  <div className="flex items-center justify-between gap-4">
                    {/* Player Header */}
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg relative shrink-0"
                        style={{ backgroundColor: activeTeam.primaryColor, color: activeTeam.textColor }}
                      >
                        {player.number}
                        {/* Jersey icon mini background */}
                        <div className="absolute bottom-0 right-0 p-0.5 bg-black/30 rounded-br-xl text-[8px] font-bold">
                          {activeTeam.shortName}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-white text-base">{player.name}</span>
                          {player.position === 'Goleiro' && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
                              🧤 Goleiro
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                          {player.position}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Tactical Pitch player representation node helper
interface TacticalNodeProps {
  key?: string;
  player: Athlete;
  team: Team;
}

function TacticalPlayerNode({ player, team }: TacticalNodeProps) {
  // Let's shorten name if it's too long
  const displayName = player.name.split(' ').slice(0, 2).join(' ');

  return (
    <div className="flex flex-col items-center select-none">
      {/* Jersey circle representation */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center relative shadow-md font-bold text-sm ring-2 ring-white/10"
        style={{ backgroundColor: team.primaryColor, color: team.textColor }}
      >
        <span>{player.number}</span>
        
        {/* Small decorative visual shirt neck */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-slate-950/20 rounded-b-md" />

        {/* Goalkeeper glove icon badge */}
        {player.position === 'Goleiro' && (
          <div className="absolute -top-1.5 -right-1.5 bg-slate-950 text-[11px] w-5 h-5 rounded-full border border-slate-800 flex items-center justify-center shadow-md shadow-black/50">
            🧤
          </div>
        )}
      </motion.div>
      
      {/* Name under circle */}
      <span className="text-[10px] md:text-xs font-extrabold mt-1 text-white bg-slate-950/90 py-0.5 px-2 rounded-full border border-slate-800 truncate max-w-[80px]">
        {displayName}
      </span>
    </div>
  );
}
