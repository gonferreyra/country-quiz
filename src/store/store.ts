import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import quizGameReducer from './QuizGame/quizGameSlice';

export const store = configureStore({
  reducer: {
    quizGame: quizGameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
