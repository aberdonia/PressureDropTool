import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import PipeRow from '../pipe/PipeRow';
import AddPipeRow from "../pipe/AddPipeRow";
import PipeList from "./PipeList";

const PipeManager = () => {
  return (
    <PipeList/>
  )
};
//
// CourseListRow.propTypes = {
//   course: PropTypes.object.isRequired
// };

export default PipeManager;
