import * as types from '../actions/actionTypes';
import initialState from './initialState';

// using default params here
export default function courseReducer(state = initialState.pipes, action) {
  switch (action.type) {
    case types.LOAD_PIPE_SUCCESS:
      return action.pipes;

    case types.CREATE_PIPE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.piprd)
      ];

    case types.UPDATE_COURSE_SUCCESS:
      return [
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ];

    default:
      return state;
  }
}
