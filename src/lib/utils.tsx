import { Country } from '../types/interfaces';
import { Question } from '../types/types';

const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export async function fetchCountries() {
  await sleep(1000);

  const res = await fetch('https://restcountries.com/v3.1/all');

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message);
  }

  const data = await res.json();
  return data;
}

// get random country
export const getRandomElement = (arr: Country[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export const generateQuestion = (
  countries: Country[],
  type: 'flag' | 'capital',
) => {
  const correctCountry = getRandomElement(countries);
  const incorrectCountries = countries
    .filter((country) => country !== correctCountry)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return {
    type,
    correctCountry,
    options: shuffleArrayCountrys([correctCountry, ...incorrectCountries]),
  };
};

export const shuffleArrayCountrys = (array: Country[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export const shuffleArrayQuestions = (array: Question[]): Question[] => {
  return array.sort(() => Math.random() - 0.5);
};

export const generateQuestions = (countries: Country[]) => {
  const question: Question[] = [];

  for (let i = 0; i < 5; i++) {
    question.push(generateQuestion(countries, 'flag'));
    question.push(generateQuestion(countries, 'capital'));
  }

  return shuffleArrayQuestions(question);
};
