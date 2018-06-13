import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const PipeRow = ({index,pipe}) => {
  return (
    <tr>
      <td>{index}</td>
      <td> {pipe.description}</td>
      <td>{pipe.horizontal_change}</td>
      <td>{pipe.vertical_change}</td>
      <td> {pipe.inner_diamter}</td>
      <td>{pipe.roughness}</td>
      <td>{pipe.cores}</td>
    </tr>
  );
};
//
// CourseListRow.propTypes = {
//   course: PropTypes.object.isRequired
// };

export default PipeRow;
