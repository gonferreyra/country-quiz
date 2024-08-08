import QuizGame from './components/QuizGame';
import { useCountryQuizContext } from './lib/hooks';

function App() {
  const { isLoading } = useCountryQuizContext();

  return (
    <div className='flex h-screen items-center justify-center bg-bg-image bg-cover bg-no-repeat'>
      {isLoading ? <div className='text-white'>Loading...</div> : <QuizGame />}
    </div>
  );
}

export default App;
