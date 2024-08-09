import toast, { Toaster } from 'react-hot-toast';
import QuizGame from './components/QuizGame';
import { useCountryQuizContext } from './lib/hooks';
import { useEffect } from 'react';

function App() {
  const { isLoading, isError, error } = useCountryQuizContext();

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message);
    }
  }, [isError, error]);

  return (
    <>
      <div className='flex h-screen items-center justify-center bg-bg-image bg-cover bg-no-repeat'>
        <main className='flex min-h-[400px] w-[90%] max-w-[750px] flex-col items-center justify-center gap-6 rounded-md bg-lightViolet p-8 text-sm font-bold text-white/80'>
          {isLoading && !isError ? (
            <div className='text-white'>Loading...</div>
          ) : isError ? (
            <div className='text-white'> {error?.message} </div>
          ) : (
            <QuizGame />
          )}
        </main>
      </div>

      <Toaster position='top-right' />
    </>
  );
}

export default App;
