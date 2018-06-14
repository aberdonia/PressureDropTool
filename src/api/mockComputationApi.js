import delay from './delay';
// https://github.com/scijs/newton-raphson-method for goal seeking.
var nr = require('newton-raphson-method');

const contants =
{
      x: 17,
      y: 2
};

const inputs =
{
    volumetric_expansion: 0,
    C_Value_Threshold_for_Erosion: 125,
    required_flowrate: 0.5, //m3/hr
    density: 1070, //kg/m3
    viscosity: 6.98 //cP
};

const data =
{
    Re_laminar_max: 2000,
    Re_transitional_max: 4000,
};

// Re	Flow Regime
// 0	Laminar
// 2000	Transitional
// 4000	Turbulent

  
  
  class ComputationApi {
    static getAllAuthors() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(Object.assign([], authors));
        }, delay);
      });
    }
  
    static computePipe(pipes) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {


        let pipe_length = [];
        let cummulative_length = [];
        let mean_diameter = [];
        let NonDimensional_Roughness = [];
        let fluid_rate = [];
        let fluid_veloicty = [];
        let reynolds = [];

        let correlation = [];
        let friction_factor = [];

        for (let i = 0; i < pipes.length; i++) {
            pipe_length.push(Math.sqrt(Math.pow(pipes[i].horizontal_change,2) + Math.pow(pipes[i].vertical_change,2) ));
            mean_diameter.push(pipes[i].inner_diamter * Math.pow(1+(inputs.volumetric_expansion/100),0.5));
            NonDimensional_Roughness.push(pipes[i].roughness/mean_diameter[i]);
            fluid_rate.push(inputs.required_flowrate/3600/pipes[i].cores);
            fluid_veloicty.push(fluid_rate[i]/(Math.PI*Math.pow((mean_diameter[i]/1000/2),2)));
            reynolds.push((inputs.density*fluid_veloicty[i]*mean_diameter[i]/1000)/(inputs.viscosity/1000));
            
            // switch to chosen fluid model: laminar, transitional, turbulent
            if (reynolds[i] < data.Re_laminar_max) {
                correlation.push("Laminar");
                friction_factor.push(64/reynolds[i]);
            } else if (reynolds[i] >= data.Re_laminar_max && reynolds[i] < data.Re_transitional_max) {
                correlation.push("Transitional");
                friction_factor.push(64/reynolds[i]);
                //TODO goalseeking for colebrook
                
            } else {
                correlation.push("Turbulent");
            }

            // not sure if neccessary
            if (i == 0) {
                cummulative_length.push(pipe_length[0]);
            } else{
                cummulative_length.push(cummulative_length[i-1]+pipe_length[i]);
            }
        }

        debugger;
        // Validated
        console.log(pipe_length);
        // Validated
        console.log("cummulative_length:");
        console.log(cummulative_length);
        // Validated (same as inner_diameter, excel is rounding)
        console.log("mean diameter");
        console.log(mean_diameter);
        // Validated
        console.log("NonDimensional_Roughness");
        console.log(NonDimensional_Roughness);
        // Validated
        console.log("fluid_rate");
        console.log(fluid_rate);
        // Validated
        console.log("fluid_veloicty");
        console.log(fluid_veloicty);
        // V
        console.log("reynolds");
        console.log(reynolds);
        // V
        console.log("correlation");
        console.log(correlation);
        


        resolve(pipes);
        }, delay);
      });
    }
  
    static deleteAuthor(authorId) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const indexOfAuthorToDelete = authors.findIndex(author => {
            author.id == authorId;
          });
          authors.splice(indexOfAuthorToDelete, 1);
          resolve();
        }, delay);
      });
    }
  }
  
  export default ComputationApi;
  