import React, {PropTypes} from 'react';
import TextInput from "../common/TextInput";

const AddPipeRow = ({parameters,errors,pipe,onChange, onSave}) => {
  return (
<div>
  <TextInput
    name="description"
    label="Description"
    value={pipe.description}
    onChange={onChange}
    error={errors.description}/>
  <TextInput
    name="horizontal_change"
    label="Horizontal Change"
    value={pipe.horizontal}
    onChange={onChange}
    error={errors.horizontal}/>
  <TextInput
    name="vertical_change"
    label="Vertical Change"
    value={pipe.vertical}
    onChange={onChange}
    error={errors.vertical}/>
  <TextInput
    name="inner_diamter"
    label="I.D."
    value={pipe.inner_diamter}
    onChange={onChange}
    error={errors.inner_diamter}/>
  <TextInput
    name="roughness"
    label="Roughness"
    value={pipe.roughness}
    onChange={onChange}
    error={errors.roughness}/>
  <TextInput
    name="cores"
    label="Cores"
    value={pipe.cores}
    onChange={onChange}
    error={errors.cores}/>
  <input type="submit"
         value={"Add Pipe"}
         className={"btn btn-primary"}
         onClick={onSave}/>
</div>
  );
};

// proptypes here should match those in declaration
AddPipeRow.propTypes = {
  pipe: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};


export default AddPipeRow;
