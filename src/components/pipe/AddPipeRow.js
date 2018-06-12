import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseForm from "../course/CourseForm";
import toastr from 'toastr';

const AddPipeRow = ({course,errors,saving}) => {

  return (
    <CourseForm
      allAuthors="test"
      course={this.course}
      errors={this.errors}
      saving={this.saving}
    />
  );
};


export default AddPipeRow;
