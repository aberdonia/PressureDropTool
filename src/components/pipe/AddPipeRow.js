import React, {PropTypes} from 'react';
import TextInput from "../common/TextInput";

const AddPipeRow = ({parameters,errors,pipe,onChange}) => {
  return (
<div>
  <TextInput
  divClass={"col-md-3"}
    name={parameters[1].name}
    label={parameters[1].label}
    value={pipe.description}
    onChange={onChange}
    placeholder={parameters[1].label}
    error={errors.description}/>
  <TextInput
  divClass={"col-md-2"}
    name={parameters[2].name}
    label={parameters[2].label}
    value={pipe.horizontal_change}
    onChange={onChange}
    placeholder={parameters[2].label}
    error={errors.horizontal_change}/>
  <TextInput
  divClass={"col-md-2"}
    name={parameters[3].name}
    label={parameters[3].label}
    value={pipe.vertical_change}
    onChange={onChange}
    placeholder={parameters[3].label}
    error={errors.vertical_change}/>
  <TextInput
  divClass={"col-md-2"}
    name={parameters[4].name}
    label={parameters[4].label}
    value={pipe.inner_diamter}
    onChange={onChange}
    placeholder={parameters[4].label}
    error={errors.inner_diamter}/>
  <TextInput
  divClass={"col-md-1"}
    name={parameters[5].name}
    label={parameters[5].label}
    value={pipe.roughness}
    onChange={onChange}
    placeholder={parameters[5].label}
    error={errors.roughness}/>
  <TextInput
  divClass={"col-md-1"}
    name={parameters[6].name}
    label={parameters[6].label}
    value={pipe.cores}
    onChange={onChange}
    placeholder={parameters[6].label}
    error={errors.cores}/>
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
