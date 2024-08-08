import { createContext, useEffect, useState } from 'react';
import { Country } from '../types/interfaces';
import { useCountriesQuery } from '../lib/hooks';
import { Answer, Question } from '../types/types';
import { generateQuestions } from '../lib/utils';

type CountryStore = {
  countries: Country[];
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
  const handleCurrentQuestionIndex = (number: number) => {
    setCurrentQuestionIndex(number);
  };

  const handleAnswer = (selectedOption: Country) => {
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
  };

  const findNextUnansweredQuestionIndex = (answers: Answer[]) => {
    return answers.findIndex((answer) => !answer);
  };

  const handleRestart = () => {
    setQuestions(generateQuestions(countries));
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  };

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

  return (
    <CountryQuizContext.Provider
      value={{
        countries,
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
      }}
    >
      {children}
    </CountryQuizContext.Provider>
  );
}
