import clsx from 'clsx';
import correctAnswerImg from '/Check_round_fill.svg';
import wrongAnswerImg from '/Close_round_fill.svg';
import { useCountryQuizContext } from '../lib/hooks';
import { Country } from '../types/interfaces';

type OptionsBtnProps = {
  option: Country;
};

export default function OptionsBtn({ option }: OptionsBtnProps) {
  const { answers, currentQuestionIndex, handleAnswer } =
    useCountryQuizContext();

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
    <button
      className={clsx(
        'w-full rounded-md bg-violet py-4 hover:bg-gradient-to-r hover:from-gradient1 hover:to-gradient2',
        getButtonClass(option),
      )}
      onClick={() => handleAnswer(option)}
      disabled={!!answers[currentQuestionIndex]}
    >
      {getButtonContent(option)}
    </button>
  );
}
