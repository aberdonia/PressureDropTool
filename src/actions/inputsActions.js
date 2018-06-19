import * as types from './actionTypes';
import inputsApi from "../api/mockInputsApi";
import {ajaxCallError, beginAjaxCall} from "./ajaxStatusActions";

export function loadInputsSuccess(inputs) {
  return {type: types.LOAD_INPUTS_SUCCESS, inputs};
}

export function updateInputsSuccess(inputs) {
  return {type: types.UPDATE_INPUTS_SUCCESS, inputs};
}

export function  loadInputs() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return inputsApi.getAllInputs().then(inputs => {
      dispatch(loadInputsSuccess(inputs));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveInputs(inputs) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return inputsApi.saveInputs(inputs).then(savedInputs => {
      dispatch(updateInputsSuccess(savedInputs));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
