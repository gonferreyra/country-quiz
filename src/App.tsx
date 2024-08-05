import { useEffect, useState } from 'react';
import GameModal from './components/GameModal';
import { Question } from './types/types';
import { Country } from './types/interfaces';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setIsLoading] = useState(true);
  // console.log(countries);

  // get random country
  const getRandomElement = (arr: Country[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  const generateQuestion = (countries: Country[], type: 'flag' | 'capital') => {
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

  const shuffleArrayCountrys = (array: Country[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const shuffleArrayQuestions = (array: Question[]): Question[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  const generateQuestions = (countries: Country[]) => {
    const question: Question[] = [];

    for (let i = 0; i < 5; i++) {
      question.push(generateQuestion(countries, 'flag'));
      question.push(generateQuestion(countries, 'capital'));
    }

    return shuffleArrayQuestions(question);
  };

  // initial fetch (change to tanstack query)
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex h-screen items-center justify-center bg-bg-image bg-cover bg-no-repeat'>
      <GameModal countries={countries} generateQuestions={generateQuestions} />
    </div>
  );
}

export default App;
