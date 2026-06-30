import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Trophy, Medal, ChevronDown, Clock, ShieldAlert, Sparkles, TrendingUp, Info } from 'lucide-react';
import { Team, Match, TeamStanding } from '../types';
import Flag from './Flag';

interface MatchesProps {
  teams: Team[];
  matches: Match[];
  standings: TeamStanding[];
}

export default function Matches({ teams, matches, standings }: MatchesProps) {
  // Accordion active phase state. Default to 'finais' because it's the most exciting!
  const [openPhase, setOpenPhase] = useState<string>('finais');

  // Find team helper
  const getTeam = (teamId: Team['id']) => {
    return teams.find(t => t.id === teamId) || {
      id: teamId,
      name: 'A definir',
      shortName: 'TBD',
      primaryColor: '#1e293b',
      secondaryColor: '#0f172a',
      textColor: '#ffffff',
      players: []
    };
  };

  // Group matches by their rounds
  const firstPhaseMatches = matches.filter(m => m.round === 'Primeira fase');
  const secondPhaseMatches = matches.filter(m => m.round === 'Segunda fase');
  const thirdPhaseMatches = matches.filter(m => m.round === 'Terceira fase');
  const thirdPlaceMatch = matches.find(m => m.round === 'Finais (3º Lugar)');
  const grandFinalMatch = matches.find(m => m.round === 'Finais (Grande Final)');

  // Standings positions helper to dynamically assign teams to the finals preview
  const firstPlace = standings[0] ? getTeam(standings[0].teamId) : null;
  const secondPlace = standings[1] ? getTeam(standings[1].teamId) : null;
  const thirdPlace = standings[2] ? getTeam(standings[2].teamId) : null;
  const fourthPlace = standings[3] ? getTeam(standings[3].teamId) : null;

  const togglePhase = (phase: string) => {
    setOpenPhase(openPhase === phase ? '' : phase);
  };

  // Render match card inside accordion
  const renderMatchRow = (match: Match) => {
    const homeTeam = getTeam(match.homeTeamId);
    const awayTeam = getTeam(match.awayTeamId);

    return (
      <div 
        key={match.id}
        className={`flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-6 rounded-2xl border bg-slate-950/30 transition-all ${
          match.isCompleted 
            ? 'border-slate-800/80 hover:border-slate-700/80' 
            : 'border-emerald-500/10 hover:border-emerald-500/20 bg-emerald-950/5'
        }`}
      >
        {/* Match Meta (Left/Top) */}
        <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>{match.time}</span>
          <span className="text-slate-700">|</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
            match.isCompleted 
              ? 'bg-slate-800 text-slate-400' 
              : 'bg-emerald-500/10 text-emerald-400'
          }`}>
            {match.isCompleted ? 'Encerrado' : 'Agendado'}
          </span>
        </div>

        {/* Competitors and Score (Center) */}
        <div className="flex items-center justify-center gap-6 md:gap-8 w-full md:w-auto max-w-lg flex-1">
          {/* Home Team */}
          <div className="flex items-center gap-3 justify-end flex-1 min-w-0">
            <span className="font-extrabold text-sm md:text-base text-slate-100 uppercase tracking-wide truncate">
              {homeTeam.name}
            </span>
            <Flag countryId={homeTeam.id} className="w-8 h-5 md:w-9 md:h-6 rounded shadow shrink-0" />
          </div>

          {/* Scoreboard / VS */}
          <div className="flex items-center justify-center font-mono shrink-0">
            {match.isCompleted ? (
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-xl">
                <span className="text-xl md:text-2xl font-black text-white">{match.homeScore}</span>
                <span className="text-slate-600 text-xs font-bold">x</span>
                <span className="text-xl md:text-2xl font-black text-white">{match.awayScore}</span>
              </div>
            ) : (
              <div className="bg-slate-900/60 border border-slate-800/60 px-4 py-1.5 rounded-xl">
                <span className="text-xs font-black text-slate-500 uppercase tracking-widest">VS</span>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center gap-3 justify-start flex-1 min-w-0">
            <Flag countryId={awayTeam.id} className="w-8 h-5 md:w-9 md:h-6 rounded shadow shrink-0" />
            <span className="font-extrabold text-sm md:text-base text-slate-100 uppercase tracking-wide truncate">
              {awayTeam.name}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="matches" className="py-24 px-4 md:px-8 max-w-5xl mx-auto space-y-12 relative z-10">
      
      {/* Section Title */}
      <div className="space-y-4 text-center">
        <h2 className="text-sm font-bold tracking-widest text-emerald-400 uppercase font-mono">Chaveamento Oficial</h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-white">Tabela de Jogos & Finais</h3>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
          Acompanhe o progresso das seleções rivais. A Copa do Mundo JPFFS 2026 é composta por três fases de classificação em pontos corridos, culminando nos playoffs finais de disputa de posições.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        
        {/* Accordion 1: Primeira Fase */}
        <div className="border border-slate-900 bg-slate-950/45 rounded-3xl overflow-hidden transition-colors hover:border-slate-800/80">
          <button
            onClick={() => togglePhase('primeira')}
            className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center font-bold text-slate-400 text-sm">
                1ª
              </div>
              <div>
                <h4 className="text-lg font-bold text-white uppercase tracking-wider">Primeira Fase</h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Sábado, 27 de Junho • 2 Jogos Realizados</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Encerrada</span>
              <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${openPhase === 'primeira' ? 'rotate-180' : ''}`} />
            </div>
          </button>

          <AnimatePresence initial={false}>
            {openPhase === 'primeira' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 pt-0 border-t border-slate-900/60 space-y-4">
                  {firstPhaseMatches.map(renderMatchRow)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Accordion 2: Segunda Fase */}
        <div className="border border-slate-900 bg-slate-950/45 rounded-3xl overflow-hidden transition-colors hover:border-slate-800/80">
          <button
            onClick={() => togglePhase('segunda')}
            className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center font-bold text-emerald-400 text-sm">
                2ª
              </div>
              <div>
                <h4 className="text-lg font-bold text-white uppercase tracking-wider">Segunda Fase</h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Sábado, 27 de Junho • Próxima Rodada</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[10px] uppercase tracking-wider animate-pulse">Agendada</span>
              <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${openPhase === 'segunda' ? 'rotate-180' : ''}`} />
            </div>
          </button>

          <AnimatePresence initial={false}>
            {openPhase === 'segunda' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 pt-0 border-t border-slate-900/60 space-y-4">
                  {secondPhaseMatches.map(renderMatchRow)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Accordion 3: Terceira Fase */}
        <div className="border border-slate-900 bg-slate-950/45 rounded-3xl overflow-hidden transition-colors hover:border-slate-800/80">
          <button
            onClick={() => togglePhase('terceira')}
            className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center font-bold text-slate-400 text-sm">
                3ª
              </div>
              <div>
                <h4 className="text-lg font-bold text-white uppercase tracking-wider">Terceira Fase</h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Sábado, 11 de Julho • Fase de Decisão</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Agendada</span>
              <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${openPhase === 'terceira' ? 'rotate-180' : ''}`} />
            </div>
          </button>

          <AnimatePresence initial={false}>
            {openPhase === 'terceira' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 pt-0 border-t border-slate-900/60 space-y-4">
                  {thirdPhaseMatches.map(renderMatchRow)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Accordion 4: Finais (Creative Chaveamento Bracket View) */}
        <div className="border border-yellow-500/30 bg-slate-950/75 rounded-3xl overflow-hidden shadow-xl shadow-yellow-500/5">
          <button
            onClick={() => togglePhase('finais')}
            className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-yellow-500/10 flex items-center justify-center font-bold text-yellow-400 text-sm">
                🏆
              </div>
              <div>
                <h4 className="text-lg font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-2">
                  Playoffs Finais
                  <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
                </h4>
                <p className="text-xs text-yellow-500/80 font-mono mt-0.5">Sábado, 18 de Julho • Disputa Posições & Título</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-400 font-bold text-[10px] uppercase tracking-wider">Fase Final</span>
              <ChevronDown className={`w-5 h-5 text-yellow-500 transition-transform duration-300 ${openPhase === 'finais' ? 'rotate-180' : ''}`} />
            </div>
          </button>

          <AnimatePresence initial={false}>
            {openPhase === 'finais' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 pt-0 border-t border-slate-900/60 space-y-8">
                  
                  {/* Dynamic context explanation */}
                  <div className="flex items-start gap-3 bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl text-xs md:text-sm text-slate-400">
                    <Info className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-slate-200">Regulamento dos Playoffs:</p>
                      <ul className="list-disc pl-4 space-y-1 text-slate-400 font-mono text-[11px] md:text-xs">
                        <li>O <strong className="text-yellow-400">campeão</strong> será decidido no confronto direto entre o <strong className="text-slate-100">1º colocado</strong> contra o <strong className="text-slate-100">2º colocado</strong> da tabela geral de classificação.</li>
                        <li>A disputa pelo <strong className="text-emerald-400">3º lugar</strong> será entre o <strong className="text-slate-100">3º colocado</strong> contra o <strong className="text-slate-100">4º colocado</strong>. Mesmo terminando na lanterna da fase regular, o último colocado tem a chance de subir de posição no playoff final!</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 pt-2">
                    
                    {/* Bracket Card 1: 3rd Place Match */}
                    <div className="relative group p-6 rounded-2xl border border-slate-800 bg-slate-900/30 overflow-hidden flex flex-col justify-between min-h-[180px]">
                      <div className="absolute top-0 left-0 w-12 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300" />
                      
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold font-mono uppercase text-emerald-400 tracking-wider bg-emerald-500/10 px-2 py-1 rounded-md">
                          Disputa de 3º Lugar
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">{thirdPlaceMatch?.time ?? '16:00'}</span>
                      </div>

                      {/* Teams matchup list */}
                      <div className="space-y-3">
                        {/* 3rd place team */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            {thirdPlace ? (
                              <>
                                <Flag countryId={thirdPlace.id} className="w-6 h-4 rounded" />
                                <span className="text-sm font-extrabold text-white uppercase">{thirdPlace.name}</span>
                              </>
                            ) : (
                              <>
                                <div className="w-6 h-4 bg-slate-800 rounded flex items-center justify-center text-[10px] text-slate-500 font-bold">??</div>
                                <span className="text-sm font-bold text-slate-500 uppercase">3º Colocado</span>
                              </>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 font-bold font-mono">Provisório</span>
                        </div>

                        <div className="flex items-center justify-center py-1">
                          <span className="text-[10px] text-slate-700 font-black tracking-widest font-mono">VS</span>
                        </div>

                        {/* 4th place team */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            {fourthPlace ? (
                              <>
                                <Flag countryId={fourthPlace.id} className="w-6 h-4 rounded" />
                                <span className="text-sm font-extrabold text-white uppercase">{fourthPlace.name}</span>
                              </>
                            ) : (
                              <>
                                <div className="w-6 h-4 bg-slate-800 rounded flex items-center justify-center text-[10px] text-slate-500 font-bold">??</div>
                                <span className="text-sm font-bold text-slate-500 uppercase">4º Colocado</span>
                              </>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 font-bold font-mono">Provisório</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-900 flex items-center gap-1.5 text-xs text-slate-400">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-pulse" />
                        <span>O último ainda tem chance de subir para 3º!</span>
                      </div>
                    </div>

                    {/* Bracket Card 2: Grand Final Championship */}
                    <div className="relative group p-6 rounded-2xl border border-yellow-500/30 bg-slate-900/50 overflow-hidden flex flex-col justify-between min-h-[180px] shadow-lg shadow-yellow-500/5">
                      <div className="absolute top-0 left-0 w-12 h-1 bg-gradient-to-r from-yellow-500 to-amber-300" />
                      
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold font-mono uppercase text-yellow-400 tracking-wider bg-yellow-500/10 px-2 py-1 rounded-md flex items-center gap-1">
                          <Trophy className="w-3 h-3" /> Grande Final
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">{grandFinalMatch?.time ?? '16:30'}</span>
                      </div>

                      {/* Teams matchup list */}
                      <div className="space-y-3">
                        {/* 1st place team */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            {firstPlace ? (
                              <>
                                <Flag countryId={firstPlace.id} className="w-6 h-4 rounded" />
                                <span className="text-sm font-extrabold text-white uppercase">{firstPlace.name}</span>
                              </>
                            ) : (
                              <>
                                <div className="w-6 h-4 bg-slate-800 rounded flex items-center justify-center text-[10px] text-slate-500 font-bold">??</div>
                                <span className="text-sm font-bold text-slate-500 uppercase">1º Colocado</span>
                              </>
                            )}
                          </div>
                          <span className="text-[10px] text-yellow-500 font-bold font-mono flex items-center gap-1">
                            🏆 Favorito
                          </span>
                        </div>

                        <div className="flex items-center justify-center py-1">
                          <span className="text-[10px] text-slate-700 font-black tracking-widest font-mono">VS</span>
                        </div>

                        {/* 2nd place team */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            {secondPlace ? (
                              <>
                                <Flag countryId={secondPlace.id} className="w-6 h-4 rounded" />
                                <span className="text-sm font-extrabold text-white uppercase">{secondPlace.name}</span>
                              </>
                            ) : (
                              <>
                                <div className="w-6 h-4 bg-slate-800 rounded flex items-center justify-center text-[10px] text-slate-500 font-bold">??</div>
                                <span className="text-sm font-bold text-slate-500 uppercase">2º Colocado</span>
                              </>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold font-mono">Desafiante</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-900 flex items-center gap-1.5 text-xs text-yellow-400">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                        <span>A grande decisão que define o campeão de 2026!</span>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
