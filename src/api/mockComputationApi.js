import delay from './delay';

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
}
  
  
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

        for (let i = 0; i < pipes.length; i++) {
            pipe_length.push(Math.sqrt(Math.pow(pipes[i].horizontal_change,2) + Math.pow(pipes[i].vertical_change,2) ));
            mean_diameter.push(pipes[i].inner_diamter * Math.pow(1+(inputs.volumetric_expansion/100),0.5));
            NonDimensional_Roughness.push(pipes[i].roughness/mean_diameter[i]);
            fluid_rate.push(inputs.required_flowrate/3600/pipes[i].cores);
            fluid_veloicty.push(fluid_rate[i]/(Math.PI*Math.pow((mean_diameter[i]/1000/2),2)));
            reynolds.push((inputs.density*fluid_veloicty[i]*mean_diameter[i]/1000)/(inputs.viscosity/1000))
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
        console.log("mean diameter")
        console.log(mean_diameter)
        // Validated
        console.log("NonDimensional_Roughness")
        console.log(NonDimensional_Roughness)
        // Validated
        console.log("fluid_rate")
        console.log(fluid_rate)
        // Validated
        console.log("fluid_veloicty")
        console.log(fluid_veloicty)
        // 
        console.log("reynolds")
        console.log(reynolds)
        


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
  