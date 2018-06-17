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
  debugger;
  return function (dispatch) {
    dispatch(beginAjaxCall());
    debugger;
    return inputsApi.getAllInputs().then(inputs => {
      dispatch(loadInputsSuccess(inputs));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveInputs(inputs) {
  return function (dispatch, getState) {
    debugger;
    dispatch(beginAjaxCall());
    return inputsApi.saveInputs(inputs).then(savedInputs => {
      dispatch(updateInputsSuccess(savedInputs));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
