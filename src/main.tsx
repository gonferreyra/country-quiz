import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CountryQuizContextProvider from './contexts/CountryQuizContextProvider.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CountryQuizContextProvider>
        <App />
      </CountryQuizContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
