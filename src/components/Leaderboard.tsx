import React from 'react';
import { motion } from 'motion/react';
import { Trophy, ArrowUpRight, Award, Shield } from 'lucide-react';
import { TeamStanding } from '../types';
import Flag from './Flag';

interface LeaderboardProps {
  standings: TeamStanding[];
}

export default function Leaderboard({ standings }: LeaderboardProps) {
  return (
    <section id="leaderboard" className="py-24 px-4 md:px-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-sm font-bold tracking-widest text-emerald-400 uppercase font-mono">Classificação Geral</h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-white">Tabela da Competição</h3>
        <p className="text-slate-400">
          Acompanhe o desempenho de cada equipe. Os <span className="text-emerald-400 font-bold">2 melhores</span> se classificam direto para a disputa da Taça JPFFS na Grande Final!
        </p>
      </div>

      {/* Standings Table Card */}
      <div className="bg-slate-950/80 rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-xs font-mono uppercase tracking-widest bg-slate-900/40">
                <th className="py-5 px-6 text-center w-16">Pos</th>
                <th className="py-5 px-6">Seleção</th>
                <th className="py-5 px-4 text-center font-bold text-white">P</th>
                <th className="py-5 px-4 text-center">J</th>
                <th className="py-5 px-4 text-center text-emerald-400">V</th>
                <th className="py-5 px-4 text-center">E</th>
                <th className="py-5 px-4 text-center text-red-400">D</th>
                <th className="py-5 px-4 text-center">GP</th>
                <th className="py-5 px-4 text-center">GC</th>
                <th className="py-5 px-4 text-center font-bold text-slate-200">SG</th>
                <th className="py-5 px-6 text-center">Últimos</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-900">
              {standings.map((team, index) => {
                const isFinalist = index < 2; // Top 2 qualify
                const posNum = index + 1;
                
                return (
                  <tr 
                    key={team.teamId}
                    className={`transition-colors duration-150 ${
                      isFinalist ? 'bg-emerald-950/5' : 'hover:bg-slate-900/20'
                    }`}
                  >
                    {/* Position */}
                    <td className="py-5 px-6 text-center">
                      <div className="flex items-center justify-center">
                        {posNum === 1 ? (
                          <div className="w-8 h-8 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 flex items-center justify-center font-black text-sm">
                            🥇
                          </div>
                        ) : posNum === 2 ? (
                          <div className="w-8 h-8 rounded-full bg-slate-400/10 border border-slate-400/30 text-slate-300 flex items-center justify-center font-black text-sm">
                            🥈
                          </div>
                        ) : (
                          <span className="font-mono font-bold text-slate-500 text-sm">
                            {posNum}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Team Name */}
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <Flag countryId={team.teamId} className="w-8 h-6 rounded shadow-sm shrink-0" />
                        <div>
                          <span className="font-extrabold text-white text-base block sm:inline">
                            {team.name}
                          </span>
                          <span className="text-xs font-bold text-slate-500 font-mono sm:hidden block mt-0.5">
                            {team.shortName}
                          </span>
                        </div>
                        {isFinalist && (
                          <span className="hidden sm:inline-block text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            Zona de Final
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Points */}
                    <td className="py-5 px-4 text-center font-mono font-black text-lg text-emerald-400">
                      {team.points}
                    </td>

                    {/* Matches Played */}
                    <td className="py-5 px-4 text-center font-mono text-slate-300">
                      {team.played}
                    </td>

                    {/* Won */}
                    <td className="py-5 px-4 text-center font-mono text-emerald-400/90 font-medium">
                      {team.won}
                    </td>

                    {/* Drawn */}
                    <td className="py-5 px-4 text-center font-mono text-slate-400">
                      {team.drawn}
                    </td>

                    {/* Lost */}
                    <td className="py-5 px-4 text-center font-mono text-red-400/90 font-medium">
                      {team.lost}
                    </td>

                    {/* Goals For */}
                    <td className="py-5 px-4 text-center font-mono text-slate-400">
                      {team.goalsFor}
                    </td>

                    {/* Goals Against */}
                    <td className="py-5 px-4 text-center font-mono text-slate-400">
                      {team.goalsAgainst}
                    </td>

                    {/* Goal Difference */}
                    <td className={`py-5 px-4 text-center font-mono font-bold ${
                      team.goalsDifference > 0 
                        ? 'text-emerald-400' 
                        : team.goalsDifference < 0 
                          ? 'text-red-400' 
                          : 'text-slate-400'
                    }`}>
                      {team.goalsDifference > 0 ? `+${team.goalsDifference}` : team.goalsDifference}
                    </td>

                    {/* Small Status indicator bar for finals */}
                    <td className="py-5 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <div 
                          className={`w-3.5 h-3.5 rounded-full ${
                            isFinalist ? 'bg-emerald-500 animate-pulse' : 'bg-slate-800'
                          }`} 
                          title={isFinalist ? 'Classificado para a Final' : 'Eliminado da Final'}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Table Footnote */}
        <div className="p-4 bg-slate-900/30 border-t border-slate-900/80 text-center text-xs text-slate-500 font-mono">
          Vitória = 3 pts | Empate = 1 pt | Derrota = 0 pts. Os dois melhores disputarão o Troféu JPFFS na Finalíssima.
        </div>
      </div>
    </section>
  );
}
