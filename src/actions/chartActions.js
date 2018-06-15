import * as types from './actionTypes';
import computeApi from "../api/mockComputationApi";
import {ajaxCallError, beginAjaxCall} from "./ajaxStatusActions";

export function loadChartDataSuccess(chartData) {
    return {type: types.LOAD_CHART_DATA_SUCCESS, chartData};
  }

export function  loadChartData(pipes) {
    return function (dispatch) {
        debugger;
      dispatch(beginAjaxCall());
      return computeApi.computePipe(pipes).then(chartData => {
        dispatch(loadChartDataSuccess(chartData));
        console.log(`chartData ${JSON.stringify(chartData)}`); //works
        console.dir(chartData); //works
      }).catch(error => {
        throw(error);
      });
    };
  }