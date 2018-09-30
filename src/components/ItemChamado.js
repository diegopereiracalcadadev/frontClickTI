import React from 'react';
import Moment from 'react-moment';

class ItemChamado extends React.Component {
    state = {
      response: '',
      show: true
    };
  
    constructor(props) {
      super(props);
      
      this.state._id = props.chamado._id;
      this.state.osNumber = props.chamado.osNumber;
      this.state.status = props.chamado.status;
      this.state.clientId = props.chamado.clientId;
      this.state.clientName = props.chamado.clientName;
      this.state.openingUser = props.chamado.openingUser;
      this.state.openingDate = props.chamado.openingDate;
      this.state.description = props.chamado.description;
      this.state.comments = props.chamado.comments;
      this.state.mailTo = props.chamado.mailTo;
      this.state.closingDate = props.chamado.closingDate;
      this.state.solution = props.chamado.solution;
  
      this.handleOnClick = this.handleOnClick.bind(this);
    }
  
    handleOnClick = ()=>{
      console.log("ItemChamado - handleOnClick invoked");
      console.log(this.state);
      this.props.tryToCloseOs(this.state);
    }
  
    render() {
      return (
        this.state.show ?
          <li className="li-chamado">
            <div className="infs-chamado">
              <input type="hidden" name="clientId" value={this.state.clientId} />
              <p className="os-number">OS-{this.state.osNumber}</p>
              <p className="nome-cliente">{this.state.clientName}</p>
              <p className="desc-chamado">{this.state.description}</p>
            </div>
            <div className="status-chamado">
              <div className="infs-abertura" style={{marginBottom: 10}}>
                <p>Aberto em</p> 
                <p className="dt-abertura"><Moment locale="pt-br" format="DD/MM/YYYY">{this.state.openingDate}</Moment></p>
              </div>
              <div style={{marginLeft: 8}}>
                <button 
                  onClick={this.handleOnClick}
                  className="waves-effect waves-light btn btn-fechar-chamado">Fechar</button>
              </div>
            </div>
          </li>
          : null
      );
    }
  }
export default ItemChamado;  