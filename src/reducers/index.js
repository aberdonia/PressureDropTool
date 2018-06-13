import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import pipes from './pipeReducer';
import parameters from './parametersReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallsInProgress,
  pipes,
  parameters
});

export default rootReducer;
