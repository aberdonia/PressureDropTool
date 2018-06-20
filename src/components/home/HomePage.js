import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Jamie McGee</h1>
        <h2>Pipeline Pressure Drop Calculator</h2>
        <br/>
        <p>Front-End: React, Redux and React-Router</p>
        <p>Back-End: Node.js, Express.js, TypeScript</p>
        <p>Styling: Bootstrap, Chart.js</p>
        <br/><br/>
        <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
      </div>
    );
  }
}

export default HomePage;
