import * as types from './actionTypes';
// import computeApi from "../api/mockComputationApi";
import {ajaxCallError, beginAjaxCall} from "./ajaxStatusActions";

export function loadChartDataSuccess(chartData) {
  return {type: types.LOAD_CHART_DATA_SUCCESS, chartData};
}

export function loadChartData(props, state) {
  return function (dispatch) {
    debugger;
    dispatch(beginAjaxCall());

    try {
    let sendObj = {};
    sendObj.pipes = props.pipes;
    sendObj.inputs = state.inputs;
    let str = JSON.stringify(sendObj);
    return fetch('http://localhost:3330/computation', {
        method: 'POST',
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: str
      }).then(function (res) {
        console.log(res);
        res.json().then(chartData => {
          console.log(chartData);
          dispatch(loadChartDataSuccess(chartData));
        });
      });
    } catch (e) {
      console.log(e);
      return;
    }


    // return computeApi.computePipe(props.pipes).then(chartData => {
    //   dispatch(loadChartDataSuccess(chartData));
    //   console.dir(chartData); //works
    // }).catch(error => {
    //   throw(error);
    // });
  };
}
