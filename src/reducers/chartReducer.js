import * as types from '../actions/actionTypes';
import initialState from './initialState';

// using default params here
export default function chartReducer(state = initialState.chartData, action) {
  switch (action.type) {
    case types.LOAD_CHART_DATA_SUCCESS:
    debugger;
      return [
        ...state,
        Object.assign({}, action.chartData)
      ];

    default:
      return state;
  }
}
