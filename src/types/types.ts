import { Country } from './interfaces';

export type Question = {
  type: 'flag' | 'capital';
  correctCountry: Country;
  options: Country[];
};

export type Answer = {
  question: Question;
  selectedOption: Country;
};
