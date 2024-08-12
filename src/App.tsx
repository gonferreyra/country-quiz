import toast, { Toaster } from 'react-hot-toast';
import QuizGame from './components/QuizGame';
import { useCountriesQuery } from './lib/hooks';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

function App() {
  const { isLoading, isError, error } = useCountriesQuery();

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message);
    }
  }, [isError, error]);

  return (
    <>
      <div className='flex h-screen items-center justify-center bg-bg-image bg-cover bg-no-repeat'>
        <motion.main
          initial='hidden'
          animate='visible'
          variants={{
            hidden: { opacity: 0, scale: 0.5 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.5 }}
          className='flex min-h-[400px] w-[90%] max-w-[750px] flex-col items-center justify-center gap-6 rounded-md bg-lightViolet p-8 text-sm font-bold text-white/80'
        >
          {isLoading && !isError ? (
            <div className='text-white'>Loading...</div>
          ) : isError ? (
            <div className='text-white'> {error?.message} </div>
          ) : (
            <QuizGame />
          )}
        </motion.main>
      </div>

      <Toaster position='top-right' />
    </>
  );
}

export default App;
