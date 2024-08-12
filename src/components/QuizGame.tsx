import { Country } from '../types/interfaces';
import NumberBtn from './NumberBtn';
import Results from './Results';
import OptionsBtn from './OptionsBtn';
import { useEffect } from 'react';
import { useCountriesQuery } from '../lib/hooks';

import { motion } from 'framer-motion';
import { useQuizGameStore } from '../store/quizGameStore';

export default function QuizGame() {
  const { countries } = useCountriesQuery();

  const questions = useQuizGameStore((state) => state.questions);
  const answers = useQuizGameStore((state) => state.answers);
  const showResults = useQuizGameStore((state) => state.showResults);
  const currentQuestionIndex = useQuizGameStore(
    (state) => state.currentQuestionIndex,
  );
  const setQuestions = useQuizGameStore((state) => state.setQuestions);
  const handleShowResults = useQuizGameStore(
    (state) => state.handleShowResults,
  );

  useEffect(() => {
    // check if all questions have been answered
    if (
      countries &&
      answers.length === 9 &&
      !answers.some((answer) => answer === undefined)
    ) {
      handleShowResults();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, questions.length]);

  useEffect(() => {
    if (countries) {
      setQuestions(countries);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries]);

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const { correctCountry, options } = questions[currentQuestionIndex];

  if (showResults) {
    const correctAnswers = answers.filter(
      (answer) => answer.selectedOption === answer.question.correctCountry,
    ).length;

    return (
      <Results
        correctAnswers={correctAnswers}
        questions={questions}
        countries={countries}
      />
    );
  }

  return (
    <motion.div
      initial='hidden'
      animate='visible'
      variants={{
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1 },
      }}
    >
      <h2 className='text-center font-bold text-white/50'>Country Quiz</h2>
      <div className='mx-auto mt-4 flex max-w-[480px] flex-wrap items-center justify-center gap-2'>
        {questions.map((_, index) => (
          <NumberBtn key={index} index={index}>
            {index + 1}
          </NumberBtn>
        ))}
      </div>
      <div className='flex flex-col gap-4'>
        <div className='mx-auto max-w-[400px]'>
          {questions[currentQuestionIndex].type === 'flag' ? (
            <p className='mb-4 mt-6 text-center text-xl'>
              Which country does this flag
              <span> {correctCountry.flag} </span>
              belong to?
            </p>
          ) : (
            <p className='mb-4 mt-6 text-center text-xl'>
              Which country is {correctCountry.capital?.[0]} the capital?
            </p>
          )}
        </div>

        <div className='grid max-w-[480px] grid-cols-2 grid-rows-2 gap-4'>
          {options.map((option: Country, index: number) => (
            <OptionsBtn key={index} option={option} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
