import React, {PropTypes} from 'react';
import TextInput from "../common/TextInput";

const Inputs = ({parameters,inputs,onChange, divClass}) => {
  return (
    <div className="col">
      <TextInput
        name={parameters[0]}
        label={parameters[0]}
        value={inputs.density}
        onChange={onChange}
        divClass={divClass}
        placeholder={parameters[0]}/>
      <TextInput
        name={parameters[1]}
        label={parameters[1]}
        value={inputs.viscosity}
        onChange={onChange}
        divClass={divClass}
        placeholder={parameters[1]}/>
      <TextInput
        name={parameters[2]}
        label={parameters[2]}
        value={inputs.flowrate}
        onChange={onChange}
        divClass={divClass}
        placeholder={parameters[2]}/>
      <TextInput
        name={parameters[3]}
        label={parameters[3]}
        value={inputs.outlet_pressure}
        onChange={onChange}
        divClass={divClass}
        placeholder={parameters[3]}/>
    </div>
  );
};

// proptypes here should match those in declaration
Inputs.propTypes = {
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};


export default Inputs;
