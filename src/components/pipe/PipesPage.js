import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import PipeRow from '../pipe/PipeRow';
import AddPipeRow from "../pipe/AddPipeRow";
import PipeList from "./PipeList";
import {connect} from "react-redux";
import * as pipeActions from "../../actions/pipeActions";
import {bindActionCreators} from "redux";
import TextInput from "../common/TextInput";

class PipesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  render() {
    const {pipes} = this.props;

    return (
      <div>
        ${pipes}
        <PipeList/>
        <div className={"form-group row"}>
          <TextInput
            name="title"
            label="Title"
            value={""}
            error={"ddd"}/>
          <TextInput
            name="title"
            label="Title"
            value={""}
            error={"ddd"}/>
          <TextInput
            name="title"
            label="Title"
            value={"dd"}
            error={"ddd"}/>
          <TextInput
            name="title"
            label="Title"
            value={"dd"}
            error={"ddd"}/>
          <TextInput
            name="title"
            label="Title"
            value={"dd"}
            error={"ddd"}/>
          <TextInput
            name="title"
            label="Title"
            value={"dd"}
            error={"ddd"}/>

          <input type="submit"
                 value={"Add Pipe"}
                 className={"btn btn-primary"}
                 onClick={this.redirectToAddCoursePage}/>
        </div>
      </div>
    );
  }
}

//
// CourseListRow.propTypes = {
//   course: PropTypes.object.isRequired
// };

// dispatch validation
PipesPage.propTypes = {
  pipes: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    // defined in index.js reducers
    pipes: state.pipes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(pipeActions, dispatch)
  };
}


export default connect(mapStateToProps)(PipesPage);
