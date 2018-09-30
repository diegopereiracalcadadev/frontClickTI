import React from 'react';

class ErrorLoadingOrders extends React.Component {
    errorStyle = {
      textAlign: "center",
      marginTop: 60,
      color: "white",
      fontWeight: 700,
      fontSize: 20,
      background: "#ff0000a8",
      padding: "20px 0"
    }
  
    render(){
      return (
        <div style={this.errorStyle}>
          <p>Erro ao listar os chamados...</p>
          <p>Tente novamente em instantes</p>
        </div>
      )
    }
}

export default ErrorLoadingOrders;

