import React, {PropTypes} from 'react';
import PipeRow from "./PipeRow";

const PipeList = ({pipes}) => {

  return (
    <tbody>
    {pipes.map(pipe =>
      <PipeRow key={pipes.indexOf(pipe)} index={pipes.indexOf(pipe)+1} pipe={pipe}/>
    )}

    </tbody>
  );
};

// CourseList.propTypes = {
//   courses: PropTypes.array.isRequired
// };


export default PipeList;




