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
      console.log("PIPES HERE!!!!!!!!!!!!!!!!!!!");
      console.log(pipes);

      fetch('http://localhost:3330/computation', {
        method: 'POST',
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {pipes}
        )
      }).then(function(res){
        console.log(res);
      })

      return computeApi.computePipe(pipes).then(chartData => {
        dispatch(loadChartDataSuccess(chartData));
        console.dir(chartData); //works
      }).catch(error => {
        throw(error);
      });
    };
  }
