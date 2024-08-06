import { Question } from '../types/types';
import congratsImage from '../../public/congrats.svg';

type ResultsProps = {
  correctAnswers: number;
  questions: Question[];
  handleRestart: () => void;
};

export default function Results({
  correctAnswers,
  questions,
  handleRestart,
}: ResultsProps) {
  return (
    <main className='bg-lightViolet flex min-h-[400px] w-[90%] max-w-[500px] flex-col items-center justify-center gap-6 rounded-md p-8 text-sm font-bold text-white/80'>
      <img src={congratsImage} alt='congratulations image' />
      <h2 className='text-2xl'>Congrats! You completed the quiz</h2>
      <p>
        You answer {correctAnswers} of {questions.length} correctly
      </p>
      <button
        className='from-gradient1 to-gradient2 h-12 w-32 rounded-lg bg-gradient-to-r text-sm'
        onClick={handleRestart}
      >
        Play again
      </button>
    </main>
  );
}
