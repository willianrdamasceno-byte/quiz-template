
import React, { useState } from 'react';
import { QuizConfig } from '../types';
import { Button } from './Button';
import { Terminal, Cpu, Network, ShieldCheck, Code } from 'lucide-react';

interface QuizSetupProps {
  onStart: (config: QuizConfig) => void;
  isLoading: boolean;
}

export const QuizSetup: React.FC<QuizSetupProps> = ({ onStart, isLoading }) => {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<QuizConfig['difficulty']>('intermediária');
  const [count, setCount] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onStart({ topic, difficulty, count });
  };

  const itCategories = [
    { name: 'Hardware & Arquitetura', icon: <Cpu className="w-4 h-4" /> },
    { name: 'Redes de Computadores', icon: <Network className="w-4 h-4" /> },
    { name: 'Segurança da Informação', icon: <ShieldCheck className="w-4 h-4" /> },
    { name: 'Linguagens de Programação', icon: <Code className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-2xl mx-auto w-full p-6">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-black mb-2 glitch" data-text="CYBERSHELL_QUIZ">
          CYBERSHELL_QUIZ
        </h1>
        <p className="text-[#00ff41]/60 text-sm uppercase tracking-[0.3em]">
          Initializing Knowledge_Bypass.exe...
        </p>
      </div>

      <form onSubmit={handleSubmit} className="cyber-card p-8 space-y-8 bg-black">
        <div>
          <label className="block text-xs font-bold text-[#00ff41] mb-3 opacity-70">
            [SET_DOMAIN_TOPIC]
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Digite o subtema (ex: Linux, React, SSD...)"
            className="w-full bg-black border-b-2 border-[#00ff41]/30 p-4 text-[#00ff41] focus:outline-none focus:border-[#00ff41] transition-all placeholder:text-[#00ff41]/20 font-mono"
            required
          />
          <div className="flex flex-wrap gap-2 mt-4">
            {itCategories.map((t) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setTopic(t.name)}
                className="flex items-center gap-2 px-3 py-1 bg-black border border-[#00ff41]/20 text-[10px] text-[#00ff41]/70 hover:border-[#00ff41] transition-colors"
              >
                {t.icon} {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-bold text-[#00ff41] mb-3 opacity-70">
              [SET_PRIVILEGE_LEVEL]
            </label>
            <div className="grid grid-cols-3 gap-1">
              {(['básica', 'intermediária', 'avançada'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficulty(level)}
                  className={`py-2 text-[10px] border transition-all ${
                    difficulty === level 
                      ? 'bg-[#00ff41] text-black border-[#00ff41]' 
                      : 'border-[#00ff41]/30 text-[#00ff41]/50 hover:border-[#00ff41]'
                  }`}
                >
                  {level.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#00ff41] mb-3 opacity-70">
              [SET_DATA_CHUNKS]: {count}
            </label>
            <input
              type="range"
              min="3"
              max="15"
              step="1"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full accent-[#00ff41] bg-gray-900 h-1"
            />
          </div>
        </div>

        <Button 
          fullWidth 
          type="submit" 
          disabled={isLoading || !topic.trim()}
          className="py-4"
        >
          {isLoading ? 'EXECUTING...' : 'RUN_CHALLENGE'}
        </Button>
      </form>
    </div>
  );
};
