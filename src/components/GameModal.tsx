import { useEffect, useState } from 'react';
import { Answer, Question } from '../types/types';
import { Country } from '../types/interfaces';
import NumberBtn from './NumberBtn';

type GameModalProps = {
  countries: Country[];
  generateQuestions: (countries: Country[]) => Question[];
};

export default function GameModal({
  countries,
  generateQuestions,
}: GameModalProps) {
  const [questions, setQuestions] = useState(generateQuestions(countries));
  // console.log(questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  // console.log(answers);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (countries.length > 0) {
      setQuestions(generateQuestions(countries));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countries]);

  const handleCurrentQuestionIndex = (number: number) => {
    setCurrentQuestionIndex(number);
  };

  const handleAnswer = (selectedOption: Country) => {
    setAnswers([
      ...answers,
      { question: questions[currentQuestionIndex], selectedOption },
    ]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setQuestions(generateQuestions(countries));
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  if (showResults) {
    const correctAnswers = answers.filter(
      (answer) => answer.selectedOption === answer.question.correctCountry,
    ).length;

    return (
      <div>
        <h2>¡Felicitaciones!</h2>
        <p>
          Has contestado correctamente {correctAnswers} de {questions.length}{' '}
          preguntas.
        </p>
        <button onClick={handleRestart}>Jugar de nuevo</button>
      </div>
    );
  }

  const { correctCountry, options } = questions[currentQuestionIndex];

  return (
    <main className='flex min-h-[400px] w-[90%] max-w-[600px] flex-col gap-6 rounded-md bg-light-violet p-8 text-sm font-bold text-white/80'>
      <h2 className='text-center font-bold text-white/50'>Country Quiz</h2>
      <div className='mx-auto flex max-w-[350px] flex-wrap items-center justify-center gap-2'>
        {questions.map((_, index) => (
          <NumberBtn
            key={index}
            index={index}
            onClick={handleCurrentQuestionIndex}
            questionIndex={currentQuestionIndex}
          >
            {index + 1}
          </NumberBtn>
        ))}
      </div>
      <div className='flex flex-col gap-4'>
        <div>
          {questions[currentQuestionIndex].type === 'flag' ? (
            <p className='text-center'>
              Which country does this flag
              <span> {correctCountry.flag} </span>
              belong to?
            </p>
          ) : (
            <h2 className='text-center'>
              Which country is {correctCountry.capital?.[0]} the capital?
            </h2>
          )}
        </div>

        <div className='grid grid-cols-2 grid-rows-2 gap-4'>
          {options.map((option: Country, index: number) => (
            <button
              className='w-full rounded-md bg-violet py-4'
              key={index}
              onClick={() => handleAnswer(option)}
            >
              {option.name.common}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
