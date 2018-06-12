import React, {PropTypes} from 'react';
import PipeRow from "./PipeRow";

const PipeList = () => {
  return (
    <table className={"table"}>
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Section No.</th>
        <th>Description</th>
        <th>Horizontal Change (m)</th>
        <th>Vertical Change (m)</th>
        <th>ID (mm)</th>
        <th>Roughness (mm)</th>
      </tr>
      </thead>
      <tbody>
      <PipeRow/>
      </tbody>


      {/*{courses.map(course =>*/}
      {/*<CourseListRow key={course.id} course={course} />*/}
      {/*)}*/}
    </table>
  );
};

// CourseList.propTypes = {
//   courses: PropTypes.array.isRequired
// };


export default PipeList;




