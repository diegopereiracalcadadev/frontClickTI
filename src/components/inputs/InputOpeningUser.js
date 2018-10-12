import React from 'react';

class InputOpeningUser extends React.Component{
    render(){
        return (
            <div>
                <label>Usuário:</label>
                <input name="openingUser" 
                    defaultValue={this.props.defaultValue} 
                    onBlur={this.props.handleOnChange}/>
            </div>
        );
    }
}

export default InputOpeningUser;