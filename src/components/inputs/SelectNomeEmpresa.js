import React from 'react';
import Select from 'react-select';

import COMPANYLIST from '../../data/CompanyList';

class SelectNomeEmpresa extends React.Component{
    render(){
        return(
            <div class="input-select">
                <label>Clientes</label>
                <Select 
                    defaultValue = {this.props.defaultValue} //{this.state.clientName} 
                    onChange = {this.props.handleOnChange} //{this.handleOnClientNameChange}
                    options = {COMPANYLIST}>
                </Select>
            </div>
        )
    }
}

export default SelectNomeEmpresa; 