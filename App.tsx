
import React, { useState } from 'react';
import { QuizConfig, Question, QuizResult } from './types';
import { generateQuiz, getAIResultFeedback } from './services/geminiService';
import { QuizSetup } from './components/QuizSetup';
import { QuizCard } from './components/QuizCard';
import { ScoreBoard } from './components/ScoreBoard';

enum AppState {
  SETUP,
  LOADING,
  PLAYING,
  RESULTS
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.SETUP);
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizResult['answers']>([]);
  const [finalResult, setFinalResult] = useState<QuizResult | null>(null);

  const startQuiz = async (quizConfig: QuizConfig) => {
    setState(AppState.LOADING);
    setConfig(quizConfig);
    try {
      const generatedQuestions = await generateQuiz(quizConfig);
      setQuestions(generatedQuestions);
      setCurrentIndex(0);
      setAnswers([]);
      setState(AppState.PLAYING);
    } catch (error) {
      console.error("Failed to generate quiz", error);
      alert("CRITICAL_ERROR: Failed to bypass database security.");
      setState(AppState.SETUP);
    }
  };

  const handleNext = async (selected: string) => {
    const isCorrect = selected === questions[currentIndex].correctAnswer;
    const newAnswers = [...answers, { questionId: questions[currentIndex].id, selected, isCorrect }];
    setAnswers(newAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const score = newAnswers.filter(a => a.isCorrect).length;
      setState(AppState.LOADING);
      
      try {
        const feedback = await getAIResultFeedback(score, questions.length, config?.topic || "");
        setFinalResult({
          score,
          total: questions.length,
          answers: newAnswers,
          aiComment: feedback
        });
        setState(AppState.RESULTS);
      } catch (e) {
        setFinalResult({ score, total: questions.length, answers: newAnswers });
        setState(AppState.RESULTS);
      }
    }
  };

  const restart = () => {
    setState(AppState.SETUP);
    setConfig(null);
    setQuestions([]);
    setFinalResult(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#00ff41] flex flex-col py-12 px-4 selection:bg-[#00ff41]/30">
      <main className="flex-1 flex items-center justify-center">
        {state === AppState.SETUP && (
          <QuizSetup onStart={startQuiz} isLoading={false} />
        )}

        {state === AppState.LOADING && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 border-2 border-[#00ff41]/20 border-t-[#00ff41] animate-spin"></div>
            <div className="text-center font-mono">
              <p className="text-xs uppercase tracking-[0.5em] mb-2">Accessing_Encrypted_Data</p>
              <p className="text-[10px] text-[#00ff41]/40">
                {config ? `Querying: ${config.topic.toUpperCase()}...` : 'Connecting...'}
              </p>
            </div>
          </div>
        )}

        {state === AppState.PLAYING && questions.length > 0 && (
          <QuizCard 
            question={questions[currentIndex]}
            currentIndex={currentIndex}
            total={questions.length}
            onNext={handleNext}
          />
        )}

        {state === AppState.RESULTS && finalResult && (
          <ScoreBoard result={finalResult} onRestart={restart} />
        )}
      </main>

      <footer className="mt-12 text-center text-[#00ff41]/20 text-[10px] font-mono tracking-widest">
        SYSTEM_MODEL: GEMINI-3-FLASH // TERMINAL_REV: 2.5.0
      </footer>
    </div>
  );
};

export default App;
