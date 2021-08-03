import * as types from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  email: '',
  picture: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case types.GET_PLAYER_INFO:
    return { ...state, ...action.info };
  default:
    return state;
  }
};

export default user;
