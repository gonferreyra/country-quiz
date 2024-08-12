import { clsx } from 'clsx';
import { useQuizGameStore } from '../store/quizGameStore';

type NumberBtnProps = {
  children: React.ReactNode;
  index: number;
};

export default function NumberBtn({ children, index }: NumberBtnProps) {
  const currentQuestionIndex = useQuizGameStore(
    (state) => state.currentQuestionIndex,
  );
  const answers = useQuizGameStore((state) => state.answers);
  const handleCurrentQuestionIndex = useQuizGameStore(
    (state) => state.handleCurrentQuestionIndex,
  );

  return (
    <button
      className={clsx('h-10 w-10 rounded-full bg-violet text-sm transition', {
        'bg-gradient-to-r from-gradient1 to-gradient2 transition hover:scale-105 focus:scale-105':
          index === currentQuestionIndex || answers[index],
      })}
      onClick={() => handleCurrentQuestionIndex(index)}
    >
      {children}
    </button>
  );
}
