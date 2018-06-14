import React, {PropTypes} from 'react';
import {browserHistory, Link} from 'react-router';
import PipeRow from '../pipe/PipeRow';
import AddPipeRow from "../pipe/AddPipeRow";
import PipeList from "./PipeList";
import {connect} from "react-redux";
import * as pipeActions from "../../actions/pipeActions";
import {bindActionCreators} from "redux";
import TextInput from "../common/TextInput";
import toastr from "toastr";

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
      // use this saving state to indicate when button is pressed and api call getting carried out, provide better UI feedback
      // could use a reducer, but this is fleeting data that rest of app doesn't care about, so no point
      saving: false
    };

    // to ensure we have proper 'this' context when updatePipeState is called
    this.updatePipeState = this.updatePipeState.bind(this);
    this.savePipe = this.savePipe.bind(this);
  }

  // use this to update the state (see constrctor *). react life cycle function.
  // runs when react thinks function has changed (sometimes does it too much)
  componentWillReceiveProps(nextProps) {
    // this.setState({pipe: Object.assign({}, nextProps.pipe)});
    // validate that the props have actually changed.
    if (this.props != nextProps) {
      // TODO: add duplicate validation this.props.pipe.description != nextProps.pipe.description
      // Necessary to populate form when existing course is loaded directly.
      console.log(nextProps);
      debugger;
      this.setState({pipe: Object.assign({}, nextProps.pipe)});
    }
  }

  updatePipeState(event) {
    const field = event.target.name;
    let pipe = Object.assign({}, this.state.pipe);
    pipe[field] = event.target.value;
    return this.setState({pipe: pipe});
  }

  savePipe(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.savePipe(this.state.pipe)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  // use promise in saveCourse() to provide better UI. waits for api call to complete before changing page
  redirect() {
    this.setState({saving: false});
    toastr.success('Pipe saved');
    this.context.router.push('/pipes');
  }

  render() {
    console.log(this.props);
    console.log(this.state);

    let {pipes} = this.props;
    const {parameters} = this.props;

    return (
      <div>
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
        <div className={"form-group row"}>
          <AddPipeRow
            pipe={this.state.pipe}
            onChange={this.updatePipeState}
            onSave={this.savePipe}
            parameters={this.state.parameters}
            errors={this.state.errors}
          />
        </div>
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
  actions: PropTypes.object.isRequired
};

// Pull in the React Router context so router is available on this.context.router.
// Context is a global variable used by libraries but we should avoid.
PipesPage.contextTypes = {
  router: PropTypes.object
};




function mapStateToProps(state, ownProps) {
  return {
    // defined in index.js reducers
    pipes: state.pipes,
    parameters: state.parameters
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(pipeActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(PipesPage);
