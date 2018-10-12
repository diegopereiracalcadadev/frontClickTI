import React from 'react';
import Creatable from 'react-select/lib/Creatable';

const mailToOptions = [
    { value: 'diegopereiracalcada@gmail.com', label: 'diegopereiracalcada@gmail.com' },
    { value: 'tarapi007@gmail.com', label: 'tarapi007@gmail.com' }
  ];

class CreatableMailTo extends React.Component{

    render(){
      return (
        <div class="input-creatable">
          <label>Email</label>
          <Creatable
            defaultValue={this.props.defaultValue} 
            onChange={this.props.handleOnChange}
            options={mailToOptions}
            isMulti={true}
          />
        </div>
      )
    }
  }

  export default CreatableMailTo;