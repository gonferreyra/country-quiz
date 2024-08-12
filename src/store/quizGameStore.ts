import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Answer, Question } from '../types/types';
import { Country } from '../types/interfaces';
import { generateQuestions } from '../lib/utils';

type QuizStore = {
  questions: Question[];
  answers: Answer[];
  showResults: boolean;
  currentQuestionIndex: number;
  setQuestions: (country: Country[]) => void;
  handleAnswer: (selectedOption: Country) => void;
  handleCurrentQuestionIndex: (index: number) => void;
  handleRestart: (country: Country[]) => void;
  handleShowResults: () => void;
};

export const useQuizGameStore = create<QuizStore>()(
  devtools(
    (set, get) => ({
      questions: [],
      answers: [],
      showResults: false,
      currentQuestionIndex: 0,
      setQuestions: (country) => {
        set((state) => ({
          // questions: generateQuestions(country),
          ...state,
          questions: generateQuestions(country),
        }));
      },
      handleAnswer: (selectedOption) => {
        const state = get();
        const newAnswers = [...state.answers];
        newAnswers[state.currentQuestionIndex] = {
          question: state.questions[state.currentQuestionIndex],
          selectedOption,
        };
        set({ answers: newAnswers });

        if (state.currentQuestionIndex < state.questions.length - 1) {
          setTimeout(() => {
            set({ currentQuestionIndex: state.currentQuestionIndex + 1 });
          }, 1000);
        } else {
          const nextUnansweredQuestionIndex = state.answers.findIndex(
            (answer) => !answer.selectedOption,
          );
          if (nextUnansweredQuestionIndex !== -1) {
            setTimeout(() => {
              set({ currentQuestionIndex: nextUnansweredQuestionIndex });
            }, 1000);
          } else {
            set({ showResults: true });
          }
        }
      },
      handleCurrentQuestionIndex: (index) => {
        set((state) => ({
          ...state,
          currentQuestionIndex: index,
        }));
      },
      handleRestart: (country) => {
        set((state) => ({
          ...state,
          questions: generateQuestions(country),
          answers: [],
          currentQuestionIndex: 0,
          showResults: false,
        }));
      },
      handleShowResults: () => {
        set((state) => ({
          ...state,
          showResults: true,
        }));
      },
    }),
    { name: 'quizGame' },
  ),
);
