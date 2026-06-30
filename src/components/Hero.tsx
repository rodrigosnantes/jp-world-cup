import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Users, Play } from 'lucide-react';
import { Team, Match } from '../types';
import Flag from './Flag';
import logo from '../assets/logo-white.png';

interface HeroProps {
  teams: Team[];
  matches: Match[];
  onScrollToSection: (id: string) => void;
}

export default function Hero({ teams, matches, onScrollToSection }: HeroProps) {
  return (
    <header className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 md:px-8 overflow-hidden stadium-glow bg-grid-pattern">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-emerald-500/10 via-blue-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl text-center space-y-8 flex flex-col items-center">
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-2"
        >
          <Trophy className="w-4 h-4 text-brand-yellow animate-pulse" />
          Jogadores profissionais de futebol de final de semana
        </motion.div>

        {/* Brand Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.05 }}
        >
          <img
            src={logo}
            alt="JPFFS"
            className="h-28 md:h-40 w-auto object-contain mx-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* Brand Main Title */}
        <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tight uppercase"
          >
            Copa <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-emerald-400 to-blue-500">JPFFS</span> 2026
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            A história da nossa amizade escrita em campo. Uma competição de alto nível disputada por 4 seleções históricas e 24 atletas implacáveis.
          </motion.p>
        </div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <button 
            id="btn-see-matches"
            onClick={() => onScrollToSection('matches')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold tracking-wide shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            Ver Tabela de Jogos
          </button>
          
          <button 
            id="btn-see-teams"
            onClick={() => onScrollToSection('teams')}
            className="px-8 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white border border-slate-700 font-bold tracking-wide transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Users className="w-5 h-5" />
            Conhecer as Seleções
          </button>
        </motion.div>

        {/* Quick Dynamic Tournament Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-xl grid grid-cols-2 gap-4 mt-12 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md"
        >
          <div className="flex flex-col items-center justify-center p-4 border-r border-slate-800">
            <span className="text-emerald-400 font-mono text-4xl md:text-5xl font-black">4</span>
            <span className="text-slate-400 text-xs md:text-sm font-semibold uppercase tracking-wider mt-2">Seleções Rivais</span>
          </div>

          <div className="flex flex-col items-center justify-center p-4">
            <span className="text-yellow-400 font-mono text-4xl md:text-5xl font-black">
              {teams.reduce((acc, t) => acc + t.players.length, 0)}
            </span>
            <span className="text-slate-400 text-xs md:text-sm font-semibold uppercase tracking-wider mt-2">Atletas Elite</span>
          </div>
        </motion.div>

        {/* Flag Row ticker */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center justify-center gap-6 md:gap-12 mt-8 py-3 px-6 bg-slate-950/40 rounded-full border border-slate-800/40"
        >
          {teams.map(team => (
            <div 
              key={team.id} 
              className="flex items-center gap-2 group cursor-pointer"
              onClick={() => onScrollToSection('teams')}
            >
              <Flag countryId={team.id} className="w-8 h-5 md:w-9 md:h-6 rounded shadow-sm group-hover:scale-110 transition-transform duration-200" />
              <span className="text-xs md:text-sm font-bold text-slate-400 group-hover:text-white uppercase tracking-wider">{team.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Down arrow or indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <span className="text-xs font-mono tracking-widest uppercase">Rolar para baixo</span>
      </div>
    </header>
  );
}
