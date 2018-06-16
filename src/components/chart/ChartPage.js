import React, {Component} from 'react';
import {Bar, Scatter, Pie} from 'react-chartjs-2';
import {Link} from 'react-router';
import {connect} from "react-redux";
import SelectInput from "../common/SelectInput";

//TODO send data from computation to chartPage

const data = {
  labels: ['Scatter'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      showLine: true,
      backgroundColor: 'rgba(75,192,192,0.4)',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10
    }
  ]
};


class Chart extends Component {
  constructor(props) {
    super(props);


    this.buildData = this.buildData.bind(this);
  }

  buildData(staticData){
    debugger;
    staticData.datasets[0].data = this.props.chartData.pressure_profile;
    return data;

  }

  onChange(){
    console.log("on change");
  }


  render() {
    debugger;
    return (
      <div className="chart">
        <br/>
        <br/>
          <SelectInput name={"test"} label={"Chose data to display:"} onChange={this.onChange()} options={Object.keys(this.props.chartData)}
          />
        <Scatter
          data={this.buildData(data)}
        />
      </div>
    );
  }




}

function mapStateToProps(state, ownProps) {
  debugger;
  return {
    // defined in index.js reducers
    chartData: state.chartData
  };
}



export default connect(mapStateToProps)(Chart);
