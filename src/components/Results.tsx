import { Question } from '../types/types';
import congratsImage from '../../public/congrats.svg';
import { Country } from '../types/interfaces';
import { useQuizGameStore } from '../store/quizGameStore';

type ResultsProps = {
  correctAnswers: number;
  questions: Question[];
  countries: Country[];
};

export default function Results({
  correctAnswers,
  questions,
  countries,
}: ResultsProps) {
  const handleRestart = useQuizGameStore((state) => state.handleRestart);
  return (
    <main className='flex min-h-[400px] w-[90%] max-w-[500px] flex-col items-center justify-center gap-6 rounded-md bg-lightViolet p-8 text-sm font-bold text-white/80'>
      <img src={congratsImage} alt='congratulations image' />
      <h2 className='text-2xl'>Congrats! You completed the quiz</h2>
      <p>
        You answer {correctAnswers} of {questions.length} correctly
      </p>
      <button
        className='h-12 w-32 rounded-lg bg-gradient-to-r from-gradient1 to-gradient2 text-sm'
        onClick={() => handleRestart(countries)}
      >
        Play again
      </button>
    </main>
  );
}
