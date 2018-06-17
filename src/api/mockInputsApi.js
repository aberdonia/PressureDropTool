import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const inputs =
  {
    density: 1070, //kg/m3
    viscosity: 6.98, //cP
    flowrate: 0.5, //m3/hr
    outlet_pressure: 630 //bar
  };

class InputApi {
  static getAllInputs() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], inputs));
      }, delay);
    });
  }

  static saveInputs(inputs) {
    inputs = Object.assign({}, inputs); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        // const minPipeTitleLength = 3;
        // if (pipe.description.length < minPipeTitleLength) {
        //   reject(`Description must be at least ${minPipeTitleLength} characters.`);
        // }
        //Just simulating creation here.
        //Cloning so copy returned is passed by value rather than by reference.
        resolve(inputs);
      }, delay);
    });
  }


}

export default InputApi;
