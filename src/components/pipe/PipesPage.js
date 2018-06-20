import React, {PropTypes} from 'react';
import AddPipeRow from "../pipe/AddPipeRow";
import PipeList from "./PipeList";
import {connect} from "react-redux";
import * as pipeActions from "../../actions/pipeActions";
import * as chartsActions from "../../actions/chartActions";
import * as inputsActions from "../../actions/inputsActions";
import {bindActionCreators} from "redux";
import toastr from "toastr";
import Inputs from "./Inputs";

class PipesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);

    // *state is set based on constructor. once page is initialised, changes to props.course
    // are not going be relefected because we are passing down state
    this.state = {
      pipe: Object.assign({}, this.props.pipe),
      parameters: Object.assign({}, this.props.parameters),
      errors: {},
      chartData: Object.assign({}, this.props.chartData),
      inputs: Object.assign({}, this.props.inputs),
      // use this saving state to indicate when button is pressed and api call getting carried out, provide better UI feedback
      // could use a reducer, but this is fleeting data that rest of app doesn't care about, so no point
      saving: false
    };

    // to ensure we have proper 'this' context when updatePipeState is called
    this.updatePipeState = this.updatePipeState.bind(this);
    this.savePipe = this.savePipe.bind(this);
    // need this to locate props in onCompute function
    this.onCompute = this.onCompute.bind(this);
    this.saveInputs = this.saveInputs.bind(this);
    this.updateInputState = this.updateInputState.bind(this);
  }

  // use this to update the state (see constrctor *). react life cycle function.
  // runs when react thinks function has changed (sometimes does it too much)
  componentWillReceiveProps(nextProps) {
    // this.setState({pipe: Object.assign({}, nextProps.pipe)});
    // validate that the props have actually changed.
    if (this.props != nextProps) {
      // TODO: add duplicate validation this.props.pipe.description != nextProps.pipe.description
      // Necessary to populate form when existing course is loaded directly.
      this.setState({pipe: Object.assign({}, nextProps.pipe)});

      // set chart props
      if ("nextProps.newChartData.geometry" in window) {
        this.setState({
        chartData: Object.assign({}, nextProps.newChartData, {geometry: nextProps.newChartData.geometry}, {pressure_profile: nextProps.newChartData.pressure_profile})
      });}
      
      // let newChartData = Object.assign({}, nextProps.chartData);
      // this.setState({chartData: newChartData});
      this.setState({inputs: Object.assign({}, nextProps.inputs)});
    }
  }

  updatePipeState(event) {
    const field = event.target.name;
    let pipe = Object.assign({}, this.state.pipe);
    pipe[field] = event.target.value;
    return this.setState({pipe: pipe});
  }

  updateInputState(event) {
    const field = event.target.name;
    let inputs = Object.assign({}, this.state.inputs);
    inputs[field] = event.target.value;
    return this.setState({inputs: inputs});
  }

  savePipe(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.pipeActions.savePipe(this.state.pipe)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  // return promise to onCompute
  saveInputs(){
    return new Promise((resolve, reject) => {
      this.setState({saving: true});
      this.props.actions.inputsActions.saveInputs(this.state.inputs)
      .then(() => resolve())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
        reject();
      });
    })
  }

  // use promise in saveCourse() to provide better UI. waits for api call to complete before changing page
  redirect() {
    this.setState({saving: false});
    toastr.success(`New pipe (${this.props.pipes.length}) saved
      "${this.props.pipes[this.props.pipes.length-1].description}"`);
    this.context.router.push('/pipes');
  }

  onCompute() {
    toastr.success(`Currently computing`);
    this.setState({saving: true});
    this.saveInputs().then(() => 
    {
      this.props.actions.chartActions.loadChartData(this.props, this.state)
      .then(() =>{
        toastr.success(`Finished computing`);
        console.log(`this.props.chartData ${this.props.chartData}`);
        // this.setState({chart});
        
    this.setState({saving: false});
        this.redirectToChart();
      });
    }
  )
  }

  redirectToChart() {
    this.setState({saving: false});
    this.context.router.push('/chart');
  }

  render() {

    let {pipes} = this.props;
    const {parameters} = this.props;
    let {inputs} = this.props;
    let inputParameters = Object.keys(inputs);

    return (
      <div>
        <br/><br/>
        <table className={"table"}>
          <thead>
          <tr>
            {inputParameters.map((input) =>
              <th key={input} align={"center"} className={"col-md-3 text-center"}> {input}</th>
            )}
          </tr>
          </thead>
        </table>
          <Inputs
            onChange={this.updateInputState}
            parameters={inputParameters}
            inputs={this.state.inputs}
            divClass={"field col-md-3"}
          />
          
        <br/><br/><br/><br/><br/>

        <table className={"table"}>
          <thead>
          <tr>
            {parameters.map((parameter) =>
              <th key={parameter.header}> {parameter.header}</th>
            )}
          </tr>
          </thead>
          <PipeList pipes={pipes}/>
        </table>
        <div className={"row"}>
            <input type="submit"
            value={this.props.pipes.length+1}
            className={"btn btn-primary pull-left col-md-1"}
            onClick={this.savePipe}/>
              <AddPipeRow
                pipe={this.state.pipe}
                onChange={this.updatePipeState}
                parameters={this.state.parameters}
                errors={this.state.errors}
              />
        </div>
        <br />
        <br />
        <br />
        <input type="submit"
            value={"Compute"}
            className={"btn btn-lg btn-block"}
            onClick={this.onCompute}/>
      </div>
    );
  }
}

//
// CourseListRow.propTypes = {
//   course: PropTypes.object.isRequired
// };

// allows us to type in empty fields


// dispatch validation
PipesPage.propTypes = {
  pipes: PropTypes.array.isRequired,
  pipe: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  parameters: PropTypes.object.isRequired,
  chartData: PropTypes.object.isRequired,
  inputs: PropTypes.object.isRequired
};

// Pull in the React Router context so router is available on this.context.router.
// Context is a global variable used by libraries but we should avoid.
PipesPage.contextTypes = {
  router: PropTypes.object
};




function mapStateToProps(state, ownProps) {
  debugger;
  return {
    // defined in index.js reducers
    pipes: state.pipes,
    parameters: state.parameters,
    chartData: state.chartData,
    inputs: state.inputs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      pipeActions: bindActionCreators(pipeActions, dispatch),
      chartActions: bindActionCreators(chartsActions, dispatch),
      inputsActions: bindActionCreators(inputsActions, dispatch)
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PipesPage);
