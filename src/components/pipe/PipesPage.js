import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import PipeRow from '../pipe/PipeRow';
import AddPipeRow from "../pipe/AddPipeRow";
import PipeList from "./PipeList";
import {connect} from "react-redux";
import * as courseActions from "../../actions/courseAction";
import {bindActionCreators} from "redux";

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

function mapStateToProps(state, ownProps){
  return {
    // defined in index.js reducers
    pipes: state.pipes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}



export default connect(mapStateToProps)(PipesPage);
