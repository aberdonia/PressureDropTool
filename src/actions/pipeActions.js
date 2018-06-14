import * as types from './actionTypes';
import pipesApi from "../api/mockPipeApi";
import {ajaxCallError, beginAjaxCall} from "./ajaxStatusActions";
import courseApi from "../api/mockCourseApi";
import {createCourseSuccess, updateCourseSuccess} from "./courseAction";

export function loadPipesSuccess(pipes) {
  return {type: types.LOAD_PIPE_SUCCESS, pipes};
}

export function createPipesSuccess(pipes) {
  return {type: types.CREATE_PIPE_SUCCESS, pipes};
}

export function updatePipesSuccess(pipes) {
  return {type: types.UPDATE_PIPE_SUCCESS, pipes};
}

export function  loadPipes() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return pipesApi.getAllPipes().then(pipes => {
      dispatch(loadPipesSuccess(pipes));
    }).catch(error => {
      throw(error);
    });
  };
}

export function savePipe(pipe) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return pipesApi.savePipe(pipe).then(savedPipe => {
        dispatch(createPipesSuccess(savedPipe));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
