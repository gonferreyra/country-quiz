import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from './utils';
import { useContext } from 'react';
import { CountryQuizContext } from '../contexts/CountryQuizContextProvider';

export function useCountriesQuery() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchCountries,
    queryKey: ['countries'],
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
    retry: false,
  });

  const countries = data;

  return { countries, isLoading, isError, error };
}

export function useCountryQuizContext() {
  const context = useContext(CountryQuizContext);
  if (!context) {
    throw new Error(
      'useCountryQuizContext must be used within a CountryQuizContextProvider',
    );
  }

  return context;
}
