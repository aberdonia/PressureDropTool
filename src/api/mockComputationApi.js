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
    viscosity: 6.98, //cP
    outlet_pressure: 630 //bar
  };

const data =
  {
    Re_laminar_max: 2000,
    Re_transitional_max: 4000
  };

// Re	Flow Regime
// 0	Laminar
// 2000	Transitional
// 4000	Turbulent


class ComputationApi {

  static computePipe(pipes) {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // this is a bit static, could be imporved by making dynamic by having all the keys in an object,all of these 'columns' (array can be properties.) "object.keys returns an array of strings."
        const pipe_length = [];
        const cumulative_length = [];
        const mean_diameter = [];
        const nonDimensional_Roughness = [];
        const fluid_rate = [];
        const fluid_velocity = [];
        const reynolds = [];

        const correlation = [];
        const friction_factor = [];
        const pressure_drop_friction = [];
        const pressure_drop_static = [];
        const pressure_drop_overall = [];

        const distance_x = [0];
        const displacement_y = [0];

        // chart keys
        const geometry=[];

        const graphArray = [];

                

        for (let i = 0; i < pipes.length; i++) {
          pipe_length.push(Math.sqrt(Math.pow(pipes[i].horizontal_change, 2) + Math.pow(pipes[i].vertical_change, 2)));
          mean_diameter.push(pipes[i].inner_diamter * Math.pow(1 + (inputs.volumetric_expansion / 100), 0.5));
          nonDimensional_Roughness.push(pipes[i].roughness / mean_diameter[i]);
          fluid_rate.push(inputs.required_flowrate / 3600 / pipes[i].cores);
          fluid_velocity.push(fluid_rate[i] / (Math.PI * Math.pow((mean_diameter[i] / 1000 / 2), 2)));
          reynolds.push((inputs.density * fluid_velocity[i] * mean_diameter[i] / 1000) / (inputs.viscosity / 1000));

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

          pressure_drop_friction.push(friction_factor[i]*pipe_length[i]/(mean_diameter[i]/1000)*inputs.density*Math.pow(fluid_velocity[i],2)/2*0.00001);
          pressure_drop_static.push(inputs.density*9.81*pipes[i].vertical_change/100000);
          pressure_drop_overall.push(pressure_drop_friction[i]-pressure_drop_static[i]);


          
          distance_x.push(distance_x[i]+pipes[i].horizontal_change)
          displacement_y.push(displacement_y[i]-pipes[i].vertical_change)


          if (i === 0) {
            cumulative_length.push(pipe_length[0]);
          } else {
            debugger;
            cumulative_length.push(cumulative_length[i - 1] + pipe_length[i]);
          }

        // ****build graph inputs***    
        // geometry

        // const graphArrayObject = {};
        // graphArrayObject.x=distance_x[i];
        // graphArrayObject.y=displacement_y[i];
        // geometry.push(graphArrayObject);

        }

        console.log(geometry);


        //sum array
        const total_pressure_drop = pressure_drop_overall.reduce((a, b) => a + b, 0);
        
        // pressure drop
        let previousPressure=0;
        for (let i = 0; i < pressure_drop_overall.length+1; i++){
          let graphArrayObject = {};
          if (i === 0) {
            graphArrayObject.x=0;
            graphArrayObject.y=inputs.outlet_pressure+total_pressure_drop;
            previousPressure=inputs.outlet_pressure+total_pressure_drop;
          } else {
            graphArrayObject.x=cumulative_length[i-1];
            graphArrayObject.y=previousPressure-pressure_drop_overall[i-1];
            previousPressure -= pressure_drop_overall[i-1];
          }
          graphArray.push(graphArrayObject);
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
        console.log("fluid_velocity");
        console.log(fluid_velocity);
        // V
        console.log("reynolds");
        console.log(reynolds);
        // V
        console.log("correlation");
        console.log(correlation);
        // V
        console.log("friction_factor");
        console.log(friction_factor);
        // V
        console.log("pressure_drop_friction");
        console.log(pressure_drop_friction);
        // V
        console.log("pressure_drop_static");
        console.log(pressure_drop_static);
        // V
        console.log("pressure_drop_overall  ");
        console.log(pressure_drop_overall);

        //
        console.log(graphArray);
        console.log(total_pressure_drop);




        resolve(graphArray);
      }, delay);
    });
  }

  static colebrookFrictionCoefficient(nonDimRoughness, reynolds) {
    function f(x) {
      return -2 * Math.log10(nonDimRoughness / 3.7 + 2.51 / (reynolds * Math.sqrt(x))) - 1 / Math.sqrt(x);
    }

    return nr(f, 0.01);
  }


// static getChartData(){
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // console.log(`graphArray ${graphArray}`);
//       // console.log(`graphArray[0] ${graphArray[0]}`);
//       resolve(graphArray);
//     }, delay);
//   });
// }
}

export default ComputationApi;
