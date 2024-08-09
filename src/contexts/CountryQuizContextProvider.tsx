import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Country } from '../types/interfaces';
import { useCountriesQuery } from '../lib/hooks';
import { Answer, Question } from '../types/types';
import { generateQuestions } from '../lib/utils';

type CountryStore = {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  questions: Question[];
  answers: Answer[];
  showResults: boolean;
  currentQuestionIndex: number;
  handleRestart: () => void;
  handleCurrentQuestionIndex: (number: number) => void;
  handleAnswer: (selectedOption: Country) => void;
};

export const CountryQuizContext = createContext<CountryStore | null>(null);

export default function CountryQuizContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { countries, isLoading, isError, error } = useCountriesQuery();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);

  // handlers
  const handleCurrentQuestionIndex = useCallback((number: number) => {
    setCurrentQuestionIndex(number);
  }, []);

  const findNextUnansweredQuestionIndex = useCallback((answers: Answer[]) => {
    return answers.findIndex((answer) => !answer);
  }, []);

  const handleAnswer = useCallback(
    (selectedOption: Country) => {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = {
        question: questions[currentQuestionIndex],
        selectedOption,
      };
      setAnswers(newAnswers);

      if (currentQuestionIndex < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }, 1000);
      } else {
        const nextUnansweredIndex = findNextUnansweredQuestionIndex(newAnswers);
        if (nextUnansweredIndex !== -1) {
          setTimeout(() => {
            setCurrentQuestionIndex(nextUnansweredIndex);
          }, 1000);
        } else {
          setShowResults(true);
        }
      }
    },
    [answers, currentQuestionIndex, questions, findNextUnansweredQuestionIndex],
  );

  const handleRestart = useCallback(() => {
    setQuestions(generateQuestions(countries));
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  }, [countries]);

  // effects
  useEffect(() => {
    if (countries) {
      setQuestions(generateQuestions(countries));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries]);

  useEffect(() => {
    // check if all questions have been answered
    if (
      countries &&
      answers.length === questions.length &&
      !answers.some((answer) => answer === undefined)
    ) {
      setShowResults(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, questions.length]);

  const contextValue = useMemo(
    () => ({
      isLoading,
      isError,
      error,
      questions,
      answers,
      showResults,
      currentQuestionIndex,
      handleRestart,
      handleCurrentQuestionIndex,
      handleAnswer,
    }),
    [
      isLoading,
      isError,
      error,
      questions,
      answers,
      showResults,
      currentQuestionIndex,
      handleRestart,
      handleCurrentQuestionIndex,
      handleAnswer,
    ],
  );

  return (
    <CountryQuizContext.Provider value={contextValue}>
      {children}
    </CountryQuizContext.Provider>
  );
}
