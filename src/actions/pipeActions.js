import * as types from './actionTypes';

export function loadPipesSuccess(courses) {
  return {type: types.LOAD_PIPE_SUCCESS, courses};
}

export function createPipesSuccess(course) {
  return {type: types.CREATE_PIPE_SUCCESS, course};
}

export function updatePipesSuccess(course) {
  return {type: types.UPDATE_PIPE_SUCCESS, course};
}


