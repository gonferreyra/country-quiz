import QuizGame from './components/QuizGame';
import { useCountryQuizContext } from './lib/hooks';

function App() {
  const { isLoading } = useCountryQuizContext();

  if (isLoading) {
    return (
      <div className='flex h-screen items-center justify-center bg-bg-image bg-cover bg-no-repeat'>
        <div className='text-white'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='flex h-screen items-center justify-center bg-bg-image bg-cover bg-no-repeat'>
      <QuizGame />
    </div>
  );
}

export default App;
