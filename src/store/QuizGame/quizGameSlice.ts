import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { Answer, Question } from '../../types/types';
import { generateQuestions } from '../../lib/utils';
import { Country } from '../../types/interfaces';
import { RootState } from '../store';

type QuizStore = {
  questions: Question[];
  answers: Answer[];
  showResults: boolean;
  currentQuestionIndex: number;
};

const initialState: QuizStore = {
  questions: [],
  answers: [],
  showResults: false,
  currentQuestionIndex: 0,
};

const quizGameSlice = createSlice({
  name: 'quizGame',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = generateQuestions(action.payload);
    },
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
    handleShowResults: (state) => {
      state.showResults = true;
    },
    handleCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    handleAnswer: (state, action) => {
      const newAnswers = [...state.answers];
      newAnswers[state.currentQuestionIndex] = {
        question: state.questions[state.currentQuestionIndex],
        selectedOption: action.payload,
      };
      state.answers = newAnswers;
    },
    handleRestart: (state, action) => {
      state.questions = generateQuestions(action.payload);
      state.currentQuestionIndex = 0;
      state.answers = [];
      state.showResults = false;
    },
  },
});

export const {
  setQuestions,
  handleCurrentQuestionIndex,
  handleShowResults,
  handleRestart,
  handleAnswer,
} = quizGameSlice.actions;

export const handleAnswerAsync = (selectedOption: Country) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState().quizGame;
    dispatch(handleAnswer(selectedOption));

    if (state.currentQuestionIndex < state.questions.length - 1) {
      setTimeout(() => {
        dispatch(handleCurrentQuestionIndex(state.currentQuestionIndex + 1));
      }, 1000);
    } else {
      const nextUnansweredIndex = state.answers.findIndex(
        (answer) => !answer.selectedOption,
      );
      if (nextUnansweredIndex !== -1) {
        setTimeout(() => {
          dispatch(handleCurrentQuestionIndex(nextUnansweredIndex));
        }, 1000);
      } else {
        dispatch(handleShowResults());
      }
    }
  };
};

export default quizGameSlice.reducer;
