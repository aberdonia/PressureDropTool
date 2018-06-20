import React from 'react';

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <h2>React</h2>
        <ul>
          <li>Reusable Components: Build up views with small reusable components. Components contains its own logic which controls rendering. Properties are passed down from 'smart' container components, to 'dumb' presentational components.</li>
          <br/>
          <li>Virtual DOM: Avoid unnecessary and expensive updates of the DOM by using a virtual DOM stored in memory to determine what which components to update and the most efficient way to do so.</li>
          <br/>
          <li>JSX: This syntax is a mixture of HTML and JS. It allows easy mapping or binding of variables to components, a readable structure and an intuitive way to combine react components with HTML elements.</li>
        </ul>
        <h2>Redux</h2>
        <ul>
          <li>Predictable State Updates: Easily manage and orchestrate the data flows within the application</li>
          <br />
          <li>Centralised State: Reducers specify how the application state changes in response to Actions. This control over state and reducers make it easier to test app as well as log changes to data.</li>
        </ul>
        <h2>Router</h2>
        <ul>
          <li>R1</li>
        </ul>
      </div>
    );
  }
}

export default AboutPage;
