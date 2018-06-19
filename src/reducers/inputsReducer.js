import * as types from '../actions/actionTypes';
import initialState from './initialState';

// using default params here
export default function inputReducer(state = initialState.inputs, action) {
  switch (action.type) {
    case types.LOAD_INPUTS_SUCCESS:
      return action.inputs;


    case types.UPDATE_INPUTS_SUCCESS:
      return Object.assign({}, action.inputs);

    default:
      return state;
  }
}
