import * as types from '../actions/actionTypes';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
  question: {
    qnNum: 0,
    answered: false,
  },
  questions: [],
  isLoading: false,
  error: {
    message: '',
    redirect: false,
  },
};

const trivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case types.REQUEST_TRIVIA_QUESTIONS:
    return { ...state, isLoading: true };
  case types.GET_TRIVIA_QUESTIONS:
    return { ...state, questions: action.questions, isLoading: false };
  case types.GET_FETCH_ERROR:
    return {
      ...state,
      error: { message: action.error, redirect: true },
      isLoading: false,
    };
  case types.UPDATE_SCORE:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default trivia;
