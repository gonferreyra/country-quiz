import { clsx } from 'clsx';
import { useCountryQuizContext } from '../lib/hooks';

type NumberBtnProps = {
  children: React.ReactNode;
  index: number;
};

export default function NumberBtn({ children, index }: NumberBtnProps) {
  const { answers, currentQuestionIndex, handleCurrentQuestionIndex } =
    useCountryQuizContext();

  return (
    <button
      className={clsx('h-10 w-10 rounded-full bg-violet text-sm transition', {
        'bg-gradient-to-r from-gradient1 to-gradient2':
          index === currentQuestionIndex || answers[index],
      })}
      onClick={() => handleCurrentQuestionIndex(index)}
    >
      {children}
    </button>
  );
}
