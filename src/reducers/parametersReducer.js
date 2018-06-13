import * as types from '../actions/actionTypes';
import initialState from './initialState';

// using default params here
export default function parametersReducer(state = initialState.parameters, action) {
  switch (action.type) {
    case types.LOAD_PARAMETERS_SUCCESS:
      return action.parameters;

    default:
      return state;
  }
}
