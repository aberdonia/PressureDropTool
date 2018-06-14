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
        let cumulative_length = [];
        let mean_diameter = [];
        let nonDimensional_Roughness = [];
        let fluid_rate = [];
        let fluid_veloicty = [];
        let reynolds = [];

        let correlation = [];
        let friction_factor = [];

        for (let i = 0; i < pipes.length; i++) {
          pipe_length.push(Math.sqrt(Math.pow(pipes[i].horizontal_change, 2) + Math.pow(pipes[i].vertical_change, 2)));
          mean_diameter.push(pipes[i].inner_diamter * Math.pow(1 + (inputs.volumetric_expansion / 100), 0.5));
          nonDimensional_Roughness.push(pipes[i].roughness / mean_diameter[i]);
          fluid_rate.push(inputs.required_flowrate / 3600 / pipes[i].cores);
          fluid_veloicty.push(fluid_rate[i] / (Math.PI * Math.pow((mean_diameter[i] / 1000 / 2), 2)));
          reynolds.push((inputs.density * fluid_veloicty[i] * mean_diameter[i] / 1000) / (inputs.viscosity / 1000));

          // switch to chosen fluid model: laminar, transitional, turbulent
          const ff_laminar = 64 / reynolds[i];
          const ff_colebrook = ComputationApi.colebrookFrictionCoefficient(nonDimensional_Roughness[i], reynolds[i]);
          if (reynolds[i] < data.Re_laminar_max) {
            correlation.push("Laminar");
            friction_factor.push(ff_laminar);
          } else if (reynolds[i] >= data.Re_laminar_max && reynolds[i] < data.Re_transitional_max) {
            correlation.push("Transitional");

            const ff_transitional = (reynolds[i] - data.Re_laminar_max) * (ff_colebrook - ff_laminar) / (data.Re_transitional_max - data.Re_laminar_max) + ff_laminar;
            friction_factor.push(ff_transitional);
          } else {
            correlation.push("Turbulent");
            friction_factor.push(ff_colebrook);
          }

          // not sure if neccessary
          if (i === 0) {
            cumulative_length.push(pipe_length[0]);
          } else {
            cumulative_length.push(cumulative_length[i - 1] + pipe_length[i]);
          }
        }

        debugger;
        // Validated
        console.log(pipe_length);
        // Validated
        console.log("cumulative_length:");
        console.log(cumulative_length);
        // Validated (same as inner_diameter, excel is rounding)
        console.log("mean diameter");
        console.log(mean_diameter);
        // Validated
        console.log("nonDimensional_Roughness");
        console.log(nonDimensional_Roughness);
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
        //
        console.log("friction_factor");
        console.log(friction_factor);


        resolve(pipes);
      }, delay);
    });
  }

  static colebrookFrictionCoefficient(nonDimRoughness, reynolds) {
    function f(x) {
      return -2 * Math.log10(nonDimRoughness / 3.7 + 2.51 / (reynolds * Math.sqrt(x))) - 1 / Math.sqrt(x);
    }

    return nr(f, 0.01);
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
