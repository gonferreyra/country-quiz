import { clsx } from 'clsx';
import { Answer } from '../types/types';

type NumberBtnProps = {
  children: React.ReactNode;
  index: number;
  onClick: (index: number) => void;
  questionIndex: number;
  answers: Answer[];
};

export default function NumberBtn({
  children,
  index,
  onClick,
  questionIndex,
  answers,
}: NumberBtnProps) {
  return (
    <button
      className={clsx('h-10 w-10 rounded-full bg-violet text-sm transition', {
        'from-gradient1 to-gradient2 bg-gradient-to-r':
          index === questionIndex || answers[index],
      })}
      onClick={() => onClick(index)}
    >
      {children}
    </button>
  );
}
