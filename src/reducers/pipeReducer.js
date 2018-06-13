import * as types from '../actions/actionTypes';
import initialState from './initialState';

// using default params here
export default function pipeReducer(state = initialState.pipes, action) {
  switch (action.type) {
    case types.LOAD_PIPE_SUCCESS:
      return action.pipes;

    case types.CREATE_PIPE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.pipe)
      ];

    case types.UPDATE_PIPE_SUCCESS:
      return [
        ...state.filter(pipe => pipe.id !== action.pipe.id),
        Object.assign({}, action.pipe)
      ];

    default:
      return state;
  }
}
