import { clsx } from 'clsx';

type NumberBtnProps = {
  children: React.ReactNode;
  index: number;
  onClick: (index: number) => void;
  questionIndex: number;
};

export default function NumberBtn({
  children,
  index,
  onClick,
  questionIndex,
}: NumberBtnProps) {
  return (
    <button
      className={clsx('text-l h-10 w-10 rounded-full bg-violet transition', {
        'from-gradient1 to-gradient2 bg-gradient-to-b': index === questionIndex,
      })}
      onClick={() => onClick(index)}
    >
      {children}
    </button>
  );
}
