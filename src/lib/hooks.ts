import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from './utils';

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
