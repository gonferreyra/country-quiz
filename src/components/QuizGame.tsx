import { Country } from '../types/interfaces';
import NumberBtn from './NumberBtn';
import Results from './Results';

import { useCountryQuizContext } from '../lib/hooks';
import OptionsBtn from './OptionsBtn';

export default function QuizGame() {
  const {
    questions,
    answers,
    showResults,
    currentQuestionIndex,
    handleRestart,
  } = useCountryQuizContext();

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
        handleRestart={handleRestart}
      />
    );
  }

  return (
    <>
      <h2 className='text-center font-bold text-white/50'>Country Quiz</h2>
      <div className='mx-auto flex max-w-[480px] flex-wrap items-center justify-center gap-2'>
        {questions.map((_, index) => (
          <NumberBtn key={index} index={index}>
            {index + 1}
          </NumberBtn>
        ))}
      </div>
      <div className='flex flex-col gap-4'>
        <div className='mx-auto max-w-[400px]'>
          {questions[currentQuestionIndex].type === 'flag' ? (
            <p className='my-4 text-center text-xl'>
              Which country does this flag
              <span> {correctCountry.flag} </span>
              belong to?
            </p>
          ) : (
            <h2 className='my-4 text-center text-xl'>
              Which country is {correctCountry.capital?.[0]} the capital?
            </h2>
          )}
        </div>

        <div className='grid max-w-[480px] grid-cols-2 grid-rows-2 gap-4'>
          {options.map((option: Country, index: number) => (
            <OptionsBtn key={index} option={option} />
          ))}
        </div>
      </div>
    </>
  );
}
