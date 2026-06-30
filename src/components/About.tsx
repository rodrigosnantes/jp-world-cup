import React from 'react';
import { ShieldCheck, Heart, Sparkles, MapPin, Beer, History } from 'lucide-react';
import { GENERAL_STATS } from '../data';

export default function About() {
  const pillars = [
    {
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      title: 'Paixão pelo Futebol',
      desc: 'Mais que um hobby, para nós o futebol é uma religião semanal. Vibramos a cada passe, drible e gol como se estivéssemos numa final de Copa.'
    },
    {
      icon: <Sparkles className="w-8 h-8 text-yellow-400" />,
      title: 'Competição de Elite',
      desc: 'Buscamos o equilíbrio máximo. Nossas 4 seleções foram meticulosamente balanceadas com 6 craques em cada para garantir jogos disputados até o último segundo.'
    },
    {
      icon: <Beer className="w-8 h-8 text-amber-500" />,
      title: 'Resenha e Amizade',
      desc: 'O apito final é apenas o começo. Nossa verdadeira união acontece no churrasco pós-jogo, onde as rivalidades viram risadas e histórias eternas.'
    }
  ];

  return (
    <section id="about" className="py-24 px-4 md:px-8 max-w-6xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-sm font-bold tracking-widest text-emerald-400 uppercase">Quem Somos</h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-white">
          A INSTITUIÇÃO <span className="text-brand-yellow">JPFFS</span>
        </h3>
        <p className="text-slate-400 text-lg leading-relaxed">
          Fundada por amigos unidos pela paixão do futebol society, a JPFFS criou sua própria versão da Copa do Mundo.
        </p>
      </div>

      {/* Grid Pillars */}
      <div className="grid md:grid-cols-3 gap-8">
        {pillars.map((p, idx) => (
          <div 
            key={idx} 
            className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-emerald-500/30 transition-all duration-300 flex flex-col space-y-4 relative overflow-hidden group"
          >
            {/* Corner ambient glow on hover */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-colors" />
            
            <div className="p-3 bg-slate-950/60 rounded-xl w-fit border border-slate-800">
              {p.icon}
            </div>
            
            <h4 className="text-xl font-bold text-white tracking-tight">{p.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Quick Info & Rules Box */}
      <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Organização Geral</span>
              <h4 className="text-2xl md:text-3xl font-extrabold text-white">Especificações do Torneio</h4>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed">
              Nosso torneio é desenhado para recriar o clima tenso e glorioso de uma verdadeira Copa do Mundo FIFA, porém no formato de futebol society. Cada detalhe, desde as camisas personalizadas até a súmula oficial, foi planejado com carinho.
            </p>

            <div className="space-y-3 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Sede Oficial: {GENERAL_STATS.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <History className="w-5 h-5 text-yellow-400 shrink-0" />
                <span>Fórmula: Todos contra todos, os 2 melhores fazem a Grande Final</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-950/80 p-6 md:p-8 rounded-2xl border border-slate-800/80 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
              <h5 className="font-bold text-sm uppercase tracking-wider">Regras de Ouro</h5>
            </div>
            
            <ul className="space-y-3">
              {GENERAL_STATS.rules.map((rule, idx) => (
                <li key={idx} className="flex gap-3 text-slate-300 text-sm">
                  <span className="text-emerald-500 font-bold font-mono">0{idx + 1}.</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
