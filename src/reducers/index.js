import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import pipes from './pipeReducer';
import parameters from './parametersReducer';
import chartData from './chartReducer';
import inputs from './inputsReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallsInProgress,
  pipes,
  parameters,
  chartData,
  inputs
});

export default rootReducer;
