import React, {Component} from 'react';
import {Bar, Scatter, Pie} from 'react-chartjs-2';
import {Link} from 'react-router';

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
      pointHitRadius: 10,
      data: [
        { x: 0, y: 1051.19 },
        { x: 110, y: 851.59 },
        { x: 1123.651321, y: 911.56 },
        { x: 1130.651321, y: 911.39 },
        { x: 1161.651321, y: 911.09 },
        { x: 1497.545649, y: 934.76 },
        { x: 1517.545649, y: 934.57 }
      ]
    }
  ]
};


class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ['Boston', 'dssad', 'dsfddsf']
      }
    };
  }


  render() {
    return (
      <div className="chart">
        <Scatter
          data={data}
        />
      </div>
    );
  }
}

export default Chart;
