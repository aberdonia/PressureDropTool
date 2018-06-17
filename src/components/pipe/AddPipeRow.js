import React, {PropTypes} from 'react';
import TextInput from "../common/TextInput";

const AddPipeRow = ({parameters,errors,pipe,onChange, onSave}) => {
  return (
<div>
  <TextInput
    name={parameters[1].name}
    label={parameters[1].label}
    value={pipe.description}
    onChange={onChange}
    placeholder={parameters[1].label}
    type={"text"}
    error={errors.description}/>
  <TextInput
    name={parameters[2].name}
    label={parameters[2].label}
    value={pipe.horizontal_change}
    onChange={onChange}
    placeholder={parameters[2].label}
    type={"number"}
    error={errors.horizontal_change}/>
  <TextInput
    name={parameters[3].name}
    label={parameters[3].label}
    value={pipe.vertical_change}
    onChange={onChange}
    placeholder={parameters[3].label}
    type={"number"}
    error={errors.vertical_change}/>
  <TextInput
    name={parameters[4].name}
    label={parameters[4].label}
    value={pipe.inner_diamter}
    onChange={onChange}
    placeholder={parameters[4].label}
    type={"number"}
    error={errors.inner_diamter}/>
  <TextInput
    name={parameters[5].name}
    label={parameters[5].label}
    value={pipe.roughness}
    onChange={onChange}
    placeholder={parameters[5].label}
    type={"number"}
    error={errors.roughness}/>
  <TextInput
    name={parameters[6].name}
    label={parameters[6].label}
    value={pipe.cores}
    onChange={onChange}
    placeholder={parameters[6].label}
    type={"number"}
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
