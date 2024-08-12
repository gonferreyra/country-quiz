import { clsx } from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { handleCurrentQuestionIndex } from '../store/QuizGame/quizGameSlice';

type NumberBtnProps = {
  children: React.ReactNode;
  index: number;
};

export default function NumberBtn({ children, index }: NumberBtnProps) {
  const currentQuestionIndex = useSelector(
    (state: RootState) => state.quizGame.currentQuestionIndex,
  );
  const answers = useSelector((state: RootState) => state.quizGame.answers);
  const dispatch = useDispatch();

  return (
    <button
      className={clsx('h-10 w-10 rounded-full bg-violet text-sm transition', {
        'bg-gradient-to-r from-gradient1 to-gradient2 transition hover:scale-105 focus:scale-105':
          index === currentQuestionIndex || answers[index],
      })}
      onClick={() => dispatch(handleCurrentQuestionIndex(index))}
    >
      {children}
    </button>
  );
}
