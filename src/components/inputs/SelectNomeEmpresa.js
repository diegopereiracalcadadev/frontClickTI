import React from 'react';
import Select from 'react-select';

const companyNameList = [
    { value: 'amontenegro', label : 'Amontenegro'},
    { value: 'bibi Barra', label : 'Bibi Barra'},
    { value: 'bibi Campo Grande', label : 'Bibi Campo Grande'},
    { value: 'bibi Metro', label : 'Bibi Metro'},
    { value: 'bibi Tijuca', label : 'Bibi Tijuca'},
    { value: 'capi', label : 'Capi'},
    { value: 'contarq', label : 'Contarq'},
    { value: 'globalCafe', label : 'GlobalCafe'},
    { value: 'lyon Construtora', label : 'Lyon Construtora'},
    { value: 'mm', label : 'MM'},
    { value: 'mundo Verde', label : 'Mundo Verde'},
    { value: 'pet Shop', label : 'Pet Shop'},
    { value: 'quality Fisio', label : 'Quality Fisio'},
    { value: 'romarfel', label : 'Romarfel'},
    { value: 'usaFlex', label : 'UsaFlex'}
  ];

class SelectNomeEmpresa extends React.Component{
    render(){
        return(
            <div class="input-select">
                <label>Clientes</label>
                <Select 
                    defaultValue = {this.props.defaultValue} //{this.state.clientName} 
                    onChange = {this.props.handleOnChange} //{this.handleOnClientNameChange}
                    options = {companyNameList}>
                </Select>
            </div>
        )
    }
}

export default SelectNomeEmpresa; 