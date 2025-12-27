
import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { Button } from './Button';
import { Terminal, Command, AlertTriangle } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  currentIndex: number;
  total: number;
  onNext: (selectedAnswer: string) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({ 
  question, 
  currentIndex, 
  total, 
  onNext 
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setSelected(null);
    setShowResult(false);
  }, [question]);

  const handleSelect = (option: string) => {
    if (showResult) return;
    setSelected(option);
  };

  const handleConfirm = () => {
    if (!selected) return;
    setShowResult(true);
  };

  return (
    <div className="max-w-3xl mx-auto w-full p-6">
      <div className="mb-8 border-l-4 border-[#00ff41] pl-4">
        <div className="flex items-center gap-2 mb-2 text-[10px] text-[#00ff41]/50 font-bold uppercase tracking-tighter">
          <Terminal className="w-3 h-3" /> NODE_SYSTEM_CHALLENGE: {currentIndex + 1}/{total}
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight leading-none mb-1">
          {">"} {question.question}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-8">
        {question.options.map((option, idx) => {
          let stateStyles = "border-[#00ff41]/20 text-[#00ff41]/60 hover:bg-[#00ff41]/5 hover:border-[#00ff41]/50";
          
          if (selected === option) {
            stateStyles = "border-[#00ff41] bg-[#00ff41]/10 text-[#00ff41]";
          }

          if (showResult) {
            if (option === question.correctAnswer) {
              stateStyles = "border-emerald-500 bg-emerald-500/20 text-emerald-400";
            } else if (selected === option) {
              stateStyles = "border-red-500 bg-red-500/20 text-red-500";
            } else {
              stateStyles = "border-gray-800 text-gray-700 opacity-50";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              disabled={showResult}
              className={`w-full text-left p-4 border-2 transition-all duration-100 flex items-center gap-4 group ${stateStyles}`}
            >
              <span className="text-xs opacity-50 font-black">[{String.fromCharCode(65 + idx)}]</span>
              <span className="font-bold text-sm tracking-tighter uppercase">{option}</span>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="border border-blue-500/30 bg-blue-900/10 p-4 mb-8">
          <div className="flex items-start gap-3">
            <Command className="w-4 h-4 text-blue-400 mt-1" />
            <div>
              <span className="block text-[10px] font-bold text-blue-400 mb-1">[SYSTEM_DECODE]</span>
              <p className="text-blue-100 text-xs leading-relaxed">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        {!showResult ? (
          <Button onClick={handleConfirm} disabled={!selected}>
            VALIDATE_INPUT
          </Button>
        ) : (
          <Button onClick={() => onNext(selected!)}>
            {currentIndex + 1 === total ? 'FINAL_REPORT' : 'NEXT_SEQUENCE'}
          </Button>
        )}
      </div>
    </div>
  );
};
