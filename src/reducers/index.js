import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import pipes from './pipeReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  ajaxCallsInProgress,
  pipes
});

export default rootReducer;
