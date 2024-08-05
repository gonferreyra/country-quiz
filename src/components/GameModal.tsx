import { useEffect, useState } from 'react';

export default function GameModal({ countries, generateQuestions }) {
  const [questions, setQuestions] = useState(generateQuestions(countries));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (countries.length > 0) {
      setQuestions(generateQuestions(countries));
    }
  }, [countries]);

  const handleAnswer = (selectedOption) => {
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

  const { type, correctCountry, options } = questions[currentQuestionIndex];

  return (
    <main className='flex min-h-[400px] w-[70%] flex-col gap-6 rounded-md bg-light-violet p-8 text-sm font-bold text-white/80'>
      <h2 className='text-center font-bold text-white/50'>Country Quiz</h2>
      <div className='mx-auto flex max-w-[350px] flex-wrap items-center justify-center gap-2'>
        <button className='text-l h-10 w-10 rounded-full bg-violet'>1</button>
        <button className='text-l h-10 w-10 rounded-full bg-violet'>2</button>
        <button className='text-l h-10 w-10 rounded-full bg-violet'>3</button>
        <button className='text-l h-10 w-10 rounded-full bg-violet'>4</button>
        <button className='text-l h-10 w-10 rounded-full bg-violet'>5</button>
        <button className='text-l h-10 w-10 rounded-full bg-violet'>6</button>
        <button className='text-l h-10 w-10 rounded-full bg-violet'>7</button>
        <button className='text-l h-10 w-10 rounded-full bg-violet'>8</button>
        <button className='text-l h-10 w-10 rounded-full bg-violet'>9</button>
        <button className='text-l h-10 w-10 rounded-full bg-violet'>10</button>
      </div>
      <div className='flex flex-col gap-4'>
        {type === 'flag' ? (
          <div className=''>
            <p className='text-center'>
              Which country does this flag
              <span> {correctCountry.flag} </span>
              belong to?
            </p>
          </div>
        ) : (
          <>
            <h2 className='text-center'>
              Which country is {correctCountry.capital[0]} the capital?
            </h2>
          </>
        )}
        <div className='grid grid-cols-2 grid-rows-2 gap-4'>
          {options.map((option, index) => (
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
