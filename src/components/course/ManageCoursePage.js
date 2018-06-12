import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseForm from "./CourseForm";
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    // *state is set based on constructor. once page is initialised, changes to props.course
    // are not going be relefected because we are passing down state
    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      // use this saving state to indicate when button is pressed and api call getting carried out, provide better UI feedback
      // could use a reducer, but this is fleeting data that rest of app doesn't care about, so no point
      saving: false
    };

    // to ensure we have proper 'this' context when updateCourseState is called
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  // use this to update the state (see constrctor *). react life cycle function.
  // runs when react thinks function has changed (sometimes does it too much)
  componentWillReceiveProps(nextProps) {
    // validate that the props have actually changed.
    if (this.props.course.id != nextProps.course.id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  // allows us to type in empty fields
  updateCourseState(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  saveCourse(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  // use promise in saveCourse() to provide better UI. waits for api call to complete before changing page
  redirect() {
    this.setState({saving: false});
    toastr.success('Course saved');
    this.context.router.push('/courses');
  }

  render() {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        course={this.state.course}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// Pull in the React Router context so router is available on this.context.router.
// Context is a global variable used by libraries but we should avoid.
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if (course.length) return course[0]; // since filter returns an array, have to grab the first
  return null;
}

function mapStateToProps(state, ownProps) {
  // get params from url using ownProps (from router), allows us to prepoluate form
  const courseId = ownProps.params.id; // form apth 'course/:id'
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

  // check length to ensure that we don't fill form with blanks on refresh (no new data)
  // state.courses.length > 0 prevents error
  // the fields are still blank because we pass down 'state' which is iniitliased in the constructor
  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  // need to transform data for the selectInput dropdown
  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: `${author.firstName} ${author.lastName}`
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
