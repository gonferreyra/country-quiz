import { Country } from '../types/interfaces';
import NumberBtn from './NumberBtn';
import clsx from 'clsx';

import correctAnswerImg from '/Check_round_fill.svg';
import wrongAnswerImg from '/Close_round_fill.svg';
import Results from './Results';

import { useCountryQuizContext } from '../lib/hooks';

export default function QuizGame() {
  const {
    questions,
    answers,
    showResults,
    currentQuestionIndex,
    handleRestart,
    handleCurrentQuestionIndex,
    handleAnswer,
  } = useCountryQuizContext();

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

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

  const { correctCountry, options } = questions[currentQuestionIndex];

  const getButtonClass = (option: Country) => {
    const answer = answers[currentQuestionIndex];
    if (answer) {
      if (answer.selectedOption === option) {
        return 'bg-gradient-to-r from-gradient1 to-gradient2';
      }
    }
    return 'bg-violet'; // Default class
  };

  const getButtonContent = (option: Country) => {
    const answer = answers[currentQuestionIndex];
    if (answer) {
      if (answer.selectedOption === option) {
        return (
          <p className='flex items-center justify-center gap-2'>
            {option.name.common}
            <img
              src={
                answer.selectedOption === answer.question.correctCountry
                  ? correctAnswerImg
                  : wrongAnswerImg
              }
            />
          </p>
        );
      } else if (option === answer.question.correctCountry) {
        return (
          <p className='flex items-center justify-center gap-2'>
            {option.name.common}
            <img src={correctAnswerImg} />
          </p>
        );
      }
    }
    return (
      <p className='flex items-center justify-center gap-2'>
        {option.name.common}
      </p>
    );
  };

  return (
    <main className='flex min-h-[400px] w-[90%] max-w-[600px] flex-col gap-6 rounded-md bg-lightViolet p-8 text-sm font-bold text-white/80'>
      <h2 className='text-center font-bold text-white/50'>Country Quiz</h2>
      <div className='mx-auto flex max-w-[350px] flex-wrap items-center justify-center gap-2'>
        {questions.map((_, index) => (
          <NumberBtn
            key={index}
            index={index}
            onClick={handleCurrentQuestionIndex}
            questionIndex={currentQuestionIndex}
            answers={answers}
          >
            {index + 1}
          </NumberBtn>
        ))}
      </div>
      <div className='flex flex-col gap-4'>
        <div>
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

        <div className='grid grid-cols-2 grid-rows-2 gap-4'>
          {options.map((option: Country, index: number) => (
            <button
              className={clsx(
                'w-full rounded-md bg-violet py-4 hover:bg-gradient-to-r hover:from-gradient1 hover:to-gradient2',
                getButtonClass(option),
              )}
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={!!answers[currentQuestionIndex]}
            >
              {getButtonContent(option)}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
