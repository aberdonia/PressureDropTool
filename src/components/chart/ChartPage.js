import React from 'react';
import {Scatter} from 'react-chartjs-2';
import {connect} from "react-redux";
import SelectInput from "../common/SelectInput";

//TODO send data from computation to chartPage

const inital_data = {
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


class Chart extends React.Component {
  constructor(props) {
    super(props);

    // add pressure_profile to data to show on load.
    const data = inital_data;
    debugger;
    data.datasets[0].data = this.props.chartData.pressure_profile;

    this.state = {
      // currentDataSet: {},
      // // identify current chart view
      // chartView: Object.keys(this.props.chartData)[0]
      chartData: this.props.chartData,
      data: data
    };

    // // display pressure profile initially
    // let temp_data = Object.assign({}, this.state.data);
    // temp_data.datasets[0].data = this.state.chartData.pressure_profile;
    // this.setState({data: temp_data});


    this.onChange=this.onChange.bind(this);
  }

  onChange(event){
    debugger;
    console.log(`onChange`);

    let temp_data = Object.assign({}, this.state.data);
    temp_data.datasets[0].data = this.state.chartData[event.target.value];
    return this.setState({data: temp_data});
  }


  render() {
    let data = this.state.data;

    debugger;
    console.log(data);
    return (
      <div className="chart">
        <br/>
        <br/>
          <SelectInput name={"test"} label={"Chose data to display:"} onChange={this.onChange} options={Object.keys(this.props.chartData)}
          />
        <Scatter
          data={data}
        />
      </div>
    );
  }

}

function mapStateToProps(state) {
  debugger;
  return {
    // defined in index.js reducers
    chartData: state.chartData
  };
}



export default connect(mapStateToProps)(Chart);
